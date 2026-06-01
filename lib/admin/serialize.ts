import type { HauntedPlace, HauntedPlacesFile } from "@/lib/types/place";
import type { PlaceImage, PlaceVideo } from "@/lib/types/place-media";
import type {
  AdminImageDraft,
  AdminPlaceDraft,
  AdminPlacesState,
  AdminVideoDraft,
} from "@/lib/admin/types";

type PlaceWithI18n = HauntedPlace & {
  shortDescriptionSv?: string;
  historySv?: string;
  legendSv?: string;
};

function newId(): string {
  return `adm-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function imageToDraft(img: PlaceImage, index: number): AdminImageDraft {
  const ext = img as PlaceImage & { captionSv?: string };
  return {
    id: `img-${index}-${img.url.slice(-8)}`,
    url: img.url ?? "",
    caption_en: img.caption ?? "",
    caption_sv: ext.captionSv ?? "",
    credit: img.credit ?? "",
    status: img.status ?? "approved",
  };
}

function videoToDraft(vid: PlaceVideo, index: number): AdminVideoDraft {
  const ext = vid as PlaceVideo & {
    titleSv?: string;
    captionSv?: string;
  };
  return {
    id: `vid-${index}-${vid.url.slice(-8)}`,
    url: vid.url ?? "",
    title_en: vid.title ?? "",
    title_sv: ext.titleSv ?? "",
    caption_en: vid.caption ?? "",
    caption_sv: ext.captionSv ?? "",
    platform: vid.platform ?? "youtube",
    status: vid.status ?? "approved",
  };
}

export function placeToDraft(place: HauntedPlace): AdminPlaceDraft {
  const p = place as PlaceWithI18n;
  return {
    id: place.id,
    slug: place.slug,
    name: place.name,
    englishName: place.englishName ?? "",
    category: place.category,
    city: place.city,
    region: place.region,
    latitude: place.latitude != null ? String(place.latitude) : "",
    longitude: place.longitude != null ? String(place.longitude) : "",
    shortDescription_en: place.shortDescription ?? "",
    shortDescription_sv: p.shortDescriptionSv ?? "",
    history_en: place.history ?? "",
    history_sv: p.historySv ?? "",
    legend_en: place.legend ?? "",
    legend_sv: p.legendSv ?? "",
    safetyNote_en: place.safetyNote ?? "",
    safetyNote_sv: p.safetyNoteSv ?? "",
    hauntingLevel: place.hauntingLevel,
    featured: place.featured,
    verified: place.verified,
    verificationLevel: place.verificationLevel,
    verifiedByTeam: place.verifiedByTeam === true,
    visitedByTeam: place.visitedByTeam === true,
    lastInvestigationDate: place.lastInvestigationDate ?? "",
    overnightInvestigation: place.overnightInvestigation,
    accessType: place.accessType ?? "",
    familyFriendly: place.familyFriendly,
    nightAccess: place.nightAccess ?? false,
    publicAccess: place.publicAccess ?? false,
    parkingAvailable: place.parkingAvailable ?? false,
    googleMapsUrl: place.googleMapsUrl ?? "",
    googlePlaceId: place.googlePlaceId ?? "",
    status: place.status,
    images: (place.images ?? []).map(imageToDraft),
    videos: (place.videos ?? []).map(videoToDraft),
  };
}

export function fileToAdminState(file: HauntedPlacesFile): AdminPlacesState {
  return {
    version: file.version,
    places: file.places.map(placeToDraft),
  };
}

function draftImageToJson(img: AdminImageDraft): PlaceImage & { captionSv?: string } {
  const out: PlaceImage & { captionSv?: string } = {
    url: img.url.trim(),
    status: img.status,
  };
  if (img.caption_en.trim()) out.caption = img.caption_en.trim();
  if (img.caption_sv.trim()) out.captionSv = img.caption_sv.trim();
  if (img.credit.trim()) out.credit = img.credit.trim();
  return out;
}

function draftVideoToJson(vid: AdminVideoDraft): PlaceVideo & {
  titleSv?: string;
  captionSv?: string;
} {
  const out: PlaceVideo & { titleSv?: string; captionSv?: string } = {
    url: vid.url.trim(),
    platform: vid.platform,
    status: vid.status,
  };
  if (vid.title_en.trim()) out.title = vid.title_en.trim();
  if (vid.title_sv.trim()) out.titleSv = vid.title_sv.trim();
  if (vid.caption_en.trim()) out.caption = vid.caption_en.trim();
  if (vid.caption_sv.trim()) out.captionSv = vid.caption_sv.trim();
  return out;
}

/** Merge draft onto original place JSON to preserve Spökjakt and other fields. */
export function draftToPlaceJson(
  draft: AdminPlaceDraft,
  original: HauntedPlace
): PlaceWithI18n {
  const lat = draft.latitude.trim() ? parseFloat(draft.latitude) : null;
  const lng = draft.longitude.trim() ? parseFloat(draft.longitude) : null;
  const verifiedByTeam = draft.verifiedByTeam === true;
  const visitedByTeam = draft.visitedByTeam === true;

  const images = draft.images
    .filter((i) => i.url.trim())
    .map(draftImageToJson);
  const videos = draft.videos
    .filter((v) => v.url.trim())
    .map(draftVideoToJson);

  let verificationLevel = draft.verificationLevel;
  if (!verifiedByTeam && verificationLevel === "haunted-sweden-verified") {
    verificationLevel = "community-verified";
  }
  if (verifiedByTeam) {
    verificationLevel = "haunted-sweden-verified";
  }

  const base: PlaceWithI18n = {
    ...original,
    id: draft.id,
    slug: draft.slug.trim() || original.slug,
    name: draft.name.trim(),
    englishName: draft.englishName.trim() || undefined,
    category: draft.category,
    city: draft.city.trim(),
    region: draft.region.trim(),
    latitude: Number.isFinite(lat) ? lat : null,
    longitude: Number.isFinite(lng) ? lng : null,
    shortDescription: draft.shortDescription_en.trim(),
    history: draft.history_en.trim(),
    legend: draft.legend_en.trim(),
    safetyNote: draft.safetyNote_en.trim(),
    hauntingLevel: Math.min(5, Math.max(0, draft.hauntingLevel)),
    featured: draft.featured,
    verified: verifiedByTeam,
    verificationLevel,
    verifiedByTeam,
    visitedByTeam,
    lastInvestigationDate: draft.lastInvestigationDate.trim() || null,
    overnightInvestigation: draft.overnightInvestigation,
    accessType: draft.accessType.trim(),
    familyFriendly: draft.familyFriendly,
    nightAccess: draft.nightAccess,
    publicAccess: draft.publicAccess,
    parkingAvailable: draft.parkingAvailable,
    googleMapsUrl: draft.googleMapsUrl.trim() || undefined,
    googlePlaceId: draft.googlePlaceId.trim() || null,
    status: draft.status,
    images,
    videos,
    photoCount: images.length,
    videoCount: videos.length,
  };

  if (draft.shortDescription_sv.trim()) {
    base.shortDescriptionSv = draft.shortDescription_sv.trim();
  } else {
    delete base.shortDescriptionSv;
  }
  if (draft.history_sv.trim()) {
    base.historySv = draft.history_sv.trim();
  } else {
    delete base.historySv;
  }
  if (draft.legend_sv.trim()) {
    base.legendSv = draft.legend_sv.trim();
  } else {
    delete base.legendSv;
  }
  if (draft.safetyNote_sv.trim()) {
    base.safetyNoteSv = draft.safetyNote_sv.trim();
  } else {
    delete base.safetyNoteSv;
  }
  if (!draft.safetyNote_en.trim()) {
    delete base.safetyNote;
  }

  return base;
}

export function adminStateToFile(
  state: AdminPlacesState,
  originals: HauntedPlace[]
): HauntedPlacesFile {
  const byId = new Map(originals.map((p) => [p.id, p]));
  return {
    version: state.version,
    places: state.places.map((draft) => {
      const original = byId.get(draft.id);
      if (!original) {
        return draftToPlaceJson(draft, createMinimalPlace(draft));
      }
      return draftToPlaceJson(draft, original);
    }) as HauntedPlace[],
  };
}

function createMinimalPlace(draft: AdminPlaceDraft): HauntedPlace {
  return {
    id: draft.id,
    slug: draft.slug,
    name: draft.name,
    category: draft.category,
    city: draft.city,
    region: draft.region,
    latitude: null,
    longitude: null,
    featured: false,
    verified: false,
    hauntingLevel: 3,
    shortDescription: "",
    history: "",
    legend: "",
    paranormalType: [],
    accessType: "Public Landmark",
    familyFriendly: true,
    verificationLevel: "community-submitted",
    verifiedByTeam: false,
    visitedByTeam: false,
    visitCount: 0,
    lastInvestigationDate: null,
    investigationPhotos: [],
    investigationVideos: [],
    overnightInvestigation: false,
    evidenceCount: 0,
    reportCount: 0,
    photoCount: 0,
    videoCount: 0,
    googlePlaceId: null,
    googleRating: null,
    googleReviewsEnabled: false,
    images: [],
    videos: [],
    status: "pending",
  };
}

export function exportJsonString(state: AdminPlacesState, originals: HauntedPlace[]): string {
  const file = adminStateToFile(state, originals);
  return JSON.stringify(file, null, 2);
}

export function createEmptyImage(): AdminImageDraft {
  return {
    id: newId(),
    url: "",
    caption_en: "",
    caption_sv: "",
    credit: "",
    status: "pending",
  };
}

export function createEmptyVideo(): AdminVideoDraft {
  return {
    id: newId(),
    url: "",
    title_en: "",
    title_sv: "",
    caption_en: "",
    caption_sv: "",
    platform: "youtube",
    status: "pending",
  };
}
