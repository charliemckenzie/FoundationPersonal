import type React from 'react';
import type { SxProps, Theme } from '@mui/material/styles';

export type ValueAlign = 'left' | 'right';
export type DescriptionListDensity = 'condensed' | 'default' | 'spaced';

export interface DescriptionListContextValue {
  valueAlign: ValueAlign;
  density: DescriptionListDensity;
  labelWidth?: number | string;
  valueWidth?: number | string;
  labelFontWeight?: number;
  valueFontWeight?: number;
  responsive?: boolean;
}

export interface DescriptionListProps {
  /** Optional heading displayed above the rows. */
  title?: string;
  /** Typography variant for the title. Defaults to `h5`. */
  titleVariant?: 'h4' | 'h5' | 'h6';
  /** Alignment of the value column for all rows. Defaults to `left`. */
  valueAlign?: ValueAlign;
  /** Row padding density. Defaults to `default` (12px). */
  density?: DescriptionListDensity;
  /** Fixed width for the label column — value column fills remaining space. E.g. `200` or `'30%'`. */
  labelWidth?: number | string;
  /** Fixed width for the value column — label column fills remaining space. E.g. `200` or `'40%'`. */
  valueWidth?: number | string;
  /** Font weight for label text. Defaults to `400`. */
  labelFontWeight?: number;
  /** Font weight for value text. Defaults to `700`. */
  valueFontWeight?: number;
  /** When true, stacks label above value on xs screens. Defaults to `true`. */
  responsive?: boolean;
  /** When true, renders a skeleton placeholder matching the list layout. */
  loading?: boolean;
  /** Number of skeleton rows to render while `loading`. Defaults to 3. */
  loadingRowCount?: number;
  /** Optional action (e.g. Edit button) rendered on the right side of the title row. Requires `title`. */
  titleAction?: React.ReactNode;
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}

export interface DescriptionListItemProps {
  /** Left-side label text. */
  label: string;
  /** Optional secondary text below the label — rendered in `small` variant. */
  description?: string;
  /** Right-side value — string, number, or any ReactNode. */
  value: React.ReactNode;
  /** Optional secondary text below the value — rendered in `small` variant. */
  valueDescription?: string;
  /** Optional slot after the value — pushed to the far right. */
  action?: React.ReactNode;
  /** Overrides the parent `valueAlign` for this row only. */
  valueAlign?: ValueAlign;
}
