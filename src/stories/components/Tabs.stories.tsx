import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from '../../components/Tabs';
import type { TabSize } from '../../components/Tabs';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useMemo } from 'react';
import { createBrandTheme } from '../../app/themes/factory';
import { themeB } from '../../app/themes/brands/theme-b';

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

const meta: Meta<typeof Tabs> = {
  title: 'Components / Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Tab size — controls font size and padding.',
    },
    tabStyle: {
      control: 'select',
      options: ['default', 'white'],
      description: 'Use `white` on brand-coloured backgrounds.',
    },
    defaultTab: {
      control: 'number',
      description: 'Index of the initially selected tab.',
    },
    label: {
      control: 'text',
      description: 'Accessible label for the tablist (screen readers only).',
    },
    tabs: { table: { disable: true } },
    onChange: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  args: {
    label: 'Example tabs',
    size: 'medium',
    tabStyle: 'default',
    defaultTab: 0,
    tabs: SAMPLE_TABS,
  },
};

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
      <Tabs label="Pill tabs example" tabs={SAMPLE_TABS} />
    </>
  ),
};

// ─── Size rows ────────────────────────────────────────────────────────────────

interface SizeRowProps {
  size: TabSize;
  label: string;
}

function SizeRow({ size, label }: SizeRowProps) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, mb: 2 }}>
      <Box sx={{ flex: 1 }}>
        <Tabs label={`${label} size tabs`} tabs={SIZE_TABS} size={size} />
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
      <SizeRow size="small"  label="Small"  />
      <SizeRow size="medium" label="Medium" />
      <SizeRow size="large"  label="Large"  />
      <Typography variant="small" color="text.muted" sx={{ mt: 2, display: 'block' }}>
        No detailed rules apply, use the size that&apos;s appropriate for the need.
      </Typography>
    </Box>
  ),
};

// ─── Background contexts ────────────────────────────────────────────────────

interface BgRowProps {
  bgcolor: string;
  tabStyle?: 'default' | 'white';
  bgLabel: string;
}

function BgRow({ bgcolor, tabStyle = 'default', bgLabel }: BgRowProps) {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="small" color="text.muted" sx={{ display: 'block', mb: 1 }}>{bgLabel}</Typography>
      <Box sx={{ bgcolor, borderRadius: 1, p: 3 }}>
        <Tabs label={`${bgLabel} tabs`} tabs={SIZE_TABS} tabStyle={tabStyle} />
      </Box>
    </Box>
  );
}

function BackgroundsDoc() {
  const theme = useTheme();
  const hasClear     = !!theme.palette.background.brandClear;
  const hasGrey      = !!theme.palette.background.brandGrey;
  const hasLightBlue = !!theme.palette.background.brandLightBlue;

  const darkTheme = useMemo(() => {
    if (!hasGrey) return null;
    return createBrandTheme(themeB, 'dark');
  }, [hasGrey]);

  return (
    <Box sx={{ maxWidth: 700 }}>
      <Typography variant="h4" sx={{ mb: 0.5 }}>Pill tabs — Background contexts</Typography>
      <Typography variant="body" color="text.muted" sx={{ display: 'block', mb: 4 }}>
        Pill tabs using the white tab style on brand-coloured surfaces.
      </Typography>
      {hasClear && (
        <BgRow bgcolor="background.brandClear" bgLabel="background.brandClear" />
      )}
      {hasGrey && (
        <BgRow bgcolor="background.brandGrey" bgLabel="background.brandGrey" />
      )}
      {hasLightBlue && (
        <BgRow bgcolor="background.brandLightBlue" bgLabel="background.brandLightBlue" />
      )}

      {hasGrey && darkTheme && (
        <ThemeProvider theme={darkTheme}>
          <Typography variant="h4" sx={{ mb: 0.5, mt: 6 }}>Pill tabs — Dark mode</Typography>
          <Typography variant="body" color="text.muted" sx={{ display: 'block', mb: 4 }}>
            QSuper brand surfaces in dark mode.
          </Typography>
          <BgRow bgcolor="background.brandGrey" bgLabel="background.brandGrey (dark)" />
          <BgRow bgcolor="background.brandLightBlue" bgLabel="background.brandLightBlue (dark)" />

        </ThemeProvider>
      )}
    </Box>
  );
}

export const Backgrounds: Story = {
  name: 'Background contexts',
  render: () => <BackgroundsDoc />,
};

