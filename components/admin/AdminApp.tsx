"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Copy, LogOut, RefreshCw, Save } from "lucide-react";
import hauntedPlacesFile from "@/data/haunted-places.json";
import {
  getStoredAdminPassword,
  isAdminSessionActive,
  setAdminSession,
  setStoredAdminPassword,
} from "@/lib/admin/auth";
import {
  adminStateToFile,
  exportJsonString,
  fileToAdminState,
} from "@/lib/admin/serialize";
import type { AdminPlaceDraft, AdminPlacesState } from "@/lib/admin/types";
import type { HauntedPlace, HauntedPlacesFile } from "@/lib/types/place";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { AdminPlaceList } from "@/components/admin/AdminPlaceList";
import { AdminPlaceEditor } from "@/components/admin/AdminPlaceEditor";

const initialFile = hauntedPlacesFile as HauntedPlacesFile;

export function AdminApp() {
  const [unlocked, setUnlocked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState<AdminPlacesState | null>(null);
  const originalsRef = useRef<HauntedPlace[]>(initialFile.places);
  const [selectedId, setSelectedId] = useState<string | null>(
    initialFile.places[0]?.id ?? null
  );
  const [listQuery, setListQuery] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [copyOpen, setCopyOpen] = useState(false);
  const [copyText, setCopyText] = useState("");
  const [saving, setSaving] = useState(false);

  const loadPlaces = useCallback(async () => {
    const password = getStoredAdminPassword();
    if (!password) {
      setState(fileToAdminState(initialFile));
      originalsRef.current = initialFile.places;
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/admin/places", {
        headers: { "X-Admin-Password": password },
      });
      if (res.ok) {
        const data = (await res.json()) as HauntedPlacesFile;
        setState(fileToAdminState(data));
        originalsRef.current = data.places;
      } else {
        setState(fileToAdminState(initialFile));
        originalsRef.current = initialFile.places;
        setMessage("Using bundled JSON (API unavailable).");
      }
    } catch {
      setState(fileToAdminState(initialFile));
      originalsRef.current = initialFile.places;
      setMessage("Using bundled JSON (could not reach API).");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAdminSessionActive()) {
      setUnlocked(true);
      loadPlaces();
    } else {
      setLoading(false);
    }
  }, [loadPlaces]);

  const selectedDraft = useMemo(() => {
    if (!state || !selectedId) return null;
    return state.places.find((p) => p.id === selectedId) ?? null;
  }, [state, selectedId]);

  const updateDraft = (next: AdminPlaceDraft) => {
    if (!state) return;
    setState({
      ...state,
      places: state.places.map((p) => (p.id === next.id ? next : p)),
    });
    setMessage(null);
  };

  const handleLogout = () => {
    setAdminSession(false);
    setStoredAdminPassword(null);
    setUnlocked(false);
    setState(null);
  };

  const handleSaveFile = async () => {
    if (!state) return;
    const password = getStoredAdminPassword();
    if (!password) {
      setMessage("No admin password in session.");
      return;
    }

    setSaving(true);
    setMessage(null);
    try {
      const file = adminStateToFile(state, originalsRef.current);
      const res = await fetch("/api/admin/places", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Admin-Password": password,
        },
        body: JSON.stringify(file),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(
          (err as { error?: string }).error ?? "Save failed"
        );
      }
      originalsRef.current = file.places;
      setMessage("Saved to data/haunted-places.json");
    } catch (e) {
      setMessage(
        e instanceof Error ? e.message : "Save failed — use Copy JSON instead."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleCopyJson = () => {
    if (!state) return;
    const json = exportJsonString(state, originalsRef.current);
    setCopyText(json);
    setCopyOpen(true);
  };

  const handleCopyClipboard = async () => {
    try {
      await navigator.clipboard.writeText(copyText);
      setMessage("JSON copied to clipboard");
    } catch {
      setMessage("Select the text and copy manually");
    }
  };

  if (!unlocked) {
    return (
      <AdminLogin
        onSuccess={() => {
          setUnlocked(true);
          setLoading(true);
          loadPlaces();
        }}
      />
    );
  }

  if (loading || !state) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-white/50">
        Loading locations…
      </div>
    );
  }

  return (
    <div className="admin-app flex flex-col min-h-[calc(100vh-4rem)]">
      <header className="admin-topbar flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3 bg-[#0a0a12]">
        <div>
          <h1
            className="text-base font-bold text-violet-100"
            style={{ fontFamily: "var(--font-display), serif" }}
          >
            Haunted Sweden Admin
          </h1>
          <p className="text-xs text-white/40">
            Local dev · v{state.version} · {state.places.length} locations
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setLoading(true);
              loadPlaces().finally(() => setLoading(false));
            }}
            className="admin-btn admin-btn--ghost"
            title="Reload from file"
          >
            <RefreshCw className="h-4 w-4" aria-hidden />
          </button>
          <button
            type="button"
            onClick={handleSaveFile}
            disabled={saving}
            className="admin-btn admin-btn--primary"
          >
            <Save className="h-4 w-4" aria-hidden />
            {saving ? "Saving…" : "Save to JSON file"}
          </button>
          <button
            type="button"
            onClick={handleCopyJson}
            className="admin-btn admin-btn--ghost"
          >
            <Copy className="h-4 w-4" aria-hidden />
            Copy updated JSON
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="admin-btn admin-btn--ghost"
          >
            <LogOut className="h-4 w-4" aria-hidden />
            Logout
          </button>
        </div>
      </header>

      {message ? (
        <p className="px-4 py-2 text-sm text-violet-200/90 bg-violet-950/30 border-b border-violet-500/20">
          {message}
        </p>
      ) : null}

      <div className="flex flex-1 min-h-0 flex-col lg:flex-row">
        <div className="lg:w-72 shrink-0 max-h-[40vh] lg:max-h-none">
          <AdminPlaceList
            places={state.places}
            selectedId={selectedId}
            query={listQuery}
            onQueryChange={setListQuery}
            onSelect={setSelectedId}
          />
        </div>
        <div className="flex flex-1 min-h-0 min-w-0">
          {selectedDraft ? (
            <AdminPlaceEditor draft={selectedDraft} onChange={updateDraft} />
          ) : (
            <div className="flex flex-1 items-center justify-center text-white/40 text-sm">
              Select a location
            </div>
          )}
        </div>
      </div>

      {copyOpen ? (
        <div
          className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/75"
          role="dialog"
          aria-modal="true"
          aria-labelledby="admin-copy-title"
        >
          <div className="w-full max-w-3xl max-h-[85vh] flex flex-col rounded-2xl border border-violet-500/30 bg-[#0c0c14] shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <h2 id="admin-copy-title" className="font-semibold text-violet-100">
                Updated haunted-places.json
              </h2>
              <button
                type="button"
                onClick={() => setCopyOpen(false)}
                className="admin-btn admin-btn--ghost text-sm"
              >
                Close
              </button>
            </div>
            <p className="px-4 py-2 text-xs text-white/50">
              Paste this into{" "}
              <code className="text-violet-300">data/haunted-places.json</code> if
              file save is unavailable.
            </p>
            <textarea
              readOnly
              value={copyText}
              className="flex-1 min-h-[240px] mx-4 mb-2 font-mono text-xs bg-black/50 border border-white/10 rounded-lg p-3 text-white/80"
            />
            <div className="flex gap-2 border-t border-white/10 p-4">
              <button
                type="button"
                onClick={handleCopyClipboard}
                className="admin-btn admin-btn--primary"
              >
                Copy to clipboard
              </button>
              <button
                type="button"
                onClick={() => setCopyOpen(false)}
                className="admin-btn admin-btn--ghost"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
