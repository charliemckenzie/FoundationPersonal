import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';
import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import { Icon } from '../../Icon';
import type { TableColumn } from '../index';

function NoIcon() { return null; }

export type TableHeaderStyle = 'primary' | 'paper';

interface SortableHeaderCellProps<T> {
  col: TableColumn<T>;
  colKey: string;
  isActiveSort: boolean;
  sortOrder: 'asc' | 'desc';
  onSort: (key: string) => void;
  /** Render a right border (full grid appearance). */
  bordered: boolean;
  py: number;
  px: number;
  headerStyle: TableHeaderStyle;
}

/**
 * Single header cell for the Table component. Handles both sortable and non-sortable
 * cases. The brand-blue header background and white text styling are encapsulated
 * here so the Table body stays focused on row rendering.
 */
export function SortableHeaderCell<T>({
  col,
  colKey,
  isActiveSort,
  sortOrder,
  onSort,
  bordered,
  py,
  px,
  headerStyle,
}: SortableHeaderCellProps<T>) {
  const isPaper = headerStyle === 'paper';

  const baseSx = isPaper
    ? { fontWeight: 700, bgcolor: 'background.paper', color: 'text.primary', lineHeight: 1.5, py, px, borderBottom: '1px solid', borderBottomColor: 'border.input' }
    : { fontWeight: 600, bgcolor: 'primary.main', color: 'primary.contrastText', lineHeight: 1.5, py, px };

  return (
    <TableCell
      component="th"
      scope="col"
      align={col.align ?? 'left'}
      width={col.width}
      sortDirection={col.sortable && isActiveSort ? sortOrder : false}
      sx={bordered
        ? isPaper
          ? { ...baseSx, borderRight: '1px solid', borderRightColor: 'divider' }
          : (t) => ({ ...baseSx, borderRight: '1px solid', borderRightColor: alpha(t.palette.primary.contrastText, 0.25) })
        : baseSx
      }
    >
      {col.sortable ? (
        <TableSortLabel
          active={isActiveSort}
          direction={isActiveSort ? sortOrder : 'asc'}
          onClick={() => onSort(colKey)}
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
              opacity: isActiveSort ? 1 : 0.5,
              '.MuiTableSortLabel-root:hover &': { opacity: 1 },
            }}
          >
            <Icon
              icon={
                isActiveSort
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
  );
}
