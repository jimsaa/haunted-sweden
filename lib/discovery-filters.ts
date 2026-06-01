import { distanceMeters } from "@/lib/geo";
import { PHASE1_CENTER } from "@/lib/local-strategy";
import type { HauntedPlace } from "@/lib/types/place";
import { isHauntedSwedenVerified } from "@/lib/verification";

/**
 * Discovery filters — schema prepared for map UI.
 * Only `haunted-sweden-verified` is active in MVP; others are no-ops until built.
 */
export const FUTURE_DISCOVERY_FILTERS = [
  "haunted-sweden-verified",
  "nearby-me",
  "family-friendly",
  "public-access",
  "night-access",
  "free-access",
  "overnight-stay",
] as const;

export type DiscoveryFilterId = (typeof FUTURE_DISCOVERY_FILTERS)[number];

export interface DiscoveryFilterState {
  hauntedSwedenVerified?: boolean;
  /** @future Requires geolocation */
  nearbyMe?: boolean;
  nearbyMeCoords?: { lat: number; lng: number };
  nearbyMeRadiusM?: number;
  familyFriendly?: boolean;
  publicAccess?: boolean;
  nightAccess?: boolean;
  freeAccess?: boolean;
  overnightStay?: boolean;
}

export function applyDiscoveryFilters(
  places: HauntedPlace[],
  filters: DiscoveryFilterState
): HauntedPlace[] {
  let result = places;

  if (filters.hauntedSwedenVerified) {
    result = result.filter(isHauntedSwedenVerified);
  }
  if (filters.familyFriendly) {
    result = result.filter((p) => p.familyFriendly);
  }
  if (filters.publicAccess) {
    result = result.filter((p) => p.publicAccess === true);
  }
  if (filters.nightAccess) {
    result = result.filter((p) => p.nightAccess === true);
  }
  if (filters.freeAccess) {
    result = result.filter(
      (p) =>
        p.accessType.toLowerCase().includes("public") ||
        p.accessType.toLowerCase().includes("trail") ||
        p.publicAccess === true
    );
  }
  if (filters.overnightStay) {
    result = result.filter(
      (p) =>
        p.overnightInvestigation ||
        p.category === "Haunted Accommodation" ||
        p.category === "Haunted Museum" ||
        p.accessType.toLowerCase().includes("accommodation") ||
        p.accessType.toLowerCase().includes("museum")
    );
  }
  if (filters.nearbyMe && filters.nearbyMeCoords) {
    const radius = filters.nearbyMeRadiusM ?? 80_000;
    result = result.filter((p) => {
      if (p.latitude == null || p.longitude == null) return false;
      return (
        distanceMeters(
          filters.nearbyMeCoords!.lat,
          filters.nearbyMeCoords!.lng,
          p.latitude,
          p.longitude
        ) <= radius
      );
    });
  }

  return result;
}

/** Places within phase-1 Gothenburg radius (for curation tooling). */
export function filterPhase1Region(places: HauntedPlace[]): HauntedPlace[] {
  const radiusM = 80 * 1000;
  return places.filter((p) => {
    if (p.latitude == null || p.longitude == null) return false;
    return (
      distanceMeters(
        PHASE1_CENTER.latitude,
        PHASE1_CENTER.longitude,
        p.latitude,
        p.longitude
      ) <= radiusM
    );
  });
}
