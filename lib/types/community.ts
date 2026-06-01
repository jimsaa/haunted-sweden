/**
 * Future community features — schema only, not implemented in UI.
 * @see docs/ARCHITECTURE.md
 */

/** Prepared counters for user-generated content (per location). */
export interface PlaceCommunityPrepared {
  userReportCount: number;
  userPhotoCount: number;
  userVideoCount: number;
  /** 1–5 scale when ratings ship; null until enough votes. */
  averageUserRating: number | null;
  userInvestigationCount: number;
}

export const DEFAULT_COMMUNITY_PREPARED: PlaceCommunityPrepared = {
  userReportCount: 0,
  userPhotoCount: 0,
  userVideoCount: 0,
  averageUserRating: null,
  userInvestigationCount: 0,
};

/** Future submission shape for moderation pipeline. */
export interface FutureUserReport {
  id: string;
  placeId: string;
  userId: string;
  title: string;
  body: string;
  createdAt: string;
  status: "pending" | "approved" | "rejected";
}

export interface FutureUserMedia {
  id: string;
  placeId: string;
  userId: string;
  url: string;
  type: "photo" | "video";
  caption?: string;
  createdAt: string;
  status: "pending" | "approved" | "rejected";
}

export interface FutureUserInvestigation {
  id: string;
  placeId: string;
  userId: string;
  visitedAt: string;
  notes?: string;
  overnight: boolean;
}
