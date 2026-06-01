import { SWEDEN_VIEW_SVG } from "@/lib/sweden-view-bounds";

export const SWEDEN_MAP_ASPECT = SWEDEN_VIEW_SVG.height / SWEDEN_VIEW_SVG.width;

export const SWEDEN_VIEW_MAX_ZOOM_FACTOR = 4.5;

export interface SwedenViewportSize {
  width: number;
  height: number;
}

export interface SwedenViewportTransform {
  x: number;
  y: number;
  scale: number;
}

export interface SwedenViewportMetrics {
  mapWidth: number;
  mapHeight: number;
  minScale: number;
  maxScale: number;
}

/** Map pixel dimensions and zoom limits for a given viewport. */
export function getSwedenViewportMetrics(
  viewport: SwedenViewportSize
): SwedenViewportMetrics | null {
  if (viewport.width <= 0 || viewport.height <= 0) return null;

  const mapWidth = viewport.width;
  const mapHeight = mapWidth * SWEDEN_MAP_ASPECT;
  const minScale = Math.min(
    1,
    viewport.height / mapHeight,
    viewport.width / mapWidth
  );
  const maxScale = minScale * SWEDEN_VIEW_MAX_ZOOM_FACTOR;

  return { mapWidth, mapHeight, minScale, maxScale };
}

/** Centered transform showing full Sweden. */
export function getDefaultSwedenTransform(
  viewport: SwedenViewportSize,
  metrics: SwedenViewportMetrics
): SwedenViewportTransform {
  const scaledW = metrics.mapWidth * metrics.minScale;
  const scaledH = metrics.mapHeight * metrics.minScale;
  return {
    scale: metrics.minScale,
    x: (viewport.width - scaledW) / 2,
    y: (viewport.height - scaledH) / 2,
  };
}

export function clampSwedenTransform(
  transform: SwedenViewportTransform,
  viewport: SwedenViewportSize,
  metrics: SwedenViewportMetrics,
  padding = 40
): SwedenViewportTransform {
  const scale = clamp(transform.scale, metrics.minScale, metrics.maxScale);
  const scaledW = metrics.mapWidth * scale;
  const scaledH = metrics.mapHeight * scale;

  const minX = viewport.width - scaledW - padding;
  const maxX = padding;
  const minY = viewport.height - scaledH - padding;
  const maxY = padding;

  return {
    scale,
    x: clampAxis(transform.x, minX, maxX, (viewport.width - scaledW) / 2),
    y: clampAxis(transform.y, minY, maxY, (viewport.height - scaledH) / 2),
  };
}

function clampAxis(
  value: number,
  min: number,
  max: number,
  centered: number
): number {
  if (min >= max) return centered;
  return clamp(value, min, max);
}

/** Zoom toward a point in viewport (client) coordinates. */
export function zoomSwedenAtPoint(
  transform: SwedenViewportTransform,
  viewportPoint: { x: number; y: number },
  factor: number,
  viewport: SwedenViewportSize,
  metrics: SwedenViewportMetrics
): SwedenViewportTransform {
  const scale = clamp(
    transform.scale * factor,
    metrics.minScale,
    metrics.maxScale
  );
  const ratio = scale / transform.scale;
  const mapX = (viewportPoint.x - transform.x) / transform.scale;
  const mapY = (viewportPoint.y - transform.y) / transform.scale;

  return clampSwedenTransform(
    {
      scale,
      x: viewportPoint.x - mapX * scale,
      y: viewportPoint.y - mapY * scale,
    },
    viewport,
    metrics
  );
}

/** Pan by pixel delta. */
export function panSwedenTransform(
  transform: SwedenViewportTransform,
  delta: { x: number; y: number },
  viewport: SwedenViewportSize,
  metrics: SwedenViewportMetrics
): SwedenViewportTransform {
  return clampSwedenTransform(
    {
      ...transform,
      x: transform.x + delta.x,
      y: transform.y + delta.y,
    },
    viewport,
    metrics
  );
}

/** Focus a map point (0–100%) at a viewport pixel target. */
export function focusSwedenAtPercent(
  xPercent: number,
  yPercent: number,
  zoomFactor: number,
  viewport: SwedenViewportSize,
  metrics: SwedenViewportMetrics,
  targetCenter?: { x: number; y: number }
): SwedenViewportTransform {
  const targetScale = clamp(
    metrics.minScale * zoomFactor,
    metrics.minScale,
    metrics.maxScale
  );
  const mapX = (xPercent / 100) * metrics.mapWidth;
  const mapY = (yPercent / 100) * metrics.mapHeight;
  const cx = targetCenter?.x ?? viewport.width / 2;
  const cy = targetCenter?.y ?? viewport.height / 2;

  return clampSwedenTransform(
    {
      scale: targetScale,
      x: cx - mapX * targetScale,
      y: cy - mapY * targetScale,
    },
    viewport,
    metrics,
    24
  );
}

/** Map point (0–100%) to coordinates inside the map viewport element. */
export function getMapPointInViewport(
  xPercent: number,
  yPercent: number,
  transform: SwedenViewportTransform,
  metrics: SwedenViewportMetrics
): { x: number; y: number } {
  const mapX = (xPercent / 100) * metrics.mapWidth;
  const mapY = (yPercent / 100) * metrics.mapHeight;
  return {
    x: transform.x + mapX * transform.scale,
    y: transform.y + mapY * transform.scale,
  };
}

/** Map point to fixed client coordinates (for portaled popup). */
export function getMapPointClientPosition(
  xPercent: number,
  yPercent: number,
  transform: SwedenViewportTransform,
  metrics: SwedenViewportMetrics,
  viewportRect: DOMRect
): { x: number; y: number } {
  const local = getMapPointInViewport(
    xPercent,
    yPercent,
    transform,
    metrics
  );
  return {
    x: viewportRect.left + local.x,
    y: viewportRect.top + local.y,
  };
}

/** Focus bounding box of percents (for clusters). */
export function focusSwedenBounds(
  points: { xPercent: number; yPercent: number }[],
  viewport: SwedenViewportSize,
  metrics: SwedenViewportMetrics,
  paddingFactor = 1.35
): SwedenViewportTransform {
  if (points.length === 0) {
    return getDefaultSwedenTransform(viewport, metrics);
  }

  const xs = points.map((p) => p.xPercent);
  const ys = points.map((p) => p.yPercent);
  const minXp = Math.min(...xs);
  const maxXp = Math.max(...xs);
  const minYp = Math.min(...ys);
  const maxYp = Math.max(...ys);

  const boxW = Math.max((maxXp - minXp) / 100, 0.08) * metrics.mapWidth;
  const boxH = Math.max((maxYp - minYp) / 100, 0.08) * metrics.mapHeight;
  const cx = ((minXp + maxXp) / 200) * metrics.mapWidth;
  const cy = ((minYp + maxYp) / 200) * metrics.mapHeight;

  const scaleX = viewport.width / (boxW * paddingFactor);
  const scaleY = viewport.height / (boxH * paddingFactor);
  const targetScale = clamp(
    Math.min(scaleX, scaleY),
    metrics.minScale,
    metrics.maxScale
  );

  return clampSwedenTransform(
    {
      scale: targetScale,
      x: viewport.width / 2 - cx * targetScale,
      y: viewport.height / 2 - cy * targetScale,
    },
    viewport,
    metrics,
    24
  );
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
