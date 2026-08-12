import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import {
  emptyEmailSignupsStore,
  type EmailSignupsStore,
} from "@/lib/email-signups/types";

export const EMAIL_SIGNUPS_BLOB_PATH = "email-signups/waitlist.json";
const LOCAL_PATH = path.join(process.cwd(), "data", "email-signups", "waitlist.json");

export function usesEmailSignupsBlob(): boolean {
  return (
    process.env.NODE_ENV === "production" &&
    Boolean(process.env.BLOB_READ_WRITE_TOKEN?.trim())
  );
}

export function isJsonEmailStorageReady(): boolean {
  if (process.env.NODE_ENV !== "production") return true;
  return usesEmailSignupsBlob();
}

async function readLocalJson(): Promise<EmailSignupsStore> {
  try {
    const raw = await readFile(LOCAL_PATH, "utf8");
    return JSON.parse(raw) as EmailSignupsStore;
  } catch (err) {
    const code = (err as NodeJS.ErrnoException).code;
    if (code === "ENOENT") return emptyEmailSignupsStore();
    throw err;
  }
}

async function writeLocalJson(data: EmailSignupsStore): Promise<void> {
  await mkdir(path.dirname(LOCAL_PATH), { recursive: true });
  await writeFile(LOCAL_PATH, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

async function readBlobJson(): Promise<EmailSignupsStore> {
  const { BlobNotFoundError, get } = await import("@vercel/blob");
  try {
    const result = await get(EMAIL_SIGNUPS_BLOB_PATH, {
      access: "private",
      useCache: false,
    });
    if (!result || result.statusCode !== 200 || !result.stream) {
      return emptyEmailSignupsStore();
    }
    const text = await new Response(result.stream).text();
    if (!text.trim()) return emptyEmailSignupsStore();
    return JSON.parse(text) as EmailSignupsStore;
  } catch (err) {
    if (err instanceof BlobNotFoundError) return emptyEmailSignupsStore();
    throw err;
  }
}

async function writeBlobJson(data: EmailSignupsStore): Promise<void> {
  const { put } = await import("@vercel/blob");
  await put(EMAIL_SIGNUPS_BLOB_PATH, `${JSON.stringify(data, null, 2)}\n`, {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
}

export async function readEmailSignupsStore(): Promise<EmailSignupsStore> {
  if (usesEmailSignupsBlob()) return readBlobJson();
  return readLocalJson();
}

export async function writeEmailSignupsStore(data: EmailSignupsStore): Promise<void> {
  if (process.env.NODE_ENV === "production" && !usesEmailSignupsBlob()) {
    throw new Error(
      "BLOB_READ_WRITE_TOKEN is required in production for email signup storage."
    );
  }
  if (usesEmailSignupsBlob()) {
    await writeBlobJson(data);
    return;
  }
  await writeLocalJson(data);
}

export async function mutateEmailSignupsStore(
  mutator: (store: EmailSignupsStore) => void
): Promise<EmailSignupsStore> {
  const store = await readEmailSignupsStore();
  mutator(store);
  await writeEmailSignupsStore(store);
  return store;
}
