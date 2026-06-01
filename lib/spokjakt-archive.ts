import archiveData from "@/data/spokjakt-archive.json";
import type {
  SpokjaktArchiveData,
  SpokjaktArchiveEntry,
  SpokjaktPriority,
} from "@/lib/types/spokjakt";

const data = archiveData as SpokjaktArchiveData;

export function getSpokjaktArchive(): SpokjaktArchiveData {
  return data;
}

export function getSpokjaktEntries(): SpokjaktArchiveEntry[] {
  return data.entries;
}

export function getSpokjaktEntryBySlug(
  slug: string
): SpokjaktArchiveEntry | undefined {
  return data.entries.find((e) => e.slug === slug);
}

export function getSpokjaktEntriesBySeason(
  season: number
): SpokjaktArchiveEntry[] {
  return data.entries.filter((e) => e.season === season);
}

export function getSpokjaktEntriesByPriority(
  priority: SpokjaktPriority
): SpokjaktArchiveEntry[] {
  return data.entries.filter((e) => e.priority === priority);
}

export function getSpokjaktEntriesForPlaceSlug(
  placeSlug: string
): SpokjaktArchiveEntry[] {
  return data.entries.filter((e) => e.hauntedSwedenPlaceSlug === placeSlug);
}

export function getSpokjaktTop10(): SpokjaktArchiveData["top10SwedishLocations"] {
  return data.top10SwedishLocations;
}
