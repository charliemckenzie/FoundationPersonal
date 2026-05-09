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
  parameters: {
    layout: 'centered',
    controls: { exclude: ['defaultValue', 'value', 'onChange', 'name'] },
  },
  args: {
    legendBold: true,
  },
  argTypes: {
    direction: { control: 'select', options: ['column', 'row'] },
    legendBold: { control: 'boolean' },
    color: { table: { disable: true } },
    size: { table: { disable: true } },
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

export const WithHelperText: Story = {
  args: { legend: 'T-shirt size', options: SIZE_OPTIONS, helperText: 'This cannot be changed after ordering.' },
};

export const ErrorState: Story = {
  args: { legend: 'Size', options: SIZE_OPTIONS, error: true, helperText: 'Please select a size.' },
};

export const Disabled: Story = {
  args: { legend: 'Size', options: SIZE_OPTIONS, disabled: true, defaultValue: 'sm' },
};
