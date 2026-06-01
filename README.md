# Haunted Sweden

**Google Maps for haunted locations in Sweden** — a trusted, map-first platform for paranormal exploration.

Not the biggest database. The **most trusted and user-focused** one.

## Vision & architecture

- [Brand rules](docs/BRAND.md) — always **Haunted Sweden**; editorial field names  
- [Spökjakt Archive](docs/SPOKJAKT-ARCHIVE.md) — TV investigation index (`/spokjakt`)  
- [Product vision](docs/VISION.md) — principles, verification, local-first strategy  
- [Architecture](docs/ARCHITECTURE.md) — routes, data model, modules, roadmap  
- [Place schema reference](data/place-schema.reference.json) — JSON field reference  

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000/map](http://localhost:3000/map) — **the map is the main product**.

```bash
npm run build
```

## MVP focus

- Dark, mobile-first map with clustered markers  
- Curated locations from `data/haunted-places.json`  
- Verification levels: community-submitted → community-verified → haunted-sweden-verified  
- Bilingual UI (EN / SV)  
- Phase 1 curation: high-quality locations near Gothenburg (~1 hour)  

## Not in scope (yet)

Community uploads, ratings, premium features, live investigations, EVP tools, or sensational “ghost detector” UX. Data models are prepared; features are not.
