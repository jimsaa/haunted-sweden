import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

export type SubmissionFileKey = "place" | "media" | "video";
export type SubmissionStorageBackend = "BLOB" | "JSON";

const LOCAL_PATHS: Record<SubmissionFileKey, string> = {
  place: path.join(process.cwd(), "data", "submissions", "place-submissions.json"),
  media: path.join(process.cwd(), "data", "submissions", "media-submissions.json"),
  video: path.join(process.cwd(), "data", "submissions", "video-submissions.json"),
};

export const BLOB_PATHS: Record<SubmissionFileKey, string> = {
  place: "submissions/place-submissions.json",
  media: "submissions/media-submissions.json",
  video: "submissions/video-submissions.json",
};

export function usesBlobStorage(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN?.trim());
}

/** DEBUG: temporary — logs which backend is active. */
export function getSubmissionStorageBackend(): SubmissionStorageBackend {
  return usesBlobStorage() ? "BLOB" : "JSON";
}

export function isBlobTokenConfigured(): boolean {
  return usesBlobStorage();
}

function logStorageBackend(): void {
  const backend = getSubmissionStorageBackend();
  const inProduction = process.env.NODE_ENV === "production";
  console.log(
    `[submissions-storage] Storage backend: ${backend}` +
      (inProduction ? " (production)" : " (development)") +
      (inProduction && backend === "BLOB"
        ? " — Vercel Blob paths: submissions/*.json"
        : "")
  );
}

function logStorageOperation(
  operation: "read" | "write",
  key: SubmissionFileKey
): void {
  const backend = getSubmissionStorageBackend();
  const target =
    backend === "BLOB" ? BLOB_PATHS[key] : `data/submissions/${key}-submissions.json`;
  console.log(
    `[submissions-storage] ${operation.toUpperCase()} kind=${key} backend=${backend} target=${target}`
  );
}

/** Production must use Blob — never write to data/submissions on Vercel. */
function assertWritableStorageConfigured(): void {
  if (process.env.NODE_ENV === "production" && !usesBlobStorage()) {
    throw new Error(
      "BLOB_READ_WRITE_TOKEN is required in production. Connect Vercel Blob to this project."
    );
  }
}

async function readLocalJson<T>(filePath: string, empty: T): Promise<T> {
  try {
    const raw = await readFile(filePath, "utf8");
    return JSON.parse(raw) as T;
  } catch (err) {
    const code = (err as NodeJS.ErrnoException).code;
    if (code === "ENOENT") return empty;
    throw err;
  }
}

async function writeLocalJson(filePath: string, data: unknown): Promise<void> {
  await mkdir(path.dirname(filePath), { recursive: true });
  const json = `${JSON.stringify(data, null, 2)}\n`;
  await writeFile(filePath, json, "utf8");
}

async function readBlobJson<T>(key: SubmissionFileKey, empty: T): Promise<T> {
  const { BlobNotFoundError, head } = await import("@vercel/blob");
  let meta;
  try {
    meta = await head(BLOB_PATHS[key]);
  } catch (err) {
    if (err instanceof BlobNotFoundError) return empty;
    throw err;
  }
  if (!meta?.url) return empty;
  const res = await fetch(meta.url);
  if (!res.ok) return empty;
  const text = await res.text();
  if (!text.trim()) return empty;
  return JSON.parse(text) as T;
}

async function writeBlobJson(key: SubmissionFileKey, data: unknown): Promise<void> {
  const { put } = await import("@vercel/blob");
  const json = `${JSON.stringify(data, null, 2)}\n`;
  await put(BLOB_PATHS[key], json, {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
}

/** Same JSON files as Admin Inbox — local disk or Vercel Blob in production. */
export async function readSubmissionJson<T>(
  key: SubmissionFileKey,
  empty: T
): Promise<T> {
  logStorageBackend();
  logStorageOperation("read", key);

  if (usesBlobStorage()) {
    return readBlobJson(key, empty);
  }

  if (process.env.NODE_ENV === "production") {
    console.warn(
      "[submissions-storage] WARNING: Reading from disk in production without BLOB token"
    );
  }

  return readLocalJson(LOCAL_PATHS[key], empty);
}

export async function writeSubmissionJson(
  key: SubmissionFileKey,
  data: unknown
): Promise<void> {
  assertWritableStorageConfigured();
  logStorageBackend();
  logStorageOperation("write", key);

  if (usesBlobStorage()) {
    await writeBlobJson(key, data);
    return;
  }

  await writeLocalJson(LOCAL_PATHS[key], data);
}
