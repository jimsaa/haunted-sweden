import { createHash } from "crypto";
import { getSpokjaktEntries } from "@/lib/spokjakt-archive";
import { absoluteUrl } from "@/lib/seo/urls";
import type { HauntedPlace } from "@/lib/types/place";

function fingerprint(value: unknown): string {
  return createHash("sha256").update(JSON.stringify(value)).digest("hex");
}

/** Approved public place pages only. */
export function placePageUrl(slug: string): string {
  return absoluteUrl(`/places/${slug}`);
}

export function investigationPageUrl(slug: string): string {
  return absoluteUrl(`/investigations/${slug}`);
}

export function buildPlaceFingerprints(
  places: HauntedPlace[]
): Record<string, string> {
  const out: Record<string, string> = {};
  for (const place of places) {
    if (place.status !== "approved" || !place.slug?.trim()) continue;
    out[place.slug] = fingerprint(place);
  }
  return out;
}

/**
 * Returns URLs for approved places that are new or changed.
 */
export function diffPublishedPlaceUrls(
  before: HauntedPlace[],
  after: HauntedPlace[]
): string[] {
  const beforeMap = buildPlaceFingerprints(before);
  const urls: string[] = [];

  for (const place of after) {
    if (place.status !== "approved" || !place.slug?.trim()) continue;
    const fp = fingerprint(place);
    const prev = beforeMap[place.slug];
    if (!prev || prev !== fp) {
      urls.push(placePageUrl(place.slug));
    }
  }

  return urls;
}

/** New investigation archive entries only (not updates). */
export function diffNewInvestigationUrls(
  knownSlugs: string[]
): string[] {
  const known = new Set(knownSlugs);
  const urls: string[] = [];

  for (const entry of getSpokjaktEntries()) {
    if (!entry.slug?.trim() || known.has(entry.slug)) continue;
    urls.push(investigationPageUrl(entry.slug));
  }

  return urls;
}

export function currentInvestigationSlugs(): string[] {
  return getSpokjaktEntries().map((e) => e.slug).filter(Boolean);
}
