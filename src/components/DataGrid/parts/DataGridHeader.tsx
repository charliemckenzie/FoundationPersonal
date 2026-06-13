import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Checkbox } from '../../Checkbox';
import { Icon } from '../../Icon';
import { cellAlignSx, SR_ONLY } from './cellStyle';
import type { DataGridColumn } from '../types';

type SortOrder = 'asc' | 'desc';

interface DataGridHeaderProps<T> {
  columns: DataGridColumn<T>[];
  gridTemplateColumns: string;
  px: number;
  py: number;
  selectable: boolean;
  reorderable: boolean;
  /** Header is row 1 when the grid exposes row indices (paginated); omitted otherwise. */
  ariaRowIndex?: number;
  sortKey: string | null;
  sortOrder: SortOrder;
  onSort: (key: string) => void;
  allSelected: boolean;
  someSelected: boolean;
  onToggleAll: () => void;
}

const HEADER_LABEL_SX = { fontWeight: 700, color: 'text.primary' } as const;

const SORT_BUTTON_SX = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 0.5,
  p: 0,
  m: 0,
  border: 'none',
  background: 'none',
  font: 'inherit',
  cursor: 'pointer',
  color: 'text.primary',
  borderRadius: '2px',
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: 'border.focus',
    outlineOffset: '2px',
  },
} as const;

function sortIcon(active: boolean, order: SortOrder): string {
  if (!active) return 'arrows-up-down';
  return order === 'asc' ? 'arrow-up' : 'arrow-down';
}

/** Header band: column labels, sort affordances, and the select-all checkbox. */
export function DataGridHeader<T>({
  columns,
  gridTemplateColumns,
  px,
  py,
  selectable,
  reorderable,
  ariaRowIndex,
  sortKey,
  sortOrder,
  onSort,
  allSelected,
  someSelected,
  onToggleAll,
}: DataGridHeaderProps<T>) {
  return (
    <Box role="rowgroup" sx={{ bgcolor: 'background.paper', borderBottom: '1px solid', borderColor: 'border.input' }}>
      <Box role="row" aria-rowindex={ariaRowIndex} sx={{ display: 'grid', gridTemplateColumns, gap: 2, alignItems: 'center', px, py, ...(reorderable && { pl: 1 }) }}>
        {reorderable && <Box role="columnheader" aria-label="Reorder" />}
        {selectable && (
          <Box role="columnheader" sx={{ ...cellAlignSx('center'), '& .MuiFormControlLabel-label': SR_ONLY }}>
            <Checkbox
              label="Select all rows"
              checked={allSelected}
              indeterminate={someSelected}
              onChange={onToggleAll}
            />
          </Box>
        )}
        {columns.map((col) => {
          const key = String(col.key);
          const active = sortKey === key;
          const ariaSort = active ? (sortOrder === 'asc' ? 'ascending' : 'descending') : col.sortable ? 'none' : undefined;
          return (
            <Box key={key} role="columnheader" aria-sort={ariaSort} sx={cellAlignSx(col.align)}>
              {col.sortable ? (
                <Box component="button" type="button" onClick={() => onSort(key)} sx={SORT_BUTTON_SX}>
                  <Typography component="span" variant="small" sx={HEADER_LABEL_SX}>
                    {col.header ?? col.label}
                  </Typography>
                  <Icon icon={sortIcon(active, sortOrder)} size="sm" color="inherit" />
                </Box>
              ) : (
                <Typography component="span" variant="small" sx={HEADER_LABEL_SX}>
                  {col.header ?? col.label}
                </Typography>
              )}
            </Box>
          );
        })}
        {reorderable && <Box role="columnheader" aria-label="Reorder controls" />}
      </Box>
    </Box>
  );
}
