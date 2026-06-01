import { NextResponse } from "next/server";
import { attachMediaToPlace, attachVideoToPlace } from "@/lib/submissions/actions";
import { forbidden, requireAdminUser } from "@/lib/admin/api-auth";
import { formatSubmissionApiError } from "@/lib/submissions/api-error";
import {
  userCanApproveKind,
  userCanAttachMedia,
} from "@/lib/submissions/admin-permissions";
import {
  getSubmissionByKindAndId,
  setSubmissionStatus,
} from "@/lib/submissions/store";
import type {
  MediaSubmission,
  SubmissionKind,
  VideoSubmission,
} from "@/lib/submissions/types";

type ApproveBody = {
  kind: SubmissionKind;
  id: string;
  reviewedBy?: string;
  adminNotes?: string;
  placeId?: string;
};

export async function POST(request: Request) {
  const auth = await requireAdminUser(request);
  if (!auth.ok) return auth.response;

  try {
    const body = (await request.json()) as ApproveBody;
    if (!body.kind || !body.id) {
      return NextResponse.json({ error: "kind and id required" }, { status: 400 });
    }

    if (!userCanApproveKind(auth.user, body.kind)) {
      return forbidden("Missing approve permission");
    }

    const existing = await getSubmissionByKindAndId(body.kind, body.id);
    if (!existing) {
      return NextResponse.json({ error: "Submission not found" }, { status: 404 });
    }

    if (body.kind === "media" && body.placeId) {
      if (!userCanAttachMedia(auth.user, "media")) {
        return forbidden("Missing permission to attach images");
      }
      const place = await attachMediaToPlace(
        existing as MediaSubmission,
        body.placeId,
        body.reviewedBy
      );
      if (!place) {
        return NextResponse.json({ error: "Place not found" }, { status: 404 });
      }
      return NextResponse.json({ ok: true, attachedPlaceId: place.id });
    }

    if (body.kind === "video" && body.placeId) {
      if (!userCanAttachMedia(auth.user, "video")) {
        return forbidden("Missing permission to attach videos");
      }
      const place = await attachVideoToPlace(
        existing as VideoSubmission,
        body.placeId,
        body.reviewedBy
      );
      if (!place) {
        return NextResponse.json({ error: "Place not found" }, { status: 404 });
      }
      return NextResponse.json({ ok: true, attachedPlaceId: place.id });
    }

    const reviewedBy =
      body.reviewedBy?.trim() ||
      auth.user.displayName ||
      auth.user.username;

    const updated = await setSubmissionStatus(body.kind, body.id, "approved", {
      reviewedBy,
      adminNotes: body.adminNotes,
    });

    if (!updated) {
      return NextResponse.json(
        { error: "Failed to update submission file" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, submission: updated });
  } catch (err) {
    console.error("[admin/submissions/approve]", err);
    return NextResponse.json(
      { error: formatSubmissionApiError(err, "Approve failed") },
      { status: 500 }
    );
  }
}
