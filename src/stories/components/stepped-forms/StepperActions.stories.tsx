import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { StepperActions } from '../../../components/StepperActions';

const Label = ({ first, children }: { first?: boolean; children: React.ReactNode }) => (
  <p style={{ margin: first ? '0 0 0.5rem' : '1.5rem 0 0.5rem', fontSize: '0.75rem', color: '#666', fontWeight: 600 }}>{children}</p>
);

const mockSave = () => new Promise<void>((resolve) => setTimeout(resolve, 2500));

type StepState = 'Step 1' | 'Internal step' | 'Submit step';

interface PlaygroundArgs {
  state: StepState;
  supportsSave: boolean;
  nextLabel: string;
  backLabel: string;
  cancelLabel: string;
  submitLabel: string;
}

const meta: Meta<typeof StepperActions> = {
  title: 'Form Components / Stepped Forms / StepperActions',
  component: StepperActions,
  tags: ['autodocs'],
  argTypes: {
    step:                    { table: { disable: true } },
    isSubmitStep:            { table: { disable: true } },
    exitDialogTitle:         { table: { disable: true } },
    exitDialogDescription:   { table: { disable: true } },
    exitDialogConfirmLabel:  { table: { disable: true } },
    exitDialogCancelLabel:   { table: { disable: true } },
    supportsSave:            { table: { disable: true } },
    saveLabel:               { table: { disable: true } },
    savingLabel:             { table: { disable: true } },
    savedLabel:              { table: { disable: true } },
    onBack:                  { table: { disable: true } },
    onNext:                  { table: { disable: true } },
    onExit:                  { table: { disable: true } },
    onSave:                  { table: { disable: true } },
    sx:                      { table: { disable: true } },
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Navigation controls for stepped forms. Sits below the form content.

- **Back** is hidden on step 1 and shown on all subsequent steps.
- **Next** carries a trailing arrow icon on all steps except the final submit step.
- **Cancel and exit** opens an alert dialog asking for confirmation before exiting.
- When \`supportsSave\` is true, a **Save and exit** button replaces Cancel and exit, showing a loading state then a success confirmation.
- A divider sits above the actions with 32px of space between them.
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof StepperActions>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: StoryObj<PlaygroundArgs> = {
  name: 'Playground',
  parameters: {
    docs: { description: { story: '' } },
  },
  argTypes: {
    state: {
      name: 'Step state',
      control: 'select',
      options: ['Step 1', 'Internal step', 'Submit step'] satisfies StepState[],
    },
    supportsSave: {
      name: 'Supports save',
      control: 'boolean',
      table: { disable: false },
    },
    nextLabel: {
      name: 'Next label',
      control: 'text',
      if: { arg: 'state', neq: 'Submit step' },
    },
    backLabel: {
      name: 'Back label',
      control: 'text',
      if: { arg: 'state', neq: 'Step 1' },
    },
    submitLabel: {
      name: 'Submit label',
      control: 'text',
      if: { arg: 'state', eq: 'Submit step' },
    },
    cancelLabel: { name: 'Exit label', control: 'text' },
  },
  args: {
    state: 'Internal step',
    supportsSave: false,
    nextLabel: 'Next',
    backLabel: 'Back',
    submitLabel: 'Submit',
    cancelLabel: 'Cancel and exit',
  },
  render: ({ state, supportsSave, nextLabel, backLabel, submitLabel, cancelLabel }) => (
    <StepperActions
      step={state === 'Step 1' ? 1 : 2}
      isSubmitStep={state === 'Submit step'}
      nextLabel={state === 'Submit step' ? submitLabel : nextLabel}
      backLabel={backLabel}
      cancelLabel={cancelLabel}
      supportsSave={supportsSave}
      onBack={() => {}}
      onNext={() => {}}
      onExit={() => {}}
      onSave={mockSave}
    />
  ),
};

// ─── States ───────────────────────────────────────────────────────────────────

export const States: Story = {
  name: 'States',
  parameters: {
    docs: {
      description: {
        story: 'All three states in sequence: first step (no back), mid-form, and submit step (no arrow).',
      },
    },
  },
  render: () => (
    <>
      <Label first>Step 1 — back button hidden</Label>
      <StepperActions step={1} onNext={() => {}} onExit={() => {}} />

      <Label>Step 2 — back button visible, next with arrow</Label>
      <StepperActions step={2} onBack={() => {}} onNext={() => {}} onExit={() => {}} />

      <Label>Submit step — next without arrow</Label>
      <StepperActions
        step={4}
        isSubmitStep
        nextLabel="Submit"
        onBack={() => {}}
        onNext={() => {}}
        onExit={() => {}}
      />

      <Label>Save and exit — try clicking Save and exit</Label>
      <StepperActions
        step={2}
        supportsSave
        onBack={() => {}}
        onNext={() => {}}
        onSave={mockSave}
      />
    </>
  ),
  args: {} as never,
};
