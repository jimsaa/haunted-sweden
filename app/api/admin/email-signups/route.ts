import { NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/admin/api-auth";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/admin";

export async function GET(request: Request) {
  const auth = await requireAdminUser(request, "view_analytics");
  if (!auth.ok) return auth.response;

  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      {
        error: "Supabase is not configured.",
        stats: null,
      },
      { status: 503 }
    );
  }

  try {
    const supabase = getSupabaseAdmin();

    const [
      communityRes,
      newsletterRes,
      archiveEmailRes,
    ] = await Promise.all([
      supabase
        .from("community_members")
        .select("email")
        .eq("status", "active"),
      supabase
        .from("newsletter_subscribers")
        .select("email")
        .eq("status", "active"),
      supabase
        .from("archive_community_responses")
        .select("email")
        .not("email", "is", null),
    ]);

    if (communityRes.error) throw communityRes.error;
    if (newsletterRes.error) throw newsletterRes.error;
    if (archiveEmailRes.error) throw archiveEmailRes.error;

    const communityEmails = (communityRes.data ?? []).map((r) =>
      r.email.toLowerCase()
    );
    const newsletterEmails = (newsletterRes.data ?? []).map((r) =>
      r.email.toLowerCase()
    );
    const archiveEmails = (archiveEmailRes.data ?? [])
      .map((r) => r.email?.toLowerCase())
      .filter(Boolean) as string[];

    const uniqueEmails = new Set([
      ...communityEmails,
      ...newsletterEmails,
      ...archiveEmails,
    ]);

    return NextResponse.json({
      stats: {
        communityWaitlist: communityEmails.length,
        bookNewsletter: newsletterEmails.length,
        archiveStoryEmails: archiveEmails.length,
        totalListRows:
          communityEmails.length +
          newsletterEmails.length +
          archiveEmails.length,
        uniqueEmails: uniqueEmails.size,
      },
    });
  } catch (err) {
    console.error("[admin/email-signups GET]", err);
    return NextResponse.json(
      { error: "Failed to load email signup stats" },
      { status: 500 }
    );
  }
}
