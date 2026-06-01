# IndexNow (Bing + partners)

Automatically notifies search engines when **approved location pages** or **new investigation pages** are published.

## Setup

```bash
npm run indexnow:generate-key
```

1. Adds `data/indexnow/key.txt` and `public/{key}.txt`
2. Set **`INDEXNOW_KEY`** in `.env.local` and Vercel
3. Verify: `https://hauntedsweden.se/{key}.txt` returns the key

Disable with `INDEXNOW_DISABLED=true`.

## When URLs are submitted

| Trigger | URLs |
|---------|------|
| Admin saves `haunted-places.json` | New/changed **approved** `/places/[slug]` |
| Same save (archive diff) | **New** `/investigations/[slug]` only |
| `npm run indexnow:notify-catalog` | Full catalog (manual/deploy) |

**Not submitted:** `/admin`, `/api/*`, pending/rejected places.

## State

`data/indexnow/state.json` tracks fingerprints (gitignored). First admin save after setup initializes state without bulk ping.

## APIs used

- `https://api.indexnow.org/indexnow`
- `https://www.bing.com/indexnow`
