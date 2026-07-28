import { NextResponse } from "next/server";
import { verifyMemberSessionToken } from "@/lib/members/session-token";
import { findMemberById } from "@/lib/members/store";
import type { MemberProfile } from "@/lib/members/types";

export function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export type MemberAuthResult =
  | { ok: true; user: MemberProfile }
  | { ok: false; response: NextResponse };

export async function requireMemberUser(
  request: Request
): Promise<MemberAuthResult> {
  const token = request.headers.get("x-member-session")?.trim();
  if (!token) return { ok: false, response: unauthorized() };

  const payload = verifyMemberSessionToken(token);
  if (!payload) return { ok: false, response: unauthorized() };

  const user = await findMemberById(payload.userId);
  if (!user || !user.enabled) {
    return { ok: false, response: unauthorized() };
  }
  if (user.username.toLowerCase() !== payload.username.toLowerCase()) {
    return { ok: false, response: unauthorized() };
  }

  return { ok: true, user };
}
