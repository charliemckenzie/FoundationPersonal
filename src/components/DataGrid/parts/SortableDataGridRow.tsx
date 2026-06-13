import { defaultAnimateLayoutChanges, useSortable, type AnimateLayoutChanges } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { DataGridRow } from './DataGridRow';
import type { DataGridColumn } from '../types';

// Force dnd-kit to animate index changes that happen *outside* an active drag —
// i.e. the keyboard arrow buttons — so a click slides the row with the same
// transition a drag uses, instead of snapping instantly.
const animateLayoutChanges: AnimateLayoutChanges = (args) =>
  defaultAnimateLayoutChanges({ ...args, wasDragging: true });

interface SortableDataGridRowProps<T extends { id: string | number }> {
  row: T;
  columns: DataGridColumn<T>[];
  gridTemplateColumns: string;
  px: number;
  py: number;
  ariaRowIndex?: number;
  showBottomBorder: boolean;
  rowLabel: string;
  selectable: boolean;
  selected: boolean;
  onToggleSelect: () => void;
  isFirst: boolean;
  isLast: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

/**
 * Bridges a single row to dnd-kit's sortable model. The transform/transition it
 * produces is what lifts the dragged row and slides its siblings to open a gap.
 */
export function SortableDataGridRow<T extends { id: string | number }>({
  row,
  ...rest
}: SortableDataGridRowProps<T>) {
  // Pointer `listeners` only — not `attributes`. Without a keyboard sensor the
  // dnd-kit focusable handle would be a dead control; the arrow buttons are the
  // accessible reorder path, so the handle stays decorative (aria-hidden).
  const { listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: row.id,
    animateLayoutChanges,
  });

  return (
    <DataGridRow
      row={row}
      {...rest}
      reorderable
      setNodeRef={setNodeRef}
      dragStyle={{ transform: CSS.Transform.toString(transform), transition }}
      dragHandleProps={listeners as Record<string, unknown>}
      isDragging={isDragging}
    />
  );
}
