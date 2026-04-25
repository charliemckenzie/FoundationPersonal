import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Modal } from '../../components/Modal';
import { Button } from '../../components/Button';
import Typography from '@mui/material/Typography';

const meta: Meta<typeof Modal> = {
  title: 'Components / Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
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
            <Button label="Cancel" variant="text" onClick={() => setOpen(false)} />
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
    <div style={{ display: 'flex', gap: 12 }}>
      <ModalDemo size="small" title="Small modal" />
      <ModalDemo size="medium" title="Medium modal" />
      <ModalDemo size="large" title="Large modal" />
    </div>
  ),
};

export const NoTitle: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button label="Open (no title)" onClick={() => setOpen(true)} />
        <Modal open={open} onClose={() => setOpen(false)} actions={<Button label="Close" onClick={() => setOpen(false)} />}>
          <Typography variant="body">A modal without a title bar.</Typography>
        </Modal>
      </>
    );
  },
};

export const DisableBackdropClose: Story = {
  render: () => <ModalDemo title="Can't close by clicking backdrop" disableCloseOnBackdrop />,
};
