import { useMemo, useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import type { Match } from "../../types/match";
import MatchRow from "./MatchRow";

type Props = {
  items: Match[];
  isFavorite: (id: string) => boolean;
  onToggleFavorite: (id: string) => void;
  estimate?: number;
  className?: string;
};

export default function VirtualizedMatches({
  items,
  isFavorite,
  onToggleFavorite,
  estimate = 100,
  className = "max-h-[70vh] rounded-xl bg-white/30",
}: Props) {
  const parentRef = useRef<HTMLDivElement | null>(null);

  const data = useMemo(() => items, [items]);

  const rowVirtualizer = useVirtualizer({
    count: data.length,
    getItemKey: (index) => data[index].id,
    getScrollElement: () => parentRef.current,
    estimateSize: () => estimate,
    overscan: 8,
  });

  const totalSize = rowVirtualizer.getTotalSize();
  const virtualRows = rowVirtualizer.getVirtualItems();

  return (
    <div ref={parentRef} className={className}>
      <div style={{ height: totalSize, position: "relative" }}>
        {virtualRows.map((vr) => {
          const m = data[vr.index];
          return (
            <div
              key={vr.key}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${vr.start}px)`,
              }}
              ref={(el) => {
                if (el) {
                  rowVirtualizer.measureElement(el);
                }
              }}
              className="p-1"
            >
              <ul className="grid m-0 p-0 list-none">
                <MatchRow
                  match={m}
                  isFavorite={isFavorite(m.id)}
                  onToggleFavorite={onToggleFavorite}
                />
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
