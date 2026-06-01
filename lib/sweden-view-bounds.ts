/** Geographic bounds aligned with the Sweden outline SVG projection. */
export const SWEDEN_VIEW_BOUNDS = {
  minLon: 10.75,
  maxLon: 24.25,
  minLat: 55.05,
  maxLat: 69.15,
} as const;

/** SVG coordinate space for the stylized Sweden outline. */
export const SWEDEN_VIEW_SVG = {
  width: 200,
  height: 420,
} as const;
