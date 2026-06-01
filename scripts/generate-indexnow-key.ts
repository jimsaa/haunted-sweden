/**
 * Generate an IndexNow key and store it for Haunted Sweden.
 * Run: npm run indexnow:generate-key
 */
import { mkdir, writeFile } from "fs/promises";
import { randomBytes } from "crypto";
import path from "path";

const ROOT = process.cwd();
const KEY_DIR = path.join(ROOT, "data", "indexnow");
const KEY_PATH = path.join(KEY_DIR, "key.txt");
const PUBLIC_DIR = path.join(ROOT, "public");
const ENV_EXAMPLE = path.join(ROOT, "data", "indexnow", "env.example.txt");

async function main() {
  const key = randomBytes(16).toString("hex");
  await mkdir(KEY_DIR, { recursive: true });
  await writeFile(KEY_PATH, `${key}\n`, "utf8");
  await mkdir(PUBLIC_DIR, { recursive: true });
  await writeFile(path.join(PUBLIC_DIR, `${key}.txt`), `${key}\n`, "utf8");

  const envLines = [
    "# Add to .env.local and Vercel production environment:",
    `INDEXNOW_KEY=${key}`,
    "",
    `# Key file (also served via rewrite): https://hauntedsweden.se/${key}.txt`,
  ];
  await writeFile(ENV_EXAMPLE, envLines.join("\n"), "utf8");

  console.log("IndexNow key generated.");
  console.log(`  data/indexnow/key.txt`);
  console.log(`  public/${key}.txt`);
  console.log(`  data/indexnow/env.example.txt`);
  console.log("");
  console.log(`Set INDEXNOW_KEY=${key} in Vercel.`);
  console.log(`Verify: https://hauntedsweden.se/${key}.txt`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
