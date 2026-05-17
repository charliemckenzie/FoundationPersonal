import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from '../../../components/Accordion';
import type { AccordionProps } from '../../../components/Accordion';
import { Button } from '../../../components/Button';

const SAMPLE_ITEMS = [
  { id: 'panel-1', title: 'What is Foundation?', content: 'Foundation is the design system powering all UX prototypes. It provides a consistent set of components built on MUI.' },
  { id: 'panel-2', title: 'How do I use a component?', content: 'Import from src/components, pass the required props, and refer to the Storybook story for examples.' },
  { id: 'panel-3', title: 'How do I request a new component?', content: 'Talk to Smithers. All new component requests start with Smithers, who routes to Moe for design system approval before Lenny builds it.' },
];

type DefaultExpandedOption = 'none' | 'panel-1' | 'panel-2' | 'panel-3' | 'single';

type AccordionStoryArgs = Omit<AccordionProps, 'defaultExpanded'> & {
  items?: AccordionProps['items'];
  defaultExpanded: DefaultExpandedOption;
  showActions: boolean;
};

const meta: Meta<AccordionStoryArgs> = {
  title: 'Components / Expandable / Accordion',
  // Custom story args differ from AccordionProps (defaultExpanded uses a story-local
  // enum, plus a showActions toggle). Cast bypasses the strict ComponentType check.
  component: Accordion as never,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    items: { table: { disable: true } },
    onChange: { table: { disable: true } },
    variant: {
      control: 'radio',
      options: ['default', 'exclusive'],
      description: 'exclusive — only one panel can be open at a time.',
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
    showActions: {
      control: 'boolean',
      description: 'Add action buttons (e.g. Cancel / Confirm) to the bottom of each panel.',
    },
  },
};

export default meta;
type Story = StoryObj<AccordionStoryArgs>;

const ACTIONS = (
  <>
    <Button label="Cancel" variant="outlined" size="small" />
    <Button label="Confirm" variant="contained" size="small" />
  </>
);

export const Default: Story = {
  render: ({ defaultExpanded, showCloseAll, variant, showActions }) => (
    <Accordion
      key={`${defaultExpanded}-${variant}-${showActions}`}
      items={SAMPLE_ITEMS.map((item) => ({ ...item, actions: showActions ? ACTIONS : undefined }))}
      defaultExpanded={defaultExpanded === 'none' ? undefined : defaultExpanded}
      showCloseAll={showCloseAll}
      variant={variant}
    />
  ),
  args: {
    variant: 'default',
    defaultExpanded: 'none',
    showCloseAll: false,
    showActions: false,
  },
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
    items: [{ id: 'single', title: 'Single panel', content: 'Just one panel, expanded by default.' }],
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

export const Disabled: Story = {
  name: 'Disabled panels',
  render: () => (
    <Accordion
      defaultExpanded="panel-1"
      items={[
        { id: 'panel-1', title: 'Active panel', content: 'This panel is active and can be expanded or collapsed.' },
        { id: 'panel-2', title: 'Disabled panel', content: 'This content is not reachable.', disabled: true },
        { id: 'panel-3', title: 'Another active panel', content: 'This panel is also active.' },
      ]}
    />
  ),
};

export const WithActions: Story = {
  name: 'With action buttons',
  render: () => (
    <Accordion
      defaultExpanded="panel-1"
      items={[
        {
          id: 'panel-1',
          title: 'Terms and conditions',
          content: 'By proceeding you agree to the terms and conditions of this service. Please read carefully before accepting.',
          actions: (
            <>
              <Button label="Cancel" variant="outlined" size="small" />
              <Button label="I agree" variant="contained" size="small" />
            </>
          ),
        },
        {
          id: 'panel-2',
          title: 'Privacy policy',
          content: 'We collect only the information necessary to deliver our services. Your data is never sold to third parties.',
          actions: (
            <>
              <Button label="Decline" variant="outlined" size="small" />
              <Button label="Accept" variant="contained" size="small" />
            </>
          ),
        },
        {
          id: 'panel-3',
          title: 'No action buttons',
          content: 'This panel has no actions — the footer does not render when actions is omitted.',
        },
      ]}
    />
  ),
};
