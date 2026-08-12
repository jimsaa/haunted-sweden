"use client";

import { useCallback, useEffect, useState } from "react";
import { Mail, RefreshCw } from "lucide-react";
import { getAdminAuthHeaders } from "@/lib/admin/auth";

type EmailSignupStats = {
  communityWaitlist: number;
  bookNewsletter: number;
  archiveStoryEmails: number;
  totalListRows: number;
  uniqueEmails: number;
};

export function AdminEmailSignupBanner() {
  const [stats, setStats] = useState<EmailSignupStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/email-signups", {
        headers: getAdminAuthHeaders(),
      });
      const data = (await res.json()) as {
        stats?: EmailSignupStats;
        error?: string;
      };
      if (!res.ok) throw new Error(data.error ?? "Load failed");
      setStats(data.stats ?? null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Load failed");
      setStats(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (loading && !stats) {
    return (
      <div className="admin-email-banner admin-email-banner--loading">
        <Mail className="h-4 w-4 shrink-0 opacity-70" aria-hidden />
        <span>Loading email waitlist stats…</span>
      </div>
    );
  }

  if (error && !stats) {
    return (
      <div className="admin-email-banner admin-email-banner--error">
        <Mail className="h-4 w-4 shrink-0" aria-hidden />
        <span>Email waitlist stats unavailable ({error}).</span>
        <button type="button" onClick={load} className="admin-email-banner-btn">
          Retry
        </button>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="admin-email-banner" role="status">
      <Mail className="h-4 w-4 shrink-0 text-emerald-300" aria-hidden />
      <div className="admin-email-banner-body">
        <strong>{stats.uniqueEmails} unique emails collected</strong>
        <span className="admin-email-banner-detail">
          Community waitlist {stats.communityWaitlist} · Book newsletter{" "}
          {stats.bookNewsletter} · Archive stories {stats.archiveStoryEmails}
          {stats.totalListRows > stats.uniqueEmails
            ? ` (${stats.totalListRows} total signups incl. duplicates)`
            : null}
        </span>
        <span className="admin-email-banner-note">
          Members area not open yet — emails stored for launch outreach.
        </span>
      </div>
      <button
        type="button"
        onClick={load}
        disabled={loading}
        className="admin-email-banner-btn"
        title="Refresh counts"
      >
        <RefreshCw
          className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`}
          aria-hidden
        />
      </button>
    </div>
  );
}
