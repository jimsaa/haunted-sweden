#!/usr/bin/env npx tsx
/**
 * Generate a random Book Archive ID.
 * Usage: npm run book-archive:generate-id
 * Output: hs-a73fd9e2 (example)
 */
import { randomBytes } from "crypto";

function generateArchiveId(): string {
  return `hs-${randomBytes(4).toString("hex")}`;
}

const id = generateArchiveId();
console.log(id);
console.log(`\nCreate: content/books/${id}.json`);
console.log(`URL:    https://hauntedsweden.se/archive/${id}`);
