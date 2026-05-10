import type { Meta, StoryObj } from '@storybook/react';
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
  parameters: { layout: 'centered' },
  args: {
    error: false,
    required: false,
    disabled: false,
    fullWidth: false,
    native: false,
  },
  argTypes: {
    size: { table: { disable: true } },
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

export const Default: Story = {
  args: { label: 'Fruit', options: FRUIT_OPTIONS, placeholder: 'Select a fruit' },
  decorators: [(Story) => <div style={{ width: 240 }}><Story /></div>],
};

export const WithLabels: Story = {
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
  args: { label: 'Fruit', options: FRUIT_OPTIONS, placeholder: 'Select a fruit', helperText: 'Pick your favourite.' },
  decorators: [(Story) => <div style={{ width: 240 }}><Story /></div>],
};

export const ErrorState: Story = {
  args: { label: 'Fruit', options: FRUIT_OPTIONS, placeholder: 'Select a fruit', error: true, helperText: 'Please select an option.' },
  decorators: [(Story) => <div style={{ width: 240 }}><Story /></div>],
};

export const ErrorWithHelperText: Story = {
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
  args: { label: 'Fruit', options: FRUIT_OPTIONS, placeholder: 'Select a fruit', required: true },
  decorators: [(Story) => <div style={{ width: 240 }}><Story /></div>],
};

export const Disabled: Story = {
  args: { label: 'Fruit', options: FRUIT_OPTIONS, disabled: true, defaultValue: 'apple' },
  decorators: [(Story) => <div style={{ width: 240 }}><Story /></div>],
};

export const Native: Story = {
  args: { label: 'Fruit', options: FRUIT_OPTIONS, placeholder: 'Select a fruit', native: true },
  decorators: [(Story) => <div style={{ width: 240 }}><Story /></div>],
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
};

export const NativeStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 240 }}>
      <Select label="Default" options={FRUIT_OPTIONS} placeholder="Select a fruit" native />
      <Select label="With value" options={FRUIT_OPTIONS} defaultValue="apple" native />
      <Select label="Error" options={FRUIT_OPTIONS} placeholder="Select a fruit" native error helperText="Please select an option." />
      <Select label="Disabled" options={FRUIT_OPTIONS} native disabled defaultValue="banana" />
    </div>
  ),
};
