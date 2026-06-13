import type React from 'react';

// DataGrid shares its pagination contract with Table — one source of truth.
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
