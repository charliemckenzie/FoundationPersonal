import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ExpandableItem } from '../../../components/ExpandableItem';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const meta: Meta<typeof ExpandableItem> = {
  title: 'Components / Expandable / ExpandableItem',
  component: ExpandableItem,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    onChange: { table: { disable: true } },
    disabled: { control: 'boolean' },
    defaultExpanded: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof ExpandableItem>;

export const Default: Story = {
  args: {
    label: 'Show details',
    children: 'This content slides in when you click the label above.',
  },
};

export const DefaultExpanded: Story = {
  args: {
    label: 'Already expanded',
    children: 'Content is visible on first render.',
    defaultExpanded: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Cannot expand',
    children: 'This item is disabled.',
    disabled: true,
  },
};

export const Controlled: Story = {
  render: () => {
    const [expanded, setExpanded] = useState(false);
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <ExpandableItem
          label="Controlled item"
          expanded={expanded}
          onChange={setExpanded}
        >
          Content is controlled by parent state.
        </ExpandableItem>
        <Typography variant="body">State: {expanded ? 'Expanded' : 'Collapsed'}</Typography>
      </Box>
    );
  },
};

export const MultipleItems: Story = {
  name: 'Multiple Items',
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <ExpandableItem label="What is this component?">
        ExpandableItem is a single show/hide disclosure widget. Click the label to expand or collapse content.
      </ExpandableItem>
      <ExpandableItem label="When should I use it?">
        Use ExpandableItem for inline content that users can reveal on demand. Unlike Accordion, this component has no borders or visual decoration — just a bold label with a rotating chevron.
      </ExpandableItem>
      <ExpandableItem label="How is it different from Accordion?" defaultExpanded>
        Accordion is designed for groups of collapsible sections with borders and elevated backgrounds. ExpandableItem is minimal — perfect for single disclosures in body text or subtle expansions that don't need visual weight.
      </ExpandableItem>
    </Box>
  ),
};

export const WithRichContent: Story = {
  name: 'With Rich Content',
  render: () => (
    <ExpandableItem label="Technical specifications">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography variant="body" sx={{ fontWeight: 600 }}>Performance</Typography>
        <Typography variant="body">Renders in under 16ms on modern browsers</Typography>
        <Typography variant="body" sx={{ fontWeight: 600, mt: 1 }}>Accessibility</Typography>
        <Typography variant="body">WCAG 2.2 AA compliant with full keyboard navigation</Typography>
        <Typography variant="body" sx={{ fontWeight: 600, mt: 1 }}>Browser Support</Typography>
        <Typography variant="body">Chrome 90+, Firefox 88+, Safari 14+, Edge 90+</Typography>
      </Box>
    </ExpandableItem>
  ),
};
