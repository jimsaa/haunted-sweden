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
  setStoredAdminUser,
} from "@/lib/admin/auth";
import type { AdminPublicUser } from "@/lib/admin/users-types";
import type { AdminPermissionsMap } from "@/lib/admin/permissions";
import { getTranslations } from "@/lib/i18n";
import { useLanguage } from "@/lib/language-context";

type MessageKind = "success" | "error" | null;

export function AdminUsersPanel({
  onUserUpdated,
}: {
  onUserUpdated?: () => void;
}) {
  const { locale } = useLanguage();
  const t = getTranslations(locale).adminUsers;
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
  const [messageKind, setMessageKind] = useState<MessageKind>(null);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);

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
      const data = (await res.json().catch(() => ({}))) as {
        users?: AdminPublicUser[];
        error?: string;
        errorSv?: string;
      };
      if (!res.ok) {
        throw new Error(
          locale === "sv"
            ? data.errorSv ?? data.error ?? t.loadFailed
            : data.error ?? t.loadFailed
        );
      }
      const list = data.users ?? [];
      setUsers(list);
      if (process.env.NODE_ENV === "development") {
        console.log("[AdminUsersPanel] Loaded users:", list.length);
      }
      setSelectedId((prev) => {
        if (prev && list.some((u) => u.id === prev)) return prev;
        return list[0]?.id ?? null;
      });
      setMessage(null);
      setMessageKind(null);
    } catch (e) {
      const errMsg = e instanceof Error ? e.message : t.loadFailed;
      console.error("[AdminUsersPanel] Load failed:", e);
      setMessage(errMsg);
      setMessageKind("error");
    } finally {
      setLoading(false);
    }
  }, [locale, t.loadFailed]);

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
    setDirty(false);
  }, [selected?.id, selected?.permissions, selected?.enabled]);

  const markDirty = () => setDirty(true);

  const save = async () => {
    if (!selected || !draftPerms) return;
    setSaving(true);
    setMessage(null);
    setMessageKind(null);
    try {
      if (process.env.NODE_ENV === "development") {
        console.log("[AdminUsersPanel] Saving user settings:", selected.id);
      }

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
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        errorSv?: string;
        user?: AdminPublicUser;
      };
      if (!res.ok) {
        const errMsg =
          locale === "sv"
            ? data.errorSv ?? data.error ?? t.saveFailed
            : data.error ?? t.saveFailed;
        console.error("[AdminUsersPanel] Save failed:", data);
        throw new Error(errMsg);
      }

      if (process.env.NODE_ENV === "development") {
        console.log("[AdminUsersPanel] Save success:", selected.id);
      }

      if (data.user) {
        const stored = getStoredAdminUser();
        if (stored?.id === data.user.id) {
          setStoredAdminUser(data.user);
        }
      }

      setMessage(t.saved);
      setMessageKind("success");
      setDirty(false);
      setNewPassword("");
      await load();
      onUserUpdated?.();
    } catch (e) {
      const errMsg = e instanceof Error ? e.message : t.saveFailed;
      console.error("[AdminUsersPanel] Save error:", e);
      setMessage(errMsg);
      setMessageKind("error");
    } finally {
      setSaving(false);
    }
  };

  if (!actor || !clientHasPermission(actor, "manage_users")) {
    return (
      <div className="flex flex-1 items-center justify-center p-8 text-white/40 text-sm">
        {t.noPermission}
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center text-white/40 text-sm">
        {t.loading}
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

      <div className="flex flex-1 flex-col min-h-0 min-w-0">
        {selected && draftPerms ? (
          <div className="shrink-0 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 sm:px-6 py-3 bg-[#0a0a12]/90">
            <header>
              <h3 className="text-lg font-semibold text-violet-100">
                {selected.displayName}
              </h3>
              <p className="text-sm text-white/45 mt-0.5">
                @{selected.username} ·{" "}
                <span
                  className={`admin-role-pill admin-role-pill--${selected.role}`}
                >
                  {ROLE_LABELS[selected.role]}
                </span>
                {dirty ? (
                  <span className="ml-2 text-amber-300/90 text-xs">
                    · {locale === "sv" ? "Osparade ändringar" : "Unsaved changes"}
                  </span>
                ) : null}
              </p>
            </header>
            <button
              type="button"
              onClick={save}
              disabled={saving || !canEditTarget}
              className="admin-btn admin-btn--primary shrink-0"
            >
              {saving ? t.saving : t.saveUser}
            </button>
          </div>
        ) : null}

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 min-h-0">
        {selected && draftPerms ? (
          <div className="max-w-2xl space-y-6 pb-24">

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
                onChange={(e) => {
                  setEnabled(e.target.checked);
                  markDirty();
                }}
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
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  if (e.target.value.trim()) markDirty();
                }}
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
                      onChange={(e) => {
                        setDraftPerms({
                          ...draftPerms,
                          [key]: e.target.checked,
                        });
                        markDirty();
                      }}
                      className="mt-0.5 rounded border-white/20"
                    />
                    <span>{PERMISSION_LABELS[key as AdminPermission]}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            {selected.id !== OWNER_USER_ID && canDeleteUser(selected.id) ? (
              <div className="flex flex-wrap gap-2 pt-2">
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
                    setMessage(null);
                    setMessageKind(null);
                    try {
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
                      const data = (await res.json().catch(() => ({}))) as {
                        error?: string;
                        errorSv?: string;
                      };
                      if (!res.ok) {
                        throw new Error(
                          locale === "sv"
                            ? data.errorSv ?? data.error ?? t.saveFailed
                            : data.error ?? t.saveFailed
                        );
                      }
                      setSelectedId(null);
                      await load();
                    } catch (e) {
                      console.error("[AdminUsersPanel] Delete failed:", e);
                      setMessage(
                        e instanceof Error ? e.message : t.saveFailed
                      );
                      setMessageKind("error");
                    }
                  }}
                >
                  Delete user
                </button>
              </div>
            ) : null}
          </div>
        ) : (
          <p className="text-white/40 text-sm">{t.selectUser}</p>
        )}
        </div>

        {selected && draftPerms ? (
          <div className="shrink-0 sticky bottom-0 z-10 border-t border-white/10 bg-[#0a0a12]/95 backdrop-blur-sm px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
            {message ? (
              <p
                role="status"
                className={`text-sm flex-1 min-w-[12rem] ${
                  messageKind === "success"
                    ? "text-emerald-200/95"
                    : "text-red-200/95"
                }`}
              >
                {message}
              </p>
            ) : (
              <p className="text-xs text-white/35 flex-1">
                {locale === "sv"
                  ? "Klicka Spara för att behålla ändringar."
                  : "Click Save to keep your changes."}
              </p>
            )}
            <button
              type="button"
              onClick={save}
              disabled={saving || !canEditTarget}
              className="admin-btn admin-btn--primary shrink-0"
            >
              {saving ? t.saving : t.saveUser}
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
