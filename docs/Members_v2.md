# Haunted Sweden — Members Platform v2

**Status:** Planned  
**Depends on:** Members v1 foundation

---

## Goals

1. Migrate member identity & entitlements to **Postgres (Supabase)** for 100k-scale.
2. Ship **Stripe Checkout + Customer Portal + webhooks** (monthly / yearly / lifetime via Price IDs).
3. Implement **QR discovery** end-to-end.
4. Member-gated book archive experiences (beyond public secret URL).
5. Newsletter preference sync with existing Supabase lists.
6. Expand admin: users, badges, QR markers, memberships.

## Database (target schema)

See `supabase/members-schema.sql`.

Core tables:

- `members` — identity, profile, tier, role
- `member_badges` — unlocks (unique user+badge)
- `badges` — catalog
- `book_editions` / `member_books` — ownership & progress
- `qr_markers` / `qr_discoveries` — unique (user_id, marker_id)
- `memberships` / `stripe_customers` — billing entitlements
- `member_activity` — timeline / recent activity feed

## Stripe

- Env-only price IDs (`STRIPE_PRICE_*`)
- Webhook updates `memberships` → sync `members.tier`
- No hardcoded SEK/EUR in UI

## QR flow

1. `/members/qr/[code]` (auth required)
2. Resolve marker → insert discovery if new
3. Award badge if configured
4. Idempotent on duplicates

## Auth evolution

Optional migrate from custom HMAC sessions → Supabase Auth while keeping `/members/*` routes stable.

## Community (interactive)

Stories, photos, discussions, suggested places, voting — all moderated; not a social feed.
