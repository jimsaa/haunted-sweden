"use client";

import { useCallback, useEffect, useState } from "react";
import {
  ADMIN_PERMISSION_KEYS,
  OWNER_USER_ID,
  PERMISSION_LABELS,
  ROLE_LABELS,
  canDeleteUser,
  canManageTargetUser,
} from "@/lib/admin/permissions";
import type { AdminPermission } from "@/lib/admin/permissions";
import {
  clientHasPermission,
  getAdminAuthHeaders,
  getStoredAdminUser,
} from "@/lib/admin/auth";
import type { AdminPublicUser } from "@/lib/admin/users-types";
import type { AdminPermissionsMap } from "@/lib/admin/permissions";

export function AdminUsersPanel({
  onUserUpdated,
}: {
  onUserUpdated?: () => void;
}) {
  const actor = getStoredAdminUser();
  const [users, setUsers] = useState<AdminPublicUser[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [draftPerms, setDraftPerms] = useState<AdminPermissionsMap | null>(
    null
  );
  const [enabled, setEnabled] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const selected = users.find((u) => u.id === selectedId) ?? null;
  const canEditTarget =
    selected && actor
      ? canManageTargetUser(actor.role, selected.id)
      : false;
  const isOwnerAccount = selected?.id === OWNER_USER_ID;

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/users", {
        headers: getAdminAuthHeaders(),
      });
      if (!res.ok) throw new Error("Failed to load users");
      const data = (await res.json()) as { users: AdminPublicUser[] };
      setUsers(data.users);
      if (!selectedId && data.users[0]) {
        setSelectedId(data.users[0].id);
      }
      setMessage(null);
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Load failed");
    } finally {
      setLoading(false);
    }
  }, [selectedId]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (!selected) {
      setDraftPerms(null);
      return;
    }
    setDraftPerms({ ...selected.permissions });
    setEnabled(selected.enabled);
    setNewPassword("");
  }, [selected?.id, selected?.permissions, selected?.enabled]);

  const save = async () => {
    if (!selected || !draftPerms) return;
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAdminAuthHeaders(),
        },
        body: JSON.stringify({
          userId: selected.id,
          enabled: isOwnerAccount ? true : enabled,
          password: newPassword.trim() || undefined,
          permissions: isOwnerAccount ? undefined : draftPerms,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error((data as { error?: string }).error ?? "Save failed");
      }
      setMessage("User saved");
      setNewPassword("");
      await load();
      onUserUpdated?.();
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  if (!actor || !clientHasPermission(actor, "manage_users")) {
    return (
      <div className="flex flex-1 items-center justify-center p-8 text-white/40 text-sm">
        You do not have permission to manage users.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center text-white/40 text-sm">
        Loading users…
      </div>
    );
  }

  return (
    <div className="flex flex-1 min-h-0 flex-col lg:flex-row">
      <aside className="lg:w-56 shrink-0 border-b lg:border-b-0 lg:border-r border-white/10 p-3">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-white/45 px-2 mb-2">
          Users
        </h2>
        <ul className="space-y-1">
          {users.map((u) => (
            <li key={u.id}>
              <button
                type="button"
                onClick={() => setSelectedId(u.id)}
                className={`w-full text-left rounded-lg px-3 py-2 text-sm transition-colors ${
                  selectedId === u.id
                    ? "bg-violet-600/25 text-violet-100"
                    : "text-white/70 hover:bg-white/[0.04]"
                }`}
              >
                <span className="font-medium block">{u.displayName}</span>
                <span className="text-[10px] text-white/40">
                  {ROLE_LABELS[u.role]}
                  {!u.enabled ? " · disabled" : ""}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 min-h-0">
        {message ? (
          <p className="mb-4 text-sm text-violet-200/90">{message}</p>
        ) : null}

        {selected && draftPerms ? (
          <div className="max-w-2xl space-y-6">
            <header>
              <h3 className="text-lg font-semibold text-violet-100">
                {selected.displayName}
              </h3>
              <p className="text-sm text-white/45 mt-1">
                @{selected.username} ·{" "}
                <span
                  className={`admin-role-pill admin-role-pill--${selected.role}`}
                >
                  {ROLE_LABELS[selected.role]}
                </span>
              </p>
            </header>

            {isOwnerAccount ? (
              <p className="text-sm text-amber-200/80 rounded-lg border border-amber-500/25 bg-amber-950/20 px-3 py-2">
                Owner account: all permissions are always enabled. Co-Admins
                cannot change Owner settings.
              </p>
            ) : null}

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={enabled}
                disabled={isOwnerAccount || !canEditTarget}
                onChange={(e) => setEnabled(e.target.checked)}
                className="rounded border-white/20"
              />
              <span className="text-sm text-white/80">Account enabled</span>
            </label>

            <div>
              <label className="admin-label block mb-1">New password</label>
              <input
                type="password"
                value={newPassword}
                disabled={!canEditTarget}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Leave blank to keep current"
                className="admin-input w-full max-w-xs"
              />
            </div>

            <fieldset
              disabled={isOwnerAccount || !canEditTarget}
              className="space-y-2 disabled:opacity-60"
            >
              <legend className="admin-label mb-3 block">Permissions</legend>
              <div className="grid gap-2 sm:grid-cols-2">
                {ADMIN_PERMISSION_KEYS.map((key) => (
                  <label
                    key={key}
                    className="flex items-start gap-2 text-sm text-white/75 cursor-pointer rounded-lg border border-white/8 px-3 py-2 hover:bg-white/[0.02]"
                  >
                    <input
                      type="checkbox"
                      checked={isOwnerAccount ? true : draftPerms[key]}
                      disabled={isOwnerAccount || !canEditTarget}
                      onChange={(e) =>
                        setDraftPerms({
                          ...draftPerms,
                          [key]: e.target.checked,
                        })
                      }
                      className="mt-0.5 rounded border-white/20"
                    />
                    <span>{PERMISSION_LABELS[key as AdminPermission]}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="flex flex-wrap gap-2 pt-2">
              <button
                type="button"
                onClick={save}
                disabled={saving || !canEditTarget}
                className="admin-btn admin-btn--primary"
              >
                {saving ? "Saving…" : "Save user"}
              </button>
              {selected.id !== OWNER_USER_ID && canDeleteUser(selected.id) ? (
                <button
                  type="button"
                  className="admin-btn admin-btn--ghost text-red-300/90"
                  disabled={!canEditTarget}
                  onClick={async () => {
                    if (
                      !confirm(
                        `Remove user ${selected.displayName}? This cannot be undone.`
                      )
                    ) {
                      return;
                    }
                    const res = await fetch("/api/admin/users", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        ...getAdminAuthHeaders(),
                      },
                      body: JSON.stringify({
                        userId: selected.id,
                        delete: true,
                      }),
                    });
                    if (res.ok) {
                      setSelectedId(null);
                      await load();
                    }
                  }}
                >
                  Delete user
                </button>
              ) : null}
            </div>
          </div>
        ) : (
          <p className="text-white/40 text-sm">Select a user</p>
        )}
      </div>
    </div>
  );
}
