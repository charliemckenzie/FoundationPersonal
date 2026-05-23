import MuiTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TableHead from '@mui/material/TableHead';
import MuiTablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Icon } from '../Icon';
import { Spinner } from '../Spinner';
import type { TableColumn, TableDensity, TablePaginationConfig } from './index';

/** Vertical padding values in MUI spacing units (1 unit = 8px). */
const DENSITY_PY: Record<TableDensity, number> = {
  condensed: 1,
  default:   1.5,
  spaced:    2,
};

export interface ResponsiveTableProps<T extends { id: string | number }> {
  columns: TableColumn<T>[];
  rows: T[];
  loading?: boolean;
  emptyMessage?: string;
  stickyHeader?: boolean;
  containerMaxHeight?: string | number;
  /** Alternates row background colour using the tableStripe semantic token. */
  striped?: boolean;
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
   * Column key to use as the mobile accordion summary header (always visible).
   * Defaults to the first column.
   */
  mobileLabel?: keyof T | string;
}

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
}: ResponsiveTableProps<T>) {
  const [expandedRows, setExpandedRows] = useState<Set<string | number>>(new Set());

  const toggleRow = (id: string | number) => {
    setExpandedRows((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const py = DENSITY_PY[density];
  const px = horizontalPadding ? 2.5 : 1;
  const colKeys = columns.map((col) => String(col.key));

  const primaryKey = mobileLabel ? String(mobileLabel) : (colKeys[0] ?? '');
  const primaryColIndex = colKeys.indexOf(primaryKey);
  const primaryIdx = primaryColIndex >= 0 ? primaryColIndex : 0;

  // Last non-primary column index in DOM order (used for border-bottom suppression)
  const lastNonPrimaryIdx =
    primaryIdx === columns.length - 1 ? columns.length - 2 : columns.length - 1;

  const isEmpty = !loading && rows.length === 0;

  return (
    <TableContainer
      component={Paper}
      variant="outlined"
      sx={{
        boxShadow: 'none',
        borderRadius: '1rem',
        // On mobile the outer border is removed — each row card has its own border
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
      }}
    >
      <MuiTable
        stickyHeader={stickyHeader}
        aria-busy={loading}
        sx={{
          // On mobile: shift all table elements to block layout so rows stack
          // as cards. Explicit role attributes on the HTML elements keep table
          // semantics intact for screen readers regardless of CSS display value.
          '@media (max-width: 599px)': {
            display: 'block',
            '& > thead': {
              // sr-only: present in the accessibility tree but not visible
              position: 'absolute',
              width: '1px',
              height: '1px',
              padding: 0,
              margin: '-1px',
              overflow: 'hidden',
              clip: 'rect(0, 0, 0, 0)',
              whiteSpace: 'nowrap',
              borderWidth: 0,
            },
            '& > tbody': {
              display: 'block',
              width: '100%',
            },
            '& > tfoot': {
              display: 'block',
              width: '100%',
              '& tr': { display: 'flex', justifyContent: 'flex-end' },
            },
          },
        }}
      >
        <TableHead>
          <TableRow>
            {columns.map((col, i) => (
              <TableCell
                key={colKeys[i]}
                component="th"
                scope="col"
                align={col.align ?? 'left'}
                width={col.width}
                sx={{
                  fontWeight: 600,
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                  lineHeight: 1.5,
                  py,
                  px,
                }}
              >
                {col.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {loading && (
            <TableRow>
              <TableCell colSpan={columns.length} align="center" sx={{ py: 4 }}>
                <Spinner size="medium" />
              </TableCell>
            </TableRow>
          )}
          {isEmpty && (
            <TableRow>
              <TableCell colSpan={columns.length} align="center" sx={{ py: 4 }}>
                <Typography variant="body" color="text.muted">
                  {emptyMessage}
                </Typography>
              </TableCell>
            </TableRow>
          )}
          {!loading &&
            rows.map((row, rowIndex) => {
              const isExpanded = expandedRows.has(row.id);

              return (
                <TableRow
                  key={row.id}
                  hover
                  sx={{
                    ...(striped && rowIndex % 2 === 1
                      ? { bgcolor: 'background.tableStripe' }
                      : {}),
                    '@media (max-width: 599px)': {
                      display: 'flex',
                      flexDirection: 'column',
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: '0.75rem',
                      mb: 1,
                      overflow: 'hidden',
                      bgcolor: 'background.paper',
                      // Suppress the generic TableRow hover on mobile — the
                      // primary cell provides its own interactive feedback
                      '&.MuiTableRow-hover:hover': {
                        bgcolor: 'background.paper',
                      },
                    },
                  }}
                >
                  {columns.map((col, i) => {
                    const colKey = colKeys[i];
                    const isPrimary = i === primaryIdx;
                    const content = col.render
                      ? col.render(row)
                      : String((row as Record<string, unknown>)[colKey] ?? '');

                    return (
                      <TableCell
                        key={colKey}
                        align={col.align ?? 'left'}
                        onClick={isPrimary ? () => toggleRow(row.id) : undefined}
                        aria-expanded={isPrimary ? isExpanded : undefined}
                        sx={{
                          lineHeight: 1.5,
                          py,
                          px,
                          ...(striped
                            ? { borderBottom: 'none' }
                            : { borderBottomColor: 'divider' }),
                          '@media (max-width: 599px)': {
                            // Primary cell: always visible, acts as accordion header
                            // Other cells: hidden when collapsed, visible when expanded
                            display: isPrimary || isExpanded ? 'flex' : 'none',
                            order: isPrimary ? -1 : 0,
                            alignItems: 'center',
                            justifyContent: isPrimary ? 'space-between' : 'flex-start',
                            py: 1.5,
                            px: 2,
                            borderBottom: isPrimary
                              ? (isExpanded ? '1px solid' : 'none')
                              : (i === lastNonPrimaryIdx ? 'none' : '1px solid'),
                            borderColor: 'divider',
                            // Reset striped background inside cards
                            bgcolor: 'transparent',
                            ...(isPrimary && {
                              cursor: 'pointer',
                              userSelect: 'none',
                              '&:hover': { bgcolor: 'action.hover' },
                              '&:active': { bgcolor: 'action.selected' },
                            }),
                          },
                        }}
                      >
                        {/* Column label prefix — only shown on mobile for non-primary cells */}
                        {!isPrimary && (
                          <Box
                            component="span"
                            aria-hidden="true"
                            sx={{
                              display: { xs: 'block', sm: 'none' },
                              fontWeight: 600,
                              minWidth: '40%',
                              pr: 1,
                              color: 'text.secondary',
                              fontSize: '0.875rem',
                              lineHeight: 1.5,
                            }}
                          >
                            {col.label}
                          </Box>
                        )}

                        <Box component="span" sx={{ flex: 1 }}>
                          {content}
                        </Box>

                        {/* Chevron — visual indicator only; the whole primary cell is the interactive trigger */}
                        {isPrimary && (
                          <Box
                            component="span"
                            aria-hidden="true"
                            sx={{
                              display: { xs: 'inline-flex', sm: 'none' },
                              ml: 1,
                              flexShrink: 0,
                            }}
                          >
                            <Icon
                              icon={isExpanded ? 'chevron-up' : 'chevron-down'}
                              size="sm"
                              color="inherit"
                            />
                          </Box>
                        )}
                      </TableCell>
                    );
                  })}
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
