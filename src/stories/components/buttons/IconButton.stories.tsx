import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Box from '@mui/material/Box';
import { IconButton } from '../../../components/IconButton';

const meta: Meta<typeof IconButton> = {
  title: 'Components / Buttons / IconButton',
  component: IconButton,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    variant: { control: 'select', options: ['contained', 'outlined', 'ghost'] },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    iconStyle: { control: 'select', options: ['solid', 'regular', 'light', 'thin', 'duotone', 'sharp'] },
    condensed: { control: 'boolean', description: 'Reduces width and height by 4px across all sizes. Use in dense layouts where vertical space is limited.' },
    showTooltip: { control: 'boolean' },
    loading: { control: 'boolean' },
    reversed: { control: 'boolean' },
    onClick: { table: { disable: true } },
    type: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  args: { icon: 'pen', label: 'Edit' },
};

export const Variants: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      <IconButton icon="pen" label="Edit (contained)" variant="contained" />
      <IconButton icon="pen" label="Edit (outlined)" variant="outlined" />
      <IconButton icon="pen" label="Edit (ghost)" variant="ghost" />
    </Box>
  ),
};

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: [
          'Three sizes cover the full range of layout needs.',
          '',
          '| Size | Default | Condensed |',
          '|------|---------|-----------|',
          '| Small | 36×36px | 32×32px |',
          '| Medium | 48×48px | 44×44px |',
          '| Large | 56×56px | 52×52px |',
          '',
          '**Condensed** — use in dense interfaces: toolbars, mobile headers, and anywhere vertical rhythm is tight. Apply the `condensed` prop; do not drop a size tier instead.',
        ].join('\n'),
      },
    },
  },
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Box>
        <Box sx={{ mb: 1.5, typography: 'overline', color: 'text.secondary', letterSpacing: 1 }}>Default</Box>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <IconButton icon="pen" label="Small" size="small" />
          <IconButton icon="pen" label="Medium" size="medium" />
          <IconButton icon="pen" label="Large" size="large" />
        </Box>
      </Box>
      <Box>
        <Box sx={{ mb: 1.5, typography: 'overline', color: 'text.secondary', letterSpacing: 1 }}>Condensed</Box>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <IconButton icon="pen" label="Small condensed" size="small" condensed />
          <IconButton icon="pen" label="Medium condensed" size="medium" condensed />
          <IconButton icon="pen" label="Large condensed" size="large" condensed />
        </Box>
      </Box>
    </Box>
  ),
};

export const CommonlyUsedIcons: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      <IconButton icon="circle-info" label="Information" variant="outlined" />
      <IconButton icon="chevron-left" label="Previous" variant="outlined" />
      <IconButton icon="chevron-right" label="Next" variant="outlined" />
      <IconButton icon="pen" label="Edit" variant="outlined" />
      <IconButton icon="trash" label="Delete" variant="outlined" />
    </Box>
  ),
};

export const Disabled: Story = {
  args: { icon: 'pen', label: 'Edit (disabled)', disabled: true },
};

export const Loading: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      <IconButton icon="pen" label="Contained" variant="contained" loading />
      <IconButton icon="pen" label="Outlined" variant="outlined" loading />
      <IconButton icon="pen" label="Ghost" variant="ghost" loading />
    </Box>
  ),
};

function ReversedShowcase() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        p: 6,
        bgcolor: 'background.brandPrimary',
      }}
    >
      <Box>
        <Box sx={{ mb: 1, fontWeight: 600, color: 'common.white' }}>Variants</Box>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <IconButton icon="pen" label="Contained" variant="contained" reversed />
          <IconButton icon="circle-info" label="Outlined" variant="outlined" reversed />
          <IconButton icon="trash" label="Ghost" variant="ghost" reversed />
        </Box>
      </Box>
      <Box>
        <Box sx={{ mb: 1, fontWeight: 600, color: 'common.white' }}>Sizes</Box>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <IconButton icon="pen" label="Small" variant="contained" size="small" reversed />
          <IconButton icon="pen" label="Medium" variant="contained" size="medium" reversed />
          <IconButton icon="pen" label="Large" variant="contained" size="large" reversed />
        </Box>
      </Box>
      <Box>
        <Box sx={{ mb: 1, fontWeight: 600, color: 'common.white' }}>Disabled</Box>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <IconButton icon="pen" label="Contained" variant="contained" reversed disabled />
          <IconButton icon="circle-info" label="Outlined" variant="outlined" reversed disabled />
          <IconButton icon="trash" label="Ghost" variant="ghost" reversed disabled />
        </Box>
      </Box>
      <Box>
        <Box sx={{ mb: 1, fontWeight: 600, color: 'common.white' }}>Loading</Box>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <IconButton icon="pen" label="Contained" variant="contained" reversed loading />
          <IconButton icon="circle-info" label="Outlined" variant="outlined" reversed loading />
          <IconButton icon="trash" label="Ghost" variant="ghost" reversed loading />
        </Box>
      </Box>
    </Box>
  );
}

export const OnPrimaryBackground: Story = {
  name: 'Reversed — On Primary Background',
  parameters: { layout: 'fullscreen' },
  render: () => <ReversedShowcase />,
};
