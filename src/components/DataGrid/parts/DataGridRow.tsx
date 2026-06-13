import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type React from 'react';
import { Checkbox } from '../../Checkbox';
import { Icon } from '../../Icon';
import { IconButton } from '../../IconButton';
import { cellAlignSx, SR_ONLY } from './cellStyle';
import type { DataGridColumn } from '../types';

interface DataGridRowProps<T extends { id: string | number }> {
  row: T;
  columns: DataGridColumn<T>[];
  gridTemplateColumns: string;
  px: number;
  py: number;
  /** Present only for paginated grids, where row indices span pages. */
  ariaRowIndex?: number;
  showBottomBorder: boolean;
  /** Accessible name for this row's selection / reorder controls. */
  rowLabel: string;
  selectable: boolean;
  selected: boolean;
  onToggleSelect: () => void;
  reorderable: boolean;
  /** dnd-kit node ref for the sortable row element. */
  setNodeRef?: (el: HTMLElement | null) => void;
  /** dnd-kit transform/transition style — drives the lift and sibling slide. */
  dragStyle?: React.CSSProperties;
  /** dnd-kit pointer listeners, spread onto the drag handle. */
  dragHandleProps?: Record<string, unknown>;
  /** This row is the one being dragged — render it lifted above the others. */
  isDragging: boolean;
  isFirst: boolean;
  isLast: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

export function DataGridRow<T extends { id: string | number }>({
  row,
  columns,
  gridTemplateColumns,
  px,
  py,
  ariaRowIndex,
  showBottomBorder,
  rowLabel,
  selectable,
  selected,
  onToggleSelect,
  reorderable,
  setNodeRef,
  dragStyle,
  dragHandleProps,
  isDragging,
  isFirst,
  isLast,
  onMoveUp,
  onMoveDown,
}: DataGridRowProps<T>) {
  return (
    <Box
      ref={setNodeRef}
      role="row"
      aria-rowindex={ariaRowIndex}
      style={dragStyle}
      sx={{
        display: 'grid',
        gridTemplateColumns,
        gap: 2,
        alignItems: 'center',
        px,
        py,
        ...(reorderable && { pl: 1 }),
        bgcolor: 'background.paper',
        ...(showBottomBorder && !isDragging
          ? { borderBottom: '1px solid', borderColor: 'divider' }
          : {}),
        // Lifted appearance for the row under the pointer — floats above the
        // rest while dnd-kit slides the siblings to open a gap beneath it.
        ...(isDragging
          ? { position: 'relative', zIndex: 1, boxShadow: 6, borderRadius: (t) => `${t.shape.sm}px` }
          : {}),
      }}
    >
      {reorderable && (
        <Box
          role="cell"
          {...dragHandleProps}
          sx={{
            ...cellAlignSx('center'),
            color: 'text.muted',
            cursor: isDragging ? 'grabbing' : 'grab',
            touchAction: 'none',
          }}
        >
          <Icon icon="bars" size="sm" color="inherit" />
        </Box>
      )}
      {selectable && (
        <Box role="cell" sx={{ ...cellAlignSx('center'), '& .MuiFormControlLabel-label': SR_ONLY }}>
          <Checkbox label={`Select ${rowLabel}`} checked={selected} onChange={onToggleSelect} />
        </Box>
      )}
      {columns.map((col) => {
        const key = String(col.key);
        const content = col.renderCell
          ? col.renderCell(row)
          : String((row as Record<string, unknown>)[key] ?? '');
        const isText = typeof content === 'string' || typeof content === 'number';
        return (
          <Box key={key} role="cell" sx={cellAlignSx(col.align)}>
            {isText ? <Typography variant="body">{content}</Typography> : content}
          </Box>
        );
      })}
      {reorderable && (
        <Box role="cell" sx={{ ...cellAlignSx('right'), gap: 0.5 }}>
          <IconButton
            icon="arrow-up"
            label={`Move ${rowLabel} up`}
            variant="ghost"
            size="small"
            disabled={isFirst}
            onClick={onMoveUp}
          />
          <IconButton
            icon="arrow-down"
            label={`Move ${rowLabel} down`}
            variant="ghost"
            size="small"
            disabled={isLast}
            onClick={onMoveDown}
          />
        </Box>
      )}
    </Box>
  );
}
