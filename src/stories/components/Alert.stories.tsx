import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from '../../components/Alert';
import { Button } from '../../components/Button';

const meta: Meta<typeof Alert> = {
  title: 'Components / Alert',
  component: Alert,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    severity: { control: 'select', options: ['error', 'warning', 'info', 'success'] },
    variant: { control: 'select', options: ['standard', 'filled', 'outlined', 'no-icon'] },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  args: { severity: 'info', message: 'This is an informational message.' },
};

export const Severities: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Alert severity="error" message="Something went wrong. Please try again." />
      <Alert severity="warning" message="Your session will expire in 5 minutes." />
      <Alert severity="info" message="A new version is available." />
      <Alert severity="success" message="Your changes have been saved." />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Alert severity="info" variant="standard" message="Standard variant." />
      <Alert severity="info" variant="filled" message="Filled variant." />
      <Alert severity="info" variant="outlined" message="Outlined variant." />
    </div>
  ),
};

export const WithTitle: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Alert severity="error" title="Error" message="The form could not be submitted. Check the fields below." />
      <Alert severity="success" title="Saved" message="Your profile has been updated successfully." />
    </div>
  ),
};

export const Closable: Story = {
  args: { severity: 'warning', message: 'This alert can be dismissed.', onClose: () => {} },
};

export const WithAction: Story = {
  args: {
    severity: 'info',
    message: 'A new version of the app is available.',
    action: <Button label="Refresh" size="small" variant="ghost" color="info" />,
  },
};
