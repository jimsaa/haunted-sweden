"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ExternalLink, Search, Tv } from "lucide-react";
import { OfficialSpokjaktPlaylist } from "@/components/spokjakt/OfficialSpokjaktPlaylist";
import { useLanguage } from "@/lib/language-context";
import {
  getSpokjaktArchive,
  getSpokjaktEntries,
  getSpokjaktTop10,
} from "@/lib/spokjakt-archive";
import type { SpokjaktArchiveEntry, SpokjaktPriority } from "@/lib/types/spokjakt";

const SEASONS = [2, 3, 6] as const;

function priorityClass(p: SpokjaktPriority): string {
  switch (p) {
    case "LEGENDARY":
      return "bg-amber-600/25 border-amber-500/40 text-amber-100";
    case "HIGH_PRIORITY":
      return "bg-violet-600/25 border-violet-500/40 text-violet-100";
    default:
      return "bg-white/10 border-white/20 text-white/70";
  }
}

function priorityLabel(
  p: SpokjaktPriority,
  t: ReturnType<typeof useLanguage>["t"]
): string {
  switch (p) {
    case "LEGENDARY":
      return t.spokjakt.priorityLegendary;
    case "HIGH_PRIORITY":
      return t.spokjakt.priorityHigh;
    default:
      return t.spokjakt.priorityDiscovery;
  }
}

function EntryCard({
  entry,
  topRank,
}: {
  entry: SpokjaktArchiveEntry;
  topRank?: number;
}) {
  const { t } = useLanguage();
  const st = t.spokjakt;

  return (
    <article
      id={entry.slug}
      className="scroll-mt-24 rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden"
    >
      <div className="p-5 sm:p-6 border-b border-white/10">
        <div className="flex flex-wrap items-start gap-2 justify-between">
          <div>
            {topRank != null && (
              <span className="text-xs font-bold text-amber-400/90 mb-1 block">
                #{topRank} {st.top10Title.split("—")[0].trim()}
              </span>
            )}
            <h2
              className="text-xl font-bold"
              style={{ fontFamily: "var(--font-display), serif" }}
            >
              {entry.locationName}
            </h2>
            <p className="mt-1 text-sm text-white/50">
              {st.seasonEpisode(entry.season, entry.seasonEpisode)}
              {entry.isRevisit && entry.revisitOfSeason != null && (
                <span className="text-violet-400/80">
                  {" "}
                  · {st.revisit} (S{entry.revisitOfSeason})
                </span>
              )}
              {" · "}
              {entry.year}
            </p>
          </div>
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-medium border ${priorityClass(entry.priority)}`}
          >
            {priorityLabel(entry.priority, t)}
          </span>
        </div>
        <p className="mt-3 text-sm text-white/75 leading-relaxed">
          {entry.shortDescription}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {entry.hauntedSwedenPlaceSlug && (
            <Link
              href={`/places/${entry.hauntedSwedenPlaceSlug}`}
              className="inline-flex items-center gap-1 rounded-lg bg-violet-600/30 border border-violet-500/40 px-3 py-1.5 text-xs font-medium text-violet-100 hover:bg-violet-600/45"
            >
              {st.viewOnMap}
            </Link>
          )}
          {entry.visitorsCanAccess ? (
            <span className="text-xs text-emerald-400/80">{st.accessYes}</span>
          ) : (
            <span className="text-xs text-white/40">{st.accessNo}</span>
          )}
          {entry.hauntedSwedenScore != null && (
            <span className="text-xs text-white/50">
              {st.score}: {entry.hauntedSwedenScore}
            </span>
          )}
        </div>
      </div>

      <div className="p-5 sm:p-6 space-y-4 text-sm">
        <Section title={st.sections.documented} body={entry.documentedHistory} />
        <Section title={st.sections.witnesses} body={entry.witnessReports} />
        <Section title={st.sections.claims} body={entry.paranormalClaims} />
        <Section
          title={st.sections.highlights}
          body={entry.investigationHighlights}
        />
        <p className="text-white/55">
          <span className="text-white/70 font-medium">{st.sections.access}: </span>
          {entry.currentStatus}
          {entry.accessNotes ? ` — ${entry.accessNotes}` : ""}
        </p>
        <p className="text-white/55">
          <span className="text-white/70 font-medium">{st.teamLabel}: </span>
          {entry.visitedBy.join(", ")}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {entry.suggestedHauntedSwedenTags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-white/5 border border-white/10 px-2 py-0.5 text-xs text-white/50"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {entry.suggestedInvestigationTypes.map((type) => (
            <span
              key={type}
              className="rounded-md bg-violet-950/50 border border-violet-500/20 px-2 py-0.5 text-xs text-violet-200/80"
            >
              {type}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

function Section({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-wide text-violet-400/90 mb-1">
        {title}
      </h3>
      <p className="text-white/70 leading-relaxed">{body}</p>
    </div>
  );
}

export function SpokjaktArchiveClient() {
  const { t } = useLanguage();
  const st = t.spokjakt;
  const archive = getSpokjaktArchive();
  const entries = getSpokjaktEntries();
  const top10 = getSpokjaktTop10();

  const [query, setQuery] = useState("");
  const [season, setSeason] = useState<number | "all">("all");
  const [priority, setPriority] = useState<SpokjaktPriority | "all">("all");

  const entryById = useMemo(
    () => new Map(entries.map((e) => [e.id, e])),
    [entries]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return entries.filter((e) => {
      if (season !== "all" && e.season !== season) return false;
      if (priority !== "all" && e.priority !== priority) return false;
      if (!q) return true;
      const hay = [
        e.locationName,
        e.shortDescription,
        e.locationType,
        e.documentedHistory,
        String(e.season),
        String(e.year),
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [entries, query, season, priority]);

  return (
    <div className="px-4 py-6 sm:px-6 max-w-4xl mx-auto pb-16">
      <div className="flex items-center gap-3">
        <Tv className="h-8 w-8 text-violet-400 shrink-0" aria-hidden />
        <div>
          <h1
            className="text-2xl sm:text-3xl font-bold"
            style={{ fontFamily: "var(--font-display), serif" }}
          >
            {st.locationsTitle}
          </h1>
          <p className="mt-1 text-sm text-white/60 leading-relaxed max-w-2xl">
            {st.locationsSubtitle}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <OfficialSpokjaktPlaylist />
      </div>

      <p className="mt-4 text-xs text-amber-200/70 border border-amber-500/20 bg-amber-950/20 rounded-xl px-4 py-3">
        {st.disclaimer}
      </p>

      <section className="mt-8">
        <h2
          className="text-lg font-semibold mb-4"
          style={{ fontFamily: "var(--font-display), serif" }}
        >
          {st.top10FamousTitle}
        </h2>
        <ol className="space-y-2">
          {top10.map((item) => {
            const entry = entryById.get(item.archiveId);
            if (!entry) return null;
            return (
              <li key={item.archiveId}>
                <a
                  href={`#${entry.slug}`}
                  className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 hover:border-violet-500/30 transition-colors"
                >
                  <span className="text-lg font-bold text-violet-400 w-8 shrink-0">
                    {item.rank}
                  </span>
                  <div>
                    <p className="font-medium">{entry.locationName}</p>
                    <p className="text-xs text-white/50 mt-0.5">{item.rationale}</p>
                  </div>
                </a>
              </li>
            );
          })}
        </ol>
      </section>

      <div className="mt-10 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={st.searchPlaceholder}
            className="w-full rounded-xl border border-white/15 bg-white/[0.05] py-3 pl-10 pr-4 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-violet-500/50"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <select
            value={season === "all" ? "all" : String(season)}
            onChange={(e) =>
              setSeason(
                e.target.value === "all" ? "all" : Number(e.target.value)
              )
            }
            className="rounded-lg border border-white/15 bg-white/[0.05] px-3 py-2 text-xs text-white"
            aria-label={st.filterSeason}
          >
            <option value="all">{st.allSeasons}</option>
            {SEASONS.map((s) => (
              <option key={s} value={s}>
                {st.seasonOption(s)}
              </option>
            ))}
          </select>
          <select
            value={priority}
            onChange={(e) =>
              setPriority(e.target.value as SpokjaktPriority | "all")
            }
            className="rounded-lg border border-white/15 bg-white/[0.05] px-3 py-2 text-xs text-white"
            aria-label={st.filterPriority}
          >
            <option value="all">{st.allPriorities}</option>
            <option value="LEGENDARY">{st.priorityLegendary}</option>
            <option value="HIGH_PRIORITY">{st.priorityHigh}</option>
            <option value="DISCOVERY">{st.priorityDiscovery}</option>
          </select>
        </div>
      </div>

      <div className="mt-8 space-y-6">
        {filtered.length === 0 ? (
          <p className="text-center text-white/50 py-12">{st.noResults}</p>
        ) : (
          filtered.map((entry) => {
            const topItem = top10.find((t) => t.archiveId === entry.id);
            return (
              <EntryCard
                key={entry.id}
                entry={entry}
                topRank={topItem?.rank}
              />
            );
          })
        )}
      </div>

      <p className="mt-12 text-xs text-white/40 text-center">
        {st.archiveIndexed(archive.entries.length, archive.showInfo.name)} ·{" "}
        <a
          href="https://sv.wikipedia.org/wiki/Sp%C3%B6kjakt"
          className="inline-flex items-center gap-1 text-violet-400/80 hover:text-violet-300"
          target="_blank"
          rel="noopener noreferrer"
        >
          {st.wikipedia} <ExternalLink className="h-3 w-3" />
        </a>
      </p>
    </div>
  );
}
