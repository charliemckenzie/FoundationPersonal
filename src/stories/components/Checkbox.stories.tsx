import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '../../components/Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Form Components / Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    color: { control: 'select', options: ['default', 'primary', 'secondary', 'error', 'warning', 'info', 'success'] },
    size: { control: 'select', options: ['small', 'medium'] },
    labelPlacement: { control: 'select', options: ['end', 'start', 'top', 'bottom'] },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: { label: 'Accept terms and conditions' },
};

export const Checked: Story = {
  args: { label: 'Checked', checked: true },
};

export const Indeterminate: Story = {
  args: { label: 'Partially selected', indeterminate: true },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Checkbox label="Small" size="small" defaultChecked />
      <Checkbox label="Medium" size="medium" defaultChecked />
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Checkbox label="Primary" color="primary" defaultChecked />
      <Checkbox label="Secondary" color="secondary" defaultChecked />
      <Checkbox label="Error" color="error" defaultChecked />
      <Checkbox label="Success" color="success" defaultChecked />
    </div>
  ),
};

export const WithHelperText: Story = {
  args: { label: 'Subscribe to newsletter', helperText: 'We send one email per week, no spam.' },
};

export const ErrorState: Story = {
  args: { label: 'Accept terms', error: true, helperText: 'You must accept the terms to continue.' },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Checkbox label="Disabled unchecked" disabled />
      <Checkbox label="Disabled checked" disabled defaultChecked />
    </div>
  ),
};
