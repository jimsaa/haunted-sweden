import { NextResponse } from "next/server";
import { forbidden, requireAdminUser } from "@/lib/admin/api-auth";
import { userHasPermission } from "@/lib/admin/permissions";
import {
  placesCatalogGithubConfigured,
  readPlacesCatalog,
  writePlacesCatalog,
} from "@/lib/admin/places-json-store";
import { notifyIndexNowAfterPlacesPublish } from "@/lib/indexnow/notify";

type CoverBody = {
  id?: string;
  slug?: string;
  coverImage?: string | null;
};

/**
 * Update a single place coverImage.
 * Body: { id | slug, coverImage: string | null }
 *
 * Local: writes data/haunted-places.json
 * Production (Vercel): commits via GitHub when HAUNTED_SWEDEN_GITHUB_TOKEN is set
 */
export async function POST(request: Request) {
  const auth = await requireAdminUser(request);
  if (!auth.ok) return auth.response;

  const canEdit =
    userHasPermission(auth.user.role, auth.user.permissions, "edit_locations") ||
    userHasPermission(auth.user.role, auth.user.permissions, "upload_images");
  if (!canEdit) {
    return forbidden("Missing permission to update cover images.");
  }

  try {
    const body = (await request.json()) as CoverBody;
    const coverRaw =
      body.coverImage === null || body.coverImage === undefined
        ? ""
        : String(body.coverImage).trim();
    const coverImage = coverRaw || null;

    if (coverImage) {
      const okLocal = coverImage.startsWith("/");
      const okRemote =
        coverImage.startsWith("https://") || coverImage.startsWith("http://");
      if (!okLocal && !okRemote) {
        return NextResponse.json(
          {
            error:
              "Cover must be a site path (/places/...) or an http(s) image URL.",
          },
          { status: 400 }
        );
      }
    }

    const { file: before, sha, source: readSource } = await readPlacesCatalog();
    const places = Array.isArray(before.places) ? [...before.places] : [];

    const idx = places.findIndex((p) => {
      if (body.id && p.id === String(body.id)) return true;
      if (body.slug && p.slug === String(body.slug)) return true;
      return false;
    });

    if (idx < 0) {
      return NextResponse.json({ error: "Place not found." }, { status: 404 });
    }

    const placeName = places[idx].name;
    const updated = {
      ...places[idx],
      coverImage,
    };
    places[idx] = updated;

    const after = {
      ...before,
      places,
    };

    const method = await writePlacesCatalog(after, {
      sha,
      commitMessage: coverImage
        ? `Admin: set cover for ${placeName}`
        : `Admin: clear cover for ${placeName}`,
    });

    void notifyIndexNowAfterPlacesPublish(before, after);

    return NextResponse.json({
      ok: true,
      id: updated.id,
      slug: updated.slug,
      coverImage: updated.coverImage ?? null,
      persistedVia: method,
      readFrom: readSource,
      note:
        method === "github"
          ? "Saved to GitHub — Vercel will redeploy shortly; cover appears after deploy."
          : "Saved to local haunted-places.json.",
    });
  } catch (err) {
    console.error("[admin/places/cover POST]", err);
    const message =
      err instanceof Error ? err.message : "Failed to update cover image.";
    return NextResponse.json(
      {
        error: message,
        githubConfigured: placesCatalogGithubConfigured(),
      },
      { status: 500 }
    );
  }
}
