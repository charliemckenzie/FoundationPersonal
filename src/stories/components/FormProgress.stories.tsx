import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FormProgress } from '../../components/FormProgress';
import type { SteppedFormProgressProps } from '../../components/FormProgress';

const meta: Meta<typeof FormProgress> = {
  title: 'Form Components / FormProgress',
  component: FormProgress,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof FormProgress>;

// ─── Simple variant ───────────────────────────────────────────────────────────

export const Simple: Story = {
  args: {
    variant: 'simple',
    value: 65,
    'aria-label': 'Form progress',
  },
};

export const SimpleAtStart: Story = {
  args: { variant: 'simple', value: 0, 'aria-label': 'Form progress' },
};

export const SimpleComplete: Story = {
  args: { variant: 'simple', value: 100, 'aria-label': 'Form progress' },
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

export const SteppedStart: Story = {
  name: 'Stepped — Step 1',
  args: {
    variant: 'stepped',
    steps: FIVE_STEPS,
    activeStep: 0,
  },
};

export const SteppedProgress: Story = {
  name: 'Stepped — Progress',
  args: {
    variant: 'stepped',
    steps: FIVE_STEPS,
    activeStep: 1,
  },
};

export const SteppedMovingBack: Story = {
  name: 'Stepped — Moving back',
  args: {
    variant: 'stepped',
    steps: FIVE_STEPS,
    activeStep: 1,
    maxStep: 2,
  },
};

export const SteppedWithLabels: Story = {
  name: 'Stepped — With labels',
  args: {
    variant: 'stepped',
    steps: FIVE_STEPS_LABELLED,
    activeStep: 1,
    maxStep: 2,
  },
};

export const SteppedClickable: Story = {
  name: 'Stepped — Clickable markers',
  render: (args) => {
    const [activeStep, setActiveStep] = React.useState(2);
    return (
      <FormProgress
        {...args}
        activeStep={activeStep}
        maxStep={Math.max(activeStep, (args as SteppedFormProgressProps).maxStep ?? 2)}
        onStepClick={setActiveStep}
      />
    );
  },
  args: {
    variant: 'stepped',
    steps: FIVE_STEPS_LABELLED,
    activeStep: 2,
    maxStep: 3,
  },
};
