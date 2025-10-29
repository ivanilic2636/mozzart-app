import { useQuery } from "@tanstack/react-query";
import { fetchMatches } from "../api/matches";

export function useMatches(pollMs = 5000) {
  return useQuery({
    queryKey: ["matches"],
    queryFn: fetchMatches,
    refetchInterval: pollMs,
    retry: 3,
    retryDelay: (attempt) => Math.min(1000 * 2 ** (attempt - 1), 10_000),
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    staleTime: 2_000,
    gcTime: 5 * 60 * 1000,
    placeholderData: (prev) => prev,
  });
}
