import overridesFile from "@/data/spokjakt-place-overrides.json";
import { normalizeSpokjaktData } from "@/lib/investigation-sources";
import type { HauntedPlace } from "@/lib/types/place";
import type { SpokjaktPlaceData } from "@/lib/types/spokjakt-place";
import type { SpokjaktPriority } from "@/lib/types/spokjakt";

type OverrideRow = {
  featuredInSpokjakt: boolean;
  spokjaktPriority?: SpokjaktPriority;
  spokjaktData: SpokjaktPlaceData;
};

const overrides = overridesFile as Record<string, OverrideRow | string>;

/** Canonical Top 10 order for Spökjakt Sweden (Haunted Sweden). */
export const SPOKJAKT_TOP10_PLACE_SLUGS = [
  "borgvattnets-prastgard",
  "frammegarden",
  "bogesunds-slott",
  "malilla-sanatorium",
  "osterbybruks-herrgard",
  "backaskogs-kloster",
  "nasby-slott",
  "blombacka-herrgard",
  "norrsvedje-gastgiveri",
  "verkon",
] as const;

export function getSpokjaktOverride(slug: string): OverrideRow | undefined {
  const row = overrides[slug];
  if (!row || typeof row === "string") return undefined;
  return row;
}

export function mergeSpokjaktOntoPlace(place: HauntedPlace): HauntedPlace {
  const override = getSpokjaktOverride(place.slug);
  const fromPlace = place.spokjaktData;
  const rawData = override?.spokjaktData ?? fromPlace ?? null;
  const mergedData = rawData ? normalizeSpokjaktData(rawData) : null;

  const featuredInSpokjakt = Boolean(
    override?.featuredInSpokjakt ??
      place.featuredInSpokjakt ??
      place.featuredIn?.includes("spokjakt") ??
      mergedData
  );

  const featuredIn = new Set(place.featuredIn ?? []);
  if (featuredInSpokjakt) featuredIn.add("spokjakt");
  if (
    mergedData?.investigators.some(
      (n) => n.includes("Tony") || n.includes("Niclas")
    )
  ) {
    featuredIn.add("laxton-youtube");
  }

  return {
    ...place,
    featuredInSpokjakt,
    spokjaktData: mergedData,
    spokjaktPriority:
      override?.spokjaktPriority ??
      place.spokjaktPriority ??
      mergedData?.priority ??
      null,
    featuredIn: featuredIn.size > 0 ? [...featuredIn] : undefined,
  };
}

export function isFeaturedInSpokjakt(place: HauntedPlace): boolean {
  return Boolean(place.featuredInSpokjakt && place.spokjaktData);
}

export function isSpokjaktLegendary(place: HauntedPlace): boolean {
  return place.spokjaktPriority === "LEGENDARY";
}

export function isLaxtonInvestigation(place: HauntedPlace): boolean {
  if (place.featuredIn?.includes("laxton-youtube")) return true;
  const names = place.spokjaktData?.investigators ?? [];
  return names.some(
    (n) =>
      n.includes("Tony Martinsson") || n.includes("Niclas Laaksonen")
  );
}

export function countSpokjaktOnMap(places: HauntedPlace[]): number {
  return places.filter(isFeaturedInSpokjakt).length;
}

export function getSpokjaktStarterSlugs(): string[] {
  return Object.keys(overrides).filter((k) => !k.startsWith("_"));
}
