import { NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/admin/api-auth";
import { listMembersPublic } from "@/lib/members/store";

export async function GET(request: Request) {
  const auth = await requireAdminUser(request, "view_analytics");
  if (!auth.ok) return auth.response;

  try {
    const users = await listMembersPublic();
    return NextResponse.json({ users });
  } catch (err) {
    console.error("[admin/members]", err);
    return NextResponse.json(
      { error: "Could not load members." },
      { status: 500 }
    );
  }
}
