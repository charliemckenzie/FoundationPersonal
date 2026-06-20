'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
  DndContext,
  closestCenter,
  type DragEndEvent,
  type SensorDescriptor,
  type SensorOptions,
} from '@dnd-kit/core';
import { restrictToVerticalAxis, restrictToParentElement } from '@dnd-kit/modifiers';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Spinner } from '../../Spinner';
import { DataGridRow, type DataGridRowProps } from './DataGridRow';
import { SortableDataGridRow } from './SortableDataGridRow';

/** The subset of row props the grid computes per row and spreads into both row renderers. */
type SharedRowProps<T extends { id: string | number }> = Omit<
  DataGridRowProps<T>,
  'row' | 'reorderable' | 'isDragging' | 'setNodeRef' | 'dragStyle' | 'dragHandleProps'
>;

interface DataGridBodyProps<T extends { id: string | number }> {
  loading: boolean;
  isEmpty: boolean;
  emptyMessage: string;
  reorderable: boolean;
  sensors: SensorDescriptor<SensorOptions>[];
  onDragEnd: (event: DragEndEvent) => void;
  orderedIds: Array<string | number>;
  displayRows: T[];
  rowProps: (row: T, index: number) => SharedRowProps<T>;
}

export function DataGridBody<T extends { id: string | number }>({
  loading,
  isEmpty,
  emptyMessage,
  reorderable,
  sensors,
  onDragEnd,
  orderedIds,
  displayRows,
  rowProps,
}: DataGridBodyProps<T>) {
  return (
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
          onDragEnd={onDragEnd}
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
  );
}
