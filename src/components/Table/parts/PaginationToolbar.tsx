import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Select } from '../../Select';
import { IconButton } from '../../IconButton';
import type { TablePaginationConfig } from '../index';

interface PaginationToolbarProps {
  pagination: TablePaginationConfig;
}

/**
 * Pagination controls (rows-per-page select, range readout, prev/next).
 * Shared by Table (inside a <tfoot> cell) and DataGrid (inside a div footer) so the
 * two components present identical pagination using our own Select + IconButton.
 */
export function PaginationToolbar({ pagination }: PaginationToolbarProps) {
  const totalPages = Math.ceil(pagination.count / pagination.rowsPerPage);
  const startRow = pagination.page * pagination.rowsPerPage + 1;
  const endRow = Math.min((pagination.page + 1) * pagination.rowsPerPage, pagination.count);

  return (
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
        variant="outlined"
        size="small"
        color="primary"
        disabled={pagination.page === 0}
        onClick={() => pagination.onPageChange(pagination.page - 1)}
      />
      <IconButton
        icon="chevron-right"
        label="Next page"
        variant="outlined"
        size="small"
        color="primary"
        disabled={pagination.page >= totalPages - 1}
        onClick={() => pagination.onPageChange(pagination.page + 1)}
      />
    </Box>
  );
}
