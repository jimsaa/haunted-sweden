"use client";

import { Minus, Plus, RotateCcw } from "lucide-react";

export function SwedenViewControls({
  onZoomIn,
  onZoomOut,
  onReset,
  resetLabel,
  zoomInLabel,
  zoomOutLabel,
  toolbarAriaLabel,
}: {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  resetLabel: string;
  zoomInLabel: string;
  zoomOutLabel: string;
  toolbarAriaLabel: string;
}) {
  return (
    <div
      className="sweden-view-controls"
      role="toolbar"
      aria-label={toolbarAriaLabel}
    >
      <div className="sweden-view-zoom-buttons">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onZoomIn();
          }}
          className="sweden-view-control-btn"
          aria-label={zoomInLabel}
        >
          <Plus className="h-4 w-4" aria-hidden />
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onZoomOut();
          }}
          className="sweden-view-control-btn"
          aria-label={zoomOutLabel}
        >
          <Minus className="h-4 w-4" aria-hidden />
        </button>
      </div>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onReset();
        }}
        className="sweden-view-control-reset"
        aria-label={resetLabel}
      >
        <RotateCcw className="h-3.5 w-3.5 shrink-0" aria-hidden />
        <span className="hidden sm:inline">{resetLabel}</span>
      </button>
    </div>
  );
}
