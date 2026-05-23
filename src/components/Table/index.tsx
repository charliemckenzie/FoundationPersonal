import MuiTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { alpha } from '@mui/material/styles';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState, useMemo } from 'react';
import { Spinner } from '../Spinner';
import { Icon } from '../Icon';
import { Select } from '../Select';
import { IconButton } from '../IconButton';
import type React from 'react';

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

type SortOrder = 'asc' | 'desc';

/** Vertical padding values in MUI spacing units (1 unit = 8px). */
const DENSITY_PY: Record<TableDensity, number> = {
  condensed: 1,    // 8px
  default:   1.5,  // 12px
  spaced:    2,    // 16px
};

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
  /** Alternates row background colour using the tableStripe semantic token. */
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
}

function NoIcon() { return null; }

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
}: TableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const handleSortClick = (key: string) => {
    if (sortKey === key) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const sortedRows = useMemo(() => {
    if (!sortKey) return rows;
    return [...rows].sort((a, b) => {
      const aVal = (a as Record<string, unknown>)[sortKey];
      const bVal = (b as Record<string, unknown>)[sortKey];
      if (aVal == null) return 1;
      if (bVal == null) return -1;
      const cmp = String(aVal).localeCompare(String(bVal), undefined, { numeric: true });
      return sortOrder === 'asc' ? cmp : -cmp;
    });
  }, [rows, sortKey, sortOrder]);

  const isEmpty = !loading && rows.length === 0;
  const colKeys = columns.map((col) => String(col.key));
  const py = DENSITY_PY[density];
  const px = horizontalPadding ? 2.5 : 1;

  return (
    <TableContainer
      component={Paper}
      variant="outlined"
      sx={{
        boxShadow: 'none',
        borderRadius: '1rem',
        '& .MuiTableBody-root .MuiTableRow-root:last-child .MuiTableCell-root': {
          borderBottom: 'none',
        },
        ...(containerMaxHeight != null ? { maxHeight: containerMaxHeight } : {}),
      }}
    >
      <MuiTable stickyHeader={stickyHeader} aria-busy={loading}>
        <TableHead>
          <TableRow>
            {columns.map((col, i) => (
              <TableCell
                key={colKeys[i]}
                component="th"
                scope="col"
                align={col.align ?? 'left'}
                width={col.width}
                sortDirection={col.sortable && sortKey === colKeys[i] ? sortOrder : false}
                sx={bordered && i < columns.length - 1
                  ? (t) => ({
                      fontWeight: 600,
                      bgcolor: 'primary.main',
                      color: 'primary.contrastText',
                      lineHeight: 1.5,
                      py,
                      px,
                      borderRight: '1px solid',
                      borderRightColor: alpha(t.palette.primary.contrastText, 0.25),
                    })
                  : {
                      fontWeight: 600,
                      bgcolor: 'primary.main',
                      color: 'primary.contrastText',
                      lineHeight: 1.5,
                      py,
                      px,
                    }
                }
              >
                {col.sortable ? (
                  <TableSortLabel
                    active={sortKey === colKeys[i]}
                    direction={sortKey === colKeys[i] ? sortOrder : 'asc'}
                    onClick={() => handleSortClick(colKeys[i])}
                    hideSortIcon
                    IconComponent={NoIcon}
                    sx={{
                      color: 'inherit',
                      '&:hover': { color: 'inherit' },
                      '&.Mui-active': { color: 'inherit' },
                    }}
                  >
                    {col.label}
                    <Box
                      component="span"
                      sx={{
                        display: 'inline-flex',
                        ml: 0.5,
                        opacity: sortKey !== colKeys[i] ? 0.5 : 1,
                        '.MuiTableSortLabel-root:hover &': { opacity: 1 },
                      }}
                    >
                      <Icon
                        icon={
                          sortKey === colKeys[i]
                            ? (sortOrder === 'asc' ? 'arrow-up' : 'arrow-down')
                            : 'arrows-up-down'
                        }
                        size="md"
                        color="inherit"
                      />
                    </Box>
                  </TableSortLabel>
                ) : (
                  col.label
                )}
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
          {!loading && sortedRows.map((row, rowIndex) => (
            <TableRow
              key={row.id}
              hover
              sx={striped && stripeDirection === 'row' && rowIndex % 2 === 1
                ? { bgcolor: 'background.tableStripe' }
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
                      ? { bgcolor: 'background.tableStripe' }
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
          <TableFooter>
            <TableRow>
              <TableCell
                colSpan={columns.length}
                sx={(t) => ({
                  borderBottom: 'none',
                  bgcolor: alpha(t.palette.primary.main, 0.08),
                  py: 1.5,
                  px: 2.5,
                })}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1 }}>
                  <Typography variant="body" color="text.secondary" sx={{ whiteSpace: 'nowrap', fontSize: '0.875rem' }}>
                    Rows per page:
                  </Typography>
                  <Box
                    sx={{
                      minWidth: '4rem',
                      '& .MuiFormLabel-root': {
                        position: 'absolute',
                        width: '1px',
                        height: '1px',
                        overflow: 'hidden',
                        clip: 'rect(0 0 0 0)',
                        whiteSpace: 'nowrap',
                      },
                    }}
                  >
                    <Select
                      label="Rows per page"
                      size="small"
                      condensed
                      options={(pagination.rowsPerPageOptions ?? [5, 10, 25]).map((opt) =>
                        typeof opt === 'number'
                          ? { value: String(opt), label: String(opt) }
                          : { value: String(opt.value), label: opt.label }
                      )}
                      value={String(pagination.rowsPerPage)}
                      onChange={(val) => pagination.onRowsPerPageChange(Number(val))}
                    />
                  </Box>
                  <Typography variant="body" color="text.secondary" sx={{ whiteSpace: 'nowrap', fontSize: '0.875rem', mx: 1 }}>
                    {pagination.page * pagination.rowsPerPage + 1}–{Math.min((pagination.page + 1) * pagination.rowsPerPage, pagination.count)} of {pagination.count}
                  </Typography>
                  <IconButton
                    icon="chevron-left"
                    label="Previous page"
                    variant="soft"
                    size="small"
                    color="primary"
                    disabled={pagination.page === 0}
                    onClick={() => pagination.onPageChange(pagination.page - 1)}
                  />
                  <IconButton
                    icon="chevron-right"
                    label="Next page"
                    variant="soft"
                    size="small"
                    color="primary"
                    disabled={pagination.page >= Math.ceil(pagination.count / pagination.rowsPerPage) - 1}
                    onClick={() => pagination.onPageChange(pagination.page + 1)}
                  />
                </Box>
              </TableCell>
            </TableRow>
          </TableFooter>
        )}
      </MuiTable>
    </TableContainer>
  );
}
