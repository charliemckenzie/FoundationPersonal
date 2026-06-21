import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Tabs } from '../../components/Tabs';
import type { TabSize, TabStyle } from '../../components/Tabs';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// ─── Shared fixtures ──────────────────────────────────────────────────────────

const placeholder = (name: string) => (
  <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1, border: '1px dashed', borderColor: 'divider' }}>
    <Typography variant="body" color="text.muted">{name} — placeholder content</Typography>
  </Box>
);

const SAMPLE_TABS = [
  { label: 'Overview', content: placeholder('Tab one') },
  { label: 'Transactions', content: placeholder('Tab two') },
  { label: 'Documents', content: placeholder('Tab three') },
];

const SHORT_TABS = [
  { label: 'Tab one' },
  { label: 'Tab two' },
  { label: 'Tab three' },
];

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof Tabs> = {
  title: 'Components / Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Tabs let users switch between related views without leaving the page.

**Three styles:**
- \`default\` — pill-shaped soft-fill tabs on a light or white background. The default for most use cases.
- \`white\` — same pill shape, optimised for brand-coloured or dark backgrounds where the blue tint would disappear.
- \`segmented\` — a sliding pill control inside a tinted track. Use for binary or small-count switches (2–4 options) where the choice feels like a mode selector rather than navigation.

**Three sizes:** \`small\`, \`medium\` (default), \`large\`. Choose based on the surrounding context — e.g. \`small\` inside a dense card, \`large\` as a primary page-level control.
        `.trim(),
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'] satisfies TabSize[],
      description: 'Controls height, font size, and horizontal padding.',
    },
    tabStyle: {
      control: 'select',
      options: ['default', 'white', 'segmented'] satisfies TabStyle[],
      description: '`default` — soft-fill pills on white. `white` — for coloured backgrounds. `segmented` — sliding pill control.',
    },
    defaultTab: {
      control: 'number',
      description: 'Zero-based index of the initially selected tab.',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Segmented only — stretches the control to fill its container.',
      if: { arg: 'tabStyle', eq: 'segmented' },
    },
    reversed: {
      control: 'boolean',
      description: 'Flip all styles to white-based for placement on dark or brand-coloured backgrounds.',
    },
    label: {
      control: 'text',
      description: 'Accessible label for the tablist — read by screen readers. Make it descriptive.',
    },
    tabs: { table: { disable: true } },
    onChange: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    label: 'Example tabs',
    size: 'medium',
    tabStyle: 'default',
    defaultTab: 0,
    tabs: SAMPLE_TABS,
  },
};

// ─── Default style ────────────────────────────────────────────────────────────

export const DefaultStyle: Story = {
  name: 'Default',
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Use on white or light grey backgrounds. The soft primary-tinted fill keeps inactive tabs visually present without competing with the active state. Avoid placing on coloured surfaces — use `white` instead.',
      },
    },
  },
  render: () => (
    <Tabs label="Default tabs" tabs={SAMPLE_TABS} />
  ),
};

// ─── Sizes ────────────────────────────────────────────────────────────────────

interface SizeRowProps {
  size: TabSize;
}

function SizeRow({ size }: SizeRowProps) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, mb: 3 }}>
      <Box sx={{ flex: 1 }}>
        <Tabs label={`${size} tabs`} tabs={SHORT_TABS} size={size} />
      </Box>
      <Typography variant="small" color="text.muted" sx={{ textTransform: 'capitalize', minWidth: 56 }}>{size}</Typography>
    </Box>
  );
}

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Match tab size to the density of the surrounding layout. `medium` is right for most page-level contexts.',
      },
    },
  },
  render: () => (
    <Box sx={{ maxWidth: 600 }}>
      <SizeRow size="small"  />
      <SizeRow size="medium" />
      <SizeRow size="large"  />
    </Box>
  ),
};

// ─── Segmented ────────────────────────────────────────────────────────────────

const SEGMENTED_TABS = [
  { label: 'Monthly', content: placeholder('Monthly view') },
  { label: 'Yearly', content: placeholder('Yearly view') },
  { label: 'All time', content: placeholder('All time view') },
];

export const SegmentedDefault: Story = {
  name: 'Segmented',
  parameters: {
    docs: {
      description: {
        story: `**Usage guidance:** Use for compact mode-selectors with 2–4 options — e.g. chart period pickers, view toggles. The sliding pill reinforces that the choice is a mode, not navigation. Keep labels short; long labels break the equal-width layout. Avoid for more than 4 options — use \`default\` tabs instead.`,
      },
    },
  },
  render: () => (
    <>
      <Typography variant="small" color="text.muted" sx={{ display: 'block', mb: 1 }}>Medium (default)</Typography>
      <Tabs label="Period selector" tabs={SEGMENTED_TABS} tabStyle="segmented" size="medium" />
      <Typography variant="small" color="text.muted" sx={{ display: 'block', mt: 3, mb: 1 }}>Small</Typography>
      <Tabs label="Period selector small" tabs={SEGMENTED_TABS} tabStyle="segmented" size="small" />
      <Typography variant="small" color="text.muted" sx={{ display: 'block', mt: 3, mb: 1 }}>Full width</Typography>
      <Tabs label="Period selector full width" tabs={SEGMENTED_TABS} tabStyle="segmented" size="medium" fullWidth />
    </>
  ),
};

// ─── Reversed ────────────────────────────────────────────────────────────────

export const Reversed: Story = {
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Use `reversed` on dark or brand-coloured backgrounds. Works on all three styles — `default`, `white`, and `segmented`. Inactive tabs become white-tinted, the active state becomes a solid white element with primary-coloured text.',
      },
    },
  },
  render: () => (
    <Box sx={{ bgcolor: 'background.brandSecondary', borderRadius: 2, p: 3, display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Box>
        <Typography variant="small" sx={{ display: 'block', mb: 1, color: 'common.white', opacity: 0.7 }}>Default — reversed</Typography>
        <Tabs label="Reversed default" tabs={SHORT_TABS} reversed />
      </Box>
      <Box>
        <Typography variant="small" sx={{ display: 'block', mb: 1, color: 'common.white', opacity: 0.7 }}>Segmented — reversed</Typography>
        <Tabs label="Reversed segmented" tabs={SEGMENTED_TABS} tabStyle="segmented" reversed />
      </Box>
      <Box>
        <Typography variant="small" sx={{ display: 'block', mb: 1, color: 'common.white', opacity: 0.7 }}>Segmented full width — reversed</Typography>
        <Tabs label="Reversed segmented full width" tabs={SEGMENTED_TABS} tabStyle="segmented" reversed fullWidth />
      </Box>
    </Box>
  ),
};

