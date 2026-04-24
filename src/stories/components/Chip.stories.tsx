import type { Meta, StoryObj } from '@storybook/react';
import Avatar from '@mui/material/Avatar';
import FaceIcon from '@mui/icons-material/Face';
import { Chip } from '../../components/Chip';

const meta: Meta<typeof Chip> = {
  title: 'Components / Chip',
  component: Chip,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    variant: { control: 'select', options: ['filled', 'outlined'] },
    color: { control: 'select', options: ['default', 'primary', 'secondary', 'error', 'warning', 'info', 'success'] },
    size: { control: 'select', options: ['small', 'medium'] },
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
    <div style={{ display: 'flex', gap: 8 }}>
      <Chip label="With icon" icon={<FaceIcon />} color="primary" />
      <Chip label="Outlined" icon={<FaceIcon />} color="primary" variant="outlined" />
    </div>
  ),
};

export const WithAvatar: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8 }}>
      <Chip label="Adam" avatar={<Avatar>A</Avatar>} />
      <Chip label="Bart" avatar={<Avatar src="https://i.pravatar.cc/40?u=bart" />} />
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

export const Clickable: Story = {
  args: { label: 'Clickable', color: 'primary', clickable: true },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8 }}>
      <Chip label="Filled disabled" color="primary" disabled />
      <Chip label="Outlined disabled" color="primary" variant="outlined" disabled />
    </div>
  ),
};
