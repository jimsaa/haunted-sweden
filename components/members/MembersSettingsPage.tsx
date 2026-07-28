"use client";

import { useEffect, useState } from "react";
import { getStoredMemberUser } from "@/lib/members/auth-client";
import type { MemberPublicProfile } from "@/lib/members/types";
import { memberTierLabel } from "@/lib/members/tiers";

export function MembersSettingsPage() {
  const [user, setUser] = useState<MemberPublicProfile | null>(null);

  useEffect(() => {
    setUser(getStoredMemberUser());
  }, []);

  return (
    <div className="members-page">
      <header className="members-page-header">
        <p className="members-eyebrow">Account</p>
        <h1 className="members-h1">Account settings</h1>
        <p className="members-lead">
          Manage membership, notifications, and account security.
        </p>
      </header>

      <section className="members-panel">
        <h2 className="members-h2">Account</h2>
        <dl className="members-dl">
          <div>
            <dt>Username</dt>
            <dd>{user?.username ?? "—"}</dd>
          </div>
          <div>
            <dt>Email</dt>
            <dd>{user?.email ?? "—"}</dd>
          </div>
          <div>
            <dt>Membership</dt>
            <dd>{user ? memberTierLabel(user.tier) : "—"}</dd>
          </div>
          <div>
            <dt>Role</dt>
            <dd>{user?.role ?? "—"}</dd>
          </div>
        </dl>
      </section>

      <section className="members-panel members-panel--placeholder">
        <h2 className="members-h2">Membership & billing</h2>
        <p className="members-muted">
          Stripe Customer Portal and checkout land in v2. Price IDs load from
          environment — never hardcoded in the UI.
        </p>
        <span className="members-status">Architecture ready · checkout in v2</span>
      </section>

      <section className="members-panel members-panel--placeholder">
        <h2 className="members-h2">Newsletter</h2>
        <p className="members-muted">
          Preference sync with archive / community newsletter lists (Supabase)
          arrives with billing + notification prefs.
        </p>
        <span className="members-status">Infrastructure reserved</span>
      </section>

      <section className="members-panel members-panel--placeholder">
        <h2 className="members-h2">Security</h2>
        <p className="members-muted">
          Password change, session revoke, and 2FA planned for later versions.
        </p>
        <span className="members-status">Placeholder</span>
      </section>
    </div>
  );
}
