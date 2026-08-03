"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { CheckCircle2, AlertTriangle, Copy, ExternalLink, ImageOff, RefreshCw, Save } from "lucide-react";
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
  /** Draft cover URLs keyed by place id */
  const [urlDrafts, setUrlDrafts] = useState<Record<string, string>>({});
  const [savingId, setSavingId] = useState<string | null>(null);
  const [rowMessages, setRowMessages] = useState<Record<string, string>>({});

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
      const nextRows = data.rows ?? [];
      setRows(nextRows);
      setSummary(data.summary ?? EMPTY_SUMMARY);
      setUrlDrafts(
        Object.fromEntries(
          nextRows.map((r) => [r.id, r.coverImage ?? ""])
        )
      );
      setRowMessages({});
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

  const saveCover = async (row: CoverAuditRow) => {
    const coverImage = (urlDrafts[row.id] ?? "").trim();
    setSavingId(row.id);
    setRowMessages((m) => ({ ...m, [row.id]: "" }));
    try {
      const res = await fetch("/api/admin/places/cover", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAdminAuthHeaders(),
        },
        body: JSON.stringify({ id: row.id, coverImage: coverImage || null }),
      });
      const data = (await res.json()) as {
        error?: string;
        coverImage?: string | null;
        note?: string;
        githubConfigured?: boolean;
      };
      if (!res.ok) {
        const hint =
          data.githubConfigured === false
            ? " Add HAUNTED_SWEDEN_GITHUB_TOKEN on Vercel (repo Contents write) so covers can be committed."
            : "";
        setRowMessages((m) => ({
          ...m,
          [row.id]: (data.error || "Save failed.") + hint,
        }));
        return;
      }
      setRowMessages((m) => ({
        ...m,
        [row.id]:
          data.note ||
          (coverImage ? "Cover saved." : "Cover cleared."),
      }));
      await load();
    } catch {
      setRowMessages((m) => ({ ...m, [row.id]: "Network error." }));
    } finally {
      setSavingId(null);
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
            Find a photo (Google Images link), paste the image URL below, and
            save — updates the listing cover immediately. Does not bulk-edit
            other place fields.
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
                <th className="px-3 py-2 font-medium min-w-[280px]">Cover photo URL</th>
                <th className="px-3 py-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((row) => (
                <tr key={row.id} className="border-t border-white/5 align-top">
                  <td className="px-3 py-2">
                    {row.thumbnailSrc || (urlDrafts[row.id] || "").trim() ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={(urlDrafts[row.id] || "").trim() || row.thumbnailSrc || ""}
                        alt=""
                        className="h-12 w-12 rounded object-cover border border-white/10 bg-black/40"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.opacity = "0.25";
                        }}
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
                  <td className="px-3 py-2">
                    <div className="text-violet-100 font-medium">{row.name}</div>
                    <div className="font-mono text-[11px] text-white/40">{row.slug}</div>
                  </td>
                  <td className="px-3 py-2 text-white/70">{row.region || "—"}</td>
                  <td className="px-3 py-2">
                    <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center">
                      <input
                        type="url"
                        value={urlDrafts[row.id] ?? ""}
                        onChange={(e) =>
                          setUrlDrafts((d) => ({
                            ...d,
                            [row.id]: e.target.value,
                          }))
                        }
                        placeholder="https://… or /places/name-cover.png"
                        className="admin-input flex-1 min-w-0 text-xs font-mono"
                      />
                      <button
                        type="button"
                        className="admin-btn admin-btn--primary shrink-0 text-xs"
                        disabled={savingId === row.id}
                        onClick={() => void saveCover(row)}
                      >
                        <Save className="h-3.5 w-3.5" aria-hidden />
                        {savingId === row.id ? "Saving…" : "Save cover"}
                      </button>
                    </div>
                    {rowMessages[row.id] ? (
                      <p className="mt-1 text-[11px] text-violet-200/80">
                        {rowMessages[row.id]}
                      </p>
                    ) : null}
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
                    colSpan={5}
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
