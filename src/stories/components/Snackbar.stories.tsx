import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import Box from '@mui/material/Box';
import MuiAlert from '@mui/material/Alert';
import MuiSnackbarContent from '@mui/material/SnackbarContent';
import { Snackbar } from '../../components/Snackbar';
import { Button } from '../../components/Button';
import { Icon } from '../../components/Icon';
import { SEVERITY_ICONS } from '../../components/Alert';

const ICON_MAPPING = {
  success: <Icon icon={SEVERITY_ICONS.success} style="solid" color="inherit" size="lg" />,
  error:   <Icon icon={SEVERITY_ICONS.error}   style="solid" color="inherit" size="lg" />,
  warning: <Icon icon={SEVERITY_ICONS.warning} style="solid" color="inherit" size="lg" />,
  info:    <Icon icon={SEVERITY_ICONS.info}    style="solid" color="inherit" size="lg" />,
};

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
        <Button label="Show notification" variant="contained" onClick={() => setOpen(true)} />
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
          <Button
            key={item.severity}
            label={item.severity}
            variant="outlined"
            onClick={() => setOpenIndex(i)}
          />
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
        <Button label="Show persistent" variant="contained" onClick={() => setOpen(true)} />
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

/** Static view — always visible. Use this story when editing Snackbar styles. */
export const StyleReference: Story = {
  render: function Render() {
    const severities = ['success', 'error', 'warning', 'info'] as const;
    const messages: Record<string, string> = {
      success: 'Your details have been updated.',
      error: 'Something went wrong. Please try again.',
      warning: 'Your session is about to expire.',
      info: 'A new statement is available.',
    };
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 480 }}>
        <MuiSnackbarContent message="Default — no severity." />
        {severities.map((severity) => (
          <MuiAlert key={severity} severity={severity} variant="filled" iconMapping={ICON_MAPPING} sx={{ width: '100%' }}>
            {messages[severity]}
          </MuiAlert>
        ))}
      </Box>
    );
  },
  parameters: {
    layout: 'padded',
  },
};
