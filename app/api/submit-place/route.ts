import { NextResponse } from "next/server";
import { PLACE_CATEGORIES } from "@/lib/categories";
import {
  submissionErrorResponse,
  submissionSuccessResponse,
} from "@/lib/submissions/public-api";
import { appendPlaceSubmission, newSubmissionId } from "@/lib/submissions/store";
import type { PlaceSubmission } from "@/lib/submissions/types";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<PlaceSubmission>;
    const name = body.name?.trim();
    const category = body.category?.trim();
    const city = body.city?.trim();
    const region = body.region?.trim();
    const description = body.description?.trim();

    if (!name || !category || !city || !region || !description) {
      return NextResponse.json(
        {
          error: "Missing required fields.",
          errorSv: "Obligatoriska fält saknas.",
        },
        { status: 400 }
      );
    }

    if (!PLACE_CATEGORIES.includes(category as (typeof PLACE_CATEGORIES)[number])) {
      return NextResponse.json(
        { error: "Invalid category.", errorSv: "Ogiltig kategori." },
        { status: 400 }
      );
    }

    const submission: PlaceSubmission = {
      id: newSubmissionId("place"),
      status: "pending",
      name,
      englishName: body.englishName?.trim() || undefined,
      category,
      city,
      region,
      description,
      history: body.history?.trim() || undefined,
      legend: body.legend?.trim() || undefined,
      submitterName: body.submitterName?.trim() || undefined,
      submitterEmail: body.submitterEmail?.trim() || undefined,
      submittedAt: new Date().toISOString(),
      reviewedAt: null,
      reviewedBy: null,
      adminNotes: null,
      convertedPlaceId: null,
    };

    await appendPlaceSubmission(submission);
    return submissionSuccessResponse(submission.id);
  } catch (err) {
    return submissionErrorResponse(err, "submit-place");
  }
}
