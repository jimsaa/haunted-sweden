import { NextResponse } from "next/server";
import { forbidden, requireAdminUser } from "@/lib/admin/api-auth";
import { userCanRejectKind } from "@/lib/submissions/admin-permissions";
import {
  getSubmissionByKindAndId,
  setSubmissionStatus,
} from "@/lib/submissions/store";
import type { SubmissionKind } from "@/lib/submissions/types";

type Body = {
  kind: SubmissionKind;
  id: string;
  reviewedBy?: string;
  adminNotes?: string;
};

export async function POST(request: Request) {
  const auth = await requireAdminUser(request);
  if (!auth.ok) return auth.response;

  try {
    const body = (await request.json()) as Body;
    if (!body.kind || !body.id) {
      return NextResponse.json({ error: "kind and id required" }, { status: 400 });
    }

    if (!userCanRejectKind(auth.user, body.kind)) {
      return forbidden("Missing reject permission");
    }

    const existing = await getSubmissionByKindAndId(body.kind, body.id);
    if (!existing) {
      return NextResponse.json({ error: "Submission not found" }, { status: 404 });
    }

    const updated = await setSubmissionStatus(body.kind, body.id, "archived", {
      reviewedBy: body.reviewedBy,
      adminNotes: body.adminNotes,
    });

    return NextResponse.json({ ok: true, submission: updated });
  } catch (err) {
    console.error("[admin/submissions/archive]", err);
    return NextResponse.json({ error: "Archive failed" }, { status: 500 });
  }
}
