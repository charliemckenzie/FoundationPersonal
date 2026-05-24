import type { Meta, StoryObj } from '@storybook/react';
import Stack from '@mui/material/Stack';
import { UserChip } from '../../components/MemberOnline';
import { MOCK_USER } from './mockData';

const meta: Meta<typeof UserChip> = {
  title: 'Member Online / Target State / UserChip',
  component: UserChip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Avatar with initials (or photo) alongside the member name and number. Used in the desktop MemberHeader.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof UserChip>;

export const Default: Story = {
  args: { user: MOCK_USER },
};

export const IconOnly: Story = {
  args: { user: MOCK_USER, iconOnly: true },
};

export const Variants: Story = {
  render: () => (
    <Stack spacing={2}>
      <UserChip user={MOCK_USER} />
      <UserChip user={{ name: 'Jordan Lee', memberNumber: '123456789' }} />
      <UserChip user={MOCK_USER} iconOnly />
    </Stack>
  ),
};
