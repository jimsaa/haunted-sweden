"use client";

import { useCallback, useEffect, useState } from "react";
import {
  clientHasPermission,
  getAdminAuthHeaders,
  getStoredAdminUser,
} from "@/lib/admin/auth";
import type { NewsletterSubscriberRow } from "@/lib/supabase/admin";

export function AdminNewsletterPanel() {
  const actor = getStoredAdminUser();
  const [subscribers, setSubscribers] = useState<NewsletterSubscriberRow[]>([]);
  const [stats, setStats] = useState<{
    total: number;
    active: number;
    verified: number;
  } | null>(null);
  const [query, setQuery] = useState("");
  const [archiveFilter, setArchiveFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (query.trim()) params.set("q", query.trim());
      if (archiveFilter.trim()) params.set("archiveId", archiveFilter.trim());
      const res = await fetch(`/api/admin/newsletter?${params}`, {
        headers: getAdminAuthHeaders(),
      });
      const data = (await res.json()) as {
        subscribers?: NewsletterSubscriberRow[];
        stats?: { total: number; active: number; verified: number };
        error?: string;
      };
      if (!res.ok) throw new Error(data.error ?? "Load failed");
      setSubscribers(data.subscribers ?? []);
      setStats(data.stats ?? null);
      setMessage(null);
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Load failed");
    } finally {
      setLoading(false);
    }
  }, [query, archiveFilter]);

  useEffect(() => {
    load();
  }, [load]);

  const exportCsv = async () => {
    const res = await fetch("/api/admin/newsletter/export?format=csv", {
      headers: getAdminAuthHeaders(),
    });
    if (!res.ok) {
      setMessage("Export failed");
      return;
    }
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "newsletter-subscribers.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this subscriber?")) return;
    const res = await fetch("/api/admin/newsletter", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...getAdminAuthHeaders(),
      },
      body: JSON.stringify({ id }),
    });
    if (res.ok) await load();
    else setMessage("Delete failed");
  };

  if (!actor || !clientHasPermission(actor, "view_analytics")) {
    return (
      <div className="flex flex-1 items-center justify-center p-8 text-white/40 text-sm">
        You do not have permission to view newsletter subscribers.
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col min-h-0 p-4 sm:p-6 overflow-y-auto">
      <header className="mb-6">
        <h2 className="text-lg font-semibold text-violet-100">
          Newsletter Subscribers
        </h2>
        {stats ? (
          <p className="text-sm text-white/45 mt-1">
            {stats.total} total · {stats.active} active · {stats.verified}{" "}
            verified
          </p>
        ) : null}
      </header>

      <div className="flex flex-wrap gap-2 mb-4">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search email or book…"
          className="admin-input flex-1 min-w-[12rem]"
        />
        <input
          type="text"
          value={archiveFilter}
          onChange={(e) => setArchiveFilter(e.target.value)}
          placeholder="Archive ID filter"
          className="admin-input w-40"
        />
        <button type="button" onClick={load} className="admin-btn admin-btn--ghost">
          Search
        </button>
        <button
          type="button"
          onClick={exportCsv}
          className="admin-btn admin-btn--primary"
        >
          Export CSV
        </button>
      </div>

      {message ? (
        <p className="text-sm text-red-300/90 mb-4">{message}</p>
      ) : null}

      {loading ? (
        <p className="text-white/40 text-sm">Loading…</p>
      ) : subscribers.length === 0 ? (
        <p className="text-white/40 text-sm">No subscribers yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-white/10">
          <table className="w-full text-sm text-left">
            <thead className="bg-white/[0.03] text-white/50 text-xs uppercase">
              <tr>
                <th className="px-3 py-2">Email</th>
                <th className="px-3 py-2">Book</th>
                <th className="px-3 py-2">Archive</th>
                <th className="px-3 py-2">Date</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2" />
              </tr>
            </thead>
            <tbody>
              {subscribers.map((s) => (
                <tr key={s.id} className="border-t border-white/8 text-white/75">
                  <td className="px-3 py-2">{s.email}</td>
                  <td className="px-3 py-2">{s.book_title ?? "—"}</td>
                  <td className="px-3 py-2 font-mono text-xs">{s.archive_id ?? "—"}</td>
                  <td className="px-3 py-2 text-white/45">
                    {new Date(s.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-3 py-2">{s.status}</td>
                  <td className="px-3 py-2">
                    <button
                      type="button"
                      onClick={() => remove(s.id)}
                      className="text-red-300/80 hover:text-red-200 text-xs"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
