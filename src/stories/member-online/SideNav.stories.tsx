import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import { SideNav } from '../../components/MemberOnline';
import { Logo } from '../../components/Logo';
import { MOCK_BALANCE, MOCK_PRIMARY_ITEMS, MOCK_SECONDARY_ITEMS } from './mockData';

const meta: Meta<typeof SideNav> = {
  title: 'Member Online / Target State / SideNav',
  component: SideNav,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Desktop persistent left navigation: logo, balance card, primary nav, secondary nav, and last-logged-in footer. Parent items with `children` open a NavFlyout to the right.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SideNav>;

function Demo() {
  const [activeId, setActiveId] = useState('home');
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <SideNav
        logo={<Logo variant="primary" size="sm" />}
        primaryItems={MOCK_PRIMARY_ITEMS}
        secondaryItems={MOCK_SECONDARY_ITEMS}
        balance={MOCK_BALANCE}
        activeItemId={activeId}
        onItemClick={(item) => setActiveId(item.id)}
        lastLoggedIn="24 May 2026"
      />
      <Box sx={{ flex: 1, p: 3, color: 'text.muted' }}>Content area. Active: {activeId}</Box>
    </Box>
  );
}

export const Default: Story = {
  render: () => <Demo />,
};
