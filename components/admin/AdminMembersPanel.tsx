"use client";

import { useCallback, useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import { getAdminAuthHeaders } from "@/lib/admin/auth";
import type { MemberPublicProfile } from "@/lib/members/types";

export function AdminMembersPanel() {
  const [users, setUsers] = useState<MemberPublicProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/members", {
        headers: { ...getAdminAuthHeaders() },
      });
      const data = (await res.json()) as {
        error?: string;
        users?: MemberPublicProfile[];
      };
      if (!res.ok) {
        setError(data.error || "Could not load members.");
        setUsers([]);
        return;
      }
      setUsers(data.users ?? []);
    } catch {
      setError("Network error.");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return (
    <div className="flex flex-1 min-h-0 flex-col overflow-auto p-4">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2
            className="text-lg font-semibold text-violet-100"
            style={{ fontFamily: "var(--font-display), serif" }}
          >
            Members Platform
          </h2>
          <p className="text-sm text-white/45">
            Registered investigation platform accounts ({users.length})
          </p>
        </div>
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

      {error ? (
        <p className="mb-3 text-sm text-red-300">{error}</p>
      ) : null}

      {loading ? (
        <p className="text-white/40 text-sm">Loading…</p>
      ) : (
        <div className="overflow-x-auto border border-white/10 rounded">
          <table className="w-full text-sm text-left">
            <thead className="bg-white/5 text-white/50">
              <tr>
                <th className="px-3 py-2 font-medium">Username</th>
                <th className="px-3 py-2 font-medium">Display</th>
                <th className="px-3 py-2 font-medium">Email</th>
                <th className="px-3 py-2 font-medium">Tier</th>
                <th className="px-3 py-2 font-medium">Role</th>
                <th className="px-3 py-2 font-medium">Badges</th>
                <th className="px-3 py-2 font-medium">Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-t border-white/5">
                  <td className="px-3 py-2 text-violet-200">@{u.username}</td>
                  <td className="px-3 py-2">{u.displayName}</td>
                  <td className="px-3 py-2 text-white/60">{u.email}</td>
                  <td className="px-3 py-2 capitalize">{u.tier}</td>
                  <td className="px-3 py-2 capitalize">{u.role}</td>
                  <td className="px-3 py-2">{u.badges.length}</td>
                  <td className="px-3 py-2 text-white/50">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {users.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-3 py-6 text-center text-white/40"
                  >
                    No members registered yet.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      )}

      <p className="mt-4 text-xs text-white/35">
        Management for books, badges, QR markers, and memberships expands in
        Members v2. This panel is read-only for v1.
      </p>
    </div>
  );
}
