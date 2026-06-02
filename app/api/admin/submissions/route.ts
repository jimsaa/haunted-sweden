import { NextResponse } from "next/server";
import { requireAdminPermission } from "@/lib/submissions/api-guard";
import {
  getSubmissionStorageBackend,
  isBlobTokenConfigured,
} from "@/lib/submissions/storage-backend";
import {
  readMediaSubmissions,
  readPlaceSubmissions,
  readVideoSubmissions,
} from "@/lib/submissions/store";

export async function GET(request: Request) {
  const auth = await requireAdminPermission(request, "view_submissions");
  if (!auth.ok) return auth.response;

  try {
    console.log(
      "[admin/submissions] Inbox load — storage backend:",
      getSubmissionStorageBackend(),
      "| BLOB token:",
      isBlobTokenConfigured() ? "detected" : "missing"
    );

    const [places, media, videos] = await Promise.all([
      readPlaceSubmissions(),
      readMediaSubmissions(),
      readVideoSubmissions(),
    ]);

    return NextResponse.json({
      places: places.submissions,
      media: media.submissions,
      videos: videos.submissions,
    });
  } catch (err) {
    console.error("[admin/submissions GET]", err);
    return NextResponse.json(
      { error: "Failed to read submissions" },
      { status: 500 }
    );
  }
}
