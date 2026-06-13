import TableFooter from '@mui/material/TableFooter';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { alpha } from '@mui/material/styles';
import { PaginationToolbar } from './PaginationToolbar';
import type { TablePaginationConfig } from '../index';

interface TablePaginationFooterProps {
  pagination: TablePaginationConfig;
  colSpan: number;
}

/**
 * Pagination row rendered in the Table's <tfoot>. The controls themselves live in the
 * shared PaginationToolbar (also used by DataGrid) so both components stay in sync.
 */
export function TablePaginationFooter({ pagination, colSpan }: TablePaginationFooterProps) {
  return (
    <TableFooter>
      <TableRow>
        <TableCell
          colSpan={colSpan}
          sx={(t) => ({
            borderBottom: 'none',
            bgcolor: alpha(t.palette.primary.main, 0.08),
            py: 1.5,
            px: 2.5,
          })}
        >
          <PaginationToolbar pagination={pagination} />
        </TableCell>
      </TableRow>
    </TableFooter>
  );
}
