import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { CloseButton } from '../../components/CloseButton';

const meta: Meta<typeof CloseButton> = {
  title: 'Atomic Components / CloseButton',
  component: CloseButton,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    variant: { control: 'select', options: ['ghost', 'soft'] },
    color: {
      control: 'select',
      options: ['muted', 'error', 'warning', 'info', 'success'],
    },
    label: { control: 'text' },
    onClick: { table: { disable: true } },
    sx: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof CloseButton>;

export const Default: Story = {
  args: { onClick: () => {} },
};

export const Colors: Story = {
  parameters: {
    docs: {
      description: {
        story: '`muted` is the default — elevated background with a muted icon. The semantic colors (`error`, `warning`, `info`, `success`) are used with `variant="soft"` or `variant="ghost"` to match a severity-tinted surface.',
      },
    },
  },
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box>
        <Typography variant="small" color="text.muted" sx={{ mb: 1, display: 'block' }}>ghost</Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <CloseButton onClick={() => {}} variant="ghost" color="muted" label="Close (muted)" />
          {(['error', 'warning', 'info', 'success'] as const).map((color) => (
            <CloseButton key={color} onClick={() => {}} variant="ghost" color={color} label={`Close (${color})`} />
          ))}
        </Box>
      </Box>
      <Box>
        <Typography variant="small" color="text.muted" sx={{ mb: 1, display: 'block' }}>soft</Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <CloseButton onClick={() => {}} color="muted" label="Close (muted)" />
          {(['error', 'warning', 'info', 'success'] as const).map((color) => (
            <CloseButton key={color} onClick={() => {}} variant="soft" color={color} label={`Close (${color})`} />
          ))}
        </Box>
      </Box>
    </Box>
  ),
};

export const InContext: Story = {
  name: 'In Context — where CloseButton is used',
  parameters: {
    docs: {
      description: {
        story: 'Drawer, Dialog, and Modal all use the default `color="muted"`. Alert passes `variant="soft" color={severity}`.',
      },
    },
    layout: 'padded',
  },
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, width: 480 }}>
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="small" color="text.muted">Drawer / Modal / Dialog — muted (default)</Typography>
          <CloseButton onClick={() => {}} label="Close" />
        </Box>
      </Paper>

      <Box sx={(t) => ({
        borderRadius: `${t.shape.xs}px`,
        bgcolor: 'error.light',
        color: 'error.contrastText',
        p: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      })}>
        <Typography variant="small" sx={{ color: 'error.main' }}>Error alert — soft error (Alert)</Typography>
        <CloseButton onClick={() => {}} variant="soft" color="error" label="Dismiss error alert" />
      </Box>

      <Box sx={(t) => ({
        borderRadius: `${t.shape.xs}px`,
        bgcolor: 'success.light',
        p: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      })}>
        <Typography variant="small" sx={{ color: 'success.main' }}>Success alert — soft success (Alert)</Typography>
        <CloseButton onClick={() => {}} variant="soft" color="success" label="Dismiss success alert" />
      </Box>
    </Box>
  ),
};

export const AccessibleLabel: Story = {
  name: 'Accessible label',
  parameters: {
    docs: {
      description: {
        story: 'The `label` prop sets the `aria-label`. Default is `"Close"`. Always pass a specific label when context matters — e.g. `"Dismiss error alert"` or `"Close drawer"`. The label is visually hidden but read by screen readers.',
      },
    },
  },
  args: { onClick: () => {}, label: 'Close settings panel' },
};
