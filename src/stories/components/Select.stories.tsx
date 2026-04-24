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
  argTypes: {
    size: { control: 'select', options: ['small', 'medium'] },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: { label: 'Fruit', options: FRUIT_OPTIONS },
  decorators: [(Story) => <div style={{ width: 240 }}><Story /></div>],
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 240 }}>
      <Select label="Small" options={FRUIT_OPTIONS} size="small" />
      <Select label="Medium" options={FRUIT_OPTIONS} size="medium" />
    </div>
  ),
};

export const WithHelperText: Story = {
  args: { label: 'Fruit', options: FRUIT_OPTIONS, helperText: 'Pick your favourite.' },
  decorators: [(Story) => <div style={{ width: 240 }}><Story /></div>],
};

export const ErrorState: Story = {
  args: { label: 'Fruit', options: FRUIT_OPTIONS, error: true, helperText: 'Please select an option.' },
  decorators: [(Story) => <div style={{ width: 240 }}><Story /></div>],
};

export const Required: Story = {
  args: { label: 'Fruit', options: FRUIT_OPTIONS, required: true },
  decorators: [(Story) => <div style={{ width: 240 }}><Story /></div>],
};

export const Disabled: Story = {
  args: { label: 'Fruit', options: FRUIT_OPTIONS, disabled: true, defaultValue: 'apple' },
  decorators: [(Story) => <div style={{ width: 240 }}><Story /></div>],
};
