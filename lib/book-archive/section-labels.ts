import type { BookArchiveSectionKind } from "@/lib/types/book-archive";

export const BOOK_ARCHIVE_SECTION_LABELS: Record<
  BookArchiveSectionKind,
  { en: string; sv: string }
> = {
  historicalBackground: {
    en: "Historical Background",
    sv: "Historisk bakgrund",
  },
  verifiedFacts: {
    en: "Verified Historical Facts",
    sv: "Verifierade historiska fakta",
  },
  folkloreLegends: {
    en: "Folklore & Local Legends",
    sv: "Folklore och lokala legender",
  },
  investigationTimeline: {
    en: "Investigation Timeline",
    sv: "Utredningstidslinje",
  },
  historicPhotographs: {
    en: "Historic Photographs",
    sv: "Historiska fotografier",
  },
  locationGallery: {
    en: "Location Gallery",
    sv: "Platsgalleri",
  },
  maps: {
    en: "Maps",
    sv: "Kartor",
  },
  sourcesReferences: {
    en: "Sources & References",
    sv: "Källor och referenser",
  },
  visitingInformation: {
    en: "Visiting Information",
    sv: "Besöksinformation",
  },
  researchNotes: {
    en: "Research Notes",
    sv: "Forskningsanteckningar",
  },
  bonusMaterial: {
    en: "Bonus Material",
    sv: "Bonusmaterial",
  },
};
