# Haunted Sweden — Members Platform v1.0

**Status:** Implemented (foundation)  
**Date:** 2026-07  
**Scope:** Authenticated investigation platform shell — architecture first

---

## Mission

Members is the permanent digital home of Haunted Sweden: a **private Investigation Platform**, not social media. Nordic noir / archive aesthetic. Scalable toward books, QR hunts, badges, shop, and research.

## What ships in v1

| Capability | Status |
|------------|--------|
| Register / login / logout | ✅ |
| Session tokens (HMAC, 14-day TTL) | ✅ |
| Profile view + edit | ✅ |
| Investigation dashboard | ✅ |
| Investigation profile placeholders | ✅ |
| Book archive catalog slots | ✅ |
| Badge catalog + unlock display | ✅ |
| Community / shop placeholders | ✅ |
| Membership tiers (data model) | ✅ |
| Admin Members panel (read-only) | ✅ |
| Stripe architecture stub | ✅ (no live checkout) |
| QR architecture only | ✅ |
| Dev-only admin seed | ✅ `admin` / `haunted7394` |
| Production auto-seed | ❌ Never |

## Routes

| Route | Role |
|-------|------|
| `/members` | Redirect → dashboard |
| `/members/login` | Auth |
| `/members/register` | Registration |
| `/members/dashboard` | Home |
| `/members/profile` | Profile |
| `/members/investigation` | Personal archive placeholders |
| `/members/archives` | Book archive slots |
| `/members/badges` | Badge catalog |
| `/members/community` | Placeholder modules |
| `/members/shop` | Placeholder commerce |
| `/members/settings` | Account + billing/newsletter stubs |

Public marketing stays at `/community`. Book Archive stays at `/archive/[id]`.

## Architecture

```
Browser (MembersShell)
  → sessionStorage token + localStorage user
  → /api/members/*  (X-Member-Session)
  → lib/members/store.ts
       ├─ local: data/members/users.json (dev)
       └─ prod:  Vercel Blob members/members-users.json
```

Auth mirrors the admin pattern (scrypt passwords, HMAC session) so Members can later migrate to Supabase Auth without redesigning routes.

### Membership tiers

`guest` · `free` · `premium` · `founder` · `administrator`

### Roles

`member` · `moderator` · `editor` · `administrator`

## Storage & scale target

v1 uses a single JSON document (acceptable for early traffic). Target scale (20 books / 100k members / thousands of badges) requires the SQL schema in `docs/Members_v2.md` / `supabase/members-schema.sql`.

## Env vars

| Variable | Purpose |
|----------|---------|
| `MEMBERS_SESSION_SECRET` | HMAC secret (falls back to `ADMIN_SESSION_SECRET`) |
| `BLOB_READ_WRITE_TOKEN` | Production members store |
| `STRIPE_*` | Prepared — see `lib/payments/stripe-config.ts` |

## Dev seed

On first local read when `NODE_ENV !== "production"`, if username `admin` is missing, seed:

- Username: `admin`
- Password: `haunted7394`
- Tier/role: administrator

**Never seeded in production.**

## Admin

`/admin` → **Members** tab lists registered platform users (requires `view_analytics`).

## Out of scope for v1

- Live Stripe checkout / Customer Portal
- QR scan unlock API
- UGC moderation queues
- Password reset / email verification
- Server-side route middleware for pages (client gate only)
