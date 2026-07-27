import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export type NewsletterSubscriberRow = {
  id: string;
  email: string;
  created_at: string;
  book_title: string | null;
  archive_id: string | null;
  source: string;
  verified: boolean;
  status: string;
  consent: boolean;
};

export type ArchiveCommunityRow = {
  id: string;
  created_at: string;
  archive_id: string;
  investigation_id: string;
  visited: "yes" | "not_yet" | null;
  story: string | null;
  email: string | null;
  status: string;
};

export type CommunityMemberRow = {
  id: string;
  email: string;
  created_at: string;
  source: string;
  status: string;
  verified: boolean;
  consent: boolean;
  interests: string[] | null;
  membership_tier: string;
};

let adminClient: SupabaseClient | null = null;

export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.SUPABASE_URL?.trim() &&
      process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
  );
}

/** Server-only Supabase client (service role). */
export function getSupabaseAdmin(): SupabaseClient {
  if (adminClient) return adminClient;

  const url = process.env.SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!url || !key) {
    throw new Error(
      "SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required for archive newsletter and community features."
    );
  }

  adminClient = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return adminClient;
}
