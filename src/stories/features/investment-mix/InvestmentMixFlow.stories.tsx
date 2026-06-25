import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { InvestmentMixFlow } from '../../../features/investment-mix/InvestmentMixFlow';
import { InvestmentMixProvider } from '../../../features/investment-mix/InvestmentMixContext';
import type { InvestmentMixChange } from '../../../features/investment-mix/types';
import { Alert } from '../../../components/Alert';

const meta: Meta<typeof InvestmentMixFlow> = {
  title: 'Features / Investment Mix',
  component: InvestmentMixFlow,
  parameters: {
    layout: 'fullscreen',
    // The flow reads useSearchParams() and calls history.pushState — it needs the
    // App Router mock that @storybook/nextjs-vite provides.
    nextjs: { appDirectory: true },
    docs: {
      description: {
        component:
          'A multi-step flow for changing where a member’s super is invested. One entry component, ' +
          '`InvestmentMixFlow`, serves every consumer — an ART standalone switch, a QSuper standalone ' +
          'switch, and an embedded step inside the Retirement Income Account application. The differences ' +
          'are props, not forks.\n\n' +
          'Each story below renders the **live** flow with one consumer’s props. Click through the steps ' +
          'to experience it, then switch stories to compare variants.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof InvestmentMixFlow>;

/** Standalone variants own the page chrome (breadcrumb + container) themselves. */
function StandaloneHarness(props: React.ComponentProps<typeof InvestmentMixFlow>) {
  return (
    <InvestmentMixProvider>
      <InvestmentMixFlow {...props} />
    </InvestmentMixProvider>
  );
}

/**
 * Embedded mode has no chrome of its own, so the harness supplies a host frame and
 * shows the returned `InvestmentMixChange` — proving the data contract: the feature
 * hands its result back to its host instead of leaking it through storage.
 */
function EmbeddedHarness(props: Omit<React.ComponentProps<typeof InvestmentMixFlow>, 'onComplete' | 'onBack'>) {
  const [result, setResult] = useState<InvestmentMixChange | null>(null);
  return (
    <InvestmentMixProvider>
      <Box sx={{ maxWidth: '48rem', mx: 'auto', p: 3 }}>
        <Stack spacing={3}>
          {result && (
            <Alert
              severity="success"
              title="Host received the result"
              message={`onComplete returned a change for ${result.accountName} (${Object.keys(result.allocations).length} option(s)).`}
            />
          )}
          <InvestmentMixFlow
            {...props}
            onComplete={(change) => setResult(change)}
            onBack={() => {}}
          />
        </Stack>
      </Box>
    </InvestmentMixProvider>
  );
}

/** ART standalone switch — full intro, account select, and review. The default journey. */
export const Standalone: Story = {
  render: () => (
    <StandaloneHarness overviewPath="/member-online/investments" accountFilter="all" />
  ),
};

/** QSuper standalone switch — identical flow, `brandName="QSuper"` changes the brand wording. */
export const StandaloneQSuper: Story = {
  render: () => (
    <StandaloneHarness
      overviewPath="/qsuper/member-online/investments"
      accountFilter="all"
      brandName="QSuper"
    />
  ),
};

/**
 * Embedded inside the Retirement Income Account application: no breadcrumb, no page
 * title, no intro. Starts at allocations and returns its result via `onComplete`.
 */
export const EmbeddedInNewAccount: Story = {
  render: () => (
    <EmbeddedHarness
      overviewPath="/member-online/retirement-income-account"
      accountFilter="income"
      embedded
      skipIntro
    />
  ),
};

/** Accumulation account — `accountFilter="accum"` includes the Lifecycle Investment Strategy option. */
export const AccumulationAccount: Story = {
  render: () => (
    <StandaloneHarness overviewPath="/member-online/investments" accountFilter="accum" />
  ),
};
