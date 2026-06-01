/**
 * TODO: Replace with Supabase Auth session after migration.
 */
import type { AdminPublicUser } from "@/lib/admin/users-types";

export async function loginAdminClient(
  username: string,
  password: string
): Promise<{ ok: true; user: AdminPublicUser } | { ok: false; error: string }> {
  if (process.env.NODE_ENV === "production") {
    return { ok: false, error: "Admin login is disabled in production" };
  }

  try {
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = (await res.json()) as {
      user?: AdminPublicUser;
      error?: string;
    };
    if (!res.ok) {
      return { ok: false, error: data.error ?? "Login failed" };
    }
    if (!data.user) {
      return { ok: false, error: "Invalid response" };
    }
    return { ok: true, user: data.user };
  } catch {
    return { ok: false, error: "Could not reach server" };
  }
}
