import type { Match } from "../../types/match";
import { formatTime } from "../../utils/datetime";
import { statusBadgeClasses } from "../../utils/status";
import { Star } from "lucide-react";

type Props = {
  match: Match & { isNew?: boolean; isRemoved?: boolean };
  onToggleFavorite?: (id: string) => void;
  isFavorite?: boolean;
};

export default function MatchRow({
  match,
  onToggleFavorite,
  isFavorite,
}: Props) {
  const rowAnim =
    (match.isNew ? " animate-[flash-new_1s_ease_forwards]" : "") +
    (match.isRemoved ? " animate-[flash-removed_1s_ease_forwards]" : "");
  const badge = statusBadgeClasses(match.status);

  return (
    <li
      className={
        "relative rounded-xl border border-gray-200 bg-white p-3 md:p-4 shadow-sm hover:shadow transition " +
        rowAnim
      }
    >
      {onToggleFavorite && (
        <button
          onClick={() => onToggleFavorite(match.id)}
          className="absolute top-3 right-3 text-gray-300 hover:text-yellow-400 transition"
        >
          <Star
            className={`h-5 w-5 ${
              isFavorite ? "fill-yellow-400 text-yellow-400" : ""
            }`}
          />
        </button>
      )}

      <div className="text-xs md:text-sm text-gray-600 flex flex-wrap items-center gap-1">
        <span className="font-semibold capitalize">{match.sport}</span>
        <span className="opacity-70">·</span>
        <span className="truncate">{match.league}</span>
      </div>

      <div className="mt-1 md:mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-base md:text-lg">
        <span className="font-medium truncate">{match.homeTeam}</span>
        <span className="font-semibold px-1 md:px-1.5">
          {match.homeScore} : {match.awayScore}
        </span>
        <span className="font-medium truncate">{match.awayTeam}</span>
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs md:text-sm text-gray-700">
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-semibold ${badge}`}
        >
          {match.status.toLowerCase() === "live" && (
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-40" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-current" />
            </span>
          )}
          <span className="capitalize">{match.status}</span>
        </span>

        <span className="text-gray-400">•</span>
        <span className="text-gray-800">{formatTime(match.matchTime)}</span>

        <span className="text-gray-400">•</span>
        <span className="truncate max-w-[40ch]">{match.venue}</span>
      </div>
    </li>
  );
}
