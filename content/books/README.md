# Haunted Sweden Investigation Archive

Exclusive companion material for book readers. Unlocked via QR code in each printed book.

## URL

```
https://hauntedsweden.se/archive/hs-a73fd9e2
```

Book 1: **Haunted Sweden – De första vittnesmålen**

## Adding a new book

```bash
npm run book-archive:generate-id
```

1. Copy `hs-a73fd9e2.json` → `content/books/{new-id}.json`
2. Update `archiveId`, `title`, `investigations[]`, images under `public/archive/books/{id}/`
3. Set `"status": "published"`
4. Deploy — no code changes

## Investigation structure

Each book has an `investigations` array. Every investigation supports:

- Hero image
- Historical background, verified history, folklore (placeholder text until you add research)
- Timeline, gallery (lightbox), map (GPS + Google Maps links)
- Sources, visiting info, research notes
- Community: visited poll + private story submission

## Next book block

Edit `nextBook` in JSON — switch `mode` from `coming_soon` to `published` when Book II launches.

## Newsletter & community

Requires Supabase — see `supabase/README.md`.

## SEO

Hidden from search engines. No sitemap, nav, or public index.
