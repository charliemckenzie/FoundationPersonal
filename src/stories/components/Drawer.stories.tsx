import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Drawer, type DrawerAnchor } from '../../components/Drawer';
import { Button } from '../../components/Button';

const meta: Meta<typeof Drawer> = {
  title: 'Components / Drawer',
  component: Drawer,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A slide-in panel anchored to any edge of the screen. Use for secondary content, navigation, filters, or forms that do not require a full page.',
      },
    },
  },
  argTypes: {
    anchor: { control: 'select', options: ['left', 'right', 'top', 'bottom'] },
    width: { control: 'number' },
    onClose: { table: { disable: true } },
    children: { table: { disable: true } },
    actions: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof Drawer>;

function DrawerDemo({
  anchor = 'right',
  title = 'Drawer title',
  width,
  triggerLabel = 'Open drawer',
  withActions = true,
}: {
  anchor?: DrawerAnchor;
  title?: string;
  width?: number;
  triggerLabel?: string;
  withActions?: boolean;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button label={triggerLabel} onClick={() => setOpen(true)} />
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        anchor={anchor}
        title={title}
        width={width}
        actions={
          withActions ? (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
              <Button label="Cancel" variant="ghost" size="small" onClick={() => setOpen(false)} />
              <Button label="Apply" size="small" onClick={() => setOpen(false)} />
            </Box>
          ) : undefined
        }
      >
        <Typography variant="body" color="text.muted">
          This is the drawer body. Use this area for filters, forms, navigation, or supplementary content.
        </Typography>
      </Drawer>
    </>
  );
}

export const Default: Story = {
  render: () => <DrawerDemo />,
};

export const Anchors: Story = {
  render: () => {
    const anchors: DrawerAnchor[] = ['left', 'right', 'top', 'bottom'];
    return (
      <Box sx={{ display: 'flex', gap: 2 }}>
        {anchors.map((anchor) => (
          <DrawerDemo
            key={anchor}
            anchor={anchor}
            title={`${anchor.charAt(0).toUpperCase() + anchor.slice(1)} drawer`}
            triggerLabel={anchor.charAt(0).toUpperCase() + anchor.slice(1)}
          />
        ))}
      </Box>
    );
  },
};

export const NoTitle: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button label="Open (no title)" onClick={() => setOpen(true)} />
        <Drawer open={open} onClose={() => setOpen(false)}>
          <Typography variant="body" color="text.muted">
            A drawer without a header. Useful when the trigger context makes the purpose clear.
          </Typography>
        </Drawer>
      </>
    );
  },
};

export const WithActions: Story = {
  render: () => <DrawerDemo withActions triggerLabel="Open with actions" />,
};

export const Wide: Story = {
  render: () => (
    <DrawerDemo
      width={560}
      title="Wide drawer"
      triggerLabel="Open wide (560px)"
    />
  ),
};

export const LeftAnchor: Story = {
  render: () => (
    <DrawerDemo
      anchor="left"
      title="Navigation"
      triggerLabel="Open nav drawer"
      withActions={false}
    />
  ),
};
