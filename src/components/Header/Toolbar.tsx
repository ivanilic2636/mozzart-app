import FilterBar from "./FilterBar";
import SearchBox from "./SearchBox";
import SortSelect from "./SortSelect";
import type { Filters } from "../../types/filters";
import type { SortKey } from "../../types/sort";

type Props = {
  sports: string[];
  statuses: string[];
  filters: Filters;
  onFilters: (f: Filters) => void;
  query: string;
  onQuery: (q: string) => void;
  sort: SortKey;
  onSort: (s: SortKey) => void;
};

export default function Toolbar({
  sports,
  statuses,
  filters,
  onFilters,
  query,
  onQuery,
  sort,
  onSort,
}: Props) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white/80 shadow-sm">
      <div className="grid gap-4 p-4 md:grid-cols-3 md:gap-6">
        <div className="md:col-span-2">
          <FilterBar
            sports={sports}
            statuses={statuses}
            value={filters}
            onChange={onFilters}
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-end">
          <SearchBox
            value={query}
            onChange={onQuery}
            placeholder="Search team…"
          />
          <SortSelect value={sort} onChange={onSort} />
        </div>
      </div>
    </section>
  );
}
