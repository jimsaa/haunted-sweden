import type { HauntedPlace } from "@/lib/types/place";
import type {
  PlaceImage,
  PlaceVideo,
  MediaStatus,
} from "@/lib/types/place-media";

export function isApprovedMediaStatus(status?: MediaStatus): boolean {
  return (status ?? "approved") === "approved";
}

export function hasMediaUrl(url?: string | null): boolean {
  return Boolean(url?.trim());
}

export function normalizePlaceImage(raw: Partial<PlaceImage>): PlaceImage {
  return {
    url: raw.url?.trim() ?? "",
    caption: raw.caption?.trim() ?? "",
    credit: raw.credit?.trim() ?? "",
    status: raw.status ?? "approved",
  };
}

export function normalizePlaceVideo(raw: Partial<PlaceVideo>): PlaceVideo {
  const platform = raw.platform ?? "youtube";
  return {
    url: raw.url?.trim() ?? "",
    title: raw.title?.trim() ?? "",
    caption: raw.caption?.trim() ?? "",
    platform:
      platform === "vimeo" || platform === "other" ? platform : "youtube",
    status: raw.status ?? "approved",
  };
}

export function normalizePlaceImages(
  images?: Partial<PlaceImage>[] | null
): PlaceImage[] {
  return (images ?? []).map(normalizePlaceImage);
}

export function normalizePlaceVideos(
  videos?: Partial<PlaceVideo>[] | null
): PlaceVideo[] {
  return (videos ?? []).map(normalizePlaceVideo);
}

export function getApprovedImages(place: HauntedPlace): PlaceImage[] {
  return (place.images ?? []).filter(
    (img) => isApprovedMediaStatus(img.status) && hasMediaUrl(img.url)
  );
}

export function getApprovedVideos(place: HauntedPlace): PlaceVideo[] {
  return (place.videos ?? []).filter(
    (vid) => isApprovedMediaStatus(vid.status) && hasMediaUrl(vid.url)
  );
}

export function countApprovedPhotos(places: HauntedPlace[]): number {
  return places.reduce((sum, place) => {
    const gallery = getApprovedImages(place).length;
    const investigation = (place.investigationPhotos ?? []).filter((p) =>
      hasMediaUrl(p.url)
    ).length;
    const cover = hasMediaUrl(place.coverImage) ? 1 : 0;
    return sum + gallery + investigation + cover;
  }, 0);
}

export function countApprovedVideos(places: HauntedPlace[]): number {
  return places.reduce((sum, place) => {
    const gallery = getApprovedVideos(place).length;
    const investigation = (place.investigationVideos ?? []).filter((v) =>
      hasMediaUrl(v.url)
    ).length;
    return sum + gallery + investigation;
  }, 0);
}

export type HomepageMediaItem =
  | {
      kind: "image";
      id: string;
      placeSlug: string;
      placeName: string;
      url: string;
      caption: string;
      credit: string;
    }
  | {
      kind: "video";
      id: string;
      placeSlug: string;
      placeName: string;
      url: string;
      title: string;
      platform: PlaceVideo["platform"];
    }
  | {
      kind: "placeholder";
      id: string;
      variant: "photos" | "videos" | "investigation";
    };

export function collectHomepageMediaItems(
  places: HauntedPlace[],
  limit = 12
): HomepageMediaItem[] {
  const items: HomepageMediaItem[] = [];

  for (const place of places) {
    const placeName = place.englishName ?? place.name;
    for (const img of getApprovedImages(place)) {
      items.push({
        kind: "image",
        id: `${place.id}-img-${img.url}`,
        placeSlug: place.slug,
        placeName,
        url: img.url,
        caption: img.caption ?? "",
        credit: img.credit ?? "",
      });
    }
    for (const vid of getApprovedVideos(place)) {
      items.push({
        kind: "video",
        id: `${place.id}-vid-${vid.url}`,
        placeSlug: place.slug,
        placeName,
        url: vid.url,
        title: vid.title ?? vid.caption ?? placeName,
        platform: vid.platform ?? "youtube",
      });
    }
  }

  if (items.length >= limit) {
    return items.slice(0, limit);
  }

  const placeholders: HomepageMediaItem[] = [
    { kind: "placeholder", id: "ph-photos", variant: "photos" },
    { kind: "placeholder", id: "ph-videos", variant: "videos" },
    {
      kind: "placeholder",
      id: "ph-investigation",
      variant: "investigation",
    },
  ];

  return [...items, ...placeholders].slice(0, Math.max(limit, placeholders.length));
}
