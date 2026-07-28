# Haunted Sweden — Phase 2 Architecture Blueprint

**Status:** Members v1 foundation implemented (2026-07) — see `docs/Members_v1.md`  
**Date:** 2026-07  
**Scope:** Blueprint for Community, Members, UGC, and Premium — **v1 Members shell is live**; interactive UGC / Stripe checkout remain future

This document prepares expansion so Phase 2 can be added **without restructuring** the current site, Book Archive, or investigation content.

---

## 1. Roadmap context

### Current phase (2026) — live / shipping

| Area | Status | Notes |
|------|--------|--------|
| Public website | ✅ | Map, places, Spökjakt, submit |
| Book Archive | ✅ | Secret `/archive/[archiveId]`, noindex |
| Investigation pages (in archive) | ✅ | Data-driven JSON investigations |
| Archive newsletter | ✅ | Supabase `newsletter_subscribers` |
| Community landing | ✅ | Public `/community` (conversion only) |
| Community members signup | ✅ | Supabase `community_members` (email list) |

### Next phase (future) — this blueprint

- Authenticated **Members** platform  
- Interactive member map  
- User-generated content (moderated)  
- Premium memberships  
- Roles, profiles, notifications  

**Rule:** Nothing in Phase 2 may depend on “Book 1 only” or a fixed investigation count. Books, archives, and investigations remain **content catalogs** that grow via data.

---

## 2. Routing strategy (reserve only)

### Principles

1. **Public marketing** stays under `/community` (already exists).  
2. **Authenticated app** lives under `/members/*` (not built yet).  
3. **Admin tools** for members/UGC live under `/admin/*` or existing admin tabs (extend, don’t fork).  
4. **Book Archive** stays at `/archive/[archiveId]` — never merge into `/members`.  
5. No predictable book URLs (`/book1`). Archives keep random IDs.

### Reserved public routes

| Route | Future role | Implement now? |
|-------|-------------|----------------|
| `/community` | Public landing / conversion | ✅ Already built (landing + email) |
| `/community/about` | Optional philosophy deep-dive | ❌ Optional later |
| `/community/guidelines` | Community rules | ❌ Later |

### Reserved authenticated routes (`/members`)

| Route | Future role |
|-------|-------------|
| `/members` | Redirect to dashboard or login gate |
| `/members/login` | Auth entry (magic link / OAuth) |
| `/members/dashboard` | Home for signed-in members |
| `/members/map` | Interactive member map |
| `/members/investigations` | Browse investigations (catalog) |
| `/members/investigations/[id]` | Investigation detail (member view) |
| `/members/articles` | Research / editorial articles list |
| `/members/articles/[slug]` | Article detail |
| `/members/forum` | Discussion hub (or link to topics) |
| `/members/forum/[topicId]` | Topic thread |
| `/members/stories` | Browse approved member stories |
| `/members/stories/new` | Submit story (moderation queue) |
| `/members/stories/[id]` | Story detail |
| `/members/profile` | Public/self profile |
| `/members/profile/[username]` | Other member profile (optional) |
| `/members/settings` | Account, notifications, privacy |
| `/members/bookmarks` | Saved locations / articles |
| `/members/downloads` | Premium / member digital assets |

### Reserved admin routes

Prefer extending the existing `/admin` app with tabs/modules rather than a separate admin host.

| Route / module | Future role |
|----------------|-------------|
| `/admin` → tab **Community** | ✅ Exists (email list) — later expand |
| `/admin/members` or tab **Members** | Approve/ban, tiers, roles |
| `/admin/stories` or tab **Stories** | Moderate UGC stories + images |
| `/admin/community` | Stats, reports, guidelines |
| `/admin` → **Newsletter** | ✅ Exists (archive subscribers) |
| Future: **Reported content** | Moderation queue |

### Routing conventions (when implementing)

```
app/
  community/                 # Public conversion (exists)
  members/
    (auth)/                  # Route group for login, etc.
    (app)/                   # Authenticated shell + layout
      dashboard/page.tsx
      map/page.tsx
      ...
  archive/[archiveId]/      # Book QR archives (exists, stays separate)
  admin/                     # Extend AdminApp tabs (exists)
```

**Middleware (future):** Protect `/members/*` except login; keep `/archive/*` URL-secret + noindex; keep `/admin/*` geo + session as today.

---

## 3. Recommended folder structure (future)

Do **not** create these folders yet unless needed for docs. Target layout:

```
haunted-sweden/
  app/
    community/                 # Public landing (exists)
    members/                   # Phase 2 authenticated app
    archive/                   # Book archives (exists)
    admin/                     # CMS + moderation (exists, extend)
    api/
      community/               # Public join (exists)
      members/                 # Future member APIs
      archive/                 # Archive newsletter + community (exists)
      admin/                   # Extend for stories/members

  components/
    community/                 # Landing UI (exists)
    members/                   # Future: dashboard, map, forum, stories
    book-archive/              # Exists — keep independent
    admin/                     # Extend panels

  content/
    community/landing.json     # Exists
    books/                     # Book archives (exists)
    articles/                  # Future MDX/JSON research articles
    forum/                     # Optional seed categories

  lib/
    community/                 # Landing + join helpers (exists)
    members/                   # Future: auth helpers, permissions, feed
    book-archive/              # Exists
    supabase/                  # Server client (exists)
    types/
      community-landing.ts     # Exists
      members.ts               # Future shared types
      ugc.ts                   # Future stories/comments

  docs/
    ARCHITECTURE.md            # Current site
    PHASE_2_MEMBERS_PLATFORM.md  # This blueprint

  supabase/
    schema.sql                 # Current tables
    migrations/                # Future numbered migrations
```

### Modularity rules

1. **Book Archive** never imports Members UI.  
2. **Members** may *read* public place/investigation catalogs; it must not own them.  
3. **UGC** is a separate domain (stories, comments) with moderation status.  
4. Feature flags / `membership.enabled` in content JSON gate premium UI later.

---

## 4. Database design (documentation only)

### Current tables (already in `supabase/schema.sql`)

| Table | Purpose |
|-------|---------|
| `newsletter_subscribers` | Book Archive email list |
| `archive_community_responses` | Per-investigation visit + private stories |
| `community_members` | `/community` landing email list + `membership_tier` stub |

### Planned entities (do not create yet)

#### Identity & access

| Entity | Purpose | Key fields (conceptual) |
|--------|---------|-------------------------|
| `users` | Auth identity (often = Supabase `auth.users`) | `id` (uuid), `email`, `created_at` |
| `profiles` | Public member profile | `user_id`, `display_name`, `username`, `bio`, `avatar_url`, `locale` |
| `memberships` | Paid/free tier assignment | `user_id`, `tier`, `status`, `started_at`, `ends_at` |
| `roles` | RBAC assignments | `user_id`, `role` (enum), `granted_at`, `granted_by` |

**Relationship:** `auth.users` 1—1 `profiles`; 1—many `memberships` / `roles`.

#### Content catalogs (site-owned, not UGC)

These may stay **JSON/files** long-term *or* move to DB when editing needs multi-user CMS:

| Entity | Source today | Future |
|--------|--------------|--------|
| `books` | `content/books/*.json` | Optional DB mirror for CMS |
| `investigations` | Nested in book JSON | Optional normalized table |
| `archive_pages` | `/archive/[id]` | Keep file-based IDs |
| `research_articles` | — | New `content/articles` or table |
| `places` | `data/haunted-places.json` | Remains canonical for map |

#### UGC (moderated)

| Entity | Purpose | Relationships |
|--------|---------|---------------|
| `stories` | Member narratives | → `users`, optional → `places` / `investigations` |
| `story_images` | Photo attachments | → `stories` |
| `story_locations` | GPS / place links | → `stories`, optional → `places` |
| `comments` | Polymorphic comments | → `users`, `target_type` + `target_id` |
| `likes` | Reactions | → `users`, target polymorphic |
| `notifications` | In-app alerts | → `users` |
| `saved_locations` / `favorite_places` | Bookmarks | → `users`, → `places` |
| `community_events` | Live / IRL / streams | Standalone + optional premium flag |
| `content_reports` | Moderation flags | → reporter, target, status |

#### Suggested story lifecycle

```
draft → pending → approved | rejected → archived
```

Never show `pending`/`rejected` on public or member feeds without staff role.

### Conceptual ER (simplified)

```
auth.users
   ├── profiles
   ├── memberships
   ├── roles
   ├── stories ──┬── story_images
   │             └── story_locations ──► places (optional)
   ├── comments
   ├── likes
   ├── notifications
   ├── saved_locations ──► places
   └── content_reports

community_members (email list)  ──migrate/link──►  users (optional later)
newsletter_subscribers          ──migrate/link──►  users (optional later)

books / investigations / archive_pages   (content layer; file or DB)
places                                   (canonical JSON catalog)
```

### Migration strategy (when Phase 2 starts)

1. Keep existing email tables; **link** to `user_id` when someone creates an account.  
2. Prefer Supabase Auth UUID as primary key everywhere.  
3. Add RLS policies per table; staff use service role only in admin APIs.  
4. Numbered SQL migrations under `supabase/migrations/`.

---

## 5. User roles (document only)

| Role | Access intent |
|------|----------------|
| **Guest** | Public site, map, places, `/community` landing |
| **Newsletter Subscriber** | Email list only (archive or community); not authenticated |
| **Community Member** | Authenticated free member: dashboard, submit UGC (queued), basic discussions |
| **Premium Member** | All member features + premium articles, downloads, early access |
| **Moderator** | Approve/reject stories, hide comments, handle reports |
| **Editor** | Publish articles/investigations content (CMS) |
| **Administrator** | Full admin: users, roles, settings, newsletter, all moderation |

### Permission model (future)

- Store coarse **role** + optional fine-grained permissions (similar to current admin `permissions` map).  
- Server checks on every `/api/members/*` and `/api/admin/*` route.  
- Client UI hides controls; **never** trusts client alone.

---

## 6. Members area — future modules

| Module | Description | Notes |
|--------|-------------|--------|
| Dashboard | Latest investigations, announcements, continue reading | Feed from catalogs + notifications |
| Interactive map | Member-enhanced Sweden map | See §8 |
| Member stories | Browse approved UGC | Moderation required |
| Photo galleries | Per-story / per-investigation media | Storage: Vercel Blob or Supabase Storage |
| Research articles | Editorial long-form | Premium gate optional |
| Digital downloads | PDFs, audio | Premium + signed URLs |
| Exclusive book material | Links into archive IDs the member unlocked | Do not expose all archives |
| Upcoming investigations | Editorial roadmap | Data-driven |
| Voting | Vote for future locations | Aggregate; rate-limit |
| Bookmarks / saved locations | Personal lists | |
| Member profile | Display name, bio, avatar | |
| Achievements | Optional gamification | Keep optional; don’t block MVP |

---

## 7. Community capabilities (UGC)

Future members should be able to:

| Action | Moderation |
|--------|------------|
| Submit haunted locations | Queue → places draft / admin inbox |
| Submit stories | Queue → approve |
| Upload photographs | Attach to story/place; scan size/type |
| Upload audio | Same |
| Comment | Soft-delete / report |
| Like | Abuse limits |
| Bookmark | Private |
| Follow investigations | Notifications |
| Discuss investigations | Forum or threaded comments |

**All public-facing UGC is moderated.** Private submissions (like archive “have you visited?”) may stay admin-only until approved for publication.

---

## 8. Interactive map architecture

### Layers (logical)

1. **Official places** — from `haunted-places.json` (already on `/map`)  
2. **Official investigations** — linked from book archives / Spökjakt  
3. **Community reports** — approved UGC pins  
4. **Personal** — visited / want to visit (member-only)

### Feature support

| Feature | Approach |
|---------|----------|
| GPS | Lat/lng on place + story_locations |
| Categories | Existing place categories + UGC tags |
| Search / filters | Extend current map filter model |
| Visited / want to visit | `saved_locations` with `list_type` enum |
| Community reports | Separate layer toggle |
| Official investigations | Marker badge / filter |

### Implementation note

Prefer **one map engine** (Leaflet today). `/members/map` can wrap shared map components with member overlays rather than a second map library.

---

## 9. Premium architecture (no payments yet)

### Already prepared

- `community_members.membership_tier` (`free` | `premium` | `founder`)  
- `content/community/landing.json` → `membership.featuresPlanned`

### Future

| Concern | Approach |
|---------|----------|
| Entitlement | `memberships` table is source of truth after auth |
| Gating | Server-side check before premium article/download |
| Payments | Stripe/Lemon Squeezy later — never hardcode into content |
| Features | Premium investigations, members-only articles, early books, PDFs, exclusive media, live streams, discounts |

**Do not build checkout, webhooks, or paywalls now.**

---

## 10. Authentication (document only — do not implement)

### Recommended stack

- **Supabase Auth**  
- Email magic link (primary, low friction)  
- Optional: Google, Apple  
- Password + reset as secondary  
- Session via cookies / SSR helpers (`@supabase/ssr` when added)

### Flows (future)

1. Guest → `/community` → join email list  
2. Convert → create account (link email to `auth.users`)  
3. Login → `/members/dashboard`  
4. Role + membership loaded once per session  

### Integration with today

| Today | Later |
|-------|--------|
| Admin custom session (`X-Admin-Session`) | Keep separate from member auth **or** migrate admin to Supabase roles carefully |
| `community_members` / newsletter emails | Invite to claim account |

---

## 11. Admin expansion

| Module | Purpose |
|--------|---------|
| Approve stories | Queue UI + status transitions |
| Manage members | Search, tier, ban, role |
| Newsletter | Already: archive + community lists |
| Community statistics | Signups, UGC volume, map activity |
| Reported content | Triage reports |
| Content moderation | Comments, images, spam |

Reuse patterns from: `AdminNewsletterPanel`, `AdminCommunityMembersPanel`, submissions inbox.

---

## 12. Recommended component structure (future)

```
components/members/
  MembersShell.tsx          # Nav + auth gate layout
  MembersDashboard.tsx
  MembersMapView.tsx        # Wraps shared map + overlays
  StoryCard.tsx
  StorySubmitForm.tsx
  ArticleCard.tsx
  ForumTopicList.tsx
  ProfileHeader.tsx
  MembershipBadge.tsx

components/shared/
  MapViewport.tsx           # Already exists under map/ — extract carefully if needed
  MediaGallery.tsx
  ModerationStatusBadge.tsx
```

**Shared design language:** dark, atmospheric, premium — align with Book Archive and `/community`, not a separate “SaaS dashboard” aesthetic.

---

## 13. Expansion strategy

### Phase 2a — Foundation

1. Supabase Auth + `profiles` + `roles`  
2. `/members` shell + dashboard (read-only feeds)  
3. Link email lists → user accounts  

### Phase 2b — UGC MVP

1. `stories` + moderation admin  
2. Submit + browse approved stories  
3. Soft comments  

### Phase 2c — Map + personalization

1. Visited / want to visit  
2. Community report layer  
3. Bookmarks  

### Phase 2d — Premium

1. `memberships` + entitlement checks  
2. Gated articles/downloads  
3. Payments provider  

### Phase 2e — Social depth

1. Forum  
2. Notifications  
3. Voting / events  

Each phase ships behind feature flags if needed (`MEMBERSHIP_ENABLED`, `UGC_ENABLED`).

---

## 14. Potential risks

| Risk | Mitigation |
|------|------------|
| Mixing Book Archive secrets with public members | Keep archives noindex + separate auth; never list archive IDs |
| Dual auth (admin session vs Supabase) | Document boundary; migrate admin later if needed |
| UGC legal/safety | Mandatory moderation; clear guidelines; report flow |
| Map performance with UGC pins | Clustering, pagination, layer toggles |
| Premature payment coupling | Entitlement table first; payments later |
| Content stuck in Book-1-shaped code | Always iterate catalogs (`investigations[]`, books JSON) |
| RLS misconfiguration | Default deny; service role only on trusted API routes |
| Scope creep (Discord, achievements, live) | Keep in backlog; don’t block MVP |

---

## 15. Explicit non-goals (this task)

- ❌ No `/members` pages or layouts  
- ❌ No authentication implementation  
- ❌ No new production tables beyond what already exists  
- ❌ No payment integration  
- ❌ No forum/story UI  

---

## 16. Blueprint checklist for Phase 2 kickoff

When ready to build:

1. Re-read this document + `docs/ARCHITECTURE.md`  
2. Add `supabase/migrations/00x_members_foundation.sql`  
3. Create `app/members/(app)/layout.tsx` with auth gate  
4. Extend admin with Stories / Members modules  
5. Keep `/archive/*` and `/community` behavior unchanged  

---

## Related docs

- [ARCHITECTURE.md](./ARCHITECTURE.md) — current production site  
- [VISION.md](./VISION.md) — product vision  
- [BRAND.md](./BRAND.md) — editorial voice  
- `content/community/README.md` — public landing content  
- `content/books/README.md` — book archive content  
- `supabase/README.md` — current Supabase setup  
