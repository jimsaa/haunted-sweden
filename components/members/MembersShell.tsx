"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Archive,
  Award,
  BookOpen,
  LayoutDashboard,
  LogOut,
  Settings,
  ShoppingBag,
  Users,
  UserCircle,
} from "lucide-react";
import type { ReactNode } from "react";
import {
  clearMemberSession,
  getStoredMemberUser,
  isMemberSessionActive,
} from "@/lib/members/auth-client";
import { useEffect, useState } from "react";
import type { MemberPublicProfile } from "@/lib/members/types";

const NAV = [
  { href: "/members/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/members/profile", label: "My Profile", icon: UserCircle },
  {
    href: "/members/investigation",
    label: "Investigation Profile",
    icon: BookOpen,
  },
  { href: "/members/archives", label: "Book Archives", icon: Archive },
  { href: "/members/badges", label: "Badges", icon: Award },
  { href: "/members/community", label: "Community", icon: Users },
  { href: "/members/shop", label: "Shop", icon: ShoppingBag },
  { href: "/members/settings", label: "Account Settings", icon: Settings },
] as const;

function tierLabel(tier: string): string {
  return tier.charAt(0).toUpperCase() + tier.slice(1);
}

export function MembersShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<MemberPublicProfile | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!isMemberSessionActive()) {
      router.replace("/members/login");
      return;
    }
    setUser(getStoredMemberUser());
    setReady(true);
  }, [router, pathname]);

  function handleLogout() {
    clearMemberSession();
    void fetch("/api/members/logout", { method: "POST" });
    router.replace("/members/login");
  }

  if (!ready) {
    return (
      <div className="members-shell members-shell--loading">
        <p className="members-muted">Opening the investigation archive…</p>
      </div>
    );
  }

  return (
    <div className="members-shell">
      <aside className="members-sidebar" aria-label="Members navigation">
        <div className="members-brand">
          <p className="members-brand-eyebrow">Restricted access</p>
          <Link href="/members/dashboard" className="members-brand-title">
            Haunted Sweden
          </Link>
          <p className="members-brand-sub">Members Archive</p>
        </div>

        <nav className="members-nav">
          {NAV.map((item) => {
            const Icon = item.icon;
            const active =
              pathname === item.href || pathname?.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`members-nav-link${active ? " members-nav-link--active" : ""}`}
              >
                <Icon className="h-4 w-4 shrink-0" aria-hidden />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="members-sidebar-foot">
          {user ? (
            <div className="members-user-chip">
              <span className="members-user-name">{user.displayName}</span>
              <span className="members-tier-pill">{tierLabel(user.tier)}</span>
            </div>
          ) : null}
          <button
            type="button"
            onClick={handleLogout}
            className="members-logout-btn"
          >
            <LogOut className="h-4 w-4" aria-hidden />
            Log out
          </button>
          <Link href="/" className="members-exit-link">
            ← Public site
          </Link>
        </div>
      </aside>

      <div className="members-main">
        <header className="members-topbar">
          <p className="members-topbar-label">Investigation Platform</p>
          {user ? (
            <p className="members-topbar-user">
              {user.displayName} · @{user.username}
            </p>
          ) : null}
        </header>
        <main className="members-content">{children}</main>
      </div>
    </div>
  );
}
