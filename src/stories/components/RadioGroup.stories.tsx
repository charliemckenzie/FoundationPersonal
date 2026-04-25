import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup } from '../../components/RadioGroup';

const SIZE_OPTIONS = [
  { value: 'xs', label: 'Extra small' },
  { value: 'sm', label: 'Small' },
  { value: 'md', label: 'Medium' },
  { value: 'lg', label: 'Large', disabled: true },
];

const meta: Meta<typeof RadioGroup> = {
  title: 'Form Components / RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    direction: { control: 'select', options: ['column', 'row'] },
    color: { control: 'select', options: ['default', 'primary', 'secondary', 'error', 'warning', 'info', 'success'] },
    size: { control: 'select', options: ['small', 'medium'] },
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  args: { legend: 'Size', options: SIZE_OPTIONS, defaultValue: 'sm' },
};

export const Row: Story = {
  args: { legend: 'Size', options: SIZE_OPTIONS, direction: 'row', defaultValue: 'sm' },
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 40 }}>
      <RadioGroup legend="Primary" options={SIZE_OPTIONS.slice(0, 2)} color="primary" defaultValue="xs" />
      <RadioGroup legend="Secondary" options={SIZE_OPTIONS.slice(0, 2)} color="secondary" defaultValue="xs" />
      <RadioGroup legend="Error" options={SIZE_OPTIONS.slice(0, 2)} color="error" defaultValue="xs" />
    </div>
  ),
};

export const WithHelperText: Story = {
  args: { legend: 'T-shirt size', options: SIZE_OPTIONS, helperText: 'This cannot be changed after ordering.' },
};

export const ErrorState: Story = {
  args: { legend: 'Size', options: SIZE_OPTIONS, error: true, helperText: 'Please select a size.' },
};

export const Disabled: Story = {
  args: { legend: 'Size', options: SIZE_OPTIONS, disabled: true, defaultValue: 'sm' },
};
