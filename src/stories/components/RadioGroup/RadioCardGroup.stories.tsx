import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { RadioCardGroup } from '../../../components/RadioGroup/RadioCardGroup';

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

const meta: Meta<typeof RadioCardGroup> = {
  title: 'Form Components / RadioGroup / RadioCardGroup',
  component: RadioCardGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { exclude: ['defaultValue', 'value', 'onChange', 'name'] },
    docs: {
      description: {
        component: `
RadioCardGroup renders mutually exclusive options as visual tile cards. Use for product selectors, preference pickers, and onboarding choices where icons and descriptions add meaning.

Built on RadioGroup with \`variant="card"\` — semantics are native radio inputs inside a \`<fieldset>\`.
        `.trim(),
      },
    },
  },
  args: {
    legend: 'Select an account type',
    legendBold: true,
    direction: 'row',
    cardDirection: 'column',
    disabled: false,
    required: false,
    error: false,
    errorMessage: 'Please select an option.',
  },
  argTypes: {
    direction: { control: 'select', options: ['column', 'row'] },
    cardDirection: { control: 'select', options: ['column', 'row'] },
    error: { control: 'boolean' },
    errorMessage: { control: 'text', if: { arg: 'error', truthy: true } },
    legendBold: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof RadioCardGroup>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Cards with icons, laid out horizontally. Default `cardDirection="column"` stacks the icon above the label.',
      },
    },
  },
  args: { options: CONTACT_OPTIONS, defaultValue: 'savings' },
};

export const WithDescription: Story = {
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Add `description` to each option for secondary text below the label.',
      },
    },
  },
  args: { options: CONTACT_OPTIONS_WITH_DESCRIPTION, defaultValue: 'savings' },
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
        <RadioCardGroup legend="Account type" options={CONTACT_OPTIONS} cardDirection="row" defaultValue="savings" />
      </div>
      <div>
        <p style={{ fontSize: '0.75rem', fontWeight: 600, margin: '0 0 8px' }}>With description</p>
        <RadioCardGroup legend="Account type" options={CONTACT_OPTIONS_WITH_DESCRIPTION} cardDirection="row" defaultValue="savings" />
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
  args: { options: CONTACT_OPTIONS, error: true, errorMessage: 'Please select an account type.' },
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Use `disabled` to disable the entire group. Set `disabled` on individual options to disable them selectively.',
      },
    },
  },
  args: { options: CONTACT_OPTIONS, defaultValue: 'savings', disabled: true },
};
