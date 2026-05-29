import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Snackbar } from '../../components/Snackbar';

const meta: Meta<typeof Snackbar> = {
  title: 'Components / Snackbar',
  component: Snackbar,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    severity: { control: 'select', options: ['success', 'error', 'warning', 'info', undefined] },
    duration: { control: 'number' },
    anchorOrigin: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof Snackbar>;

export const Default: Story = {
  render: function Render(args) {
    const [open, setOpen] = useState(false);
    return (
      <Box>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Show notification
        </Button>
        <Snackbar {...args} open={open} onClose={() => setOpen(false)} />
      </Box>
    );
  },
  args: { message: 'Changes saved successfully.' },
};

export const Severities: Story = {
  render: function Render() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const items = [
      { severity: 'success' as const, message: 'Your details have been updated.' },
      { severity: 'error' as const, message: 'Something went wrong. Please try again.' },
      { severity: 'warning' as const, message: 'Your session is about to expire.' },
      { severity: 'info' as const, message: 'A new statement is available.' },
    ];
    return (
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        {items.map((item, i) => (
          <Button key={item.severity} variant="outlined" onClick={() => setOpenIndex(i)}>
            {item.severity}
          </Button>
        ))}
        {items.map((item, i) => (
          <Snackbar
            key={item.severity}
            open={openIndex === i}
            severity={item.severity}
            message={item.message}
            onClose={() => setOpenIndex(null)}
          />
        ))}
      </Box>
    );
  },
};

export const Persistent: Story = {
  render: function Render(args) {
    const [open, setOpen] = useState(false);
    return (
      <Box>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Show persistent
        </Button>
        <Snackbar {...args} open={open} onClose={() => setOpen(false)} />
      </Box>
    );
  },
  args: {
    message: 'This stays until dismissed.',
    severity: 'info',
    duration: null,
  },
};
