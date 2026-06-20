import type { TableColumn, TableDensity, TablePaginationConfig, TableHeaderStyle } from './index';

export interface ResponsiveTableProps<T extends { id: string | number }> {
  columns: TableColumn<T>[];
  rows: T[];
  loading?: boolean;
  emptyMessage?: string;
  stickyHeader?: boolean;
  containerMaxHeight?: string | number;
  /** Alternates row background colour using the background.elevated token. */
  striped?: boolean;
  /** Vertical cell padding size. Defaults to 'default'. */
  density?: TableDensity;
  /** Include horizontal cell padding. Defaults to true. */
  horizontalPadding?: boolean;
  /**
   * When provided, renders a pagination toolbar in the table footer.
   * The consumer is responsible for slicing `rows` to the current page.
   */
  pagination?: TablePaginationConfig;
  /**
   * Column key to use as the mobile accordion summary header (always visible).
   * Defaults to the first column.
   */
  mobileLabel?: keyof T | string;
  /**
   * Header background style. `primary` (default) uses the brand primary colour
   * with contrasting text. `paper` uses the paper surface with bold default text —
   * useful inside cards or panels where a coloured header would be too heavy.
   */
  headerStyle?: TableHeaderStyle;
}
