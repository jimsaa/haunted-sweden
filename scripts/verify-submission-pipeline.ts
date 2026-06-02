/**
 * Verifies submission storage pipeline (run with BLOB_READ_WRITE_TOKEN in env).
 * Usage: npm run verify:submissions
 */
import {
  BLOB_PATHS,
  getSubmissionStorageBackend,
  isBlobTokenConfigured,
} from "../lib/submissions/storage-backend";
import {
  appendMediaSubmission,
  appendPlaceSubmission,
  appendVideoSubmission,
  newSubmissionId,
  readMediaSubmissions,
  readPlaceSubmissions,
  readVideoSubmissions,
} from "../lib/submissions/store";

async function main() {
  console.log("=== Haunted Sweden submission pipeline verify ===\n");

  const token = process.env.BLOB_READ_WRITE_TOKEN?.trim();
  console.log("BLOB_READ_WRITE_TOKEN:", token ? `set (${token.slice(0, 8)}…)` : "NOT SET");
  console.log("NODE_ENV:", process.env.NODE_ENV ?? "(unset)");
  console.log("Storage backend:", getSubmissionStorageBackend());
  console.log("Blob paths:", BLOB_PATHS);
  console.log("");

  if (!isBlobTokenConfigured()) {
    console.error(
      "FAIL: Set BLOB_READ_WRITE_TOKEN (vercel env pull, or .env.local) to test Blob pipeline."
    );
    process.exit(1);
  }

  const placeId = newSubmissionId("place");
  await appendPlaceSubmission({
    id: placeId,
    status: "pending",
    name: "Pipeline verify place",
    category: "Other",
    city: "Stockholm",
    region: "Stockholm",
    description: "Automated pipeline test",
    submittedAt: new Date().toISOString(),
    reviewedAt: null,
    reviewedBy: null,
    adminNotes: null,
    convertedPlaceId: null,
  });
  console.log("Wrote place:", placeId);

  const mediaId = newSubmissionId("media");
  await appendMediaSubmission({
    id: mediaId,
    status: "pending",
    mediaType: "image",
    url: "https://example.com/verify.jpg",
    submittedAt: new Date().toISOString(),
    reviewedAt: null,
    reviewedBy: null,
    adminNotes: null,
    attachedToPlaceId: null,
  });
  console.log("Wrote media:", mediaId);

  const videoId = newSubmissionId("video");
  await appendVideoSubmission({
    id: videoId,
    status: "pending",
    url: "https://www.youtube.com/watch?v=verify",
    submittedAt: new Date().toISOString(),
    reviewedAt: null,
    reviewedBy: null,
    adminNotes: null,
    attachedToPlaceId: null,
  });
  console.log("Wrote video:", videoId);

  const places = await readPlaceSubmissions();
  const media = await readMediaSubmissions();
  const videos = await readVideoSubmissions();

  const foundPlace = places.submissions.some((s) => s.id === placeId);
  const foundMedia = media.submissions.some((s) => s.id === mediaId);
  const foundVideo = videos.submissions.some((s) => s.id === videoId);

  console.log("\nAdmin inbox read-back:");
  console.log("  place found:", foundPlace);
  console.log("  media found:", foundMedia);
  console.log("  video found:", foundVideo);

  if (foundPlace && foundMedia && foundVideo) {
    console.log("\nPASS: Submit → Blob → read (same as Admin Inbox) OK");
    process.exit(0);
  }

  console.error("\nFAIL: One or more submissions not found after write");
  process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
