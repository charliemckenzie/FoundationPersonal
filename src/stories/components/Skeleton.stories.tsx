import type { Meta, StoryObj } from '@storybook/react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Skeleton } from '../../components/Skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Components / Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    variant: { control: 'select', options: ['text', 'circular', 'rectangular', 'rounded'] },
    animation: { control: 'select', options: ['pulse', 'wave', false] },
    width: { control: 'text' },
    height: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  args: { variant: 'text', width: '80%' },
};

export const Variants: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 4, alignItems: 'center', flexWrap: 'wrap' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
        <Skeleton variant="text" width="8rem" />
        <Typography variant="small" color="text.muted">text</Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
        <Skeleton variant="circular" width="3rem" height="3rem" />
        <Typography variant="small" color="text.muted">circular</Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
        <Skeleton variant="rectangular" width="8rem" height="4rem" />
        <Typography variant="small" color="text.muted">rectangular</Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
        <Skeleton variant="rounded" width="8rem" height="4rem" />
        <Typography variant="small" color="text.muted">rounded</Typography>
      </Box>
    </Box>
  ),
};

export const Animations: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {(['pulse', 'wave', false] as const).map((animation) => (
        <Box key={String(animation)}>
          <Typography variant="small" color="text.muted" sx={{ mb: 0.5 }}>
            {String(animation)}
          </Typography>
          <Skeleton variant="text" width="60%" animation={animation} />
        </Box>
      ))}
    </Box>
  ),
};

export const CardPlaceholder: Story = {
  render: () => (
    <Box sx={{ p: 2, border: 1, borderColor: 'border.default', borderRadius: 2, maxWidth: '24rem' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <Skeleton variant="circular" width="2.5rem" height="2.5rem" />
        <Box sx={{ flex: 1 }}>
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="40%" />
        </Box>
      </Box>
      <Skeleton variant="rounded" height="8rem" sx={{ mb: 2 }} />
      <Skeleton variant="text" />
      <Skeleton variant="text" />
      <Skeleton variant="text" width="80%" />
    </Box>
  ),
};
