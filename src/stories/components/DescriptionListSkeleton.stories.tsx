import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Box from '@mui/material/Box';
import { DescriptionListSkeleton } from '../../components/DescriptionList/DescriptionListSkeleton';
import type { DescriptionListSkeletonProps } from '../../components/DescriptionList/DescriptionListSkeleton';

const meta: Meta<DescriptionListSkeletonProps> = {
  title: 'Components / Description List / DescriptionListSkeleton',
  component: DescriptionListSkeleton,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: {
    rowCount: 3,
    title: false,
    density: 'default',
    withAction: false,
    responsive: true,
  },
  argTypes: {
    rowCount:   { control: { type: 'number', min: 1, max: 8 } },
    title:      { control: 'boolean' },
    density:    { control: 'select', options: ['condensed', 'default', 'spaced'] },
    withAction: { control: 'boolean' },
    responsive: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<DescriptionListSkeletonProps>;

const wrap = (children: React.ReactNode) => (
  <Box sx={{ maxWidth: 768 }}>{children}</Box>
);

/** Default — three rows, no title, equal columns. Use `rowCount` to match the real list. */
export const Default: Story = {
  render: (args) => wrap(<DescriptionListSkeleton {...args} />),
};

/** With title — a heading placeholder is shown above the rows. */
export const WithTitle: Story = {
  args: { title: true },
  render: (args) => wrap(<DescriptionListSkeleton {...args} />),
};

/** With action — a short placeholder is appended to each row value. Use when the real list has edit actions. */
export const WithAction: Story = {
  args: { title: true, withAction: true, rowCount: 2 },
  render: (args) => wrap(<DescriptionListSkeleton {...args} />),
};

/** All three density options stacked — condensed (8px), default (12px), spaced (16px). */
export const AllDensities: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, maxWidth: 768 }}>
      {(['condensed', 'default', 'spaced'] as const).map((density) => (
        <Box key={density}>
          <DescriptionListSkeleton density={density} title rowCount={3} />
        </Box>
      ))}
    </Box>
  ),
};
