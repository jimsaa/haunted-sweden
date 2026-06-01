import {
  LOGIN_ERROR_INVALID,
  LOGIN_ERROR_RATE_LIMIT,
} from "@/lib/admin/messages";
import type { AdminPublicUser } from "@/lib/admin/users-types";

export type LoginClientResult =
  | {
      ok: true;
      user: AdminPublicUser;
      sessionToken: string;
      expiresAt: string;
    }
  | {
      ok: false;
      error: string;
      requireCaptcha?: boolean;
      rateLimited?: boolean;
    };

export async function loginAdminClient(
  username: string,
  password: string,
  turnstileToken?: string
): Promise<LoginClientResult> {
  try {
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, turnstileToken }),
    });
    const data = (await res.json()) as {
      user?: AdminPublicUser;
      sessionToken?: string;
      expiresAt?: string;
      error?: string;
      requireCaptcha?: boolean;
    };

    if (res.status === 429) {
      return {
        ok: false,
        error: data.error ?? LOGIN_ERROR_RATE_LIMIT,
        requireCaptcha: true,
        rateLimited: true,
      };
    }

    if (!res.ok) {
      return {
        ok: false,
        error: data.error ?? LOGIN_ERROR_INVALID,
        requireCaptcha: data.requireCaptcha,
      };
    }

    if (!data.user || !data.sessionToken || !data.expiresAt) {
      return { ok: false, error: LOGIN_ERROR_INVALID };
    }

    return {
      ok: true,
      user: data.user,
      sessionToken: data.sessionToken,
      expiresAt: data.expiresAt,
    };
  } catch {
    return { ok: false, error: LOGIN_ERROR_INVALID };
  }
}

export type LoginConfig = {
  turnstileSiteKey: string | null;
  turnstileSkipped: boolean;
};

export async function fetchLoginConfig(): Promise<LoginConfig> {
  try {
    const res = await fetch("/api/admin/login/config");
    if (!res.ok) {
      return { turnstileSiteKey: null, turnstileSkipped: true };
    }
    return (await res.json()) as LoginConfig;
  } catch {
    return { turnstileSiteKey: null, turnstileSkipped: true };
  }
}
