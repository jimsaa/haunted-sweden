import {
  DEFAULT_VERIFICATION,
  VERIFICATION_LEVELS,
  type PlaceVerification,
  type VerificationLevel,
} from "@/lib/types/verification";
import type { HauntedPlace } from "@/lib/types/place";
import type { Locale } from "@/lib/translations";
import { getTranslations } from "@/lib/i18n";

export function isVerificationLevel(value: string): value is VerificationLevel {
  return (VERIFICATION_LEVELS as readonly string[]).includes(value);
}

/**
 * Normalize verification from JSON.
 * Haunted Sweden team flags are never inferred from level or legacy `verified`.
 */
export function normalizeVerification(
  place: Partial<HauntedPlace> & { verified?: boolean; visitedByTeam?: boolean }
): PlaceVerification & { visitedByTeam: boolean } {
  const verifiedByTeam = place.verifiedByTeam === true;
  const visitedByTeam = place.visitedByTeam === true;

  let resolvedLevel: VerificationLevel = isVerificationLevel(
    place.verificationLevel ?? ""
  )
    ? place.verificationLevel!
    : "community-submitted";

  if (resolvedLevel === "haunted-sweden-verified" && !verifiedByTeam) {
    resolvedLevel = "community-verified";
  }

  return {
    verificationLevel: resolvedLevel,
    verifiedByTeam,
    visitedByTeam,
    visitCount: place.visitCount ?? 0,
    lastInvestigationDate: place.lastInvestigationDate ?? null,
    investigationPhotos: place.investigationPhotos ?? [],
    investigationVideos: place.investigationVideos ?? [],
    overnightInvestigation: place.overnightInvestigation ?? false,
  };
}

/** @deprecated Legacy `verified` flag — mirrors manual team verification only. */
export function syncLegacyVerifiedFlag(
  verification: Pick<PlaceVerification, "verifiedByTeam">
): boolean {
  return verification.verifiedByTeam === true;
}

/** Haunted Sweden Verified badge — only when admin sets verifiedByTeam. */
export function isHauntedSwedenVerified(place: HauntedPlace): boolean {
  return place.verifiedByTeam === true;
}

/** Haunted Sweden Visited badge — only when admin sets visitedByTeam. */
export function isHauntedSwedenVisited(place: HauntedPlace): boolean {
  return place.visitedByTeam === true;
}

export function isCommunityVerified(place: HauntedPlace): boolean {
  return place.verificationLevel === "community-verified";
}

export function getVerificationLabel(
  level: VerificationLevel,
  locale: Locale
): string {
  const labels = getTranslations(locale).verificationLevels;
  return labels[level] ?? level;
}

export function getVerificationDescription(
  level: VerificationLevel,
  locale: Locale
): string {
  const descriptions = getTranslations(locale).verificationDescriptions;
  return descriptions[level] ?? "";
}
