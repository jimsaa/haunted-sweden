import { NextResponse } from "next/server";
import { isAdminApiEnabled } from "@/lib/admin/auth";
import { toPublicUser } from "@/lib/admin/users-types";
import { findAdminUserByCredentials } from "@/lib/admin/users-store";

export async function POST(request: Request) {
  if (!isAdminApiEnabled()) {
    return NextResponse.json(
      { error: "Admin login is disabled in production" },
      { status: 403 }
    );
  }

  try {
    const body = (await request.json()) as {
      username?: string;
      password?: string;
    };
    const username = body.username?.trim();
    const password = body.password ?? "";

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password required" },
        { status: 400 }
      );
    }

    const user = await findAdminUserByCredentials(username, password);
    if (!user) {
      return NextResponse.json(
        { error: "Invalid username or password" },
        { status: 401 }
      );
    }

    return NextResponse.json({ user: toPublicUser(user) });
  } catch (err) {
    console.error("[admin/login]", err);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
