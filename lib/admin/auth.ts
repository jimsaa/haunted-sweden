/**
 * TODO: Replace local username/password auth with Supabase Auth (or similar)
 * before scaling. Store hashed passwords and JWT sessions — never commit secrets.
 *
 * LOCAL DEVELOPMENT ONLY — admin gate for /admin.
 */
import type { AdminPermission } from "@/lib/admin/permissions";
import { userHasPermission } from "@/lib/admin/permissions";
import type { AdminPublicUser } from "@/lib/admin/users-types";

export const ADMIN_SESSION_STORAGE_KEY = "haunted-sweden-admin-session";
export const ADMIN_USER_STORAGE_KEY = "haunted-sweden-admin-user";
const ADMIN_USERNAME_KEY = "haunted-sweden-admin-username";
const ADMIN_PASSWORD_KEY = "haunted-sweden-admin-password";

export function isAdminApiEnabled(): boolean {
  return process.env.NODE_ENV !== "production";
}

export function isAdminSessionActive(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(ADMIN_SESSION_STORAGE_KEY) === "unlocked";
  } catch {
    return false;
  }
}

export function setAdminSession(active: boolean, userId?: string): void {
  if (typeof window === "undefined") return;
  try {
    if (active && userId) {
      localStorage.setItem(ADMIN_SESSION_STORAGE_KEY, "unlocked");
      localStorage.setItem(ADMIN_SESSION_STORAGE_KEY + "-id", userId);
    } else {
      localStorage.removeItem(ADMIN_SESSION_STORAGE_KEY);
      localStorage.removeItem(ADMIN_SESSION_STORAGE_KEY + "-id");
    }
  } catch {
    /* ignore */
  }
}

export function getStoredAdminCredentials(): {
  username: string;
  password: string;
} | null {
  if (typeof window === "undefined") return null;
  try {
    const username = sessionStorage.getItem(ADMIN_USERNAME_KEY);
    const password = sessionStorage.getItem(ADMIN_PASSWORD_KEY);
    if (!username || !password) return null;
    return { username, password };
  } catch {
    return null;
  }
}

/** @deprecated Use getStoredAdminCredentials */
export function getStoredAdminPassword(): string | null {
  return getStoredAdminCredentials()?.password ?? null;
}

export function setStoredAdminCredentials(
  username: string | null,
  password: string | null
): void {
  if (typeof window === "undefined") return;
  try {
    if (username && password) {
      sessionStorage.setItem(ADMIN_USERNAME_KEY, username);
      sessionStorage.setItem(ADMIN_PASSWORD_KEY, password);
    } else {
      sessionStorage.removeItem(ADMIN_USERNAME_KEY);
      sessionStorage.removeItem(ADMIN_PASSWORD_KEY);
    }
  } catch {
    /* ignore */
  }
}

/** @deprecated Use setStoredAdminCredentials */
export function setStoredAdminPassword(password: string | null): void {
  const creds = getStoredAdminCredentials();
  if (password && creds?.username) {
    setStoredAdminCredentials(creds.username, password);
  } else {
    setStoredAdminCredentials(null, null);
  }
}

export function getStoredAdminUser(): AdminPublicUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(ADMIN_USER_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AdminPublicUser;
  } catch {
    return null;
  }
}

export function setStoredAdminUser(user: AdminPublicUser | null): void {
  if (typeof window === "undefined") return;
  try {
    if (user) {
      sessionStorage.setItem(ADMIN_USER_STORAGE_KEY, JSON.stringify(user));
    } else {
      sessionStorage.removeItem(ADMIN_USER_STORAGE_KEY);
    }
  } catch {
    /* ignore */
  }
}

export function clearAdminSession(): void {
  setAdminSession(false);
  setStoredAdminCredentials(null, null);
  setStoredAdminUser(null);
}

export function clientHasPermission(
  user: AdminPublicUser | null,
  permission: AdminPermission
): boolean {
  if (!user || !user.enabled) return false;
  return userHasPermission(user.role, user.permissions, permission);
}

export function getAdminAuthHeaders(): Record<string, string> {
  const creds = getStoredAdminCredentials();
  if (!creds) return {};
  return {
    "X-Admin-Username": creds.username,
    "X-Admin-Password": creds.password,
  };
}
