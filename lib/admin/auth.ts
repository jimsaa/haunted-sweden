/**
 * Admin session (client). Login via POST /api/admin/login; API auth via X-Admin-Session.
 */
import type { AdminPermission } from "@/lib/admin/permissions";
import { userHasPermission } from "@/lib/admin/permissions";
import { ADMIN_SESSION_TTL_MS } from "@/lib/admin/session-token";
import type { AdminPublicUser } from "@/lib/admin/users-types";

export const ADMIN_SESSION_STORAGE_KEY = "haunted-sweden-admin-session";
export const ADMIN_USER_STORAGE_KEY = "haunted-sweden-admin-user";
export const ADMIN_LOGIN_AT_KEY = "haunted-sweden-admin-login-at";
export const ADMIN_SESSION_EXPIRES_KEY = "haunted-sweden-admin-expires-at";
const ADMIN_SESSION_TOKEN_KEY = "haunted-sweden-admin-session-token";

/** @deprecated Legacy credential headers — prefer session token. */
const ADMIN_USERNAME_KEY = "haunted-sweden-admin-username";
const ADMIN_PASSWORD_KEY = "haunted-sweden-admin-password";

export function isAdminSessionExpired(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const expiresAt = localStorage.getItem(ADMIN_SESSION_EXPIRES_KEY);
    if (expiresAt) {
      return Date.now() >= new Date(expiresAt).getTime();
    }
    const loginAt = localStorage.getItem(ADMIN_LOGIN_AT_KEY);
    if (!loginAt) return true;
    return Date.now() - Number(loginAt) > ADMIN_SESSION_TTL_MS;
  } catch {
    return true;
  }
}

export function isAdminSessionActive(): boolean {
  if (typeof window === "undefined") return false;
  try {
    if (localStorage.getItem(ADMIN_SESSION_STORAGE_KEY) !== "unlocked") {
      return false;
    }
    return !isAdminSessionExpired();
  } catch {
    return false;
  }
}

export function setAdminSession(
  active: boolean,
  userId?: string,
  expiresAt?: string
): void {
  if (typeof window === "undefined") return;
  try {
    if (active && userId) {
      localStorage.setItem(ADMIN_SESSION_STORAGE_KEY, "unlocked");
      localStorage.setItem(`${ADMIN_SESSION_STORAGE_KEY}-id`, userId);
      localStorage.setItem(ADMIN_LOGIN_AT_KEY, String(Date.now()));
      if (expiresAt) {
        localStorage.setItem(ADMIN_SESSION_EXPIRES_KEY, expiresAt);
      }
    } else {
      localStorage.removeItem(ADMIN_SESSION_STORAGE_KEY);
      localStorage.removeItem(`${ADMIN_SESSION_STORAGE_KEY}-id`);
      localStorage.removeItem(ADMIN_USER_STORAGE_KEY);
      localStorage.removeItem(ADMIN_LOGIN_AT_KEY);
      localStorage.removeItem(ADMIN_SESSION_EXPIRES_KEY);
    }
  } catch {
    /* ignore */
  }
}

export function getStoredAdminSessionToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return sessionStorage.getItem(ADMIN_SESSION_TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setStoredAdminSessionToken(token: string | null): void {
  if (typeof window === "undefined") return;
  try {
    if (token) {
      sessionStorage.setItem(ADMIN_SESSION_TOKEN_KEY, token);
    } else {
      sessionStorage.removeItem(ADMIN_SESSION_TOKEN_KEY);
    }
  } catch {
    /* ignore */
  }
}

/** @deprecated Password replay — cleared on new login. */
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

export function getStoredAdminUser(): AdminPublicUser | null {
  if (typeof window === "undefined") return null;
  try {
    let raw = localStorage.getItem(ADMIN_USER_STORAGE_KEY);
    if (!raw) {
      raw = sessionStorage.getItem(ADMIN_USER_STORAGE_KEY);
      if (raw) {
        localStorage.setItem(ADMIN_USER_STORAGE_KEY, raw);
        sessionStorage.removeItem(ADMIN_USER_STORAGE_KEY);
      }
    }
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
      localStorage.setItem(ADMIN_USER_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(ADMIN_USER_STORAGE_KEY);
    }
  } catch {
    /* ignore */
  }
}

export function clearAdminSession(): void {
  setAdminSession(false);
  setStoredAdminSessionToken(null);
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
  if (isAdminSessionExpired()) {
    return {};
  }
  const token = getStoredAdminSessionToken();
  if (token) {
    return { "X-Admin-Session": token };
  }
  const creds = getStoredAdminCredentials();
  if (!creds) return {};
  return {
    "X-Admin-Username": creds.username,
    "X-Admin-Password": creds.password,
  };
}
