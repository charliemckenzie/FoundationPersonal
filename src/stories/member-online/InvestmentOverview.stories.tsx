import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Box from '@mui/material/Box';
import { InvestmentOverview } from '../../components/InvestmentOverview';
import type { InvestmentMixDial } from '../../components/InvestmentOverview';
import { MOCK_INVESTMENT_OPTIONS } from '../../features/investment-mix/mockData';

const noop = () => {};

function balanceDial(
  allocations: Record<string, number>,
  switched = '14 Jun 2025',
  rebalancing?: InvestmentMixDial['rebalancing'],
): InvestmentMixDial {
  return {
    id: 'balance',
    title: 'Current investments',
    subtitle: `Existing balance · last switched ${switched}`,
    allocations,
    editLabel: 'Edit current investments',
    onEdit: noop,
    rebalancing,
  };
}

function futureDial(allocations: Record<string, number>, set = '14 Jun 2025'): InvestmentMixDial {
  return {
    id: 'future',
    title: 'Future contributions',
    subtitle: `New money in · set ${set}`,
    allocations,
    editLabel: 'Edit future contributions investment mix',
    onEdit: noop,
  };
}

const meta: Meta<typeof InvestmentOverview> = {
  title: 'Member Online / Investments / Investment Overview',
  component: InvestmentOverview,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Account investment overview panel. Header shows the account name and total balance. The default and most common state is a single combined "Investment mix" card (most members invest their balance and future contributions the same way). Advanced members who split the two see two labelled cards — current investments and future contributions (or payments for income accounts) — each with its own edit button and dated mix. Footer offers Change mix / Change all and View history. Mirrors the ManagedList panel anatomy.',
      },
    },
  },
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: '32rem' }}>
        <Story />
      </Box>
    ),
  ],
  args: {
    options: MOCK_INVESTMENT_OPTIONS,
    balanceDate: '2026-06-14T00:00:00+10:00',
    onChangeAll: noop,
    onViewHistory: noop,
  },
};

export default meta;
type Story = StoryObj<typeof InvestmentOverview>;

/**
 * Default / base state — balance and future contributions share one mix, so the panel
 * shows a single combined "Investment mix" card with active rebalancing.
 */
export const Default: Story = {
  args: {
    accountName: 'Accumulation account',
    totalBalance: 84250,
    changeAllLabel: 'Change mix',
    dials: [
      {
        id: 'combined',
        title: 'Investment mix',
        allocations: { 'opt-balanced': 70, 'opt-high-growth': 30 },
        rebalancing: { nextDate: '2026-09-30' },
      },
    ],
  },
};

/** Combined card with rebalancing turned off — shows "No rebalancing on this mix". */
export const NoRebalancing: Story = {
  args: {
    accountName: 'Accumulation account',
    totalBalance: 84250,
    changeAllLabel: 'Change mix',
    dials: [
      {
        id: 'combined',
        title: 'Investment mix',
        allocations: { 'opt-balanced': 70, 'opt-high-growth': 30 },
        rebalancing: {},
      },
    ],
  },
};

/** Lifecycle-only account — single combined card, no rebalancing line (Lifecycle is ineligible). */
export const LifecycleOnly: Story = {
  args: {
    accountName: 'Accumulation account',
    totalBalance: 84250,
    changeAllLabel: 'Change mix',
    dials: [
      {
        id: 'combined',
        title: 'Investment mix',
        allocations: { 'opt-lifecycle': 100 },
      },
    ],
  },
};

/**
 * Advanced — current investments have drifted from the future direction (the member
 * split their balance and future contributions), so each shows as its own labelled card.
 */
export const DivergentAccumulation: Story = {
  args: {
    accountName: 'Accumulation account',
    totalBalance: 84250,
    dials: [
      balanceDial({ 'opt-balanced': 60, 'opt-high-growth': 40 }, '14 Jun 2025', { nextDate: '2026-09-30' }),
      futureDial({ 'opt-high-growth': 100 }),
    ],
  },
};

/** Advanced income account — second dial is payment/withdrawal options rather than contributions. */
export const DivergentIncome: Story = {
  args: {
    accountName: 'Retirement Income account',
    totalBalance: 880450.5,
    isIncomeAccount: true,
    dials: [
      balanceDial({ 'opt-balanced': 50, 'opt-conservative-balanced': 30, 'opt-cash': 20 }),
      {
        id: 'future',
        title: 'Payments',
        subtitle: 'Payments out · set 9 Dec 2025',
        allocations: { 'opt-cash': 100 },
        editLabel: 'Edit payment investment options',
        onEdit: noop,
      },
    ],
  },
};

/** Stress test — one dial holding ten options. */
export const ManyOptions: Story = {
  args: {
    accountName: 'Accumulation account',
    totalBalance: 214800,
    dials: [
      balanceDial({
        'opt-high-growth': 10,
        'opt-balanced': 10,
        'opt-conservative-balanced': 10,
        'opt-conservative': 10,
        'opt-balanced-risk-adjusted': 10,
        'opt-socially-conscious': 10,
        'opt-high-growth-index': 10,
        'opt-balanced-index': 10,
        'opt-aus-shares': 10,
        'opt-intl-shares-hedged': 10,
      }),
      futureDial({ 'opt-high-growth': 100 }),
    ],
  },
};
