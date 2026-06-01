/** Visual marker families on the Haunted Sweden map. */
export const MAP_ICON_TYPES = [
  "castle-fortress",
  "church-cemetery",
  "burial-ground",
  "haunted-accommodation",
  "museum",
  "nature-site",
  "manor-estate",
  "urban-haunting",
  "legend-site",
] as const;

export type MapIconType = (typeof MAP_ICON_TYPES)[number];

export type MapMarkerBadge =
  | "verified"
  | "visited"
  | "spokjakt"
  | "laxton"
  | "featured"
  | "night-access"
  | "overnight";

export const MAP_MARKER_BADGE_ORDER: MapMarkerBadge[] = [
  "verified",
  "visited",
  "spokjakt",
  "laxton",
  "featured",
  "night-access",
  "overnight",
];

/** Shown in Sweden View popup icon row (not on map pins). */
export type SwedenPopupBadge =
  | MapMarkerBadge
  | "family-friendly"
  | "public-access";

export const SWEDEN_POPUP_BADGE_ORDER: SwedenPopupBadge[] = [
  ...MAP_MARKER_BADGE_ORDER,
  "family-friendly",
  "public-access",
];
