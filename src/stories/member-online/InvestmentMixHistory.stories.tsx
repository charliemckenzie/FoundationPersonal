import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { InvestmentMixHistory } from '../../features/investment-mix/InvestmentMixHistory';

const meta: Meta<typeof InvestmentMixHistory> = {
  title: 'Member Online / Investments / Investment Mix History',
  component: InvestmentMixHistory,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Per-account list of past investment switches. Reached from the "View investment mix history" link on the Change your investments page. Read-only Table: date, what the switch applied to, the resulting mix, and status (Processing / Active / Superseded). Shows an empty state for accounts with no switches.',
      },
    },
  },
  args: {
    investmentsPath: '/member-online/investments',
  },
};

export default meta;
type Story = StoryObj<typeof InvestmentMixHistory>;

/** Accumulation account — several past switches, including one still processing. */
export const WithHistory: Story = {
  args: {
    accountId: 'acc-001',
  },
};

/** Retirement Income account — an active income-balance switch and a superseded one. */
export const IncomeAccount: Story = {
  args: {
    accountId: 'acc-002',
  },
};

/** TTR account — no switches recorded yet, showing the empty state. */
export const EmptyState: Story = {
  args: {
    accountId: 'acc-003',
  },
};
