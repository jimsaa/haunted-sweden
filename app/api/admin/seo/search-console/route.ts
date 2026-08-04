import { NextResponse } from "next/server";
import { existsSync, readFileSync, readdirSync } from "fs";
import path from "path";
import { requireAdminUser } from "@/lib/admin/api-auth";

const SEO_ROOT = path.join(process.cwd(), "data", "seo", "search-console");

export async function GET(request: Request) {
  const auth = await requireAdminUser(request, "view_analytics");
  if (!auth.ok) return auth.response;

  const url = new URL(request.url);
  const period = url.searchParams.get("period");

  try {
    if (!existsSync(SEO_ROOT)) {
      return NextResponse.json({
        index: { months: [], latest: null },
        snapshot: null,
      });
    }

    const indexPath = path.join(SEO_ROOT, "index.json");
    const index = existsSync(indexPath)
      ? JSON.parse(readFileSync(indexPath, "utf8"))
      : {
          months: readdirSync(SEO_ROOT).filter((d) =>
            existsSync(path.join(SEO_ROOT, d, "snapshot.json"))
          ),
          latest: null,
        };

    const target = period || index.latest || index.months?.[0];
    if (!target) {
      return NextResponse.json({ index, snapshot: null });
    }

    const snapPath = path.join(SEO_ROOT, target, "snapshot.json");
    if (!existsSync(snapPath)) {
      return NextResponse.json(
        { error: `No snapshot for ${target}`, index },
        { status: 404 }
      );
    }

    const snapshot = JSON.parse(readFileSync(snapPath, "utf8"));

    // Previous month for comparison when available
    const months: string[] = index.months || [];
    const idx = months.indexOf(target);
    const previousPeriod = idx >= 0 && idx < months.length - 1 ? months[idx + 1] : null;
    let previous: unknown = null;
    if (previousPeriod) {
      const prevPath = path.join(SEO_ROOT, previousPeriod, "snapshot.json");
      if (existsSync(prevPath)) {
        previous = JSON.parse(readFileSync(prevPath, "utf8"));
      }
    }

    return NextResponse.json({ index, snapshot, previous });
  } catch (e) {
    console.error("[admin/seo/search-console]", e);
    return NextResponse.json({ error: "Failed to load SEO data" }, { status: 500 });
  }
}
