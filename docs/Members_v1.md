# Haunted Sweden — Members Platform v1.0 / v1.1

**Status:** Implemented (foundation + UX enhancement)  
**Date:** 2026-07  
**Scope:** Authenticated investigation platform — architecture first, then premium archive UX

---

## Mission

Members is the permanent digital home of Haunted Sweden: a **private Investigation Platform**, not social media. Nordic noir / archive aesthetic. Scalable toward books, QR hunts, badges, shop, and research.

Every page should feel like entering **Sofia & David's private investigation archive** — exclusive, historical, documentary, Scandinavian.

---

## What ships in v1

| Capability | Status |
|------------|--------|
| Register / login / logout | ✅ |
| Session tokens (HMAC, 14-day TTL) | ✅ |
| Profile view + edit | ✅ |
| Investigation dashboard | ✅ |
| Investigation profile (case file) | ✅ |
| Book archive catalog + cover cards | ✅ |
| Badge catalog (visual / categorized) | ✅ |
| Research Network / Archive Store | ✅ placeholders |
| Membership tiers (immersive labels) | ✅ |
| Admin Members panel (read-only) | ✅ |
| Stripe architecture stub | ✅ (no live checkout) |
| QR architecture only | ✅ |
| Dev-only admin seed | ✅ `admin` / `haunted7394` |
| Production auto-seed | ❌ Never |

---

## v1.1 — UI / UX enhancement (what changed & why)

v1.0 shipped a stable architecture that still read like an admin panel. v1.1 refines presentation without restructuring routes or auth.

### Naming (immersive universe)

| Internal key | Display label | Why |
|--------------|---------------|-----|
| `guest` | Archive Visitor | Soft entry, not “Guest” SaaS |
| `free` | Research Member | Archive membership language |
| `premium` | Field Investigator | Documentary / field work |
| `founder` | Founder | Kept — already strong |
| `administrator` | Archive Keeper | Custodian of the archive |

- **Community → Research Network** — investigation collaboration, not social media  
- **Shop → Archive Store** — expedition goods tied to the archive  
- **Investigation Profile nav → Case File** — personal dossier framing  

Internal tier keys are unchanged so billing / DB migrations stay stable (`lib/members/tiers.ts`).

### Dashboard

Became a **command center**: who am I, how far have I come, what is happening, what next.

- Hero with membership, member-since, research standing  
- Metric strip: Books / Investigations / Badges / Field discoveries  
- Split panels for archive updates + next steps  
- Archive seal visual accent  

### Book Archives

Became a **digital library**:

- Premium book cards with cover (or typographic fallback)  
- Release states: LIVE / COMING SOON / LOCKED / PLANNED  
- Cover-ready catalog fields (`coverImage`, `coverTone`, `releaseState`) so future books fit the same layout  

### Investigation Profile

Became the **personal case file** — heart of the platform:

- Case header + research statistics  
- Timeline seed  
- Sections for books, investigations, locations, badges, QR, Research Network, future progress  

### Badges

Collectible **badge case**:

- Categories: Book / Location / Founder / Research / QR / Network  
- Medallion icons, rarity, locked/unlocked states  

### Visual system

- Stronger typography hierarchy (Cinzel display)  
- More whitespace, section dividers, quiet panels  
- Subtle fade-up + hover transitions only  
- Responsive: stacked nav, library cards, metric grids  

### Future improvements (post v1.1)

- Official print book covers as primary card art  
- Live activity feed (server-backed)  
- Filled case-file modules as QR / books unlock  
- Stripe-powered Archive Store checkout  
- Server-side auth gate for `/members/*` pages  

---

## Routes

| Route | Role |
|-------|------|
| `/members` | Redirect → dashboard |
| `/members/login` | Auth |
| `/members/register` | Registration |
| `/members/dashboard` | Command center |
| `/members/profile` | Member identity |
| `/members/investigation` | Case file |
| `/members/archives` | Digital library |
| `/members/badges` | Badge case |
| `/members/community` | Research Network |
| `/members/shop` | Archive Store |
| `/members/settings` | Account + billing/newsletter stubs |

Public marketing stays at `/community`. Book Archive stays at `/archive/[id]`.

---

## Architecture

```
Browser (MembersShell)
  → sessionStorage token + localStorage user
  → /api/members/*  (X-Member-Session)
  → lib/members/store.ts
       ├─ local: data/members/users.json (dev)
       └─ prod:  Vercel Blob members/members-users.json
```

### Membership tiers (keys)

`guest` · `free` · `premium` · `founder` · `administrator`

### Roles

`member` · `moderator` · `editor` · `administrator`

---

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
- Tier/role: administrator (display: **Archive Keeper**)

**Never seeded in production.** Register via `/members/register` on the live site.

## Admin

`/admin` → **Members** tab lists registered platform users (requires `view_analytics`).
