export interface StatusTooltipPosition {
  left: number;
  top: number;
  /** px offset of arrow from tooltip horizontal center (points at icon). */
  arrowOffset: number;
}

const GAP_PX = 12;
const BOUNDS_PAD_PX = 8;

/**
 * Place tooltip below icon, centered, clamped inside popup bounds.
 */
export function computeStatusTooltipPosition(
  iconEl: HTMLElement,
  tooltipEl: HTMLElement,
  boundsEl: HTMLElement
): StatusTooltipPosition {
  const icon = iconEl.getBoundingClientRect();
  const tip = tooltipEl.getBoundingClientRect();
  const bounds = boundsEl.getBoundingClientRect();

  const iconCenterX = icon.left + icon.width / 2;
  let left = iconCenterX - tip.width / 2;
  let top = icon.bottom + GAP_PX;

  if (top + tip.height > bounds.bottom - BOUNDS_PAD_PX) {
    top = Math.max(
      icon.bottom + GAP_PX,
      bounds.bottom - BOUNDS_PAD_PX - tip.height
    );
  }

  const minLeft = bounds.left + BOUNDS_PAD_PX;
  const maxLeft = bounds.right - BOUNDS_PAD_PX - tip.width;
  left = Math.max(minLeft, Math.min(left, maxLeft));

  const closeBtn = boundsEl.querySelector<HTMLElement>(
    ".sweden-view-popup-close"
  );
  if (closeBtn) {
    const closeRect = closeBtn.getBoundingClientRect();
    const tipRight = left + tip.width;
    const overlapsClose =
      top < closeRect.bottom + 4 &&
      tipRight > closeRect.left - 6 &&
      left < closeRect.right + 6;
    if (overlapsClose) {
      left = Math.min(left, closeRect.left - tip.width - BOUNDS_PAD_PX);
      left = Math.max(minLeft, left);
    }
  }

  const arrowOffset = iconCenterX - (left + tip.width / 2);

  return { left, top, arrowOffset };
}
