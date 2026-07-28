"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Copy, LogOut, RefreshCw, Save } from "lucide-react";
import hauntedPlacesFile from "@/data/haunted-places.json";
import {
  clearAdminSession,
  clientHasPermission,
  getAdminAuthHeaders,
  getStoredAdminUser,
  isAdminSessionActive,
  isAdminSessionExpired,
} from "@/lib/admin/auth";
import { getSubmissionCapabilities } from "@/lib/admin/capabilities";
import {
  canAccessPlacesTab,
  getPlaceEditorAccess,
} from "@/lib/admin/editor-access";
import { ROLE_LABELS } from "@/lib/admin/permissions";
import {
  adminStateToFile,
  exportJsonString,
  fileToAdminState,
} from "@/lib/admin/serialize";
import type { AdminPlaceDraft, AdminPlacesState } from "@/lib/admin/types";
import type { AdminPublicUser } from "@/lib/admin/users-types";
import type { HauntedPlace, HauntedPlacesFile } from "@/lib/types/place";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { AdminPlaceList } from "@/components/admin/AdminPlaceList";
import { AdminPlaceEditor } from "@/components/admin/AdminPlaceEditor";
import { AdminSubmissionsInbox } from "@/components/admin/AdminSubmissionsInbox";
import { AdminUsersPanel } from "@/components/admin/AdminUsersPanel";
import { AdminNewsletterPanel } from "@/components/admin/AdminNewsletterPanel";
import { AdminCommunityMembersPanel } from "@/components/admin/AdminCommunityMembersPanel";
import { AdminMembersPanel } from "@/components/admin/AdminMembersPanel";
import { getTranslations } from "@/lib/i18n";
import { useLanguage } from "@/lib/language-context";

const initialFile = hauntedPlacesFile as HauntedPlacesFile;

type AdminMainTab =
  | "places"
  | "submissions"
  | "users"
  | "newsletter"
  | "community"
  | "members";

function defaultTabForUser(user: AdminPublicUser): AdminMainTab {
  if (clientHasPermission(user, "view_submissions")) return "submissions";
  if (canAccessPlacesTab(user)) return "places";
  if (clientHasPermission(user, "view_analytics")) return "newsletter";
  if (clientHasPermission(user, "manage_users")) return "users";
  return "submissions";
}

export function AdminApp() {
  const { locale } = useLanguage();
  const adminT = getTranslations(locale).adminSubmissions;
  const [currentUser, setCurrentUser] = useState<AdminPublicUser | null>(null);
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
  const [mainTab, setMainTab] = useState<AdminMainTab>("submissions");

  const submissionCaps = useMemo(
    () => getSubmissionCapabilities(currentUser),
    [currentUser]
  );
  const editorAccess = useMemo(
    () => getPlaceEditorAccess(currentUser),
    [currentUser]
  );

  const expireSession = useCallback((reason?: string) => {
    clearAdminSession();
    setUnlocked(false);
    setCurrentUser(null);
    setState(null);
    if (reason) setMessage(reason);
    setLoading(false);
  }, []);

  const loadPlaces = useCallback(async () => {
    const headers = getAdminAuthHeaders();
    if (!Object.keys(headers).length) {
      setState(fileToAdminState(initialFile));
      originalsRef.current = initialFile.places;
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/admin/places", { headers });
      if (res.status === 401) {
        expireSession("Sessionen har gått ut. Logga in igen.");
        return;
      }
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
  }, [expireSession]);

  useEffect(() => {
    const stored = getStoredAdminUser();
    if (isAdminSessionExpired()) {
      clearAdminSession();
      setLoading(false);
      return;
    }
    if (isAdminSessionActive() && stored) {
      setCurrentUser(stored);
      setUnlocked(true);
      setMainTab(defaultTabForUser(stored));
      loadPlaces();
    } else {
      setLoading(false);
    }
  }, [loadPlaces]);

  useEffect(() => {
    if (!unlocked) return;
    const tick = () => {
      if (isAdminSessionExpired()) expireSession();
    };
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, [unlocked, expireSession]);

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
    expireSession();
  };

  const handleLoginSuccess = (user: AdminPublicUser) => {
    setCurrentUser(user);
    setUnlocked(true);
    setMainTab(defaultTabForUser(user));
    setLoading(true);
    loadPlaces();
  };

  const handleSaveFile = async () => {
    if (!state || !clientHasPermission(currentUser, "edit_locations")) {
      setMessage("You do not have permission to save locations.");
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
          ...getAdminAuthHeaders(),
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

  const showPlacesTab = canAccessPlacesTab(currentUser);
  const showSubmissionsTab = submissionCaps.canView;
  const showUsersTab = clientHasPermission(currentUser, "manage_users");
  const showNewsletterTab = clientHasPermission(currentUser, "view_analytics");
  const canSavePlaces = clientHasPermission(currentUser, "edit_locations");

  if (!unlocked) {
    return <AdminLogin onSuccess={handleLoginSuccess} />;
  }

  if (loading || !state) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-white/50">
        Loading…
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
          {currentUser ? (
            <div className="admin-user-badge mr-1">
              <span className="admin-user-badge-name">
                {currentUser.displayName}
              </span>
              <span
                className={`admin-role-pill admin-role-pill--${currentUser.role}`}
              >
                {ROLE_LABELS[currentUser.role]}
              </span>
            </div>
          ) : null}
          {showPlacesTab ? (
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
          ) : null}
          {showPlacesTab && canSavePlaces ? (
            <button
              type="button"
              onClick={handleSaveFile}
              disabled={saving}
              className="admin-btn admin-btn--primary"
            >
              <Save className="h-4 w-4" aria-hidden />
              {saving ? "Saving…" : "Save to JSON file"}
            </button>
          ) : null}
          {showPlacesTab ? (
            <button
              type="button"
              onClick={handleCopyJson}
              className="admin-btn admin-btn--ghost"
            >
              <Copy className="h-4 w-4" aria-hidden />
              Copy updated JSON
            </button>
          ) : null}
          <button
            type="button"
            onClick={handleLogout}
            className="admin-btn admin-btn--ghost"
          >
            <LogOut className="h-4 w-4" aria-hidden />
            Logga ut
          </button>
        </div>
      </header>

      {message ? (
        <p className="px-4 py-2 text-sm text-violet-200/90 bg-violet-950/30 border-b border-violet-500/20">
          {message}
        </p>
      ) : null}

      <nav
        className="flex gap-1 px-4 py-2 border-b border-white/10 bg-[#080810]"
        aria-label="Admin sections"
      >
        {showPlacesTab ? (
          <button
            type="button"
            onClick={() => setMainTab("places")}
            className={`admin-tab ${mainTab === "places" ? "admin-tab--active" : ""}`}
          >
            Locations
          </button>
        ) : null}
        {showSubmissionsTab ? (
          <button
            type="button"
            onClick={() => setMainTab("submissions")}
            className={`admin-tab ${mainTab === "submissions" ? "admin-tab--active" : ""}`}
          >
            {adminT.tab}
          </button>
        ) : null}
        {showUsersTab ? (
          <button
            type="button"
            onClick={() => setMainTab("users")}
            className={`admin-tab ${mainTab === "users" ? "admin-tab--active" : ""}`}
          >
            Users
          </button>
        ) : null}
        {showNewsletterTab ? (
          <button
            type="button"
            onClick={() => setMainTab("newsletter")}
            className={`admin-tab ${mainTab === "newsletter" ? "admin-tab--active" : ""}`}
          >
            Newsletter
          </button>
        ) : null}
        {showNewsletterTab ? (
          <button
            type="button"
            onClick={() => setMainTab("community")}
            className={`admin-tab ${mainTab === "community" ? "admin-tab--active" : ""}`}
          >
            Community
          </button>
        ) : null}
        {showNewsletterTab ? (
          <button
            type="button"
            onClick={() => setMainTab("members")}
            className={`admin-tab ${mainTab === "members" ? "admin-tab--active" : ""}`}
          >
            Members
          </button>
        ) : null}
      </nav>

      {mainTab === "newsletter" && showNewsletterTab ? (
        <AdminNewsletterPanel />
      ) : null}

      {mainTab === "community" && showNewsletterTab ? (
        <AdminCommunityMembersPanel />
      ) : null}

      {mainTab === "members" && showNewsletterTab ? (
        <AdminMembersPanel />
      ) : null}

      {mainTab === "users" && showUsersTab ? (
        <div className="flex flex-1 min-h-0 flex-col overflow-hidden">
          <AdminUsersPanel
            onUserUpdated={() => {
              const stored = getStoredAdminUser();
              if (stored) setCurrentUser(stored);
            }}
          />
        </div>
      ) : null}

      {mainTab === "submissions" && showSubmissionsTab ? (
        <AdminSubmissionsInbox
          placeOptions={state.places}
          labels={adminT}
          capabilities={submissionCaps}
          onPlacesChanged={() => {
            setLoading(true);
            loadPlaces().finally(() => setLoading(false));
          }}
        />
      ) : null}

      {mainTab === "places" && showPlacesTab ? (
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
              <AdminPlaceEditor
                draft={selectedDraft}
                onChange={updateDraft}
                access={editorAccess}
              />
            ) : (
              <div className="flex flex-1 items-center justify-center text-white/40 text-sm">
                Select a location
              </div>
            )}
          </div>
        </div>
      ) : null}

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
