import { NextResponse } from "next/server";
import { requireMemberUser } from "@/lib/members/api-auth";
import { updateMemberProfile } from "@/lib/members/store";

type ProfileBody = {
  displayName?: string;
  biography?: string;
  country?: string;
  avatarUrl?: string | null;
};

export async function PATCH(request: Request) {
  const auth = await requireMemberUser(request);
  if (!auth.ok) return auth.response;

  try {
    const body = (await request.json()) as ProfileBody;
    const updated = await updateMemberProfile(auth.user.id, {
      displayName: body.displayName?.trim().slice(0, 80),
      biography: body.biography?.slice(0, 2000),
      country: body.country?.trim().slice(0, 80),
      avatarUrl:
        body.avatarUrl === null
          ? null
          : body.avatarUrl?.trim().slice(0, 500) || undefined,
    });

    if (!updated) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    return NextResponse.json({ user: updated });
  } catch (err) {
    console.error("[members/profile]", err);
    return NextResponse.json(
      { error: "Could not update profile." },
      { status: 500 }
    );
  }
}
