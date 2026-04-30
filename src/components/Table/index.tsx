import MuiTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Spinner } from '../Spinner';
import type React from 'react';

export interface TableColumn<T> {
  key: keyof T | string;
  label: string;
  render?: (row: T) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
  width?: string | number;
}

export type TableDensity = 'condensed' | 'default' | 'spaced';

const DENSITY_PY: Record<TableDensity, number> = {
  condensed: 0.75,
  default:   1.5,
  spaced:    2.5,
};

export interface TableProps<T extends { id: string | number }> {
  columns: TableColumn<T>[];
  rows: T[];
  loading?: boolean;
  emptyMessage?: string;
  stickyHeader?: boolean;
  /** Alternates row background colour using the tableStripe semantic token. */
  striped?: boolean;
  /** Vertical cell padding size. Defaults to 'default'. */
  density?: TableDensity;
  /** Include horizontal cell padding. Defaults to true. */
  horizontalPadding?: boolean;
}

export function Table<T extends { id: string | number }>({
  columns,
  rows,
  loading = false,
  emptyMessage = 'No data to display.',
  stickyHeader = false,
  striped = false,
  density = 'default',
  horizontalPadding = true,
}: TableProps<T>) {
  const isEmpty = !loading && rows.length === 0;
  const colKeys = columns.map((col) => String(col.key));
  const py = DENSITY_PY[density];
  const px = horizontalPadding ? 2 : 1;

  return (
    <TableContainer component={Paper} variant="outlined">
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
                sx={{
                  fontWeight: 600,
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
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
          {!loading && rows.map((row, rowIndex) => (
            <TableRow
              key={row.id}
              hover
              sx={striped && rowIndex % 2 === 1
                ? { bgcolor: 'background.tableStripe' }
                : undefined
              }
            >
              {columns.map((col, i) => (
                <TableCell
                  key={colKeys[i]}
                  align={col.align ?? 'left'}
                  sx={{
                    py,
                    px,
                    ...(striped
                      ? { borderBottom: 'none' }
                      : { borderBottomColor: 'divider' }),
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
      </MuiTable>
    </TableContainer>
  );
}
