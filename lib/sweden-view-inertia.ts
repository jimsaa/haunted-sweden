import type { SwedenViewportTransform } from "@/lib/sweden-view-viewport";

export interface PanVelocity {
  vx: number;
  vy: number;
}

const FRICTION = 0.9;
const MIN_SPEED = 0.35;

/** Apply friction each animation frame (~16ms). */
export function decayVelocity(velocity: PanVelocity): PanVelocity {
  return {
    vx: velocity.vx * FRICTION,
    vy: velocity.vy * FRICTION,
  };
}

export function shouldStopInertia(velocity: PanVelocity): boolean {
  return Math.hypot(velocity.vx, velocity.vy) < MIN_SPEED;
}

export function applyVelocityToTransform(
  transform: SwedenViewportTransform,
  velocity: PanVelocity
): SwedenViewportTransform {
  return {
    ...transform,
    x: transform.x + velocity.vx,
    y: transform.y + velocity.vy,
  };
}
