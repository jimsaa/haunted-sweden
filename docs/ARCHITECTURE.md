# Haunted Sweden — Architecture

Editorial field naming: see [BRAND.md](BRAND.md) (`hauntedSwedenScore`, `suggestedHauntedSwedenTags`, `hauntedSwedenAppSummary`, `whyItFitsHauntedSweden`).

## Stack

- **Next.js** (App Router) — web-first, mobile-optimized  
- **Local JSON** — `data/haunted-places.json` (MVP data source)  
- **Leaflet** — map-first discovery  
- **EN/SV** — `lib/translations.ts` + `LanguageProvider`

## Core Routes

| Route | Role |
|-------|------|
| `/map` | **Primary product** — explore all approved locations |
| `/places/[slug]` | Location detail (hero, history, legends, media placeholders) |
| `/` | Landing — drives users to the map |
| `/submit` | Community submission form (review queue — future backend) |

## Data Model

### Location (`HauntedPlace`)

Defined in `lib/types/place.ts`, normalized on load via `lib/place-normalize.ts`.

**Trust & investigation (active):**

```json
{
  "verificationLevel": "community-submitted",
  "verifiedByTeam": false,
  "visitCount": 0,
  "lastInvestigationDate": null,
  "investigationPhotos": [],
  "investigationVideos": [],
  "overnightInvestigation": false
}
```

**Community (prepared, optional on each place):**

```ts
community?: {
  userReportCount, userPhotoCount, userVideoCount,
  averageUserRating, userInvestigationCount
}
```

**Investigation content (prepared, optional):**

```ts
investigationContent?: {
  timeline, teamNotes, investigationMedia,
  historicalSources, communityEvidenceIds
}
```

### Reports (`data/place-reports.json`)

Approved reports linked by `placeId`. Moderation pipeline TBD.

### Categories

English values in JSON; UI labels in `translations.placeCategories`.  
Filter IDs in `lib/categories.ts`.

## Key Modules

| Module | Purpose |
|--------|---------|
| `lib/places.ts` | Load & query approved places |
| `lib/verification.ts` | Trust tiers, labels, normalization |
| `lib/discovery-filters.ts` | Map filter schema (+ MVP team-verified filter) |
| `lib/local-strategy.ts` | Phase-1 Gothenburg radius constants |
| `lib/place-filters.ts` | Search + category filters |
| `lib/types/community.ts` | Future community types |
| `lib/types/investigation-content.ts` | Future verified-location content |

## Map-First UX

1. Header → **Map** link always visible  
2. Homepage hero → primary CTA **Explore Map**  
3. Markers → popup → **View Details** → `/places/[slug]`  
4. List cards below map share the same data  

## What We Are Not Building (MVP)

- Payments / premium tiers  
- Live investigations / chat / events  
- EVP tools or “ghost detector” gimmicks  
- Full community upload flows (schema only)  
- Largest-database growth hacks  

## Phase Roadmap (High Level)

1. **Now:** Trusted map + curated locations + verification labels  
2. **Next:** Gothenburg-region investigations + original media  
3. **Later:** Community verification, ratings, timelines  
4. **Future:** Premium features (journal, events, badges)

See `docs/VISION.md` for product principles.
