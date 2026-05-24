import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from '../../components/Button';
import { MobileNavDrawer } from '../../components/MemberOnline';
import { Logo } from '../../components/Logo';
import {
  MOCK_BALANCE,
  MOCK_PRIMARY_ITEMS,
  MOCK_SECONDARY_ITEMS,
  MOCK_USER,
} from './mockData';
import type { ThemeMode } from '../../app/themes/ThemeModeContext';

const meta: Meta<typeof MobileNavDrawer> = {
  title: 'Member Online / Target State / MobileNavDrawer',
  component: MobileNavDrawer,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Left-anchored mobile drawer with an iOS-style drill-down for parent nav items. Click a parent (Transactions, Put money in) to push into the child view; Back returns.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MobileNavDrawer>;

function Demo() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<ThemeMode>('light');
  const [activeId, setActiveId] = useState('home');
  return (
    <>
      <Button label="Open drawer" onClick={() => setOpen(true)} />
      <MobileNavDrawer
        open={open}
        onClose={() => setOpen(false)}
        logo={<Logo variant="primary" size="sm" />}
        user={MOCK_USER}
        balance={MOCK_BALANCE}
        primaryItems={MOCK_PRIMARY_ITEMS}
        secondaryItems={MOCK_SECONDARY_ITEMS}
        mode={mode}
        onModeChange={setMode}
        activeItemId={activeId}
        onItemClick={(item) => setActiveId(item.id)}
        onLogout={() => alert('Log out')}
      />
    </>
  );
}

export const Default: Story = {
  render: () => <Demo />,
};
