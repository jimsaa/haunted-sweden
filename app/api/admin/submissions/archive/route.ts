import { NextResponse } from "next/server";
import { forbidden, requireAdminUser } from "@/lib/admin/api-auth";
import { userCanRejectKind } from "@/lib/submissions/admin-permissions";
import { formatSubmissionApiError } from "@/lib/submissions/api-error";
import {
  getSubmissionByKindAndId,
  setSubmissionStatus,
} from "@/lib/submissions/store";
import type { SubmissionKind } from "@/lib/submissions/types";

type Body = {
  kind?: SubmissionKind;
  id?: string;
  reviewedBy?: string;
  adminNotes?: string;
};

export async function POST(request: Request) {
  const auth = await requireAdminUser(request);
  if (!auth.ok) return auth.response;

  try {
    const body = (await request.json()) as Body;
    const kind = body.kind;
    const id = body.id?.trim();

    if (!kind || !id) {
      return NextResponse.json(
        { error: "kind and id are required" },
        { status: 400 }
      );
    }

    if (!userCanRejectKind(auth.user, kind)) {
      return forbidden("Missing reject permission");
    }

    const existing = await getSubmissionByKindAndId(kind, id);
    if (!existing) {
      return NextResponse.json({ error: "Submission not found" }, { status: 404 });
    }

    const reviewedBy =
      body.reviewedBy?.trim() ||
      auth.user.displayName ||
      auth.user.username;

    const updated = await setSubmissionStatus(kind, id, "archived", {
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
    console.error("[admin/submissions/archive]", err);
    return NextResponse.json(
      { error: formatSubmissionApiError(err, "Archive failed") },
      { status: 500 }
    );
  }
}
