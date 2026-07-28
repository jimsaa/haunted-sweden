import { NextResponse } from "next/server";
import { createMemberSessionToken } from "@/lib/members/session-token";
import { authenticateMember } from "@/lib/members/store";
import { toPublicMember } from "@/lib/members/types";

type LoginBody = {
  username?: string;
  password?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LoginBody;
    const username = body.username?.trim() ?? "";
    const password = body.password ?? "";

    if (!username || !password) {
      return NextResponse.json(
        { error: "Enter username and password." },
        { status: 400 }
      );
    }

    const user = await authenticateMember(username, password);
    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials." },
        { status: 401 }
      );
    }

    const { token, expiresAt } = createMemberSessionToken(
      user.id,
      user.username
    );

    return NextResponse.json({
      user: toPublicMember(user),
      sessionToken: token,
      expiresAt,
    });
  } catch (err) {
    console.error("[members/login]", err);
    return NextResponse.json(
      { error: "Login failed. Try again." },
      { status: 500 }
    );
  }
}
