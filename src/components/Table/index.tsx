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

export interface TableProps<T extends { id: string | number }> {
  columns: TableColumn<T>[];
  rows: T[];
  loading?: boolean;
  emptyMessage?: string;
  stickyHeader?: boolean;
}

export function Table<T extends { id: string | number }>({
  columns,
  rows,
  loading = false,
  emptyMessage = 'No data to display.',
  stickyHeader = false,
}: TableProps<T>) {
  const isEmpty = !loading && rows.length === 0;
  const colKeys = columns.map((col) => String(col.key));

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
                sx={{ fontWeight: 600, bgcolor: 'background.paper' }}
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
          {!loading && rows.map((row) => (
            <TableRow key={row.id} hover>
              {columns.map((col, i) => (
                <TableCell key={colKeys[i]} align={col.align ?? 'left'}>
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
