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
import {
  readSubmissionJson,
  writeSubmissionJson,
} from "@/lib/submissions/storage-backend";

export function newSubmissionId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export async function readPlaceSubmissions(): Promise<PlaceSubmissionsFile> {
  return readSubmissionJson<PlaceSubmissionsFile>("place", { submissions: [] });
}

export async function readMediaSubmissions(): Promise<MediaSubmissionsFile> {
  return readSubmissionJson<MediaSubmissionsFile>("media", { submissions: [] });
}

export async function readVideoSubmissions(): Promise<VideoSubmissionsFile> {
  return readSubmissionJson<VideoSubmissionsFile>("video", { submissions: [] });
}

export async function appendPlaceSubmission(
  submission: PlaceSubmission
): Promise<void> {
  const file = await readPlaceSubmissions();
  file.submissions.push(submission);
  await writeSubmissionJson("place", file);
}

export async function appendMediaSubmission(
  submission: MediaSubmission
): Promise<void> {
  const file = await readMediaSubmissions();
  file.submissions.push(submission);
  await writeSubmissionJson("media", file);
}

export async function appendVideoSubmission(
  submission: VideoSubmission
): Promise<void> {
  const file = await readVideoSubmissions();
  file.submissions.push(submission);
  await writeSubmissionJson("video", file);
}

export async function updatePlaceSubmission(
  id: string,
  patch: Partial<PlaceSubmission>
): Promise<PlaceSubmission | null> {
  const file = await readPlaceSubmissions();
  const idx = file.submissions.findIndex((s) => s.id === id);
  if (idx < 0) return null;
  file.submissions[idx] = { ...file.submissions[idx]!, ...patch };
  await writeSubmissionJson("place", file);
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
  await writeSubmissionJson("media", file);
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
  await writeSubmissionJson("video", file);
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
  const patch: Partial<PlaceSubmission> = {
    status,
    reviewedAt,
    reviewedBy: review.reviewedBy?.trim() || null,
    adminNotes: review.adminNotes?.trim() || null,
  };
  if (status === "rejected") {
    patch.rejectedAt = reviewedAt;
  }
  if (kind === "place") return updatePlaceSubmission(id, patch);
  if (kind === "media") return updateMediaSubmission(id, patch);
  return updateVideoSubmission(id, patch);
}
