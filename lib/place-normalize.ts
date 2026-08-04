import { normalizePlaceCategory } from "@/lib/categories";
import {
  DEFAULT_COMMUNITY_PREPARED,
  type PlaceCommunityPrepared,
} from "@/lib/types/community";
import {
  DEFAULT_INVESTIGATION_CONTENT,
  type PlaceInvestigationContentPrepared,
} from "@/lib/types/investigation-content";
import type { HauntedPlace } from "@/lib/types/place";
import {
  normalizePlaceImages,
  normalizePlaceVideos,
} from "@/lib/place-media";
import {
  normalizeVerification,
  syncLegacyVerifiedFlag,
} from "@/lib/verification";

export function normalizePlace(raw: HauntedPlace): HauntedPlace {
  const verification = normalizeVerification(raw);
  const community: PlaceCommunityPrepared = {
    ...DEFAULT_COMMUNITY_PREPARED,
    ...raw.community,
  };
  const investigationContent: PlaceInvestigationContentPrepared = {
    ...DEFAULT_INVESTIGATION_CONTENT,
    ...raw.investigationContent,
    historicalSources:
      raw.investigationContent?.historicalSources ??
      raw.sourceLinks ??
      [],
  };

  const images = normalizePlaceImages(raw.images);
  const videos = normalizePlaceVideos(raw.videos);
  const coverImage = raw.coverImage?.trim() || "";
  const faq = Array.isArray(raw.faq)
    ? raw.faq.filter(
        (item) =>
          item &&
          typeof item.question === "string" &&
          item.question.trim() &&
          typeof item.answer === "string" &&
          item.answer.trim()
      )
    : [];

  return {
    ...raw,
    coverImage: coverImage || null,
    images,
    videos,
    faq,
    category: normalizePlaceCategory(raw.category as string),
    ...verification,
    verified: syncLegacyVerifiedFlag(verification),
    photoCount: raw.photoCount ?? images.filter((i) => i.url).length,
    videoCount: raw.videoCount ?? videos.filter((v) => v.url).length,
    hauntedSwedenScore: raw.hauntedSwedenScore ?? null,
    suggestedHauntedSwedenTags: raw.suggestedHauntedSwedenTags ?? [],
    hauntedSwedenAppSummary:
      raw.hauntedSwedenAppSummary?.trim() ||
      raw.shortDescription ||
      null,
    whyItFitsHauntedSweden: raw.whyItFitsHauntedSweden ?? null,
    community,
    investigationContent,
  };
}
