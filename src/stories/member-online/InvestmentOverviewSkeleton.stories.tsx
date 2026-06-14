import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Box from '@mui/material/Box';
import { InvestmentOverviewSkeleton } from '../../components/InvestmentOverview';

const meta: Meta<typeof InvestmentOverviewSkeleton> = {
  title: 'Member Online / Investments / Investment Overview Skeleton',
  component: InvestmentOverviewSkeleton,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: '32rem' }}>
        <Story />
      </Box>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof InvestmentOverviewSkeleton>;

export const Default: Story = {};
