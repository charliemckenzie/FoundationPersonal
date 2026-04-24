import type { Meta, StoryObj } from '@storybook/react';
import { ToggleButtonGroup } from '../../components/ToggleButton';

const ALIGNMENT_OPTIONS = [
  { value: 'left', label: 'Left' },
  { value: 'center', label: 'Center' },
  { value: 'right', label: 'Right' },
];

const SIZE_OPTIONS = [
  { value: 'xs', label: 'XS' },
  { value: 'sm', label: 'SM' },
  { value: 'md', label: 'MD' },
  { value: 'lg', label: 'LG', disabled: true },
];

const meta: Meta<typeof ToggleButtonGroup> = {
  title: 'Form Components / ToggleButton',
  component: ToggleButtonGroup,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    color: { control: 'select', options: ['standard', 'primary', 'secondary', 'error', 'warning', 'info', 'success'] },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
  },
};

export default meta;
type Story = StoryObj<typeof ToggleButtonGroup>;

export const Default: Story = {
  args: { options: ALIGNMENT_OPTIONS, ariaLabel: 'Text alignment', defaultValue: 'left' },
};

export const MultiSelect: Story = {
  args: { options: ALIGNMENT_OPTIONS, ariaLabel: 'Text alignment', exclusive: false, defaultValue: ['left', 'center'] },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <ToggleButtonGroup options={ALIGNMENT_OPTIONS} ariaLabel="Text alignment (small)" size="small" defaultValue="left" />
      <ToggleButtonGroup options={ALIGNMENT_OPTIONS} ariaLabel="Text alignment (medium)" size="medium" defaultValue="left" />
      <ToggleButtonGroup options={ALIGNMENT_OPTIONS} ariaLabel="Text alignment (large)" size="large" defaultValue="left" />
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <ToggleButtonGroup options={ALIGNMENT_OPTIONS} ariaLabel="Text alignment" color="primary" defaultValue="left" />
      <ToggleButtonGroup options={ALIGNMENT_OPTIONS} ariaLabel="Text alignment" color="secondary" defaultValue="left" />
      <ToggleButtonGroup options={ALIGNMENT_OPTIONS} ariaLabel="Text alignment" color="success" defaultValue="left" />
    </div>
  ),
};

export const Vertical: Story = {
  args: { options: ALIGNMENT_OPTIONS, ariaLabel: 'Text alignment', orientation: 'vertical', defaultValue: 'center' },
};

export const WithDisabledOption: Story = {
  args: { options: SIZE_OPTIONS, ariaLabel: 'Size selection', defaultValue: 'sm' },
};

export const Disabled: Story = {
  args: { options: ALIGNMENT_OPTIONS, ariaLabel: 'Text alignment', defaultValue: 'left', disabled: true },
};

export const FullWidth: Story = {
  args: { options: ALIGNMENT_OPTIONS, ariaLabel: 'Text alignment', defaultValue: 'center', fullWidth: true },
  parameters: { layout: 'padded' },
};
