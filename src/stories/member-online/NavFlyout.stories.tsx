import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import Box from '@mui/material/Box';
import { Button } from '../../components/Button';
import { NavFlyout } from '../../components/MemberOnline';
import { MOCK_PRIMARY_ITEMS } from './mockData';

const PUT_MONEY_IN = MOCK_PRIMARY_ITEMS.find((i) => i.id === 'put-money-in');

const meta: Meta<typeof NavFlyout> = {
  title: 'Member Online / Target State / NavFlyout',
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
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = anchorEl !== null;
  return (
    <Box sx={{ display: 'flex', gap: 6, alignItems: 'center', p: 6 }}>
      <Button
        label="Open flyout"
        onClick={(event) => setAnchorEl((current) => current === null ? event.currentTarget : null)}
        aria-haspopup="menu"
        aria-expanded={open}
      />
      <NavFlyout
        open={open}
        anchorEl={anchorEl}
        title={PUT_MONEY_IN?.label}
        items={PUT_MONEY_IN?.children ?? []}
        onClose={() => setAnchorEl(null)}
      />
    </Box>
  );
}

export const Default: Story = {
  render: () => <Demo />,
};
