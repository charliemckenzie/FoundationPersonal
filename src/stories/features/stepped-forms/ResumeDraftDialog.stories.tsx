import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Alert } from '../../../components/Alert';
import { Button } from '../../../components/Button';
import { ResumeDraftDialog } from '../../../lib/ResumeDraftDialog';

const meta: Meta<typeof ResumeDraftDialog> = {
  title: 'Form Components / Stepped Forms / Resume Dialog',
  component: ResumeDraftDialog,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The single resume prompt shown by **every** stepped form that saves progress.\n\n' +
          "Foundation's save/resume UX policy is *identical everywhere*: any form that persists progress shows this same dialog on return — same layout, buttons, and timing. Only the **noun** differs, so the wording stays natural to each flow (an *application*, a *projection*, …) while the interaction is consistent.\n\n" +
          'Drive it with `useResumableDraft` (or `useSteppedFlow`) in `dialog` mode: render it open while a saved draft awaits a decision, and wire the hook’s accept/discard handlers to `onContinue` / `onStartFresh`.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ResumeDraftDialog>;

/** A saved draft is found on return — the member chooses to continue or start fresh. */
function ResumeDemo({ noun }: { noun: string }) {
  const [open, setOpen] = useState(true);
  const [outcome, setOutcome] = useState<string | null>(null);

  return (
    <Stack spacing={2} sx={{ alignItems: 'flex-start', maxWidth: '28rem' }}>
      {outcome ? (
        <Alert severity="info" message={outcome} />
      ) : (
        <Typography variant="body" sx={{ color: 'text.primary' }}>
          A saved {noun} was found. The resume dialog is open.
        </Typography>
      )}
      <Button label="Show the resume dialog again" variant="ghost" size="small" onClick={() => { setOutcome(null); setOpen(true); }} />
      <ResumeDraftDialog
        open={open}
        savedAt={new Date().toISOString()}
        noun={noun}
        onContinue={() => { setOpen(false); setOutcome(`Continued the saved ${noun}.`); }}
        onStartFresh={() => { setOpen(false); setOutcome(`Started a fresh ${noun}.`); }}
      />
    </Stack>
  );
}

/** Retirement Income Account / Lifetime Pension wording. */
export const Application: Story = {
  render: () => <ResumeDemo noun="application" />,
};

/** Retirement Projection wording — same dialog, task-natural noun. */
export const Projection: Story = {
  render: () => <ResumeDemo noun="projection" />,
};
