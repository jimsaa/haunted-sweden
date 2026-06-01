import {
  focusSwedenBounds,
  getDefaultSwedenTransform,
  type SwedenViewportMetrics,
  type SwedenViewportSize,
  type SwedenViewportTransform,
} from "@/lib/sweden-view-viewport";
import type { SwedenViewPercentPoint } from "@/lib/sweden-view-spiderfy";

/** Zoom transform that fits cluster bounds, then max zoom if still very tight. */
export function getClusterFocusTransforms(
  points: SwedenViewPercentPoint[],
  viewport: SwedenViewportSize,
  metrics: SwedenViewportMetrics
): { initial: SwedenViewportTransform; maxZoom: SwedenViewportTransform } {
  if (points.length === 0) {
    const def = getDefaultSwedenTransform(viewport, metrics);
    return { initial: def, maxZoom: def };
  }

  const initial = focusSwedenBounds(points, viewport, metrics, 1.08);
  const center = {
    xPercent: points.reduce((s, p) => s + p.xPercent, 0) / points.length,
    yPercent: points.reduce((s, p) => s + p.yPercent, 0) / points.length,
  };
  const mapX = (center.xPercent / 100) * metrics.mapWidth;
  const mapY = (center.yPercent / 100) * metrics.mapHeight;
  const maxZoom = focusSwedenBounds(points, viewport, metrics, 1.02);
  const maxScale = metrics.maxScale;

  const maxZoomCentered: SwedenViewportTransform = {
    scale: maxScale,
    x: viewport.width / 2 - mapX * maxScale,
    y: viewport.height / 2 - mapY * maxScale,
  };

  return {
    initial,
    maxZoom:
      maxZoom.scale >= maxScale * 0.98 ? maxZoom : maxZoomCentered,
  };
}
