"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import {
  clearMemberSession,
  isMemberSessionActive,
  setMemberSession,
  setStoredMemberToken,
  setStoredMemberUser,
} from "@/lib/members/auth-client";
import type { MemberPublicProfile } from "@/lib/members/types";

export function MembersLoginForm({ mode }: { mode: "login" | "register" }) {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [country, setCountry] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isMemberSessionActive()) {
      router.replace("/members/dashboard");
    }
  }, [router]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const endpoint =
        mode === "login" ? "/api/members/login" : "/api/members/register";
      const body =
        mode === "login"
          ? { username, password }
          : { username, email, password, displayName, country };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = (await res.json()) as {
        error?: string;
        user?: MemberPublicProfile;
        sessionToken?: string;
        expiresAt?: string;
      };

      if (!res.ok || !data.user || !data.sessionToken || !data.expiresAt) {
        setError(data.error || "Authentication failed.");
        return;
      }

      setStoredMemberToken(data.sessionToken);
      setStoredMemberUser(data.user);
      setMemberSession(true, data.expiresAt);
      router.replace("/members/dashboard");
    } catch {
      clearMemberSession();
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="members-auth">
      <div className="members-auth-panel">
        <p className="members-brand-eyebrow">Restricted access</p>
        <h1 className="members-auth-title">Haunted Sweden</h1>
        <p className="members-auth-lead">
          {mode === "login"
            ? "Enter the Members investigation archive."
            : "Request access to the private investigation platform."}
        </p>

        <form onSubmit={onSubmit} className="members-auth-form">
          {mode === "register" ? (
            <>
              <label className="members-label">
                Display name
                <input
                  className="members-input"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  autoComplete="nickname"
                />
              </label>
              <label className="members-label">
                Email
                <input
                  className="members-input"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </label>
              <label className="members-label">
                Country
                <input
                  className="members-input"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  autoComplete="country-name"
                />
              </label>
            </>
          ) : null}

          <label className="members-label">
            Username
            <input
              className="members-input"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />
          </label>
          <label className="members-label">
            Password
            <input
              className="members-input"
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={
                mode === "login" ? "current-password" : "new-password"
              }
            />
          </label>

          {error ? <p className="members-error">{error}</p> : null}

          <button
            type="submit"
            className="members-btn members-btn--primary"
            disabled={loading}
          >
            {loading
              ? "Please wait…"
              : mode === "login"
                ? "Enter archive"
                : "Create account"}
          </button>
        </form>

        <p className="members-auth-switch">
          {mode === "login" ? (
            <>
              No access yet?{" "}
              <Link href="/members/register">Register</Link>
            </>
          ) : (
            <>
              Already a member?{" "}
              <Link href="/members/login">Log in</Link>
            </>
          )}
        </p>
        <Link href="/" className="members-exit-link">
          ← Public site
        </Link>
      </div>
    </div>
  );
}
