import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

export const ADMIN_USERS_BLOB_PATH = "admin/admin-users.json";

const LOCAL_PATH = path.join(process.cwd(), "data", "admin-users.json");

export type AdminUsersStorageBackend = "BLOB" | "JSON";

/** Blob only in production — local `next dev` always uses data/admin-users.json. */
export function usesAdminUsersBlob(): boolean {
  return (
    process.env.NODE_ENV === "production" &&
    Boolean(process.env.BLOB_READ_WRITE_TOKEN?.trim())
  );
}

export function getAdminUsersStorageBackend(): AdminUsersStorageBackend {
  return usesAdminUsersBlob() ? "BLOB" : "JSON";
}

function logStorage(message: string): void {
  console.log(`[admin-users-storage] ${message}`);
}

function assertWritableStorageConfigured(): void {
  if (process.env.NODE_ENV === "production" && !usesAdminUsersBlob()) {
    throw new Error(
      "BLOB_READ_WRITE_TOKEN is required in production for admin user settings."
    );
  }
}

async function readLocalJson<T>(filePath: string, empty: T): Promise<T> {
  try {
    const raw = await readFile(filePath, "utf8");
    return JSON.parse(raw) as T;
  } catch (err) {
    const code = (err as NodeJS.ErrnoException).code;
    if (code === "ENOENT") return empty;
    throw err;
  }
}

async function writeLocalJson(filePath: string, data: unknown): Promise<void> {
  await mkdir(path.dirname(filePath), { recursive: true });
  const json = `${JSON.stringify(data, null, 2)}\n`;
  await writeFile(filePath, json, "utf8");
}

async function readBlobText(): Promise<string | null> {
  const { BlobNotFoundError, get, list } = await import("@vercel/blob");

  try {
    const result = await get(ADMIN_USERS_BLOB_PATH, {
      access: "private",
      useCache: false,
    });
    if (!result || result.statusCode !== 200 || !result.stream) return null;
    const text = await new Response(result.stream).text();
    return text.trim() ? text : null;
  } catch (err) {
    if (!(err instanceof BlobNotFoundError)) throw err;
  }

  const { blobs } = await list({ prefix: "admin/", limit: 20 });
  const match = blobs.find((b) => b.pathname === ADMIN_USERS_BLOB_PATH);
  if (!match?.url) return null;

  const res = await fetch(match.url);
  if (!res.ok) return null;
  const text = await res.text();
  return text.trim() ? text : null;
}

async function readBlobJson<T>(empty: T): Promise<T> {
  const text = await readBlobText();
  if (!text) return empty;
  return JSON.parse(text) as T;
}

async function writeBlobJson(data: unknown): Promise<void> {
  const { put } = await import("@vercel/blob");
  const json = `${JSON.stringify(data, null, 2)}\n`;
  const result = await put(ADMIN_USERS_BLOB_PATH, json, {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
  logStorage(`Wrote Blob pathname=${result.pathname} size=${json.length}`);
}

/** Writable store: Vercel Blob in production when configured, else local JSON. */
export async function readAdminUsersFromStore<T>(empty: T): Promise<T> {
  const backend = getAdminUsersStorageBackend();
  logStorage(`READ backend=${backend} target=${backend === "BLOB" ? ADMIN_USERS_BLOB_PATH : "data/admin-users.json"}`);

  if (usesAdminUsersBlob()) {
    return readBlobJson(empty);
  }

  if (process.env.NODE_ENV === "production") {
    console.warn(
      "[admin-users-storage] WARNING: Reading local file in production without BLOB token"
    );
  }

  return readLocalJson(LOCAL_PATH, empty);
}

/** Bundled copy shipped with the app (bootstrap when Blob is empty). */
export async function readBundledAdminUsersJson<T>(empty: T): Promise<T> {
  return readLocalJson(LOCAL_PATH, empty);
}

export async function writeAdminUsersToStore(data: unknown): Promise<void> {
  assertWritableStorageConfigured();
  const backend = getAdminUsersStorageBackend();
  logStorage(`WRITE backend=${backend}`);

  if (usesAdminUsersBlob()) {
    await writeBlobJson(data);
    const verify = await readBlobText();
    if (!verify) {
      throw new Error(
        "Admin users were written to Blob but could not be read back. Check Vercel Blob configuration."
      );
    }
    logStorage("WRITE verified (read-back OK)");
    return;
  }

  await writeLocalJson(LOCAL_PATH, data);
}
