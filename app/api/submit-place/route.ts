import { NextResponse } from "next/server";
import { PLACE_CATEGORIES } from "@/lib/categories";
import {
  isSubmissionsWriteEnabled,
  submissionsWriteDisabled,
} from "@/lib/submissions/api-guard";
import { appendPlaceSubmission, newSubmissionId } from "@/lib/submissions/store";
import type { PlaceSubmission } from "@/lib/submissions/types";

export async function POST(request: Request) {
  if (!isSubmissionsWriteEnabled()) return submissionsWriteDisabled();

  try {
    const body = (await request.json()) as Partial<PlaceSubmission>;
    const name = body.name?.trim();
    const category = body.category?.trim();
    const city = body.city?.trim();
    const region = body.region?.trim();
    const description = body.description?.trim();

    if (!name || !category || !city || !region || !description) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!PLACE_CATEGORIES.includes(category as (typeof PLACE_CATEGORIES)[number])) {
      return NextResponse.json({ error: "Invalid category" }, { status: 400 });
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
    return NextResponse.json({ ok: true, id: submission.id });
  } catch (err) {
    console.error("[submit-place]", err);
    return NextResponse.json(
      { error: "Failed to save submission" },
      { status: 500 }
    );
  }
}
