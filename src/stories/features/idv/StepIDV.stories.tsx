import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { StepIDV, initialIDVState, type IDVDocument, type IDVState } from '../../../features/idv';

const meta: Meta<typeof StepIDV> = {
  title: 'Form Components / IDV / StepIDV',
  component: StepIDV,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'The Equifax IDMatrix identity-verification form. Reusable across flows via `@/features/idv`.\n\n' +
          'Render it two ways:\n' +
          '- **On a page** — `embedded={false}` (default) shows the "Proof of identity" page heading and a bordered card with a left-aligned Submit.\n' +
          '- **In a dialog** — `embedded` suppresses the page heading, drops the card border, and right-aligns Submit. Prefer the [IdvModal](/?path=/story/form-components-idv-idvmodal--dialog) wrapper for the dialog case.\n\n' +
          'It is fully controlled: pass `state` + `onChange`, and wire `onSubmit`/`loading`/`error` (see the `useIdvGate` hook).',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof StepIDV>;

interface HarnessProps {
  initialDocument?: IDVDocument;
  embedded?: boolean;
  loading?: boolean;
  error?: string;
}

function StepIDVHarness({ initialDocument = '', embedded = false, loading = false, error = '' }: HarnessProps) {
  const [state, setState] = useState<IDVState>(() => ({
    ...initialIDVState(),
    selectedDocument: initialDocument,
  }));

  return (
    <Box sx={{ maxWidth: '40rem', mx: 'auto' }}>
      <StepIDV
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

/** Default page view — no document selected yet. */
export const Page: Story = {
  render: () => <StepIDVHarness />,
};

/** Embedded view (no page heading, open card) — how it renders inside a Modal. */
export const Embedded: Story = {
  render: () => <StepIDVHarness embedded />,
};

export const DriversLicenceSelected: Story = {
  render: () => <StepIDVHarness initialDocument="drivers-licence" />,
};

export const MedicareSelected: Story = {
  render: () => <StepIDVHarness initialDocument="medicare" />,
};

export const PassportSelected: Story = {
  render: () => <StepIDVHarness initialDocument="passport" />,
};

/** Submitting state — Submit shows its loading spinner. */
export const Loading: Story = {
  render: () => <StepIDVHarness initialDocument="passport" loading />,
};

/** Error state — a failed verification surfaces an inline Alert above Submit. */
export const ErrorState: Story = {
  render: () => (
    <StepIDVHarness
      initialDocument="passport"
      error="We could not verify your identity. Please check your details and try again."
    />
  ),
};
