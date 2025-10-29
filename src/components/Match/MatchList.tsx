// src/components/MatchList.tsx
import { useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useMatchDiff } from "../../hooks/useMatchDiff";
import { useMatches } from "../../hooks/useMatches";
import { useFavorites } from "../../hooks/useFavourites";
import { formatClock } from "../../utils/datetime";
import MatchRow from "./MatchRow";
import Toolbar from "../Header/Toolbar";
import ErrorBanner from "../ErrorBanner";
import SkeletonRow from "./SkeletonRow";
import type { Filters } from "../../types/filters";
import type { Match } from "../../types/match";
import type { SortKey } from "../../types/sort";
import VirtualizedMatches from "./VirtualizedMatches";

export default function MatchList() {
  const { data, isLoading, isFetching, error, dataUpdatedAt } =
    useMatches(5000);
  const displayMatch = useMatchDiff(data ?? []);

  const [filters, setFilters] = useState<Filters>({
    sport: "all",
    status: "all",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const searchQueryName = searchQuery.trim().toLowerCase();
  const [sort, setSort] = useState<SortKey>("alpha-asc");
  const { favorites, toggleFavorite } = useFavorites();
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const queryClient = useQueryClient();

  const sports = useMemo(() => {
    const set = new Set<string>(["all"]);
    (data ?? []).forEach((m) => set.add(m.sport.toLowerCase()));
    return Array.from(set);
  }, [data]);

  const statuses = useMemo(() => {
    const set = new Set<string>(["all"]);
    (data ?? []).forEach((m) => set.add(m.status.toLowerCase()));
    return Array.from(set);
  }, [data]);

  const filteredBySelectors: Match[] = useMemo(() => {
    const sport = filters.sport.toLowerCase();
    const status = filters.status.toLowerCase();
    return displayMatch.filter(
      (m) =>
        (sport === "all" || m.sport.toLowerCase() === sport) &&
        (status === "all" || m.status.toLowerCase() === status)
    );
  }, [displayMatch, filters]);

  const filtered: Match[] = useMemo(() => {
    if (!searchQueryName) return filteredBySelectors;
    return filteredBySelectors.filter(
      (match) =>
        match.homeTeam.toLowerCase().includes(searchQueryName) ||
        match.awayTeam.toLowerCase().includes(searchQueryName)
    );
  }, [filteredBySelectors, searchQueryName]);

  const sorted = useMemo(() => {
    const arr = [...filtered];

    if (sort === "time-asc") {
      arr.sort((a, b) => +new Date(a.matchTime) - +new Date(b.matchTime));
    } else if (sort === "time-desc") {
      arr.sort((a, b) => +new Date(b.matchTime) - +new Date(a.matchTime));
    } else if (sort === "alpha-asc") {
      arr.sort((a, b) =>
        a.homeTeam.localeCompare(b.homeTeam, undefined, { sensitivity: "base" })
      );
    } else if (sort === "alpha-desc") {
      arr.sort((a, b) =>
        b.homeTeam.localeCompare(a.homeTeam, undefined, { sensitivity: "base" })
      );
    }

    return arr;
  }, [filtered, sort]);

  const filteredByFavorites = useMemo(() => {
    if (!showFavoritesOnly) return sorted;
    return sorted.filter((match) => favorites.has(match.id));
  }, [sorted, favorites, showFavoritesOnly]);

  if (isLoading) {
    return (
      <ul className="grid gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonRow key={i} />
        ))}
      </ul>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <ErrorBanner
          onRetry={() =>
            queryClient.invalidateQueries({ queryKey: ["matches"] })
          }
        />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">
          All Matches
        </h2>
        <div className="text-xs md:text-sm text-gray-600">
          {isFetching ? (
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-gray-400 animate-pulse" />
              Refreshing…
            </span>
          ) : (
            <span>
              Last updated:{" "}
              <span className="font-medium">{formatClock(dataUpdatedAt)}</span>
            </span>
          )}
        </div>
      </div>

      <Toolbar
        sports={sports}
        statuses={statuses}
        filters={filters}
        onFilters={setFilters}
        query={searchQuery}
        onQuery={setSearchQuery}
        sort={sort}
        onSort={setSort}
      />

      <div className="flex justify-end mb-2">
        <button
          onClick={() => setShowFavoritesOnly((v) => !v)}
          className={`text-sm rounded-lg border px-3 py-1 transition ${
            showFavoritesOnly
              ? "border-yellow-400 bg-yellow-50 text-yellow-700"
              : "border-gray-300 hover:bg-gray-50 text-gray-700"
          }`}
        >
          {showFavoritesOnly ? "Showing Favorites" : "Show Favorites"}
        </button>
      </div>

      {filteredByFavorites.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 p-10 text-center text-sm text-gray-600">
          No matches for current filters/search.
        </div>
      ) : filteredByFavorites.length < 50 ? (
        <ul className="grid gap-3">
          {filteredByFavorites.map((match) => (
            <MatchRow
              key={match.id}
              match={match}
              isFavorite={favorites.has(match.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </ul>
      ) : (
        <VirtualizedMatches
          items={filteredByFavorites}
          isFavorite={(id) => favorites.has(id)}
          onToggleFavorite={toggleFavorite}
          estimate={130}
        />
      )}
    </div>
  );
}
