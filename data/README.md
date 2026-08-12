# Production location data

**Live site source:** [`haunted-places.json`](haunted-places.json)

This file is imported at build time by `lib/places.ts` and powers:

- `/map` (approved places with coordinates)
- `/places/[slug]` (static pages for each approved slug)
- Homepage stats and featured locations
- Search and category filters on the map

## Adding a new location

1. Append a full entry to `places[]` in **`haunted-places.json`** (not `place-schema.reference.json` — reference only).
2. Set **`"status": "approved"`** — only approved places are public.
3. Set **`latitude`** and **`longitude`** — required for the map.
4. Add **`shortDescriptionSv`**, **`historySv`**, **`legendSv`**, **`safetyNoteSv`** (or run `npx tsx scripts/apply-safety-sv.ts` after updating `place-safety-sv.json`).
5. **Hosted cover (required):** `public/places/{slug}-cover.jpg` + `"coverImage": "/places/…"` — download via `scripts/add-*.mjs` (Wikimedia preferred). Avoid remote-only URLs for new entries.
6. Bump top-level **`version`** to match place count (convention).
7. Run **`npm run validate:places`** then **`npm run build`**.
8. Deploy the repo so hauntedsweden.se picks up the new JSON and assets.

## Supporting files (not alternate catalogs)

| File | Role |
|------|------|
| `place-safety-sv.json` | Swedish safety copy merged via script |
| `place-schema.reference.json` | Documentation only — **not loaded** |
| `place-reports.json` | Community reports |
| `submissions/place-submissions.json` | Pending place tips from `/submit` |
| `submissions/media-submissions.json` | Pending image suggestions |
| `submissions/video-submissions.json` | Pending video link suggestions |
| `admin-users.json` | Admin users bootstrap (local dev; production uses Vercel Blob `admin/admin-users.json`) |
| `spokjakt-place-overrides.json` | Spökjakt map metadata |

Do not create mock, example, or duplicate location lists elsewhere.
