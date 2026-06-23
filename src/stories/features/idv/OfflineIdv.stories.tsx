import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { OfflineIdv, IdDocumentsModal, initialOtherIdState } from '../../../features/idv';
import type { OtherIdState } from '../../../features/idv';

const meta: Meta<typeof OfflineIdv> = {
  title: 'Form Components / IDV / OfflineIdv',
  component: OfflineIdv,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Offline identity verification — lets a member supply a **Selfie ID**, **Certified ID**, or declare they will provide documents later.\n\n' +
          'Lives in `@/features/idv` alongside the digital IDV form. Used in the Lifetime Pension "Other options" branch.\n\n' +
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

function Harness({ initialMethod = '' as OtherIdState['method'], showValidation = false }) {
  const [state, setState] = useState<OtherIdState>({ ...initialOtherIdState, method: initialMethod });
  return (
    <Box sx={{ maxWidth: '40rem', mx: 'auto' }}>
      <OfflineIdv state={state} onChange={setState} showValidation={showValidation} />
    </Box>
  );
}

/** Default — no method selected. */
export const Default: Story = {
  render: () => <Harness />,
};

/** Selfie ID method selected. */
export const SelfieSelected: Story = {
  render: () => <Harness initialMethod="selfie" />,
};

/** Certified ID method selected. */
export const CertifiedSelected: Story = {
  render: () => <Harness initialMethod="certified" />,
};

/** "I'll provide this later" method selected. */
export const LaterSelected: Story = {
  name: "I'll provide this later",
  render: () => <Harness initialMethod="later" />,
};

/** Validation error — no method chosen. */
export const ValidationNoMethod: Story = {
  name: 'Validation — no method',
  render: () => <Harness showValidation />,
};

/** Validation error — Selfie selected but no file uploaded. */
export const ValidationNoFiles: Story = {
  name: 'Validation — selfie, no files',
  render: () => <Harness initialMethod="selfie" showValidation />,
};

/** The acceptable documents modal in isolation. */
export const DocumentsModal: Story = {
  name: 'Acceptable documents modal',
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <Box sx={{ maxWidth: '40rem', mx: 'auto' }}>
        <IdDocumentsModal open={open} onClose={() => setOpen(false)} />
      </Box>
    );
  },
};
