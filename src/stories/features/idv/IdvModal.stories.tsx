import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Alert } from '../../../components/Alert';
import { Button } from '../../../components/Button';
import { IdvModal, StepIDV, clearIDVCache, useIdvGate } from '../../../features/idv';

const meta: Meta<typeof IdvModal> = {
  title: 'Form Components / IDV / IdvModal',
  component: IdvModal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The same IDV form, usable **on a page or in a dialog**, driven by the `useIdvGate` hook.\n\n' +
          '`useIdvGate()` owns the state machine — document form state, the (mock) Equifax submit, and the shared 3-year verification cache. ' +
          'Pair it with:\n' +
          '- **`IdvModal`** for the dialog pattern — pass `gate`, `open`/`onClose`, and `onVerified`.\n' +
          '- **`StepIDV embedded={false}`** for the inline page pattern — wire `gate.idvState` / `gate.setIdvState` / `gate.submit` directly.\n\n' +
          'A successful submit calls `setIDVCache()`, so verification carries across every flow that consumes the module.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof IdvModal>;

function CacheNote() {
  return (
    <Button
      label="Reset verification cache"
      variant="ghost"
      size="small"
      onClick={() => {
        clearIDVCache();
        window.location.reload();
      }}
    />
  );
}

/** Dialog pattern — a button opens IdvModal; submitting flips the gate to verified. */
function DialogDemo() {
  const gate = useIdvGate();
  const [open, setOpen] = useState(false);
  const [verified, setVerified] = useState(gate.alreadyVerified);

  return (
    <Stack spacing={2} sx={{ alignItems: 'flex-start', maxWidth: '28rem' }}>
      {verified ? (
        <Alert severity="success" message="Identity verified — thanks!" />
      ) : (
        <Typography variant="body" sx={{ color: 'text.primary' }}>
          Verify your identity to finish setting up your account.
        </Typography>
      )}
      <Button
        label={verified ? 'Verified' : 'Verify your identity'}
        disabled={verified}
        onClick={() => setOpen(true)}
      />
      <CacheNote />
      <IdvModal
        open={open}
        onClose={() => setOpen(false)}
        gate={gate}
        onVerified={() => setVerified(true)}
      />
    </Stack>
  );
}

/** Inline page pattern — StepIDV wired to the same hook, rendered directly on the page. */
function PageDemo() {
  const gate = useIdvGate();
  const [verified, setVerified] = useState(gate.alreadyVerified);

  async function handleSubmit() {
    const success = await gate.submit();
    if (success) setVerified(true);
  }

  if (verified) {
    return (
      <Box sx={{ maxWidth: '40rem', mx: 'auto' }}>
        <Stack spacing={2} sx={{ alignItems: 'flex-start' }}>
          <Alert severity="success" message="Identity verified — thanks!" />
          <CacheNote />
        </Stack>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: '40rem', mx: 'auto' }}>
      <Stack spacing={2}>
        <StepIDV
          state={gate.idvState}
          onChange={gate.setIdvState}
          onSubmit={handleSubmit}
          loading={gate.status === 'submitting'}
          error={gate.error}
        />
        <CacheNote />
      </Stack>
    </Box>
  );
}

export const Dialog: Story = {
  render: () => <DialogDemo />,
};

export const InlinePage: Story = {
  parameters: { layout: 'padded' },
  render: () => <PageDemo />,
};
