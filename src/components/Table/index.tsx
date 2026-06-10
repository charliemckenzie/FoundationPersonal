import MuiTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import type React from 'react';
import { DENSITY_PY } from './parts/sharedConstants';
import { TableLoadingRow, TableEmptyRow } from './parts/TableStateRows';
import { useTableSort } from './parts/useTableSort';
import { TablePaginationFooter } from './parts/TablePaginationFooter';
import { SortableHeaderCell } from './parts/SortableHeaderCell';
import type { TableHeaderStyle } from './parts/SortableHeaderCell';
export type { TableHeaderStyle };

export interface TableColumn<T> {
  key: keyof T | string;
  label: string;
  render?: (row: T) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
  width?: string | number;
  /** Enables click-to-sort on this column. Sorting is handled internally. */
  sortable?: boolean;
}

export type TableDensity = 'condensed' | 'default' | 'spaced';

export interface TablePaginationConfig {
  /** Total number of rows across all pages. */
  count: number;
  /** Current zero-based page index. */
  page: number;
  /** Number of rows shown per page. */
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
  /** Rows-per-page options. Defaults to [5, 10, 25]. */
  rowsPerPageOptions?: Array<number | { value: number; label: string }>;
}

export interface TableProps<T extends { id: string | number }> {
  columns: TableColumn<T>[];
  rows: T[];
  loading?: boolean;
  emptyMessage?: string;
  stickyHeader?: boolean;
  /**
   * Sets a max-height on the table container. Required for `stickyHeader` to
   * work — without a bounded container height the header has nothing to stick to.
   */
  containerMaxHeight?: string | number;
  /** Alternates row background colour using the background.elevated token. */
  striped?: boolean;
  /** Direction of striping when striped is true. Defaults to 'row'. */
  stripeDirection?: 'row' | 'column';
  /** Adds vertical column separators for a full grid appearance. */
  bordered?: boolean;
  /** Vertical cell padding size. Defaults to 'default'. */
  density?: TableDensity;
  /** Include horizontal cell padding. Defaults to true. */
  horizontalPadding?: boolean;
  /**
   * When provided, renders a pagination toolbar in the table footer.
   * The consumer is responsible for slicing `rows` to the current page.
   */
  pagination?: TablePaginationConfig;
  /**
   * Header background style. `primary` (default) uses the brand primary colour
   * with contrasting text. `paper` uses the paper surface with bold default text —
   * useful inside cards or panels where a coloured header would be too heavy.
   */
  headerStyle?: TableHeaderStyle;
}

export function Table<T extends { id: string | number }>({
  columns,
  rows,
  loading = false,
  emptyMessage = 'No data to display.',
  stickyHeader = false,
  containerMaxHeight,
  striped = false,
  stripeDirection = 'row',
  bordered = false,
  density = 'default',
  horizontalPadding = true,
  pagination,
  headerStyle = 'primary',
}: TableProps<T>) {
  const { sortKey, sortOrder, sortedRows, handleSortClick } = useTableSort(rows);
  const isEmpty = !loading && rows.length === 0;
  const colKeys = columns.map((col) => String(col.key));
  const py = DENSITY_PY[density];
  const px = horizontalPadding ? 2.5 : 1;

  return (
    <TableContainer
      component={Paper}
      variant="outlined"
      sx={(t) => ({
        boxShadow: 'none',
        borderRadius: `${t.shape.lg}px`,
        '& .MuiTableBody-root .MuiTableRow-root:last-child .MuiTableCell-root': {
          borderBottom: 'none',
        },
        ...(containerMaxHeight != null ? { maxHeight: containerMaxHeight } : {}),
      })}
    >
      <MuiTable stickyHeader={stickyHeader} aria-busy={loading}>
        <TableHead>
          <TableRow>
            {columns.map((col, i) => (
              <SortableHeaderCell
                key={colKeys[i]}
                col={col}
                colKey={colKeys[i]}
                isActiveSort={sortKey === colKeys[i]}
                sortOrder={sortOrder}
                onSort={handleSortClick}
                bordered={bordered && i < columns.length - 1}
                py={py}
                px={px}
                headerStyle={headerStyle}
              />
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {loading && <TableLoadingRow colSpan={columns.length} />}
          {isEmpty && <TableEmptyRow colSpan={columns.length} message={emptyMessage} />}
          {!loading && sortedRows.map((row, rowIndex) => (
            <TableRow
              key={row.id}
              hover
              sx={striped && stripeDirection === 'row' && rowIndex % 2 === 1
                ? { bgcolor: 'background.elevated' }
                : undefined
              }
            >
              {columns.map((col, i) => (
                <TableCell
                  key={colKeys[i]}
                  align={col.align ?? 'left'}
                  sx={{
                    lineHeight: 1.5,
                    py,
                    px,
                    ...(striped && stripeDirection === 'column' && i % 2 === 0
                      ? { bgcolor: 'background.elevated' }
                      : {}),
                    ...(striped && stripeDirection === 'row' && !bordered
                      ? { borderBottom: 'none' }
                      : { borderBottomColor: 'divider' }),
                    ...(bordered && i < columns.length - 1
                      ? { borderRight: '1px solid', borderRightColor: 'divider' }
                      : {}),
                  }}
                >
                  {col.render
                    ? col.render(row)
                    : String((row as Record<string, unknown>)[colKeys[i]] ?? '')}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
        {pagination && (
          <TablePaginationFooter pagination={pagination} colSpan={columns.length} />
        )}
      </MuiTable>
    </TableContainer>
  );
}
