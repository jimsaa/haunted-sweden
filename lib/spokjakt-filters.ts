import type { HauntedPlace } from "@/lib/types/place";
import {
  isFeaturedInSpokjakt,
  isLaxtonInvestigation,
} from "@/lib/spokjakt-place";
import { hasPremiumInvestigation } from "@/lib/investigation-sources";
import { isHauntedSwedenVerified } from "@/lib/verification";

export const SPOKJAKT_MAP_FILTERS = [
  "seen-in-spokjakt",
  "laxton-investigated",
  "haunted-sweden-verified",
  "premium-investigation",
  "overnight-stay",
] as const;

export type SpokjaktMapFilterId = (typeof SPOKJAKT_MAP_FILTERS)[number];

export interface SpokjaktFilterState {
  seenInSpokjakt?: boolean;
  laxtonInvestigated?: boolean;
  hauntedSwedenVerified?: boolean;
  premiumInvestigation?: boolean;
  overnightStay?: boolean;
}

export function applySpokjaktFilters(
  places: HauntedPlace[],
  filters: SpokjaktFilterState
): HauntedPlace[] {
  let result = places;
  const any =
    filters.seenInSpokjakt ||
    filters.laxtonInvestigated ||
    filters.hauntedSwedenVerified ||
    filters.premiumInvestigation ||
    filters.overnightStay;

  if (!any) return result;

  if (filters.seenInSpokjakt) {
    result = result.filter(isFeaturedInSpokjakt);
  }
  if (filters.laxtonInvestigated) {
    result = result.filter(isLaxtonInvestigation);
  }
  if (filters.hauntedSwedenVerified) {
    result = result.filter(isHauntedSwedenVerified);
  }
  if (filters.premiumInvestigation) {
    result = result.filter(hasPremiumInvestigation);
  }
  if (filters.overnightStay) {
    result = result.filter((p) => p.overnightInvestigation === true);
  }

  return result;
}
