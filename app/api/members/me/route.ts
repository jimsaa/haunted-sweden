import { NextResponse } from "next/server";
import { requireMemberUser } from "@/lib/members/api-auth";
import { toPublicMember } from "@/lib/members/types";

export async function GET(request: Request) {
  const auth = await requireMemberUser(request);
  if (!auth.ok) return auth.response;
  return NextResponse.json({ user: toPublicMember(auth.user) });
}
