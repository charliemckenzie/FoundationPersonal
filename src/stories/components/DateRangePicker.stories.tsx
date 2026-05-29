import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DateRangePicker } from '../../components/DateRangePicker';

const meta: Meta<typeof DateRangePicker> = {
  title: 'Form Components / Date / DateRangePicker',
  component: DateRangePicker,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    helperText: { control: 'text' },
    startLabel: { control: 'text' },
    endLabel: { control: 'text' },
    value: { table: { disable: true } },
    onChange: { table: { disable: true } },
    minDate: { table: { disable: true } },
    maxDate: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof DateRangePicker>;

export const Default: Story = {
  render: function Render(args) {
    const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);
    return <DateRangePicker {...args} value={value} onChange={setValue} />;
  },
  args: {
    startLabel: 'Start date',
    endLabel: 'End date',
  },
};

export const WithValue: Story = {
  render: function Render(args) {
    const [value, setValue] = useState<[Date | null, Date | null]>([
      new Date('2025-01-01'),
      new Date('2025-06-30'),
    ]);
    return (
      <Box>
        <DateRangePicker {...args} value={value} onChange={setValue} />
        <Typography variant="small" color="text.muted" sx={{ mt: 1, display: 'block' }}>
          {value[0]?.toLocaleDateString()} – {value[1]?.toLocaleDateString()}
        </Typography>
      </Box>
    );
  },
  args: { startLabel: 'From', endLabel: 'To' },
};

export const TransactionFilter: Story = {
  render: function Render() {
    const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);
    return (
      <Box sx={{ maxWidth: '36rem' }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Filter transactions</Typography>
        <DateRangePicker
          value={value}
          onChange={setValue}
          startLabel="From"
          endLabel="To"
          helperText="Results will show transactions between these dates."
        />
      </Box>
    );
  },
};

export const WithError: Story = {
  render: function Render(args) {
    const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);
    return <DateRangePicker {...args} value={value} onChange={setValue} />;
  },
  args: {
    error: true,
    helperText: 'End date must be after start date.',
  },
};

export const Disabled: Story = {
  render: function Render(args) {
    return (
      <DateRangePicker
        {...args}
        value={[new Date('2025-01-01'), new Date('2025-06-30')]}
        onChange={() => undefined}
      />
    );
  },
  args: { disabled: true },
};
