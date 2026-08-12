import { randomUUID } from "crypto";
import {
  isJsonEmailStorageReady,
  mutateEmailSignupsStore,
  readEmailSignupsStore,
} from "@/lib/email-signups/json-storage";
import type {
  StoredArchiveCommunityResponse,
  StoredCommunityMember,
  StoredNewsletterSubscriber,
} from "@/lib/email-signups/types";
import {
  getSupabaseAdmin,
  isSupabaseConfigured,
  type ArchiveCommunityRow,
  type CommunityMemberRow,
  type NewsletterSubscriberRow,
} from "@/lib/supabase/admin";

export function isEmailSignupStorageReady(): boolean {
  return isSupabaseConfigured() || isJsonEmailStorageReady();
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function nowIso(): string {
  return new Date().toISOString();
}

async function upsertCommunityInJson(
  email: string,
  source: string
): Promise<{ error: Error | null }> {
  try {
    const normalized = normalizeEmail(email);
    await mutateEmailSignupsStore((store) => {
      const existing = store.communityMembers.find(
        (m) => m.email.toLowerCase() === normalized
      );
      if (existing) {
        existing.source = source;
        existing.consent = true;
        existing.status = "active";
        return;
      }
      store.communityMembers.unshift({
        id: randomUUID(),
        email: normalized,
        created_at: nowIso(),
        source,
        status: "active",
        verified: false,
        consent: true,
        interests: [],
        membership_tier: "free",
      });
    });
    return { error: null };
  } catch (err) {
    return { error: err instanceof Error ? err : new Error(String(err)) };
  }
}

async function upsertNewsletterInJson(input: {
  email: string;
  archiveId: string;
  bookTitle: string | null;
  source: string;
}): Promise<{ error: Error | null }> {
  try {
    const normalized = normalizeEmail(input.email);
    await mutateEmailSignupsStore((store) => {
      const existing = store.newsletterSubscribers.find(
        (s) => s.email.toLowerCase() === normalized
      );
      if (existing) {
        existing.archive_id = input.archiveId;
        existing.book_title = input.bookTitle;
        existing.source = input.source;
        existing.consent = true;
        existing.status = "active";
        return;
      }
      store.newsletterSubscribers.unshift({
        id: randomUUID(),
        email: normalized,
        created_at: nowIso(),
        book_title: input.bookTitle,
        archive_id: input.archiveId,
        source: input.source,
        verified: false,
        status: "active",
        consent: true,
      });
    });
    return { error: null };
  } catch (err) {
    return { error: err instanceof Error ? err : new Error(String(err)) };
  }
}

async function insertArchiveResponseInJson(input: {
  archiveId: string;
  investigationId: string;
  visited: "yes" | "not_yet";
  story: string | null;
  email: string | null;
}): Promise<{ error: Error | null }> {
  try {
    await mutateEmailSignupsStore((store) => {
      store.archiveCommunityResponses.unshift({
        id: randomUUID(),
        created_at: nowIso(),
        archive_id: input.archiveId,
        investigation_id: input.investigationId,
        visited: input.visited,
        story: input.story,
        email: input.email ? normalizeEmail(input.email) : null,
        status: "pending",
      });
    });
    return { error: null };
  } catch (err) {
    return { error: err instanceof Error ? err : new Error(String(err)) };
  }
}

/** Upsert an email into community_members / JSON waitlist store. */
export async function upsertCommunityWaitlistEmail(
  email: string,
  source: string
): Promise<{ error: Error | null }> {
  if (isSupabaseConfigured()) {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("community_members").upsert(
      {
        email: normalizeEmail(email),
        source,
        status: "active",
        verified: false,
        consent: true,
        interests: [],
        membership_tier: "free",
      },
      { onConflict: "email" }
    );
    if (!error) return { error: null };
    console.error("[email-signups] Supabase community upsert failed, trying JSON", error);
  }

  if (!isJsonEmailStorageReady()) {
    return {
      error: new Error(
        "Email signup storage is not configured (Supabase or Vercel Blob required in production)."
      ),
    };
  }

  return upsertCommunityInJson(email, source);
}

export async function upsertNewsletterSubscriber(input: {
  email: string;
  archiveId: string;
  bookTitle: string | null;
  source?: string;
}): Promise<{ error: Error | null }> {
  const source = input.source ?? "Book Archive";

  if (isSupabaseConfigured()) {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("newsletter_subscribers").upsert(
      {
        email: normalizeEmail(input.email),
        book_title: input.bookTitle,
        archive_id: input.archiveId,
        source,
        verified: false,
        status: "active",
        consent: true,
      },
      { onConflict: "email" }
    );
    if (!error) return { error: null };
    console.error("[email-signups] Supabase newsletter upsert failed, trying JSON", error);
  }

  if (!isJsonEmailStorageReady()) {
    return { error: new Error("Email signup storage is not configured.") };
  }

  return upsertNewsletterInJson({ ...input, source });
}

export async function insertArchiveCommunityResponse(input: {
  archiveId: string;
  investigationId: string;
  visited: "yes" | "not_yet";
  story: string | null;
  email: string | null;
}): Promise<{ error: Error | null }> {
  if (isSupabaseConfigured()) {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("archive_community_responses").insert({
      archive_id: input.archiveId,
      investigation_id: input.investigationId,
      visited: input.visited,
      story: input.story,
      email: input.email ? normalizeEmail(input.email) : null,
      status: "pending",
    });
    if (!error) return { error: null };
    console.error("[email-signups] Supabase archive response failed, trying JSON", error);
  }

  if (!isJsonEmailStorageReady()) {
    return { error: new Error("Email signup storage is not configured.") };
  }

  return insertArchiveResponseInJson(input);
}

export type EmailSignupStats = {
  communityWaitlist: number;
  bookNewsletter: number;
  archiveStoryEmails: number;
  totalListRows: number;
  uniqueEmails: number;
};

function computeStats(
  communityEmails: string[],
  newsletterEmails: string[],
  archiveEmails: string[]
): EmailSignupStats {
  const uniqueEmails = new Set([
    ...communityEmails,
    ...newsletterEmails,
    ...archiveEmails,
  ]);
  return {
    communityWaitlist: communityEmails.length,
    bookNewsletter: newsletterEmails.length,
    archiveStoryEmails: archiveEmails.length,
    totalListRows:
      communityEmails.length + newsletterEmails.length + archiveEmails.length,
    uniqueEmails: uniqueEmails.size,
  };
}

export async function getEmailSignupStats(): Promise<EmailSignupStats> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseAdmin();
      const [communityRes, newsletterRes, archiveEmailRes] = await Promise.all([
        supabase.from("community_members").select("email").eq("status", "active"),
        supabase
          .from("newsletter_subscribers")
          .select("email")
          .eq("status", "active"),
        supabase
          .from("archive_community_responses")
          .select("email")
          .not("email", "is", null),
      ]);

      if (!communityRes.error && !newsletterRes.error && !archiveEmailRes.error) {
        const communityEmails = (communityRes.data ?? []).map((r) =>
          r.email.toLowerCase()
        );
        const newsletterEmails = (newsletterRes.data ?? []).map((r) =>
          r.email.toLowerCase()
        );
        const archiveEmails = (archiveEmailRes.data ?? [])
          .map((r) => r.email?.toLowerCase())
          .filter(Boolean) as string[];
        return computeStats(communityEmails, newsletterEmails, archiveEmails);
      }
    } catch (err) {
      console.error("[email-signups] Supabase stats failed, trying JSON", err);
    }
  }

  const store = await readEmailSignupsStore();
  const communityEmails = store.communityMembers
    .filter((m) => m.status === "active")
    .map((m) => m.email.toLowerCase());
  const newsletterEmails = store.newsletterSubscribers
    .filter((s) => s.status === "active")
    .map((s) => s.email.toLowerCase());
  const archiveEmails = store.archiveCommunityResponses
    .map((r) => r.email?.toLowerCase())
    .filter(Boolean) as string[];

  return computeStats(communityEmails, newsletterEmails, archiveEmails);
}

export async function listCommunityMembers(): Promise<CommunityMemberRow[]> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseAdmin();
      const { data, error } = await supabase
        .from("community_members")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error) return (data ?? []) as CommunityMemberRow[];
    } catch (err) {
      console.error("[email-signups] Supabase community list failed", err);
    }
  }

  const store = await readEmailSignupsStore();
  return store.communityMembers as CommunityMemberRow[];
}

export async function listNewsletterSubscribers(): Promise<
  NewsletterSubscriberRow[]
> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseAdmin();
      const { data, error } = await supabase
        .from("newsletter_subscribers")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error) return (data ?? []) as NewsletterSubscriberRow[];
    } catch (err) {
      console.error("[email-signups] Supabase newsletter list failed", err);
    }
  }

  const store = await readEmailSignupsStore();
  return store.newsletterSubscribers as NewsletterSubscriberRow[];
}

export async function deleteCommunityMember(id: string): Promise<void> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseAdmin();
      const { error } = await supabase
        .from("community_members")
        .delete()
        .eq("id", id);
      if (!error) return;
    } catch {
      /* fall through */
    }
  }

  await mutateEmailSignupsStore((store) => {
    store.communityMembers = store.communityMembers.filter((m) => m.id !== id);
  });
}

export async function deleteNewsletterSubscriber(id: string): Promise<void> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseAdmin();
      const { error } = await supabase
        .from("newsletter_subscribers")
        .delete()
        .eq("id", id);
      if (!error) return;
    } catch {
      /* fall through */
    }
  }

  await mutateEmailSignupsStore((store) => {
    store.newsletterSubscribers = store.newsletterSubscribers.filter(
      (s) => s.id !== id
    );
  });
}

export type { StoredArchiveCommunityResponse, StoredCommunityMember, StoredNewsletterSubscriber };
