import type { Meta, StoryObj } from '@storybook/react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Divider } from '../../components/Divider';

const meta: Meta<typeof Divider> = {
  title: 'Components / Divider',
  component: Divider,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
    variant: { control: 'select', options: ['fullWidth', 'inset', 'middle'] },
    textAlign: { control: 'select', options: ['left', 'center', 'right'] },
    flexItem: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Default: Story = {};

export const WithText: Story = {
  args: { children: 'or' },
};

export const TextAlignment: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Divider textAlign="left">Left</Divider>
      <Divider textAlign="center">Centre</Divider>
      <Divider textAlign="right">Right</Divider>
    </Box>
  ),
};

export const Variants: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {(['fullWidth', 'inset', 'middle'] as const).map((variant) => (
        <Box key={variant}>
          <Typography variant="small" color="text.muted" sx={{ mb: 1 }}>
            {variant}
          </Typography>
          <Divider variant={variant} />
        </Box>
      ))}
    </Box>
  ),
};

export const Vertical: Story = {
  render: () => (
    <Box sx={{ display: 'flex', height: '4rem', alignItems: 'center', gap: 2 }}>
      <Typography variant="body">Left</Typography>
      <Divider orientation="vertical" flexItem />
      <Typography variant="body">Right</Typography>
    </Box>
  ),
};
