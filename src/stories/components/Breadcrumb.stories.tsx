import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumb } from '../../components/Breadcrumb';
import type { BreadcrumbProps } from '../../components/Breadcrumb';

const LONG_ITEMS = [
  { label: 'Home', href: '#' },
  { label: 'Investments', href: '#' },
  { label: 'Retirement Options', href: '#' },
  { label: 'Conservative', href: '#' },
  { label: 'Overview' },
];

type BreadcrumbStoryArgs = Omit<BreadcrumbProps, 'items' | 'separator'> & {
  separator: string;
  crumb1: string;
  crumb2: string;
  crumb3: string;
  crumb4: string;
  currentPage: string;
};

const meta: Meta<BreadcrumbStoryArgs> = {
  title: 'Public web / Breadcrumb',
  // Custom story args differ from BreadcrumbProps (we build items from crumb1..crumb4)
  // so Storybook's strict ComponentType<CustomArgs> check rejects the real component.
  component: Breadcrumb as never,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: "Navigation aid showing the user's current location within a hierarchy. The last item is the current page and is never a link.",
      },
    },
  },
  argTypes: {
    crumb1: { control: 'text', description: 'First breadcrumb label (always a link).' },
    crumb2: { control: 'text', description: 'Second breadcrumb label. Leave empty to hide.' },
    crumb3: { control: 'text', description: 'Third breadcrumb label. Leave empty to hide.' },
    crumb4: { control: 'text', description: 'Fourth breadcrumb label. Leave empty to hide.' },
    currentPage: { control: 'text', description: 'Current page label — rendered as text, not a link.' },
    separator: {
      control: 'select',
      options: ['/', '›', '→', '·'],
      description: 'Character used to separate items.',
    },
    maxItems: {
      control: 'number',
      description: 'Maximum items shown before collapsing middle items.',
    },
    'aria-label': { control: 'text', description: 'Accessible label for the nav element.' },
  },
};

export default meta;
type Story = StoryObj<BreadcrumbStoryArgs>;

export const Default: Story = {
  render: ({ separator, maxItems, 'aria-label': ariaLabel, crumb1, crumb2, crumb3, crumb4, currentPage }) => {
    const items = [
      crumb1 ? { label: crumb1, href: '#' } : null,
      crumb2 ? { label: crumb2, href: '#' } : null,
      crumb3 ? { label: crumb3, href: '#' } : null,
      crumb4 ? { label: crumb4, href: '#' } : null,
      currentPage ? { label: currentPage } : null,
    ].filter((item): item is NonNullable<typeof item> => item !== null);

    return (
      <Breadcrumb
        items={items}
        separator={separator}
        maxItems={maxItems}
        aria-label={ariaLabel}
      />
    );
  },
  args: {
    crumb1: 'Home',
    crumb2: 'Products',
    crumb3: '',
    crumb4: '',
    currentPage: 'Overview',
    separator: '/',
    maxItems: 8,
    'aria-label': 'breadcrumb',
  },
};

export const LongPath: Story = {
  name: 'Long path — collapse behaviour',
  render: () => (
    <Breadcrumb items={LONG_ITEMS} maxItems={3} />
  ),
};

export const Separators: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Breadcrumb items={LONG_ITEMS.slice(0, 3)} separator="/" />
      <Breadcrumb items={LONG_ITEMS.slice(0, 3)} separator="›" />
      <Breadcrumb items={LONG_ITEMS.slice(0, 3)} separator="→" />
      <Breadcrumb items={LONG_ITEMS.slice(0, 3)} separator="·" />
    </div>
  ),
};

export const SingleLevel: Story = {
  name: 'Single level',
  render: () => (
    <Breadcrumb items={[{ label: 'Home', href: '#' }, { label: 'Overview' }]} />
  ),
};
