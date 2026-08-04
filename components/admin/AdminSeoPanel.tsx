"use client";

import { useCallback, useEffect, useState } from "react";
import { getAdminAuthHeaders } from "@/lib/admin/auth";

type SeoMetricRow = {
  path?: string;
  query?: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
  note?: string;
};

type SeoSnapshot = {
  period: string;
  filter: { searchType: string; dateRange: string };
  totals: {
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
  };
  priorityFocus: SeoMetricRow[];
  pages: SeoMetricRow[];
  queries: SeoMetricRow[];
  devices: { device: string; clicks: number; impressions: number; ctr: number; position: number }[];
};

type SeoResponse = {
  index: { months: string[]; latest?: string | null };
  snapshot: SeoSnapshot | null;
  previous?: SeoSnapshot | null;
};

function Stat({
  label,
  value,
  hint,
}: {
  label: string;
  value: string | number;
  hint?: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
      <p className="text-[10px] uppercase tracking-wider text-white/45">{label}</p>
      <p className="mt-1 text-xl font-semibold tabular-nums text-white">{value}</p>
      {hint ? <p className="mt-0.5 text-[11px] text-violet-300/80">{hint}</p> : null}
    </div>
  );
}

export function AdminSeoPanel() {
  const [months, setMonths] = useState<string[]>([]);
  const [period, setPeriod] = useState<string>("");
  const [snapshot, setSnapshot] = useState<SeoSnapshot | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (p?: string) => {
    setLoading(true);
    setError(null);
    try {
      const q = p ? `?period=${encodeURIComponent(p)}` : "";
      const res = await fetch(`/api/admin/seo/search-console${q}`, {
        headers: getAdminAuthHeaders(),
      });
      if (!res.ok) {
        setError("Could not load Search Console snapshots.");
        setSnapshot(null);
        return;
      }
      const data = (await res.json()) as SeoResponse;
      setMonths(data.index?.months ?? []);
      const active = data.snapshot?.period || data.index?.latest || "";
      setPeriod(active);
      setSnapshot(data.snapshot);
    } catch {
      setError("Network error loading SEO data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center text-sm text-white/50">
        Loading SEO snapshots…
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-sm text-amber-200/90">
        {error}
      </div>
    );
  }

  if (!snapshot) {
    return (
      <div className="p-6 max-w-xl text-sm text-white/60 space-y-3">
        <h2 className="text-lg font-semibold text-white">SEO / Search Console</h2>
        <p>
          No monthly snapshots yet. Export from Google Search Console and run:
        </p>
        <pre className="rounded-lg bg-black/50 border border-white/10 p-3 text-xs text-violet-200 overflow-x-auto">
          {`node scripts/import-gsc-export.mjs "<export-folder>" YYYY-MM`}
        </pre>
      </div>
    );
  }

  const t = snapshot.totals;

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2
            className="text-xl font-semibold text-white"
            style={{ fontFamily: "var(--font-display), serif" }}
          >
            SEO / Search Console
          </h2>
          <p className="mt-1 text-sm text-white/50">
            {snapshot.filter.dateRange} · {snapshot.filter.searchType}
          </p>
        </div>
        {months.length > 0 ? (
          <label className="text-sm text-white/60">
            Month{" "}
            <select
              value={period}
              onChange={(e) => {
                const next = e.target.value;
                setPeriod(next);
                void load(next);
              }}
              className="ml-2 rounded-lg border border-white/15 bg-black/40 px-3 py-1.5 text-white"
            >
              {months.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </label>
        ) : null}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Clicks" value={t.clicks} />
        <Stat label="Impressions" value={t.impressions} />
        <Stat label="CTR" value={`${t.ctr}%`} />
        <Stat label="Avg. position" value={t.position} hint="Lower is better" />
      </div>

      <section>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-violet-200/90 mb-3">
          Priority focus (sprint candidates)
        </h3>
        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-sm text-left">
            <thead className="bg-white/[0.04] text-xs uppercase tracking-wider text-white/45">
              <tr>
                <th className="px-3 py-2">Path</th>
                <th className="px-3 py-2 text-right">Imp</th>
                <th className="px-3 py-2 text-right">Clicks</th>
                <th className="px-3 py-2 text-right">CTR</th>
                <th className="px-3 py-2 text-right">Pos</th>
                <th className="px-3 py-2">Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/8">
              {snapshot.priorityFocus.map((row) => (
                <tr key={row.path} className="hover:bg-white/[0.03]">
                  <td className="px-3 py-2 font-mono text-xs text-violet-200">
                    {row.path}
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums">{row.impressions}</td>
                  <td className="px-3 py-2 text-right tabular-nums">{row.clicks}</td>
                  <td className="px-3 py-2 text-right tabular-nums">{row.ctr}%</td>
                  <td className="px-3 py-2 text-right tabular-nums">{row.position}</td>
                  <td className="px-3 py-2 text-xs text-white/55">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white/70 mb-3">
            Top pages by impressions
          </h3>
          <ul className="space-y-1.5 text-sm">
            {snapshot.pages.slice(0, 12).map((p) => (
              <li
                key={p.path}
                className="flex justify-between gap-3 rounded-lg border border-white/8 bg-white/[0.02] px-3 py-2"
              >
                <span className="font-mono text-xs text-white/80 truncate">{p.path}</span>
                <span className="shrink-0 tabular-nums text-white/50 text-xs">
                  {p.impressions} imp · {p.ctr}% · #{p.position}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white/70 mb-3">
            Top queries
          </h3>
          <ul className="space-y-1.5 text-sm">
            {snapshot.queries.slice(0, 12).map((q) => (
              <li
                key={q.query}
                className="flex justify-between gap-3 rounded-lg border border-white/8 bg-white/[0.02] px-3 py-2"
              >
                <span className="text-white/85 truncate">{q.query}</span>
                <span className="shrink-0 tabular-nums text-white/50 text-xs">
                  {q.impressions} imp · {q.ctr}%
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {snapshot.devices?.length ? (
        <section>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white/70 mb-3">
            Devices
          </h3>
          <div className="flex flex-wrap gap-2">
            {snapshot.devices.map((d) => (
              <div
                key={d.device}
                className="rounded-lg border border-white/10 px-3 py-2 text-sm"
              >
                <span className="text-white/90">{d.device}</span>
                <span className="ml-2 text-white/45 text-xs tabular-nums">
                  {d.impressions} imp · {d.ctr}% CTR
                </span>
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
