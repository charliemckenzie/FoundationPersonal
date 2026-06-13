import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Box from '@mui/material/Box';
import { CurrentMixSummary } from '../../features/investment-mix/CurrentMixSummary';
import { MOCK_INVESTMENT_OPTIONS, currentMixForAccount } from '../../features/investment-mix/mockData';

const meta: Meta<typeof CurrentMixSummary> = {
  title: 'Member Online / Investments / Current Mix Summary',
  component: CurrentMixSummary,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          "Visualises an account's current investment mix: a stacked allocation bar with a text legend, each option separated by a subtle divider. Segment colours come from the brand's investment-allocation palette. The bar is decorative (role=\"img\"); the legend carries the accessible detail. Used inside each account card on the Manage your investments page.",
      },
    },
  },
  args: {
    options: MOCK_INVESTMENT_OPTIONS,
  },
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: '32rem' }}>
        <Story />
      </Box>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CurrentMixSummary>;

/** Two-option mix (Accumulation account). */
export const TwoOptions: Story = {
  args: {
    allocations: currentMixForAccount('acc-001'),
  },
};

/** Three-option mix (Retirement Income account). */
export const ThreeOptions: Story = {
  args: {
    allocations: currentMixForAccount('acc-002'),
  },
};

/** No mix on record — supporting message instead of the bar. */
export const NoMix: Story = {
  args: {
    allocations: {},
  },
};
