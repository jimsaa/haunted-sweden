import type { BookArchive } from "@/lib/types/book-archive";

const ARCHIVE_ID_PATTERN = /^hs-[a-f0-9]{8}$/;

export function isValidArchiveId(id: string): boolean {
  return ARCHIVE_ID_PATTERN.test(id);
}

export function validateBook(parsed: BookArchive): BookArchive | null {
  if (!parsed.archiveId || !isValidArchiveId(parsed.archiveId)) {
    console.warn("[book-archive] Invalid archiveId:", parsed.archiveId);
    return null;
  }
  if (!Array.isArray(parsed.investigations) || parsed.investigations.length === 0) {
    console.warn("[book-archive] No investigations in", parsed.archiveId);
    return null;
  }
  return parsed;
}
