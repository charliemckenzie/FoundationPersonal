'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { SxProps, Theme } from '@mui/material/styles';
import type React from 'react';
import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import { restrictToVerticalAxis, restrictToParentElement } from '@dnd-kit/modifiers';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Spinner } from '../Spinner';
import { useTableSort } from '../Table/parts/useTableSort';
import { DataGridHeader } from './parts/DataGridHeader';
import { DataGridRow } from './parts/DataGridRow';
import { SortableDataGridRow } from './parts/SortableDataGridRow';
import { DataGridPagination } from './parts/DataGridPagination';
import { buildGridTemplate } from './parts/gridTemplate';
import { useRowReorder } from './parts/useRowReorder';
import { useRowSelection } from './parts/useRowSelection';
import { DENSITY_PY } from '../Table/parts/sharedConstants';
import type { DataGridColumn, DataGridDensity, DataGridPaginationConfig } from './types';

export type { DataGridColumn, DataGridDensity, DataGridAlign, DataGridPaginationConfig } from './types';

const HORIZONTAL_PADDING = 2.5;

export interface DataGridProps<T extends { id: string | number }> {
  columns: DataGridColumn<T>[];
  rows: T[];
  /** Accessible name for the grid (maps to `aria-label`). */
  label: string;
  density?: DataGridDensity;
  loading?: boolean;
  emptyMessage?: string;
  /** Master sort toggle; opt individual columns in with `column.sortable`. Ignored when `reorderable`. */
  sortable?: boolean;
  /** Adds a leading selection checkbox column. Controlled via `selectedIds`. */
  selectable?: boolean;
  selectedIds?: Array<string | number>;
  onSelectionChange?: (ids: Array<string | number>) => void;
  /** Adds a drag handle + arrow controls. Rows render in the given order. */
  reorderable?: boolean;
  onReorder?: (orderedIds: Array<string | number>) => void;
  /** Renders a pagination footer. The consumer slices `rows` to the current page. */
  pagination?: DataGridPaginationConfig;
  /** Full-width footer content (e.g. a totals row). Receives the rows when a function. */
  summaryRow?: React.ReactNode | ((rows: T[]) => React.ReactNode);
  sx?: SxProps<Theme>;
}

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

      <Box role="rowgroup">
        {loading && (
          <Box role="row">
            <Box role="cell" sx={{ py: 4, display: 'flex', justifyContent: 'center' }}>
              <Spinner size="medium" />
            </Box>
          </Box>
        )}
        {isEmpty && (
          <Box role="row">
            <Box role="cell" sx={{ py: 4, display: 'flex', justifyContent: 'center' }}>
              <Typography variant="body" color="text.muted">
                {emptyMessage}
              </Typography>
            </Box>
          </Box>
        )}
        {!loading && reorderable && (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis, restrictToParentElement]}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={orderedIds} strategy={verticalListSortingStrategy}>
              {displayRows.map((row, index) => (
                <SortableDataGridRow key={row.id} row={row} {...rowProps(row, index)} />
              ))}
            </SortableContext>
          </DndContext>
        )}
        {!loading && !reorderable &&
          displayRows.map((row, index) => (
            <DataGridRow
              key={row.id}
              row={row}
              reorderable={false}
              isDragging={false}
              {...rowProps(row, index)}
            />
          ))}
      </Box>

      {summaryRow != null && (
        <Box role="row" sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
          <Box role="cell">{typeof summaryRow === 'function' ? summaryRow(rows) : summaryRow}</Box>
        </Box>
      )}

      {pagination && <DataGridPagination pagination={pagination} />}
    </Box>
  );
}
