import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { InvestmentMixFlow } from '../../../features/investment-mix/InvestmentMixFlow';
import { InvestmentMixProvider } from '../../../features/investment-mix/InvestmentMixContext';
import type { InvestmentMixChange, InvestmentOption } from '../../../features/investment-mix/types';
import { MOCK_INVESTMENT_OPTIONS } from '../../../features/investment-mix/mockData';
import { Alert } from '../../../components/Alert';

const meta: Meta<typeof InvestmentMixFlow> = {
  title: 'Features / Investment Mix',
  component: InvestmentMixFlow,
  parameters: {
    layout: 'fullscreen',
    nextjs: { appDirectory: true },
  },
};

export default meta;
type Story = StoryObj<typeof InvestmentMixFlow>;

// Mock data sets

/**
 * New member / new account - no existing allocation.
 * The allocation step shows only the "Allocate:" input column.
 */
const FRESH_OPTIONS: InvestmentOption[] = MOCK_INVESTMENT_OPTIONS.map((o) => ({
  ...o,
  currentAllocation: 0,
}));

/**
 * Existing income account - currently split across two options.
 * The allocation step shows a "Current:" column alongside the new "Allocate:" inputs.
 */
const INCOME_EXISTING_OPTIONS: InvestmentOption[] = MOCK_INVESTMENT_OPTIONS.map((o) => ({
  ...o,
  currentAllocation: o.id === 'opt-high-growth' ? 60 : o.id === 'opt-conservative' ? 40 : 0,
}));

// Story harness

/**
 * Renders the switching mechanism only - no breadcrumb, no intro, no review page.
 * Mimics being embedded inside a host journey. Shows a success banner when the
 * member completes the flow to confirm the data contract.
 */
type FeatureHarnessProps = Omit<React.ComponentProps<typeof InvestmentMixFlow>, 'embedded' | 'skipIntro' | 'onComplete' | 'onBack'>;

function FeatureHarness(props: FeatureHarnessProps) {
  const [result, setResult] = useState<InvestmentMixChange | null>(null);
  return (
    <InvestmentMixProvider>
      <Box sx={{ maxWidth: '48rem', mx: 'auto', p: 3 }}>
        <Stack spacing={3}>
          {result && (
            <Alert
              severity="success"
              title="Change submitted"
              message={`Allocation change for ${result.accountName} received by the host.`}
            />
          )}
          <InvestmentMixFlow
            {...props}
            embedded
            skipIntro
            onComplete={(change) => setResult(change)}
            onBack={() => {}}
          />
        </Stack>
      </Box>
    </InvestmentMixProvider>
  );
}

// Stories

/**
 * Member opening a new accumulation account - no existing allocation.
 * Only the "Allocate:" column appears.
 * Steps: Allocate mix -> Rebalancing (once 2+ options chosen).
 */
export const NewAccumulation: Story = {
  name: 'New - Accumulation',
  render: () => (
    <FeatureHarness
      overviewPath="/member-online/investments"
      accountFilter="accum"
      mockOptions={FRESH_OPTIONS}
    />
  ),
};

/**
 * Existing accumulation member changing their mix.
 * The "Current:" column shows their existing allocation alongside the new "Allocate:" inputs.
 * Steps: Allocate mix -> Rebalancing (once 2+ options chosen).
 */
export const ExistingAccumulation: Story = {
  name: 'Existing - Accumulation',
  render: () => (
    <FeatureHarness
      overviewPath="/member-online/investments"
      accountFilter="accum"
      mockOptions={MOCK_INVESTMENT_OPTIONS}
    />
  ),
};

/**
 * Member opening a new income account - no existing allocation.
 * Only the "Allocate:" column appears.
 * Steps: Allocate mix -> Rebalancing -> Payment preferences (once 2+ options chosen).
 */
export const NewIncome: Story = {
  name: 'New - Income',
  render: () => (
    <FeatureHarness
      overviewPath="/member-online/investments"
      accountFilter="income"
      mockOptions={FRESH_OPTIONS}
    />
  ),
};

/**
 * Existing income member changing their mix - currently split across High Growth (60%)
 * and Conservative (40%). The "Current:" column shows what they are moving away from.
 * Steps: Allocate mix -> Rebalancing -> Payment preferences (once 2+ options chosen).
 */
export const ExistingIncome: Story = {
  name: 'Existing - Income',
  render: () => (
    <FeatureHarness
      overviewPath="/member-online/investments"
      accountFilter="income"
      mockOptions={INCOME_EXISTING_OPTIONS}
    />
  ),
};