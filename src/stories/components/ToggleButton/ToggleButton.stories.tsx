import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ToggleButtonGroup } from '../../../components/ToggleButton';

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
    color: { table: { disable: true } },
    onChange: { table: { disable: true } },
    exclusive: { table: { disable: true } },
    defaultValue: { table: { disable: true } },
    value: { table: { disable: true } },
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

const COUNTRY_OPTIONS = [
  { value: 'au', label: 'Australia' },
  { value: 'other', label: 'Outside Australia' },
];

export const WithLabel: Story = {
  args: {
    options: COUNTRY_OPTIONS,
    ariaLabel: 'Select country',
    defaultValue: 'au',
    label: 'Select country',
  },
};

export const WithError: Story = {
  args: {
    options: COUNTRY_OPTIONS,
    ariaLabel: 'Select country',
    label: 'Select country',
    error: true,
    errorMessage: 'Please select a country to continue.',
  },
};

export const Vertical: Story = {
  args: { options: ALIGNMENT_OPTIONS, ariaLabel: 'Text alignment', orientation: 'vertical', defaultValue: 'center' },
};

export const Connected: Story = {
  name: 'Variant — Connected',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <ToggleButtonGroup options={ALIGNMENT_OPTIONS} ariaLabel="Text alignment (small)" size="small" defaultValue="left" variant="connected" />
      <ToggleButtonGroup options={ALIGNMENT_OPTIONS} ariaLabel="Text alignment (medium)" size="medium" defaultValue="left" variant="connected" />
      <ToggleButtonGroup options={ALIGNMENT_OPTIONS} ariaLabel="Text alignment (large)" size="large" defaultValue="left" variant="connected" />
    </div>
  ),
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
