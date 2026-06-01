import type { Locale } from "@/lib/translations";
import type { HauntedPlace } from "@/lib/types/place";
import type { PlaceImage, PlaceVideo } from "@/lib/types/place-media";
import { getSwedishContentForSlug } from "@/lib/place-swedish-content";
import {
  warnMissingSafetyNoteEn,
  warnMissingSafetyNoteSv,
} from "@/lib/place-locale-dev-warnings";

export const SWEDISH_TEXT_PLACEHOLDER = "Svensk text kommer snart.";
export const SAFETY_SV_PLACEHOLDER = "Svensk säkerhetsinformation kommer snart.";

type PlaceWithI18n = HauntedPlace & {
  shortDescriptionSv?: string;
  historySv?: string;
  legendSv?: string;
  hauntedSwedenAppSummarySv?: string;
  safetyNoteSv?: string;
};

type ImageWithI18n = PlaceImage & { captionSv?: string };
type VideoWithI18n = PlaceVideo & { titleSv?: string; captionSv?: string };

function asI18n(place: HauntedPlace): PlaceWithI18n {
  return place as PlaceWithI18n;
}

/** Resolve Swedish from JSON field, static map, or placeholder. */
export function resolveSwedishField(
  slug: string,
  jsonValue: string | undefined,
  staticValue: string | undefined,
  englishValue: string | undefined
): string {
  const fromJson = jsonValue?.trim();
  if (fromJson && !looksLikeUntranslatedEnglish(fromJson, englishValue)) {
    return fromJson;
  }
  const fromStatic = staticValue?.trim();
  if (fromStatic) return fromStatic;
  if (englishValue?.trim()) return SWEDISH_TEXT_PLACEHOLDER;
  return SWEDISH_TEXT_PLACEHOLDER;
}

/** Heuristic: field is likely still English copy-paste. */
function looksLikeUntranslatedEnglish(sv: string, en?: string): boolean {
  if (!en?.trim()) return false;
  return sv.trim().toLowerCase() === en.trim().toLowerCase();
}

export function getPlaceShortDescription(
  place: HauntedPlace,
  locale: Locale
): string {
  const p = asI18n(place);
  const staticSv = getSwedishContentForSlug(place.slug);
  if (locale === "sv") {
    return resolveSwedishField(
      place.slug,
      p.shortDescriptionSv,
      staticSv?.shortDescription,
      place.shortDescription
    );
  }
  return place.shortDescription?.trim() || "";
}

export function getPlaceHistory(place: HauntedPlace, locale: Locale): string {
  const p = asI18n(place);
  const staticSv = getSwedishContentForSlug(place.slug);
  if (locale === "sv") {
    return resolveSwedishField(
      place.slug,
      p.historySv,
      staticSv?.history,
      place.history
    );
  }
  return place.history?.trim() || "";
}

export function getPlaceLegend(place: HauntedPlace, locale: Locale): string {
  const p = asI18n(place);
  const staticSv = getSwedishContentForSlug(place.slug);
  if (locale === "sv") {
    return resolveSwedishField(
      place.slug,
      p.legendSv,
      staticSv?.legend,
      place.legend
    );
  }
  return place.legend?.trim() || "";
}

/** Cards / popups: prefer app summary, then short description. */
export function getPlaceSummary(place: HauntedPlace, locale: Locale): string {
  const p = asI18n(place);
  const staticSv = getSwedishContentForSlug(place.slug);
  if (locale === "sv") {
    const summarySv = p.hauntedSwedenAppSummarySv?.trim();
    if (
      summarySv &&
      !looksLikeUntranslatedEnglish(
        summarySv,
        p.hauntedSwedenAppSummary ?? undefined
      )
    ) {
      return summarySv;
    }
    if (staticSv?.summary?.trim()) return staticSv.summary.trim();
    const short = getPlaceShortDescription(place, locale);
    if (short && short !== SWEDISH_TEXT_PLACEHOLDER) return short;
    return short || SWEDISH_TEXT_PLACEHOLDER;
  }
  return (
    place.hauntedSwedenAppSummary?.trim() ||
    place.shortDescription?.trim() ||
    ""
  );
}

export function getImageCaption(image: PlaceImage, locale: Locale): string | undefined {
  const img = image as ImageWithI18n;
  if (locale === "sv") {
    return img.captionSv?.trim() || img.caption?.trim() || undefined;
  }
  return img.caption?.trim() || undefined;
}

export function getVideoTitle(video: PlaceVideo, locale: Locale): string | undefined {
  const vid = video as VideoWithI18n;
  if (locale === "sv") {
    return vid.titleSv?.trim() || vid.title?.trim() || undefined;
  }
  return vid.title?.trim() || undefined;
}

export function getVideoCaption(video: PlaceVideo, locale: Locale): string | undefined {
  const vid = video as VideoWithI18n;
  if (locale === "sv") {
    return vid.captionSv?.trim() || vid.caption?.trim() || undefined;
  }
  return vid.caption?.trim() || undefined;
}

/**
 * Safety section body — never mixes languages.
 * SV: safetyNoteSv only (placeholder if missing, never English).
 * EN: safetyNote only.
 */
export function getPlaceSafetyNote(
  place: HauntedPlace,
  locale: Locale
): string | null {
  const p = asI18n(place);
  const en = place.safetyNote?.trim() ?? "";
  const sv = p.safetyNoteSv?.trim() ?? "";

  if (locale === "sv") {
    if (sv && !looksLikeUntranslatedEnglish(sv, en || undefined)) {
      return sv;
    }
    if (en) {
      warnMissingSafetyNoteSv(place.slug);
      return SAFETY_SV_PLACEHOLDER;
    }
    return null;
  }

  if (!en) {
    warnMissingSafetyNoteEn(place.slug);
    return null;
  }
  return en;
}

export function hasPlaceSafetyNote(place: HauntedPlace, locale: Locale): boolean {
  return Boolean(getPlaceSafetyNote(place, locale)?.trim());
}
