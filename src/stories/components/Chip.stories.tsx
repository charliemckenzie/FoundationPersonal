import type { Meta, StoryObj } from '@storybook/react';
import FaceIcon from '@mui/icons-material/Face';
import { Chip } from '../../components/Chip';

const meta: Meta<typeof Chip> = {
  title: 'Components / Chip',
  component: Chip,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    variant: { control: 'select', options: ['filled', 'outlined', 'alert'] },
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
      <Chip label="Alert" variant="alert" color="primary" />
    </div>
  ),
};

export const Alert: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Chip label="Error" variant="alert" color="error" size="small" />
      <Chip label="Warning" variant="alert" color="warning" size="small" />
      <Chip label="Info" variant="alert" color="info" size="small" />
      <Chip label="Success" variant="alert" color="success" size="small" />
    </div>
  ),
};

export const AlertWithIcon: Story = {
  name: 'Alert with severity icon',
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Chip label="Error" variant="alert" color="error" size="small" showSeverityIcon />
      <Chip label="Warning" variant="alert" color="warning" size="small" showSeverityIcon />
      <Chip label="Info" variant="alert" color="info" size="small" showSeverityIcon />
      <Chip label="Success" variant="alert" color="success" size="small" showSeverityIcon />
    </div>
  ),
};

export const InlineWithText: Story = {
  name: 'Inline with text',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span>Invoice #1042</span>
        <Chip label="Overdue" variant="alert" color="error" size="small" showSeverityIcon />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span>Deployment v2.4.1</span>
        <Chip label="In review" variant="alert" color="warning" size="small" showSeverityIcon />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span>Pull request #88</span>
        <Chip label="Merged" variant="alert" color="success" size="small" showSeverityIcon />
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
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Chip label="Filled" icon={<FaceIcon />} color="primary" />
      <Chip label="Outlined" icon={<FaceIcon />} color="primary" variant="outlined" />
      <Chip label="Alert" icon={<FaceIcon />} color="primary" variant="alert" />
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
