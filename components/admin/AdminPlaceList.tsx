"use client";

import type { AdminPlaceDraft } from "@/lib/admin/types";

export function AdminPlaceList({
  places,
  selectedId,
  query,
  onQueryChange,
  onSelect,
}: {
  places: AdminPlaceDraft[];
  selectedId: string | null;
  query: string;
  onQueryChange: (q: string) => void;
  onSelect: (id: string) => void;
}) {
  const q = query.trim().toLowerCase();
  const filtered = q
    ? places.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q) ||
          p.region.toLowerCase().includes(q) ||
          p.slug.toLowerCase().includes(q)
      )
    : places;

  return (
    <aside className="admin-sidebar flex flex-col border-r border-white/10 bg-[#08080e]">
      <div className="border-b border-white/10 p-4">
        <h2 className="text-sm font-semibold text-violet-200">Locations</h2>
        <p className="text-xs text-white/40 mt-0.5">{places.length} total</p>
        <input
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search name, city, region…"
          className="admin-input mt-3 text-sm"
        />
      </div>
      <ul className="flex-1 overflow-y-auto p-2 space-y-1">
        {filtered.map((place) => (
          <li key={place.id}>
            <button
              type="button"
              onClick={() => onSelect(place.id)}
              className={`admin-list-item w-full text-left ${
                selectedId === place.id ? "admin-list-item--active" : ""
              }`}
            >
              <span className="font-medium text-sm text-white/90 line-clamp-1">
                {place.name}
              </span>
              <span className="text-xs text-white/45 block mt-0.5">
                {place.city} · {place.region}
              </span>
              <span className="text-[10px] text-white/35 block mt-0.5 line-clamp-1">
                {place.category} · {place.verificationLevel}
              </span>
              <span className="flex flex-wrap gap-1 mt-1.5">
                <span className="admin-pill">{place.status}</span>
                {place.featured ? (
                  <span className="admin-pill admin-pill--amber">featured</span>
                ) : null}
                {place.visitedByTeam ? (
                  <span className="admin-pill admin-pill--green">visited</span>
                ) : null}
              </span>
            </button>
          </li>
        ))}
        {filtered.length === 0 ? (
          <li className="px-3 py-8 text-center text-sm text-white/40">
            No matches
          </li>
        ) : null}
      </ul>
    </aside>
  );
}
