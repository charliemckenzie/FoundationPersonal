import TableCell from '@mui/material/TableCell';
import Box from '@mui/material/Box';
import { Icon } from '../../Icon';
import type { TableColumn } from '../index';

interface ResponsiveCellProps<T> {
  col: TableColumn<T>;
  colKey: string;
  row: T;
  /** Index in the columns array. */
  index: number;
  /** Index of the primary (always-visible-on-mobile) column. */
  primaryIdx: number;
  /** Last column index whose mobile border-bottom should remain (for clean stacking). */
  lastNonPrimaryIdx: number;
  /** Whether this row is expanded on mobile. Ignored on desktop. */
  isExpanded: boolean;
  /** Mobile accordion toggle, fired only when the primary cell is clicked. */
  onToggle: () => void;
  striped: boolean;
  py: number;
  px: number;
}

/**
 * One cell in a ResponsiveTable row. Handles the mobile accordion behaviour:
 * the primary column acts as the always-visible accordion header (with chevron);
 * other columns hide until the row is expanded and render as labelled pairs.
 *
 * Extracted so the main ResponsiveTable component focuses on row-level logic.
 */
export function ResponsiveCell<T>({
  col,
  colKey,
  row,
  index,
  primaryIdx,
  lastNonPrimaryIdx,
  isExpanded,
  onToggle,
  striped,
  py,
  px,
}: ResponsiveCellProps<T>) {
  const isPrimary = index === primaryIdx;
  const content = col.render
    ? col.render(row)
    : String((row as Record<string, unknown>)[colKey] ?? '');

  return (
    <TableCell
      align={col.align ?? 'left'}
      onClick={isPrimary ? onToggle : undefined}
      aria-expanded={isPrimary ? isExpanded : undefined}
      sx={{
        lineHeight: 1.5,
        py,
        px,
        ...(striped
          ? { borderBottom: 'none' }
          : { borderBottomColor: 'divider' }),
        '@media (max-width: 599px)': {
          display: isPrimary || isExpanded ? 'flex' : 'none',
          order: isPrimary ? -1 : 0,
          alignItems: 'center',
          justifyContent: isPrimary ? 'space-between' : 'flex-start',
          py: 1.5,
          px: 2,
          borderBottom: isPrimary
            ? (isExpanded ? '1px solid' : 'none')
            : (index === lastNonPrimaryIdx ? 'none' : '1px solid'),
          borderColor: 'divider',
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
      {!isPrimary && (
        <Box
          component="span"
          aria-hidden="true"
          sx={(t) => ({
            display: { xs: 'block', sm: 'none' },
            fontWeight: 600,
            minWidth: '40%',
            pr: 1,
            color: 'text.secondary',
            fontSize: t.typography.small.fontSize,
            lineHeight: t.typography.small.lineHeight,
          })}
        >
          {col.label}
        </Box>
      )}

      <Box component="span" sx={{ flex: 1 }}>
        {content}
      </Box>

      {isPrimary && (
        <Box
          component="span"
          aria-hidden="true"
          sx={{ display: { xs: 'inline-flex', sm: 'none' }, ml: 1, flexShrink: 0 }}
        >
          <Icon icon={isExpanded ? 'chevron-up' : 'chevron-down'} size="sm" color="inherit" />
        </Box>
      )}
    </TableCell>
  );
}
