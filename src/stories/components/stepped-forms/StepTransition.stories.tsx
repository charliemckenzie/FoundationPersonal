import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { StepTransition } from '../../../components/StepTransition';
import { FormProgress } from '../../../components/FormProgress';
import { StepperActions } from '../../../components/StepperActions';

const DEMO_STEPS = [
  { id: 'personal', label: 'Personal details' },
  { id: 'address',  label: 'Address' },
  { id: 'review',   label: 'Review' },
];

function Field({ label, wide }: { label: string; wide?: boolean }) {
  return (
    <Box sx={{ flex: wide ? '1 1 100%' : '1 1 calc(50% - 8px)' }}>
      <Typography variant="small" color="text.muted" sx={{ display: 'block', mb: 0.5 }}>{label}</Typography>
      <Box sx={{ height: 40, borderRadius: 1, border: '1px solid', borderColor: 'border.default', bgcolor: 'background.paper' }} />
    </Box>
  );
}

function Step1() {
  return (
    <Stack spacing={2}>
      <Typography variant="h5">Personal details</Typography>
      <Typography variant="body" color="text.muted">Enter your name and contact information.</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        <Field label="First name" />
        <Field label="Last name" />
        <Field label="Date of birth" wide />
      </Box>
    </Stack>
  );
}

function Step2() {
  return (
    <Stack spacing={2}>
      <Typography variant="h5">Your address</Typography>
      <Typography variant="body" color="text.muted">Tell us where you live so we can send correspondence to the right place.</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        <Field label="Street address" wide />
        <Field label="Suburb" />
        <Field label="State" />
        <Field label="Postcode" />
        <Field label="Country" wide />
      </Box>
    </Stack>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
      <Typography variant="small" color="text.muted">{label}</Typography>
      <Typography variant="small">{value}</Typography>
    </Box>
  );
}

function Step3() {
  return (
    <Stack spacing={2}>
      <Typography variant="h5">Review and submit</Typography>
      <Typography variant="body" color="text.muted">Check everything looks correct before you submit.</Typography>
      <Box>
        <ReviewRow label="First name"    value="Alex" />
        <ReviewRow label="Last name"     value="Taylor" />
        <ReviewRow label="Date of birth" value="12 Mar 1985" />
        <ReviewRow label="Street"        value="42 Example St" />
        <ReviewRow label="Suburb"        value="Newstead" />
        <ReviewRow label="State"         value="QLD" />
        <ReviewRow label="Postcode"      value="4006" />
        <ReviewRow label="Country"       value="Australia" />
      </Box>
      <Box sx={{ p: 2, borderRadius: 1, bgcolor: 'action.hover' }}>
        <Typography variant="small">
          By submitting you confirm the information above is correct and up to date.
        </Typography>
      </Box>
    </Stack>
  );
}

const STEP_CONTENT = [<Step1 key={0} />, <Step2 key={1} />, <Step3 key={2} />];

function Demo() {
  const [step, setStep]       = useState(0);
  const [maxStep, setMaxStep] = useState(0);

  function goNext() {
    if (step >= DEMO_STEPS.length - 1) return;
    const next = step + 1;
    setMaxStep((m) => Math.max(m, next));
    setStep(next);
  }

  function goBack() {
    if (step === 0) return;
    setStep((s) => s - 1);
  }

  return (
    <Stack spacing={4} sx={{ width: 560 }}>
      <FormProgress variant="responsive" steps={DEMO_STEPS} activeStep={step} maxStep={maxStep} />

      <StepTransition step={step}>
        {STEP_CONTENT[step]}
      </StepTransition>

      <StepperActions
        step={step + 1}
        isSubmitStep={step === DEMO_STEPS.length - 1}
        nextLabel={step === DEMO_STEPS.length - 1 ? 'Submit' : 'Next'}
        onNext={goNext}
        onBack={goBack}
        onExit={() => { setStep(0); setMaxStep(0); }}
        supportsSave={false}
      />
    </Stack>
  );
}

const meta: Meta<typeof StepTransition> = {
  title: 'Form Components / Stepped Forms / Step Transition',
  component: StepTransition,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Wraps stepped form content with a directional slide-and-fade transition and an animated height change. Old content exits (slides + fades) before new content enters. The container height smoothly follows the incoming content so elements below — such as \`StepperActions\` — slide up or down rather than jumping.

**Timing** — uses design tokens throughout:
- Exit: \`theme.transitions.duration.leavingScreen\` (195 ms) + \`easeIn\`
- Enter: \`theme.transitions.duration.enteringScreen\` (225 ms) + \`easeOut\`
- Height: matches the enter duration so the layout settles in lockstep with the incoming content

**Usage**

Just drive it with \`step\`. Direction is inferred automatically — a higher index slides forward, a lower one slides backward — so consumers only manage a single piece of state.

\`\`\`tsx
const [step, setStep] = useState(0);

<StepTransition step={step}>
  {step === 0 ? <Step1 /> : step === 1 ? <Step2 /> : <Step3 />}
</StepTransition>
\`\`\`

Pass the optional \`direction\` prop only to override the inferred direction for non-linear navigation (e.g. jumping between non-adjacent steps where index order doesn't match intent).

**Reduced motion** — respects \`prefers-reduced-motion: reduce\`. When set, content swaps instantly with no slide, fade, or height tween.

**Rapid navigation** — handled gracefully. The transition always lands on the latest \`step\`; intermediate steps are skipped if the user clicks faster than the animation duration.

**Stepped form pattern** — pair with \`FormProgress\` (progress indicator) and \`StepperActions\` (Back / Next / Submit). Together these three components form the Foundation stepped form convention.
        `.trim(),
      },
    },
  },
  argTypes: {
    step:      { control: { type: 'number', min: 0 }, description: 'Current step index — changing this triggers the transition.' },
    direction: { control: 'radio', options: ['forward', 'backward'], description: 'Optional override. Direction is inferred from step changes by default; set this only for non-linear navigation.' },
    children:  { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof StepTransition>;

/**
 * Full stepped form pattern — click Next and Back to see the slide-and-fade transition and
 * the height animation as shorter and taller steps replace each other.
 */
export const Default: Story = {
  render: () => <Demo />,
};
