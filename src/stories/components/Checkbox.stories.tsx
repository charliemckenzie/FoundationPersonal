import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '../../components/Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Form Components / Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: {
    label: 'Accept terms and conditions',
    indeterminate: false,
    error: false,
  },
  argTypes: {
    label: { control: 'text' },
    color: { table: { disable: true } },
    size: { table: { disable: true } },
    checked: { table: { disable: true } },
    defaultChecked: { table: { disable: true } },
    indeterminate: { control: 'boolean' },
    error: { control: 'boolean' },
    labelPlacement: { table: { disable: true } },
    onChange: { table: { disable: true } },
    id: { table: { disable: true } },
    name: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {};

export const Checked: Story = {
  args: { label: 'Checked', checked: true },
};

export const Indeterminate: Story = {
  args: { label: 'Partially selected', indeterminate: true },
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
