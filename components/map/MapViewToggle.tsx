"use client";

export type MapViewMode = "sweden" | "leaflet";

export function MapViewToggle({
  mode,
  onChange,
  labels,
  ariaLabel,
  overlay = false,
}: {
  mode: MapViewMode;
  onChange: (mode: MapViewMode) => void;
  labels: { mapView: string; swedenView: string };
  ariaLabel: string;
  /** Compact control for map corner overlay */
  overlay?: boolean;
}) {
  const shell = overlay
    ? "inline-flex rounded-lg border border-white/20 bg-black/70 p-0.5 shadow-lg shadow-black/50 backdrop-blur-md"
    : "inline-flex rounded-xl border border-white/15 bg-black/50 p-1 backdrop-blur-sm";
  const tab = overlay
    ? "rounded-md px-2 py-1 text-[10px] font-semibold sm:px-2.5 sm:text-[11px]"
    : "rounded-lg px-3 py-2 text-xs font-semibold sm:px-4 sm:text-sm";

  return (
    <div className={shell} role="tablist" aria-label={ariaLabel}>
      <button
        type="button"
        role="tab"
        aria-selected={mode === "sweden"}
        onClick={() => onChange("sweden")}
        className={`${tab} transition-colors ${
          mode === "sweden"
            ? "bg-violet-600 text-white shadow-md shadow-violet-950/50"
            : "text-white/60 hover:text-white"
        }`}
      >
        {labels.swedenView}
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={mode === "leaflet"}
        onClick={() => onChange("leaflet")}
        className={`${tab} transition-colors ${
          mode === "leaflet"
            ? "bg-violet-600 text-white shadow-md shadow-violet-950/50"
            : "text-white/60 hover:text-white"
        }`}
      >
        {labels.mapView}
      </button>
    </div>
  );
}
