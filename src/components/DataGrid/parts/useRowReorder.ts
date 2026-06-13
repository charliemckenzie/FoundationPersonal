import { arrayMove } from '@dnd-kit/sortable';

type Id = string | number;

export interface UseRowReorderResult {
  /** Move a row from one index to another and emit the new order. */
  move: (from: number, to: number) => void;
}

/**
 * Index-based reorder for the keyboard arrow controls. Pointer dragging is handled
 * separately by dnd-kit in `DataGrid`; both paths funnel into the same `onReorder`.
 */
export function useRowReorder(orderedIds: Id[], onReorder?: (ids: Id[]) => void): UseRowReorderResult {
  function move(from: number, to: number) {
    if (!onReorder || to < 0 || to >= orderedIds.length || from === to) return;
    onReorder(arrayMove(orderedIds, from, to));
  }

  return { move };
}
