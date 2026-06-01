/**
 * Submit all approved place + investigation URLs to IndexNow (deploy / manual).
 * Run: npm run indexnow:notify-catalog
 */
import { readFile } from "fs/promises";
import path from "path";
import { notifyIndexNowFullCatalog } from "../lib/indexnow/notify";
import type { HauntedPlacesFile } from "../lib/types/place";

async function main() {
  const raw = await readFile(
    path.join(process.cwd(), "data", "haunted-places.json"),
    "utf8"
  );
  const file = JSON.parse(raw) as HauntedPlacesFile;
  await notifyIndexNowFullCatalog(file);
  console.log("IndexNow catalog notification finished.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
