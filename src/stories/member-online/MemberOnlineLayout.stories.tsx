import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { MemberOnlineLayout } from '../../components/MemberOnline';
import { Logo } from '../../components/Logo';
import {
  MOCK_BALANCE,
  MOCK_FOOTER_DISCLAIMER,
  MOCK_FOOTER_LINKS,
  MOCK_PRIMARY_ITEMS,
  MOCK_SECONDARY_ITEMS,
  MOCK_USER,
} from './mockData';

const meta: Meta<typeof MemberOnlineLayout> = {
  title: 'Member Online / MemberOnlineLayout',
  component: MemberOnlineLayout,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Composed authenticated shell. Renders the desktop SideNav + MemberHeader + MemberFooter above the `md` breakpoint, and a MobileHeader + MobileNavDrawer + MemberFooter below it.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MemberOnlineLayout>;

function Demo() {
  const [activeId, setActiveId] = useState('home');
  return (
    <MemberOnlineLayout
      user={MOCK_USER}
      balance={MOCK_BALANCE}
      primaryItems={MOCK_PRIMARY_ITEMS}
      secondaryItems={MOCK_SECONDARY_ITEMS}
      footerLinks={MOCK_FOOTER_LINKS}
      footerDisclaimer={MOCK_FOOTER_DISCLAIMER}
      logo={<Logo variant="primary" size="sm" />}
      mobileLogo={<Logo variant="mark" size="sm" />}
      activeItemId={activeId}
      onItemClick={(item) => setActiveId(item.id)}
      lastLoggedIn="24 May 2026"
      onLogout={() => alert('Log out')}
    >
      <Box sx={{ p: { xs: 3, md: 4 }, maxWidth: '64rem' }}>
        <Stack spacing={2}>
          <Typography variant="display-6" component="h1">
            Hello, Adam
          </Typography>
          <Typography variant="lead" color="text.muted">
            This is the Member Online layout. Open Storybook in a smaller viewport to see
            the mobile drawer in action.
          </Typography>
          <Typography variant="body" color="text.primary">
            Active item:{' '}
            <Box component="strong" sx={{ color: 'text.heading' }}>
              {activeId}
            </Box>
          </Typography>
        </Stack>
      </Box>
    </MemberOnlineLayout>
  );
}

export const Default: Story = {
  render: () => <Demo />,
};
