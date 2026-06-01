import { readFile } from "fs/promises";
import path from "path";
import { SITE_URL } from "@/lib/seo/constants";

const KEY_FILE = path.join(process.cwd(), "data", "indexnow", "key.txt");

/** IndexNow API endpoints (Bing + shared IndexNow network). */
export const INDEXNOW_ENDPOINTS = [
  "https://api.indexnow.org/indexnow",
  "https://www.bing.com/indexnow",
] as const;

export function getIndexNowHost(): string {
  return new URL(SITE_URL).host;
}

export async function getIndexNowKey(): Promise<string | null> {
  const fromEnv = process.env.INDEXNOW_KEY?.trim();
  if (fromEnv) return fromEnv;

  try {
    const raw = await readFile(KEY_FILE, "utf8");
    const key = raw.trim();
    return key.length >= 8 ? key : null;
  } catch {
    return null;
  }
}

export async function getIndexNowKeyLocation(key: string): Promise<string> {
  return `${SITE_URL}/${key}.txt`;
}

export async function isIndexNowEnabled(): Promise<boolean> {
  const key = await getIndexNowKey();
  return Boolean(key && process.env.INDEXNOW_DISABLED !== "true");
}
