"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import type { HauntedPlace } from "@/lib/types/place";
import type { SwedenPopupBadge } from "@/lib/map-icon-types";
import {
  getSwedenPopupBadges,
  getSwedenPopupBadgeTooltip,
} from "@/lib/map-marker-badges";
import { getSwedenPopupBadgeSvg } from "@/lib/map-marker-svgs";
import { computeStatusTooltipPosition } from "@/lib/sweden-popup-tooltip-position";
import type { SwedenPopupLabels } from "@/lib/sweden-popup-labels";

function usePrefersFineHover(): boolean {
  const [prefersHover, setPrefersHover] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setPrefersHover(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return prefersHover;
}

function StatusBadgeButton({
  badge,
  tooltip,
  popupRef,
  isOpen,
  onOpen,
  onClose,
  prefersHover,
}: {
  badge: SwedenPopupBadge;
  tooltip: string;
  popupRef: React.RefObject<HTMLElement | null>;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  prefersHover: boolean;
}) {
  const iconRef = useRef<HTMLButtonElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{
    left: number;
    top: number;
    arrowOffset: number;
    ready: boolean;
  }>({ left: 0, top: 0, arrowOffset: 0, ready: false });

  const updatePosition = useCallback(() => {
    const icon = iconRef.current;
    const tip = tooltipRef.current;
    const bounds = popupRef.current;
    if (!icon || !tip || !bounds) return;

    const next = computeStatusTooltipPosition(icon, tip, bounds);
    setPosition({ ...next, ready: true });
  }, [popupRef]);

  useLayoutEffect(() => {
    if (!isOpen) {
      setPosition((p) => ({ ...p, ready: false }));
      return;
    }
    updatePosition();
    const raf = requestAnimationFrame(updatePosition);
    return () => cancelAnimationFrame(raf);
  }, [isOpen, tooltip, updatePosition]);

  useEffect(() => {
    if (!isOpen) return;
    const onReflow = () => updatePosition();
    window.addEventListener("resize", onReflow);
    const popup = popupRef.current;
    popup?.addEventListener("scroll", onReflow, { passive: true });
    return () => {
      window.removeEventListener("resize", onReflow);
      popup?.removeEventListener("scroll", onReflow);
    };
  }, [isOpen, popupRef, updatePosition]);

  const handlePointerEnter = () => {
    if (prefersHover) onOpen();
  };

  const handlePointerLeave = () => {
    if (prefersHover) onClose();
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (prefersHover) return;
    if (isOpen) onClose();
    else onOpen();
  };

  return (
    <div className="sweden-popup-status-badge-wrap">
      <button
        ref={iconRef}
        type="button"
        role="listitem"
        className={`sweden-popup-status-badge sweden-popup-status-badge--${badge}`}
        aria-label={tooltip}
        aria-describedby={isOpen ? `sweden-status-tip-${badge}` : undefined}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onFocus={handlePointerEnter}
        onBlur={handlePointerLeave}
        onClick={handleClick}
        dangerouslySetInnerHTML={{
          __html: getSwedenPopupBadgeSvg(badge),
        }}
      />
      {isOpen ? (
        <div
          ref={tooltipRef}
          id={`sweden-status-tip-${badge}`}
          role="tooltip"
          className={`sweden-popup-status-tooltip ${position.ready ? "sweden-popup-status-tooltip--visible" : ""}`}
          style={{
            left: position.left,
            top: position.top,
            ["--tooltip-arrow-offset" as string]: `${position.arrowOffset}px`,
          }}
        >
          {tooltip}
        </div>
      ) : null}
    </div>
  );
}

export function SwedenPopupStatusBadges({
  place,
  labels,
  popupRef,
}: {
  place: HauntedPlace;
  labels: SwedenPopupLabels;
  popupRef: React.RefObject<HTMLElement | null>;
}) {
  const badges = getSwedenPopupBadges(place);
  const prefersHover = usePrefersFineHover();
  const [openBadge, setOpenBadge] = useState<SwedenPopupBadge | null>(null);
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpenBadge(null);
  }, [place.id]);

  useEffect(() => {
    if (!openBadge || prefersHover) return;

    const closeOnOutside = (e: PointerEvent) => {
      const target = e.target as Node;
      if (rowRef.current?.contains(target)) return;
      if (
        (e.target as Element).closest?.(".sweden-popup-status-tooltip")
      ) {
        return;
      }
      setOpenBadge(null);
    };

    document.addEventListener("pointerdown", closeOnOutside);
    return () => document.removeEventListener("pointerdown", closeOnOutside);
  }, [openBadge, prefersHover]);

  if (badges.length === 0) return null;

  return (
    <div
      ref={rowRef}
      className="sweden-popup-status-row"
      role="list"
      aria-label={labels.metadata}
    >
      {badges.map((badge) => {
        const tooltip = getSwedenPopupBadgeTooltip(
          badge,
          place,
          labels.badgeTooltips
        );
        const isOpen = openBadge === badge;

        return (
          <StatusBadgeButton
            key={badge}
            badge={badge}
            tooltip={tooltip}
            popupRef={popupRef}
            isOpen={isOpen}
            prefersHover={prefersHover}
            onOpen={() => setOpenBadge(badge)}
            onClose={() => setOpenBadge((b) => (b === badge ? null : b))}
          />
        );
      })}
    </div>
  );
}
