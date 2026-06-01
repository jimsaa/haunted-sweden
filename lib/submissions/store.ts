import { readFile, writeFile } from "fs/promises";
import path from "path";
import type {
  MediaSubmission,
  MediaSubmissionsFile,
  PlaceSubmission,
  PlaceSubmissionsFile,
  SubmissionKind,
  SubmissionStatus,
  VideoSubmission,
  VideoSubmissionsFile,
} from "@/lib/submissions/types";

const SUBMISSIONS_DIR = path.join(process.cwd(), "data", "submissions");

const PLACE_PATH = path.join(SUBMISSIONS_DIR, "place-submissions.json");
const MEDIA_PATH = path.join(SUBMISSIONS_DIR, "media-submissions.json");
const VIDEO_PATH = path.join(SUBMISSIONS_DIR, "video-submissions.json");

export function newSubmissionId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

async function readJson<T>(filePath: string, empty: T): Promise<T> {
  try {
    const raw = await readFile(filePath, "utf8");
    return JSON.parse(raw) as T;
  } catch (err) {
    const code = (err as NodeJS.ErrnoException).code;
    if (code === "ENOENT") return empty;
    throw err;
  }
}

async function writeJson(filePath: string, data: unknown): Promise<void> {
  const json = `${JSON.stringify(data, null, 2)}\n`;
  await writeFile(filePath, json, "utf8");
}

export async function readPlaceSubmissions(): Promise<PlaceSubmissionsFile> {
  return readJson<PlaceSubmissionsFile>(PLACE_PATH, { submissions: [] });
}

export async function readMediaSubmissions(): Promise<MediaSubmissionsFile> {
  return readJson<MediaSubmissionsFile>(MEDIA_PATH, { submissions: [] });
}

export async function readVideoSubmissions(): Promise<VideoSubmissionsFile> {
  return readJson<VideoSubmissionsFile>(VIDEO_PATH, { submissions: [] });
}

export async function appendPlaceSubmission(
  submission: PlaceSubmission
): Promise<void> {
  const file = await readPlaceSubmissions();
  file.submissions.push(submission);
  await writeJson(PLACE_PATH, file);
}

export async function appendMediaSubmission(
  submission: MediaSubmission
): Promise<void> {
  const file = await readMediaSubmissions();
  file.submissions.push(submission);
  await writeJson(MEDIA_PATH, file);
}

export async function appendVideoSubmission(
  submission: VideoSubmission
): Promise<void> {
  const file = await readVideoSubmissions();
  file.submissions.push(submission);
  await writeJson(VIDEO_PATH, file);
}

export async function updatePlaceSubmission(
  id: string,
  patch: Partial<PlaceSubmission>
): Promise<PlaceSubmission | null> {
  const file = await readPlaceSubmissions();
  const idx = file.submissions.findIndex((s) => s.id === id);
  if (idx < 0) return null;
  file.submissions[idx] = { ...file.submissions[idx]!, ...patch };
  await writeJson(PLACE_PATH, file);
  return file.submissions[idx]!;
}

export async function updateMediaSubmission(
  id: string,
  patch: Partial<MediaSubmission>
): Promise<MediaSubmission | null> {
  const file = await readMediaSubmissions();
  const idx = file.submissions.findIndex((s) => s.id === id);
  if (idx < 0) return null;
  file.submissions[idx] = { ...file.submissions[idx]!, ...patch };
  await writeJson(MEDIA_PATH, file);
  return file.submissions[idx]!;
}

export async function updateVideoSubmission(
  id: string,
  patch: Partial<VideoSubmission>
): Promise<VideoSubmission | null> {
  const file = await readVideoSubmissions();
  const idx = file.submissions.findIndex((s) => s.id === id);
  if (idx < 0) return null;
  file.submissions[idx] = { ...file.submissions[idx]!, ...patch };
  await writeJson(VIDEO_PATH, file);
  return file.submissions[idx]!;
}

export async function getSubmissionByKindAndId(
  kind: SubmissionKind,
  id: string
): Promise<PlaceSubmission | MediaSubmission | VideoSubmission | null> {
  if (kind === "place") {
    const file = await readPlaceSubmissions();
    return file.submissions.find((s) => s.id === id) ?? null;
  }
  if (kind === "media") {
    const file = await readMediaSubmissions();
    return file.submissions.find((s) => s.id === id) ?? null;
  }
  const file = await readVideoSubmissions();
  return file.submissions.find((s) => s.id === id) ?? null;
}

export async function setSubmissionStatus(
  kind: SubmissionKind,
  id: string,
  status: SubmissionStatus,
  review: { reviewedBy?: string; adminNotes?: string }
): Promise<PlaceSubmission | MediaSubmission | VideoSubmission | null> {
  const reviewedAt = new Date().toISOString();
  const patch = {
    status,
    reviewedAt,
    reviewedBy: review.reviewedBy ?? null,
    adminNotes: review.adminNotes ?? null,
  };
  if (kind === "place") return updatePlaceSubmission(id, patch);
  if (kind === "media") return updateMediaSubmission(id, patch);
  return updateVideoSubmission(id, patch);
}
