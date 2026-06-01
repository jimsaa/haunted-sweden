import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const placesPath = join(root, "data", "haunted-places.json");
const svPath = join(root, "data", "place-safety-sv.json");

const sv = JSON.parse(readFileSync(svPath, "utf8")) as Record<string, string>;
const data = JSON.parse(readFileSync(placesPath, "utf8")) as {
  places: { slug: string; safetyNote?: string; safetyNoteSv?: string }[];
};

let applied = 0;
for (const place of data.places) {
  const text = sv[place.slug];
  if (!text) {
    console.warn(`No Swedish safety for slug: ${place.slug}`);
    continue;
  }
  place.safetyNoteSv = text;
  applied++;
}

writeFileSync(placesPath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
console.log(`Applied safetyNoteSv to ${applied} places.`);
