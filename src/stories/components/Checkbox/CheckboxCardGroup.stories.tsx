import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { CheckboxCardGroup } from '../../../components/Checkbox/CheckboxCardGroup';

const CONTACT_OPTIONS = [
  { value: 'savings', label: 'Savings', icon: 'piggy-bank' },
  { value: 'investment', label: 'Investment', icon: 'chart-line' },
  { value: 'insurance', label: 'Insurance', icon: 'umbrella' },
];

const CONTACT_OPTIONS_WITH_DESCRIPTION = [
  { value: 'savings', label: 'Savings', description: 'Grow your balance', icon: 'piggy-bank' },
  { value: 'investment', label: 'Investment', description: 'Build long-term wealth', icon: 'chart-line' },
  { value: 'insurance', label: 'Insurance', description: 'Protect what matters', icon: 'umbrella' },
];

const meta: Meta<typeof CheckboxCardGroup> = {
  title: 'Form Components / Checkbox / CheckboxCardGroup',
  component: CheckboxCardGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { exclude: ['defaultValue', 'value', 'onChange', 'name'] },
    docs: {
      description: {
        component: `
CheckboxCardGroup renders a multi-select group of visual tile cards. Use for product selectors, preference pickers, and onboarding choices where icons and descriptions add meaning.

Wraps multiple \`Checkbox\` instances with \`variant="card"\` inside a \`<fieldset>\` with a \`<legend>\`, giving the group correct screen reader semantics.
        `.trim(),
      },
    },
  },
  args: {
    legend: 'Select your account types',
    legendBold: true,
    direction: 'row',
    cardDirection: 'column',
    disabled: false,
    required: false,
    error: false,
    errorMessage: 'Please select at least one option.',
  },
  argTypes: {
    direction: { control: 'select', options: ['row', 'column'] },
    cardDirection: { control: 'select', options: ['column', 'row'] },
    error: { control: 'boolean' },
    errorMessage: { control: 'text', if: { arg: 'error', truthy: true } },
    legendBold: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof CheckboxCardGroup>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Cards with icons in a horizontal row. Default `cardDirection="column"` stacks the icon above the label.',
      },
    },
  },
  args: { options: CONTACT_OPTIONS, defaultValue: ['savings'] },
};

export const WithDescription: Story = {
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Add `description` to each option for secondary text below the label.',
      },
    },
  },
  args: { options: CONTACT_OPTIONS_WITH_DESCRIPTION, defaultValue: ['savings'] },
};

export const CardDirectionRow: Story = {
  name: 'Card Direction — Row',
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Use `cardDirection="row"` to place the icon left of the label. Better when descriptions are longer or vertical space is limited.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 360 }}>
      <div>
        <p style={{ fontSize: '0.75rem', fontWeight: 600, margin: '0 0 8px' }}>Without description</p>
        <CheckboxCardGroup legend="Account types" options={CONTACT_OPTIONS} cardDirection="row" direction="column" defaultValue={['savings']} />
      </div>
      <div>
        <p style={{ fontSize: '0.75rem', fontWeight: 600, margin: '0 0 8px' }}>With description</p>
        <CheckboxCardGroup legend="Account types" options={CONTACT_OPTIONS_WITH_DESCRIPTION} cardDirection="row" direction="column" defaultValue={['savings']} />
      </div>
    </div>
  ),
};

export const WithError: Story = {
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Set `error` and `errorMessage` when validation fails.',
      },
    },
  },
  args: { options: CONTACT_OPTIONS, error: true, errorMessage: 'Please select at least one account type.' },
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Use `disabled` to disable the entire group. Set `disabled` on individual options to disable them selectively.',
      },
    },
  },
  args: { options: CONTACT_OPTIONS, defaultValue: ['savings'], disabled: true },
};
