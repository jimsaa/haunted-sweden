/**
 * Validates data/haunted-places.json for production (hauntedsweden.se).
 * Run after adding or editing locations: npm run validate:places
 */
import { readFileSync } from "fs";
import { join } from "path";
import { PLACE_CATEGORIES } from "../lib/categories";
import type { HauntedPlace, HauntedPlacesFile } from "../lib/types/place";

const root = join(__dirname, "..");
const placesPath = join(root, "data", "haunted-places.json");
const safetyPath = join(root, "data", "place-safety-sv.json");

const REQUIRED_FOR_PUBLIC = [
  "id",
  "slug",
  "name",
  "category",
  "city",
  "region",
  "country",
  "latitude",
  "longitude",
  "shortDescription",
  "history",
  "legend",
  "status",
] as const;

function main(): void {
  const raw = JSON.parse(readFileSync(placesPath, "utf8")) as HauntedPlacesFile;
  const safety = JSON.parse(readFileSync(safetyPath, "utf8")) as Record<
    string,
    string
  >;
  const places = raw.places as HauntedPlace[];
  const errors: string[] = [];
  const warnings: string[] = [];

  if (raw.version !== places.length) {
    warnings.push(
      `version (${raw.version}) does not match place count (${places.length}) — consider syncing`
    );
  }

  const slugSet = new Set<string>();
  for (const place of places) {
    const label = place.slug || `id:${place.id}`;

    if (place.status !== "approved") {
      errors.push(`${label}: status must be "approved" for public site (got "${place.status}")`);
    }

    for (const key of REQUIRED_FOR_PUBLIC) {
      const v = place[key as keyof HauntedPlace];
      if (v === undefined || v === null || (typeof v === "string" && !v.trim())) {
        errors.push(`${label}: missing required field "${key}"`);
      }
    }

    if (!PLACE_CATEGORIES.includes(place.category)) {
      errors.push(`${label}: invalid category "${place.category}"`);
    }

    if (place.latitude == null || place.longitude == null) {
      errors.push(`${label}: latitude/longitude required for map`);
    }

    if (slugSet.has(place.slug)) {
      errors.push(`${label}: duplicate slug`);
    }
    slugSet.add(place.slug);

    if (!place.safetyNote?.trim()) {
      warnings.push(`${label}: missing safetyNote (EN)`);
    }
    if (!place.safetyNoteSv?.trim() && !safety[place.slug]?.trim()) {
      warnings.push(`${label}: missing safetyNoteSv`);
    }
    if (!place.shortDescriptionSv?.trim()) {
      warnings.push(`${label}: missing shortDescriptionSv`);
    }
  }

  const mapCount = places.filter(
    (p) =>
      p.status === "approved" &&
      p.latitude != null &&
      p.longitude != null
  ).length;

  console.log(`Production data: ${placesPath}`);
  console.log(`Places: ${places.length} | Map-visible (approved + coords): ${mapCount}`);

  if (warnings.length) {
    console.log("\nWarnings:");
    warnings.forEach((w) => console.log(`  ⚠ ${w}`));
  }

  if (errors.length) {
    console.error("\nErrors (block production):");
    errors.forEach((e) => console.error(`  ✗ ${e}`));
    process.exit(1);
  }

  console.log("\n✓ All places are production-ready for map, search, filters, and static build.");
}

main();
