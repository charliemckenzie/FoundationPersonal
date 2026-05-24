import { useState, useMemo } from 'react';

type SortOrder = 'asc' | 'desc';

interface UseTableSortResult<T> {
  sortKey: string | null;
  sortOrder: SortOrder;
  sortedRows: T[];
  handleSortClick: (key: string) => void;
}

/**
 * Provides sortable state and a memoised sorted view of `rows`. Sort is stable and
 * uses `String#localeCompare` with `numeric: true` so "10" sorts after "2".
 * Nulls always sink to the bottom regardless of order.
 */
export function useTableSort<T>(rows: T[]): UseTableSortResult<T> {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const handleSortClick = (key: string) => {
    if (sortKey === key) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const sortedRows = useMemo(() => {
    if (!sortKey) return rows;
    return [...rows].sort((a, b) => {
      const aVal = (a as Record<string, unknown>)[sortKey];
      const bVal = (b as Record<string, unknown>)[sortKey];
      if (aVal == null) return 1;
      if (bVal == null) return -1;
      const cmp = String(aVal).localeCompare(String(bVal), undefined, { numeric: true });
      return sortOrder === 'asc' ? cmp : -cmp;
    });
  }, [rows, sortKey, sortOrder]);

  return { sortKey, sortOrder, sortedRows, handleSortClick };
}
