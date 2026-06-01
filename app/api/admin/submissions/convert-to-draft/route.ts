import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";
import { convertPlaceSubmissionToDraft } from "@/lib/submissions/actions";
import { forbidden, requireAdminUser } from "@/lib/admin/api-auth";
import { notifyIndexNowAfterPlacesPublish } from "@/lib/indexnow/notify";
import type { HauntedPlacesFile } from "@/lib/types/place";
import { userHasPermission } from "@/lib/admin/permissions";
import { getSubmissionByKindAndId } from "@/lib/submissions/store";
import type { PlaceSubmission } from "@/lib/submissions/types";

type Body = {
  id: string;
  reviewedBy?: string;
  adminNotes?: string;
};

export async function POST(request: Request) {
  const auth = await requireAdminUser(request);
  if (!auth.ok) return auth.response;

  if (
    !userHasPermission(
      auth.user.role,
      auth.user.permissions,
      "create_new_locations"
    ) ||
    !userHasPermission(
      auth.user.role,
      auth.user.permissions,
      "approve_place_tips"
    )
  ) {
    return forbidden("Missing permission to create location drafts");
  }

  try {
    const body = (await request.json()) as Body;
    if (!body.id) {
      return NextResponse.json({ error: "id required" }, { status: 400 });
    }

    const existing = await getSubmissionByKindAndId("place", body.id);
    if (!existing) {
      return NextResponse.json({ error: "Submission not found" }, { status: 404 });
    }

    const placesPath = path.join(process.cwd(), "data", "haunted-places.json");
    let before: HauntedPlacesFile = { version: 0, places: [] };
    try {
      before = JSON.parse(await readFile(placesPath, "utf8")) as HauntedPlacesFile;
    } catch {
      /* first place */
    }

    const { place, file } = await convertPlaceSubmissionToDraft(
      existing as PlaceSubmission,
      body.reviewedBy
    );

    void notifyIndexNowAfterPlacesPublish(before, file);

    return NextResponse.json({
      ok: true,
      placeId: place.id,
      slug: place.slug,
    });
  } catch (err) {
    console.error("[admin/submissions/convert-to-draft]", err);
    return NextResponse.json({ error: "Convert failed" }, { status: 500 });
  }
}
