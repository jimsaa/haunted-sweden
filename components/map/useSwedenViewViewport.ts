"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  applyVelocityToTransform,
  decayVelocity,
  shouldStopInertia,
  type PanVelocity,
} from "@/lib/sweden-view-inertia";
import {
  clampSwedenTransform,
  focusSwedenAtPercent,
  focusSwedenBounds,
  getDefaultSwedenTransform,
  getSwedenViewportMetrics,
  type SwedenViewportMetrics,
  type SwedenViewportSize,
  type SwedenViewportTransform,
  zoomSwedenAtPoint,
} from "@/lib/sweden-view-viewport";

const ZOOM_STEP = 1.28;
const WHEEL_ZOOM_SENSITIVITY = 0.0018;
export const SWEDEN_PLACE_ZOOM_FACTOR = 2.75;
export const SWEDEN_CLUSTER_ZOOM_FACTOR = 2.1;
const DRAG_THRESHOLD_PX = 4;
const ANIMATION_MS = 450;
const VELOCITY_SMOOTHING = 0.35;

function isInteractiveTarget(target: EventTarget | null): boolean {
  return (
    target instanceof Element &&
    Boolean(
      target.closest(
        "button, a, [role='dialog'], .sweden-view-controls, .sweden-view-modal-layer"
      )
    )
  );
}

export function useSwedenViewViewport() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);
  const scrollLockRef = useRef(0);
  const inertiaFrameRef = useRef<number | null>(null);

  const [viewportSize, setViewportSize] = useState<SwedenViewportSize>({
    width: 0,
    height: 0,
  });
  const [transform, setTransform] = useState<SwedenViewportTransform>({
    x: 0,
    y: 0,
    scale: 1,
  });
  const [animate, setAnimate] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isPointerInside, setIsPointerInside] = useState(false);

  const transformRef = useRef(transform);
  transformRef.current = transform;

  const viewportSizeRef = useRef(viewportSize);
  viewportSizeRef.current = viewportSize;

  const metricsRef = useRef<SwedenViewportMetrics | null>(null);
  const metrics =
    viewportSize.width > 0
      ? getSwedenViewportMetrics(viewportSize)
      : null;
  metricsRef.current = metrics;

  const stopInertia = useCallback(() => {
    if (inertiaFrameRef.current != null) {
      cancelAnimationFrame(inertiaFrameRef.current);
      inertiaFrameRef.current = null;
    }
  }, []);

  const lockPageScroll = useCallback(() => {
    if (scrollLockRef.current++ === 0) {
      document.body.classList.add("sweden-view-scroll-locked");
    }
  }, []);

  const unlockPageScroll = useCallback(() => {
    if (scrollLockRef.current > 0 && --scrollLockRef.current === 0) {
      document.body.classList.remove("sweden-view-scroll-locked");
    }
  }, []);

  const measureViewport = useCallback(() => {
    const el = viewportRef.current;
    if (!el) return;
    const { width, height } = el.getBoundingClientRect();
    setViewportSize({ width, height });
  }, []);

  useLayoutEffect(() => {
    measureViewport();
    const el = viewportRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => measureViewport());
    ro.observe(el);
    return () => ro.disconnect();
  }, [measureViewport]);

  useEffect(() => {
    if (!metrics) return;
    if (!initializedRef.current) {
      initializedRef.current = true;
      setTransform(getDefaultSwedenTransform(viewportSize, metrics));
      return;
    }
    setTransform((prev) => clampSwedenTransform(prev, viewportSize, metrics));
  }, [metrics?.minScale, metrics?.maxScale, viewportSize.width, viewportSize.height]);

  useEffect(() => {
    return () => {
      stopInertia();
      document.body.classList.remove("sweden-view-scroll-locked");
      scrollLockRef.current = 0;
    };
  }, [stopInertia]);

  const setTransformClamped = useCallback(
    (next: SwedenViewportTransform) => {
      const m = metricsRef.current;
      const vp = viewportSizeRef.current;
      if (!m || vp.width <= 0) {
        setTransform(next);
        return;
      }
      setTransform(clampSwedenTransform(next, vp, m));
    },
    []
  );

  const applyTransform = useCallback(
    (next: SwedenViewportTransform, withAnimation = false) => {
      stopInertia();
      const m = metricsRef.current;
      const vp = viewportSizeRef.current;
      if (!m) {
        setTransform(next);
        return;
      }
      const clamped = clampSwedenTransform(next, vp, m);
      setAnimate(withAnimation);
      setTransform(clamped);
      if (withAnimation) {
        window.setTimeout(() => setAnimate(false), ANIMATION_MS);
      }
    },
    [stopInertia]
  );

  const getViewportPoint = useCallback((clientX: number, clientY: number) => {
    const rect = viewportRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    return { x: clientX - rect.left, y: clientY - rect.top };
  }, []);

  const resetView = useCallback(() => {
    const m = metricsRef.current;
    const vp = viewportSizeRef.current;
    if (!m) return;
    applyTransform(getDefaultSwedenTransform(vp, m), true);
  }, [applyTransform]);

  const zoomIn = useCallback(() => {
    const m = metricsRef.current;
    const vp = viewportSizeRef.current;
    if (!m) return;
    const center = { x: vp.width / 2, y: vp.height / 2 };
    applyTransform(
      zoomSwedenAtPoint(
        transformRef.current,
        center,
        ZOOM_STEP,
        vp,
        m
      ),
      true
    );
  }, [applyTransform]);

  const zoomOut = useCallback(() => {
    const m = metricsRef.current;
    const vp = viewportSizeRef.current;
    if (!m) return;
    const center = { x: vp.width / 2, y: vp.height / 2 };
    applyTransform(
      zoomSwedenAtPoint(
        transformRef.current,
        center,
        1 / ZOOM_STEP,
        vp,
        m
      ),
      true
    );
  }, [applyTransform]);

  const flyToPercent = useCallback(
    (xPercent: number, yPercent: number, zoomFactor: number) => {
      const m = metricsRef.current;
      const vp = viewportSizeRef.current;
      if (!m) return;
      applyTransform(
        focusSwedenAtPercent(xPercent, yPercent, zoomFactor, vp, m),
        true
      );
    },
    [applyTransform]
  );

  const flyToCluster = useCallback(
    (points: { xPercent: number; yPercent: number }[]) => {
      const m = metricsRef.current;
      const vp = viewportSizeRef.current;
      if (!m) return;
      applyTransform(focusSwedenBounds(points, vp, m), true);
    },
    [applyTransform]
  );

  const flyToPlace = useCallback(
    (xPercent: number, yPercent: number) => {
      flyToPercent(xPercent, yPercent, SWEDEN_PLACE_ZOOM_FACTOR);
    },
    [flyToPercent]
  );

  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    lastX: number;
    lastY: number;
    lastT: number;
    originX: number;
    originY: number;
    moved: boolean;
    velocity: PanVelocity;
  } | null>(null);

  const pinchRef = useRef<{
    distance: number;
    midpoint: { x: number; y: number };
  } | null>(null);

  const startInertia = useCallback(
    (initial: PanVelocity) => {
      stopInertia();
      let velocity = { ...initial };

      const tick = () => {
        if (shouldStopInertia(velocity)) {
          inertiaFrameRef.current = null;
          return;
        }
        setTransformClamped(
          applyVelocityToTransform(transformRef.current, velocity)
        );
        velocity = decayVelocity(velocity);
        inertiaFrameRef.current = requestAnimationFrame(tick);
      };

      inertiaFrameRef.current = requestAnimationFrame(tick);
    },
    [setTransformClamped, stopInertia]
  );

  const onPointerEnter = useCallback(() => {
    setIsPointerInside(true);
    lockPageScroll();
  }, [lockPageScroll]);

  const onPointerLeave = useCallback(() => {
    setIsPointerInside(false);
    if (!dragRef.current && !pinchRef.current) {
      unlockPageScroll();
    }
  }, [unlockPageScroll]);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (e.button !== 0 || isInteractiveTarget(e.target)) return;
      stopInertia();
      lockPageScroll();

      const now = performance.now();
      dragRef.current = {
        pointerId: e.pointerId,
        startX: e.clientX,
        startY: e.clientY,
        lastX: e.clientX,
        lastY: e.clientY,
        lastT: now,
        originX: transformRef.current.x,
        originY: transformRef.current.y,
        moved: false,
        velocity: { vx: 0, vy: 0 },
      };
      setIsDragging(true);
      setAnimate(false);
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    },
    [lockPageScroll, stopInertia]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      const m = metricsRef.current;
      const vp = viewportSizeRef.current;
      if (!m || !dragRef.current) return;
      if (dragRef.current.pointerId !== e.pointerId) return;

      const now = performance.now();
      const dx = e.clientX - dragRef.current.startX;
      const dy = e.clientY - dragRef.current.startY;

      if (
        !dragRef.current.moved &&
        Math.hypot(dx, dy) > DRAG_THRESHOLD_PX
      ) {
        dragRef.current.moved = true;
      }

      const dt = Math.max(now - dragRef.current.lastT, 1);
      const instVx = ((e.clientX - dragRef.current.lastX) / dt) * 16;
      const instVy = ((e.clientY - dragRef.current.lastY) / dt) * 16;
      dragRef.current.velocity = {
        vx:
          dragRef.current.velocity.vx * (1 - VELOCITY_SMOOTHING) +
          instVx * VELOCITY_SMOOTHING,
        vy:
          dragRef.current.velocity.vy * (1 - VELOCITY_SMOOTHING) +
          instVy * VELOCITY_SMOOTHING,
      };
      dragRef.current.lastX = e.clientX;
      dragRef.current.lastY = e.clientY;
      dragRef.current.lastT = now;

      if (dragRef.current.moved) {
        e.preventDefault();
        setTransformClamped({
          x: dragRef.current.originX + dx,
          y: dragRef.current.originY + dy,
          scale: transformRef.current.scale,
        });
      }
    },
    [setTransformClamped]
  );

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!dragRef.current || dragRef.current.pointerId !== e.pointerId) {
        return false;
      }

      const moved = dragRef.current.moved;
      const velocity = dragRef.current.velocity;
      dragRef.current = null;
      setIsDragging(false);

      try {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        /* already released */
      }

      if (moved) {
        startInertia(velocity);
      }

      const el = viewportRef.current;
      const inside =
        el &&
        (() => {
          const r = el.getBoundingClientRect();
          return (
            e.clientX >= r.left &&
            e.clientX <= r.right &&
            e.clientY >= r.top &&
            e.clientY <= r.bottom
          );
        })();

      if (!inside && !pinchRef.current) {
        unlockPageScroll();
      }

      return moved;
    },
    [startInertia, unlockPageScroll]
  );

  /** Non-passive wheel — blocks page scroll while zooming. */
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      const m = metricsRef.current;
      const vp = viewportSizeRef.current;
      if (!m) return;

      e.preventDefault();
      e.stopPropagation();
      stopInertia();
      setAnimate(false);

      const point = {
        x: e.clientX - el.getBoundingClientRect().left,
        y: e.clientY - el.getBoundingClientRect().top,
      };
      const factor = Math.exp(-e.deltaY * WHEEL_ZOOM_SENSITIVITY);
      setTransformClamped(
        zoomSwedenAtPoint(transformRef.current, point, factor, vp, m)
      );
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [setTransformClamped, stopInertia, viewportSize.width, viewportSize.height]);

  /** Non-passive touchmove — blocks page scroll during pan/pinch. */
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length >= 1) {
        e.preventDefault();
      }

      const m = metricsRef.current;
      const vp = viewportSizeRef.current;
      if (!m || e.touches.length !== 2 || !pinchRef.current) return;

      const [a, b] = [e.touches[0]!, e.touches[1]!];
      const distance = Math.hypot(
        b.clientX - a.clientX,
        b.clientY - a.clientY
      );
      const factor = distance / pinchRef.current.distance;
      pinchRef.current.distance = distance;
      stopInertia();
      setAnimate(false);
      setTransformClamped(
        zoomSwedenAtPoint(
          transformRef.current,
          pinchRef.current.midpoint,
          factor,
          vp,
          m
        )
      );
    };

    el.addEventListener("touchmove", handleTouchMove, { passive: false });
    return () => el.removeEventListener("touchmove", handleTouchMove);
  }, [setTransformClamped, stopInertia, viewportSize.width, viewportSize.height]);

  const onTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (isInteractiveTarget(e.target)) return;
      lockPageScroll();
      stopInertia();

      if (e.touches.length === 2 && metricsRef.current) {
        const [a, b] = [e.touches[0]!, e.touches[1]!];
        const distance = Math.hypot(
          b.clientX - a.clientX,
          b.clientY - a.clientY
        );
        const midpoint = getViewportPoint(
          (a.clientX + b.clientX) / 2,
          (a.clientY + b.clientY) / 2
        );
        pinchRef.current = { distance, midpoint };
        dragRef.current = null;
        setIsDragging(false);
      }
    },
    [getViewportPoint, lockPageScroll, stopInertia]
  );

  const onTouchEnd = useCallback(() => {
    if (pinchRef.current) pinchRef.current = null;
    if (!dragRef.current) {
      unlockPageScroll();
    }
  }, [unlockPageScroll]);

  const mapStyle =
    metrics && viewportSize.width > 0
      ? {
          width: metrics.mapWidth,
          height: metrics.mapHeight,
          transform: `translate3d(${transform.x}px, ${transform.y}px, 0) scale(${transform.scale})`,
          transformOrigin: "0 0",
          transition: animate
            ? `transform ${ANIMATION_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`
            : "none",
          willChange:
            animate || isDragging || inertiaFrameRef.current != null
              ? "transform"
              : "auto",
        }
      : undefined;

  return {
    viewportRef,
    metrics,
    transform,
    mapStyle,
    isDragging,
    isPointerInside,
    resetView,
    zoomIn,
    zoomOut,
    flyToPlace,
    flyToCluster,
    onPointerEnter,
    onPointerLeave,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onTouchStart,
    onTouchEnd,
  };
}
