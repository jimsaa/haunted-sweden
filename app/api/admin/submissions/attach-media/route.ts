import { NextResponse } from "next/server";
import { attachMediaToPlace, attachVideoToPlace } from "@/lib/submissions/actions";
import { forbidden, requireAdminUser } from "@/lib/admin/api-auth";
import { userCanAttachMedia } from "@/lib/submissions/admin-permissions";
import { getSubmissionByKindAndId } from "@/lib/submissions/store";
import type {
  MediaSubmission,
  SubmissionKind,
  VideoSubmission,
} from "@/lib/submissions/types";

type Body = {
  kind: Extract<SubmissionKind, "media" | "video">;
  id: string;
  placeId: string;
  reviewedBy?: string;
};

export async function POST(request: Request) {
  const auth = await requireAdminUser(request);
  if (!auth.ok) return auth.response;

  try {
    const body = (await request.json()) as Body;
    if (!body.kind || !body.id || !body.placeId) {
      return NextResponse.json(
        { error: "kind, id, and placeId required" },
        { status: 400 }
      );
    }

    if (body.kind === "media") {
      if (!userCanAttachMedia(auth.user, "media")) {
        return forbidden("Missing permission to attach images");
      }
      const existing = await getSubmissionByKindAndId("media", body.id);
      if (!existing) {
        return NextResponse.json({ error: "Submission not found" }, { status: 404 });
      }
      const place = await attachMediaToPlace(
        existing as MediaSubmission,
        body.placeId,
        body.reviewedBy
      );
      if (!place) {
        return NextResponse.json({ error: "Place not found" }, { status: 404 });
      }
      return NextResponse.json({ ok: true, placeId: place.id });
    }

    if (!userCanAttachMedia(auth.user, "video")) {
      return forbidden("Missing permission to attach videos");
    }
    const existing = await getSubmissionByKindAndId("video", body.id);
    if (!existing) {
      return NextResponse.json({ error: "Submission not found" }, { status: 404 });
    }
    const place = await attachVideoToPlace(
      existing as VideoSubmission,
      body.placeId,
      body.reviewedBy
    );
    if (!place) {
      return NextResponse.json({ error: "Place not found" }, { status: 404 });
    }
    return NextResponse.json({ ok: true, placeId: place.id });
  } catch (err) {
    console.error("[admin/submissions/attach-media]", err);
    return NextResponse.json({ error: "Attach failed" }, { status: 500 });
  }
}
