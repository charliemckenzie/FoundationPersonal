import TableFooter from '@mui/material/TableFooter';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import { Select } from '../../Select';
import { IconButton } from '../../IconButton';
import type { TablePaginationConfig } from '../index';

interface TablePaginationFooterProps {
  pagination: TablePaginationConfig;
  colSpan: number;
}

/**
 * Custom pagination toolbar used by the Table component. Uses our own Select +
 * IconButton primitives so the visual style matches the rest of the design system
 * (MUI's built-in TablePagination has its own native styling that's hard to retheme).
 */
export function TablePaginationFooter({ pagination, colSpan }: TablePaginationFooterProps) {
  const totalPages = Math.ceil(pagination.count / pagination.rowsPerPage);
  const startRow = pagination.page * pagination.rowsPerPage + 1;
  const endRow = Math.min((pagination.page + 1) * pagination.rowsPerPage, pagination.count);

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
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1 }}>
            <Typography variant="small" color="text.secondary" sx={{ whiteSpace: 'nowrap' }}>
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
            <Typography variant="small" color="text.secondary" sx={{ whiteSpace: 'nowrap', mx: 1 }}>
              {startRow}–{endRow} of {pagination.count}
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
              disabled={pagination.page >= totalPages - 1}
              onClick={() => pagination.onPageChange(pagination.page + 1)}
            />
          </Box>
        </TableCell>
      </TableRow>
    </TableFooter>
  );
}
