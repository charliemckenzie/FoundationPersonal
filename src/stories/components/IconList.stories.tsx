import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Box from '@mui/material/Box';
import type { IconColor } from '../../components/Icon';
import { IconList } from '../../components/IconList';
import type { IconListItem } from '../../components/IconList';

const ICON_OPTIONS = [
  'arrow-down-to-line', 'arrow-left', 'arrow-right', 'arrow-up-right',
  'bars', 'chart-column', 'chart-line', 'chart-pie',
  'check', 'chevron-down', 'chevron-left', 'chevron-right', 'chevron-up',
  'circle-check', 'circle-dollar', 'circle-exclamation', 'circle-info',
  'circle-minus', 'circle-plus', 'circle-question',
  'ellipsis', 'gift', 'house', 'key', 'lock',
  'magnifying-glass', 'magnifying-glass-dollar',
  'minus', 'piggy-bank', 'plus', 'question',
  'triangle-exclamation', 'umbrella', 'xmark',
] as const;

const COLOR_OPTIONS: IconColor[] = ['primary', 'text.muted'];

const meta: Meta<typeof IconList> = {
  title: 'Components / IconList',
  component: IconList,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    listType: { control: 'select', options: ['ul', 'ol'] },
    size:     { control: 'select', options: ['sm', 'md', 'lg'] },
    items:    { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof IconList>;

type DefaultArgs = React.ComponentProps<typeof IconList> & { showHeading: boolean };

const items: (IconListItem & { heading: string })[] = [
  { icon: 'circle-check', heading: 'Premium access',   text: 'Unlimited access to all features' },
  { icon: 'circle-check', heading: 'Priority support', text: 'Priority customer support' },
  { icon: 'circle-check', heading: 'Reporting',        text: 'Monthly usage reports and exports' },
];

export const Default: StoryObj<DefaultArgs> = {
  argTypes: {
    listType:    { control: 'select', options: ['ul', 'ol'] },
    size:        { control: 'select', options: ['sm', 'md', 'lg'] },
    showHeading: { control: 'boolean' },
    defaultIcon: {
      control: 'select',
      options: ICON_OPTIONS,
      if: { arg: 'listType', eq: 'ul' },
    },
    iconColor: {
      control: 'select',
      options: COLOR_OPTIONS,
    },
    items: { table: { disable: true } },
  },
  args: {
    listType:    'ul',
    size:        'md',
    showHeading: false,
    defaultIcon: 'circle-check',
    iconColor:   'primary',
  },
  render: ({ showHeading, defaultIcon, iconColor, listType, size }) => (
    <IconList
      listType={listType}
      size={size}
      defaultIcon={defaultIcon}
      iconColor={iconColor}
      items={items.map(({ heading, ...item }) => ({
        ...item,
        ...(showHeading ? { heading } : {}),
      }))}
    />
  ),
};

export const Small: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <IconList size="sm" items={items.map(({ heading: _, ...item }) => item)} />
      <IconList size="sm" items={items} />
    </Box>
  ),
};

export const Medium: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <IconList size="md" items={items.map(({ heading: _, ...item }) => item)} />
      <IconList size="md" items={items} />
    </Box>
  ),
};

export const Large: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <IconList size="lg" items={items.map(({ heading: _, ...item }) => item)} />
      <IconList size="lg" items={items} />
    </Box>
  ),
};

export const LongContent: Story = {
  render: () => (
    <IconList
      items={[
        { icon: 'circle-check', text: 'Unlimited access to all features across every plan tier, including advanced analytics, custom reporting, and priority API rate limits that scale with your organisation.' },
        { icon: 'circle-check', text: 'Dedicated customer support with guaranteed response times, a named account manager, and direct access to our engineering team for complex integration queries.' },
        { icon: 'circle-check', text: 'Monthly usage reports and data exports in PDF, CSV, and JSON formats, with automated delivery to your preferred email addresses or cloud storage bucket.' },
      ]}
    />
  ),
};

export const OrderedList: Story = {
  render: () => (
    <IconList
      listType="ol"
      size="md"
      items={[
        { text: 'Create your account and verify your email address.' },
        { text: 'Set up your organisation profile and invite team members.' },
        { text: 'Connect your data sources and configure your first report.' },
      ]}
    />
  ),
};
