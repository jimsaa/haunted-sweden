import type { HauntedPlacesFile } from "@/lib/types/place";
import {
  buildPlaceFingerprints,
  currentInvestigationSlugs,
  diffNewInvestigationUrls,
  diffPublishedPlaceUrls,
  investigationPageUrl,
  placePageUrl,
} from "@/lib/indexnow/diff";
import { readIndexNowState, writeIndexNowState } from "@/lib/indexnow/state";
import { submitUrlsToIndexNow } from "@/lib/indexnow/submit";

/**
 * After haunted-places.json is saved, notify IndexNow for:
 * - new/updated approved location pages
 * - new investigation pages (from spokjakt archive)
 *
 * Does not run for admin UI routes themselves — only derived public URLs.
 */
export async function notifyIndexNowAfterPlacesPublish(
  before: HauntedPlacesFile,
  after: HauntedPlacesFile
): Promise<void> {
  try {
    let state = await readIndexNowState();

    if (!state.initialized) {
      state = {
        initialized: true,
        placeFingerprints: buildPlaceFingerprints(after.places),
        investigationSlugs: currentInvestigationSlugs(),
      };
      await writeIndexNowState(state);
      console.info(
        "[indexnow] Initialized state — no bulk submit on first run"
      );
      return;
    }

    const placeUrls = diffPublishedPlaceUrls(before.places, after.places);
    const investigationUrls = diffNewInvestigationUrls(state.investigationSlugs);
    const urls = [...placeUrls, ...investigationUrls];

    if (urls.length > 0) {
      await submitUrlsToIndexNow(urls);
    }

    state = {
      initialized: true,
      placeFingerprints: buildPlaceFingerprints(after.places),
      investigationSlugs: currentInvestigationSlugs(),
    };
    await writeIndexNowState(state);
  } catch (err) {
    console.error("[indexnow] notifyIndexNowAfterPlacesPublish failed", err);
  }
}

/** Notify all current approved place + investigation URLs (deploy / manual). */
export async function notifyIndexNowFullCatalog(
  file: HauntedPlacesFile
): Promise<void> {
  const placeUrls = file.places
    .filter((p) => p.status === "approved" && p.slug)
    .map((p) => placePageUrl(p.slug));

  const { getSpokjaktEntries } = await import("@/lib/spokjakt-archive");
  const investigationUrls = getSpokjaktEntries().map((e) =>
    investigationPageUrl(e.slug)
  );

  await submitUrlsToIndexNow([...placeUrls, ...investigationUrls]);

  const state = {
    initialized: true,
    placeFingerprints: buildPlaceFingerprints(file.places),
    investigationSlugs: currentInvestigationSlugs(),
  };
  await writeIndexNowState(state);
}
