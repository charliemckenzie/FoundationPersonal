import type { Meta, StoryObj } from '@storybook/react';
import IconButton from '@mui/material/IconButton';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge } from '../../components/Badge';

const meta: Meta<typeof Badge> = {
  title: 'Components / Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    variant: { control: 'select', options: ['standard', 'dot'] },
    color: { control: 'select', options: ['default', 'primary', 'secondary', 'error', 'warning', 'info', 'success'] },
    count: { control: 'number' },
    max: { control: 'number' },
    showZero: { control: 'boolean' },
    invisible: { control: 'boolean' },
    anchorVertical: { control: 'select', options: ['top', 'bottom'] },
    anchorHorizontal: { control: 'select', options: ['left', 'right'] },
    ariaLabel: { control: 'text' },
    children: { table: { disable: true } },
  },
  // Children is always a React node — can't be serialised as a Storybook arg.
  // Render wraps the badge around a static icon so controls work for all other props.
  render: (args) => (
    <Badge {...args}>
      <IconButton><MailIcon /></IconButton>
    </Badge>
  ),
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: { count: 4, color: 'primary' },
};

export const Dot: Story = {
  args: { variant: 'dot', color: 'error' },
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <Badge count={3} color="primary"><IconButton><MailIcon /></IconButton></Badge>
      <Badge count={3} color="secondary"><IconButton><MailIcon /></IconButton></Badge>
      <Badge count={3} color="error"><IconButton><MailIcon /></IconButton></Badge>
      <Badge count={3} color="success"><IconButton><MailIcon /></IconButton></Badge>
    </div>
  ),
};

export const OverMax: Story = {
  render: () => (
    <Badge count={120} max={99} color="error">
      <IconButton><ShoppingCartIcon /></IconButton>
    </Badge>
  ),
};

export const ShowZero: Story = {
  render: () => (
    <Badge count={0} showZero color="primary">
      <IconButton><NotificationsIcon /></IconButton>
    </Badge>
  ),
};

export const Invisible: Story = {
  render: () => (
    <Badge count={5} invisible>
      <IconButton><MailIcon /></IconButton>
    </Badge>
  ),
};
