import { NextResponse } from "next/server";
import { getIndexNowKey } from "@/lib/indexnow/config";

/**
 * Serves the IndexNow verification key (rewritten from /{key}.txt).
 * Not used for URL submission — public read only.
 */
export async function GET() {
  const key = await getIndexNowKey();
  if (!key) {
    return new NextResponse("IndexNow key not configured", { status: 404 });
  }

  return new NextResponse(key, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
