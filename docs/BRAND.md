# Haunted Sweden — Brand & naming rules

## Product name

The application is always **Haunted Sweden**.

## Never use

- Swedish Hauntings
- Sweden Hauntings
- Haunted Sweden App Project
- Swedish Haunted Locations

## Always use

- **Haunted Sweden** (UI, SEO, articles, investigations, premium content, research notes)

Technical repo/package name `haunted-sweden` is for code only — not user-facing.

## Database field labels (editorial / research)

Use these **English label names** in documentation and admin tools. Store values in JSON as **camelCase** keys:

| Label | JSON field |
|-------|------------|
| Haunted Sweden Score | `hauntedSwedenScore` |
| Suggested Haunted Sweden Tags | `suggestedHauntedSwedenTags` |
| Haunted Sweden App Summary | `hauntedSwedenAppSummary` |
| Why It Fits Haunted Sweden | `whyItFitsHauntedSweden` |

### Field purpose

- **hauntedSwedenScore** — Internal editorial score (e.g. `8.8`, `9.2`). Not shown in MVP UI unless explicitly designed later.
- **suggestedHauntedSwedenTags** — Discovery/filter tags for content planning (snake_case or kebab in array values is fine).
- **hauntedSwedenAppSummary** — Card/listing summary tuned for the app; falls back to `shortDescription` when omitted.
- **whyItFitsHauntedSweden** — Editorial note on why the location belongs on Haunted Sweden (trust, phase-1 region, investigation potential).

Public-facing copy on the map and place pages uses `shortDescription`, `history`, and `legend` — always written for **Haunted Sweden**, not alternate brand names.

## Verification naming

Verification tier slug: `haunted-sweden-verified` (technical ID).  
User-facing label: **Haunted Sweden verified** / **Haunted Sweden-verifierad** (SV).

## Code reference

```ts
import { BRAND_NAME, HAUNTED_SWEDEN_FIELD_LABELS } from "@/lib/brand";
```
