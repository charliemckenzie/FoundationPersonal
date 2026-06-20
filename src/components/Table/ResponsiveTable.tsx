import MuiTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TableHead from '@mui/material/TableHead';
import MuiTablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { DENSITY_PY, MOBILE_TABLE_SX } from './parts/sharedConstants';
import { TableLoadingRow, TableEmptyRow } from './parts/TableStateRows';
import { ResponsiveCell } from './parts/ResponsiveCell';
import type { ResponsiveTableProps } from './responsiveTableTypes';

export type { ResponsiveTableProps } from './responsiveTableTypes';

/**
 * A table that adapts to mobile by transforming each row into a collapsible
 * card. Uses a single `<table>` DOM structure at all breakpoints — no component
 * swapping. Below the `sm` breakpoint, rows collapse to show only the primary
 * column; tapping expands the full row data as labelled pairs.
 *
 * Accessibility: the `<table>` semantic structure is preserved at all sizes.
 * The `<thead>` is visually hidden on mobile via sr-only CSS but remains in the
 * DOM for screen reader header association. Expand buttons carry `aria-expanded`
 * and descriptive `aria-label` values.
 */
export function ResponsiveTable<T extends { id: string | number }>({
  columns,
  rows,
  loading = false,
  emptyMessage = 'No data to display.',
  stickyHeader = false,
  containerMaxHeight,
  striped = false,
  density = 'default',
  horizontalPadding = true,
  pagination,
  mobileLabel,
  headerStyle = 'primary',
}: ResponsiveTableProps<T>) {
  const [expandedRows, setExpandedRows] = useState<Set<string | number>>(new Set());

  const toggleRow = (id: string | number) => {
    setExpandedRows((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const isPaperHeader = headerStyle === 'paper';
  const headerSx = isPaperHeader
    ? { fontWeight: 700, bgcolor: 'background.paper', color: 'text.primary', lineHeight: 1.5, borderBottom: '1px solid', borderBottomColor: 'border.input' }
    : { fontWeight: 600, bgcolor: 'primary.main', color: 'primary.contrastText', lineHeight: 1.5 };

  const py = DENSITY_PY[density];
  const px = horizontalPadding ? 2.5 : 1;
  const colKeys = columns.map((col) => String(col.key));

  const primaryKey = mobileLabel ? String(mobileLabel) : (colKeys[0] ?? '');
  const primaryColIndex = colKeys.indexOf(primaryKey);
  const primaryIdx = primaryColIndex >= 0 ? primaryColIndex : 0;
  const lastNonPrimaryIdx =
    primaryIdx === columns.length - 1 ? columns.length - 2 : columns.length - 1;

  const isEmpty = !loading && rows.length === 0;

  return (
    <TableContainer
      component={Paper}
      variant="outlined"
      sx={(t) => ({
        boxShadow: 'none',
        borderRadius: `${t.shape.lg}px`,
        '@media (max-width: 599px)': {
          border: 'none',
          background: 'transparent',
          boxShadow: 'none',
          overflow: 'visible',
        },
        '& .MuiTableBody-root .MuiTableRow-root:last-child .MuiTableCell-root': {
          borderBottom: 'none',
        },
        ...(containerMaxHeight != null ? { maxHeight: containerMaxHeight } : {}),
      })}
    >
      <MuiTable stickyHeader={stickyHeader} aria-busy={loading} sx={MOBILE_TABLE_SX}>
        <TableHead>
          <TableRow>
            {columns.map((col, i) => (
              <TableCell
                key={colKeys[i]}
                component="th"
                scope="col"
                align={col.align ?? 'left'}
                width={col.width}
                sx={{ ...headerSx, py, px }}
              >
                {col.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {loading && <TableLoadingRow colSpan={columns.length} />}
          {isEmpty && <TableEmptyRow colSpan={columns.length} message={emptyMessage} />}
          {!loading && rows.map((row, rowIndex) => {
            const isExpanded = expandedRows.has(row.id);
            return (
              <TableRow
                key={row.id}
                hover
                sx={(t) => ({
                  ...(striped && rowIndex % 2 === 1
                    ? { bgcolor: 'background.elevated' }
                    : {}),
                  '@media (max-width: 599px)': {
                    display: 'flex',
                    flexDirection: 'column',
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: `${t.shape.md}px`,
                    mb: 1,
                    overflow: 'hidden',
                    bgcolor: 'background.paper',
                    '&.MuiTableRow-hover:hover': { bgcolor: 'background.paper' },
                  },
                })}
              >
                {columns.map((col, i) => (
                  <ResponsiveCell
                    key={colKeys[i]}
                    col={col}
                    colKey={colKeys[i]}
                    row={row}
                    index={i}
                    primaryIdx={primaryIdx}
                    lastNonPrimaryIdx={lastNonPrimaryIdx}
                    isExpanded={isExpanded}
                    onToggle={() => toggleRow(row.id)}
                    striped={striped}
                    py={py}
                    px={px}
                  />
                ))}
              </TableRow>
            );
          })}
        </TableBody>

        {pagination && (
          <TableFooter>
            <TableRow>
              <MuiTablePagination
                count={pagination.count}
                page={pagination.page}
                rowsPerPage={pagination.rowsPerPage}
                rowsPerPageOptions={pagination.rowsPerPageOptions ?? [5, 10, 25]}
                onPageChange={(_e, newPage) => pagination.onPageChange(newPage)}
                onRowsPerPageChange={(e) =>
                  pagination.onRowsPerPageChange(Number(e.target.value))
                }
                sx={{ borderBottom: 'none' }}
              />
            </TableRow>
          </TableFooter>
        )}
      </MuiTable>
    </TableContainer>
  );
}
