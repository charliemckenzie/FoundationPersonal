import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { SxProps, Theme } from '@mui/material/styles';
import React from 'react';
import { DescriptionListSkeleton } from './DescriptionListSkeleton';

type ValueAlign = 'left' | 'right';
export type DescriptionListDensity = 'condensed' | 'default' | 'spaced';

const densityPy: Record<DescriptionListDensity, number> = {
  condensed: 1,
  default: 1.5,
  spaced: 2,
};

interface DescriptionListContextValue {
  valueAlign: ValueAlign;
  density: DescriptionListDensity;
  labelWidth?: number | string;
  valueWidth?: number | string;
  labelFontWeight?: number;
  valueFontWeight?: number;
  responsive?: boolean;
}

const DescriptionListContext = React.createContext<DescriptionListContextValue>({
  valueAlign: 'left',
  density: 'default',
});

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

function DescriptionListItem({ label, description, value, valueDescription, action, valueAlign }: DescriptionListItemProps) {
  const { valueAlign: contextAlign, density, labelWidth, valueWidth, labelFontWeight = 400, valueFontWeight = 700, responsive = true } = React.useContext(DescriptionListContext);
  const align = valueAlign ?? contextAlign;
  const isText = typeof value === 'string' || typeof value === 'number';
  const toCol = (w: number | string) => (typeof w === 'number' ? `${w}px` : w);
  const desktopColumns =
    labelWidth && valueWidth ? `${toCol(labelWidth)} ${toCol(valueWidth)}`
    : labelWidth             ? `${toCol(labelWidth)} 1fr`
    : valueWidth             ? `1fr ${toCol(valueWidth)}`
    : '1fr 1fr';

  return (
    <Box
      component="div"
      sx={{
        display: 'grid',
        gridTemplateColumns: responsive ? { xs: '1fr', sm: desktopColumns } : desktopColumns,
        alignItems: responsive
          ? { sm: (description || valueDescription) ? 'flex-start' : 'center' }
          : (description || valueDescription) ? 'flex-start' : 'center',
        columnGap: 2,
        rowGap: responsive ? { xs: 0.5, sm: 0 } : 0,
        py: densityPy[density],
      }}
    >
      <Box component="dt" sx={{ minWidth: 0 }}>
        <Typography component="span" variant="body" sx={{ color: 'text.primary', display: 'block', fontWeight: labelFontWeight }}>
          {label}
        </Typography>
        {description && (
          <Typography component="span" variant="small" sx={{ color: 'text.muted', display: 'block', mb: responsive ? { xs: 0.5, sm: 0 } : 0 }}>
            {description}
          </Typography>
        )}
      </Box>
      <Box
        component="dd"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 0,
          m: 0,
          minWidth: 0,
          alignItems: responsive && align === 'right'
            ? { xs: 'flex-start', sm: 'flex-end' }
            : align === 'right' ? 'flex-end' : 'flex-start',
        }}
      >
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          width: '100%',
          justifyContent: action
            ? 'space-between'
            : responsive && align === 'right'
              ? { xs: 'flex-start', sm: 'flex-end' }
              : align === 'right' ? 'flex-end' : 'flex-start',
        }}>
          {isText ? (
            <Typography
              component="span"
              variant="body"
              sx={{ fontWeight: valueFontWeight, color: 'text.primary' }}
            >
              {value}
            </Typography>
          ) : (
            value
          )}
          {action}
        </Box>
        {valueDescription && (
          <Typography component="span" variant="small" sx={{ color: 'text.muted', display: 'block' }}>
            {valueDescription}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

DescriptionListItem.displayName = 'DescriptionListItem';

function DescriptionList({ title, titleVariant = 'h5', valueAlign = 'left', density = 'default', labelWidth, valueWidth, labelFontWeight, valueFontWeight, responsive = true, loading = false, loadingRowCount = 3, children, sx }: DescriptionListProps) {
  const contextValue = React.useMemo<DescriptionListContextValue>(
    () => ({ valueAlign, density, labelWidth, valueWidth, labelFontWeight, valueFontWeight, responsive }),
    [valueAlign, density, labelWidth, valueWidth, labelFontWeight, valueFontWeight, responsive],
  );

  if (loading) {
    return (
      <DescriptionListSkeleton
        rowCount={loadingRowCount}
        title={!!title}
        density={density}
        responsive={responsive}
        sx={sx}
      />
    );
  }

  return (
    <DescriptionListContext.Provider value={contextValue}>
      <Box
        sx={[
          {
            borderRadius: (theme: Theme) => `${theme.shape.lg}px`,
            backgroundColor: 'background.paper',
            border: '1px solid',
            borderColor: 'border.default',
            px: { xs: 3, sm: 4 },
            pt: { xs: 3, sm: 4 },
            pb: { xs: 3, sm: 4 },
          },
          ...(Array.isArray(sx) ? sx : [sx ?? false]),
        ]}
      >
        {title && (
          <Typography variant={titleVariant} sx={{ fontWeight: 700, mb: 2 }}>
            {title}
          </Typography>
        )}
        <Box
          component="dl"
          sx={[
            (theme: Theme) => ({
              m: 0,
              '& > div': {
                borderTop: `1px solid ${theme.palette.border.subtle}`,
              },
              '& > div:last-child': {
                paddingBottom: 0,
              },
            }),
            !title && {
              '& > div:first-of-type': {
                borderTop: 'none',
                paddingTop: 0,
              },
            },
          ]}
        >
          {children}
        </Box>
      </Box>
    </DescriptionListContext.Provider>
  );
}

DescriptionList.displayName = 'DescriptionList';
DescriptionList.Item = DescriptionListItem;

export { DescriptionList };
export { DescriptionListSkeleton } from './DescriptionListSkeleton';
export type { DescriptionListSkeletonProps } from './DescriptionListSkeleton';
