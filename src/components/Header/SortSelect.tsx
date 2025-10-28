import type { SortKey } from "../../types/sort";

type Props = { value: SortKey; onChange: (v: SortKey) => void };

export default function SortSelect({ value, onChange }: Props) {
  return (
    <div className="w-full md:w-56">
      <label className="flex flex-col text-xs">
        <span className="mb-1 text-gray-600 font-medium">Sort by</span>
        <select
          className="h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
          value={value}
          onChange={(e) => onChange(e.target.value as SortKey)}
        >
          <option value="time-asc">Start time (earliest first)</option>
          <option value="time-desc">Start time (latest first)</option>
          <option value="alpha-asc">Alphabetical (A → Z)</option>
          <option value="alpha-desc">Alphabetical (Z → A)</option>
        </select>
      </label>
    </div>
  );
}
