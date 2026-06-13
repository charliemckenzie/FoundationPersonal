'use client';

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { InvestmentOption } from './types';
import { summariseMix } from './utils';

interface CurrentMixSummaryProps {
  options: InvestmentOption[];
  /** optionId → whole-number percentage. */
  allocations: Record<string, number>;
}

/**
 * Maps each investment option to its allocation-colour key in the theme brand
 * config (the colours documented under Design Tokens → Investment Allocations).
 */
const OPTION_COLOR_REF: Record<string, { group: 'diversifiedOptions' | 'assetClassOptions'; key: string }> = {
  'opt-high-growth':           { group: 'diversifiedOptions', key: 'highGrowth' },
  'opt-balanced':              { group: 'diversifiedOptions', key: 'balanced' },
  'opt-conservative-balanced': { group: 'diversifiedOptions', key: 'conservativeBalanced' },
  'opt-conservative':          { group: 'diversifiedOptions', key: 'conservative' },
  'opt-balanced-risk-adjusted':{ group: 'diversifiedOptions', key: 'balancedRiskAdjusted' },
  'opt-socially-conscious':    { group: 'diversifiedOptions', key: 'sociallyConsciousBalanced' },
  'opt-high-growth-index':     { group: 'diversifiedOptions', key: 'highGrowthIndex' },
  'opt-balanced-index':        { group: 'diversifiedOptions', key: 'balancedIndex' },
  'opt-aus-shares':            { group: 'assetClassOptions', key: 'australianSharesIndex' },
  'opt-intl-shares-hedged':    { group: 'assetClassOptions', key: 'internationalSharesHedgedIndex' },
  'opt-intl-shares-unhedged':  { group: 'assetClassOptions', key: 'internationalSharesUnhedgedIndex' },
  'opt-listed-property':       { group: 'assetClassOptions', key: 'listedPropertyIndex' },
  'opt-unlisted-assets':       { group: 'assetClassOptions', key: 'unlistedAssets' },
  'opt-bonds':                 { group: 'assetClassOptions', key: 'bondsIndex' },
  'opt-cash':                  { group: 'assetClassOptions', key: 'cash' },
};

/**
 * Visualises an account's current investment mix as a stacked allocation bar
 * with a text legend (options separated by subtle dividers). Segment colours
 * come from the brand's investment-allocation palette. The bar is decorative
 * (`role="img"`); the legend carries the accessible detail.
 */
export function CurrentMixSummary({ options, allocations }: CurrentMixSummaryProps) {
  const theme = useTheme();

  const allocationColor = (optionId: string): string => {
    const ref = OPTION_COLOR_REF[optionId];
    if (ref) {
      const source = (ref.group === 'diversifiedOptions'
        ? theme.brandConfig.diversifiedOptions
        : theme.brandConfig.assetClassOptions) as Record<string, string> | undefined;
      const hex = source?.[ref.key];
      if (hex) return hex;
    }
    return theme.palette.divider;
  };

  const allocated = options.filter((o) => (allocations[o.id] ?? 0) > 0);

  if (allocated.length === 0) {
    return (
      <Typography variant="body" sx={{ color: 'text.muted' }}>
        No current investment mix on record for this account.
      </Typography>
    );
  }

  return (
    <Stack spacing={2}>
      <Box
        role="img"
        aria-label={`Current investment mix: ${summariseMix(options, allocations)}`}
        sx={{
          display: 'flex',
          width: '100%',
          height: '0.75rem',
          borderRadius: (t) => `${t.shape.sm}px`,
          overflow: 'hidden',
        }}
      >
        {allocated.map((o) => (
          <Box key={o.id} sx={{ width: `${allocations[o.id]}%`, bgcolor: allocationColor(o.id) }} />
        ))}
      </Box>

      <Stack component="ul" sx={{ m: 0, p: 0, listStyle: 'none' }}>
        {allocated.map((o, i) => (
          <Box
            component="li"
            key={o.id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              py: 1,
              ...(i > 0 && { borderTop: '1px solid', borderColor: 'border.subtle' }),
            }}
          >
            <Box
              aria-hidden="true"
              sx={{
                width: '0.75rem',
                height: '0.75rem',
                minWidth: '0.75rem',
                borderRadius: '50%',
                bgcolor: allocationColor(o.id),
              }}
            />
            <Typography variant="body" sx={{ flexGrow: 1 }}>
              {o.name}
            </Typography>
            <Typography variant="body" sx={{ fontWeight: 700 }}>
              {allocations[o.id]}%
            </Typography>
          </Box>
        ))}
      </Stack>
    </Stack>
  );
}
