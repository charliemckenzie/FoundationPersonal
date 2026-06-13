import type { DataGridAlign } from '../types';

/** Flex cell layout that aligns both plain text and interactive controls per column. */
export function cellAlignSx(align: DataGridAlign = 'left') {
  return {
    display: 'flex',
    alignItems: 'center',
    minWidth: 0,
    justifyContent: align === 'right' ? 'flex-end' : align === 'center' ? 'center' : 'flex-start',
    textAlign: align,
  } as const;
}

/** Visually hidden but kept in the accessibility tree — for control labels we don't want shown. */
export const SR_ONLY = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  whiteSpace: 'nowrap',
  border: 0,
} as const;
