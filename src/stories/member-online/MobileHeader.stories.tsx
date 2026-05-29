import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Box from '@mui/material/Box';
import { MobileHeader } from '../../components/MemberOnline';
import { Logo } from '../../components/Logo';

const meta: Meta<typeof MobileHeader> = {
  title: 'Member Online / Target State / MobileHeader',
  component: MobileHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Compact top bar shown below the `md` breakpoint: hamburger, optional search-open trigger, centred logo, log-out button.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MobileHeader>;

export const Default: Story = {
  render: () => (
    <Box sx={{ width: '24rem', maxWidth: '100%' }}>
      <MobileHeader
        logo={<Logo variant="secondary" size="md" />}
        phoneLogo={<Logo variant="mark" size="md" />}
        homeHref="/"
        onMenuOpen={() => alert('Open menu')}
        onLogout={() => alert('Log out')}
      />
    </Box>
  ),
};

export const WithSearchTrigger: Story = {
  render: () => (
    <Box sx={{ width: '24rem', maxWidth: '100%' }}>
      <MobileHeader
        logo={<Logo variant="secondary" size="md" />}
        phoneLogo={<Logo variant="mark" size="md" />}
        homeHref="/"
        onMenuOpen={() => alert('Open menu')}
        onSearchOpen={() => alert('Open search')}
        onLogout={() => alert('Log out')}
      />
    </Box>
  ),
};
