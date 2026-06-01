import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

export type IndexNowState = {
  initialized: boolean;
  /** slug -> stable content fingerprint */
  placeFingerprints: Record<string, string>;
  /** Known investigation archive slugs */
  investigationSlugs: string[];
};

const STATE_DIR = path.join(process.cwd(), "data", "indexnow");
const STATE_PATH = path.join(STATE_DIR, "state.json");

const EMPTY_STATE: IndexNowState = {
  initialized: false,
  placeFingerprints: {},
  investigationSlugs: [],
};

export async function readIndexNowState(): Promise<IndexNowState> {
  try {
    const raw = await readFile(STATE_PATH, "utf8");
    const parsed = JSON.parse(raw) as Partial<IndexNowState>;
    return {
      initialized: Boolean(parsed.initialized),
      placeFingerprints:
        parsed.placeFingerprints && typeof parsed.placeFingerprints === "object"
          ? parsed.placeFingerprints
          : {},
      investigationSlugs: Array.isArray(parsed.investigationSlugs)
        ? parsed.investigationSlugs
        : [],
    };
  } catch {
    return { ...EMPTY_STATE };
  }
}

export async function writeIndexNowState(state: IndexNowState): Promise<void> {
  await mkdir(STATE_DIR, { recursive: true });
  await writeFile(STATE_PATH, `${JSON.stringify(state, null, 2)}\n`, "utf8");
}
