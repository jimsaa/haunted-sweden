"use client";

import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  ExternalLink,
  Shield,
  CheckCircle2,
  Star,
  Camera,
  Video,
  FileText,
  Clock,
  Users,
  Link2,
} from "lucide-react";
import type { HauntedPlace, PlaceReport } from "@/lib/types/place";
import { useLanguage } from "@/lib/language-context";
import { getPlaceCategoryLabel } from "@/lib/place-labels";
import { translateParanormalType, translateAccessType } from "@/lib/place-i18n";
import { PlaceCoverImage } from "@/components/PlaceCoverImage";
import { HauntingLevel } from "@/components/HauntingLevel";
import { distanceMeters } from "@/lib/geo";
import { getClusterDisplayName } from "@/lib/cluster-i18n";
import {
  getVerificationDescription,
  getVerificationLabel,
} from "@/lib/verification";
import type { Locale } from "@/lib/translations";
import type { VerificationLevel } from "@/lib/types/verification";
import { SpokjaktBadge } from "@/components/spokjakt/SpokjaktBadge";
import { InvestigationSourcesSection } from "@/components/places/InvestigationSourcesSection";
import { InvestigationTimelineSection } from "@/components/places/InvestigationTimelineSection";
import { SpokjaktFeaturedSection } from "@/components/spokjakt/SpokjaktFeaturedSection";
import { isFeaturedInSpokjakt } from "@/lib/spokjakt-place";
import {
  getImageCaption,
  getPlaceHistory,
  getPlaceLegend,
  getPlaceSafetyNote,
  getPlaceShortDescription,
  hasPlaceSafetyNote,
  getVideoCaption,
  getVideoTitle,
} from "@/lib/place-locale-text";

function placeDisplayName(place: HauntedPlace, locale: Locale): string {
  return locale === "en" && place.englishName ? place.englishName : place.name;
}

function Counter({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 sm:px-4 sm:py-3 text-center">
      <Icon className="h-4 w-4 sm:h-5 sm:w-5 mx-auto text-violet-400 mb-1" />
      <p className="text-base sm:text-lg font-semibold">{value}</p>
      <p className="text-[10px] sm:text-xs text-white/50">{label}</p>
    </div>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20 mt-10 sm:mt-12">
      <h2
        className="text-xl sm:text-2xl font-semibold mb-4 pb-2 border-b border-white/10"
        style={{ fontFamily: "var(--font-display), serif" }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-5 sm:px-6 sm:py-6">
      <p className="leading-relaxed text-white/80 text-[15px] sm:text-base">
        {children}
      </p>
    </div>
  );
}

function VerificationBadge({
  level,
  label,
  teamVerified,
}: {
  level: VerificationLevel;
  label: string;
  teamVerified: boolean;
}) {
  const styles = teamVerified
    ? "bg-amber-600/20 border-amber-500/35 text-amber-200"
    : level === "community-verified"
      ? "bg-emerald-600/20 border-emerald-500/30 text-emerald-300"
      : "bg-white/10 border-white/20 text-white/70";

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium backdrop-blur-sm ${styles}`}
    >
      <CheckCircle2 className="h-3 w-3 shrink-0" />
      {label}
    </span>
  );
}

function EmptyPlaceholder({ text }: { text: string }) {
  return (
    <p className="rounded-2xl border border-dashed border-white/15 bg-white/[0.02] px-4 py-10 text-center text-sm text-white/50">
      {text}
    </p>
  );
}

export function PlaceDetail({
  place,
  reports,
  mapsUrl,
  nearby,
}: {
  place: HauntedPlace;
  reports: PlaceReport[];
  mapsUrl: string;
  nearby: HauntedPlace[];
}) {
  const { locale, t } = useLanguage();
  const pt = t.placePage;
  const title = placeDisplayName(place, locale);
  const categoryLabel = getPlaceCategoryLabel(place.category, locale);
  const clusterDisplay = getClusterDisplayName(
    place.clusterId,
    place.clusterName,
    locale
  );

  const sections = [
    ...(isFeaturedInSpokjakt(place)
      ? [
          {
            id: "featured-in-spokjakt",
            label: t.spokjakt.featuredSection.title,
          },
        ]
      : []),
    { id: "history", label: pt.history },
    { id: "legends", label: pt.legends },
    { id: "reports", label: pt.paranormalReports },
    { id: "photos", label: pt.photos },
    { id: "videos", label: pt.videos },
    { id: "location", label: pt.location },
    ...(nearby.length > 0 ? [{ id: "nearby", label: pt.nearbyTitle }] : []),
  ];

  return (
    <article className="min-h-screen bg-black text-white pb-20">
      {/* Hero */}
      <header className="relative border-b border-white/10 overflow-hidden">
        <PlaceCoverImage
          place={place}
          variant="hero"
          priority
          placeholderLabel={t.coverPlaceholder}
          alt={title}
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/25 pointer-events-none"
          aria-hidden
        />
        <div className="relative mx-auto max-w-3xl px-4 pt-5 pb-10 sm:px-6 sm:pt-6 sm:pb-12">
          <Link
            href="/map"
            className="text-sm text-white/70 hover:text-white inline-flex items-center gap-1"
          >
            ← {pt.back}
          </Link>

          <div className="mt-5 flex flex-wrap gap-2">
            {place.featured && (
              <span className="inline-flex items-center gap-1 rounded-full bg-violet-600/40 border border-violet-400/40 px-3 py-1 text-xs font-medium text-violet-100 backdrop-blur-sm">
                <Star className="h-3 w-3" /> {pt.featured}
              </span>
            )}
            <VerificationBadge
              level={place.verificationLevel}
              label={getVerificationLabel(place.verificationLevel, locale)}
              teamVerified={place.verifiedByTeam === true}
            />
            <span className="rounded-full border border-white/20 bg-black/40 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-sm">
              {categoryLabel}
            </span>
            <SpokjaktBadge place={place} />
          </div>

          <h1
            className="mt-4 text-3xl sm:text-4xl md:text-[2.5rem] font-bold leading-tight text-balance"
            style={{ fontFamily: "var(--font-display), serif" }}
          >
            {title}
          </h1>
          {place.name !== title && (
            <p className="mt-1.5 text-white/55 text-sm sm:text-base">{place.name}</p>
          )}

          <p className="mt-3 flex items-center gap-1.5 text-white/75 text-sm sm:text-base">
            <MapPin className="h-4 w-4 text-violet-400 shrink-0" />
            {place.city}, {place.region}
            {place.country ? `, ${place.country}` : ""}
          </p>

          <div className="mt-5">
            <p className="text-xs uppercase tracking-wider text-white/45 mb-1.5">
              {pt.hauntingLevel}
            </p>
            <HauntingLevel level={place.hauntingLevel} label={pt.hauntingLevel} />
          </div>
        </div>
      </header>

      {/* Quick nav */}
      <nav
        aria-label={t.a11y.pageSections}
        className="sticky top-0 z-20 border-b border-white/10 bg-black/90 backdrop-blur-md"
      >
        <ul className="mx-auto max-w-3xl flex gap-1 overflow-x-auto px-4 py-2.5 sm:px-6 scrollbar-none">
          {sections.map((s) => (
            <li key={s.id} className="shrink-0">
              <a
                href={`#${s.id}`}
                className="inline-block rounded-lg px-3 py-1.5 text-xs font-medium text-white/60 hover:text-white hover:bg-white/10 transition-colors whitespace-nowrap"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        {/* Intro */}
        <p className="mt-8 text-[15px] sm:text-base leading-relaxed text-white/75">
          {getPlaceShortDescription(place, locale)}
        </p>

        <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
          <p className="text-xs uppercase tracking-wider text-white/45">{pt.verification}</p>
          <p className="mt-1 text-sm font-medium text-white">
            {getVerificationLabel(place.verificationLevel, locale)}
          </p>
          <p className="mt-1 text-xs text-white/55 leading-relaxed">
            {getVerificationDescription(place.verificationLevel, locale)}
          </p>
        </div>

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
          <Counter icon={Clock} label={pt.counters.evidence} value={place.evidenceCount} />
          <Counter icon={FileText} label={pt.counters.reports} value={place.reportCount} />
          <Counter icon={Camera} label={pt.counters.photos} value={place.photoCount} />
          <Counter icon={Video} label={pt.counters.videos} value={place.videoCount} />
        </div>

        <SpokjaktFeaturedSection place={place} />

        <div className="mt-6 space-y-6">
          <InvestigationSourcesSection place={place} />
          <InvestigationTimelineSection place={place} />
        </div>

        <Section id="history" title={pt.history}>
          <Prose>{getPlaceHistory(place, locale)}</Prose>
        </Section>

        <Section id="legends" title={pt.legends}>
          <Prose>{getPlaceLegend(place, locale)}</Prose>
        </Section>

        {place.paranormalType.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {place.paranormalType.map((type) => (
              <span
                key={type}
                className="rounded-lg border border-violet-500/30 bg-violet-600/10 px-3 py-1.5 text-xs sm:text-sm text-violet-200"
              >
                {translateParanormalType(type, locale)}
              </span>
            ))}
          </div>
        )}

        <Section id="reports" title={pt.paranormalReports}>
          {reports.length > 0 ? (
            <ul className="space-y-3">
              {reports.map((r) => (
                <li
                  key={r.id}
                  className="rounded-2xl border border-white/10 bg-gradient-to-br from-violet-950/20 to-white/[0.02] p-5"
                >
                  <p className="font-semibold text-white">{r.title}</p>
                  <p className="mt-2 text-sm text-white/65 leading-relaxed">{r.body}</p>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyPlaceholder text={pt.noReports} />
          )}
        </Section>

        <Section id="photos" title={pt.photos}>
          {place.images.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {place.images.map((img, i) => (
                <div
                  key={i}
                  className="relative aspect-square rounded-xl overflow-hidden border border-white/10"
                >
                  <Image
                    src={img.url}
                    alt={getImageCaption(img, locale) ?? ""}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          ) : (
            <EmptyPlaceholder text={pt.noPhotos} />
          )}
        </Section>

        <Section id="videos" title={pt.videos}>
          {place.videos.length > 0 ? (
            <div className="space-y-4">
              {place.videos.map((vid, i) => (
                <video
                  key={i}
                  src={vid.url}
                  controls
                  className="w-full rounded-xl border border-white/10"
                />
              ))}
            </div>
          ) : (
            <EmptyPlaceholder text={pt.noVideos} />
          )}
        </Section>

        <Section id="location" title={pt.location}>
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-violet-950/40 via-black to-black p-5 sm:p-6">
            <dl className="grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-xs uppercase tracking-wider text-white/45">{pt.city}</dt>
                <dd className="mt-1 font-medium text-lg">{place.city}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-white/45">{pt.region}</dt>
                <dd className="mt-1 font-medium text-lg">{place.region}</dd>
              </div>
              {place.country && (
                <div>
                  <dt className="text-xs uppercase tracking-wider text-white/45">
                    {pt.country}
                  </dt>
                  <dd className="mt-1 font-medium">{place.country}</dd>
                </div>
              )}
              {place.address && (
                <div className="sm:col-span-2">
                  <dt className="text-xs uppercase tracking-wider text-white/45">
                    {pt.address}
                  </dt>
                  <dd className="mt-1 text-white/85">{place.address}</dd>
                </div>
              )}
              {place.latitude != null && place.longitude != null && (
                <div className="sm:col-span-2">
                  <dt className="text-xs uppercase tracking-wider text-white/45">
                    {pt.coordinates}
                  </dt>
                  <dd className="mt-1 font-mono text-sm text-violet-200/90">
                    {place.latitude.toFixed(4)}°, {place.longitude.toFixed(4)}°
                  </dd>
                </div>
              )}
            </dl>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-full sm:w-auto min-h-[48px] items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white hover:bg-violet-500 transition-colors shadow-lg shadow-violet-950/50"
            >
              <ExternalLink className="h-4 w-4 shrink-0" />
              {pt.openGoogleMaps}
            </a>
          </div>
        </Section>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 text-sm">
          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
            <p className="text-white/45 text-xs uppercase tracking-wider">{pt.access}</p>
            <p className="mt-1 font-medium">{translateAccessType(place.accessType, locale)}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
            <p className="text-white/45 text-xs uppercase tracking-wider flex items-center gap-1">
              <Users className="h-3.5 w-3.5" />
              {pt.familyFriendly}
            </p>
            <p className="mt-1 font-medium">
              {place.familyFriendly ? pt.familyFriendly : pt.familyFriendlyNo}
            </p>
          </div>
          {place.visitDifficulty != null && (
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
              <p className="text-white/45 text-xs uppercase tracking-wider">
                {pt.visitDifficulty}
              </p>
              <p className="mt-1 font-medium">
                {"★".repeat(place.visitDifficulty)}
                {"☆".repeat(5 - place.visitDifficulty)}
              </p>
            </div>
          )}
          {place.nightAccess != null && (
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
              <p className="text-white/45 text-xs uppercase tracking-wider">{pt.nightAccess}</p>
              <p className="mt-1 font-medium">
                {place.nightAccess ? pt.nightAccessYes : pt.nightAccessNo}
              </p>
            </div>
          )}
          {place.parkingAvailable != null && (
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
              <p className="text-white/45 text-xs uppercase tracking-wider">{pt.parking}</p>
              <p className="mt-1 font-medium">
                {place.parkingAvailable ? pt.parkingYes : pt.parkingNo}
              </p>
            </div>
          )}
          {place.guidedTours != null && (
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
              <p className="text-white/45 text-xs uppercase tracking-wider">{pt.guidedTours}</p>
              <p className="mt-1 font-medium">
                {place.guidedTours ? pt.guidedToursYes : pt.guidedToursNo}
              </p>
            </div>
          )}
          {place.publicAccess != null && (
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
              <p className="text-white/45 text-xs uppercase tracking-wider">{pt.publicAccess}</p>
              <p className="mt-1 font-medium">
                {place.publicAccess ? pt.publicAccessYes : pt.publicAccessNo}
              </p>
            </div>
          )}
        </div>

        {hasPlaceSafetyNote(place, locale) && (
          <div className="mt-6 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 sm:p-5">
            <p className="flex items-center gap-2 text-sm font-semibold text-amber-200">
              <Shield className="h-4 w-4 shrink-0" />
              {pt.safety}
            </p>
            <p className="mt-2 text-sm text-white/75 leading-relaxed">
              {getPlaceSafetyNote(place, locale)}
            </p>
          </div>
        )}

        {nearby.length > 0 && (
          <Section id="nearby" title={pt.nearbyTitle}>
            {clusterDisplay && (
              <p className="mb-4 -mt-2 text-sm text-white/55 flex items-center gap-2">
                <Link2 className="h-4 w-4 text-violet-400 shrink-0" />
                {pt.partOfCluster}{" "}
                <span className="text-violet-200/90">{clusterDisplay}</span>
              </p>
            )}
            <ul className="space-y-3">
              {nearby.map((other) => {
                const dist =
                  place.latitude != null &&
                  place.longitude != null &&
                  other.latitude != null &&
                  other.longitude != null
                    ? distanceMeters(
                        place.latitude,
                        place.longitude,
                        other.latitude,
                        other.longitude
                      )
                    : null;
                const otherTitle = placeDisplayName(other, locale);
                return (
                  <li key={other.id}>
                    <Link
                      href={`/places/${other.slug}`}
                      className="flex gap-3 sm:gap-4 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] hover:border-violet-500/40 transition-colors"
                    >
                      <PlaceCoverImage
                        place={other}
                        variant="thumb"
                        placeholderLabel={t.coverPlaceholder}
                        className="rounded-none rounded-l-2xl"
                      />
                      <div className="py-3 pr-4 min-w-0 flex-1">
                        <p className="font-medium text-white truncate">{otherTitle}</p>
                        <p className="mt-0.5 text-xs text-white/50">
                          {other.city}, {other.region}
                        </p>
                        <p className="mt-1 text-xs text-violet-400/80">
                          {getPlaceCategoryLabel(other.category, locale)}
                          {" · "}
                          {"★".repeat(other.hauntingLevel)}
                        </p>
                        {dist != null && (
                          <p className="mt-1.5 text-xs text-violet-300/70">
                            {pt.clusterDistance(dist)}
                          </p>
                        )}
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Section>
        )}
      </div>
    </article>
  );
}
