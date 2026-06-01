import type { HauntedPlace } from "@/lib/types/place";
import { latLonToSwedenView } from "@/lib/sweden-view-projection";

export type SwedenViewMarker =
  | {
      kind: "place";
      place: HauntedPlace;
      xPercent: number;
      yPercent: number;
    }
  | {
      kind: "cluster";
      places: HauntedPlace[];
      xPercent: number;
      yPercent: number;
      count: number;
    };

type ProjectedPlace = {
  place: HauntedPlace;
  xPercent: number;
  yPercent: number;
};

function distancePercent(a: ProjectedPlace, b: ProjectedPlace): number {
  const dx = a.xPercent - b.xPercent;
  const dy = a.yPercent - b.yPercent;
  return Math.hypot(dx, dy);
}

/**
 * Group nearby locations into visual clusters on the Sweden View.
 * @param clusterRadiusPercent — merge threshold in projected percent space
 */
export function buildSwedenViewMarkers(
  places: HauntedPlace[],
  clusterRadiusPercent = 4
): SwedenViewMarker[] {
  const projected: ProjectedPlace[] = places
    .filter((p) => p.latitude != null && p.longitude != null)
    .map((place) => {
      const { xPercent, yPercent } = latLonToSwedenView(
        place.latitude!,
        place.longitude!
      );
      return { place, xPercent, yPercent };
    });

  const used = new Set<string>();
  const markers: SwedenViewMarker[] = [];

  for (const seed of projected) {
    if (used.has(seed.place.id)) continue;

    const group = projected.filter(
      (p) =>
        !used.has(p.place.id) && distancePercent(seed, p) <= clusterRadiusPercent
    );

    if (group.length >= 2) {
      group.forEach((p) => used.add(p.place.id));
      const xPercent =
        group.reduce((sum, p) => sum + p.xPercent, 0) / group.length;
      const yPercent =
        group.reduce((sum, p) => sum + p.yPercent, 0) / group.length;
      markers.push({
        kind: "cluster",
        places: group.map((p) => p.place),
        xPercent,
        yPercent,
        count: group.length,
      });
    } else {
      used.add(seed.place.id);
      markers.push({
        kind: "place",
        place: seed.place,
        xPercent: seed.xPercent,
        yPercent: seed.yPercent,
      });
    }
  }

  return markers;
}
