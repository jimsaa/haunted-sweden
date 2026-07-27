"use client";

import { useCallback, useEffect, useState } from "react";
import {
  clientHasPermission,
  getAdminAuthHeaders,
  getStoredAdminUser,
} from "@/lib/admin/auth";
import type { CommunityMemberRow } from "@/lib/supabase/admin";

export function AdminCommunityMembersPanel() {
  const actor = getStoredAdminUser();
  const [members, setMembers] = useState<CommunityMemberRow[]>([]);
  const [stats, setStats] = useState<{
    total: number;
    active: number;
    verified: number;
    free: number;
    premium: number;
  } | null>(null);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (query.trim()) params.set("q", query.trim());
      if (statusFilter.trim()) params.set("status", statusFilter.trim());
      const res = await fetch(`/api/admin/community-members?${params}`, {
        headers: getAdminAuthHeaders(),
      });
      const data = (await res.json()) as {
        members?: CommunityMemberRow[];
        stats?: {
          total: number;
          active: number;
          verified: number;
          free: number;
          premium: number;
        };
        error?: string;
      };
      if (!res.ok) throw new Error(data.error ?? "Load failed");
      setMembers(data.members ?? []);
      setStats(data.stats ?? null);
      setMessage(null);
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Load failed");
    } finally {
      setLoading(false);
    }
  }, [query, statusFilter]);

  useEffect(() => {
    load();
  }, [load]);

  const exportCsv = async () => {
    const res = await fetch("/api/admin/community-members/export?format=csv", {
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
    a.download = "community-members.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this community member?")) return;
    const res = await fetch("/api/admin/community-members", {
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
        You do not have permission to view community members.
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col min-h-0 p-4 sm:p-6 overflow-y-auto">
      <header className="mb-6">
        <h2 className="text-lg font-semibold text-violet-100">
          Community Members
        </h2>
        {stats ? (
          <p className="text-sm text-white/45 mt-1">
            {stats.total} total · {stats.active} active · {stats.verified}{" "}
            verified · {stats.free} free · {stats.premium} premium
          </p>
        ) : null}
      </header>

      <div className="flex flex-wrap gap-2 mb-4">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search email…"
          className="admin-input flex-1 min-w-[12rem]"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="admin-input w-40"
        >
          <option value="">All statuses</option>
          <option value="active">Active</option>
          <option value="unsubscribed">Unsubscribed</option>
        </select>
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
      ) : members.length === 0 ? (
        <p className="text-white/40 text-sm">No community members yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-white/10">
          <table className="w-full text-sm text-left">
            <thead className="bg-white/[0.03] text-white/50 text-xs uppercase">
              <tr>
                <th className="px-3 py-2">Email</th>
                <th className="px-3 py-2">Source</th>
                <th className="px-3 py-2">Tier</th>
                <th className="px-3 py-2">Date</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2" />
              </tr>
            </thead>
            <tbody>
              {members.map((m) => (
                <tr key={m.id} className="border-t border-white/8 text-white/75">
                  <td className="px-3 py-2">{m.email}</td>
                  <td className="px-3 py-2 text-white/50">{m.source}</td>
                  <td className="px-3 py-2">{m.membership_tier}</td>
                  <td className="px-3 py-2 text-white/45">
                    {new Date(m.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-3 py-2">{m.status}</td>
                  <td className="px-3 py-2">
                    <button
                      type="button"
                      onClick={() => remove(m.id)}
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
