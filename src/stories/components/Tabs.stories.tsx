import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from '../../components/Tabs';
import type { TabSize, TabVariant } from '../../components/Tabs';
import { ThemeProvider, useTheme, createTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useMemo } from 'react';
import { createBrandTheme } from '../../app/themes/factory';
import { foundation } from '../../app/themes/brands/foundation';
import { themeB } from '../../app/themes/brands/theme-b';

const meta: Meta<typeof Tabs> = {
  title: 'Components / Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

const placeholder = (name: string) => (
  <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1, border: '1px dashed', borderColor: 'divider' }}>
    <Typography variant="body" color="text.muted">{name} — placeholder content</Typography>
  </Box>
);

const SAMPLE_TABS = [
  { label: 'Tab label', content: placeholder('Tab one') },
  { label: 'Tab label', content: placeholder('Tab two') },
  { label: 'Tab label', content: placeholder('Tab three') },
];

const SIZE_TABS = [
  { label: 'Tab label' },
  { label: 'Tab label' },
  { label: 'Tab label' },
];

// ─── Default stories ──────────────────────────────────────────────────────────

export const PillTabs: Story = {
  name: 'Pill tabs',
  render: () => (
    <>
      <Typography variant="body" color="text.muted" sx={{ display: 'block', mb: 1 }}>
        More commonly used tab style.
      </Typography>
      <Typography variant="small" sx={{ display: 'block', mb: 0.5 }}>
        <strong>Behavior: Tab</strong>
      </Typography>
      <Typography variant="small" color="text.muted" sx={{ display: 'block', mb: 3 }}>
        Standard JavaScript driven tab behavior. Each tab has a corresponding tab content that shows
        and hides on a single page depending on what&apos;s selected.
      </Typography>
      <Tabs label="Pill tabs example" tabs={SAMPLE_TABS} variant="pill" />
    </>
  ),
};

export const NavTabs: Story = {
  name: 'Nav tabs',
  render: () => (
    <>
      <Typography variant="body" color="text.muted" sx={{ display: 'block', mb: 1 }}>
        Less frequently used tab style.
      </Typography>
      <Typography variant="small" sx={{ display: 'block', mb: 0.5 }}>
        <strong>Behavior: Link tab</strong>
      </Typography>
      <Typography variant="small" color="text.muted" sx={{ display: 'block', mb: 3 }}>
        Using tabs as a navigation tool to other pages instead of tab content. Nav tab is more
        commonly used to help a user quickly switch between pages.
      </Typography>
      <Tabs label="Nav tabs example" tabs={SAMPLE_TABS} variant="nav" />
    </>
  ),
};

// ─── Size rows ────────────────────────────────────────────────────────────────

interface SizeRowProps {
  variant: TabVariant;
  size: TabSize;
  label: string;
}

function SizeRow({ variant, size, label }: SizeRowProps) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, mb: 2 }}>
      <Box sx={{ flex: 1 }}>
        <Tabs label={`${label} size tabs`} tabs={SIZE_TABS} variant={variant} size={size} />
      </Box>
      <Typography variant="small" color="text.muted" sx={{ minWidth: 56 }}>
        {label}
      </Typography>
    </Box>
  );
}

export const PillSizes: Story = {
  name: 'Pill — Size variations',
  render: () => (
    <Box sx={{ maxWidth: 560 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>Size variations</Typography>
      <SizeRow variant="pill" size="small"  label="Small"  />
      <SizeRow variant="pill" size="medium" label="Medium" />
      <SizeRow variant="pill" size="large"  label="Large"  />
      <Typography variant="small" color="text.muted" sx={{ mt: 2, display: 'block' }}>
        No detailed rules apply, use the size that&apos;s appropriate for the need.
      </Typography>
    </Box>
  ),
};

export const NavSizes: Story = {
  name: 'Nav — Size variations',
  render: () => (
    <Box sx={{ maxWidth: 560 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>Size variations</Typography>
      <SizeRow variant="nav" size="small"  label="Small"  />
      <SizeRow variant="nav" size="medium" label="Medium" />
      <SizeRow variant="nav" size="large"  label="Large"  />
      <Typography variant="small" color="text.muted" sx={{ mt: 2, display: 'block' }}>
        No detailed rules apply, use the size that&apos;s appropriate for the need.
      </Typography>
    </Box>
  ),
};

// ─── Background contexts ──────────────────────────────────────────────────────

interface BgRowProps {
  variant: TabVariant;
  bgcolor: string;
  tabStyle?: 'default' | 'white';
  bgLabel: string;
}

function BgRow({ variant, bgcolor, tabStyle = 'default', bgLabel }: BgRowProps) {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="small" color="text.muted" sx={{ display: 'block', mb: 1 }}>{bgLabel}</Typography>
      <Box sx={{ bgcolor, borderRadius: 1, p: 3 }}>
        <Tabs label={`${bgLabel} ${variant} tabs`} tabs={SIZE_TABS} variant={variant} tabStyle={tabStyle} />
      </Box>
    </Box>
  );
}

function BackgroundsDoc() {
  const theme = useTheme();
  const hasSky       = !!theme.palette.background.brandSky;
  const hasClear     = !!theme.palette.background.brandClear;
  const hasGrey      = !!theme.palette.background.brandGrey;
  const hasLightBlue = !!theme.palette.background.brandLightBlue;

  const darkThemeART = useMemo(() => {
    if (!hasSky) return null;
    const brandTheme = createBrandTheme(foundation);
    const { colorSchemes, ...rest } = brandTheme as any;
    return createTheme({ ...rest, palette: colorSchemes.dark.palette });
  }, [hasSky]);

  const darkTheme = useMemo(() => {
    if (!hasGrey) return null;
    const brandTheme = createBrandTheme(themeB);
    const { colorSchemes, ...rest } = brandTheme as any;
    return createTheme({ ...rest, palette: colorSchemes.dark.palette });
  }, [hasGrey]);

  return (
    <Box sx={{ maxWidth: 700 }}>
      <Typography variant="h4" sx={{ mb: 0.5 }}>Pill tabs — Background contexts</Typography>
      <Typography variant="body" color="text.muted" sx={{ display: 'block', mb: 4 }}>
        Pill tabs using the white tab style on brand-coloured surfaces.
      </Typography>
      {hasSky && (
        <BgRow variant="pill" bgcolor="background.brandSky" bgLabel="background.brandSky" />
      )}
      {hasClear && (
        <BgRow variant="pill" bgcolor="background.brandClear" bgLabel="background.brandClear" />
      )}
      {hasGrey && (
        <BgRow variant="pill" bgcolor="background.brandGrey" bgLabel="background.brandGrey" />
      )}
      {hasLightBlue && (
        <BgRow variant="pill" bgcolor="background.brandLightBlue" bgLabel="background.brandLightBlue" />
      )}

      <Typography variant="h4" sx={{ mb: 0.5, mt: 4 }}>Nav tabs — Background contexts</Typography>
      <Typography variant="body" color="text.muted" sx={{ display: 'block', mb: 4 }}>
        Nav tabs on the same brand-coloured surfaces.
      </Typography>
      {hasSky && (
        <BgRow variant="nav" bgcolor="background.brandSky" bgLabel="background.brandSky" />
      )}
      {hasClear && (
        <BgRow variant="nav" bgcolor="background.brandClear" bgLabel="background.brandClear" />
      )}
      {hasGrey && (
        <BgRow variant="nav" bgcolor="background.brandGrey" bgLabel="background.brandGrey" />
      )}
      {hasLightBlue && (
        <BgRow variant="nav" bgcolor="background.brandLightBlue" bgLabel="background.brandLightBlue" />
      )}

      {hasSky && darkThemeART && (
        <ThemeProvider theme={darkThemeART}>
          <Typography variant="h4" sx={{ mb: 0.5, mt: 6 }}>Pill tabs — Dark mode</Typography>
          <Typography variant="body" color="text.muted" sx={{ display: 'block', mb: 4 }}>
            ART brand surfaces in dark mode.
          </Typography>
          <BgRow variant="pill" bgcolor="background.brandSky" bgLabel="background.brandSky (dark)" />
          <BgRow variant="pill" bgcolor="background.brandClear" bgLabel="background.brandClear (dark)" />
          <BgRow variant="pill" bgcolor="background.brandWarm" bgLabel="background.brandWarm (dark)" />

          <Typography variant="h4" sx={{ mb: 0.5, mt: 4 }}>Nav tabs — Dark mode</Typography>
          <Typography variant="body" color="text.muted" sx={{ display: 'block', mb: 4 }}>
            Nav tabs in dark mode.
          </Typography>
          <BgRow variant="nav" bgcolor="background.brandSky" bgLabel="background.brandSky (dark)" />
          <BgRow variant="nav" bgcolor="background.brandClear" bgLabel="background.brandClear (dark)" />
          <BgRow variant="nav" bgcolor="background.brandWarm" bgLabel="background.brandWarm (dark)" />
        </ThemeProvider>
      )}

      {hasGrey && darkTheme && (
        <ThemeProvider theme={darkTheme}>
          <Typography variant="h4" sx={{ mb: 0.5, mt: 6 }}>Pill tabs — Dark mode</Typography>
          <Typography variant="body" color="text.muted" sx={{ display: 'block', mb: 4 }}>
            QSuper brand surfaces in dark mode.
          </Typography>
          <BgRow variant="pill" bgcolor="background.brandGrey" bgLabel="background.brandGrey (dark)" />
          <BgRow variant="pill" bgcolor="background.brandLightBlue" bgLabel="background.brandLightBlue (dark)" />

          <Typography variant="h4" sx={{ mb: 0.5, mt: 4 }}>Nav tabs — Dark mode</Typography>
          <Typography variant="body" color="text.muted" sx={{ display: 'block', mb: 4 }}>
            Nav tabs in dark mode.
          </Typography>
          <BgRow variant="nav" bgcolor="background.brandGrey" bgLabel="background.brandGrey (dark)" />
          <BgRow variant="nav" bgcolor="background.brandLightBlue" bgLabel="background.brandLightBlue (dark)" />
        </ThemeProvider>
      )}
    </Box>
  );
}

export const Backgrounds: Story = {
  name: 'Background contexts',
  render: () => <BackgroundsDoc />,
};

