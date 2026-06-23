import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { DigitalIDV, initialIDVState, type IDVState } from '../../../features/idv';

const meta: Meta<typeof DigitalIDV> = {
  title: 'Form Components / IDV / DigitalIDV',
  component: DigitalIDV,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'The Equifax IDMatrix identity-verification form. Reusable across flows via `@/features/idv`.\n\n' +
          'Render it two ways:\n' +
          '- **On a page** — `embedded={false}` (default) shows the "Proof of identity" page heading and a bordered card with a left-aligned Submit.\n' +
          '- **In a dialog** — `embedded` suppresses the page heading, drops the card border, and right-aligns Submit.\n\n' +
          'It is fully controlled: pass `state` + `onChange`, and wire `onSubmit`/`loading`/`error` (see the `useIdvGate` hook).',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DigitalIDV>;

interface HarnessProps {
  embedded?: boolean;
  loading?: boolean;
  error?: string;
}

function DigitalIDVHarness({ embedded = false, loading = false, error = '' }: HarnessProps) {
  const [state, setState] = useState<IDVState>(() => initialIDVState());

  return (
    <Box sx={{ maxWidth: '40rem', mx: 'auto' }}>
      <DigitalIDV
        state={state}
        onChange={setState}
        onSubmit={() => {}}
        loading={loading}
        error={error}
        embedded={embedded}
      />
    </Box>
  );
}

/** Default embedded view — no page heading, open card. */
export const Default: Story = {
  render: () => <DigitalIDVHarness embedded />,
};
