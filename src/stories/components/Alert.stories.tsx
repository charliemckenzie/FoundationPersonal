import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import type React from 'react';
import { Alert, SEVERITY_ICONS } from '../../components/Alert';
import type { AlertSeverity } from '../../components/Alert';
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
type IconOption = typeof ICON_OPTIONS[number];

type AlertStoryArgs = Omit<React.ComponentProps<typeof Alert>, 'icon'> & {
  showIcon: boolean;
  iconName: IconOption;
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
    showIcon: {
      control: 'boolean',
      description: 'Show an icon.',
    },
    iconName: {
      control: 'select',
      options: ICON_OPTIONS,
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
  render: ({ showIcon, iconName, actionType, actionLabel, severity, message, title }) => {
    const resolvedIcon = showIcon
      ? <Icon icon={iconName !== '(default)' ? iconName : SEVERITY_ICONS[severity as AlertSeverity]} color="inherit" size="lg" />
      : undefined;
    const resolvedAction = actionType === 'custom'
      ? <Button label={actionLabel || 'Refresh'} size="small" variant="outlined" color={severity} />
      : undefined;
    const resolvedOnClose = actionType === 'close' ? () => {} : undefined;
    return (
      <Alert
        severity={severity}
        message={message}
        title={title}
        icon={resolvedIcon}
        action={resolvedAction}
        onClose={resolvedOnClose}
      />
    );
  },
  args: {
    severity: 'info',
    message: 'This is an informational message.',
    showIcon: false,
    iconName: '(default)',
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

export const WithIcon: Story = {
  name: 'With Icon',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Alert severity="error" message="Something went wrong. Please try again." icon={<Icon icon={SEVERITY_ICONS.error} color="inherit" size="lg" />} />
      <Alert severity="warning" message="Your session will expire in 5 minutes." icon={<Icon icon={SEVERITY_ICONS.warning} color="inherit" size="lg" />} />
      <Alert severity="info" message="A new version is available." icon={<Icon icon={SEVERITY_ICONS.info} color="inherit" size="lg" />} />
      <Alert severity="success" message="Your changes have been saved." icon={<Icon icon={SEVERITY_ICONS.success} color="inherit" size="lg" />} />
    </div>
  ),
};

export const WithTitle: Story = {
  name: 'With Title',
  parameters: {
    docs: {
      description: {
        story: 'Use `title` to add a bold heading above the message. Pair with `icon` for full visual treatment.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Alert severity="error" title="Error" message="The form could not be submitted. Check the fields below." icon={<Icon icon={SEVERITY_ICONS.error} color="inherit" size="lg" />} />
      <Alert severity="warning" title="You are not eligible for this account yet" message="To open a Lifetime Pension account, you will need to be permanently retired or have left an employer on or after turning 60." icon={<Icon icon={SEVERITY_ICONS.info} color="inherit" size="lg" />} />
      <Alert severity="info" title="Update available" message="A new version of the app is available with performance improvements and bug fixes." icon={<Icon icon={SEVERITY_ICONS.info} color="inherit" size="lg" />} />
      <Alert severity="success" title="Saved" message="Your profile has been updated successfully." icon={<Icon icon={SEVERITY_ICONS.success} color="inherit" size="lg" />} />
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
        icon={<Icon icon={SEVERITY_ICONS.warning} color="inherit" size="lg" />}
        onClose={() => {}}
      />
    </div>
  ),
};

export const WithAction: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Alert
        severity="info"
        message="A new version of the app is available."
        action={<Button label="Refresh" size="small" condensed variant="outlined" color="info" />}
      />
      <Alert
        severity="info"
        title="Update available"
        message="A new version of the app is available with performance improvements and bug fixes. Refresh to apply the update."
        icon={<Icon icon={SEVERITY_ICONS.info} color="inherit" size="lg" />}
        action={<Button label="Refresh" size="small" condensed variant="outlined" color="info" />}
      />
    </div>
  ),
};
