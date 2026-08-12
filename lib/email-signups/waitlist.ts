import { getSupabaseAdmin } from "@/lib/supabase/admin";

/** Upsert an email into community_members for the pre-launch waitlist. */
export async function upsertCommunityWaitlistEmail(
  email: string,
  source: string
): Promise<{ error: Error | null }> {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("community_members").upsert(
    {
      email: email.trim().toLowerCase(),
      source,
      status: "active",
      verified: false,
      consent: true,
      interests: [],
      membership_tier: "free",
    },
    { onConflict: "email" }
  );

  return { error: error ? new Error(error.message) : null };
}
