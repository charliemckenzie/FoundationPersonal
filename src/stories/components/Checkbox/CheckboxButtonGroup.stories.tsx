import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { CheckboxButtonGroup } from '../../../components/Checkbox/CheckboxButtonGroup';

const meta: Meta<typeof CheckboxButtonGroup> = {
  title: 'Form Components / Checkbox / CheckboxButtonGroup',
  component: CheckboxButtonGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { exclude: ['defaultValue', 'value', 'onChange', 'name'] },
    docs: {
      description: {
        component: `
CheckboxButtonGroup renders a multi-select group of compact bordered buttons — no checkbox tick visible. Use for form fields where a button-style visual is preferred: interests, notification preferences, days of week.

Wraps multiple \`Checkbox\` instances with \`variant="button"\` inside a \`<fieldset>\` with a \`<legend>\`, giving the group correct screen reader semantics.
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
    errorMessage: 'Please select at least one option.',
  },
  argTypes: {
    direction: { control: 'select', options: ['row', 'column'] },
    error: { control: 'boolean' },
    errorMessage: { control: 'text', if: { arg: 'error', truthy: true } },
    legendBold: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof CheckboxButtonGroup>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Horizontal button group. The most common use case.',
      },
    },
  },
  args: {
    legend: 'Notification preferences',
    options: [
      { value: 'email', label: 'Email' },
      { value: 'sms', label: 'SMS' },
      { value: 'push', label: 'Push notifications' },
    ],
    defaultValue: ['email', 'push'],
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
    legend: 'Notification preferences',
    options: [
      { value: 'email', label: 'Email' },
      { value: 'sms', label: 'SMS' },
      { value: 'push', label: 'Push notifications' },
    ],
    error: true,
    errorMessage: 'Please select at least one notification method.',
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
    legend: 'Notification preferences',
    options: [
      { value: 'email', label: 'Email' },
      { value: 'sms', label: 'SMS' },
      { value: 'push', label: 'Push notifications' },
    ],
    defaultValue: ['email'],
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
    legend: 'Days available',
    options: [
      { value: 'mon', label: 'Mon' },
      { value: 'tue', label: 'Tue' },
      { value: 'wed', label: 'Wed' },
      { value: 'thu', label: 'Thu' },
      { value: 'fri', label: 'Fri' },
      { value: 'sat', label: 'Sat', disabled: true },
      { value: 'sun', label: 'Sun', disabled: true },
    ],
    defaultValue: ['mon', 'wed', 'fri'],
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
    legend: 'Areas of interest',
    direction: 'column',
    options: [
      { value: 'super', label: 'Superannuation' },
      { value: 'invest', label: 'Investments' },
      { value: 'insure', label: 'Insurance' },
      { value: 'retire', label: 'Retirement planning' },
    ],
    defaultValue: ['super'],
  },
};
