import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import { PaginationToolbar } from '../../Table/parts/PaginationToolbar';
import type { DataGridPaginationConfig } from '../types';

/** Div-based pagination footer for DataGrid, reusing Table's shared PaginationToolbar. */
export function DataGridPagination({ pagination }: { pagination: DataGridPaginationConfig }) {
  return (
    <Box
      sx={(t) => ({
        borderTop: '1px solid',
        borderColor: 'divider',
        bgcolor: alpha(t.palette.primary.main, 0.08),
        py: 1.5,
        px: 2.5,
      })}
    >
      <PaginationToolbar pagination={pagination} />
    </Box>
  );
}
