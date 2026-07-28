import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

export const MEMBERS_BLOB_PATH = "members/members-users.json";
const LOCAL_PATH = path.join(process.cwd(), "data", "members", "users.json");

export function usesMembersBlob(): boolean {
  return (
    process.env.NODE_ENV === "production" &&
    Boolean(process.env.BLOB_READ_WRITE_TOKEN?.trim())
  );
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
  await writeFile(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

async function readBlobJson<T>(empty: T): Promise<T> {
  const { BlobNotFoundError, get } = await import("@vercel/blob");
  try {
    const result = await get(MEMBERS_BLOB_PATH, {
      access: "private",
      useCache: false,
    });
    if (!result || result.statusCode !== 200 || !result.stream) return empty;
    const text = await new Response(result.stream).text();
    if (!text.trim()) return empty;
    return JSON.parse(text) as T;
  } catch (err) {
    if (err instanceof BlobNotFoundError) return empty;
    throw err;
  }
}

async function writeBlobJson(data: unknown): Promise<void> {
  const { put } = await import("@vercel/blob");
  const json = `${JSON.stringify(data, null, 2)}\n`;
  await put(MEMBERS_BLOB_PATH, json, {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
}

export async function readMembersStoreJson<T>(empty: T): Promise<T> {
  if (usesMembersBlob()) return readBlobJson(empty);
  return readLocalJson(LOCAL_PATH, empty);
}

export async function writeMembersStoreJson(data: unknown): Promise<void> {
  if (process.env.NODE_ENV === "production" && !usesMembersBlob()) {
    throw new Error(
      "BLOB_READ_WRITE_TOKEN is required in production for members storage."
    );
  }
  if (usesMembersBlob()) {
    await writeBlobJson(data);
    return;
  }
  await writeLocalJson(LOCAL_PATH, data);
}
