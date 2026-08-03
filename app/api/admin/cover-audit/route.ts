import { NextResponse } from "next/server";
import { existsSync } from "fs";
import path from "path";
import { requireAdminUser } from "@/lib/admin/api-auth";
import {
  buildCoverAuditRow,
  localPublicRelativePath,
  summarizeCoverAudit,
  type CoverAuditRow,
} from "@/lib/admin/cover-audit";
import { readPlacesCatalog } from "@/lib/admin/places-json-store";

const PUBLIC_DIR = path.join(process.cwd(), "public");

function checkLocalCoverExists(coverImage: string | null | undefined): boolean | null {
  const rel = localPublicRelativePath(coverImage);
  if (!rel) {
    return null;
  }
  const absolute = path.resolve(PUBLIC_DIR, rel);
  const publicRoot = path.resolve(PUBLIC_DIR);
  if (
    absolute !== publicRoot &&
    !absolute.startsWith(publicRoot + path.sep)
  ) {
    return false;
  }
  return existsSync(absolute);
}

export async function GET(request: Request) {
  const auth = await requireAdminUser(request);
  if (!auth.ok) return auth.response;

  try {
    // Production: read latest from GitHub when token is set (same source as Save cover)
    const { file, source } = await readPlacesCatalog();
    const places = Array.isArray(file.places) ? file.places : [];

    const rows: CoverAuditRow[] = places.map((place) => {
      const exists = checkLocalCoverExists(place.coverImage);
      return buildCoverAuditRow(place, exists);
    });

    const summary = summarizeCoverAudit(rows);

    return NextResponse.json({
      summary,
      rows,
      source,
      generatedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error("[admin/cover-audit GET]", err);
    const message =
      err instanceof Error ? err.message : "Failed to audit cover images";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
