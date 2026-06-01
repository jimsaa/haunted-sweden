import { NextResponse } from "next/server";
import { detectVideoPlatform } from "@/lib/submissions/detect-platform";
import {
  isSubmissionsWriteEnabled,
  submissionsWriteDisabled,
} from "@/lib/submissions/api-guard";
import { appendVideoSubmission, newSubmissionId } from "@/lib/submissions/store";
import type { VideoSubmission } from "@/lib/submissions/types";

export async function POST(request: Request) {
  if (!isSubmissionsWriteEnabled()) return submissionsWriteDisabled();

  try {
    const body = (await request.json()) as Partial<VideoSubmission>;
    const url = body.url?.trim();

    if (!url) {
      return NextResponse.json({ error: "Video URL is required" }, { status: 400 });
    }

    const submission: VideoSubmission = {
      id: newSubmissionId("video"),
      status: "pending",
      url,
      platform: body.platform ?? detectVideoPlatform(url),
      caption: body.caption?.trim() || undefined,
      placeId: body.placeId?.trim() || null,
      placeName: body.placeName?.trim() || undefined,
      submitterName: body.submitterName?.trim() || undefined,
      submitterEmail: body.submitterEmail?.trim() || undefined,
      submittedAt: new Date().toISOString(),
      reviewedAt: null,
      reviewedBy: null,
      adminNotes: null,
      attachedToPlaceId: null,
    };

    await appendVideoSubmission(submission);
    return NextResponse.json({ ok: true, id: submission.id });
  } catch (err) {
    console.error("[submit-video]", err);
    return NextResponse.json(
      { error: "Failed to save submission" },
      { status: 500 }
    );
  }
}
