import { NextResponse } from "next/server";
import {
  submissionErrorResponse,
  submissionSuccessResponse,
} from "@/lib/submissions/public-api";
import { appendMediaSubmission, newSubmissionId } from "@/lib/submissions/store";
import type { MediaSubmission } from "@/lib/submissions/types";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<MediaSubmission>;
    const url = body.url?.trim();

    if (!url) {
      return NextResponse.json(
        {
          error: "Image URL is required.",
          errorSv: "Bild-URL krävs.",
        },
        { status: 400 }
      );
    }

    const submission: MediaSubmission = {
      id: newSubmissionId("media"),
      status: "pending",
      mediaType: "image",
      url,
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

    await appendMediaSubmission(submission);
    return submissionSuccessResponse(submission.id);
  } catch (err) {
    return submissionErrorResponse(err, "submit-media");
  }
}
