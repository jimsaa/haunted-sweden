import { readFile, writeFile } from "fs/promises";
import path from "path";
import type { HauntedPlacesFile } from "@/lib/types/place";

const LOCAL_PATH = path.join(process.cwd(), "data", "haunted-places.json");
const REPO_FILE_PATH = "data/haunted-places.json";

export type PlacesWriteMethod = "filesystem" | "github";

function githubToken(): string | null {
  return (
    process.env.HAUNTED_SWEDEN_GITHUB_TOKEN?.trim() ||
    process.env.GITHUB_TOKEN?.trim() ||
    null
  );
}

function githubRepo(): { owner: string; repo: string } {
  const fromEnv = process.env.GITHUB_REPOSITORY?.trim();
  const fromVercel =
    process.env.VERCEL_GIT_REPO_OWNER && process.env.VERCEL_GIT_REPO_SLUG
      ? `${process.env.VERCEL_GIT_REPO_OWNER}/${process.env.VERCEL_GIT_REPO_SLUG}`
      : null;
  const raw = fromEnv || fromVercel || "jimsaa/haunted-sweden";
  const [owner, repo] = raw.split("/");
  return { owner: owner || "jimsaa", repo: repo || "haunted-sweden" };
}

function githubBranch(): string {
  return (
    process.env.GITHUB_BRANCH?.trim() ||
    process.env.VERCEL_GIT_COMMIT_REF?.trim() ||
    "main"
  );
}

function isReadOnlyFsError(err: unknown): boolean {
  const code = (err as NodeJS.ErrnoException)?.code;
  return code === "EROFS" || code === "EACCES" || code === "EPERM";
}

async function readLocalPlacesFile(): Promise<HauntedPlacesFile> {
  const raw = await readFile(LOCAL_PATH, "utf8");
  return JSON.parse(raw) as HauntedPlacesFile;
}

async function writeLocalPlacesFile(file: HauntedPlacesFile): Promise<void> {
  await writeFile(LOCAL_PATH, `${JSON.stringify(file, null, 2)}\n`, "utf8");
}

type GithubContentResponse = {
  sha?: string;
  content?: string;
  encoding?: string;
  message?: string;
};

async function readGithubPlacesFile(
  token: string
): Promise<{ file: HauntedPlacesFile; sha: string }> {
  const { owner, repo } = githubRepo();
  const branch = githubBranch();
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${REPO_FILE_PATH}?ref=${encodeURIComponent(branch)}`;
  const res = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "haunted-sweden-admin",
    },
    cache: "no-store",
  });
  const data = (await res.json()) as GithubContentResponse;
  if (!res.ok || !data.content || !data.sha) {
    throw new Error(
      data.message ||
        `GitHub read failed (${res.status}). Check HAUNTED_SWEDEN_GITHUB_TOKEN repo access.`
    );
  }
  const text = Buffer.from(data.content.replace(/\n/g, ""), "base64").toString(
    "utf8"
  );
  return { file: JSON.parse(text) as HauntedPlacesFile, sha: data.sha };
}

async function writeGithubPlacesFile(
  token: string,
  file: HauntedPlacesFile,
  sha: string,
  message: string
): Promise<void> {
  const { owner, repo } = githubRepo();
  const branch = githubBranch();
  const content = Buffer.from(
    `${JSON.stringify(file, null, 2)}\n`,
    "utf8"
  ).toString("base64");

  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${REPO_FILE_PATH}`,
    {
      method: "PUT",
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${token}`,
        "X-GitHub-Api-Version": "2022-11-28",
        "Content-Type": "application/json",
        "User-Agent": "haunted-sweden-admin",
      },
      body: JSON.stringify({
        message,
        content,
        sha,
        branch,
      }),
    }
  );

  if (!res.ok) {
    const err = (await res.json().catch(() => ({}))) as { message?: string };
    throw new Error(
      err.message ||
        `GitHub write failed (${res.status}). Token needs Contents: Read and write on ${owner}/${repo}.`
    );
  }
}

/** Read catalog — prefer GitHub in production when token is set (latest main). */
export async function readPlacesCatalog(): Promise<{
  file: HauntedPlacesFile;
  sha: string | null;
  source: PlacesWriteMethod;
}> {
  const token = githubToken();
  if (token && process.env.NODE_ENV === "production") {
    const { file, sha } = await readGithubPlacesFile(token);
    return { file, sha, source: "github" };
  }
  const file = await readLocalPlacesFile();
  return { file, sha: null, source: "filesystem" };
}

/**
 * Persist catalog. Tries local disk first; on read-only FS (Vercel) commits via GitHub.
 */
export async function writePlacesCatalog(
  file: HauntedPlacesFile,
  options: { sha?: string | null; commitMessage: string }
): Promise<PlacesWriteMethod> {
  try {
    await writeLocalPlacesFile(file);
    return "filesystem";
  } catch (err) {
    if (!isReadOnlyFsError(err) && process.env.NODE_ENV !== "production") {
      throw err;
    }

    const token = githubToken();
    if (!token) {
      throw new Error(
        "Server filesystem is read-only (typical on Vercel). Add environment variable HAUNTED_SWEDEN_GITHUB_TOKEN (GitHub PAT with Contents read/write on jimsaa/haunted-sweden) so Cover Audit can commit cover updates to GitHub."
      );
    }

    let sha = options.sha ?? null;
    if (!sha) {
      const current = await readGithubPlacesFile(token);
      sha = current.sha;
      // If we didn't start from GitHub, merge onto latest remote to avoid clobbering
      // when caller only patched a local snapshot — caller should pass updated file
      // based on readPlacesCatalog(); sha alone is enough for overwrite of that snapshot.
    }

    await writeGithubPlacesFile(token, file, sha, options.commitMessage);
    return "github";
  }
}

export function placesCatalogGithubConfigured(): boolean {
  return Boolean(githubToken());
}
