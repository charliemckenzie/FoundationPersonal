'use client';

import Box from '@mui/material/Box';
import {
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { useTableSort } from '../Table/parts/useTableSort';
import { DataGridHeader } from './parts/DataGridHeader';
import { DataGridBody } from './parts/DataGridBody';
import { DataGridPagination } from './parts/DataGridPagination';
import { buildGridTemplate } from './parts/gridTemplate';
import { useRowReorder } from './parts/useRowReorder';
import { useRowSelection } from './parts/useRowSelection';
import { DENSITY_PY } from '../Table/parts/sharedConstants';
import type { DataGridProps } from './types';

export type { DataGridColumn, DataGridDensity, DataGridAlign, DataGridPaginationConfig, DataGridProps } from './types';

const HORIZONTAL_PADDING = 2.5;

/**
 * An interactive, `div`-based grid (ARIA `role="table"`) for editable cells, row
 * reordering, selection, sorting, and pagination. For static tabular data use `Table`.
 */
export function DataGrid<T extends { id: string | number }>({
  columns,
  rows,
  label,
  density = 'default',
  loading = false,
  emptyMessage = 'No data to display.',
  sortable = false,
  selectable = false,
  selectedIds,
  onSelectionChange,
  reorderable = false,
  onReorder,
  pagination,
  summaryRow,
  sx,
}: DataGridProps<T>) {
  const { sortKey, sortOrder, sortedRows, handleSortClick } = useTableSort(rows);
  // Reorder mode shows rows in their provided order — sorting would fight manual ordering.
  const displayRows = reorderable ? rows : sortedRows;

  const selection = useRowSelection(rows.map((r) => r.id), selectedIds, onSelectionChange);
  const orderedIds = displayRows.map((r) => r.id);
  const reorder = useRowReorder(reorderable ? orderedIds : [], onReorder);

  // A small activation distance lets clicks through (e.g. the arrow buttons) and
  // only starts a drag once the pointer has actually moved.
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }));

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!onReorder || !over || active.id === over.id) return;
    const from = orderedIds.findIndex((id) => id === active.id);
    const to = orderedIds.findIndex((id) => id === over.id);
    if (from === -1 || to === -1) return;
    onReorder(arrayMove(orderedIds, from, to));
  }

  const gridTemplateColumns = buildGridTemplate(columns, { selectable, reorderable });
  const py = DENSITY_PY[density];
  const isEmpty = !loading && rows.length === 0;
  const colCount = columns.length + (selectable ? 1 : 0) + (reorderable ? 2 : 0);
  // Row indices only carry meaning when rows span pages — omit them otherwise.
  const rowCount = pagination ? pagination.count + 1 : undefined;
  const pageOffset = pagination ? pagination.page * pagination.rowsPerPage : 0;
  const ariaRowIndexOf = (index: number): number | undefined =>
    pagination ? pageOffset + index + 2 : undefined;

  const firstColKey = columns.length ? String(columns[0].key) : 'id';
  const rowLabelOf = (row: T): string => {
    const value = (row as Record<string, unknown>)[firstColKey];
    return typeof value === 'string' || typeof value === 'number' ? String(value) : String(row.id);
  };

  /** Props shared by both the plain and sortable row renderers. */
  const rowProps = (row: T, index: number) => ({
    columns,
    gridTemplateColumns,
    px: HORIZONTAL_PADDING,
    py,
    ariaRowIndex: ariaRowIndexOf(index),
    showBottomBorder: index < displayRows.length - 1,
    rowLabel: rowLabelOf(row),
    selectable,
    selected: selection.isSelected(row.id),
    onToggleSelect: () => selection.toggleRow(row.id),
    isFirst: index === 0,
    isLast: index === displayRows.length - 1,
    onMoveUp: () => reorder.move(index, index - 1),
    onMoveDown: () => reorder.move(index, index + 1),
  });

  return (
    <Box
      role="table"
      aria-label={label}
      aria-rowcount={rowCount}
      aria-colcount={colCount}
      aria-busy={loading || undefined}
      sx={[
        {
          border: '1px solid',
          borderColor: 'border.default',
          borderRadius: (t) => `${t.shape.lg}px`,
          overflow: 'hidden',
          bgcolor: 'background.paper',
        },
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
    >
      <DataGridHeader
        columns={columns}
        gridTemplateColumns={gridTemplateColumns}
        px={HORIZONTAL_PADDING}
        py={py}
        selectable={selectable}
        reorderable={reorderable}
        sortKey={sortable ? sortKey : null}
        sortOrder={sortOrder}
        onSort={handleSortClick}
        allSelected={selection.allSelected}
        someSelected={selection.someSelected}
        onToggleAll={selection.toggleAll}
        ariaRowIndex={pagination ? 1 : undefined}
      />

      <DataGridBody
        loading={loading}
        isEmpty={isEmpty}
        emptyMessage={emptyMessage}
        reorderable={reorderable}
        sensors={sensors}
        onDragEnd={handleDragEnd}
        orderedIds={orderedIds}
        displayRows={displayRows}
        rowProps={rowProps}
      />

      {summaryRow != null && (
        <Box role="row" sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
          <Box role="cell">{typeof summaryRow === 'function' ? summaryRow(rows) : summaryRow}</Box>
        </Box>
      )}

      {pagination && <DataGridPagination pagination={pagination} />}
    </Box>
  );
}
