/**
 * Book Archive — exclusive bonus material for book purchasers.
 * Content lives in content/books/{archiveId}.json
 */

/** Reserved for future password / one-time unlock codes (not implemented). */
export type BookArchiveAccessMode = "public_url" | "password" | "unlock_code";

export interface BookArchiveAccessConfig {
  mode: BookArchiveAccessMode;
  /** bcrypt or similar — future use only */
  passwordHash?: string;
  unlockCodes?: string[];
}

export type BookArchiveSectionKind =
  | "historicalBackground"
  | "verifiedFacts"
  | "folkloreLegends"
  | "investigationTimeline"
  | "historicPhotographs"
  | "locationGallery"
  | "maps"
  | "sourcesReferences"
  | "visitingInformation"
  | "researchNotes"
  | "bonusMaterial";

export type BookArchiveBlockType =
  | "richtext"
  | "facts"
  | "timeline"
  | "gallery"
  | "map"
  | "sources"
  | "visiting"
  | "notes"
  | "evidence"
  | "video"
  | "audio"
  | "download";

export interface BookArchiveImage {
  url: string;
  alt: string;
  caption?: string;
  captionSv?: string;
  credit?: string;
}

export interface BookArchiveVideo {
  platform: "youtube" | "vimeo" | "other";
  url: string;
  title?: string;
  titleSv?: string;
}

export interface BookArchiveAudio {
  url: string;
  title?: string;
  titleSv?: string;
}

export interface BookArchiveDownload {
  url: string;
  label: string;
  labelSv?: string;
  fileType?: "pdf" | "image" | "document" | "other";
}

export interface BookArchiveFact {
  label: string;
  labelSv?: string;
  value: string;
  valueSv?: string;
}

export interface BookArchiveTimelineEvent {
  date: string;
  title: string;
  titleSv?: string;
  description?: string;
  descriptionSv?: string;
}

export interface BookArchiveSource {
  title: string;
  titleSv?: string;
  url?: string;
  note?: string;
  noteSv?: string;
}

export interface BookArchiveMapEmbed {
  label?: string;
  labelSv?: string;
  latitude?: number;
  longitude?: number;
  googleMapsUrl?: string;
  embedUrl?: string;
}

export interface BookArchiveEvidenceItem {
  title: string;
  titleSv?: string;
  summary?: string;
  summarySv?: string;
  images?: BookArchiveImage[];
}

export interface BookArchiveVisitingInfo {
  address?: string;
  addressSv?: string;
  hours?: string;
  hoursSv?: string;
  accessNotes?: string;
  accessNotesSv?: string;
  safetyNote?: string;
  safetyNoteSv?: string;
}

export interface BookArchiveSection {
  kind: BookArchiveSectionKind;
  /** Override default section title */
  title?: string;
  titleSv?: string;
  blockType: BookArchiveBlockType;
  paragraphs?: string[];
  paragraphsSv?: string[];
  facts?: BookArchiveFact[];
  timeline?: BookArchiveTimelineEvent[];
  images?: BookArchiveImage[];
  videos?: BookArchiveVideo[];
  audio?: BookArchiveAudio[];
  downloads?: BookArchiveDownload[];
  map?: BookArchiveMapEmbed;
  sources?: BookArchiveSource[];
  visiting?: BookArchiveVisitingInfo;
  evidence?: BookArchiveEvidenceItem[];
}

export type BookArchiveNextBookMode = "coming_soon" | "published";

export interface BookArchiveNextBook {
  mode: BookArchiveNextBookMode;
  headline?: string;
  headlineSv?: string;
  body?: string;
  bodySv?: string;
  emailSignupPlaceholder?: string;
  emailSignupPlaceholderSv?: string;
  buyLabel?: string;
  buyLabelSv?: string;
  buyUrl?: string;
  bookTitle?: string;
  bookTitleSv?: string;
}

export interface BookArchive {
  archiveId: string;
  bookNumber: number;
  title: string;
  titleSv?: string;
  subtitle?: string;
  subtitleSv?: string;
  publishedYear?: number;
  status: "published" | "draft";
  /** Future access gate — not enforced yet */
  access?: BookArchiveAccessConfig;
  intro?: {
    thankYou?: string;
    thankYouSv?: string;
    description?: string;
    descriptionSv?: string;
  };
  sections: BookArchiveSection[];
  nextBook: BookArchiveNextBook;
}
