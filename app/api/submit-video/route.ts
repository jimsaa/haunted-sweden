import { NextResponse } from "next/server";
import { detectVideoPlatform } from "@/lib/submissions/detect-platform";
import {
  submissionErrorResponse,
  submissionSuccessResponse,
} from "@/lib/submissions/public-api";
import { appendVideoSubmission, newSubmissionId } from "@/lib/submissions/store";
import type { VideoSubmission } from "@/lib/submissions/types";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<VideoSubmission>;
    const url = body.url?.trim();

    if (!url) {
      return NextResponse.json(
        {
          error: "Video URL is required.",
          errorSv: "Video-URL krävs.",
        },
        { status: 400 }
      );
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
    return submissionSuccessResponse(submission.id);
  } catch (err) {
    return submissionErrorResponse(err, "submit-video");
  }
}
