/**
 * TODO: Replace with proper authentication (OAuth, env-based secrets, Supabase RLS)
 * before any production deploy. Never ship this dev password publicly.
 *
 * LOCAL DEVELOPMENT ONLY — temporary admin gate for /admin.
 */
export const ADMIN_SESSION_STORAGE_KEY = "haunted-sweden-admin-session";

/** Dev-only password for /admin — not for production. */
const DEV_ADMIN_PASSWORD = "3513";

export function isAdminApiEnabled(): boolean {
  return process.env.NODE_ENV !== "production";
}

export function verifyAdminPassword(password: string): boolean {
  return isAdminApiEnabled() && password === DEV_ADMIN_PASSWORD;
}

export function isAdminSessionActive(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(ADMIN_SESSION_STORAGE_KEY) === "unlocked";
  } catch {
    return false;
  }
}

export function setAdminSession(active: boolean): void {
  if (typeof window === "undefined") return;
  try {
    if (active) {
      localStorage.setItem(ADMIN_SESSION_STORAGE_KEY, "unlocked");
    } else {
      localStorage.removeItem(ADMIN_SESSION_STORAGE_KEY);
    }
  } catch {
    /* ignore */
  }
}

export function getStoredAdminPassword(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return sessionStorage.getItem("haunted-sweden-admin-password");
  } catch {
    return null;
  }
}

export function setStoredAdminPassword(password: string | null): void {
  if (typeof window === "undefined") return;
  try {
    if (password) {
      sessionStorage.setItem("haunted-sweden-admin-password", password);
    } else {
      sessionStorage.removeItem("haunted-sweden-admin-password");
    }
  } catch {
    /* ignore */
  }
}
