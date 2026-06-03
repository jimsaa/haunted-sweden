import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

export const ADMIN_USERS_BLOB_PATH = "admin/admin-users.json";

const LOCAL_PATH = path.join(process.cwd(), "data", "admin-users.json");

export type AdminUsersStorageBackend = "BLOB" | "JSON";

export function usesAdminUsersBlob(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN?.trim());
}

export function getAdminUsersStorageBackend(): AdminUsersStorageBackend {
  return usesAdminUsersBlob() ? "BLOB" : "JSON";
}

function logDev(message: string): void {
  if (process.env.NODE_ENV === "production") return;
  console.log(`[admin-users-storage] ${message}`);
}

function logOperation(operation: "read" | "write"): void {
  const backend = getAdminUsersStorageBackend();
  const target =
    backend === "BLOB" ? ADMIN_USERS_BLOB_PATH : "data/admin-users.json";
  logDev(`${operation.toUpperCase()} backend=${backend} target=${target}`);
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

async function readBlobJson<T>(empty: T): Promise<T> {
  const { BlobNotFoundError, head } = await import("@vercel/blob");
  let meta;
  try {
    meta = await head(ADMIN_USERS_BLOB_PATH);
  } catch (err) {
    if (err instanceof BlobNotFoundError) return empty;
    throw err;
  }
  if (!meta?.url) return empty;
  const res = await fetch(meta.url);
  if (!res.ok) return empty;
  const text = await res.text();
  if (!text.trim()) return empty;
  return JSON.parse(text) as T;
}

async function writeBlobJson(data: unknown): Promise<void> {
  const { put } = await import("@vercel/blob");
  const json = `${JSON.stringify(data, null, 2)}\n`;
  await put(ADMIN_USERS_BLOB_PATH, json, {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
}

/** Writable store: Vercel Blob in production when configured, else local JSON. */
export async function readAdminUsersFromStore<T>(empty: T): Promise<T> {
  logDev(`Storage backend: ${getAdminUsersStorageBackend()}`);
  logOperation("read");

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

/** Bundled/read-only copy shipped with the app (for bootstrap when Blob is empty). */
export async function readBundledAdminUsersJson<T>(empty: T): Promise<T> {
  return readLocalJson(LOCAL_PATH, empty);
}

export async function writeAdminUsersToStore(data: unknown): Promise<void> {
  assertWritableStorageConfigured();
  logDev(`Saving user settings — backend: ${getAdminUsersStorageBackend()}`);
  logOperation("write");

  if (usesAdminUsersBlob()) {
    await writeBlobJson(data);
    logDev("Save success (BLOB)");
    return;
  }

  await writeLocalJson(LOCAL_PATH, data);
  logDev("Save success (JSON)");
}
