import type { Meta, StoryObj } from '@storybook/react';
import Box from '@mui/material/Box';
import { NavItem } from '../../components/MemberOnline';

const meta: Meta<typeof NavItem> = {
  title: 'Member Online / NavItem',
  component: NavItem,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A single nav row with icon, label, optional trailing chevron, and active treatment. Used inside the SideNav, MobileNavDrawer, and any list-style navigation.',
      },
    },
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'secondary'] },
    size: { control: 'inline-radio', options: ['medium', 'large'] },
    active: { control: 'boolean' },
    hasChildren: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof NavItem>;

export const Default: Story = {
  args: { label: 'Home', icon: 'house', variant: 'primary' },
  decorators: [(Story) => <Box sx={{ width: '16rem' }}><Story /></Box>],
};

export const Active: Story = {
  args: { label: 'Home', icon: 'house', active: true, variant: 'primary' },
  decorators: [(Story) => <Box sx={{ width: '16rem' }}><Story /></Box>],
};

export const WithChildren: Story = {
  args: { label: 'Transactions', icon: 'arrow-left-arrow-right', hasChildren: true },
  decorators: [(Story) => <Box sx={{ width: '16rem' }}><Story /></Box>],
};

export const Secondary: Story = {
  args: { label: 'Help & contact', variant: 'secondary' },
  decorators: [(Story) => <Box sx={{ width: '16rem' }}><Story /></Box>],
};

export const AllStates: Story = {
  render: () => (
    <Box sx={{ width: '16rem', display: 'flex', flexDirection: 'column' }}>
      <NavItem label="Home" icon="house" />
      <NavItem label="Home" icon="house" active />
      <NavItem label="Transactions" icon="arrow-left-arrow-right" hasChildren />
      <NavItem label="Insurance" icon="umbrella" />
      <NavItem label="Help & contact" variant="secondary" />
      <NavItem label="Profile" variant="secondary" active />
    </Box>
  ),
};
