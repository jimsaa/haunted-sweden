import { readdir, readFile } from "fs/promises";
import path from "path";
import type { BookArchive } from "@/lib/types/book-archive";
import { validateBook } from "@/lib/book-archive/validate";

const BOOKS_DIR = path.join(process.cwd(), "content", "books");

const ARCHIVE_ID_PATTERN = /^hs-[a-f0-9]{8}$/;

function isValidArchiveId(id: string): boolean {
  return ARCHIVE_ID_PATTERN.test(id);
}

async function readBookFile(filePath: string): Promise<BookArchive | null> {
  try {
    const raw = await readFile(filePath, "utf8");
    const parsed = JSON.parse(raw) as BookArchive;
    const book = validateBook(parsed);
    if (!book) return null;
    if (book.archiveId !== path.basename(filePath, ".json")) {
      console.warn(
        `[book-archive] Filename must match archiveId: ${parsed.archiveId}`
      );
    }
    return book;
  } catch (err) {
    console.error(`[book-archive] Failed to read ${filePath}:`, err);
    return null;
  }
}

/** All published book archives (server-only). Never expose a public index route. */
export async function getAllBookArchives(): Promise<BookArchive[]> {
  let files: string[];
  try {
    files = await readdir(BOOKS_DIR);
  } catch {
    return [];
  }

  const books: BookArchive[] = [];
  for (const file of files) {
    if (!file.endsWith(".json")) continue;
    const book = await readBookFile(path.join(BOOKS_DIR, file));
    if (book && book.status === "published") {
      books.push(book);
    }
  }

  return books.sort((a, b) => a.bookNumber - b.bookNumber);
}

/** Lookup by secret archive ID — returns null if not found or draft. */
export async function getBookArchiveById(
  archiveId: string
): Promise<BookArchive | null> {
  if (!isValidArchiveId(archiveId)) return null;

  const filePath = path.join(BOOKS_DIR, `${archiveId}.json`);
  const book = await readBookFile(filePath);
  if (!book || book.status !== "published") return null;
  return book;
}

/** For generateStaticParams only — IDs are not linked publicly. */
export async function getPublishedArchiveIds(): Promise<string[]> {
  const books = await getAllBookArchives();
  return books.map((b) => b.archiveId);
}

export function isBookArchiveId(id: string): boolean {
  return isValidArchiveId(id);
}
