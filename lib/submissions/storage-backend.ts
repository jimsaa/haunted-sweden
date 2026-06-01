import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

export type SubmissionFileKey = "place" | "media" | "video";

const LOCAL_PATHS: Record<SubmissionFileKey, string> = {
  place: path.join(process.cwd(), "data", "submissions", "place-submissions.json"),
  media: path.join(process.cwd(), "data", "submissions", "media-submissions.json"),
  video: path.join(process.cwd(), "data", "submissions", "video-submissions.json"),
};

const BLOB_PATHS: Record<SubmissionFileKey, string> = {
  place: "submissions/place-submissions.json",
  media: "submissions/media-submissions.json",
  video: "submissions/video-submissions.json",
};

export function usesBlobStorage(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN?.trim());
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
  const { head } = await import("@vercel/blob");
  const meta = await head(BLOB_PATHS[key]);
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
  if (usesBlobStorage()) {
    return readBlobJson(key, empty);
  }
  return readLocalJson(LOCAL_PATHS[key], empty);
}

export async function writeSubmissionJson(
  key: SubmissionFileKey,
  data: unknown
): Promise<void> {
  if (usesBlobStorage()) {
    await writeBlobJson(key, data);
    return;
  }
  await writeLocalJson(LOCAL_PATHS[key], data);
}
