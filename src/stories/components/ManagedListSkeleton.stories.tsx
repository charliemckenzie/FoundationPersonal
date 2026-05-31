import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Box from '@mui/material/Box';
import { ManagedListSkeleton } from '../../components/ManagedList/ManagedListSkeleton';
import type { ManagedListSkeletonProps } from '../../components/ManagedList/ManagedListSkeleton';

const meta: Meta<ManagedListSkeletonProps> = {
  title: 'Components / Managed List / ManagedListSkeleton',
  component: ManagedListSkeleton,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    itemCount:     { control: { type: 'number', min: 1, max: 6 } },
    itemVariant:   { control: 'radio', options: ['card', 'list'] },
    splitFooter:   { control: 'boolean' },
    hasHeaderLink: { control: 'boolean' },
  },
  args: {
    itemCount: 3,
    itemVariant: 'card',
    splitFooter: false,
    hasHeaderLink: false,
  },
};

export default meta;
type Story = StoryObj<ManagedListSkeletonProps>;

const wrap = (children: React.ReactNode) => (
  <Box sx={{ maxWidth: 600 }}>{children}</Box>
);

/** Default card variant — three placeholder rows with single-action footer. */
export const Default: Story = {
  render: (args) => wrap(<ManagedListSkeleton {...args} />),
};

/** Card variant with header chevron link and split footer (two actions). */
export const WithHeaderLinkAndSplitFooter: Story = {
  args: { hasHeaderLink: true, splitFooter: true },
  render: (args) => wrap(<ManagedListSkeleton {...args} />),
};

/** Connected list variant — placeholder rows joined with dividers. Used for beneficiaries and similar. */
export const ListVariant: Story = {
  args: { itemVariant: 'list', itemCount: 2, splitFooter: true },
  render: (args) => wrap(<ManagedListSkeleton {...args} />),
};

/** Single item — minimal placeholder for short lists. */
export const SingleItem: Story = {
  args: { itemCount: 1 },
  render: (args) => wrap(<ManagedListSkeleton {...args} />),
};
