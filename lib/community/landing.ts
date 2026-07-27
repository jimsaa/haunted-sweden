import landing from "@/content/community/landing.json";
import type { CommunityLandingContent } from "@/lib/types/community-landing";

export function getCommunityLandingContent(): CommunityLandingContent {
  return landing as CommunityLandingContent;
}

export const COMMUNITY_SOURCE = "Community Landing Page";
