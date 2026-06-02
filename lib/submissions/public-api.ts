import { NextResponse } from "next/server";
import {
  getSubmissionStorageBackend,
  isBlobTokenConfigured,
} from "@/lib/submissions/storage-backend";
import type { SubmissionFileKey } from "@/lib/submissions/storage-backend";

export type SubmissionTypeLabel = SubmissionFileKey;

/** DEBUG: temporary — logs receipt + storage backend. */
export function logSubmissionReceived(
  id: string,
  type: SubmissionTypeLabel
): void {
  const backend = getSubmissionStorageBackend();
  console.log("New submission received:", id);
  console.log("[submissions] Submission type:", type);
  console.log("[submissions] Storage backend used:", backend);
  if (process.env.NODE_ENV === "production") {
    console.log(
      "[submissions] BLOB_READ_WRITE_TOKEN:",
      isBlobTokenConfigured() ? "detected" : "MISSING"
    );
  }
}

export function submissionSuccessResponse(
  id: string,
  type: SubmissionTypeLabel
): NextResponse {
  logSubmissionReceived(id, type);
  return NextResponse.json({
    ok: true,
    id,
    storage: getSubmissionStorageBackend(),
  });
}

type SubmissionErrorBody = {
  error: string;
  errorSv: string;
};

export function mapSubmissionWriteError(err: unknown): SubmissionErrorBody & {
  status: number;
} {
  const code = (err as NodeJS.ErrnoException).code;

  if (code === "EROFS" || code === "EPERM") {
    console.error(
      "[submissions] Filesystem not writable — connect Vercel Blob (BLOB_READ_WRITE_TOKEN)"
    );
    return {
      status: 503,
      error: "Could not save your submission. Please try again later.",
      errorSv: "Tipset kunde inte sparas just nu. Försök igen senare.",
    };
  }

  const message = err instanceof Error ? err.message : String(err);
  if (message.includes("BLOB_READ_WRITE_TOKEN")) {
    return {
      status: 503,
      error: "Submission storage is not configured. Please try again later.",
      errorSv: "Lagring för tips är inte konfigurerad. Försök igen senare.",
    };
  }

  return {
    status: 500,
    error: "Could not save your submission. Please try again.",
    errorSv: "Kunde inte spara tipset. Försök igen.",
  };
}

export function submissionErrorResponse(
  err: unknown,
  routeLabel: string
): NextResponse {
  console.error(`[${routeLabel}]`, err);
  const mapped = mapSubmissionWriteError(err);
  return NextResponse.json(
    { error: mapped.error, errorSv: mapped.errorSv },
    { status: mapped.status }
  );
}
