import type { TableDensity } from '../index';

/** Vertical cell padding values in MUI spacing units (1 unit = 8px). */
export const DENSITY_PY: Record<TableDensity, number> = {
  condensed: 1,    // 8px
  default:   1.5,  // 12px
  spaced:    2,    // 16px
};

/**
 * Mobile sx for ResponsiveTable's <table>: flips the layout to vertical
 * card-stacked while preserving table semantics. The <thead> is sr-only
 * (kept in the accessibility tree for header association) rather than removed.
 */
export const MOBILE_TABLE_SX = {
  '@media (max-width: 599px)': {
    display: 'block',
    '& > thead': {
      position: 'absolute',
      width: '1px',
      height: '1px',
      padding: 0,
      margin: '-1px',
      overflow: 'hidden',
      clip: 'rect(0, 0, 0, 0)',
      whiteSpace: 'nowrap',
      borderWidth: 0,
    },
    '& > tbody': { display: 'block', width: '100%' },
    '& > tfoot': {
      display: 'block',
      width: '100%',
      '& tr': { display: 'flex', justifyContent: 'flex-end' },
    },
  },
} as const;
