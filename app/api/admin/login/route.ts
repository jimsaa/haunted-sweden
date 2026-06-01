import { NextResponse } from "next/server";
import { toPublicUser } from "@/lib/admin/users-types";
import { findAdminUserByCredentials } from "@/lib/admin/users-store";

/**
 * MVP admin login — validates against data/admin-users.json on the server.
 * TODO: Replace with Supabase Auth; use hashed passwords and secure sessions.
 */
export async function POST(request: Request) {
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
