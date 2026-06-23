import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { OfflineIdv as VerifyOtherOptions, IdDocumentsModal, initialOtherIdState } from '../../../features/idv';
import type { OtherIdState } from '../../../features/idv';

const meta: Meta = {
  title: 'Features / Lifetime Pension / Verify Other Options',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'The "Other options" identity verification branch for the Lifetime Pension flow. ' +
          'Lets the member upload a Selfie ID, upload a Certified ID, or declare they will provide documents later.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

function Harness({ showValidation = false }: { showValidation?: boolean }) {
  const [state, setState] = useState<OtherIdState>(initialOtherIdState);
  return (
    <Box sx={{ maxWidth: '42rem', mx: 'auto' }}>
      <VerifyOtherOptions state={state} onChange={setState} showValidation={showValidation} />
      <Box sx={{ mt: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1 }}>
        <pre style={{ margin: 0, fontSize: '0.75rem' }}>
          {JSON.stringify({ method: state.method, fileCount: state.files.length, laterConfirmed: state.laterConfirmed }, null, 2)}
        </pre>
      </Box>
    </Box>
  );
}

export const NoMethodSelected: Story = {
  name: 'No method selected',
  render: () => <Harness />,
};

export const SelfieSelected: Story = {
  name: 'Selfie ID selected',
  render: () => {
    const [state, setState] = useState<OtherIdState>({ ...initialOtherIdState, method: 'selfie' });
    return (
      <Box sx={{ maxWidth: '42rem', mx: 'auto' }}>
        <VerifyOtherOptions state={state} onChange={setState} showValidation={false} />
      </Box>
    );
  },
};

export const CertifiedSelected: Story = {
  name: 'Certified ID selected',
  render: () => {
    const [state, setState] = useState<OtherIdState>({ ...initialOtherIdState, method: 'certified' });
    return (
      <Box sx={{ maxWidth: '42rem', mx: 'auto' }}>
        <VerifyOtherOptions state={state} onChange={setState} showValidation={false} />
      </Box>
    );
  },
};

export const LaterSelected: Story = {
  name: "I'll provide this later",
  render: () => {
    const [state, setState] = useState<OtherIdState>({ ...initialOtherIdState, method: 'later' });
    return (
      <Box sx={{ maxWidth: '42rem', mx: 'auto' }}>
        <VerifyOtherOptions state={state} onChange={setState} showValidation={false} />
      </Box>
    );
  },
};

export const ValidationError: Story = {
  name: 'Validation error (no method chosen)',
  render: () => <Harness showValidation />,
};

export const ValidationErrorNoFiles: Story = {
  name: 'Validation error (selfie, no files uploaded)',
  render: () => {
    const [state, setState] = useState<OtherIdState>({ ...initialOtherIdState, method: 'selfie' });
    return (
      <Box sx={{ maxWidth: '42rem', mx: 'auto' }}>
        <VerifyOtherOptions state={state} onChange={setState} showValidation />
      </Box>
    );
  },
};

export const ModalOpen: Story = {
  name: 'Acceptable documents modal',
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <Box sx={{ maxWidth: '42rem', mx: 'auto' }}>
        <IdDocumentsModal open={open} onClose={() => setOpen(false)} />
      </Box>
    );
  },
};
