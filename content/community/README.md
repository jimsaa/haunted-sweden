# Haunted Sweden Community

Public conversion page: `/community`

## Feature flag (temporary hide)

Public Community is controlled by:

```bash
ENABLE_COMMUNITY=false   # default — hide nav, 404 /community, omit sitemap
ENABLE_COMMUNITY=true    # restore public landing automatically
```

Set on Vercel / `.env.local`. No files are deleted — only gated.

## Content

Edit `content/community/landing.json` — no code changes needed for:

- Hero / why join / philosophy / feature cards
- Testimonials
- Books list (add Book 4+ here)
- Social links (`enabled: true` + `url`)
- Future membership feature list

## Signup

`POST /api/community/join` → Supabase `community_members`

Requires `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` (see `supabase/README.md`).

Run the latest `supabase/schema.sql` to create `community_members`.

## Admin

Admin → **Community** tab (requires `view_analytics`): search, filter, export CSV, delete.
