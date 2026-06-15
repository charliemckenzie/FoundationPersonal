import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Box from '@mui/material/Box';
import { useState } from 'react';
import {
  VerifyDetailsContent,
  MOCK_USER_PROFILE,
  initialVerifyDetailsState,
  type VerifyDetailsState,
} from '../../../features/idv';

const meta: Meta<typeof VerifyDetailsContent> = {
  title: 'Form Components / IDV / VerifyDetailsContent',
  component: VerifyDetailsContent,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'The "confirm your details" gate that precedes IDV. The address must be correct or electronic verification fails, so this step is shown first.\n\n' +
          'Fields are read-only by default. Selecting **"No, update my details"** makes them editable. ' +
          'Use `verifyDetailsCanContinue(state)` to gate the Continue action, and `showValidation` to reveal the "please confirm" error once the user tries to proceed.\n\n' +
          'The consuming flow always passes the member `profile` in, so production wiring just swaps the data source.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof VerifyDetailsContent>;

function VerifyDetailsHarness({ showValidation = false }: { showValidation?: boolean }) {
  const [state, setState] = useState<VerifyDetailsState>(initialVerifyDetailsState);

  return (
    <Box sx={{ maxWidth: '40rem', mx: 'auto' }}>
      <VerifyDetailsContent
        profile={MOCK_USER_PROFILE}
        state={state}
        onChange={setState}
        showValidation={showValidation}
      />
    </Box>
  );
}

/** Default — details shown read-only, no confirmation made yet. */
export const Default: Story = {
  render: () => <VerifyDetailsHarness />,
};

/** Validation shown — user pressed Continue without confirming. */
export const WithValidation: Story = {
  render: () => <VerifyDetailsHarness showValidation />,
};
