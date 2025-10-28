export interface Match {
  id: string;
  sport: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  status: "upcoming" | "live" | "finished" | string;
  matchTime: string;
  league: string;
  venue: string;
  source: string;
  lastUpdated: string;
  isFavorite?: boolean;
}

export interface MatchesResponse {
  matches: Match[];
  message: boolean;
}

type RowFlags = {
  isNew?: boolean;
  isRemoved?: boolean;
};

export type MatchWithFlags = Match & RowFlags;
