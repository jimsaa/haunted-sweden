import { NextResponse } from "next/server";

export function logSubmissionReceived(id: string): void {
  console.log("New submission received:", id);
}

export function submissionSuccessResponse(id: string): NextResponse {
  logSubmissionReceived(id);
  return NextResponse.json({ ok: true, id });
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
      "[submissions] Filesystem not writable — configure BLOB_READ_WRITE_TOKEN on Vercel"
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
