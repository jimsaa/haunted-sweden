import { NextResponse } from "next/server";
import { createMemberSessionToken } from "@/lib/members/session-token";
import { registerMember } from "@/lib/members/store";

type RegisterBody = {
  username?: string;
  email?: string;
  password?: string;
  displayName?: string;
  country?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RegisterBody;
    const result = await registerMember({
      username: body.username ?? "",
      email: body.email ?? "",
      password: body.password ?? "",
      displayName: body.displayName,
      country: body.country,
    });

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    const { token, expiresAt } = createMemberSessionToken(
      result.user.id,
      result.user.username
    );

    return NextResponse.json({
      user: result.user,
      sessionToken: token,
      expiresAt,
    });
  } catch (err) {
    console.error("[members/register]", err);
    return NextResponse.json(
      { error: "Registration failed. Try again." },
      { status: 500 }
    );
  }
}
