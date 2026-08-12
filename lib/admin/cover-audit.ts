import type { HauntedPlace } from "@/lib/types/place";
import { isRemoteCoverUrl } from "@/lib/place-cover";

export type CoverAuditStatus = "has" | "missing" | "broken" | "remote";

export type CoverAuditRow = {
  id: string;
  name: string;
  region: string;
  slug: string;
  coverImage: string | null;
  coverFilename: string | null;
  status: CoverAuditStatus;
  /** Public URL for thumbnail when the file/URL is usable */
  thumbnailSrc: string | null;
};

export type CoverAuditSummary = {
  total: number;
  hasCover: number;
  /** Empty coverImage field */
  missingCover: number;
  /** Local /places/… path but file missing on disk */
  brokenImages: number;
  /** Hotlinked http(s) URL — not self-hosted under public/ */
  remoteOnly: number;
  /** missing + broken + remote — locations that still need a hosted cover */
  needsCover: number;
  coveragePercent: number;
};

export type CoverAuditFilter = "all" | "missing" | "broken" | "remote" | "complete";
export type CoverAuditSort = "name" | "region" | "dateAdded";

/** Strip query/hash; return last path segment for display. */
export function coverImageFilename(coverImage: string | null | undefined): string | null {
  const raw = coverImage?.trim();
  if (!raw) return null;
  try {
    if (isRemoteCoverUrl(raw)) {
      const u = new URL(raw);
      const base = u.pathname.split("/").filter(Boolean).pop() ?? null;
      return base || raw;
    }
  } catch {
    /* fall through */
  }
  const pathOnly = raw.split("?")[0]?.split("#")[0] ?? raw;
  const base = pathOnly.split("/").filter(Boolean).pop();
  return base || pathOnly;
}

/**
 * Map a site-root path (`/places/foo.png`) to a path under `public/`.
 * Returns null for remote URLs or non-public paths.
 */
export function localPublicRelativePath(
  coverImage: string | null | undefined
): string | null {
  const raw = coverImage?.trim();
  if (!raw || isRemoteCoverUrl(raw)) return null;
  if (!raw.startsWith("/")) return null;
  // Reject path traversal
  if (raw.includes("..")) return null;
  return raw.replace(/^\/+/, "");
}

export function classifyCoverStatus(
  coverImage: string | null | undefined,
  localFileExists: boolean | null
): CoverAuditStatus {
  const raw = coverImage?.trim() ?? "";
  if (!raw) return "missing";
  if (isRemoteCoverUrl(raw)) return "remote";
  // Local public path: use filesystem result
  if (localFileExists === false) return "broken";
  if (localFileExists === true) return "has";
  // Non-empty but not a resolvable public path (and not remote) → broken
  if (!localPublicRelativePath(raw)) return "broken";
  return "has";
}

export function buildCoverAuditRow(
  place: Pick<HauntedPlace, "id" | "name" | "region" | "slug" | "coverImage">,
  localFileExists: boolean | null
): CoverAuditRow {
  const coverImage = place.coverImage?.trim() || null;
  const status = classifyCoverStatus(coverImage, localFileExists);
  return {
    id: place.id,
    name: place.name,
    region: place.region || "",
    slug: place.slug,
    coverImage,
    coverFilename: coverImageFilename(coverImage),
    status,
    thumbnailSrc:
      coverImage && status !== "missing" && status !== "broken"
        ? coverImage
        : null,
  };
}

export function summarizeCoverAudit(rows: CoverAuditRow[]): CoverAuditSummary {
  const total = rows.length;
  const hasCover = rows.filter((r) => r.status === "has").length;
  const missingCover = rows.filter((r) => r.status === "missing").length;
  const brokenImages = rows.filter((r) => r.status === "broken").length;
  const remoteOnly = rows.filter((r) => r.status === "remote").length;
  const needsCover = missingCover + brokenImages + remoteOnly;
  const coveragePercent =
    total === 0 ? 0 : Math.round((hasCover / total) * 1000) / 10;
  return {
    total,
    hasCover,
    missingCover,
    brokenImages,
    remoteOnly,
    needsCover,
    coveragePercent,
  };
}

export function filterCoverAuditRows(
  rows: CoverAuditRow[],
  filter: CoverAuditFilter
): CoverAuditRow[] {
  switch (filter) {
    case "missing":
      // User-facing “needs cover work”: no URL, broken file, or remote hotlink only
      return rows.filter(
        (r) =>
          r.status === "missing" ||
          r.status === "broken" ||
          r.status === "remote"
      );
    case "broken":
      return rows.filter((r) => r.status === "broken");
    case "remote":
      return rows.filter((r) => r.status === "remote");
    case "complete":
      return rows.filter((r) => r.status === "has");
    default:
      return rows;
  }
}

export function sortCoverAuditRows(
  rows: CoverAuditRow[],
  sort: CoverAuditSort
): CoverAuditRow[] {
  const copy = [...rows];
  copy.sort((a, b) => {
    if (sort === "region") {
      const cmp = a.region.localeCompare(b.region, "sv");
      return cmp !== 0 ? cmp : a.name.localeCompare(b.name, "sv");
    }
    if (sort === "dateAdded") {
      const ai = Number.parseInt(a.id, 10);
      const bi = Number.parseInt(b.id, 10);
      if (Number.isFinite(ai) && Number.isFinite(bi) && ai !== bi) {
        return ai - bi;
      }
      return a.id.localeCompare(b.id);
    }
    return a.name.localeCompare(b.name, "sv");
  });
  return copy;
}

/** Bullet list of locations still needing a self-hosted cover (for paste into artwork prompts). */
export function formatMissingLocationsList(rows: CoverAuditRow[]): string {
  return rows
    .filter(
      (r) =>
        r.status === "missing" ||
        r.status === "broken" ||
        r.status === "remote"
    )
    .sort((a, b) => a.name.localeCompare(b.name, "sv"))
    .map((r) => {
      const tag =
        r.status === "remote"
          ? "remote URL"
          : r.status === "broken"
            ? "broken file"
            : "no URL";
      return `- ${r.name} (${tag})`;
    })
    .join("\n");
}
