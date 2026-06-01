import type { HauntedPlace } from "@/lib/types/place";
import { getApprovedImages } from "@/lib/place-media";

export function hasCoverImage(coverImage?: string | null): boolean {
  return Boolean(coverImage?.trim());
}

export function getCoverImageSrc(place: HauntedPlace): string | null {
  const cover = place.coverImage?.trim();
  if (cover) return cover;
  const firstGallery = getApprovedImages(place)[0]?.url?.trim();
  return firstGallery || null;
}

export function isRemoteCoverUrl(src: string): boolean {
  return src.startsWith("http://") || src.startsWith("https://");
}
