import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const placesPath = join(root, "data", "haunted-places.json");

type PlaceRow = {
  verificationLevel?: string;
  verified?: boolean;
  verifiedByTeam?: boolean;
  visitedByTeam?: boolean;
};

const data = JSON.parse(readFileSync(placesPath, "utf8")) as {
  places: PlaceRow[];
};

for (const place of data.places) {
  place.verifiedByTeam = false;
  place.visitedByTeam = false;
  if (place.verificationLevel === "haunted-sweden-verified") {
    place.verificationLevel = "community-verified";
  }
  if (place.verified === true) {
    place.verified = false;
  }
}

writeFileSync(placesPath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
console.log(`Reset team flags on ${data.places.length} places.`);
