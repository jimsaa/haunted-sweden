import { NextResponse } from "next/server";
import { existsSync } from "fs";
import { readFile } from "fs/promises";
import path from "path";
import { requireAdminUser } from "@/lib/admin/api-auth";
import {
  buildCoverAuditRow,
  localPublicRelativePath,
  summarizeCoverAudit,
  type CoverAuditRow,
} from "@/lib/admin/cover-audit";
import type { HauntedPlacesFile } from "@/lib/types/place";

const DATA_PATH = path.join(process.cwd(), "data", "haunted-places.json");
const PUBLIC_DIR = path.join(process.cwd(), "public");

function checkLocalCoverExists(coverImage: string | null | undefined): boolean | null {
  const rel = localPublicRelativePath(coverImage);
  if (!rel) {
    // Remote or empty — no local file check
    return null;
  }
  const absolute = path.resolve(PUBLIC_DIR, rel);
  const publicRoot = path.resolve(PUBLIC_DIR);
  // Ensure resolved path stays under public/
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
    const raw = await readFile(DATA_PATH, "utf8");
    const data = JSON.parse(raw) as HauntedPlacesFile;
    const places = Array.isArray(data.places) ? data.places : [];

    const rows: CoverAuditRow[] = places.map((place) => {
      const exists = checkLocalCoverExists(place.coverImage);
      return buildCoverAuditRow(place, exists);
    });

    const summary = summarizeCoverAudit(rows);

    return NextResponse.json({
      summary,
      rows,
      generatedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error("[admin/cover-audit GET]", err);
    return NextResponse.json(
      { error: "Failed to audit cover images" },
      { status: 500 }
    );
  }
}
