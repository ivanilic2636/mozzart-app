import axios from "axios";
import type { Match, MatchesResponse } from "../types/match";

const API_URL = import.meta.env.VITE_API_URL;
const API_USERNAME = import.meta.env.VITE_API_USERNAME;

export async function fetchMatches(): Promise<Match[]> {
  const res = await axios.get<MatchesResponse>(API_URL, {
    headers: { username: API_USERNAME },
    timeout: 10000,
  });

  const data = res.data;
  if (data && Array.isArray(data.matches)) return data.matches;

  console.warn("Unexpected API format:", data);
  return [];
}
