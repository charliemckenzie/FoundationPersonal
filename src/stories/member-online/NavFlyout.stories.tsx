import type { Meta, StoryObj } from '@storybook/react';
import { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import { Button } from '../../components/Button';
import { NavFlyout } from '../../components/MemberOnline';
import { MOCK_PRIMARY_ITEMS } from './mockData';

const PUT_MONEY_IN = MOCK_PRIMARY_ITEMS.find((i) => i.id === 'put-money-in');

const meta: Meta<typeof NavFlyout> = {
  title: 'Member Online / NavFlyout',
  component: NavFlyout,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Desktop side-panel popover that opens next to a parent SideNav item, listing its child links. Anchored to any HTML element via `anchorEl`.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof NavFlyout>;

function Demo() {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  return (
    <Box sx={{ display: 'flex', gap: 6, alignItems: 'center', p: 6 }}>
      <Button
        ref={triggerRef}
        label="Open flyout"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
      />
      <NavFlyout
        open={open}
        anchorEl={triggerRef.current}
        title={PUT_MONEY_IN?.label}
        items={PUT_MONEY_IN?.children ?? []}
        onClose={() => setOpen(false)}
      />
    </Box>
  );
}

export const Default: Story = {
  render: () => <Demo />,
};
