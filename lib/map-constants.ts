import type { LatLngBoundsExpression, LatLngExpression } from "leaflet";

/** Default map center — Sweden. */
export const SWEDEN_CENTER: LatLngExpression = [62.0, 15.0];

export const SWEDEN_DEFAULT_ZOOM_DESKTOP = 5;
export const SWEDEN_DEFAULT_ZOOM_MOBILE = 4.7;

/** Pan/zoom limits — Nordics with margin. */
export const SWEDEN_BOUNDS = {
  south: 55.0,
  west: 10.0,
  north: 69.5,
  east: 25.0,
} as const;

export const SWEDEN_MAX_BOUNDS: LatLngBoundsExpression = [
  [SWEDEN_BOUNDS.south, SWEDEN_BOUNDS.west],
  [SWEDEN_BOUNDS.north, SWEDEN_BOUNDS.east],
];

export const SWEDEN_MIN_ZOOM = 4;
export const SWEDEN_MAX_ZOOM = 18;

/** Zoom when focusing a single haunted location. */
export const PLACE_FOCUS_ZOOM = 12;

export const MAP_TILE_URL =
  "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";

export const MAP_TILE_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>';
