import type { Meta, StoryObj } from '@storybook/react';
import type React from 'react';
import { Alert } from '../../components/Alert';
import { Button } from '../../components/Button';
import { Icon } from '../../components/Icon';

const FA_ICONS = [
  'arrow-down-to-line',
  'arrow-left',
  'arrow-left-arrow-right',
  'arrow-right',
  'arrow-up-right',
  'chevron-down',
  'chevron-left',
  'chevron-right',
  'chevron-up',
  'circle-info',
  'house',
  'plus',
  'xmark',
] as const;

const ICON_OPTIONS = ['(default)', ...FA_ICONS] as const;

const ICON_MAPPING: Record<string, React.ReactNode | undefined> = {
  '(default)': undefined,
  ...Object.fromEntries(FA_ICONS.map(name => [name, <Icon key={name} icon={name} size="lg" />])),
};

type AlertStoryArgs = React.ComponentProps<typeof Alert> & {
  showIcon: boolean;
  actionType: 'none' | 'close' | 'custom';
  actionLabel: string;
};

const meta: Meta<AlertStoryArgs> = {
  title: 'Components / Alert',
  component: Alert,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    severity: { control: 'select', options: ['error', 'warning', 'info', 'success'] },
    message: { control: 'text' },
    title: { control: 'text' },
    variant: { control: 'select', options: ['standard', 'filled', 'outlined', 'no-icon'] },
    showIcon: {
      control: 'boolean',
      description: 'Show the icon.',
    },
    icon: {
      control: 'select',
      options: ICON_OPTIONS,
      mapping: ICON_MAPPING,
      description: 'Override the severity icon. "(default)" uses the severity icon.',
      if: { arg: 'showIcon', truthy: true },
    },
    action: { table: { disable: true } },
    onClose: { table: { disable: true } },
    actionType: {
      control: 'select',
      options: ['none', 'close', 'custom'],
      description: 'Action slot. "close" shows a dismiss button; "custom" shows an action button.',
    },
    actionLabel: {
      control: 'text',
      description: 'Label for the custom action button.',
      if: { arg: 'actionType', eq: 'custom' },
    },
  },
};

export default meta;
type Story = StoryObj<AlertStoryArgs>;

export const Default: Story = {
  render: ({ showIcon, actionType, actionLabel, icon, severity, message, title, variant }) => {
    const resolvedIcon = showIcon ? ICON_MAPPING[String(icon)] : false;
    const resolvedAction = actionType === 'custom'
      ? <Button label={actionLabel || 'Refresh'} size="small" variant="soft" color={severity} />
      : undefined;
    const resolvedOnClose = actionType === 'close' ? () => {} : undefined;
    return (
      <Alert
        severity={severity}
        message={message}
        title={title}
        variant={variant}
        icon={resolvedIcon}
        action={resolvedAction}
        onClose={resolvedOnClose}
      />
    );
  },
  args: {
    severity: 'info',
    message: 'This is an informational message.',
    showIcon: true,
    icon: '(default)' as React.ReactNode,
    actionType: 'none',
    actionLabel: 'Refresh',
  },
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
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Alert severity="warning" message="This alert can be dismissed." onClose={() => {}} />
      <Alert
        severity="warning"
        title="Session expiring soon"
        message="Your session will expire in 5 minutes due to inactivity. Save any unsaved work before it times out."
        onClose={() => {}}
      />
    </div>
  ),
};

export const NoIcon: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Alert severity="error" variant="no-icon" message="Something went wrong. Please try again." />
      <Alert severity="warning" variant="no-icon" message="Your session will expire in 5 minutes." />
      <Alert severity="info" variant="no-icon" message="A new version is available." />
      <Alert severity="success" variant="no-icon" message="Your changes have been saved." />
    </div>
  ),
};

export const WithAction: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Alert
        severity="info"
        message="A new version of the app is available."
        action={<Button label="Refresh" size="small" variant="soft" color="info" />}
      />
      <Alert
        severity="info"
        title="Update available"
        message="A new version of the app is available with performance improvements and bug fixes. Refresh to apply the update."
        action={<Button label="Refresh" size="small" variant="soft" color="info" />}
      />
    </div>
  ),
};
