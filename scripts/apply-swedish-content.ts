import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { getSwedishContentMap } from "../lib/place-swedish-content";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const placesPath = join(root, "data", "haunted-places.json");
const swedish = getSwedishContentMap();

type PlaceRow = {
  slug: string;
  shortDescriptionSv?: string;
  historySv?: string;
  legendSv?: string;
  hauntedSwedenAppSummarySv?: string;
  images?: { caption?: string; captionSv?: string }[];
  videos?: { title?: string; titleSv?: string; caption?: string; captionSv?: string }[];
};

const data = JSON.parse(readFileSync(placesPath, "utf8")) as {
  places: PlaceRow[];
};

let updated = 0;
for (const place of data.places) {
  const sv = swedish[place.slug];
  if (!sv) {
    console.warn(`No static SV for slug: ${place.slug}`);
    continue;
  }
  place.shortDescriptionSv = sv.shortDescription;
  place.historySv = sv.history;
  place.legendSv = sv.legend;
  if (sv.summary) {
    place.hauntedSwedenAppSummarySv = sv.summary;
  }
  for (const img of place.images ?? []) {
    if (img.caption?.trim() && !img.captionSv?.trim()) {
      img.captionSv = img.caption;
    }
  }
  for (const vid of place.videos ?? []) {
    if (vid.title?.trim() && !vid.titleSv?.trim()) {
      vid.titleSv = vid.title;
    }
    if (vid.caption?.trim() && !vid.captionSv?.trim()) {
      vid.captionSv = vid.caption;
    }
  }
  updated++;
}

writeFileSync(placesPath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
console.log(`Updated ${updated} places in haunted-places.json`);
