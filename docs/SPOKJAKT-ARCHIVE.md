# Spökjakt Archive

Searchable index of **Swedish** haunted locations investigated in the TV series *Spökjakt* (Joakim & Jonna Lundell, LaxTon Ghost Sweden, Danjal Kanani, Johanna Öholm, and rotating mediums).

## Data

- **JSON:** `data/spokjakt-archive.json`
- **Types:** `lib/types/spokjakt.ts`
- **Loader:** `lib/spokjakt-archive.ts`
- **UI:** `/spokjakt`

## Entry fields

Each archive entry separates:

1. **documentedHistory** — verifiable facts (dates, ownership, archaeology).
2. **witnessReports** — staff/owner/visitor accounts (not proven paranormal).
3. **paranormalClaims** — folklore and TV-presented claims (unverified).

## Priority tiers

| ID | Meaning |
|----|---------|
| `LEGENDARY` | Franchise-defining Swedish locations |
| `HIGH_PRIORITY` | Strong reputation or visitability |
| `DISCOVERY` | Lesser-known but valuable |

## Haunted Sweden integration

### Place fields (`data/haunted-places.json`)

- `featuredInSpokjakt` — boolean
- `spokjaktData` — season, episode, year, summary, investigators, investigationSummary, `playlistLink` (defaults to official Familjen Lundell playlist), videoLinks, streamingLinks
- `spokjaktPriority` — LEGENDARY | HIGH_PRIORITY | DISCOVERY
- `hauntedSwedenInvestigation` — future team verification record (status, dates, media counts)

Starter overrides for 12 Swedish S2/S3 locations: `data/spokjakt-place-overrides.json` (merged at load by place `slug`).

**Official playlist:** `https://www.youtube.com/playlist?list=PLWKhE3zmPwDYAcU4Er1vOX46EviylvcRg` (`lib/spokjakt-constants.ts`)

### UI

- Global page `/spokjakt` — **SPÖKJAKT LOCATIONS** + official playlist CTA
- Badge: **👻 Seen in Spökjakt** (purple glow) — modal with season/episode/summary + playlist link
- Sections on place detail: Seen in Spökjakt, Investigation Sources, Investigation History
- Map filters: Seen in Spökjakt, LaxTon investigated, Haunted Sweden verified, Premium investigation, Overnight stay available

### Archive

- `hauntedSwedenPlaceSlug` — links archive entries to map places
- `featuredIn` — `spokjakt`, `laxton-youtube`, `haunted-sweden-verified`, `haunted-sweden-premium` (future)

## Swedish locations indexed (MVP)

**Season 2 (2020):** Borgvattnets Prästgård, Österbybruks Herrgård, Näsby Slott, Kullaberg, Bäckaskogs Kloster, Frammegården  

**Season 3 (2021):** Målilla Sanatorium, Norrsvedje Gästgiveri, Stora Takstens, Blombacka Herrgård, Verkön, Bogesunds Slott  

**Season 6 (2024):** Österbybruks Herrgård (revisit), Frammegården (revisit), Lundellhuset  

## Sources

- [Spökjakt — Wikipedia (SV)](https://sv.wikipedia.org/wiki/Sp%C3%B6kjakt)
- Press materials (Warner Bros. Discovery / TV4)
- Regional heritage and venue sites where cited in entries

Paranormal activity must **never** be stated as proven fact in Haunted Sweden copy.
