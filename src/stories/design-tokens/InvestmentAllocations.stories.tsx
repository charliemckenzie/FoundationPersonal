import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import type { BrandConfig } from '../../app/themes/brands/index';

declare module '@mui/material/styles' {
  interface Theme {
    brandConfig: BrandConfig;
  }
}

// ART ordering
const SHARED_DIVERSIFIED_LABELS: Record<string, string> = {
  highGrowth:                'High Growth',
  balanced:                  'Balanced',
  conservativeBalanced:      'Conservative-Balanced',
  conservative:              'Conservative',
  balancedRiskAdjusted:      'Balanced Risk-Adjusted',
  sociallyConsciousBalanced: 'Socially Conscious Balanced',
  highGrowthIndex:           'High Growth Index',
  balancedIndex:             'Balanced Index',
};

// QSuper ordering
const QSUPER_DIVERSIFIED_LABELS: Record<string, string> = {
  highGrowthIndex:           'High Growth Index',
  highGrowth:                'High Growth',
  balancedIndex:             'Balanced Index',
  balanced:                  'Balanced',
  sociallyConsciousBalanced: 'Socially Conscious Balanced',
  balancedRiskAdjusted:      'Balanced Risk-Adjusted',
  conservativeBalanced:      'Conservative-Balanced',
  conservative:              'Conservative',
};

// ART ordering
const SHARED_ASSET_CLASS_LABELS: Record<string, string> = {
  australianSharesIndex:            'Australian Shares Index',
  internationalSharesHedgedIndex:   'International Shares Hedged Index',
  internationalSharesUnhedgedIndex: 'International Shares Unhedged Index',
  listedPropertyIndex:              'Listed Property Index',
  unlistedAssets:                   'Unlisted Assets',
  bondsIndex:                       'Bonds Index',
  cash:                             'Cash',
};

// QSuper ordering
const QSUPER_ASSET_CLASS_LABELS: Record<string, string> = {
  listedPropertyIndex:              'Listed Property Index',
  australianSharesIndex:            'Australian Shares Index',
  internationalSharesHedgedIndex:   'International Shares Hedged Index',
  internationalSharesUnhedgedIndex: 'International Shares Unhedged Index',
  unlistedAssets:                   'Unlisted Assets',
  bondsIndex:                       'Bonds Index',
  cash:                             'Cash',
};

const ART_INVESTMENT_LABELS: Record<string, string> = {
  lifecycleHighGrowthPool: 'Lifecycle - High Growth Pool',
  lifecycleBalancedPool:   'Lifecycle - Balanced Pool',
  lifecycleCashPool:       'Lifecycle - Cash Pool',
};

const ART_ASSET_LABELS: Record<string, string> = {
  australianShares:              'Australian Shares',
  internationalShares:           'International Shares',
  unlistedAssetsAndAlternatives: 'Unlisted Assets and Alternatives',
  fixedIncome:                   'Fixed Income',
  cash:                          'Cash',
};

const ALLOCATION_LABELS: Record<string, string> = {
  lifetime: 'Lifetime',
  outlook:  'Outlook',
  aspire1:  'Aspire 1',
  aspire2:  'Aspire 2',
  focus1:   'Focus 1',
  focus2:   'Focus 2',
  focus3:   'Focus 3',
  sustain1: 'Sustain 1',
  sustain2: 'Sustain 2',
  sustain3: 'Sustain 3',
};

const ASSET_LABELS: Record<string, string> = {
  australianSharesIndex:            'Australian Shares Index',
  internationalSharesHedgedIndex:   'International Shares Hedged Index',
  internationalSharesUnhedgedIndex: 'International Shares Unhedged Index',
  listedPropertyIndex:              'Listed Property Index',
  unlistedAssets:                   'Unlisted Assets',
  bondsIndex:                       'Bonds Index',
  cash:                             'Cash',
};

const GROUPS = [
  { label: 'Lifetime',  keys: ['lifetime'] },
  { label: 'Outlook',   keys: ['outlook'] },
  { label: 'Aspire',    keys: ['aspire1', 'aspire2'] },
  { label: 'Focus',     keys: ['focus1', 'focus2', 'focus3'] },
  { label: 'Sustain',   keys: ['sustain1', 'sustain2', 'sustain3'] },
];

function isLight(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 160;
}

function AllocationSwatch({ label, hex, tokenKey }: { label: string; hex: string; tokenKey: string }) {
  const textColor = isLight(hex) ? '#191b1f' : '#ffffff';
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 1,
        overflow: 'hidden',
        border: '1px solid',
        borderColor: 'divider',
        minWidth: 140,
        flex: '1 1 140px',
      }}
    >
      <Box
        sx={{
          height: 80,
          bgcolor: hex,
          display: 'flex',
          alignItems: 'flex-end',
          p: 1.5,
        }}
      >
        <Typography
          variant="small"
          sx={{ color: textColor, fontWeight: 700, lineHeight: 1 }}
        >
          {label}
        </Typography>
      </Box>
      <Box sx={{ p: 1.5, bgcolor: 'background.paper', display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        <Typography variant="small" sx={{ fontFamily: 'monospace', fontWeight: 600, fontSize: 12 }}>
          {hex.toUpperCase()}
        </Typography>
        <Typography variant="small" sx={{ color: 'text.muted', fontSize: 11 }}>
          {tokenKey}
        </Typography>
      </Box>
    </Box>
  );
}

function InvestmentAllocationsDoc() {
  const theme = useTheme();
  const diversified      = theme.brandConfig.diversifiedOptions;
  const assetClassOpts   = theme.brandConfig.assetClassOptions;
  const allocations      = theme.brandConfig.investmentAllocations;
  const isQSuper         = !!allocations;
  const diversifiedLabels   = isQSuper ? QSUPER_DIVERSIFIED_LABELS   : SHARED_DIVERSIFIED_LABELS;
  const assetClassLabels    = isQSuper ? QSUPER_ASSET_CLASS_LABELS    : SHARED_ASSET_CLASS_LABELS;
  const assetAllocations = theme.brandConfig.assetAllocations;
  const artInvestment    = theme.brandConfig.artInvestmentOptions;
  const artAsset         = theme.brandConfig.artAssetMix;

  if (!diversified && !assetClassOpts && !allocations && !assetAllocations && !artInvestment && !artAsset) {
    return (
      <Box sx={{ p: 6 }}>
        <Typography variant="h4" sx={{ mb: 1 }}>Investment Allocation Colours</Typography>
        <Typography variant="body" color="text.muted">
          No allocation colours are defined for this theme.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4, maxWidth: 900 }}>

      {/* Shared Diversified Options — both themes */}
      {diversified && (
        <>
          <Typography variant="h4" sx={{ mb: 0.5 }}>Diversified Options</Typography>
          <Typography variant="body" color="text.muted" sx={{ display: 'block', mb: 1 }}>
            Shared across ART and QSuper. Effective from 1 July 2024.
          </Typography>
          <Typography variant="small" color="text.muted" sx={{ display: 'block', mb: 5, fontFamily: 'monospace' }}>
            Source: <code>sharedDiversifiedOptions</code> in <code>primitives/colors.ts</code> → <code>theme.brandConfig.diversifiedOptions</code>
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 8 }}>
            {Object.keys(diversifiedLabels).map((key) => (
              <AllocationSwatch
                key={key}
                label={diversifiedLabels[key]}
                tokenKey={`sharedDiversifiedOptions.${key}`}
                hex={diversified[key as keyof typeof diversified]}
              />
            ))}
          </Box>
        </>
      )}

      {/* Shared Asset Class Options — both themes */}
      {assetClassOpts && (
        <>
          <Typography variant="h4" sx={{ mb: 0.5 }}>Asset Class Options</Typography>
          <Typography variant="body" color="text.muted" sx={{ display: 'block', mb: 1 }}>
            Shared across ART and QSuper. Effective from 1 July 2024.
          </Typography>
          <Typography variant="small" color="text.muted" sx={{ display: 'block', mb: 5, fontFamily: 'monospace' }}>
            Source: <code>sharedAssetClassOptions</code> in <code>primitives/colors.ts</code> → <code>theme.brandConfig.assetClassOptions</code>
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 8 }}>
            {Object.keys(assetClassLabels).map((key) => (
              <AllocationSwatch
                key={key}
                label={assetClassLabels[key]}
                tokenKey={`sharedAssetClassOptions.${key}`}
                hex={assetClassOpts[key as keyof typeof assetClassOpts]}
              />
            ))}
          </Box>
        </>
      )}

      {/* ART Investment Options (Lifecycle + extras) */}
      {artInvestment && (
        <>
          <Typography variant="h4" sx={{ mb: 0.5 }}>Lifecycle — ART specific</Typography>
          <Typography variant="body" color="text.muted" sx={{ display: 'block', mb: 1 }}>
            ART only. Effective from 1 July 2024.
          </Typography>
          <Typography variant="small" color="text.muted" sx={{ display: 'block', mb: 5, fontFamily: 'monospace' }}>
            Source: <code>artInvestmentOptions</code> in <code>primitives/colors.ts</code> → <code>theme.brandConfig.artInvestmentOptions</code>
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 8 }}>
            {Object.keys(ART_INVESTMENT_LABELS).map((key) => (
              <AllocationSwatch
                key={key}
                label={ART_INVESTMENT_LABELS[key]}
                tokenKey={`artInvestmentOptions.${key}`}
                hex={artInvestment[key as keyof typeof artInvestment]}
              />
            ))}
          </Box>
        </>
      )}

      {/* ART Asset Mix */}
      {artAsset && (
        <>
          <Typography variant="h4" sx={{ mb: 0.5 }}>Asset Mix — ART specific</Typography>
          <Typography variant="body" color="text.muted" sx={{ display: 'block', mb: 1 }}>
            ART only. Effective from 1 July 2024.
          </Typography>
          <Typography variant="small" color="text.muted" sx={{ display: 'block', mb: 5, fontFamily: 'monospace' }}>
            Source: <code>artAssetMix</code> in <code>primitives/colors.ts</code> → <code>theme.brandConfig.artAssetMix</code>
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 8 }}>
            {Object.keys(ART_ASSET_LABELS).map((key) => (
              <AllocationSwatch
                key={key}
                label={ART_ASSET_LABELS[key]}
                tokenKey={`artAssetMix.${key}`}
                hex={artAsset[key as keyof typeof artAsset]}
              />
            ))}
          </Box>
        </>
      )}

      {/* QSuper Investment Options */}
      {allocations && (
        <>
          <Typography variant="h4" sx={{ mb: 0.5 }}>Investment Options — QSuper specific</Typography>
          <Typography variant="body" color="text.muted" sx={{ display: 'block', mb: 1 }}>
            QSuper only. Effective from 1 July 2024.
          </Typography>
          <Typography variant="small" color="text.muted" sx={{ display: 'block', mb: 5, fontFamily: 'monospace' }}>
            Source: <code>qsuperInvestmentAllocations</code> in <code>primitives/colors.ts</code> → <code>theme.brandConfig.investmentAllocations</code>
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5, mb: 8 }}>
            {GROUPS.map(({ label, keys }) => (
              <Box key={label}>
                <Typography
                  variant="small"
                  sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'text.muted', mb: 1.5, display: 'block' }}
                >
                  {label}
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  {keys.map((key) => (
                    <AllocationSwatch
                      key={key}
                      label={ALLOCATION_LABELS[key]}
                      tokenKey={`qsuperInvestmentAllocations.${key}`}
                      hex={allocations[key as keyof typeof allocations]}
                    />
                  ))}
                </Box>
              </Box>
            ))}
          </Box>
        </>
      )}

    </Box>
  );
}

const meta: Meta = {
  title: 'Design Tokens/Colors/Investment Allocations',
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <InvestmentAllocationsDoc />,
};
