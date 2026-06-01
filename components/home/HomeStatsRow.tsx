"use client";

import { Ghost, ImageIcon, Users, Video } from "lucide-react";
import type { HomepageStats } from "@/lib/homepage-stats";
import { useLanguage } from "@/lib/language-context";

function StatCard({
  icon: Icon,
  value,
  label,
  sublabel,
}: {
  icon: typeof Ghost;
  value: string | number;
  label: string;
  sublabel?: string;
}) {
  return (
    <div className="home-stat-card group flex min-w-[140px] flex-1 flex-col items-center rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-center transition-all duration-300 hover:border-violet-500/35 hover:bg-violet-950/20 hover:shadow-[0_0_24px_rgba(139,92,246,0.12)] sm:min-w-0 sm:px-5 sm:py-5">
      <Icon
        className="mb-2 h-5 w-5 text-violet-400/90 transition-transform duration-300 group-hover:scale-110"
        aria-hidden
      />
      <p
        className="text-2xl font-bold tabular-nums text-white sm:text-3xl"
        style={{ fontFamily: "var(--font-display), serif" }}
      >
        {value}
      </p>
      <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-white/70">
        {label}
      </p>
      {sublabel ? (
        <p className="mt-0.5 text-[10px] text-violet-300/80">{sublabel}</p>
      ) : null}
    </div>
  );
}

export function HomeStatsRow({ stats }: { stats: HomepageStats }) {
  const { t } = useLanguage();
  const hs = t.homeStats;

  return (
    <div className="mx-auto max-w-4xl">
      <div className="flex gap-2 overflow-x-auto pb-1 snap-x snap-mandatory sm:grid sm:grid-cols-4 sm:gap-3 sm:overflow-visible">
        <StatCard
          icon={Ghost}
          value={stats.locationCount}
          label={hs.locations}
        />
        <StatCard
          icon={ImageIcon}
          value={stats.photoCount > 0 ? stats.photoCount : "—"}
          label={hs.photos}
          sublabel={stats.photoCount > 0 ? undefined : hs.comingSoon}
        />
        <StatCard
          icon={Video}
          value={stats.videoCount > 0 ? stats.videoCount : "—"}
          label={hs.videos}
          sublabel={stats.videoCount > 0 ? undefined : hs.comingSoon}
        />
        <StatCard
          icon={Users}
          value={stats.reportCount > 0 ? stats.reportCount : "—"}
          label={hs.reports}
          sublabel={
            stats.reportCount > 0 ? undefined : t.homeMedia.placeholders.reports
          }
        />
      </div>
      <p className="mt-4 text-center text-sm text-white/55">
        {stats.belowLocationGoal
          ? t.homeLocationProgress.building
          : t.homeLocationProgress.ready(stats.locationCount)}
      </p>
    </div>
  );
}
