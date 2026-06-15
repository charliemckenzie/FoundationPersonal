import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Box from '@mui/material/Box';
import { ResultsCharts } from '../../../features/retirement-projection/ResultsCharts';
import { computeProjection } from '../../../features/retirement-projection/projection';
import { INITIAL_STATE } from '../../../features/retirement-projection/constants';

const onTrack = computeProjection({
  ...INITIAL_STATE,
  currentAge: '40',
  retirementAge: '67',
  salary: '95000',
  superBalance: '150000',
  ownHome: 'yes',
  lifestyle: 'comfortable',
});

const shortfall = computeProjection({
  ...INITIAL_STATE,
  currentAge: '55',
  retirementAge: '65',
  salary: '60000',
  superBalance: '80000',
  lifestyle: 'comfortable',
});

const meta = {
  title: 'Features / Retirement Projection / ResultsCharts',
  component: ResultsCharts,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Income and capital projection charts (stacked bars + target reference line, and a stacked area view) with a keyboard- and screen-reader-accessible data table. Driven by the output of computeProjection.',
      },
    },
  },
  decorators: [(Story) => <Box sx={{ maxWidth: 720 }}><Story /></Box>],
} satisfies Meta<typeof ResultsCharts>;

export default meta;
type Story = StoryObj<typeof ResultsCharts>;

export const OnTrack: Story = {
  args: { years: onTrack.years, targetIncome: onTrack.targetIncome },
};

export const Shortfall: Story = {
  args: { years: shortfall.years, targetIncome: shortfall.targetIncome },
};
