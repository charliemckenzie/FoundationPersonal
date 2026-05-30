import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Box from '@mui/material/Box';
import { ManagedListItem } from '../../components/ManagedList/ManagedListItem';
import type { ManagedListItemProps } from '../../components/ManagedList/ManagedList.types';

const meta: Meta<ManagedListItemProps> = {
  title: 'Components / Managed List / ManagedListItem',
  component: ManagedListItem,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: {
    id: '1',
    icon: 'key',
    name: 'Chrome on Windows Desktop',
    metadata: ['Stored in Windows Hello', 'Created 19 Mar 2026', 'Last used Today'],
  },
  argTypes: {
    icon:            { control: 'text' },
    name:            { control: 'text' },
    badge:           { control: 'text' },
    metadataVariant: { control: 'radio', options: ['row', 'column'] },
    metadata:        { table: { disable: true } },
    onEdit:          { table: { disable: true } },
    onDelete:        { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<ManagedListItemProps>;

const noop = () => undefined;

const wrap = (children: React.ReactNode) => (
  <Box sx={{ maxWidth: 600 }}>
    <Box component="ul" sx={{ m: 0, p: 0, listStyle: 'none' }}>
      {children}
    </Box>
  </Box>
);

/** Edit and delete actions with a badge marking the current device. */
export const WithEditAndDelete: Story = {
  args: { badge: 'This device', onEdit: noop, onDelete: noop },
  render: (args) => wrap(<ManagedListItem {...args} />),
};

/** Delete only — edit is not available. */
export const DeleteOnly: Story = {
  args: { onDelete: noop },
  render: (args) => wrap(<ManagedListItem {...args} />),
};

/** No actions — read-only display. */
export const ReadOnly: Story = {
  args: {},
  render: (args) => wrap(<ManagedListItem {...args} />),
};

/** Badge without actions. */
export const BadgeOnly: Story = {
  args: { badge: 'This device' },
  render: (args) => wrap(<ManagedListItem {...args} />),
};

/** Column metadata — each entry stacked on its own line instead of dot-separated. */
export const ColumnMetadata: Story = {
  args: { metadataVariant: 'column', onEdit: noop, onDelete: noop },
  render: (args) => wrap(<ManagedListItem {...args} />),
};

/** Mobile device — different icon. */
export const MobileDevice: Story = {
  args: {
    icon: 'house',
    name: 'Safari on iPhone',
    metadata: ['Created 20 Mar 2026', 'Last used Yesterday'],
    onDelete: noop,
  },
  render: (args) => wrap(<ManagedListItem {...args} />),
};

/** Beneficiary variant — named beneficiary and Legal Personal Representative together. */
export const Beneficiary: Story = {
  render: () => wrap(
    <>
      <ManagedListItem
        id="1"
        name="Jane Smith"
        metadata={['Spouse · Age: 42', '0400 000 000 · jane.smith@example.com']}
        metadataVariant="column"
        allocation={{ label: 'Allocation', value: '60%' }}
      />
      <ManagedListItem
        id="2"
        name="Legal Personal Representative"
        metadata={[]}
        allocation={{ label: 'Allocation', value: '40%' }}
      />
    </>
  ),
};
