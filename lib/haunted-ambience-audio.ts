/**
 * Ambient loop for the map page.
 * File: public/audio/audio.mp3 — served at /audio/audio.mp3
 * Playback ~15–20% with fade in/out (see HauntedAmbienceContext).
 */
export const HAUNTED_AMBIENCE_SRC = "/audio/audio.mp3";

/** Target playback volume after fade-in (15–20%). */
export const AMBIENCE_TARGET_VOLUME = 0.18;

export const AMBIENCE_FADE_MS = 1400;

export function createAmbienceAudio(): HTMLAudioElement | null {
  if (typeof window === "undefined") return null;
  const audio = new Audio(HAUNTED_AMBIENCE_SRC);
  audio.loop = true;
  audio.preload = "none";
  audio.volume = 0;
  return audio;
}

export function fadeAmbienceVolume(
  audio: HTMLAudioElement,
  toVolume: number,
  durationMs: number,
  onComplete?: () => void
): () => void {
  const from = audio.volume;
  const start = performance.now();
  let frame = 0;

  const step = (now: number) => {
    const t = Math.min(1, (now - start) / durationMs);
    audio.volume = from + (toVolume - from) * t;
    if (t < 1) {
      frame = requestAnimationFrame(step);
    } else {
      onComplete?.();
    }
  };

  frame = requestAnimationFrame(step);
  return () => cancelAnimationFrame(frame);
}
