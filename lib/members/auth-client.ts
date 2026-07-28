/**
 * Client-side members session helpers.
 */
import type { MemberPublicProfile } from "@/lib/members/types";

export const MEMBER_SESSION_KEY = "haunted-sweden-member-session";
export const MEMBER_USER_KEY = "haunted-sweden-member-user";
export const MEMBER_EXPIRES_KEY = "haunted-sweden-member-expires";
const MEMBER_TOKEN_KEY = "haunted-sweden-member-token";

export function getStoredMemberToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return sessionStorage.getItem(MEMBER_TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setStoredMemberToken(token: string | null): void {
  if (typeof window === "undefined") return;
  try {
    if (token) sessionStorage.setItem(MEMBER_TOKEN_KEY, token);
    else sessionStorage.removeItem(MEMBER_TOKEN_KEY);
  } catch {
    /* ignore */
  }
}

export function getStoredMemberUser(): MemberPublicProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(MEMBER_USER_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as MemberPublicProfile;
  } catch {
    return null;
  }
}

export function setStoredMemberUser(user: MemberPublicProfile | null): void {
  if (typeof window === "undefined") return;
  try {
    if (user) localStorage.setItem(MEMBER_USER_KEY, JSON.stringify(user));
    else localStorage.removeItem(MEMBER_USER_KEY);
  } catch {
    /* ignore */
  }
}

export function isMemberSessionExpired(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const expiresAt = localStorage.getItem(MEMBER_EXPIRES_KEY);
    if (!expiresAt) return true;
    return Date.now() >= new Date(expiresAt).getTime();
  } catch {
    return true;
  }
}

export function isMemberSessionActive(): boolean {
  if (typeof window === "undefined") return false;
  try {
    if (localStorage.getItem(MEMBER_SESSION_KEY) !== "unlocked") return false;
    return !isMemberSessionExpired();
  } catch {
    return false;
  }
}

export function setMemberSession(active: boolean, expiresAt?: string): void {
  if (typeof window === "undefined") return;
  try {
    if (active) {
      localStorage.setItem(MEMBER_SESSION_KEY, "unlocked");
      if (expiresAt) localStorage.setItem(MEMBER_EXPIRES_KEY, expiresAt);
    } else {
      localStorage.removeItem(MEMBER_SESSION_KEY);
      localStorage.removeItem(MEMBER_EXPIRES_KEY);
      localStorage.removeItem(MEMBER_USER_KEY);
    }
  } catch {
    /* ignore */
  }
}

export function clearMemberSession(): void {
  setMemberSession(false);
  setStoredMemberToken(null);
  setStoredMemberUser(null);
}

export function getMemberAuthHeaders(): Record<string, string> {
  if (isMemberSessionExpired()) return {};
  const token = getStoredMemberToken();
  if (!token) return {};
  return { "X-Member-Session": token };
}
