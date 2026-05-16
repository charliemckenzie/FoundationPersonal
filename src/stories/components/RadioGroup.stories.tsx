import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup } from '../../components/RadioGroup';

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

export const ErrorStates: Story = {
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
  args: { legend: 'Size', options: SIZE_OPTIONS, disabled: true, defaultValue: 'sm' },
};

export const WithDescription: Story = {
  args: { legend: 'Size', options: SIZE_OPTIONS_WITH_DESCRIPTION, defaultValue: 'sm' },
};

export const Boxed: Story = {
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
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 360 }}>
      <div>
        <p style={{ fontSize: '0.75rem', fontWeight: 600, margin: '0 0 8px' }}>Without description</p>
        <RadioGroup legend="Contact preference" options={CONTACT_OPTIONS} variant="card" cardDirection="left" defaultValue="savings" />
      </div>
      <div>
        <p style={{ fontSize: '0.75rem', fontWeight: 600, margin: '0 0 8px' }}>With description</p>
        <RadioGroup legend="Contact preference" options={CONTACT_OPTIONS_WITH_DESCRIPTION} variant="card" cardDirection="left" defaultValue="savings" />
      </div>
    </div>
  ),
};
