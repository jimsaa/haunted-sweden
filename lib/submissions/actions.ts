import { readFile, writeFile } from "fs/promises";
import path from "path";
import type { HauntedPlace, HauntedPlacesFile } from "@/lib/types/place";
import type { PlaceImage, PlaceVideo, VideoPlatform } from "@/lib/types/place-media";
import type {
  MediaSubmission,
  PlaceSubmission,
  VideoLinkPlatform,
  VideoSubmission,
} from "@/lib/submissions/types";
import {
  updateMediaSubmission,
  updatePlaceSubmission,
  updateVideoSubmission,
} from "@/lib/submissions/store";

const PLACES_PATH = path.join(process.cwd(), "data", "haunted-places.json");

function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

async function readPlacesFile(): Promise<HauntedPlacesFile> {
  const raw = await readFile(PLACES_PATH, "utf8");
  return JSON.parse(raw) as HauntedPlacesFile;
}

async function writePlacesFile(file: HauntedPlacesFile): Promise<void> {
  const json = `${JSON.stringify(file, null, 2)}\n`;
  await writeFile(PLACES_PATH, json, "utf8");
}

function nextPlaceId(places: HauntedPlace[]): string {
  const nums = places
    .map((p) => parseInt(p.id, 10))
    .filter((n) => Number.isFinite(n));
  const max = nums.length ? Math.max(...nums) : 0;
  return String(max + 1);
}

function uniqueSlug(base: string, places: HauntedPlace[]): string {
  let slug = base || "new-place";
  let n = 0;
  while (places.some((p) => p.slug === slug)) {
    n += 1;
    slug = `${base}-${n}`;
  }
  return slug;
}

export async function convertPlaceSubmissionToDraft(
  submission: PlaceSubmission,
  reviewedBy?: string
): Promise<{ place: HauntedPlace; file: HauntedPlacesFile }> {
  const file = await readPlacesFile();
  const id = nextPlaceId(file.places);
  const baseSlug = slugify(submission.englishName || submission.name);
  const slug = uniqueSlug(baseSlug, file.places);

  const place: HauntedPlace = {
    id,
    slug,
    name: submission.name.trim(),
    englishName: submission.englishName?.trim() || undefined,
    category: submission.category as HauntedPlace["category"],
    city: submission.city.trim(),
    region: submission.region.trim(),
    country: "Sweden",
    latitude: null,
    longitude: null,
    featured: false,
    verified: false,
    hauntingLevel: 3,
    shortDescription: submission.description.trim(),
    history: submission.history?.trim() ?? "",
    legend: submission.legend?.trim() ?? "",
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

  file.places.push(place);
  file.version = file.places.length;

  await writePlacesFile(file);
  await updatePlaceSubmission(submission.id, {
    convertedPlaceId: id,
    status: "approved",
    reviewedAt: new Date().toISOString(),
    reviewedBy: reviewedBy ?? submission.reviewedBy ?? null,
  });

  return { place, file };
}

function mapVideoPlatform(platform?: VideoLinkPlatform): VideoPlatform {
  if (platform === "youtube" || platform === "vimeo") return platform;
  return "other";
}

export async function attachMediaToPlace(
  submission: MediaSubmission,
  placeId: string,
  reviewedBy?: string
): Promise<HauntedPlace | null> {
  const file = await readPlacesFile();
  const idx = file.places.findIndex((p) => p.id === placeId);
  if (idx < 0) return null;

  const place = file.places[idx]!;
  const image: PlaceImage = {
    url: submission.url.trim(),
    caption: submission.caption?.trim(),
    status: "pending",
  };

  const images = [...(place.images ?? []), image];
  file.places[idx] = {
    ...place,
    images,
    photoCount: images.length,
  };
  file.version = file.places.length;

  await writePlacesFile(file);
  await updateMediaSubmission(submission.id, {
    status: "approved",
    attachedToPlaceId: placeId,
    reviewedAt: new Date().toISOString(),
    reviewedBy: reviewedBy ?? submission.reviewedBy ?? null,
  });

  return file.places[idx]!;
}

export async function attachVideoToPlace(
  submission: VideoSubmission,
  placeId: string,
  reviewedBy?: string
): Promise<HauntedPlace | null> {
  const file = await readPlacesFile();
  const idx = file.places.findIndex((p) => p.id === placeId);
  if (idx < 0) return null;

  const place = file.places[idx]!;
  const video: PlaceVideo = {
    url: submission.url.trim(),
    caption: submission.caption?.trim(),
    platform: mapVideoPlatform(submission.platform),
    status: "pending",
  };

  const videos = [...(place.videos ?? []), video];
  file.places[idx] = {
    ...place,
    videos,
    videoCount: videos.length,
  };
  file.version = file.places.length;

  await writePlacesFile(file);
  await updateVideoSubmission(submission.id, {
    status: "approved",
    attachedToPlaceId: placeId,
    reviewedAt: new Date().toISOString(),
    reviewedBy: reviewedBy ?? submission.reviewedBy ?? null,
  });

  return file.places[idx]!;
}
