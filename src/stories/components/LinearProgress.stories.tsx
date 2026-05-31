import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { LinearProgress } from '../../components/LinearProgress';

const meta: Meta<typeof LinearProgress> = {
  title: 'Atomic Components / Loading Indicators / LinearProgress',
  component: LinearProgress,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    variant: { control: 'select', options: ['determinate', 'indeterminate', 'buffer', 'query'] },
    value: { control: { type: 'range', min: 0, max: 100 } },
    label: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof LinearProgress>;

export const Default: Story = {};

export const Determinate: Story = {
  args: { variant: 'determinate', value: 65 },
};

export const StepProgress: Story = {
  render: () => (
    <Box sx={{ maxWidth: '28rem' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="small" color="text.muted">Step 3 of 5</Typography>
        <Typography variant="small" color="text.muted">60%</Typography>
      </Box>
      <LinearProgress variant="determinate" value={60} label="Form progress: step 3 of 5" />
    </Box>
  ),
};
