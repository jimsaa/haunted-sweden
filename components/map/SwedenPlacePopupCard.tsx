"use client";

import { useRef } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import type { HauntedPlace } from "@/lib/types/place";
import type { Locale } from "@/lib/translations";
import { getPlaceCategoryLabel } from "@/lib/place-labels";
import { getSwedenPopupBadges } from "@/lib/map-marker-badges";
import { getVerificationLabel } from "@/lib/verification";
import type { SwedenPopupLabels } from "@/lib/sweden-popup-labels";
import { SwedenPopupStatusBadges } from "@/components/map/SwedenPopupStatusBadges";
import { getPlaceSummary } from "@/lib/place-locale-text";

function displayName(place: HauntedPlace, locale: Locale): string {
  return locale === "en" && place.englishName ? place.englishName : place.name;
}

function HauntingStars({ level }: { level: number }) {
  const filled = Math.min(5, Math.max(0, level));
  return (
    <span className="haunted-popup-level">
      <span className="haunted-popup-stars-filled">{"★".repeat(filled)}</span>
      <span className="haunted-popup-stars-empty">{"☆".repeat(5 - filled)}</span>
    </span>
  );
}

export function SwedenPlacePopupCard({
  place,
  labels,
  onClose,
}: {
  place: HauntedPlace;
  labels: SwedenPopupLabels;
  onClose: () => void;
}) {
  const name = displayName(place, labels.locale);
  const category = getPlaceCategoryLabel(place.category, labels.locale);
  const verification = getVerificationLabel(
    place.verificationLevel,
    labels.locale
  );
  const summary = getPlaceSummary(place, labels.locale);
  const popupBadges = getSwedenPopupBadges(place);
  const popupRef = useRef<HTMLElement>(null);

  return (
    <article ref={popupRef} className="sweden-view-popup haunted-popup">
      <button
        type="button"
        onClick={onClose}
        className="sweden-view-popup-close"
        aria-label={labels.close}
      >
        <X className="h-4 w-4" aria-hidden />
      </button>
      <header className="haunted-popup-header sweden-popup-header">
        <h3 id="sweden-view-popup-title" className="haunted-popup-title">
          {name}
        </h3>
        {popupBadges.length > 0 ? (
          <SwedenPopupStatusBadges
            place={place}
            labels={labels}
            popupRef={popupRef}
          />
        ) : null}
      </header>
      <dl className="haunted-popup-meta">
        <div className="haunted-popup-row">
          <dt className="haunted-popup-label">{labels.cityRegion}</dt>
          <dd className="haunted-popup-value">
            {place.city}
            <span className="text-white/35"> · </span>
            {place.region}
          </dd>
        </div>
        <div className="haunted-popup-row">
          <dt className="haunted-popup-label">{labels.category}</dt>
          <dd className="haunted-popup-value">
            <span className="haunted-popup-category">{category}</span>
          </dd>
        </div>
        <div className="haunted-popup-row">
          <dt className="haunted-popup-label">{labels.hauntingLevel}</dt>
          <dd className="haunted-popup-value">
            <HauntingStars level={place.hauntingLevel} />
          </dd>
        </div>
        <div className="haunted-popup-row">
          <dt className="haunted-popup-label">{labels.verification}</dt>
          <dd className="haunted-popup-value">
            <span className="sweden-popup-verification">{verification}</span>
          </dd>
        </div>
      </dl>

      <p className="sweden-popup-description">{summary}</p>

      <Link
        href={`/places/${place.slug}`}
        className="haunted-popup-btn"
        onClick={(e) => e.stopPropagation()}
      >
        {labels.viewDetails}
      </Link>
    </article>
  );
}
