import { NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/admin/api-auth";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/admin";

export async function GET(request: Request) {
  const auth = await requireAdminUser(request, "view_analytics");
  if (!auth.ok) return auth.response;

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
  }

  const url = new URL(request.url);
  const format = url.searchParams.get("format");

  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("newsletter_subscribers")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    const rows = data ?? [];

    if (format === "csv") {
      const header = [
        "id",
        "email",
        "created_at",
        "book_title",
        "archive_id",
        "source",
        "verified",
        "status",
        "consent",
      ];
      const lines = [
        header.join(","),
        ...rows.map((r) =>
          header
            .map((h) => {
              const v = String((r as Record<string, unknown>)[h] ?? "");
              return `"${v.replace(/"/g, '""')}"`;
            })
            .join(",")
        ),
      ];
      return new NextResponse(lines.join("\n"), {
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": 'attachment; filename="newsletter-subscribers.csv"',
        },
      });
    }

    return NextResponse.json({ rows });
  } catch (err) {
    console.error("[admin/newsletter/export]", err);
    return NextResponse.json({ error: "Export failed" }, { status: 500 });
  }
}
