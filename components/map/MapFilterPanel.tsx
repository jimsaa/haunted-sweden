"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { CATEGORY_IDS } from "@/lib/homepage-data";
import type { CategoryFilterId } from "@/lib/categories";
import {
  FUTURE_DISCOVERY_FILTERS,
  type DiscoveryFilterId,
  type DiscoveryFilterState,
} from "@/lib/discovery-filters";
import {
  SPOKJAKT_MAP_FILTERS,
  type SpokjaktMapFilterId,
  type SpokjaktFilterState,
} from "@/lib/spokjakt-filters";
import type { getTranslations } from "@/lib/i18n";

type T = ReturnType<typeof getTranslations>;

const CHIP_ACTIVE =
  "bg-violet-600/30 border-violet-500/50 text-violet-100 shadow-[0_0_12px_rgba(139,92,246,0.2)]";
const CHIP_IDLE =
  "border-white/15 text-white/60 hover:border-white/30 hover:text-white";
const CHIP_AMBER_ACTIVE =
  "bg-amber-600/25 border-amber-500/40 text-amber-100";

function FilterChip({
  active,
  onClick,
  disabled,
  children,
  variant = "violet",
}: {
  active: boolean;
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  variant?: "violet" | "amber";
}) {
  const activeClass =
    variant === "amber" ? CHIP_AMBER_ACTIVE : CHIP_ACTIVE;
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`rounded-full px-3 py-1.5 text-xs font-medium border transition-colors ${
        disabled
          ? "border-white/10 text-white/30 cursor-not-allowed"
          : active
            ? activeClass
            : CHIP_IDLE
      }`}
    >
      {children}
    </button>
  );
}

export function MapFilterPanel({
  open,
  onClose,
  t,
  activeCategory,
  discovery,
  spokjaktFilters,
  onToggleDiscovery,
  onToggleSpokjakt,
  spokjaktBanner,
}: {
  open: boolean;
  onClose: () => void;
  t: T;
  activeCategory: CategoryFilterId | null;
  discovery: DiscoveryFilterState;
  spokjaktFilters: SpokjaktFilterState;
  onToggleDiscovery: (id: DiscoveryFilterId) => void;
  onToggleSpokjakt: (id: SpokjaktMapFilterId) => void;
  spokjaktBanner?: React.ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    const mq = window.matchMedia("(max-width: 767px)");
    const lock = () => {
      if (mq.matches) document.body.style.overflow = "hidden";
    };
    lock();
    mq.addEventListener("change", lock);
    return () => {
      document.body.style.overflow = prev;
      mq.removeEventListener("change", lock);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      <button
        type="button"
        className="map-filter-backdrop fixed inset-0 z-40 bg-black/55 md:bg-transparent md:pointer-events-none"
        aria-label={t.mapToolbar.closePanel}
        onClick={onClose}
      />
      <div
        className="map-filter-panel fixed inset-x-0 bottom-0 z-50 flex max-h-[min(78dvh,520px)] flex-col rounded-t-2xl border border-white/15 bg-[#0c0c14] shadow-2xl shadow-black/60 md:absolute md:inset-auto md:right-0 md:top-[calc(100%+6px)] md:max-h-[min(70vh,440px)] md:w-[min(calc(100vw-2rem),400px)] md:rounded-xl md:bottom-auto"
        role="dialog"
        aria-modal="true"
        aria-label={t.filters.title}
      >
        <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3 shrink-0 md:hidden">
          <h2 className="text-sm font-semibold text-white">{t.filters.title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-white/60 hover:bg-white/10 hover:text-white"
            aria-label={t.mapToolbar.closePanel}
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>

        <div className="map-filter-panel-scroll overflow-y-auto overscroll-contain px-4 py-3 space-y-5">
          <section>
            <h3 className="text-[10px] font-semibold uppercase tracking-wider text-white/45 mb-2">
              {t.mapToolbar.sectionCategories}
            </h3>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/map"
                onClick={onClose}
                className={`rounded-full px-3 py-1.5 text-xs font-medium border transition-colors ${
                  !activeCategory ? CHIP_ACTIVE : CHIP_IDLE
                }`}
              >
                {t.allCategories}
              </Link>
              {CATEGORY_IDS.map((id) => {
                const label =
                  t.categoryLabels[id as keyof typeof t.categoryLabels] ?? id;
                return (
                  <Link
                    key={id}
                    href={`/map?category=${id}`}
                    onClick={onClose}
                    className={`rounded-full px-3 py-1.5 text-xs font-medium border transition-colors ${
                      activeCategory === id ? CHIP_ACTIVE : CHIP_IDLE
                    }`}
                  >
                    {label}
                  </Link>
                );
              })}
            </div>
          </section>

          <section>
            <h3 className="text-[10px] font-semibold uppercase tracking-wider text-white/45 mb-2">
              {t.mapToolbar.sectionSpokjakt}
            </h3>
            <div className="flex flex-wrap gap-2">
              {SPOKJAKT_MAP_FILTERS.map((id) => {
                const label =
                  t.spokjakt.mapFilters[id as keyof typeof t.spokjakt.mapFilters];
                const active = Boolean(
                  {
                    "seen-in-spokjakt": spokjaktFilters.seenInSpokjakt,
                    "laxton-investigated": spokjaktFilters.laxtonInvestigated,
                    "haunted-sweden-verified":
                      spokjaktFilters.hauntedSwedenVerified,
                    "premium-investigation":
                      spokjaktFilters.premiumInvestigation,
                    "overnight-stay": spokjaktFilters.overnightStay,
                  }[id]
                );
                return (
                  <FilterChip
                    key={id}
                    active={active}
                    onClick={() => onToggleSpokjakt(id)}
                  >
                    {label}
                  </FilterChip>
                );
              })}
            </div>
            {spokjaktBanner ? (
              <div className="mt-3">{spokjaktBanner}</div>
            ) : null}
          </section>

          <section>
            <h3 className="text-[10px] font-semibold uppercase tracking-wider text-white/45 mb-2">
              {t.mapToolbar.sectionFeatures}
            </h3>
            <div className="flex flex-wrap gap-2">
              {FUTURE_DISCOVERY_FILTERS.map((id) => {
                const label = t.discoveryFilters[id];
                const isNearby = id === "nearby-me";
                const active =
                  !isNearby &&
                  Boolean(
                    {
                      "haunted-sweden-verified":
                        discovery.hauntedSwedenVerified,
                      "family-friendly": discovery.familyFriendly,
                      "public-access": discovery.publicAccess,
                      "night-access": discovery.nightAccess,
                      "free-access": discovery.freeAccess,
                      "overnight-stay": discovery.overnightStay,
                    }[id]
                  );
                return (
                  <FilterChip
                    key={id}
                    active={active}
                    disabled={isNearby}
                    variant="amber"
                    onClick={() => onToggleDiscovery(id)}
                  >
                    {label}
                    {isNearby && (
                      <span className="ml-1 opacity-60">
                        · {t.discoveryFilters.comingSoon}
                      </span>
                    )}
                  </FilterChip>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
