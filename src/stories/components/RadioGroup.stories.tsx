import type { ComponentProps, ComponentType } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { RadioGroup } from '../../components/RadioGroup';

type RadioGroupArgs = ComponentProps<typeof RadioGroup> & { showHelperText: boolean; cardIcon: string; showLegend: boolean };

const SIZE_OPTIONS = [
  { value: 'xs', label: 'Extra small' },
  { value: 'sm', label: 'Small' },
  { value: 'md', label: 'Medium' },
];

const SIZE_OPTIONS_WITH_DESCRIPTION = [
  { value: 'xs', label: 'Extra small', description: 'Best for compact spaces.' },
  { value: 'sm', label: 'Small', description: 'A versatile everyday choice.' },
  { value: 'md', label: 'Medium', description: 'Our most popular size.' },
];

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

const meta: Meta<RadioGroupArgs> = {
  title: 'Form Components / RadioGroup',
  component: RadioGroup as ComponentType<RadioGroupArgs>,
  tags: ['autodocs'],
  decorators: [
    (Story, { args }) => {
      const { showHelperText, showLegend, cardIcon, ...rest } = args;
      const options = rest.variant === 'card' && cardIcon
        ? rest.options?.map(opt => ({ ...opt, icon: cardIcon }))
        : rest.options;
      return <Story args={{ ...rest, options, legend: showLegend ? rest.legend : undefined, helperText: showHelperText ? rest.helperText : undefined }} />;
    },
  ],
  parameters: {
    layout: 'centered',
    controls: { exclude: ['defaultValue', 'value', 'onChange', 'name'] },
    docs: {
      description: {
        component: `
RadioGroup renders a set of mutually exclusive options. Three variants:

- \`default\` — a standard radio list with an optional legend and helper text. Use for most single-choice selections.
- \`boxed\` — bordered rows. Use for settings or option tables where visual separation between choices improves scannability.
- \`card\` — visual tile selection. Use for product or preference pickers where icons and descriptions add meaning.

All variants support \`error\`, \`disabled\`, and \`description\` on individual options.
        `.trim(),
      },
    },
  },
  args: {
    variant: 'default',
    cardIcon: 'piggy-bank',
    showLegend: true,
    legend: 'Select an option',
    legendBold: true,
    disabled: false,
    required: false,
    error: false,
    errorMessage: 'Please select an option.',
    showHelperText: false,
    helperText: "We'll use this to send you relevant updates.",
  },
  argTypes: {
    variant: { control: 'select', options: ['default', 'boxed', 'card'] },
    cardIcon: { control: 'select', options: ['piggy-bank', 'chart-line', 'umbrella', 'star', 'heart', 'bolt', 'shield', 'house'], if: { arg: 'variant', eq: 'card' } },
    cardDirection: { if: { arg: 'variant', eq: 'card' } },
    direction: { control: 'select', options: ['column', 'row'] },
    showLegend: { control: 'boolean' },
    legend: { control: 'text', if: { arg: 'showLegend', truthy: true } },
    legendBold: { control: 'boolean', if: { arg: 'showLegend', truthy: true } },
    error: { control: 'boolean' },
    errorMessage: { control: 'text', if: { arg: 'error', truthy: true } },
    showHelperText: { control: 'boolean' },
    helperText: { control: 'text', if: { arg: 'showHelperText', truthy: true } },
    color: { table: { disable: true } },
    size: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<RadioGroupArgs>;

export const Playground: Story = {
  name: 'Playground',
  parameters: {
    docs: {
      description: {
        story: '',
      },
    },
  },
  args: {
    legend: 'Size',
    options: SIZE_OPTIONS,
    defaultValue: 'sm',
  },
};

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Standard radio group with a legend. Use for most single-choice selections where all options should be visible simultaneously.',
      },
    },
  },
  args: { legend: 'Size', options: SIZE_OPTIONS, defaultValue: 'sm' },
};

export const Row: Story = {
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Set `direction="row"` to lay options horizontally. Best for very short option sets (2–3 items) where labels are brief.',
      },
    },
  },
  args: { legend: 'Size', options: SIZE_OPTIONS, direction: 'row', defaultValue: 'sm' },
};

export const WithHelperText: Story = {
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Use `helperText` for persistent guidance below the group.',
      },
    },
  },
  args: { legend: 'T-shirt size', options: SIZE_OPTIONS, helperText: 'This cannot be changed after ordering.' },
};

export const ErrorStates: Story = {
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Set `error` when validation fails. Use `helperText` for context. Add `errorMessage` for a separate validation message displayed beneath.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>
        <p style={{ fontSize: '0.75rem', fontWeight: 600, margin: '0 0 8px' }}>Error with helper text</p>
        <RadioGroup legend="Size" options={SIZE_OPTIONS} error helperText="Please select a size." />
      </div>
      <div>
        <p style={{ fontSize: '0.75rem', fontWeight: 600, margin: '0 0 8px' }}>Error with helper text and error message</p>
        <RadioGroup legend="T-shirt size" options={SIZE_OPTIONS} error helperText="This cannot be changed after ordering." errorMessage="Please select a size." />
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Use `disabled` to disable the entire group. Set `disabled` on individual options to disable them selectively while leaving others interactive.',
      },
    },
  },
  args: { legend: 'Size', options: SIZE_OPTIONS, disabled: true, defaultValue: 'sm' },
};

export const WithDescription: Story = {
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Use `description` on individual options for secondary explanatory text below each label.',
      },
    },
  },
  args: { legend: 'Size', options: SIZE_OPTIONS_WITH_DESCRIPTION, defaultValue: 'sm' },
};

export const Boxed: Story = {
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Use `variant="boxed"` for settings-style selections where each option is a full-width bordered row. Works with or without `description`.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 320 }}>
      <div>
        <p style={{ fontSize: '0.75rem', fontWeight: 600, margin: '0 0 8px' }}>Without description</p>
        <RadioGroup legend="Size" options={SIZE_OPTIONS} variant="boxed" defaultValue="sm" />
      </div>
      <div>
        <p style={{ fontSize: '0.75rem', fontWeight: 600, margin: '0 0 8px' }}>With description</p>
        <RadioGroup legend="Size" options={SIZE_OPTIONS_WITH_DESCRIPTION} variant="boxed" defaultValue="sm" />
      </div>
    </div>
  ),
};

export const Card: Story = {
  name: 'Card - Column',
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Use `variant="card"` with `cardDirection="column"` for visual tile pickers — product selectors, preference cards, or onboarding choices. Pair with `icon` on each option for maximum visual clarity.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <p style={{ fontSize: '0.75rem', fontWeight: 600, margin: '0 0 8px' }}>Without description</p>
        <RadioGroup legend="Contact preference" options={CONTACT_OPTIONS} variant="card" direction="row" defaultValue="savings" />
      </div>
      <div>
        <p style={{ fontSize: '0.75rem', fontWeight: 600, margin: '0 0 8px' }}>With description</p>
        <RadioGroup legend="Contact preference" options={CONTACT_OPTIONS_WITH_DESCRIPTION} variant="card" direction="row" defaultValue="savings" />
      </div>
    </div>
  ),
};

export const CardLeft: Story = {
  name: 'Card - Row',
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Use `cardDirection="row"` for horizontal-layout cards arranged in a vertical list. Better than `column` when descriptions are longer or vertical space is limited.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 360 }}>
      <div>
        <p style={{ fontSize: '0.75rem', fontWeight: 600, margin: '0 0 8px' }}>Without description</p>
        <RadioGroup legend="Contact preference" options={CONTACT_OPTIONS} variant="card" cardDirection="row" defaultValue="savings" />
      </div>
      <div>
        <p style={{ fontSize: '0.75rem', fontWeight: 600, margin: '0 0 8px' }}>With description</p>
        <RadioGroup legend="Contact preference" options={CONTACT_OPTIONS_WITH_DESCRIPTION} variant="card" cardDirection="row" defaultValue="savings" />
      </div>
    </div>
  ),
};
