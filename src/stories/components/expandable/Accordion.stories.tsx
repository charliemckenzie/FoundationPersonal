import type { Meta, StoryObj } from '@storybook/react';
import Box from '@mui/material/Box';
import { Accordion } from '../../../components/Accordion';

const SAMPLE_ITEMS = [
  { id: 'panel-1', title: 'What is Foundation?', content: 'Foundation is the design system powering all UX prototypes. It provides a consistent set of components built on MUI.' },
  { id: 'panel-2', title: 'How do I use a component?', content: 'Import from src/components, pass the required props, and refer to the Storybook story for examples.' },
  { id: 'panel-3', title: 'How do I request a new component?', content: 'Talk to Smithers. All new component requests start with Smithers, who routes to Moe for design system approval before Lenny builds it.' },
];

const meta: Meta<typeof Accordion> = {
  title: 'Components / Expandable / Accordion',
  component: Accordion,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  decorators: [
    (Story, context) => {
      const bgType = context.globals.backgroundColor || 'default';
      return (
        <Box sx={{ bgcolor: `background.${bgType}`, p: 3, minWidth: 400 }}>
          <Story />
        </Box>
      );
    },
  ],
  argTypes: {
    variant: { table: { disable: true } },
    onChange: { table: { disable: true } },
    defaultExpanded: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  args: { items: SAMPLE_ITEMS, showCloseAll: false },
};

export const DefaultExpanded: Story = {
  args: { items: SAMPLE_ITEMS, defaultExpanded: 'panel-1', showCloseAll: false },
};

export const Exclusive: Story = {
  name: 'Exclusive — only one open',
  args: {
    items: SAMPLE_ITEMS,
    variant: 'exclusive',
    defaultExpanded: 'panel-1',
  },
};

export const SingleItem: Story = {
  args: {
    items: [{ id: 'single', title: 'Single panel', content: 'Just one panel, expanded by default.', }],
    defaultExpanded: 'single',
    showCloseAll: false,
  },
};

export const MultipleExpanded: Story = {
  name: 'Close All — multiple open',
  render: () => (
    <Accordion
      items={SAMPLE_ITEMS}
      defaultExpanded="panel-1"
      showCloseAll={true}
    />
  ),
};
