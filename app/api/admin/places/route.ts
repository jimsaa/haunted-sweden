import { NextResponse } from "next/server";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { verifyAdminPassword, isAdminApiEnabled } from "@/lib/admin/auth";
import type { HauntedPlacesFile } from "@/lib/types/place";

const DATA_PATH = path.join(process.cwd(), "data", "haunted-places.json");

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

function notAvailable() {
  return NextResponse.json(
    { error: "Admin API is disabled in production" },
    { status: 403 }
  );
}

function getPasswordFromRequest(request: Request): string | null {
  const header = request.headers.get("x-admin-password");
  if (header) return header;
  return null;
}

export async function GET(request: Request) {
  if (!isAdminApiEnabled()) return notAvailable();
  const password = getPasswordFromRequest(request);
  if (!password || !verifyAdminPassword(password)) return unauthorized();

  try {
    const raw = await readFile(DATA_PATH, "utf8");
    const data = JSON.parse(raw) as HauntedPlacesFile;
    return NextResponse.json(data);
  } catch (err) {
    console.error("[admin/places GET]", err);
    return NextResponse.json(
      { error: "Failed to read haunted-places.json" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  if (!isAdminApiEnabled()) return notAvailable();
  const password = getPasswordFromRequest(request);
  if (!password || !verifyAdminPassword(password)) return unauthorized();

  try {
    const body = (await request.json()) as HauntedPlacesFile;
    if (!body || !Array.isArray(body.places)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const json = `${JSON.stringify(body, null, 2)}\n`;
    await writeFile(DATA_PATH, json, "utf8");

    return NextResponse.json({ ok: true, version: body.version });
  } catch (err) {
    console.error("[admin/places POST]", err);
    return NextResponse.json(
      { error: "Failed to write haunted-places.json" },
      { status: 500 }
    );
  }
}
