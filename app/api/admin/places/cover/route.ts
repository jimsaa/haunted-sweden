import { NextResponse } from "next/server";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { forbidden, requireAdminUser } from "@/lib/admin/api-auth";
import { userHasPermission } from "@/lib/admin/permissions";
import { notifyIndexNowAfterPlacesPublish } from "@/lib/indexnow/notify";
import type { HauntedPlacesFile } from "@/lib/types/place";

const DATA_PATH = path.join(process.cwd(), "data", "haunted-places.json");

type CoverBody = {
  id?: string;
  slug?: string;
  coverImage?: string | null;
};

/**
 * Update a single place coverImage without rewriting the whole admin draft.
 * Body: { id | slug, coverImage: string | null }
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

    const raw = await readFile(DATA_PATH, "utf8");
    const before = JSON.parse(raw) as HauntedPlacesFile;
    const places = Array.isArray(before.places) ? [...before.places] : [];

    const idx = places.findIndex((p) => {
      if (body.id && p.id === String(body.id)) return true;
      if (body.slug && p.slug === String(body.slug)) return true;
      return false;
    });

    if (idx < 0) {
      return NextResponse.json({ error: "Place not found." }, { status: 404 });
    }

    const updated = {
      ...places[idx],
      coverImage,
    };
    places[idx] = updated;

    const after: HauntedPlacesFile = {
      ...before,
      places,
    };

    await writeFile(DATA_PATH, `${JSON.stringify(after, null, 2)}\n`, "utf8");
    void notifyIndexNowAfterPlacesPublish(before, after);

    return NextResponse.json({
      ok: true,
      id: updated.id,
      slug: updated.slug,
      coverImage: updated.coverImage ?? null,
    });
  } catch (err) {
    console.error("[admin/places/cover POST]", err);
    return NextResponse.json(
      { error: "Failed to update cover image." },
      { status: 500 }
    );
  }
}
