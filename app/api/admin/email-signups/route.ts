import { NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/admin/api-auth";
import {
  getEmailSignupStats,
  isEmailSignupStorageReady,
} from "@/lib/email-signups/waitlist";

export async function GET(request: Request) {
  const auth = await requireAdminUser(request, "view_analytics");
  if (!auth.ok) return auth.response;

  if (!isEmailSignupStorageReady()) {
    return NextResponse.json(
      {
        error: "Email storage is not configured.",
        stats: null,
      },
      { status: 503 }
    );
  }

  try {
    const stats = await getEmailSignupStats();
    return NextResponse.json({ stats });
  } catch (err) {
    console.error("[admin/email-signups GET]", err);
    return NextResponse.json(
      { error: "Failed to load email signup stats" },
      { status: 500 }
    );
  }
}
