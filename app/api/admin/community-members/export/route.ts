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
      .from("community_members")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    const rows = data ?? [];

    if (format === "csv") {
      const header = [
        "id",
        "email",
        "created_at",
        "source",
        "status",
        "verified",
        "consent",
        "interests",
        "membership_tier",
      ];
      const lines = [
        header.join(","),
        ...rows.map((r) =>
          header
            .map((h) => {
              let v = (r as Record<string, unknown>)[h];
              if (Array.isArray(v)) v = v.join(";");
              return `"${String(v ?? "").replace(/"/g, '""')}"`;
            })
            .join(",")
        ),
      ];
      return new NextResponse(lines.join("\n"), {
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition":
            'attachment; filename="community-members.csv"',
        },
      });
    }

    return NextResponse.json({ rows });
  } catch (err) {
    console.error("[admin/community-members/export]", err);
    return NextResponse.json({ error: "Export failed" }, { status: 500 });
  }
}
