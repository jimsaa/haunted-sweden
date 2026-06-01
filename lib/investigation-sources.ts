import { SPOKJAKT_OFFICIAL_PLAYLIST_URL } from "@/lib/spokjakt-constants";
import type {
  HauntedSwedenInvestigationRecord,
  InvestigationSourceCard,
  InvestigationTimelineEntry,
} from "@/lib/types/investigation-sources";
import type { HauntedPlace } from "@/lib/types/place";
import type { SpokjaktPlaceData } from "@/lib/types/spokjakt-place";
import { isFeaturedInSpokjakt, isLaxtonInvestigation } from "@/lib/spokjakt-place";
import { isHauntedSwedenVerified } from "@/lib/verification";

export function normalizeSpokjaktData(
  data: SpokjaktPlaceData
): SpokjaktPlaceData {
  const summary =
    data.investigationSummary?.trim() || data.summary?.trim() || "";
  return {
    ...data,
    playlistLink: data.playlistLink?.trim() || SPOKJAKT_OFFICIAL_PLAYLIST_URL,
    investigationSummary: summary,
    summary,
  };
}

export function getHauntedSwedenInvestigationRecord(
  place: HauntedPlace
): HauntedSwedenInvestigationRecord {
  if (!isHauntedSwedenVerified(place)) {
    return { status: "not_investigated_yet" };
  }
  return {
    status: "verified",
    verificationDate: place.lastInvestigationDate,
    photosAdded: place.photoCount,
    videosAdded: place.videoCount,
    evidenceCollected: place.evidenceCount,
    overnightStayCompleted: place.overnightInvestigation,
    evpSessionCompleted: undefined,
  };
}

export function buildInvestigationSources(
  place: HauntedPlace,
  labels: {
    spokjakt: string;
    laxton: string;
    hauntedSweden: string;
    available: string;
    notYet: string;
    tvInvestigation: string;
    youtubeInvestigation: string;
    teamVerification: string;
    seasonEpisode: (s: number, e: number) => string;
  }
): InvestigationSourceCard[] {
  const spokjaktOn = isFeaturedInSpokjakt(place);
  const laxtonOn = isLaxtonInvestigation(place);
  const hs = getHauntedSwedenInvestigationRecord(place);

  const cards: InvestigationSourceCard[] = [
    {
      key: "spokjakt",
      title: labels.spokjakt,
      statusLabel: spokjaktOn ? labels.available : labels.notYet,
      typeLabel: labels.tvInvestigation,
      available: spokjaktOn,
      meta: spokjaktOn && place.spokjaktData
        ? [
            labels.seasonEpisode(
              place.spokjaktData.season,
              place.spokjaktData.episode
            ),
            String(place.spokjaktData.year),
          ]
        : undefined,
    },
    {
      key: "laxton",
      title: labels.laxton,
      statusLabel: laxtonOn ? labels.available : labels.notYet,
      typeLabel: labels.youtubeInvestigation,
      available: laxtonOn,
    },
    {
      key: "hauntedSweden",
      title: labels.hauntedSweden,
      statusLabel:
        hs.status === "verified" ? labels.available : labels.notYet,
      typeLabel: labels.teamVerification,
      available: hs.status === "verified",
      meta:
        hs.status === "verified" && hs.verificationDate
          ? [hs.verificationDate]
          : undefined,
    },
  ];

  return cards;
}

export function buildInvestigationTimeline(
  place: HauntedPlace
): InvestigationTimelineEntry[] {
  const entries: InvestigationTimelineEntry[] = [];

  if (place.spokjaktData) {
    entries.push({
      year: place.spokjaktData.year,
      label: "Spökjakt",
      source: "spokjakt",
      detail: `S${place.spokjaktData.season} E${place.spokjaktData.episode}`,
    });
  }

  if (place.featuredIn?.includes("laxton-youtube")) {
    entries.push({
      year: place.spokjaktData?.year ?? 2017,
      label: "LaxTon Ghost Sweden",
      source: "laxton",
      detail: "YouTube investigation",
    });
  }

  const hs = getHauntedSwedenInvestigationRecord(place);
  if (hs.status === "verified" && hs.verificationDate) {
    const y = new Date(hs.verificationDate).getFullYear();
    entries.push({
      year: y,
      label: "Haunted Sweden",
      source: "haunted-sweden",
      detail: "Team verification",
    });
  }

  return entries.sort((a, b) => a.year - b.year);
}

export function hasPremiumInvestigation(place: HauntedPlace): boolean {
  return Boolean(place.featuredIn?.includes("haunted-sweden-premium"));
}
