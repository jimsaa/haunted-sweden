"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { CheckCircle2, AlertTriangle, Copy, ExternalLink, ImageOff, RefreshCw } from "lucide-react";
import { getAdminAuthHeaders } from "@/lib/admin/auth";
import {
  filterCoverAuditRows,
  formatMissingLocationsList,
  sortCoverAuditRows,
  type CoverAuditFilter,
  type CoverAuditRow,
  type CoverAuditSort,
  type CoverAuditStatus,
  type CoverAuditSummary,
} from "@/lib/admin/cover-audit";

const EMPTY_SUMMARY: CoverAuditSummary = {
  total: 0,
  hasCover: 0,
  missingCover: 0,
  brokenImages: 0,
  coveragePercent: 0,
};

function googleImagesSearchUrl(placeName: string, region?: string): string {
  const query = [placeName, region, "Sweden"].filter(Boolean).join(" ");
  return `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(query)}`;
}

function statusLabel(status: CoverAuditStatus): string {
  switch (status) {
    case "has":
      return "✅ Has cover";
    case "missing":
      return "❌ Missing cover";
    case "broken":
      return "⚠ Broken image";
  }
}

function statusClass(status: CoverAuditStatus): string {
  switch (status) {
    case "has":
      return "text-emerald-300";
    case "missing":
      return "text-red-300";
    case "broken":
      return "text-amber-300";
  }
}

export function AdminCoverAuditPanel() {
  const [rows, setRows] = useState<CoverAuditRow[]>([]);
  const [summary, setSummary] = useState<CoverAuditSummary>(EMPTY_SUMMARY);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<CoverAuditFilter>("all");
  const [sort, setSort] = useState<CoverAuditSort>("name");
  const [copyMessage, setCopyMessage] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    setCopyMessage(null);
    try {
      const res = await fetch("/api/admin/cover-audit", {
        headers: { ...getAdminAuthHeaders() },
      });
      const data = (await res.json()) as {
        error?: string;
        rows?: CoverAuditRow[];
        summary?: CoverAuditSummary;
      };
      if (!res.ok) {
        setError(data.error || "Could not load cover audit.");
        setRows([]);
        setSummary(EMPTY_SUMMARY);
        return;
      }
      setRows(data.rows ?? []);
      setSummary(data.summary ?? EMPTY_SUMMARY);
    } catch {
      setError("Network error.");
      setRows([]);
      setSummary(EMPTY_SUMMARY);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const visible = useMemo(
    () => sortCoverAuditRows(filterCoverAuditRows(rows, filter), sort),
    [rows, filter, sort]
  );

  const handleCopyMissing = async () => {
    const text = formatMissingLocationsList(rows);
    if (!text.trim()) {
      setCopyMessage("No missing covers to copy.");
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      const count = text.split("\n").filter(Boolean).length;
      setCopyMessage(`Copied ${count} missing location${count === 1 ? "" : "s"}.`);
    } catch {
      setCopyMessage("Clipboard unavailable — select and copy from the list below.");
    }
  };

  return (
    <div className="flex flex-1 min-h-0 flex-col overflow-auto p-4">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2
            className="text-lg font-semibold text-violet-100"
            style={{ fontFamily: "var(--font-display), serif" }}
          >
            Cover Audit
          </h2>
          <p className="text-sm text-white/45">
            Find locations missing or with broken cover images. Does not change
            place data.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => void handleCopyMissing()}
            className="admin-btn admin-btn--primary"
            disabled={loading || summary.missingCover === 0}
          >
            <Copy className="h-4 w-4" aria-hidden />
            Copy Missing Locations
          </button>
          <button
            type="button"
            onClick={() => void load()}
            className="admin-btn admin-btn--ghost"
            disabled={loading}
          >
            <RefreshCw className="h-4 w-4" aria-hidden />
            Refresh
          </button>
        </div>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
        <StatCard label="Total locations" value={String(summary.total)} />
        <StatCard
          label="Has cover"
          value={String(summary.hasCover)}
          icon={<CheckCircle2 className="h-4 w-4 text-emerald-400" />}
        />
        <StatCard
          label="Missing cover"
          value={String(summary.missingCover)}
          icon={<ImageOff className="h-4 w-4 text-red-400" />}
        />
        <StatCard
          label="Broken images"
          value={String(summary.brokenImages)}
          icon={<AlertTriangle className="h-4 w-4 text-amber-400" />}
        />
        <StatCard
          label="Coverage"
          value={`${summary.coveragePercent}%`}
        />
      </div>

      <div className="mb-3 flex flex-wrap items-end gap-3">
        <label className="flex flex-col gap-1 text-xs text-white/50">
          Filter
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as CoverAuditFilter)}
            className="rounded border border-white/15 bg-black/40 px-2 py-1.5 text-sm text-white"
          >
            <option value="all">All</option>
            <option value="missing">Missing covers only</option>
            <option value="broken">Broken covers only</option>
            <option value="complete">Complete only</option>
          </select>
        </label>
        <label className="flex flex-col gap-1 text-xs text-white/50">
          Sort
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as CoverAuditSort)}
            className="rounded border border-white/15 bg-black/40 px-2 py-1.5 text-sm text-white"
          >
            <option value="name">Name</option>
            <option value="region">Region</option>
            <option value="dateAdded">Date added</option>
          </select>
        </label>
        <p className="text-xs text-white/40 pb-1.5">
          Showing {visible.length} of {rows.length}
          {sort === "dateAdded" ? " · Date added ≈ place id order" : null}
        </p>
      </div>

      {copyMessage ? (
        <p className="mb-3 text-sm text-violet-200/90">{copyMessage}</p>
      ) : null}

      {error ? (
        <p className="mb-3 text-sm text-red-300">{error}</p>
      ) : null}

      {loading ? (
        <p className="text-white/40 text-sm">Scanning covers…</p>
      ) : (
        <div className="overflow-x-auto border border-white/10 rounded">
          <table className="w-full text-sm text-left">
            <thead className="bg-white/5 text-white/50">
              <tr>
                <th className="px-3 py-2 font-medium w-16">Thumb</th>
                <th className="px-3 py-2 font-medium">Location</th>
                <th className="px-3 py-2 font-medium">Region</th>
                <th className="px-3 py-2 font-medium">Slug</th>
                <th className="px-3 py-2 font-medium">Cover filename</th>
                <th className="px-3 py-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((row) => (
                <tr key={row.id} className="border-t border-white/5 align-middle">
                  <td className="px-3 py-2">
                    {row.thumbnailSrc ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={row.thumbnailSrc}
                        alt=""
                        className="h-12 w-12 rounded object-cover border border-white/10 bg-black/40"
                      />
                    ) : (
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded border border-white/10 bg-black/30 text-white/25"
                        aria-hidden
                      >
                        <ImageOff className="h-5 w-5" />
                      </div>
                    )}
                  </td>
                  <td className="px-3 py-2 text-violet-100 font-medium">
                    {row.name}
                  </td>
                  <td className="px-3 py-2 text-white/70">{row.region || "—"}</td>
                  <td className="px-3 py-2 font-mono text-xs text-white/50">
                    {row.slug}
                  </td>
                  <td className="px-3 py-2 font-mono text-xs text-white/55">
                    {row.coverFilename || "—"}
                  </td>
                  <td className={`px-3 py-2 whitespace-nowrap ${statusClass(row.status)}`}>
                    {row.status === "missing" || row.status === "broken" ? (
                      <a
                        href={googleImagesSearchUrl(row.name, row.region)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1.5 underline-offset-2 hover:underline ${statusClass(row.status)}`}
                        title={`Search Google Images for ${row.name}`}
                      >
                        {statusLabel(row.status)}
                        <ExternalLink className="h-3.5 w-3.5 opacity-70" aria-hidden />
                        <span className="sr-only"> (Google Images)</span>
                      </a>
                    ) : (
                      statusLabel(row.status)
                    )}
                  </td>
                </tr>
              ))}
              {visible.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-3 py-8 text-center text-white/40"
                  >
                    No locations match this filter.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: ReactNode;
}) {
  return (
    <div className="rounded border border-white/10 bg-white/[0.03] px-3 py-2">
      <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wide text-white/40">
        {icon}
        {label}
      </div>
      <p className="mt-1 text-xl font-semibold text-violet-100 tabular-nums">
        {value}
      </p>
    </div>
  );
}
