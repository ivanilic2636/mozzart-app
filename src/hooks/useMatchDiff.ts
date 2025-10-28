import { useEffect, useMemo, useRef, useState } from "react";
import type { Match, MatchWithFlags } from "../types/match";

const FLASH_MS = 1000;

export function useMatchDiff(nextData: Match[] | undefined) {
  const [display, setDisplay] = useState<MatchWithFlags[]>([]);
  const prevRef = useRef<Map<string, Match>>(new Map());

  const byId = useMemo(() => {
    const match = new Map<string, Match>();
    if (nextData) for (const data of nextData) match.set(String(data.id), data);
    return match;
  }, [nextData]);

  useEffect(() => {
    if (!prevRef.current.size && nextData?.length) {
      setDisplay(nextData.map((match) => ({ ...match })));
      prevRef.current = byId;
      return;
    }

    if (!nextData) return;

    const deletedData = prevRef.current;
    const newData = byId;

    const newDataIds = new Set(newData.keys());

    const addedIds: string[] = [];
    const removedIds: string[] = [];

    const allIds = new Set([...deletedData.keys(), ...newData.keys()]);
    for (const id of allIds) {
      const deleted = deletedData.has(id);
      const added = newData.has(id);

      if (added && !deleted) addedIds.push(id);
      else if (deleted && !added) removedIds.push(id);
    }

    let merged: MatchWithFlags[] = [];
    for (const id of newDataIds) {
      const current = newData.get(id)!;
      merged.push({ ...current });
    }

    if (addedIds.length) {
      merged = merged.map((m) =>
        addedIds.includes(String(m.id)) ? { ...m, isNew: true } : m
      );
      setTimeout(() => {
        setDisplay((d) =>
          d.map((row) => (row.isNew ? { ...row, isNew: false } : row))
        );
      }, FLASH_MS);
    }

    if (removedIds.length) {
      const removedRows: MatchWithFlags[] = [];
      for (const id of removedIds) {
        const prevRow = deletedData.get(id);
        if (prevRow) removedRows.push({ ...prevRow, isRemoved: true });
      }
      merged = [...merged, ...removedRows];

      setTimeout(() => {
        setDisplay((d) => d.filter((r) => !removedIds.includes(String(r.id))));
      }, FLASH_MS);
    }

    setDisplay(merged);
    prevRef.current = newData;
  }, [byId, nextData]);

  return display;
}
