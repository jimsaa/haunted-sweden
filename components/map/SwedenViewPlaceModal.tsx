"use client";

import type { HauntedPlace } from "@/lib/types/place";
import type { SwedenPopupLabels } from "@/lib/sweden-popup-labels";
import { SwedenPlacePopupCard } from "@/components/map/SwedenPlacePopupCard";

/** Centered preview modal over the Sweden map viewport. */
export function SwedenViewPlaceModal({
  place,
  labels,
  onClose,
}: {
  place: HauntedPlace;
  labels: SwedenPopupLabels;
  onClose: () => void;
}) {
  return (
    <div
      className="sweden-view-modal-layer"
      role="presentation"
      onPointerDown={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        className="sweden-view-modal-backdrop"
        aria-label={labels.close}
        onClick={onClose}
      />
      <div
        className="sweden-view-modal-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="sweden-view-popup-title"
        onClick={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
      >
        <SwedenPlacePopupCard
          place={place}
          labels={labels}
          onClose={onClose}
        />
      </div>
    </div>
  );
}
