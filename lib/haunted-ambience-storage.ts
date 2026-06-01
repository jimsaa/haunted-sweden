/** localStorage preference for map ambient audio (user choice only). */
export const AMBIENCE_STORAGE_KEY = "haunted-sweden-ambience";

export type AmbiencePreference = "soundOn" | "soundOff";

export function readAmbiencePreference(): AmbiencePreference | null {
  if (typeof window === "undefined") return null;
  try {
    const v = localStorage.getItem(AMBIENCE_STORAGE_KEY);
    if (v === "soundOn" || v === "soundOff") return v;
  } catch {
    // ignore
  }
  return null;
}

export function writeAmbiencePreference(value: AmbiencePreference): void {
  try {
    localStorage.setItem(AMBIENCE_STORAGE_KEY, value);
  } catch {
    // ignore
  }
}
