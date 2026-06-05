"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Filter, MapPin, Search, X } from "lucide-react";
import type { HauntedPlace } from "@/lib/types/place";
import { useLanguage } from "@/lib/language-context";
import { getPlaceCategoryLabel } from "@/lib/place-labels";
import { getClusterDisplayName } from "@/lib/cluster-i18n";
import { PlaceCoverImage } from "@/components/PlaceCoverImage";
import { isCategoryFilterId } from "@/lib/categories";
import { filterAndSearchPlaces } from "@/lib/place-filters";
import {
  applyDiscoveryFilters,
  type DiscoveryFilterId,
  type DiscoveryFilterState,
} from "@/lib/discovery-filters";
import {
  applySpokjaktFilters,
  type SpokjaktMapFilterId,
  type SpokjaktFilterState,
} from "@/lib/spokjakt-filters";
import {
  countActiveMapFilters,
  hasActiveMapFilters,
} from "@/lib/map-active-filters";
import {
  countSpokjaktOnMap,
  getSpokjaktStarterSlugs,
} from "@/lib/spokjakt-place";
import { SpokjaktBadge } from "@/components/spokjakt/SpokjaktBadge";
import { SwedenView } from "@/components/map/SwedenView";
import { MapViewToggle, type MapViewMode } from "@/components/map/MapViewToggle";
import { MapFilterPanel } from "@/components/map/MapFilterPanel";
import { MapLoadingFallback } from "@/components/map/MapLoadingFallback";
import { MapAmbienceToast } from "@/components/map/MapAmbienceToast";
import { useHauntedAmbience } from "@/components/map/HauntedAmbienceContext";

const HauntedMap = dynamic(
  () => import("@/components/map/HauntedMap").then((m) => m.HauntedMap),
  {
    ssr: false,
    loading: () => <MapLoadingFallback />,
  }
);

function isMapInteractionTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  return Boolean(
    target.closest(
      ".sweden-view-viewport, .haunted-map-frame .leaflet-container"
    )
  );
}

export function MapPageClient({ places }: { places: HauntedPlace[] }) {
  const { locale, t } = useLanguage();
  const ambience = useHauntedAmbience();
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const activeCategory = isCategoryFilterId(categoryParam)
    ? categoryParam
    : null;

  const [query, setQuery] = useState("");
  const [discovery, setDiscovery] = useState<DiscoveryFilterState>({});
  const [spokjaktFilters, setSpokjaktFilters] = useState<SpokjaktFilterState>(
    {}
  );
  const [focusedPlaceId, setFocusedPlaceId] = useState<string | null>(null);
  const [mapViewMode, setMapViewMode] = useState<MapViewMode>("sweden");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const spokjaktTotal = getSpokjaktStarterSlugs().length;
  const spokjaktOnMap = countSpokjaktOnMap(places);

  const activeFilterCount = countActiveMapFilters({
    category: activeCategory,
    discovery,
    spokjakt: spokjaktFilters,
  });

  const toggleSpokjakt = (id: SpokjaktMapFilterId) => {
    const key = {
      "seen-in-spokjakt": "seenInSpokjakt",
      "laxton-investigated": "laxtonInvestigated",
      "haunted-sweden-verified": "hauntedSwedenVerified",
      "premium-investigation": "premiumInvestigation",
      "overnight-stay": "overnightStay",
    }[id] as keyof SpokjaktFilterState;
    setSpokjaktFilters((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const toggleDiscovery = (id: DiscoveryFilterId) => {
    const key = {
      "haunted-sweden-verified": "hauntedSwedenVerified",
      "nearby-me": "nearbyMe",
      "family-friendly": "familyFriendly",
      "public-access": "publicAccess",
      "night-access": "nightAccess",
      "free-access": "freeAccess",
      "overnight-stay": "overnightStay",
    }[id] as keyof DiscoveryFilterState;

    if (id === "nearby-me") return;

    setDiscovery((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const clearAllFilters = () => {
    setQuery("");
    setDiscovery({});
    setSpokjaktFilters({});
    if (activeCategory) router.push("/map");
  };

  const filteredPlaces = useMemo(() => {
    const searched = filterAndSearchPlaces(places, {
      query,
      categoryFilterId: activeCategory,
    });
    const discovered = applyDiscoveryFilters(searched, discovery);
    return applySpokjaktFilters(discovered, spokjaktFilters);
  }, [places, query, activeCategory, discovery, spokjaktFilters]);

  const focusedPlace = useMemo(
    () =>
      focusedPlaceId
        ? filteredPlaces.find((p) => p.id === focusedPlaceId) ?? null
        : null,
    [focusedPlaceId, filteredPlaces]
  );

  const showSpokjaktBanner =
    spokjaktFilters.seenInSpokjakt ||
    spokjaktFilters.laxtonInvestigated ||
    spokjaktFilters.hauntedSwedenVerified ||
    spokjaktFilters.premiumInvestigation ||
    spokjaktFilters.overnightStay;

  const spokjaktBanner = showSpokjaktBanner ? (
    <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-violet-500/20 bg-violet-950/20 px-3 py-2.5 text-xs text-violet-200/90">
      <span>{t.spokjakt.mapBanner(spokjaktOnMap, spokjaktTotal)}</span>
      <Link
        href="/spokjakt"
        className="font-medium text-violet-300 hover:text-violet-100 shrink-0"
      >
        {t.spokjakt.exploreAllSpokjakt} →
      </Link>
    </div>
  ) : undefined;

  const handleMapPointerDown = (e: React.PointerEvent) => {
    if (!isMapInteractionTarget(e.target)) return;
    ambience?.activateFromMapInteraction();
  };

  const mapBlock = (
    <>
      <div className="map-view-toggle-overlay pointer-events-none absolute left-2 top-2 z-[25] flex flex-col gap-2 sm:left-3 sm:top-3">
        <div className="pointer-events-auto">
          <MapViewToggle
            mode={mapViewMode}
            onChange={setMapViewMode}
            labels={t.mapViewMode}
            ariaLabel={t.a11y.mapViewMode}
            overlay
          />
        </div>
      </div>

      <MapAmbienceToast />

      {mapViewMode === "sweden" ? (
        <SwedenView
          places={filteredPlaces}
          focusedPlace={focusedPlace}
          selectedPlaceId={focusedPlaceId}
          onSelectPlace={setFocusedPlaceId}
          resetLabel={t.resetSwedenView}
          regionLabels={t.swedenRegions}
          controlLabels={t.swedenViewControls}
          a11yLabels={t.a11y}
          locale={locale}
          clusterAriaLabel={t.common.clusterLocations}
          popupLabels={{
            locale,
            viewDetails: t.mapPopup.viewDetails,
            hauntingLevel: t.mapPopup.hauntingLevel,
            cityRegion: t.swedenPopup.cityRegion,
            category: t.mapPopup.category,
            verification: t.swedenPopup.verification,
            metadata: t.swedenPopup.metadata,
            close: t.swedenPopup.close,
            badgeTooltips: t.swedenPopup.badgeTooltips,
          }}
          badgeLabels={t.mapLegend.badges}
        />
      ) : (
        <HauntedMap
          places={filteredPlaces}
          focusedPlace={focusedPlace}
          selectedPlaceId={focusedPlaceId}
          onSelectPlace={setFocusedPlaceId}
          resetMapLabel={t.resetMapToSweden}
          popupLabels={{
            locale,
            viewDetails: t.mapPopup.viewDetails,
            hauntingLevel: t.mapPopup.hauntingLevel,
            city: t.mapPopup.city,
            category: t.mapPopup.category,
            featured: t.common.featured,
          }}
          badgeLabels={t.mapLegend.badges}
        />
      )}
    </>
  );

  return (
    <div className="map-page px-4 pt-3 pb-6 sm:px-6 max-w-6xl mx-auto">
      <header className="map-page-toolbar">
        <div className="flex items-baseline justify-between gap-3 min-h-0">
          <h1
            className="text-xl sm:text-2xl font-bold leading-tight truncate"
            style={{ fontFamily: "var(--font-display), serif" }}
          >
            {t.exploreMap}
          </h1>
          <p className="text-xs text-white/55 shrink-0 tabular-nums">
            {t.mapLocationCount(filteredPlaces.length)}
            {(query || activeCategory || hasActiveMapFilters(activeFilterCount)) &&
              filteredPlaces.length !== places.length && (
                <span className="text-white/35">
                  {t.common.mapTotalSuffix(places.length)}
                </span>
              )}
          </p>
        </div>

        <div className="mt-2 flex items-center gap-2">
          <div className="relative min-w-0 flex-1">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/40 pointer-events-none" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full rounded-lg border border-white/15 bg-white/[0.05] py-2 pl-8 pr-8 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30"
              aria-label={t.searchPlaceholder}
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                aria-label={t.common.clearSearch}
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() => setFiltersOpen((o) => !o)}
              className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-semibold transition-colors ${
                filtersOpen || activeFilterCount > 0
                  ? "border-violet-500/50 bg-violet-600/25 text-violet-100"
                  : "border-white/15 bg-white/[0.05] text-white/80 hover:border-white/30"
              }`}
              aria-expanded={filtersOpen}
              aria-haspopup="dialog"
            >
              <Filter className="h-3.5 w-3.5" aria-hidden />
              {t.mapToolbar.filter}
              {activeFilterCount > 0 && (
                <span className="min-w-[1.125rem] rounded-full bg-violet-500 px-1 text-center text-[10px] font-bold text-white">
                  {activeFilterCount}
                </span>
              )}
            </button>
            <MapFilterPanel
              open={filtersOpen}
              onClose={() => setFiltersOpen(false)}
              t={t}
              activeCategory={activeCategory}
              discovery={discovery}
              spokjaktFilters={spokjaktFilters}
              onToggleDiscovery={toggleDiscovery}
              onToggleSpokjakt={toggleSpokjakt}
              spokjaktBanner={spokjaktBanner}
            />
          </div>

          <button
            type="button"
            onClick={clearAllFilters}
            disabled={
              !query &&
              !activeCategory &&
              !hasActiveMapFilters(activeFilterCount)
            }
            className="shrink-0 rounded-lg border border-white/15 bg-white/[0.05] px-3 py-2 text-xs font-semibold text-white/70 transition-colors hover:border-white/30 hover:text-white disabled:opacity-35 disabled:pointer-events-none"
          >
            {t.mapToolbar.clear}
          </button>
        </div>

        {activeFilterCount > 0 && (
          <p className="mt-1.5 text-[10px] text-violet-300/80 truncate">
            {t.mapToolbar.activeFilters(activeFilterCount)}
          </p>
        )}
      </header>

      <div
        className="map-stage relative mt-3"
        onPointerDownCapture={handleMapPointerDown}
      >
        {mapBlock}
      </div>

      {filteredPlaces.length === 0 ? (
        <p className="mt-6 text-center text-sm text-white/50">
          {t.noSearchResults}
        </p>
      ) : (
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {filteredPlaces.map((place) => (
            <li key={place.id} className="relative">
              <button
                type="button"
                onClick={() => {
                  setFocusedPlaceId(place.id);
                  setMapViewMode("sweden");
                }}
                className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-black/60 text-violet-300 backdrop-blur-sm transition-colors hover:border-violet-500/50 hover:bg-violet-950/70 hover:text-white"
                title={t.showOnMap}
                aria-label={t.showOnMap}
              >
                <MapPin className="h-4 w-4" aria-hidden />
              </button>
              <Link
                href={`/places/${place.slug}`}
                className="block overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] hover:border-violet-500/40 transition-colors"
              >
                <PlaceCoverImage
                  place={place}
                  variant="card"
                  placeholderLabel={t.coverPlaceholder}
                />
                <div className="p-4 pt-3">
                  <div className="flex flex-wrap items-start justify-between gap-2 pr-10">
                    <div>
                      <p className="font-medium">
                        {locale === "en" && place.englishName
                          ? place.englishName
                          : place.name}
                      </p>
                      {place.clusterId && (
                        <p className="text-xs text-violet-400/70 mt-0.5">
                          {getClusterDisplayName(
                            place.clusterId,
                            place.clusterName,
                            locale
                          )}
                        </p>
                      )}
                    </div>
                    <SpokjaktBadge place={place} size="compact" />
                  </div>
                  <p className="text-xs text-white/50 mt-2">
                    {place.city} · {getPlaceCategoryLabel(place.category, locale)}
                    {place.verifiedByTeam && " · ✓"}
                    {" · "}
                    <span className="text-violet-400/80">
                      {"★".repeat(place.hauntingLevel)}
                    </span>
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
