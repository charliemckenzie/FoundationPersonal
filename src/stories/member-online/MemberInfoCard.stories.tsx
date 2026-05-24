import type { Meta, StoryObj } from '@storybook/react';
import Box from '@mui/material/Box';
import { MemberInfoCard } from '../../components/MemberOnline';
import { MOCK_BALANCE, MOCK_USER } from './mockData';

const meta: Meta<typeof MemberInfoCard> = {
  title: 'Member Online / Target State / MemberInfoCard',
  component: MemberInfoCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Compact member identity block: name, balance, member number with copy button. Shown at the top of the MobileNavDrawer.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MemberInfoCard>;

export const Default: Story = {
  args: { user: MOCK_USER, balance: MOCK_BALANCE },
  decorators: [(Story) => <Box sx={{ width: '20rem' }}><Story /></Box>],
};
