# Supabase — Book Archive

Required for newsletter subscriptions and community story submissions when using Supabase.

**Production without Supabase:** email signups are stored in Vercel Blob at `email-signups/waitlist.json` (same `BLOB_READ_WRITE_TOKEN` as submissions). Supabase is optional and used when env vars are set.

## Environment variables (Vercel + local `.env.local`)

```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

Never expose the service role key in client-side code.

## Setup

1. Create a Supabase project at https://supabase.com
2. Run `supabase/schema.sql` in the SQL Editor
3. Add env vars to Vercel → Project → Settings → Environment Variables
4. Redeploy

## Tables

- `newsletter_subscribers` — archive email signups
- `archive_community_responses` — visit polls and private stories (admin review)
- `community_members` — `/community` landing page signups (source = Community Landing Page)

## Future

- Double opt-in: set `verified = true` after confirmation email
- Password/unlock codes: see `access` field in book JSON
- Premium memberships: `membership_tier` on `community_members` (`free` | `premium` | `founder`)
