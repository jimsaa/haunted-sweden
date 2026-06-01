import { NextResponse } from "next/server";
import {
  getTurnstileSiteKey,
  shouldSkipTurnstile,
} from "@/lib/admin/turnstile";

/** Public config for admin login UI (no secrets). */
export async function GET() {
  return NextResponse.json({
    turnstileSiteKey: getTurnstileSiteKey() ?? null,
    turnstileSkipped: shouldSkipTurnstile(),
  });
}
