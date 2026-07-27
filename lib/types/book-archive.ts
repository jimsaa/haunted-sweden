/**
 * Haunted Sweden Investigation Archive — data model for content/books/{archiveId}.json
 */

export type BookArchiveAccessMode = "public_url" | "password" | "unlock_code";

export interface BookArchiveAccessConfig {
  mode: BookArchiveAccessMode;
  passwordHash?: string;
  unlockCodes?: string[];
}

export interface BookArchiveImage {
  url: string;
  alt: string;
  caption?: string;
  captionSv?: string;
  credit?: string;
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
  type?: "museum" | "archive" | "book" | "academic" | "web" | "other";
}

export interface BookArchiveMapEmbed {
  label?: string;
  labelSv?: string;
  latitude?: number;
  longitude?: number;
  googleMapsUrl?: string;
  directionsUrl?: string;
  embedUrl?: string;
}

export interface BookArchiveVisitingInfo {
  address?: string;
  addressSv?: string;
  hours?: string;
  hoursSv?: string;
  directions?: string;
  directionsSv?: string;
  accessNotes?: string;
  accessNotesSv?: string;
  safetyNote?: string;
  safetyNoteSv?: string;
}

export interface BookArchiveTextBlock {
  paragraphs: string[];
  paragraphsSv?: string[];
}

/** One location / chapter from the printed book. */
export interface BookArchiveInvestigation {
  id: string;
  number: number;
  title: string;
  titleSv?: string;
  heroImage?: BookArchiveImage;
  historicalBackground?: BookArchiveTextBlock;
  verifiedHistory?: BookArchiveTextBlock;
  folklore?: BookArchiveTextBlock;
  timeline?: BookArchiveTimelineEvent[];
  gallery?: BookArchiveImage[];
  map?: BookArchiveMapEmbed;
  sources?: BookArchiveSource[];
  visiting?: BookArchiveVisitingInfo;
  researchNotes?: BookArchiveTextBlock;
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
  subscribeLabel?: string;
  subscribeLabelSv?: string;
  buyLabel?: string;
  buyLabelSv?: string;
  buyUrl?: string;
  bookTitle?: string;
  bookTitleSv?: string;
}

export interface BookArchiveIntro {
  archiveLabel?: string;
  archiveLabelSv?: string;
  thankYou?: string;
  thankYouSv?: string;
  description?: string;
  descriptionSv?: string;
  principles?: string[];
  principlesSv?: string[];
}

export interface BookArchive {
  archiveId: string;
  bookNumber: number;
  title: string;
  titleSv?: string;
  subtitle?: string;
  subtitleSv?: string;
  investigators?: string;
  investigatorsSv?: string;
  publishedYear?: number;
  status: "published" | "draft";
  access?: BookArchiveAccessConfig;
  intro?: BookArchiveIntro;
  investigations: BookArchiveInvestigation[];
  nextBook: BookArchiveNextBook;
}
