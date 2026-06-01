const MOBILE_MQ = "(max-width: 767px)";
const TOUCH_VISIBLE_MS = 2000;

type TooltipController = {
  activeBadge: HTMLElement | null;
  hideTimer: ReturnType<typeof setTimeout> | null;
  container: HTMLElement;
  onPointerDown: (e: PointerEvent) => void;
  onDocumentPointerDown: (e: PointerEvent) => void;
};

const controllers = new WeakMap<HTMLElement, TooltipController>();

function isCoarsePointer(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia(MOBILE_MQ).matches ||
    window.matchMedia("(hover: none)").matches
  );
}

function clearActive(ctrl: TooltipController) {
  if (ctrl.hideTimer) {
    clearTimeout(ctrl.hideTimer);
    ctrl.hideTimer = null;
  }
  if (ctrl.activeBadge) {
    ctrl.activeBadge.classList.remove("show-tooltip");
    ctrl.activeBadge = null;
  }
}

function showBadgeTooltip(ctrl: TooltipController, badge: HTMLElement) {
  clearActive(ctrl);
    badge.classList.add("show-tooltip");
  ctrl.activeBadge = badge;
  ctrl.hideTimer = setTimeout(() => clearActive(ctrl), TOUCH_VISIBLE_MS);
}

export function attachMarkerBadgeTooltips(container: HTMLElement): void {
  if (controllers.has(container)) return;

  const ctrl: TooltipController = {
    activeBadge: null,
    hideTimer: null,
    container,
    onPointerDown: (e: PointerEvent) => {
      const target = e.target as Element;
      const badge = target.closest(
        ".haunted-marker-badge"
      ) as HTMLElement | null;

      if (badge && container.contains(badge)) {
        if (isCoarsePointer()) {
          e.stopPropagation();
          showBadgeTooltip(ctrl, badge);
        }
        return;
      }

      if (isCoarsePointer()) clearActive(ctrl);
    },
    onDocumentPointerDown: (e: PointerEvent) => {
      if (!ctrl.activeBadge) return;
      const target = e.target as Element;
      if (!target.closest(".haunted-marker-badge")) {
        clearActive(ctrl);
      }
    },
  };

  container.addEventListener("pointerdown", ctrl.onPointerDown, true);
  document.addEventListener("pointerdown", ctrl.onDocumentPointerDown, true);
  controllers.set(container, ctrl);
}

export function detachMarkerBadgeTooltips(container: HTMLElement): void {
  const ctrl = controllers.get(container);
  if (!ctrl) return;
  clearActive(ctrl);
  container.removeEventListener("pointerdown", ctrl.onPointerDown, true);
  document.removeEventListener(
    "pointerdown",
    ctrl.onDocumentPointerDown,
    true
  );
  controllers.delete(container);
}
