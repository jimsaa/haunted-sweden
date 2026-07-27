# Book Archive

Exclusive bonus material for readers who purchased a Haunted Sweden book.

## URLs

Each book has a **secret, randomly generated** archive ID:

```
https://hauntedsweden.se/archive/hs-a73fd9e2
```

Never use predictable paths like `/book1` or `/archive/book-1`.

## Adding a new book

1. Generate an ID:
   ```bash
   npm run book-archive:generate-id
   ```
2. Copy `content/books/hs-a73fd9e2.json` as a template.
3. Save as `content/books/{archiveId}.json` — filename must match `archiveId`.
4. Set `"status": "published"` when ready.
5. Deploy — no code changes required.

## SEO

Archive pages are **not indexed**:

- `noindex, nofollow` metadata
- Excluded from `sitemap.xml`
- `/archive/` disallowed in `robots.txt`
- No navigation, footer, or search links

## Next book block

Edit `nextBook` in the JSON:

```json
"nextBook": {
  "mode": "coming_soon",
  "headline": "The next investigation is currently underway…",
  "body": "Book 2 is in production.",
  "emailSignupPlaceholder": "Your email address"
}
```

When Book 2 launches:

```json
"nextBook": {
  "mode": "published",
  "headline": "Continue the journey.",
  "bookTitle": "Haunted Sweden: Volume II",
  "buyLabel": "Buy Book 2",
  "buyUrl": "https://..."
}
```

## Future access control

The `access` field is reserved for password or unlock-code gates — not implemented yet.
