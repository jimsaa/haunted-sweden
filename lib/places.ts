/** Production location catalog for hauntedsweden.se — edit data/haunted-places.json only. */
import hauntedPlacesFile from "@/data/haunted-places.json";
import type { PlaceCategory } from "@/lib/categories";
import { normalizePlace } from "@/lib/place-normalize";
import { auditPlaceSafetyNotes } from "@/lib/place-safety-audit";
import { mergeSpokjaktOntoPlace } from "@/lib/spokjakt-place";
import type { HauntedPlace, HauntedPlacesFile } from "@/lib/types/place";

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
  return [...pool]
    .sort((a, b) => b.hauntingLevel - a.hauntingLevel)
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
