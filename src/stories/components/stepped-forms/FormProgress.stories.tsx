import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FormProgress, STEPPED_MIN_STEPS, STEPPED_MAX_STEPS, STEPPED_MAX_STEPS_LABELLED } from '../../../components/FormProgress';

const Label = ({ first, children }: { first?: boolean; children: React.ReactNode }) => (
  <p style={{ margin: first ? '0 0 0.5rem' : '1.5rem 0 0.5rem', fontSize: '0.75rem', color: '#666', fontWeight: 600 }}>{children}</p>
);

// ─── Playground types & component ────────────────────────────────────────────

type StoryVariant = 'Simple' | 'Stepped - No labels' | 'Stepped - with labels' | 'Responsive';
type IndicatorType = 'Menu indicator' | 'Static indicator';

interface PlaygroundArgs {
  storyVariant: StoryVariant;
  value: number;
  showStepIndicator: boolean;
  stepIndicatorType: IndicatorType;
  tooltipLabels: boolean;
}

const PLAYGROUND_STEPS = [
  { id: 1, label: 'Personal' },
  { id: 2, label: 'Contact' },
  { id: 3, label: 'Income' },
  { id: 4, label: 'Review' },
  { id: 5, label: 'Confirm' },
];

const PLAYGROUND_STEPS_LABELLED_4 = [
  { id: 1, label: 'Personal' },
  { id: 2, label: 'Contact' },
  { id: 3, label: 'Review' },
  { id: 4, label: 'Confirm' },
];

const PLAYGROUND_STEPS_UNLABELLED = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
];

function PlaygroundDemo({ storyVariant, value, showStepIndicator, stepIndicatorType, tooltipLabels }: PlaygroundArgs) {
  const [activeStep, setActiveStep] = React.useState(2);
  const isSteppedVariant = storyVariant === 'Stepped - No labels' || storyVariant === 'Stepped - with labels';
  const effectiveShowStepIndicator = isSteppedVariant ? false : showStepIndicator;
  const isMenu = effectiveShowStepIndicator && stepIndicatorType === 'Menu indicator';

  if (storyVariant === 'Simple') {
    return (
      <FormProgress
        variant="simple"
        value={value}
        steps={effectiveShowStepIndicator ? PLAYGROUND_STEPS : undefined}
        activeStep={effectiveShowStepIndicator ? activeStep : undefined}
        showStepIndicator={effectiveShowStepIndicator}
        stepMenu={isMenu}
        onStepClick={isMenu ? setActiveStep : undefined}
        aria-label="Form progress"
      />
    );
  }

  if (storyVariant === 'Stepped - No labels') {
    const steps = tooltipLabels ? PLAYGROUND_STEPS : PLAYGROUND_STEPS_UNLABELLED;
    return (
      <FormProgress
        variant="stepped"
        steps={steps}
        activeStep={activeStep}
        maxStep={Math.max(activeStep, 3)}
        showStepIndicator={effectiveShowStepIndicator}
        stepMenu={isMenu}
        onStepClick={isMenu ? setActiveStep : undefined}
        tooltipLabels={tooltipLabels}
      />
    );
  }

  if (storyVariant === 'Stepped - with labels') {
    return (
      <FormProgress
        variant="stepped"
        steps={PLAYGROUND_STEPS_LABELLED_4}
        activeStep={Math.min(activeStep, PLAYGROUND_STEPS_LABELLED_4.length - 1)}
        maxStep={Math.min(Math.max(activeStep, 2), PLAYGROUND_STEPS_LABELLED_4.length - 1)}
        showStepIndicator={effectiveShowStepIndicator}
        stepMenu={isMenu}
        onStepClick={isMenu ? setActiveStep : undefined}
      />
    );
  }

  // Responsive
  return (
    <FormProgress
      variant="responsive"
      steps={PLAYGROUND_STEPS}
      activeStep={activeStep}
      maxStep={Math.max(activeStep, 3)}
      showStepIndicator={effectiveShowStepIndicator}
      stepMenu={isMenu}
      onStepClick={isMenu ? setActiveStep : undefined}
    />
  );
}

const meta: Meta<typeof FormProgress> = {
  title: 'Form Components / Stepped Forms / FormProgress',
  component: FormProgress,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
FormProgress communicates where the user is in a multi-step form.

**Three variants:**
- \`simple\` — a smooth progress bar with a thumb. Use when step boundaries aren't meaningful.
- \`stepped\` — discrete step markers on a track. Use when the user benefits from seeing individual steps and navigating between them.
- \`responsive\` — stepped at ≥\`sm\`, a single active marker on a filled track below \`sm\`. Use when a stepped flow needs to work on all screen sizes.
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof FormProgress>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: StoryObj<PlaygroundArgs> = {
  name: 'Playground',
  parameters: {
    docs: {
      description: {
        story: '',
      },
    },
  },
  argTypes: {
    storyVariant: {
      name: 'Variant',
      control: 'select',
      options: ['Simple', 'Stepped - No labels', 'Stepped - with labels', 'Responsive'] satisfies StoryVariant[],
    },
    value: {
      name: 'Value',
      control: { type: 'range', min: 0, max: 100 },
      if: { arg: 'storyVariant', eq: 'Simple' },
    },
    showStepIndicator: {
      name: 'Step indicator',
      control: 'boolean',
    },
    stepIndicatorType: {
      name: 'Indicator type',
      control: 'select',
      options: ['Menu indicator', 'Static indicator'] satisfies IndicatorType[],
      if: { arg: 'showStepIndicator', eq: true },
    },
    tooltipLabels: {
      name: 'Tooltip',
      control: 'boolean',
      if: { arg: 'storyVariant', eq: 'Stepped - No labels' },
    },
  },
  args: {
    storyVariant: 'Simple',
    value: 50,
    showStepIndicator: true,
    stepIndicatorType: 'Menu indicator',
    tooltipLabels: true,
  },
  render: (args) => <PlaygroundDemo {...args} />,
};

// ─── Simple variant ───────────────────────────────────────────────────────────

export const Simple: Story = {
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Use when overall progress matters more than individual steps OR when flows have too many steps and break on smaller screens. Avoid when users need to understand where they are relative to named checkpoints.',
      },
    },
  },
  args: {
    variant: 'simple',
    value: 65,
    'aria-label': 'Form progress',
  },
};

// ─── Stepped variant ─────────────────────────────────────────────────────────

const FIVE_STEPS = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
];

const FIVE_STEPS_LABELLED = [
  { id: 1, label: 'Personal' },
  { id: 2, label: 'Contact' },
  { id: 3, label: 'Income' },
  { id: 4, label: 'Review' },
  { id: 5, label: 'Confirm' },
];

export const SteppedStates: Story = {
  name: 'Stepped — No labels',
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Use when users benefit from seeing discrete step markers but step names aren\'t needed — short flows where context is clear from the form itself. TooltipLabels are recommended as they aid orientation without permanently cluttering the UI, but are optional.',
      },
    },
  },
  render: () => (
    <>
      <Label first>Step 1 — all upcoming</Label>
      <FormProgress variant="stepped" steps={FIVE_STEPS} activeStep={0} />
      <Label>Mid-flow — steps completed behind active</Label>
      <FormProgress variant="stepped" steps={FIVE_STEPS} activeStep={2} maxStep={2} />
      <Label>Mid-flow — tooltip labels</Label>
      <FormProgress variant="stepped" steps={FIVE_STEPS_LABELLED} activeStep={2} maxStep={2} tooltipLabels />
    </>
  ),
  args: {} as never,
};

export const SteppedMovingBack: Story = {
  name: 'Stepped — Moving back',
  parameters: {
    docs: {
      description: {
        story: 'The user has moved back to an earlier step.',
      },
    },
  },
  args: {
    variant: 'stepped',
    steps: FIVE_STEPS,
    activeStep: 1,
    maxStep: 2,
  },
};

const FOUR_STEPS_LABELLED = [
  { id: 1, label: 'Personal' },
  { id: 2, label: 'Contact' },
  { id: 3, label: 'Review' },
  { id: 4, label: 'Confirm' },
];

const FIVE_STEPS_LONG_LABELS = [
  { id: 1, label: 'Personal Details' },
  { id: 2, label: 'Contact Information' },
  { id: 3, label: 'Employment & Income' },
  { id: 4, label: 'Review Your Application' },
  { id: 5, label: 'Confirm & Submit' },
];

export const SteppedWithLabels: Story = {
  name: 'Stepped — With labels',
  parameters: {
    docs: {
      description: {
        story: `**Usage guidance:** Use when step names help users understand where they are in the flow. ALWAYS test on smaller screens if you retain labels, if they don't fit switch to no labels or responsive options.`,
      },
    },
  },
  render: () => (
    <>
      <Label first>Short labels</Label>
      <FormProgress
        variant="stepped"
        steps={FIVE_STEPS_LABELLED}
        activeStep={1}
        maxStep={2}
      />
      <Label>Long labels</Label>
      <FormProgress
        variant="stepped"
        steps={FIVE_STEPS_LONG_LABELS}
        activeStep={2}
        maxStep={3}
      />
      <Label>Maximum with labels — {STEPPED_MAX_STEPS_LABELLED} steps</Label>
      <FormProgress
        variant="stepped"
        steps={FOUR_STEPS_LABELLED}
        activeStep={1}
        maxStep={2}
      />
    </>
  ),
  args: {} as never,
};

function ClickableDemo({ steps, tooltipLabels }: { steps: typeof FIVE_STEPS | typeof FIVE_STEPS_LABELLED; tooltipLabels?: boolean }) {
  const [activeStep, setActiveStep] = React.useState(2);
  return (
    <FormProgress
      variant="stepped"
      steps={steps}
      activeStep={activeStep}
      maxStep={Math.max(activeStep, 3)}
      tooltipLabels={tooltipLabels}
      onStepClick={setActiveStep}
    />
  );
}

export const SteppedClickable: Story = {
  name: 'Stepped — Clickable markers',
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Use when users may need to revisit earlier steps — for example, review-and-edit flows or multi-step forms with a summary page. Only completed and visited steps are interactive; upcoming steps cannot be jumped to.',
      },
    },
  },
  render: () => (
    <>
      <Label first>No labels</Label>
      <ClickableDemo steps={FIVE_STEPS} />
      <Label>Tooltip labels</Label>
      <ClickableDemo steps={FIVE_STEPS_LABELLED} tooltipLabels />
      <Label>Fixed labels</Label>
      <ClickableDemo steps={FIVE_STEPS_LABELLED} />
    </>
  ),
  args: {} as never,
};

export const SteppedResponsive: Story = {
  name: 'Stepped — Responsive',
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Use `variant="responsive"` when a stepped flow must work across all screen sizes. Prefer this over `stepped` when mobile is a primary concern — Below `sm` it renders a single active marker on a filled progress track. At `sm` and above it shows the full stepped markers. Resize the viewport to see the switch.',
      },
    },
  },
  render: () => (
    <>
      <Label first>No labels</Label>
      <FormProgress variant="responsive" steps={FIVE_STEPS} activeStep={2} maxStep={3} />
      <Label>Tooltip labels</Label>
      <FormProgress variant="responsive" steps={FIVE_STEPS_LABELLED} activeStep={2} maxStep={3} tooltipLabels />
      <Label>Fixed labels</Label>
      <FormProgress variant="responsive" steps={FIVE_STEPS_LABELLED} activeStep={2} maxStep={3} />
    </>
  ),
  args: {} as never,
};

// ─── Step indicator ───────────────────────────────────────────────────────────

export const StepIndicator: Story = {
  name: 'Step indicator',
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Use `showStepIndicator` when users need explicit orientation — particularly on mobile where step markers may not be visible. Use the menu variant (`stepMenu`) when users should be able to navigate freely between steps; use static when navigation is handled elsewhere or stepping back isn\'t permitted.\n\nWhen used with `variant="responsive"`, the step indicator only appears below `sm` — at `sm` and above the full stepped markers are visible and the indicator is hidden. When showing steps ALWAYS check the responsive behaviour, it\'s important to avoid overcrowding on smaller screens.\n\n**Not recommended with `variant="stepped"`** — the step markers already provide orientation, so adding a step indicator is redundant.',
      },
    },
  },
  render: () => (
    <>
      <Label first>Simple — static indicator</Label>
      <FormProgress
        variant="simple"
        value={50}
        steps={FIVE_STEPS_LABELLED}
        activeStep={2}
        showStepIndicator
        aria-label="Form progress"
      />
      <Label>Simple — menu</Label>
      <FormProgress
        variant="simple"
        value={50}
        steps={FIVE_STEPS_LABELLED}
        activeStep={2}
        showStepIndicator
        stepMenu
        onStepClick={() => {}}
        aria-label="Form progress"
      />
      <Label>Responsive — static indicator (indicator shows at &lt;sm)</Label>
      <FormProgress
        variant="responsive"
        steps={FIVE_STEPS_LABELLED}
        activeStep={2}
        maxStep={3}
        showStepIndicator
      />
      <Label>Responsive — menu (menu shows at &lt;sm)</Label>
      <FormProgress
        variant="responsive"
        steps={FIVE_STEPS_LABELLED}
        activeStep={2}
        maxStep={3}
        showStepIndicator
        stepMenu
        onStepClick={() => {}}
      />
    </>
  ),
  args: {} as never,
};
