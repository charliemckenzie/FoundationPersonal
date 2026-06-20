import type React from 'react';
import type { SxProps, Theme } from '@mui/material/styles';

// DataGrid shares its pagination contract with Table — one source of truth.
import type { TablePaginationConfig as DataGridPaginationConfig } from '../Table';
export type { TablePaginationConfig as DataGridPaginationConfig } from '../Table';

export type DataGridDensity = 'condensed' | 'default' | 'spaced';
export type DataGridAlign = 'left' | 'center' | 'right';

export interface DataGridColumn<T> {
  /** Row property this column reads. Also the React key for the column. */
  key: keyof T | string;
  /** Header text. Used as the accessible label for the sort button when sortable. */
  label: string;
  /** Optional header node, overrides `label` for display only. */
  header?: React.ReactNode;
  /** CSS grid track for this column. Defaults to `'1fr'`. Use rem or fr (e.g. `'6rem'`, `'2fr'`). */
  width?: string;
  align?: DataGridAlign;
  /** Enables click-to-sort on this column (requires `sortable` on the grid). */
  sortable?: boolean;
  /** Render arbitrary cell content, including interactive controls. Falls back to `String(row[key])`. */
  renderCell?: (row: T) => React.ReactNode;
}

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
