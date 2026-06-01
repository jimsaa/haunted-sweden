import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { GEO_BLOCK_MESSAGE } from "@/lib/admin/messages";
import {
  getClientIp,
  getCountryCode,
  isLocalhostRequest,
} from "@/lib/admin/request-context";
const SWEDEN_CODE = "SE";

export function isAdminGeoAllowed(request: NextRequest): boolean {
  if (process.env.NODE_ENV !== "production") return true;
  if (isLocalhostRequest(request)) return true;

  const country = getCountryCode(request);
  if (!country) {
    // No geo header in production — deny (fail closed for admin)
    return false;
  }
  return country === SWEDEN_CODE;
}

export function adminGeoBlockResponse(
  request: NextRequest,
  pathname: string
): NextResponse {
  console.warn(
    "[admin-security]",
    JSON.stringify({
      type: "geo_blocked",
      timestamp: new Date().toISOString(),
      ip: getClientIp(request),
      country: getCountryCode(request),
      path: pathname,
      reason: "country_not_se",
    })
  );

  const isApi = pathname.startsWith("/api/");
  if (isApi) {
    return NextResponse.json({ error: GEO_BLOCK_MESSAGE }, { status: 403 });
  }

  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"/><meta name="robots" content="noindex,nofollow"/><title>403</title>
<style>body{font-family:system-ui,sans-serif;background:#0a0a12;color:#e9e9f0;display:flex;min-height:100vh;align-items:center;justify-content:center;margin:0;padding:1.5rem;text-align:center}</style>
</head>
<body><div><h1 style="color:#a78bfa;font-size:1.25rem">403 Forbidden</h1><p style="opacity:.75;max-width:24rem">${GEO_BLOCK_MESSAGE}</p></div></body>
</html>`;

  return new NextResponse(html, {
    status: 403,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
