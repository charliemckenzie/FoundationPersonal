import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Select } from '../../components/Select';

const FRUIT_OPTIONS = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'durian', label: 'Durian', disabled: true },
];

const meta: Meta<typeof Select> = {
  title: 'Form Components / Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Select renders a dropdown for choosing from a fixed list of options.

On mobile (below \`sm\`) the custom variant opens a bottom drawer automatically — no additional configuration needed. Use \`native\` to render the browser's native \`<select>\` element when OS-level autofill, accessibility in constrained environments, or very long option lists are the priority.

For searchable option lists, use \`Autocomplete\` instead.
        `.trim(),
      },
    },
  },
  args: {
    error: false,
    required: false,
    disabled: false,
    fullWidth: false,
    native: false,
  },
  argTypes: {
    size: { control: 'select', options: ['small', 'medium'] },
    condensed: { control: 'boolean' },
    error: { control: 'boolean' },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    native: { control: 'boolean' },
    onChange: { table: { disable: true } },
    id: { table: { disable: true } },
    name: { table: { disable: true } },
    value: { table: { disable: true } },
    defaultValue: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

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
    label: 'Label',
    options: FRUIT_OPTIONS,
    placeholder: 'Select an option',
    size: 'medium',
    condensed: false,
  },
  decorators: [(Story) => <div style={{ width: 240 }}><Story /></div>],
};

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Standard dropdown with label and placeholder.',
      },
    },
  },
  args: { label: 'Fruit', options: FRUIT_OPTIONS, placeholder: 'Select a fruit' },
  decorators: [(Story) => <div style={{ width: 240 }}><Story /></div>],
};

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: [
          'Two sizes cover the full range of layout needs.',
          '',
          '| Size | Default height | Condensed height |',
          '|------|---------------|-----------------|',
          '| Small | 40px | 36px |',
          '| Medium | 48px | 44px |',
          '',
          '**Default** — use in standard form layouts, dialogs, and standalone inputs.',
          '',
          '**Condensed** — use in dense interfaces: table toolbars, filter bars, and anywhere vertical rhythm is tight. Apply the `condensed` prop; do not substitute a smaller size tier to save space.',
          '',
          '> **iOS zoom:** Input font size is fixed at `1rem` (16px) regardless of size or condensed state. iOS Safari automatically zooms the viewport when a focused input has a font size below 16px. Do not override the input font size.',
        ].join('\n'),
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 280 }}>
      <div>
        <p style={{ margin: '0 0 12px', fontWeight: 600, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#666' }}>Default</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Select label="Small" size="small" options={FRUIT_OPTIONS} placeholder="Small field" />
          <Select label="Medium" size="medium" options={FRUIT_OPTIONS} placeholder="Medium field" />
        </div>
      </div>
      <div>
        <p style={{ margin: '0 0 12px', fontWeight: 600, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#666' }}>Condensed</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Select label="Small" size="small" condensed options={FRUIT_OPTIONS} placeholder="Small condensed" />
          <Select label="Medium" size="medium" condensed options={FRUIT_OPTIONS} placeholder="Medium condensed" />
        </div>
      </div>
    </div>
  ),
};

export const WithLabels: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Two selects with different option sets, demonstrating label alignment across a form column.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 320 }}>
      <Select label="Fruit" options={FRUIT_OPTIONS} placeholder="Select a fruit" />
      <Select
        label="Country"
        options={[
          { value: 'au', label: 'Australia' },
          { value: 'nz', label: 'New Zealand' },
          { value: 'us', label: 'United States' },
        ]}
        placeholder="Select your country"
      />
    </div>
  ),
};

export const WithHelperText: Story = {
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Use `helperText` for persistent guidance displayed beneath the field.',
      },
    },
  },
  args: { label: 'Fruit', options: FRUIT_OPTIONS, placeholder: 'Select a fruit', helperText: 'Pick your favourite.' },
  decorators: [(Story) => <div style={{ width: 240 }}><Story /></div>],
};

export const ErrorState: Story = {
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Set `error` when validation fails. Pair with `helperText` to explain what went wrong.',
      },
    },
  },
  args: { label: 'Fruit', options: FRUIT_OPTIONS, placeholder: 'Select a fruit', error: true, helperText: 'Please select an option.' },
  decorators: [(Story) => <div style={{ width: 240 }}><Story /></div>],
};

export const ErrorWithHelperText: Story = {
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Use `errorMessage` alongside `helperText` when you need both persistent context and a specific validation message on the same field.',
      },
    },
  },
  args: {
    label: 'Fruit',
    options: FRUIT_OPTIONS,
    placeholder: 'Select a fruit',
    error: true,
    helperText: 'Pick your favourite.',
    errorMessage: 'Please select an option.',
  },
  decorators: [(Story) => <div style={{ width: 240 }}><Story /></div>],
};

export const Required: Story = {
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Use `required` to mark mandatory fields.',
      },
    },
  },
  args: { label: 'Fruit', options: FRUIT_OPTIONS, placeholder: 'Select a fruit', required: true },
  decorators: [(Story) => <div style={{ width: 240 }}><Story /></div>],
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Use `disabled` when the field is not editable in the current state.',
      },
    },
  },
  args: { label: 'Fruit', options: FRUIT_OPTIONS, disabled: true, defaultValue: 'apple' },
  decorators: [(Story) => <div style={{ width: 240 }}><Story /></div>],
};

export const Native: Story = {
  parameters: {
    docs: {
      description: {
        story: [
          'Renders a native `<select>` element instead of the custom MUI dropdown. Use it when:',
          '',
          '- **Autocomplete matters** — browsers surface native selects in OS-level autofill, which the custom dropdown cannot participate in.',
          '- **Mobile form UX** — native selects trigger the platform\'s built-in picker (iOS scroll wheel, Android bottom sheet), which users expect in form contexts.',
          '- **Accessibility in constrained environments** — assistive technologies and older browsers have deeper, more reliable support for native form controls.',
          '- **Long option lists** — the OS picker handles scroll and search natively without custom implementation.',
          '',
          'Use the default (custom) variant when you need placeholder text, custom option rendering, or the mobile bottom-drawer behaviour.',
        ].join('\n'),
      },
    },
  },
  args: { label: 'Fruit', options: FRUIT_OPTIONS, placeholder: 'Select a fruit', native: true },
  decorators: [(Story) => <div style={{ width: 240 }}><Story /></div>],
};

export const NativeStates: Story = {
  parameters: {
    docs: {
      description: {
        story: 'All interaction states for the native variant — default, with a value selected, error, and disabled.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 240 }}>
      <Select label="Default" options={FRUIT_OPTIONS} placeholder="Select a fruit" native />
      <Select label="With value" options={FRUIT_OPTIONS} defaultValue="apple" native />
      <Select label="Error" options={FRUIT_OPTIONS} placeholder="Select a fruit" native error helperText="Please select an option." />
      <Select label="Disabled" options={FRUIT_OPTIONS} native disabled defaultValue="banana" />
    </div>
  ),
};
