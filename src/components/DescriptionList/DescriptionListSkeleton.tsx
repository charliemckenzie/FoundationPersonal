import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';
import { Skeleton } from '../Skeleton';
import type { DescriptionListDensity } from './index';

const densityPy: Record<DescriptionListDensity, number> = {
  condensed: 1,
  default: 1.5,
  spaced: 2,
};

// Alternating label/value widths so rows don't look identical
const ROW_WIDTHS: Array<[string, string]> = [
  ['45%', '55%'],
  ['55%', '40%'],
  ['38%', '60%'],
  ['50%', '45%'],
  ['42%', '52%'],
  ['58%', '38%'],
];

export interface DescriptionListSkeletonProps {
  /** Number of placeholder rows. Defaults to 3. */
  rowCount?: number;
  /** Show a title placeholder above the rows. Defaults to false. */
  title?: boolean;
  /** Row padding density — should match the real list. Defaults to `default`. */
  density?: DescriptionListDensity;
  /** Show an action placeholder at the end of each row. Defaults to false. */
  withAction?: boolean;
  /** When true, stacks label above value on xs screens. Defaults to true. */
  responsive?: boolean;
  sx?: SxProps<Theme>;
}

interface SkeletonRowProps {
  density: DescriptionListDensity;
  borderTop: boolean;
  withAction: boolean;
  responsive: boolean;
  labelWidth: string;
  valueWidth: string;
}

function SkeletonRow({ density, borderTop, withAction, responsive, labelWidth, valueWidth }: SkeletonRowProps) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: responsive ? { xs: '1fr', sm: '1fr 1fr' } : '1fr 1fr',
        columnGap: 2,
        rowGap: responsive ? { xs: 0.5, sm: 0 } : 0,
        alignItems: 'center',
        py: densityPy[density],
        ...(borderTop && {
          borderTop: '1px solid',
          borderTopColor: 'border.subtle',
        }),
      }}
    >
      <Skeleton variant="text" width={labelWidth} height="1.5rem" />
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Skeleton variant="text" width={valueWidth} height="1.5rem" />
        {withAction && <Skeleton variant="rounded" width="3rem" height="1.25rem" />}
      </Box>
    </Box>
  );
}

/** Loading placeholder for `DescriptionList`. Mirrors the panel border, optional title, and row grid. */
export function DescriptionListSkeleton({
  rowCount = 3,
  title = false,
  density = 'default',
  withAction = false,
  responsive = true,
  sx,
}: DescriptionListSkeletonProps) {
  const rows = Array.from({ length: rowCount }, (_, i) => i);

  return (
    <Box
      aria-busy="true"
      aria-live="polite"
      aria-label="Loading"
      sx={[
        (t: Theme) => ({
          borderRadius: `${t.shape.lg}px`,
          backgroundColor: 'background.paper',
          border: '1px solid',
          borderColor: 'border.default',
          px: { xs: 3, sm: 4 },
          pt: { xs: 3, sm: 4 },
          pb: { xs: 3, sm: 4 },
        }),
        ...(Array.isArray(sx) ? sx : [sx ?? false]),
      ]}
    >
      {title && (
        <Box sx={{ mb: 2 }}>
          <Skeleton variant="text" width="40%" height="1.5rem" />
        </Box>
      )}
      <Box
        sx={(t: Theme) => ({
          '& > *:first-of-type': {
            borderTop: title ? `1px solid ${t.palette.border.subtle}` : 'none',
            pt: title ? densityPy[density] : 0,
          },
          '& > *:last-child': {
            pb: 0,
          },
        })}
      >
        {rows.map((i) => {
          const [lw, vw] = ROW_WIDTHS[i % ROW_WIDTHS.length];
          return (
            <SkeletonRow
              key={i}
              density={density}
              borderTop={title ? true : i > 0}
              withAction={withAction}
              responsive={responsive}
              labelWidth={lw}
              valueWidth={vw}
            />
          );
        })}
      </Box>
    </Box>
  );
}
