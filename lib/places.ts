/** Production location catalog for hauntedsweden.se — edit data/haunted-places.json only. */
import hauntedPlacesFile from "@/data/haunted-places.json";
import type { PlaceCategory } from "@/lib/categories";
import { distanceMeters } from "@/lib/geo";
import { normalizePlace } from "@/lib/place-normalize";
import { auditPlaceSafetyNotes } from "@/lib/place-safety-audit";
import { mergeSpokjaktOntoPlace } from "@/lib/spokjakt-place";
import type { HauntedPlace, HauntedPlacesFile } from "@/lib/types/place";
import { isHauntedSwedenVerified } from "@/lib/verification";

/** Search Console priority slugs — prefer on homepage Featured. */
export const SEO_PRIORITY_SLUGS = [
  "hemsokt-museum",
  "malilla-sanatorium",
  "lacko-slott",
] as const;

const raw = hauntedPlacesFile as HauntedPlacesFile;

const data: HauntedPlacesFile = {
  ...raw,
  places: raw.places
    .map((p) => normalizePlace(p as HauntedPlace))
    .map(mergeSpokjaktOntoPlace),
};

auditPlaceSafetyNotes(data.places);

export function getAllPlaces(): HauntedPlace[] {
  return data.places;
}

export function getApprovedPlaces(): HauntedPlace[] {
  return data.places.filter((p) => p.status === "approved");
}

export function getMapPlaces(): HauntedPlace[] {
  return getApprovedPlaces().filter(
    (p) => p.latitude != null && p.longitude != null
  );
}

export function getPlaceBySlug(slug: string): HauntedPlace | undefined {
  return data.places.find((p) => p.slug === slug);
}

export function getApprovedPlaceBySlug(slug: string): HauntedPlace | undefined {
  const place = getPlaceBySlug(slug);
  return place?.status === "approved" ? place : undefined;
}

export function getFeaturedPlaces(limit = 6): HauntedPlace[] {
  const approved = getApprovedPlaces();
  const featured = approved.filter((p) => p.featured);
  const pool = featured.length > 0 ? featured : approved;
  const priority = new Set<string>(SEO_PRIORITY_SLUGS);
  return [...pool]
    .sort((a, b) => {
      const ap = priority.has(a.slug) ? 1 : 0;
      const bp = priority.has(b.slug) ? 1 : 0;
      if (bp !== ap) return bp - ap;
      const as = a.hauntedSwedenScore ?? a.hauntingLevel;
      const bs = b.hauntedSwedenScore ?? b.hauntingLevel;
      if (bs !== as) return bs - as;
      return b.hauntingLevel - a.hauntingLevel;
    })
    .slice(0, limit);
}

export function getVerifiedPlaces(limit = 6): HauntedPlace[] {
  return getApprovedPlaces()
    .filter(isHauntedSwedenVerified)
    .sort(
      (a, b) =>
        (b.hauntedSwedenScore ?? b.hauntingLevel) -
        (a.hauntedSwedenScore ?? a.hauntingLevel)
    )
    .slice(0, limit);
}

export function getLatestPlaces(limit = 6): HauntedPlace[] {
  return [...getApprovedPlaces()]
    .sort((a, b) => Number(b.id) - Number(a.id))
    .slice(0, limit);
}

function popularityScore(place: HauntedPlace): number {
  return (
    place.hauntingLevel * 10 +
    (place.hauntedSwedenScore ?? 0) * 5 +
    (place.reportCount ?? 0) * 3 +
    (place.photoCount ?? 0) +
    (place.featuredInSpokjakt ? 25 : 0) +
    (place.featured ? 5 : 0)
  );
}

export function getPopularPlaces(limit = 6): HauntedPlace[] {
  return [...getApprovedPlaces()]
    .sort((a, b) => popularityScore(b) - popularityScore(a))
    .slice(0, limit);
}

export function getApprovedByCategory(category: PlaceCategory): HauntedPlace[] {
  return getApprovedPlaces().filter((p) => p.category === category);
}

/** Other approved places in the same cluster (excludes current place). */
export function getClusterNearbyPlaces(place: HauntedPlace): HauntedPlace[] {
  if (!place.clusterId) return [];
  return getApprovedPlaces()
    .filter((p) => p.clusterId === place.clusterId && p.id !== place.id)
    .sort((a, b) => a.name.localeCompare(b.name, "sv"));
}

/** Nearest approved places by coordinates (excludes current). */
export function getGeoNearbyPlaces(
  place: HauntedPlace,
  limit = 6,
  maxKm = 180
): HauntedPlace[] {
  if (place.latitude == null || place.longitude == null) return [];
  const maxM = maxKm * 1000;
  return getApprovedPlaces()
    .filter(
      (p) =>
        p.id !== place.id &&
        p.latitude != null &&
        p.longitude != null
    )
    .map((p) => ({
      place: p,
      dist: distanceMeters(
        place.latitude!,
        place.longitude!,
        p.latitude!,
        p.longitude!
      ),
    }))
    .filter((x) => x.dist <= maxM)
    .sort((a, b) => a.dist - b.dist)
    .slice(0, limit)
    .map((x) => x.place);
}

/** Cluster nearby if available, otherwise geographic nearby. */
export function getNearbyPlaces(place: HauntedPlace, limit = 6): HauntedPlace[] {
  const cluster = getClusterNearbyPlaces(place);
  if (cluster.length > 0) return cluster.slice(0, limit);
  return getGeoNearbyPlaces(place, limit);
}

/** Same category or region — for Related Places (excludes self + already-shown nearby). */
export function getRelatedPlaces(
  place: HauntedPlace,
  excludeIds: Set<string> = new Set(),
  limit = 4
): HauntedPlace[] {
  const skip = new Set(excludeIds);
  skip.add(place.id);
  return getApprovedPlaces()
    .filter((p) => !skip.has(p.id))
    .map((p) => {
      let score = 0;
      if (p.category === place.category) score += 3;
      if (p.region === place.region) score += 2;
      if (p.city === place.city) score += 1;
      score += (p.hauntedSwedenScore ?? p.hauntingLevel) / 10;
      return { place: p, score };
    })
    .filter((x) => x.score >= 2)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.place);
}

function hasGooglePlaceId(place: HauntedPlace): boolean {
  return Boolean(place.googlePlaceId?.trim());
}

export function getGoogleMapsUrl(place: HauntedPlace): string {
  if (place.googleMapsUrl?.trim()) {
    return place.googleMapsUrl.trim();
  }
  if (!hasGooglePlaceId(place) && place.address?.trim()) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.address.trim())}`;
  }
  if (place.latitude != null && place.longitude != null) {
    return `https://www.google.com/maps/search/?api=1&query=${place.latitude},${place.longitude}`;
  }
  const q = encodeURIComponent(`${place.name}, ${place.city}, Sweden`);
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}
