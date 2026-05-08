import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from '../../../components/Accordion';
import type { AccordionProps } from '../../../components/Accordion';

const SAMPLE_ITEMS = [
  { id: 'panel-1', title: 'What is Foundation?', content: 'Foundation is the design system powering all UX prototypes. It provides a consistent set of components built on MUI.' },
  { id: 'panel-2', title: 'How do I use a component?', content: 'Import from src/components, pass the required props, and refer to the Storybook story for examples.' },
  { id: 'panel-3', title: 'How do I request a new component?', content: 'Talk to Smithers. All new component requests start with Smithers, who routes to Moe for design system approval before Lenny builds it.' },
];

type DefaultExpandedOption = 'none' | 'panel-1' | 'panel-2' | 'panel-3';

type AccordionStoryArgs = Omit<AccordionProps, 'defaultExpanded'> & {
  defaultExpanded: DefaultExpandedOption;
};

const meta: Meta<AccordionStoryArgs> = {
  title: 'Components / Expandable / Accordion',
  component: Accordion,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    items: { table: { disable: true } },
    variant: { table: { disable: true } },
    onChange: { table: { disable: true } },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Controls the padding and typography scale of each panel.',
    },
    defaultExpanded: {
      control: 'select',
      options: ['none', 'panel-1', 'panel-2', 'panel-3'],
      description: 'Which panel is open on first render.',
    },
    showCloseAll: {
      control: 'boolean',
      description: 'Show a "Close all" button above the panels.',
    },
  },
};

export default meta;
type Story = StoryObj<AccordionStoryArgs>;

export const Default: Story = {
  render: ({ defaultExpanded, size, showCloseAll }) => (
    <Accordion
      key={defaultExpanded}
      items={SAMPLE_ITEMS}
      defaultExpanded={defaultExpanded === 'none' ? undefined : defaultExpanded}
      size={size}
      showCloseAll={showCloseAll}
    />
  ),
  args: {
    size: 'medium',
    defaultExpanded: 'none',
    showCloseAll: false,
  },
};

export const DefaultExpanded: Story = {
  args: { items: SAMPLE_ITEMS, defaultExpanded: 'panel-1', showCloseAll: false, size: 'medium' },
};

export const Exclusive: Story = {
  name: 'Exclusive — only one open',
  args: {
    items: SAMPLE_ITEMS,
    variant: 'exclusive',
    defaultExpanded: 'panel-1',
    size: 'medium',
  },
};

export const SingleItem: Story = {
  args: {
    items: [{ id: 'single', title: 'Single panel', content: 'Just one panel, expanded by default.' }],
    defaultExpanded: 'single',
    showCloseAll: false,
    size: 'medium',
  },
};

export const MultipleExpanded: Story = {
  name: 'Close All — multiple open',
  render: () => (
    <Accordion
      items={SAMPLE_ITEMS}
      defaultExpanded="panel-1"
      showCloseAll={true}
      size="medium"
    />
  ),
};
