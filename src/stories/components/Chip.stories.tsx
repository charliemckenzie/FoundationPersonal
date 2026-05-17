import type { Meta, StoryObj } from '@storybook/react';
import { Chip, type ChipProps } from '../../components/Chip';
import { Icon } from '../../components/Icon';

const ICON_OPTIONS = [
  'circle-check', 'circle-dollar', 'circle-exclamation',
  'circle-info', 'circle-minus', 'circle-plus', 'circle-question',
] as const;

const ALERT_ICON: Record<string, string> = {
  error: 'circle-exclamation',
  warning: 'circle-exclamation',
  info: 'circle-info',
  success: 'circle-check',
};

interface ChipStoryArgs extends Omit<ChipProps, 'variant'> {
  variant?: 'filled' | 'outlined' | 'alert';
  showIcon?: boolean;
  alertIcon?: boolean;
  iconName?: string;
}

const meta: Meta<ChipStoryArgs> = {
  title: 'Components / Chip',
  // ChipStoryArgs adds an 'alert' variant for the playground that maps to severity
  // colours at render time. The real ChipProps.variant is only 'filled' | 'outlined'.
  component: Chip as never,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    label: { control: 'text' },
    variant: { control: 'select', options: ['filled', 'outlined', 'alert'] },
    severity: {
      control: 'select',
      options: ['error', 'warning', 'info', 'success'],
      if: { arg: 'variant', eq: 'alert' },
    },
    alertIcon: { name: 'icon', control: 'boolean', if: { arg: 'variant', eq: 'alert' } },
    showIcon: { name: 'icon', control: 'boolean', if: { arg: 'variant', neq: 'alert' } },
    iconName: {
      name: 'icon name',
      control: 'select',
      options: ICON_OPTIONS,
      if: { arg: 'variant', neq: 'alert' },
    },
    color: { control: 'select', options: ['default', 'primary', 'white'], if: { arg: 'variant', neq: 'alert' } },
    size: { control: 'select', options: ['small', 'medium'] },
    disabled: { table: { disable: true } },
    icon: { table: { disable: true } },
    avatar: { table: { disable: true } },
    clickable: { table: { disable: true } },
    onDelete: { table: { disable: true } },
    onClick: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<ChipStoryArgs>;

export const Default: Story = {
  args: { label: 'Chip', variant: 'filled', severity: 'info', alertIcon: false, showIcon: false, iconName: 'circle-plus' },
  render: ({ showIcon, alertIcon, iconName, variant, severity, ...args }) => {
    const icon = variant === 'alert' && alertIcon && severity
      ? <Icon icon={ALERT_ICON[severity]} />
      : showIcon && iconName && variant !== 'alert'
        ? <Icon icon={iconName} />
        : undefined;
    return (
      <Chip
        {...args}
        variant={variant === 'alert' ? undefined : variant}
        severity={variant === 'alert' ? severity : undefined}
        icon={icon}
      />
    );
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <Chip label="Filled" variant="filled" color="primary" />
      <Chip label="Outlined" variant="outlined" color="primary" />
    </div>
  ),
};

export const Alert: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.5 }}>Medium</span>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Chip label="Error" severity="error" size="medium" />
          <Chip label="Warning" severity="warning" size="medium" />
          <Chip label="Info" severity="info" size="medium" />
          <Chip label="Success" severity="success" size="medium" />
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Chip label="Error" severity="error" size="medium" icon={<Icon icon="circle-exclamation" color="inherit" />} />
          <Chip label="Warning" severity="warning" size="medium" icon={<Icon icon="circle-exclamation" color="inherit" />} />
          <Chip label="Info" severity="info" size="medium" icon={<Icon icon="circle-info" color="inherit" />} />
          <Chip label="Success" severity="success" size="medium" icon={<Icon icon="circle-check" color="inherit" />} />
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.5 }}>Small</span>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Chip label="Error" severity="error" size="small" />
          <Chip label="Warning" severity="warning" size="small" />
          <Chip label="Info" severity="info" size="small" />
          <Chip label="Success" severity="success" size="small" />
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Chip label="Error" severity="error" size="small" icon={<Icon icon="circle-exclamation" color="inherit" />} />
          <Chip label="Warning" severity="warning" size="small" icon={<Icon icon="circle-exclamation" color="inherit" />} />
          <Chip label="Info" severity="info" size="small" icon={<Icon icon="circle-info" color="inherit" />} />
          <Chip label="Success" severity="success" size="small" icon={<Icon icon="circle-check" color="inherit" />} />
        </div>
      </div>
    </div>
  ),
};

export const InlineWithText: Story = {
  name: 'Inline with text',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 16 }}>Invoice #1042</span>
        <Chip label="Overdue" severity="error" size="small" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 16 }}>Deployment v2.4.1</span>
        <Chip label="In review" severity="warning" size="small" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 16 }}>Pull request #88</span>
        <Chip label="Merged" severity="success" size="small" />
      </div>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 8 }}>
        <Chip label="Default" color="default" />
        <Chip label="Primary" color="primary" />
        <Chip label="Default" color="default" variant="outlined" />
        <Chip label="Primary" color="primary" variant="outlined" />
      </div>
      <div style={{ display: 'flex', gap: 8, padding: 16, background: '#1c355e', borderRadius: 8 }}>
        <Chip label="White" color="white" />
        <Chip label="White" color="white" variant="outlined" />
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <Chip label="Small" size="small" color="primary" />
      <Chip label="Medium" size="medium" color="primary" />
    </div>
  ),
};

export const WithIcon: Story = {
  name: 'With icon',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <Chip label="Default" icon={<Icon icon="circle-plus" />} color="default" />
        <Chip label="Primary" icon={<Icon icon="circle-plus" />} color="primary" />
      </div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <Chip label="Default" size="small" icon={<Icon icon="circle-plus" />} color="default" />
        <Chip label="Primary" size="small" icon={<Icon icon="circle-plus" />} color="primary" />
      </div>
    </div>
  ),
};
