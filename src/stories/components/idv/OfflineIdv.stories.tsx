import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { OfflineIdv, initialOtherIdState } from '../../../components/idv';
import type { OtherIdState } from '../../../components/idv';

const meta: Meta<typeof OfflineIdv> = {
  title: 'Form Components / IDV / OfflineIdv',
  component: OfflineIdv,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Offline identity verification — lets a member supply a **Selfie ID**, **Certified ID**, or declare they will provide documents later.\n\n' +
          'Lives in `@/components/idv` alongside the digital IDV form. Used in the Lifetime Pension "Other options" branch.\n\n' +
          '- **Selfie ID** — images only (JPG/PNG), rejects PDF per factsheet requirement.\n' +
          '- **Certified ID** — images + PDF.\n' +
          '- **Provide later** — confirmation checkbox; application cannot be processed until documents are received.\n\n' +
          'Fully controlled: pass `state` + `onChange`. Wire `showValidation` from the containing stepped form.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof OfflineIdv>;

function Harness() {
  const [state, setState] = useState<OtherIdState>({ ...initialOtherIdState });
  return (
    <Box sx={{ maxWidth: '40rem', mx: 'auto' }}>
      <OfflineIdv state={state} onChange={setState} showValidation={false} />
    </Box>
  );
}

export const Default: Story = {
  render: () => <Harness />,
};
