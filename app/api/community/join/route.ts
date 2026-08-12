import { NextResponse } from "next/server";
import { COMMUNITY_SOURCE } from "@/lib/community/landing";
import { upsertCommunityWaitlistEmail } from "@/lib/email-signups/waitlist";
import { isCommunityEnabled } from "@/lib/features";
import { isSupabaseConfigured } from "@/lib/supabase/admin";

type Body = {
  email?: string;
  consent?: boolean;
  interests?: string[];
  source?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    if (!isCommunityEnabled()) {
      return NextResponse.json({ error: "Not found." }, { status: 404 });
    }

    if (!isSupabaseConfigured()) {
      console.error("[community/join] Supabase not configured");
      return NextResponse.json(
        {
          error: "Community signup is temporarily unavailable.",
          errorSv: "Community-anmälan är tillfälligt otillgänglig.",
        },
        { status: 503 }
      );
    }

    const body = (await request.json()) as Body;
    const email = body.email?.trim().toLowerCase();

    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json(
        {
          error: "Please enter a valid email address.",
          errorSv: "Ange en giltig e-postadress.",
        },
        { status: 400 }
      );
    }

    if (body.consent === false) {
      return NextResponse.json(
        {
          error: "Consent is required to join.",
          errorSv: "Samtycke krävs för att gå med.",
        },
        { status: 400 }
      );
    }

    const source =
      body.source?.trim().slice(0, 120) || COMMUNITY_SOURCE;

    const { error } = await upsertCommunityWaitlistEmail(email, source);

    if (error) {
      console.error("[community/join]", error);
      return NextResponse.json(
        {
          error: "Could not join. Please try again.",
          errorSv: "Kunde inte anmäla dig. Försök igen.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[community/join]", err);
    return NextResponse.json(
      {
        error: "Could not join. Please try again.",
        errorSv: "Kunde inte anmäla dig. Försök igen.",
      },
      { status: 500 }
    );
  }
}
