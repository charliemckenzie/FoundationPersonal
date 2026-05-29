import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Switch } from '../../components/Switch';

const meta: Meta<typeof Switch> = {
  title: 'Form Components / Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    color: { control: 'select', options: ['default', 'primary', 'secondary', 'error', 'warning', 'info', 'success'] },
    size: { control: 'select', options: ['small', 'medium'] },
    labelPlacement: { control: 'select', options: ['end', 'start', 'top', 'bottom'] },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: { label: 'Enable notifications' },
};

export const Checked: Story = {
  args: { label: 'Enabled', checked: true },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Switch label="Small" size="small" defaultChecked />
      <Switch label="Medium" size="medium" defaultChecked />
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Switch label="Primary" color="primary" defaultChecked />
      <Switch label="Secondary" color="secondary" defaultChecked />
      <Switch label="Error" color="error" defaultChecked />
      <Switch label="Success" color="success" defaultChecked />
    </div>
  ),
};

export const WithHelperText: Story = {
  args: { label: 'Dark mode', helperText: 'Applies immediately across the app.' },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Switch label="Disabled off" disabled />
      <Switch label="Disabled on" disabled defaultChecked />
    </div>
  ),
};
