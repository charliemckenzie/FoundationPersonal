import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import Box from '@mui/material/Box';
import { DatePicker } from '../../components/DatePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'Form Components / Date / DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    required: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    size: { control: 'radio', options: ['small', 'medium'] },
    condensed: { control: 'boolean' },
    label: { control: 'text' },
    helperText: { control: 'text' },
    errorMessage: { control: 'text' },
    value: { table: { disable: true } },
    onChange: { table: { disable: true } },
    minDate: { table: { disable: true } },
    maxDate: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  render: function Render(args) {
    const [value, setValue] = useState<Date | null>(null);
    return (
      <Box sx={{ minWidth: '16rem' }}>
        <DatePicker {...args} value={value} onChange={setValue} />
      </Box>
    );
  },
  args: { label: 'Select date' },
};

export const WithValue: Story = {
  render: function Render(args) {
    const [value, setValue] = useState<Date | null>(new Date('2025-06-15'));
    return (
      <Box sx={{ minWidth: '16rem' }}>
        <DatePicker {...args} value={value} onChange={setValue} />
      </Box>
    );
  },
  args: { label: 'Effective date' },
};

export const Sizes: Story = {
  render: function Render(args) {
    const [sm, setSm] = useState<Date | null>(null);
    const [md, setMd] = useState<Date | null>(null);
    const [smC, setSmC] = useState<Date | null>(null);
    const [mdC, setMdC] = useState<Date | null>(null);
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: '16rem' }}>
        <Box>
          <Box sx={{ typography: 'overline', color: 'text.secondary', mb: 1 }}>Default</Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <DatePicker {...args} size="small" value={sm} onChange={setSm} label="Small" />
            <DatePicker {...args} size="medium" value={md} onChange={setMd} label="Medium" />
          </Box>
        </Box>
        <Box>
          <Box sx={{ typography: 'overline', color: 'text.secondary', mb: 1 }}>Condensed</Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <DatePicker {...args} size="small" condensed value={smC} onChange={setSmC} label="Small condensed" />
            <DatePicker {...args} size="medium" condensed value={mdC} onChange={setMdC} label="Medium condensed" />
          </Box>
        </Box>
      </Box>
    );
  },
};

export const WithError: Story = {
  render: function Render(args) {
    const [value, setValue] = useState<Date | null>(null);
    return (
      <Box sx={{ minWidth: '16rem' }}>
        <DatePicker {...args} value={value} onChange={setValue} />
      </Box>
    );
  },
  args: { label: 'Date of birth', errorMessage: 'Please enter a valid date.' },
};

export const WithConstraints: Story = {
  render: function Render(args) {
    const [value, setValue] = useState<Date | null>(null);
    return (
      <Box sx={{ minWidth: '16rem' }}>
        <DatePicker
          {...args}
          value={value}
          onChange={setValue}
          minDate={new Date('2025-01-01')}
          maxDate={new Date('2025-12-31')}
        />
      </Box>
    );
  },
  args: { label: 'Pick a date in 2025', helperText: 'Dates outside 2025 are disabled.' },
};

export const Disabled: Story = {
  render: function Render(args) {
    return (
      <Box sx={{ minWidth: '16rem' }}>
        <DatePicker {...args} value={new Date('2024-03-01')} onChange={() => undefined} />
      </Box>
    );
  },
  args: { label: 'Locked date', disabled: true },
};

export const FullWidth: Story = {
  render: function Render(args) {
    const [value, setValue] = useState<Date | null>(null);
    return <DatePicker {...args} value={value} onChange={setValue} />;
  },
  args: { label: 'Full width date', fullWidth: true },
};

export const PickerOnly: Story = {
  render: function Render(args) {
    const [value, setValue] = useState<Date | null>(null);
    return <DatePicker {...args} value={value} onChange={setValue} />;
  },
  args: { label: 'Select date', pickerOnly: true },
  parameters: {
    docs: {
      description: {
        story: 'Click anywhere on the input to open the calendar. Keyboard entry is disabled.',
      },
    },
  },
};
