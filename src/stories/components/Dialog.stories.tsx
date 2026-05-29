import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import Box from '@mui/material/Box';
import { Dialog, type DialogVariant, type AlertAction, type DialogMobileDisplay } from '../../components/Dialog';
import { Button } from '../../components/Button';

const meta: Meta<typeof Dialog> = {
  title: 'Components / Dialog',
  component: Dialog,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A structured overlay for confirmations, alerts, and destructive-action flows. Use Modal for flexible, content-agnostic overlays.',
      },
    },
  },
  argTypes: {
    variant: { table: { disable: true } },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    alertButtonLayout: { table: { disable: true } },
    loading: { table: { disable: true } },
    disableCloseOnBackdrop: { table: { disable: true } },
    onConfirm: { table: { disable: true } },
    onClose: { table: { disable: true } },
    children: { table: { disable: true } },
    extraActions: { table: { disable: true } },
    mobileDisplay: { control: 'radio', options: ['drawer', 'dialog'] },
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

function DialogDemo({
  variant = 'neutral',
  size = 'small',
  title = 'Confirm action',
  description = 'Are you sure you want to continue? This cannot be undone.',
  triggerLabel = 'Open dialog',
  confirmLabel,
  cancelLabel,
  mobileDisplay,
}: {
  variant?: DialogVariant;
  size?: 'small' | 'medium' | 'large';
  title?: string;
  description?: string;
  triggerLabel?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  mobileDisplay?: DialogMobileDisplay;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button label={triggerLabel} onClick={() => setOpen(true)} />
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => setOpen(false)}
        title={title}
        description={description}
        variant={variant}
        size={size}
        confirmLabel={confirmLabel}
        cancelLabel={cancelLabel}
        mobileDisplay={mobileDisplay}
      />
    </>
  );
}

export const Default: Story = {
  render: () => <DialogDemo />,
};

export const NoMobileDrawer: Story = {
  name: 'No mobile drawer',
  parameters: {
    docs: {
      description: {
        story:
          'Use `mobileDisplay="dialog"` to keep the classic centred modal on all breakpoints. The default (`"drawer"`) slides up from the bottom on small screens.',
      },
    },
  },
  render: () => (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <DialogDemo triggerLabel="Drawer (default)" />
      <DialogDemo triggerLabel="Always modal" mobileDisplay="dialog" />
    </Box>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <DialogDemo size="small" title="Small dialog" triggerLabel="Small" />
      <DialogDemo size="medium" title="Medium dialog" triggerLabel="Medium" />
      <DialogDemo size="large" title="Large dialog" triggerLabel="Large" />
    </Box>
  ),
};

export const AlertDialogs: Story = {
  render: () => {
    const [open, setOpen] = useState<'single' | 'dual' | 'stacked' | null>(null);
    const extraActions: AlertAction[] = [
      { label: 'Save as draft', onClick: () => setOpen(null) },
      { label: 'Discard changes', onClick: () => setOpen(null) },
    ];
    return (
      <>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button label="Single action" onClick={() => setOpen('single')} />
          <Button label="Dual action" onClick={() => setOpen('dual')} />
          <Button label="Stacked actions" onClick={() => setOpen('stacked')} />
        </Box>
        <Dialog
          open={open === 'single'}
          onClose={() => setOpen(null)}
          variant="alert"
          title="No internet connection"
          description="Check your settings and try again."
          cancelLabel="OK"
        />
        <Dialog
          open={open === 'dual'}
          onClose={() => setOpen(null)}
          onConfirm={() => setOpen(null)}
          variant="alert"
          title="Delete item?"
          description="This action cannot be undone."
          confirmLabel="Delete"
          cancelLabel="Cancel"
        />
        <Dialog
          open={open === 'stacked'}
          onClose={() => setOpen(null)}
          onConfirm={() => setOpen(null)}
          variant="alert"
          alertButtonLayout="stack"
          title="Unsaved changes"
          description="Choose how you'd like to handle your unsaved changes."
          confirmLabel="Keep editing"
          cancelLabel="Cancel"
          extraActions={extraActions}
        />
      </>
    );
  },
};
