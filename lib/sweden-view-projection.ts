import {
  SWEDEN_VIEW_BOUNDS,
  SWEDEN_VIEW_SVG,
} from "@/lib/sweden-view-bounds";

export interface SwedenViewCoords {
  /** 0–100 percent across the map stage (left). */
  xPercent: number;
  /** 0–100 percent down the map stage (top). */
  yPercent: number;
  /** Raw SVG x (0–200). */
  x: number;
  /** Raw SVG y (0–420). */
  y: number;
}

/** Project WGS84 coordinates onto the Sweden View SVG space. */
export function latLonToSwedenView(
  latitude: number,
  longitude: number
): SwedenViewCoords {
  const { minLon, maxLon, minLat, maxLat } = SWEDEN_VIEW_BOUNDS;
  const x =
    ((longitude - minLon) / (maxLon - minLon)) * SWEDEN_VIEW_SVG.width;
  const y =
    ((maxLat - latitude) / (maxLat - minLat)) * SWEDEN_VIEW_SVG.height;

  return {
    x,
    y,
    xPercent: (x / SWEDEN_VIEW_SVG.width) * 100,
    yPercent: (y / SWEDEN_VIEW_SVG.height) * 100,
  };
}
