"use client";

import { useState } from "react";
import { Lock } from "lucide-react";
import { setAdminSession, setStoredAdminPassword } from "@/lib/admin/auth";
import { verifyAdminPasswordClient } from "@/lib/admin/auth-client";

export function AdminLogin({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifyAdminPasswordClient(password)) {
      setError("Incorrect password");
      return;
    }
    setAdminSession(true);
    setStoredAdminPassword(password);
    onSuccess();
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
          Admin password
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            className="admin-input mt-1"
            autoComplete="current-password"
            autoFocus
          />
        </label>
        {error ? (
          <p className="mt-2 text-sm text-red-400" role="alert">
            {error}
          </p>
        ) : null}
        <button type="submit" className="admin-btn admin-btn--primary mt-6 w-full">
          Unlock admin
        </button>
        <p className="mt-4 text-[11px] leading-relaxed text-white/35">
          TODO: Replace with proper authentication before production. This gate
          is not secure for public deployment.
        </p>
      </form>
    </div>
  );
}
