import type { HauntedPlace } from "@/lib/types/place";
import {
  MAP_MARKER_BADGE_ORDER,
  SWEDEN_POPUP_BADGE_ORDER,
  type MapMarkerBadge,
  type SwedenPopupBadge,
} from "@/lib/map-icon-types";
import { hasPremiumInvestigation } from "@/lib/investigation-sources";
import { isFeaturedInSpokjakt, isLaxtonInvestigation } from "@/lib/spokjakt-place";
import {
  isHauntedSwedenVerified,
  isHauntedSwedenVisited,
} from "@/lib/verification";

export interface MapBadgeLabels {
  verified: string;
  visited: string;
  spokjakt: string;
  laxton: string;
  featured: string;
  "night-access": string;
  overnight: string;
  "family-friendly"?: string;
  "public-access"?: string;
}

export function getMapMarkerBadges(place: HauntedPlace): MapMarkerBadge[] {
  const set = new Set<MapMarkerBadge>();
  if (isHauntedSwedenVerified(place)) set.add("verified");
  if (isHauntedSwedenVisited(place)) set.add("visited");
  if (isFeaturedInSpokjakt(place)) set.add("spokjakt");
  if (isLaxtonInvestigation(place)) set.add("laxton");
  if (place.featured || hasPremiumInvestigation(place)) set.add("featured");
  if (place.nightAccess === true) set.add("night-access");
  if (place.overnightInvestigation === true) set.add("overnight");
  return MAP_MARKER_BADGE_ORDER.filter((b) => set.has(b));
}

export function getBadgeLabel(
  badge: MapMarkerBadge,
  labels: MapBadgeLabels
): string {
  return labels[badge];
}

/** Metadata icons for Sweden View popup (only properties that apply). */
export function getSwedenPopupBadges(place: HauntedPlace): SwedenPopupBadge[] {
  const set = new Set<SwedenPopupBadge>(getMapMarkerBadges(place));
  if (place.familyFriendly) set.add("family-friendly");
  if (place.publicAccess === true) set.add("public-access");
  return SWEDEN_POPUP_BADGE_ORDER.filter((b) => set.has(b));
}

export function getSwedenPopupBadgeLabel(
  badge: SwedenPopupBadge,
  labels: MapBadgeLabels
): string {
  if (badge === "family-friendly") {
    return labels["family-friendly"] ?? "Family friendly";
  }
  if (badge === "public-access") {
    return labels["public-access"] ?? "Public access";
  }
  return labels[badge];
}

/** Tooltip for Sweden View modal status badges (featured vs premium). */
export function getSwedenPopupBadgeTooltip(
  badge: SwedenPopupBadge,
  place: HauntedPlace,
  labels: MapBadgeLabels & { premium?: string }
): string {
  if (badge === "featured") {
    if (place.featured) {
      return labels.featured;
    }
    return labels.premium ?? labels.featured;
  }
  return getSwedenPopupBadgeLabel(badge, labels);
}
