import type { HauntedPlace } from "@/lib/types/place";
import { latLonToSwedenView } from "@/lib/sweden-view-projection";
import type {
  SwedenViewportMetrics,
  SwedenViewportTransform,
} from "@/lib/sweden-view-viewport";

export type SwedenViewPercentPoint = { xPercent: number; yPercent: number };

export type SpiderfiedPlace = {
  place: HauntedPlace;
  xPercent: number;
  yPercent: number;
};

export type SpiderfyLayout = {
  center: SwedenViewPercentPoint;
  places: SpiderfiedPlace[];
};

const MIN_SEPARATION_PX = 42;

function projectPlace(place: HauntedPlace): SwedenViewPercentPoint | null {
  if (place.latitude == null || place.longitude == null) return null;
  return latLonToSwedenView(place.latitude, place.longitude);
}

export function getClusterCenter(
  places: HauntedPlace[]
): SwedenViewPercentPoint {
  const projected = places
    .map(projectPlace)
    .filter((p): p is SwedenViewPercentPoint => p != null);
  if (projected.length === 0) return { xPercent: 50, yPercent: 50 };
  return {
    xPercent:
      projected.reduce((s, p) => s + p.xPercent, 0) / projected.length,
    yPercent:
      projected.reduce((s, p) => s + p.yPercent, 0) / projected.length,
  };
}

/** Spread pins in a circle around the cluster centroid (percent space). */
export function computeSpiderfyLayout(
  places: HauntedPlace[],
  center?: SwedenViewPercentPoint
): SpiderfyLayout {
  const c = center ?? getClusterCenter(places);
  const n = places.length;
  const baseRadius =
    n <= 2 ? 0.55 : n <= 4 ? 0.75 : n <= 8 ? 1.05 : Math.min(2.8, 0.9 + n * 0.12);

  const spiderfied: SpiderfiedPlace[] = places.map((place, i) => {
    const angle = (2 * Math.PI * i) / n - Math.PI / 2;
    const raw = projectPlace(place);
    const distFromCenter = raw
      ? Math.hypot(raw.xPercent - c.xPercent, raw.yPercent - c.yPercent)
      : 0;
    const radius = baseRadius + Math.min(distFromCenter * 0.15, 0.35);
    return {
      place,
      xPercent: c.xPercent + Math.cos(angle) * radius,
      yPercent: c.yPercent + Math.sin(angle) * radius,
    };
  });

  return { center: c, places: spiderfied };
}

function percentToMapPixels(
  point: SwedenViewPercentPoint,
  metrics: SwedenViewportMetrics,
  transform: SwedenViewportTransform
): { x: number; y: number } {
  const mapX = (point.xPercent / 100) * metrics.mapWidth;
  const mapY = (point.yPercent / 100) * metrics.mapHeight;
  return {
    x: transform.x + mapX * transform.scale,
    y: transform.y + mapY * transform.scale,
  };
}

/** True if every spiderfied pin has enough on-screen separation. */
export function isSpiderfySeparatedOnScreen(
  layout: SpiderfyLayout,
  transform: SwedenViewportTransform,
  metrics: SwedenViewportMetrics,
  minSeparationPx = MIN_SEPARATION_PX
): boolean {
  const pixels = layout.places.map((p) =>
    percentToMapPixels(
      { xPercent: p.xPercent, yPercent: p.yPercent },
      metrics,
      transform
    )
  );

  for (let i = 0; i < pixels.length; i++) {
    for (let j = i + 1; j < pixels.length; j++) {
      const a = pixels[i]!;
      const b = pixels[j]!;
      if (Math.hypot(a.x - b.x, a.y - b.y) < minSeparationPx) {
        return false;
      }
    }
  }
  return true;
}

export function clusterPlacesKey(places: HauntedPlace[]): string {
  return places
    .map((p) => p.id)
    .sort()
    .join(",");
}
