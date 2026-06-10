import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { RadioButtonGroup } from '../../../components/RadioGroup/RadioButtonGroup';

const meta: Meta<typeof RadioButtonGroup> = {
  title: 'Form Components / RadioGroup / RadioButtonGroup',
  component: RadioButtonGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { exclude: ['defaultValue', 'value', 'onChange', 'name'] },
    docs: {
      description: {
        component: `
RadioButtonGroup renders mutually exclusive options as compact bordered buttons — no radio circle visible. Use for form selections where a button-style visual is preferred over a radio list: gender, frequency, residency status.

Built on RadioGroup with \`variant="button"\` — semantics are native radio inputs inside a \`<fieldset>\`. Screen readers announce position in set (e.g. "Male, radio button, 1 of 2").
        `.trim(),
      },
    },
  },
  args: {
    legend: 'Select an option',
    legendBold: true,
    direction: 'row',
    disabled: false,
    required: false,
    error: false,
    errorMessage: 'Please select an option.',
  },
  argTypes: {
    direction: { control: 'select', options: ['column', 'row'] },
    error: { control: 'boolean' },
    errorMessage: { control: 'text', if: { arg: 'error', truthy: true } },
    legendBold: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof RadioButtonGroup>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Horizontal button group. The most common use case.',
      },
    },
  },
  args: {
    legend: 'Gender',
    options: [
      { value: 'male', label: 'Male' },
      { value: 'female', label: 'Female' },
      { value: 'other', label: 'Prefer not to say' },
    ],
    defaultValue: 'male',
  },
};

export const WithError: Story = {
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Set `error` and `errorMessage` when validation fails.',
      },
    },
  },
  args: {
    legend: 'Residency status',
    options: [
      { value: 'au', label: 'Australia' },
      { value: 'other', label: 'Outside Australia' },
    ],
    error: true,
    errorMessage: 'Please select your country of residency.',
  },
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Use `disabled` to disable the entire group. Set `disabled` on individual options to disable them selectively.',
      },
    },
  },
  args: {
    legend: 'Frequency',
    options: [
      { value: 'weekly', label: 'Weekly' },
      { value: 'fortnightly', label: 'Fortnightly' },
      { value: 'monthly', label: 'Monthly' },
    ],
    defaultValue: 'monthly',
    disabled: true,
  },
};

export const WithDisabledOption: Story = {
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Set `disabled` on individual options to disable them selectively.',
      },
    },
  },
  args: {
    legend: 'Frequency',
    options: [
      { value: 'weekly', label: 'Weekly' },
      { value: 'fortnightly', label: 'Fortnightly' },
      { value: 'monthly', label: 'Monthly', disabled: true },
    ],
    defaultValue: 'weekly',
  },
};

export const Vertical: Story = {
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Use `direction="column"` when labels are long or a vertical layout suits the form better.',
      },
    },
  },
  args: {
    legend: 'Employment status',
    direction: 'column',
    options: [
      { value: 'employed', label: 'Employed full-time' },
      { value: 'part-time', label: 'Employed part-time' },
      { value: 'self-employed', label: 'Self-employed' },
      { value: 'unemployed', label: 'Not currently employed' },
    ],
    defaultValue: 'employed',
  },
};
