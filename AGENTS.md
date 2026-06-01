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

- Locations: `data/haunted-places.json`  
- Reports: `data/place-reports.json`  
- Spökjakt Archive: `data/spokjakt-archive.json` — `/spokjakt`  
- Schema reference: `data/place-schema.reference.json`  

## Dev

```bash
npm run dev   # http://localhost:3000 — use /map as main entry
npm run build
```
