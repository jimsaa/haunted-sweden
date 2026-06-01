"use client";

import { useCallback, useEffect, useState } from "react";
import { Lock } from "lucide-react";
import { AdminTurnstile } from "@/components/admin/AdminTurnstile";
import {
  LOGIN_ERROR_INVALID,
  LOGIN_ERROR_RATE_LIMIT,
} from "@/lib/admin/messages";
import {
  setAdminSession,
  setStoredAdminSessionToken,
  setStoredAdminUser,
  setStoredAdminCredentials,
} from "@/lib/admin/auth";
import {
  fetchLoginConfig,
  loginAdminClient,
} from "@/lib/admin/auth-client";
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
  const [requireCaptcha, setRequireCaptcha] = useState(false);
  const [turnstileSiteKey, setTurnstileSiteKey] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [failedAttempts, setFailedAttempts] = useState(0);

  useEffect(() => {
    void fetchLoginConfig().then((cfg) => {
      setTurnstileSiteKey(cfg.turnstileSiteKey);
    });
  }, []);

  const showCaptcha =
    Boolean(turnstileSiteKey) &&
    (requireCaptcha || failedAttempts >= 2);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (showCaptcha && !turnstileToken) {
      setError(LOGIN_ERROR_INVALID);
      setLoading(false);
      return;
    }

    const result = await loginAdminClient(
      username,
      password,
      turnstileToken ?? undefined
    );
    setLoading(false);

    if (!result.ok) {
      const nextFails = failedAttempts + 1;
      setFailedAttempts(nextFails);
      setRequireCaptcha(
        result.requireCaptcha ?? nextFails >= 2
      );
      setError(
        result.rateLimited ? LOGIN_ERROR_RATE_LIMIT : result.error
      );
      setTurnstileToken(null);
      return;
    }

    setAdminSession(true, result.user.id, result.expiresAt);
    setStoredAdminSessionToken(result.sessionToken);
    setStoredAdminCredentials(null, null);
    setStoredAdminUser(result.user);
    onSuccess(result.user);
  };

  const onTurnstileToken = useCallback((token: string | null) => {
    setTurnstileToken(token);
    if (token) setError("");
  }, []);

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
            <p className="text-xs text-white/45">Endast behöriga användare</p>
          </div>
        </div>
        <label className="admin-label">
          Användarnamn
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
          Lösenord
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

        {showCaptcha && turnstileSiteKey ? (
          <AdminTurnstile
            siteKey={turnstileSiteKey}
            onToken={onTurnstileToken}
            onExpire={() => setTurnstileToken(null)}
          />
        ) : null}

        {error ? (
          <p className="mt-2 text-sm text-red-400" role="alert">
            {error}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={loading || (showCaptcha && !turnstileToken)}
          className="admin-btn admin-btn--primary mt-6 w-full"
        >
          {loading ? "Loggar in…" : "Logga in"}
        </button>
        <p className="mt-4 text-[11px] leading-relaxed text-white/35">
          Sessionen gäller i 8 timmar. Inloggning är begränsad till Sverige i
          produktion.
        </p>
      </form>
    </div>
  );
}
