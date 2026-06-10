import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Box from '@mui/material/Box';
import { LinkRow } from '../../components/LinkRow';
import type { LinkRowProps } from '../../components/LinkRow';

const meta: Meta<LinkRowProps> = {
  title: 'Member Online / Target State / LinkRow',
  component: LinkRow,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A full-width navigation row with an icon, label, optional description, and a trailing arrow. Renders as a native `<a>` when `href` is supplied; as a `<button>` otherwise.',
      },
    },
  },
  argTypes: {
    icon: { control: 'text' },
    iconStyle: {
      control: 'select',
      options: ['solid', 'regular', 'light', 'thin', 'duotone', 'sharp'],
    },
    href: { control: 'text' },
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<LinkRowProps>;

export const WithLink: Story = {
  name: 'Link (href)',
  args: {
    label: "I'm ready to do this now",
    description: "I'm confident and want to do this quickly",
    icon: 'cursor',
    iconStyle: 'regular',
    href: '#',
  },
};

export const WithAction: Story = {
  name: 'Action (onClick)',
  args: {
    label: 'I want some guidance making this decision',
    description: 'We can offer you personalised financial advice in 5 minutes.',
    icon: 'magnifying-glass',
    iconStyle: 'regular',
  },
};

export const LabelOnly: Story = {
  name: 'No description',
  args: {
    label: 'View your account',
    icon: 'user',
    iconStyle: 'regular',
    href: '#',
  },
};

export const Stacked: Story = {
  name: 'Stacked group',
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, maxWidth: '42rem' }}>
      <LinkRow
        label="I'm ready to do this now"
        description="I'm confident and want to do this quickly"
        icon="cursor"
        href="#"
      />
      <LinkRow
        label="I want some guidance making this decision"
        description="We can offer you personalised financial advice in 5 minutes."
        icon="magnifying-glass"
        href="#"
      />
    </Box>
  ),
};
