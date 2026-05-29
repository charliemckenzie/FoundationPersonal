import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Box from '@mui/material/Box';
import { BalanceCard } from '../../components/MemberOnline';
import { MOCK_BALANCE } from './mockData';

const meta: Meta<typeof BalanceCard> = {
  title: 'Member Online / Target State / BalanceCard',
  component: BalanceCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Displays the member\'s total balance and an "as at" date. The `compact` variant removes padding for use inside SideNav.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof BalanceCard>;

export const Default: Story = {
  args: { balance: MOCK_BALANCE },
  decorators: [(Story) => <Box sx={{ width: '18rem' }}><Story /></Box>],
};

export const Compact: Story = {
  args: { balance: MOCK_BALANCE, compact: true },
  decorators: [(Story) => <Box sx={{ width: '18rem' }}><Story /></Box>],
};
