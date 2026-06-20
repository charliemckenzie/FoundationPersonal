import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { Theme } from '@mui/material/styles';
import React from 'react';
import { DescriptionListSkeleton } from './DescriptionListSkeleton';
import { DescriptionListContext } from './context';
import { DescriptionListItem } from './DescriptionListItem';
import type { DescriptionListContextValue, DescriptionListProps } from './types';

export type {
  DescriptionListDensity,
  DescriptionListProps,
  DescriptionListItemProps,
} from './types';

function DescriptionList({ title, titleVariant = 'h5', titleAction, valueAlign = 'left', density = 'default', labelWidth, valueWidth, labelFontWeight, valueFontWeight, responsive = true, loading = false, loadingRowCount = 3, children, sx }: DescriptionListProps) {
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
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant={titleVariant} sx={{ fontWeight: 700 }}>
              {title}
            </Typography>
            {titleAction}
          </Box>
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
