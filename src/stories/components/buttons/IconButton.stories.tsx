import type { Meta, StoryObj } from '@storybook/react';
import Box from '@mui/material/Box';
import { IconButton } from '../../../components/IconButton';

const meta: Meta<typeof IconButton> = {
  title: 'Components / Buttons / IconButton',
  component: IconButton,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    variant: { control: 'select', options: ['contained', 'outlined', 'ghost', 'soft'] },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    color: { control: 'select', options: ['default', 'primary', 'secondary', 'error', 'warning', 'info', 'success'] },
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
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <IconButton icon="pen" label="Edit (contained)" variant="contained" color="primary" />
      <IconButton icon="pen" label="Edit (outlined)" variant="outlined" color="primary" />
      <IconButton icon="pen" label="Edit (ghost)" variant="ghost" color="primary" />
      <IconButton icon="pen" label="Edit (soft)" variant="soft" color="primary" />
    </div>
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
          <IconButton icon="pen" label="Small" size="small" color="primary" />
          <IconButton icon="pen" label="Medium" size="medium" color="primary" />
          <IconButton icon="pen" label="Large" size="large" color="primary" />
        </Box>
      </Box>
      <Box>
        <Box sx={{ mb: 1.5, typography: 'overline', color: 'text.secondary', letterSpacing: 1 }}>Condensed</Box>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <IconButton icon="pen" label="Small condensed" size="small" color="primary" condensed />
          <IconButton icon="pen" label="Medium condensed" size="medium" color="primary" condensed />
          <IconButton icon="pen" label="Large condensed" size="large" color="primary" condensed />
        </Box>
      </Box>
    </Box>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <div style={{ marginBottom: 8, fontWeight: 600 }}>Contained</div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <IconButton icon="pen" label="Primary" variant="contained" color="primary" />
          <IconButton icon="magnifying-glass" label="Secondary" variant="contained" color="secondary" />
          <IconButton icon="circle-info" label="Info" variant="contained" color="info" />
          <IconButton icon="triangle-exclamation" label="Warning" variant="contained" color="warning" />
          <IconButton icon="trash" label="Error" variant="contained" color="error" />
          <IconButton icon="check" label="Success" variant="contained" color="success" />
        </div>
      </div>
      <div>
        <div style={{ marginBottom: 8, fontWeight: 600 }}>Soft</div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <IconButton icon="pen" label="Primary" variant="soft" color="primary" />
          <IconButton icon="magnifying-glass" label="Secondary" variant="soft" color="secondary" />
          <IconButton icon="circle-info" label="Info" variant="soft" color="info" />
          <IconButton icon="triangle-exclamation" label="Warning" variant="soft" color="warning" />
          <IconButton icon="trash" label="Error" variant="soft" color="error" />
          <IconButton icon="check" label="Success" variant="soft" color="success" />
        </div>
      </div>
      <div>
        <div style={{ marginBottom: 8, fontWeight: 600 }}>Ghost</div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <IconButton icon="pen" label="Primary" variant="ghost" color="primary" />
          <IconButton icon="magnifying-glass" label="Secondary" variant="ghost" color="secondary" />
          <IconButton icon="circle-info" label="Info" variant="ghost" color="info" />
          <IconButton icon="triangle-exclamation" label="Warning" variant="ghost" color="warning" />
          <IconButton icon="trash" label="Error" variant="ghost" color="error" />
          <IconButton icon="check" label="Success" variant="ghost" color="success" />
        </div>
      </div>
      <div>
        <div style={{ marginBottom: 8, fontWeight: 600 }}>Outlined</div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <IconButton icon="pen" label="Primary" variant="outlined" color="primary" />
          <IconButton icon="magnifying-glass" label="Secondary" variant="outlined" color="secondary" />
          <IconButton icon="circle-info" label="Info" variant="outlined" color="info" />
          <IconButton icon="triangle-exclamation" label="Warning" variant="outlined" color="warning" />
          <IconButton icon="trash" label="Error" variant="outlined" color="error" />
          <IconButton icon="check" label="Success" variant="outlined" color="success" />
        </div>
      </div>
    </div>
  ),
};

export const CommonlyUsedIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <IconButton icon="info" label="Information" variant="soft" color="primary" />
      <IconButton icon="chevron-left" label="Previous" variant="soft" color="primary" />
      <IconButton icon="chevron-right" label="Next" variant="soft" color="primary" />
      <IconButton icon="pen" label="Edit" variant="soft" color="primary" />
      <IconButton icon="trash" label="Delete" variant="soft" color="primary" />
    </div>
  ),
};

export const Disabled: Story = {
  args: { icon: 'pen', label: 'Edit (disabled)', disabled: true, color: 'primary' },
};

export const Loading: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <div style={{ marginBottom: 8, fontWeight: 600 }}>Contained</div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <IconButton icon="pen" label="Primary" variant="contained" color="primary" loading />
          <IconButton icon="magnifying-glass" label="Secondary" variant="contained" color="secondary" loading />
          <IconButton icon="circle-info" label="Info" variant="contained" color="info" loading />
          <IconButton icon="triangle-exclamation" label="Warning" variant="contained" color="warning" loading />
          <IconButton icon="trash" label="Error" variant="contained" color="error" loading />
          <IconButton icon="check" label="Success" variant="contained" color="success" loading />
        </div>
      </div>
      <div>
        <div style={{ marginBottom: 8, fontWeight: 600 }}>Soft</div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <IconButton icon="pen" label="Primary" variant="soft" color="primary" loading />
          <IconButton icon="magnifying-glass" label="Secondary" variant="soft" color="secondary" loading />
          <IconButton icon="circle-info" label="Info" variant="soft" color="info" loading />
          <IconButton icon="triangle-exclamation" label="Warning" variant="soft" color="warning" loading />
          <IconButton icon="trash" label="Error" variant="soft" color="error" loading />
          <IconButton icon="check" label="Success" variant="soft" color="success" loading />
        </div>
      </div>
      <div>
        <div style={{ marginBottom: 8, fontWeight: 600 }}>Ghost</div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <IconButton icon="pen" label="Primary" variant="ghost" color="primary" loading />
          <IconButton icon="magnifying-glass" label="Secondary" variant="ghost" color="secondary" loading />
          <IconButton icon="circle-info" label="Info" variant="ghost" color="info" loading />
          <IconButton icon="triangle-exclamation" label="Warning" variant="ghost" color="warning" loading />
          <IconButton icon="trash" label="Error" variant="ghost" color="error" loading />
          <IconButton icon="check" label="Success" variant="ghost" color="success" loading />
        </div>
      </div>
      <div>
        <div style={{ marginBottom: 8, fontWeight: 600 }}>Outlined</div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <IconButton icon="pen" label="Primary" variant="outlined" color="primary" loading />
          <IconButton icon="magnifying-glass" label="Secondary" variant="outlined" color="secondary" loading />
          <IconButton icon="circle-info" label="Info" variant="outlined" color="info" loading />
          <IconButton icon="triangle-exclamation" label="Warning" variant="outlined" color="warning" loading />
          <IconButton icon="trash" label="Error" variant="outlined" color="error" loading />
          <IconButton icon="check" label="Success" variant="outlined" color="success" loading />
        </div>
      </div>
    </div>
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
          <IconButton icon="magnifying-glass" label="Soft" variant="soft" reversed />
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
          <IconButton icon="magnifying-glass" label="Soft" variant="soft" reversed disabled />
          <IconButton icon="circle-info" label="Outlined" variant="outlined" reversed disabled />
          <IconButton icon="trash" label="Ghost" variant="ghost" reversed disabled />
        </Box>
      </Box>
      <Box>
        <Box sx={{ mb: 1, fontWeight: 600, color: 'common.white' }}>Loading</Box>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <IconButton icon="pen" label="Contained" variant="contained" reversed loading />
          <IconButton icon="magnifying-glass" label="Soft" variant="soft" reversed loading />
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
