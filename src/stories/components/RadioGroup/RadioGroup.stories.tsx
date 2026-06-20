import type { ComponentProps, ComponentType } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { RadioGroup } from '../../../components/RadioGroup';

type RadioGroupArgs = ComponentProps<typeof RadioGroup> & { showHelperText: boolean; showLegend: boolean };

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

const meta: Meta<RadioGroupArgs> = {
  title: 'Form Components / RadioGroup / RadioGroup',
  component: RadioGroup as ComponentType<RadioGroupArgs>,
  tags: ['autodocs'],
  decorators: [
    (Story, { args }) => {
      const { showHelperText, showLegend, ...rest } = args;
      return <Story args={{ ...rest, legend: showLegend ? rest.legend : undefined, helperText: showHelperText ? rest.helperText : undefined }} />;
    },
  ],
  parameters: {
    layout: 'centered',
    controls: { exclude: ['defaultValue', 'value', 'onChange', 'name'] },
    docs: {
      description: {
        component: `
RadioGroup renders a set of mutually exclusive options. Two variants:

- \`default\` — a standard radio list with an optional legend and helper text. Use for most single-choice selections.
- \`boxed\` — bordered rows. Use for settings or option tables where visual separation between choices improves scannability.

For card tile layouts use **RadioCardGroup**. For compact button-style selections use **RadioButtonGroup**.

All variants support \`error\`, \`disabled\`, and \`description\` on individual options.
        `.trim(),
      },
    },
  },
  args: {
    variant: 'default',
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
    variant: { control: 'select', options: ['default', 'boxed'] },
    direction: { control: 'select', options: ['column', 'row'] },
    showLegend: { control: 'boolean' },
    legend: { control: 'text', if: { arg: 'showLegend', truthy: true } },
    legendBold: { control: 'boolean', if: { arg: 'showLegend', truthy: true } },
    error: { control: 'boolean' },
    errorMessage: { control: 'text', if: { arg: 'error', truthy: true } },
    showHelperText: { control: 'boolean' },
    helperText: { control: 'text', if: { arg: 'showHelperText', truthy: true } },
    helperTextPosition: { control: 'inline-radio', options: ['top', 'bottom'], if: { arg: 'showHelperText', truthy: true } },
    color: { table: { disable: true } },
    size: { table: { disable: true } },
    cardDirection: { table: { disable: true } },
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
  args: { legend: 'T-shirt size', options: SIZE_OPTIONS, helperText: 'This cannot be changed after ordering.', showHelperText: true },
};

export const HelperTextTop: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '**Usage guidance:** Set `helperTextPosition="top"` to render the helper text between the legend and the options. ' +
          'Use it for descriptive guidance the member should read *before* answering — e.g. defining a term used in the question. ' +
          'The helper text stays linked to the group via `aria-describedby` in both positions.',
      },
    },
  },
  args: {
    legend: 'Have you permanently retired from work?',
    showHelperText: true,
    helperText: (
      <>
        This means you were in paid employment for at least 10 hours a week and now you do not intend to work 10 or more
        hours in any given future week.
      </>
    ),
    helperTextPosition: 'top',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
    ],
    direction: 'row',
  },
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
