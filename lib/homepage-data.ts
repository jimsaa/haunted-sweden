/** Static homepage content — places come from /data/haunted-places.json */

export { CATEGORY_FILTER_IDS as CATEGORY_IDS } from "@/lib/categories";
export type { CategoryFilterId as CategoryId } from "@/lib/categories";

export const LATEST_REPORTS = [
  {
    title: "Footsteps in the east wing",
    place: "Toftaholm Herrgård",
    excerpt:
      "Slow footsteps on the upper floor at 2 a.m. The building was closed with no staff on site.",
    author: "Elin M.",
    date: "March 2026",
  },
  {
    title: "Lantern glow without a keeper",
    place: "Fjäderholmarna",
    excerpt:
      "A lantern moved along the ruined lighthouse path. The islet was empty when we landed.",
    author: "Jonas K.",
    date: "February 2026",
  },
  {
    title: "Organ notes at midnight",
    place: "Riddarholmen Church",
    excerpt:
      "A single low note repeated from the organ loft — verified empty by security.",
    author: "Sara L.",
    date: "January 2026",
  },
] as const;
