import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Modal } from '../../components/Modal';
import { Button } from '../../components/Button';

const meta: Meta<typeof Modal> = {
  title: 'Utilities / Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Modal is the foundational overlay utility. It wraps MUI Dialog to provide focus trapping, backdrop, scroll lock, and portal rendering — with no imposed structure on the content.\n\nFor structured interactions, use the opinionated components built on this pattern:\n- **[Dialog](/?path=/story/components-dialog--default)** — confirmations, alerts, and destructive-action flows with a required title, optional description, and built-in confirm/cancel actions.\n- **[Drawer](/?path=/story/components-drawer--default)** — slide-in panels for navigation, filters, and forms that need persistent screen real estate.',
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['small', 'medium', 'large', 'fullscreen'] },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

function ModalDemo({ size = 'medium', title = 'Modal title', disableCloseOnBackdrop = false }: { size?: 'small' | 'medium' | 'large' | 'fullscreen'; title?: string; disableCloseOnBackdrop?: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button label="Open modal" onClick={() => setOpen(true)} />
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={title}
        size={size}
        disableCloseOnBackdrop={disableCloseOnBackdrop}
        actions={
          <>
            <Button label="Cancel" variant="ghost" onClick={() => setOpen(false)} />
            <Button label="Confirm" onClick={() => setOpen(false)} />
          </>
        }
      >
        <Typography variant="body" color="text.muted">
          This is the modal body. Use this area for forms, confirmations, or detail views.
        </Typography>
      </Modal>
    </>
  );
}

export const Default: Story = {
  render: () => <ModalDemo />,
};

export const Sizes: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 1.5 }}>
      <ModalDemo size="small" title="Small modal" />
      <ModalDemo size="medium" title="Medium modal" />
      <ModalDemo size="large" title="Large modal" />
    </Box>
  ),
};

export const NoTitle: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button label="Open (no title)" onClick={() => setOpen(true)} />
        <Modal open={open} onClose={() => setOpen(false)} actions={<Button label="Close" variant="ghost" onClick={() => setOpen(false)} />}>
          <Typography variant="body">A modal without a title bar.</Typography>
        </Modal>
      </>
    );
  },
};

export const DisableBackdropClose: Story = {
  render: () => <ModalDemo title="Can't close by clicking backdrop" disableCloseOnBackdrop />,
};

export const ScrollableContent: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button label="Open scrollable modal" onClick={() => setOpen(true)} />
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Long content"
          actions={
            <>
              <Button label="Cancel" variant="ghost" onClick={() => setOpen(false)} />
              <Button label="Confirm" onClick={() => setOpen(false)} />
            </>
          }
        >
          {Array.from({ length: 20 }, (_, i) => (
            <Typography key={i} variant="body" color="text.muted" sx={{ mb: 2, display: 'block' }}>
              Paragraph {i + 1}: The modal body scrolls independently when content overflows. The title and actions stay fixed.
            </Typography>
          ))}
        </Modal>
      </>
    );
  },
};
