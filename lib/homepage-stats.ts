import { getApprovedPlaces } from "@/lib/places";
import {
  countApprovedPhotos,
  countApprovedVideos,
} from "@/lib/place-media";

/** Product goal surfaced on the homepage. */
export const HOMEPAGE_LOCATION_GOAL = 25;

export interface HomepageStats {
  locationCount: number;
  photoCount: number;
  videoCount: number;
  reportCount: number;
  belowLocationGoal: boolean;
}

export function getHomepageStats(): HomepageStats {
  const approved = getApprovedPlaces();
  const reportCount = approved.reduce((sum, p) => sum + (p.reportCount ?? 0), 0);

  return {
    locationCount: approved.length,
    photoCount: countApprovedPhotos(approved),
    videoCount: countApprovedVideos(approved),
    reportCount,
    belowLocationGoal: approved.length < HOMEPAGE_LOCATION_GOAL,
  };
}
