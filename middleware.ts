import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  adminGeoBlockResponse,
  isAdminGeoAllowed,
} from "@/lib/admin/geo-guard";

export const config = {
  matcher: ["/admin", "/admin/:path*", "/api/admin/:path*"],
};

export function middleware(request: NextRequest) {
  if (!isAdminGeoAllowed(request)) {
    return adminGeoBlockResponse(request, request.nextUrl.pathname);
  }
  return NextResponse.next();
}
