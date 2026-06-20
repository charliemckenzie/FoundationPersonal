import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Box from '@mui/material/Box';
import {
  EligibilityChecker,
  lifetimePensionConfig,
  type Answers,
} from '../../../features/eligibility-checker';

const meta: Meta<typeof EligibilityChecker> = {
  title: 'Features / EligibilityChecker',
  component: EligibilityChecker,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A compact, config-driven eligibility pre-gate. One question per card view, with conditional ' +
          'follow-ups and an outcome message. Eligible answers reveal a success callout; advisory warnings ' +
          'let the member continue, while a hard "no" disables Next and shows an error.\n\n' +
          'Drive it with a single `config` prop. The stories below seed `defaultStep`/`defaultAnswers` to ' +
          'show each state — in the product the member walks through the flow from the first step.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof EligibilityChecker>;

interface HarnessProps {
  defaultStep?: number;
  defaultAnswers?: Answers;
  defaultEligible?: boolean;
}

function Harness({ defaultStep, defaultAnswers, defaultEligible }: HarnessProps) {
  return (
    <Box sx={{ maxWidth: '34rem', mx: 'auto' }}>
      <EligibilityChecker
        config={lifetimePensionConfig}
        defaultStep={defaultStep}
        defaultAnswers={defaultAnswers}
        defaultEligible={defaultEligible}
      />
    </Box>
  );
}

/** Step 1 — minimum transfer radio, unanswered. */
export const Step1Unanswered: Story = {
  render: () => <Harness />,
};

/** Step 1 — "Yes" selected → eligible, auto-advances to step 2. */
export const Step1Eligible: Story = {
  render: () => <Harness defaultAnswers={{ transfer: 'yes' }} />,
};

/** Step 1 — "No" selected → ineligible error shown. */
export const Step1Ineligible: Story = {
  render: () => <Harness defaultAnswers={{ transfer: 'no' }} />,
};

/** Step 2 — "Yes" to a tax deduction reveals the "processed?" follow-up, unanswered. */
export const Step2YesBranch: Story = {
  render: () => <Harness defaultStep={1} defaultAnswers={{ transfer: 'yes', taxDeduction: 'yes' }} />,
};

/** Step 2 — claimed but not processed → ineligible error, Next disabled. */
export const Step2YesIneligible: Story = {
  render: () => (
    <Harness
      defaultStep={1}
      defaultAnswers={{ transfer: 'yes', taxDeduction: 'yes', taxDeductionProcessed: 'no' }}
    />
  ),
};

/** Step 2 — "No" reveals the "Do you intend to?" follow-up, unanswered. */
export const Step2NoBranch: Story = {
  render: () => <Harness defaultStep={1} defaultAnswers={{ transfer: 'yes', taxDeduction: 'no' }} />,
};

/** Step 2 — intends to claim → advisory warning, but Next stays enabled. */
export const Step2Warning: Story = {
  render: () => (
    <Harness
      defaultStep={1}
      defaultAnswers={{ transfer: 'yes', taxDeduction: 'no', taxDeductionIntends: 'yes' }}
    />
  ),
};

/** Step 3 — "No" to permanent retirement reveals the "left after 60?" follow-up. */
export const Step3NoBranch: Story = {
  render: () => (
    <Harness
      defaultStep={2}
      defaultAnswers={{ transfer: 'yes', taxDeduction: 'no', taxDeductionIntends: 'no', retiredFromWork: 'no' }}
    />
  ),
};

/** Step 3 — not retired and did not leave after 60 → ineligible error, Next disabled. */
export const Step3Ineligible: Story = {
  render: () => (
    <Harness
      defaultStep={2}
      defaultAnswers={{
        transfer: 'yes',
        taxDeduction: 'no',
        taxDeductionIntends: 'no',
        retiredFromWork: 'no',
        leftEmployerAfter60: 'no',
      }}
    />
  ),
};

/** Eligible — the card transforms to the success callout. */
export const EligibleState: Story = {
  render: () => <Harness defaultEligible />,
};
