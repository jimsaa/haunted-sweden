"use client";

import { useState } from "react";
import { Lock } from "lucide-react";
import {
  setAdminSession,
  setStoredAdminCredentials,
  setStoredAdminUser,
} from "@/lib/admin/auth";
import { loginAdminClient } from "@/lib/admin/auth-client";
import type { AdminPublicUser } from "@/lib/admin/users-types";

export function AdminLogin({
  onSuccess,
}: {
  onSuccess: (user: AdminPublicUser) => void;
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const result = await loginAdminClient(username, password);
    setLoading(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setAdminSession(true, result.user.id);
    setStoredAdminCredentials(username, password);
    setStoredAdminUser(result.user);
    onSuccess(result.user);
  };

  return (
    <div className="admin-login flex min-h-[70vh] items-center justify-center px-4">
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-2xl border border-violet-500/25 bg-[#0c0c14] p-8 shadow-2xl shadow-violet-950/30"
      >
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600/20 border border-violet-500/30">
            <Lock className="h-5 w-5 text-violet-300" aria-hidden />
          </div>
          <div>
            <h1
              className="text-lg font-bold text-violet-100"
              style={{ fontFamily: "var(--font-display), serif" }}
            >
              Haunted Sweden Admin
            </h1>
            <p className="text-xs text-white/45">Local development only</p>
          </div>
        </div>
        <label className="admin-label">
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError("");
            }}
            className="admin-input mt-1"
            autoComplete="username"
            autoFocus
          />
        </label>
        <label className="admin-label mt-4 block">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            className="admin-input mt-1"
            autoComplete="current-password"
          />
        </label>
        {error ? (
          <p className="mt-2 text-sm text-red-400" role="alert">
            {error}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={loading}
          className="admin-btn admin-btn--primary mt-6 w-full"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
        <p className="mt-4 text-[11px] leading-relaxed text-white/35">
          TODO: Replace local password admin with real authentication (Supabase
          Auth) before scaling. Default users: Jim (Owner), Maria (Co-Admin).
        </p>
      </form>
    </div>
  );
}
