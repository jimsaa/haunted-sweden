import type { NextRequest } from "next/server";

/** Client IP from Vercel / proxy headers. */
export function getClientIp(request: Request | NextRequest): string {
  const headers = request.headers;
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  const realIp = headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "unknown";
}

/** ISO country code (e.g. SE) from edge headers. */
export function getCountryCode(request: Request | NextRequest): string | null {
  const vercel = request.headers.get("x-vercel-ip-country");
  if (vercel?.trim()) return vercel.trim().toUpperCase();

  const cf = request.headers.get("cf-ipcountry");
  if (cf?.trim()) return cf.trim().toUpperCase();

  return null;
}

export function isLocalhostRequest(request: Request | NextRequest): boolean {
  const host = (request.headers.get("host") ?? "").toLowerCase();
  if (
    host.startsWith("localhost") ||
    host.startsWith("127.0.0.1") ||
    host.startsWith("[::1]")
  ) {
    return true;
  }
  const ip = getClientIp(request);
  return ip === "127.0.0.1" || ip === "::1" || ip === "localhost";
}
