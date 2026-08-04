export type MediaStatus = "approved" | "pending" | "rejected";

export type VideoPlatform = "youtube" | "vimeo" | "other";

export interface PlaceImage {
  url: string;
  caption?: string;
  captionSv?: string;
  credit?: string;
  status?: MediaStatus;
}

export interface PlaceVideo {
  url: string;
  title?: string;
  caption?: string;
  platform?: VideoPlatform;
  status?: MediaStatus;
}

/** Legacy minimal media (investigation fields). */
export interface PlaceMedia {
  url: string;
  caption?: string;
}
