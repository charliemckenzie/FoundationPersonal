import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from '../../components/Accordion';

const SAMPLE_ITEMS = [
  { id: 'panel-1', title: 'What is Foundation?', content: 'Foundation is the design system powering all UX prototypes. It provides a consistent set of components built on MUI.' },
  { id: 'panel-2', title: 'How do I use a component?', content: 'Import from src/components, pass the required props, and refer to the Storybook story for examples.' },
  { id: 'panel-3', title: 'How do I request a new component?', content: 'Talk to Smithers. All new component requests start with Smithers, who routes to Moe for design system approval before Lenny builds it.' },
];

const meta: Meta<typeof Accordion> = {
  title: 'Components / Accordion',
  component: Accordion,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  args: { items: SAMPLE_ITEMS },
};

export const DefaultExpanded: Story = {
  args: { items: SAMPLE_ITEMS, defaultExpanded: 'panel-1' },
};

export const WithDisabledItem: Story = {
  args: {
    items: [
      ...SAMPLE_ITEMS.slice(0, 2),
      { id: 'panel-3', title: 'Locked section (disabled)', content: 'This panel is disabled.', disabled: true },
    ],
  },
};

export const SingleItem: Story = {
  args: {
    items: [{ id: 'single', title: 'Single panel', content: 'Just one panel, expanded by default.', }],
    defaultExpanded: 'single',
  },
};

export const MultipleExpanded: Story = {
  name: 'Close All — multiple open',
  render: () => (
    <Accordion
      items={SAMPLE_ITEMS}
      defaultExpanded="panel-1"
    />
  ),
};
