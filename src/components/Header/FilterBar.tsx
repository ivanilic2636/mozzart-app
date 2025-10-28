import type { Filters } from "../../types/filters";

type Props = {
  sports: string[];
  statuses: string[];
  value: Filters;
  onChange: (next: Filters) => void;
};

export default function FilterBar({
  sports,
  statuses,
  value,
  onChange,
}: Props) {
  return (
    <div className="flex flex-wrap items-end gap-3">
      <label className="flex flex-col text-xs">
        <span className="mb-1 text-gray-600 font-medium">Sport</span>
        <select
          className="h-10 min-w-40 rounded-lg border border-gray-300 bg-white px-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
          value={value.sport}
          onChange={(e) => onChange({ ...value, sport: e.target.value })}
        >
          {sports.map((sport) => (
            <option key={sport} value={sport}>
              {sport}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col text-xs">
        <span className="mb-1 text-gray-600 font-medium">Status</span>
        <select
          className="h-10 min-w-40 rounded-lg border border-gray-300 bg-white px-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
          value={value.status}
          onChange={(e) => onChange({ ...value, status: e.target.value })}
        >
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </label>

      <button
        type="button"
        className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 shadow-sm hover:bg-gray-100 active:bg-gray-200"
        onClick={() => onChange({ sport: "all", status: "all" })}
      >
        Reset
      </button>
    </div>
  );
}
