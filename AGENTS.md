# Haunted Sweden — agent instructions

## Brand (required)

Read and follow **[docs/BRAND.md](docs/BRAND.md)**.

- Product name is always **Haunted Sweden**.
- Never use: Swedish Hauntings, Sweden Hauntings, Haunted Sweden App Project, Swedish Haunted Locations.
- Editorial JSON fields: `hauntedSwedenScore`, `suggestedHauntedSwedenTags`, `hauntedSwedenAppSummary`, `whyItFitsHauntedSweden`.

## Architecture

- **[docs/VISION.md](docs/VISION.md)** — product principles  
- **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)** — routes, data model  
- **Map-first:** `/map` is the primary product surface  

## Data

- **Production locations (live):** `data/haunted-places.json` — sole catalog for hauntedsweden.se  
- Reports: `data/place-reports.json`  
- Spökjakt Archive: `data/spokjakt-archive.json` — `/spokjakt`  
- Schema reference: `data/place-schema.reference.json` (documentation only — not loaded)

See **[data/README.md](data/README.md)** for the add-location checklist.

### New location checklist

1. Append entry to `data/haunted-places.json` with `"status": "approved"`, coordinates, EN + SV fields.  
2. Never add mock/example-only data elsewhere.  
3. Run `npm run validate:places` then `npm run build`.  
4. Deploy so map, search, filters, and `/places/[slug]` include the new slug.

## Dev

```bash
npm run dev              # http://localhost:3000 — use /map as main entry
npm run validate:places  # after editing haunted-places.json
npm run build
```
