import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from '../../components/Spinner';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const meta: Meta<typeof Spinner> = {
  title: 'Components / Spinner',
  component: Spinner,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    color: { control: 'select', options: ['primary', 'secondary', 'error', 'warning', 'info', 'success', 'inherit'] },
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  args: { size: 'medium', color: 'primary' },
};

export const Sizes: Story = {
  render: () => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      {(['small', 'medium', 'large'] as const).map((size) => (
        <Box key={size} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
          <Spinner size={size} />
          <Typography variant="caption">{size}</Typography>
        </Box>
      ))}
    </Box>
  ),
};

export const Colors: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', alignItems: 'center' }}>
      {(['primary', 'secondary', 'error', 'warning', 'info', 'success'] as const).map((color) => (
        <Box key={color} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
          <Spinner color={color} />
          <Typography variant="caption">{color}</Typography>
        </Box>
      ))}
    </Box>
  ),
};

export const WithLabel: Story = {
  args: { size: 'medium', label: 'Loading data…' },
};
