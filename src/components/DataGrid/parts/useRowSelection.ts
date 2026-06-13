type Id = string | number;

export interface UseRowSelectionResult {
  isSelected: (id: Id) => boolean;
  allSelected: boolean;
  /** True when some — but not all — rows are selected (header indeterminate state). */
  someSelected: boolean;
  toggleRow: (id: Id) => void;
  toggleAll: () => void;
}

/**
 * Controlled row-selection model. The grid owns no state — `selectedIds` and
 * `onSelectionChange` come from the consumer so selection composes with their data.
 */
export function useRowSelection(
  rowIds: Id[],
  selectedIds: Id[] = [],
  onSelectionChange?: (ids: Id[]) => void,
): UseRowSelectionResult {
  const selected = new Set(selectedIds);
  const allSelected = rowIds.length > 0 && rowIds.every((id) => selected.has(id));
  const someSelected = !allSelected && rowIds.some((id) => selected.has(id));

  function toggleRow(id: Id) {
    if (!onSelectionChange) return;
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    onSelectionChange([...next]);
  }

  function toggleAll() {
    if (!onSelectionChange) return;
    onSelectionChange(allSelected ? [] : [...rowIds]);
  }

  return { isSelected: (id) => selected.has(id), allSelected, someSelected, toggleRow, toggleAll };
}
