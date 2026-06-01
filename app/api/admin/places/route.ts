import { NextResponse } from "next/server";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { requireAdminUser } from "@/lib/admin/api-auth";
import type { HauntedPlacesFile } from "@/lib/types/place";

const DATA_PATH = path.join(process.cwd(), "data", "haunted-places.json");

export async function GET(request: Request) {
  const auth = await requireAdminUser(request);
  if (!auth.ok) return auth.response;

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
  const auth = await requireAdminUser(request, "edit_locations");
  if (!auth.ok) return auth.response;

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
