import type { Meta, StoryObj } from '@storybook/react';
import { Chip } from '../../components/Chip';
import { Icon } from '../../components/Icon';

const meta: Meta<typeof Chip> = {
  title: 'Components / Chip',
  component: Chip,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    variant: { control: 'select', options: ['filled', 'outlined'] },
    color: { control: 'select', options: ['default', 'primary', 'secondary', 'error', 'warning', 'info', 'success'] },
    size: { control: 'select', options: ['small', 'medium'] },
    severity: { control: 'select', options: ['error', 'warning', 'info', 'success'] },
  },
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Default: Story = {
  args: { label: 'Chip' },
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <Chip label="Error" severity="error" />
        <Chip label="Warning" severity="warning" />
        <Chip label="Info" severity="info" />
        <Chip label="Success" severity="success" />
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <Chip label="Error" severity="error" icon={<Icon icon="xmark" size="sm" color="inherit" />} />
        <Chip label="Warning" severity="warning" icon={<Icon icon="triangle-exclamation" size="sm" color="inherit" />} />
        <Chip label="Info" severity="info" icon={<Icon icon="circle-info" size="sm" color="inherit" />} />
        <Chip label="Success" severity="success" icon={<Icon icon="circle-check" size="sm" color="inherit" />} />
      </div>
    </div>
  ),
};

export const InlineWithText: Story = {
  name: 'Inline with text',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span>Invoice #1042</span>
        <Chip label="Overdue" severity="error" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span>Deployment v2.4.1</span>
        <Chip label="In review" severity="warning" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span>Pull request #88</span>
        <Chip label="Merged" severity="success" />
      </div>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Chip label="Default" color="default" />
      <Chip label="Primary" color="primary" />
      <Chip label="Secondary" color="secondary" />
      <Chip label="Error" color="error" />
      <Chip label="Warning" color="warning" />
      <Chip label="Info" color="info" />
      <Chip label="Success" color="success" />
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
  render: () => (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <Chip label="Filled" icon={<Icon icon="user" size="sm" color="inherit" />} color="primary" />
      <Chip label="Outlined" icon={<Icon icon="user" size="sm" color="inherit" />} color="primary" variant="outlined" />
    </div>
  ),
};

export const Deletable: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8 }}>
      <Chip label="React" color="primary" onDelete={() => {}} />
      <Chip label="TypeScript" color="secondary" variant="outlined" onDelete={() => {}} />
    </div>
  ),
};
