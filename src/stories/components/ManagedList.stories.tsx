import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Box from '@mui/material/Box';
import { ManagedList } from '../../components/ManagedList';
import type { ManagedListProps } from '../../components/ManagedList/ManagedList.types';

const meta: Meta<ManagedListProps> = {
  title: 'Components / Managed List / ManagedList',
  component: ManagedList,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    icon:         { control: 'text' },
    iconStyle:    { control: 'radio', options: ['solid', 'regular', 'light'] },
    title:        { control: 'text' },
    description:  { control: 'text' },
    href:         { control: 'text' },
    emptyMessage: { control: 'text' },
    addLabel:     { control: 'text' },
    addIcon:      { control: 'text' },
    metadataVariant: { control: 'radio', options: ['row', 'column'] },
    loading:      { control: 'boolean' },
    loadingItemCount: { control: { type: 'number', min: 1, max: 6 } },
    items:        { table: { disable: true } },
    onAdd:        { table: { disable: true } },
    onRemoveAll:  { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<ManagedListProps>;

const noop = () => undefined;

/** Empty state — shown when no items have been added yet. */
export const EmptyState: Story = {
  args: {
    icon: 'lock',
    title: 'Authenticator app',
    description: 'A more secure way to verify your identity',
    items: [],
    emptyMessage: 'No authenticator app added',
    addLabel: 'Add authenticator app',
    onAdd: noop,
  },
  render: (args) => (
    <Box sx={{ maxWidth: 600 }}>
      <ManagedList {...args} />
    </Box>
  ),
};

/** Single item with edit and delete actions, and a badge marking the current device. */
export const WithEditAndDelete: Story = {
  args: {
    icon: 'key',
    title: 'Passkeys',
    description: 'Manage your passkeys for faster, more secure sign-in',
    href: '/settings/passkeys',
    items: [
      {
        id: '1',
        icon: 'key',
        name: 'Chrome on Windows Desktop',
        badge: 'This device',
        metadata: ['Stored in Windows Hello', 'Created 19 Mar 2026', 'Last used Today'],
        onEdit: noop,
        onDelete: noop,
      },
      {
        id: '2',
        icon: 'key',
        name: 'Chrome on Windows Desktop',
        metadata: ['Created 20 Mar 2026', 'Last used Yesterday'],
        onEdit: noop,
        onDelete: noop,
      },
    ],
    addLabel: 'Add passkey',
    onAdd: noop,
  },
  render: (args) => (
    <Box sx={{ maxWidth: 600 }}>
      <ManagedList {...args} />
    </Box>
  ),
};

/** Multiple items with delete only — edit is not available for these credential types. */
export const DeleteOnly: Story = {
  args: {
    icon: 'key',
    title: 'Passkeys',
    description: 'Manage your passkeys for faster, more secure sign-in',
    href: '/settings/passkeys',
    items: [
      {
        id: '1',
        icon: 'key',
        name: 'Chrome on Windows Desktop',
        badge: 'This device',
        metadata: ['Stored in Windows Hello', 'Created 19 Mar 2026', 'Last used Today'],
        onDelete: noop,
      },
      {
        id: '2',
        icon: 'house',
        name: 'Safari on iPhone',
        metadata: ['Created 20 Mar 2026', 'Last used Yesterday'],
        onDelete: noop,
      },
      {
        id: '3',
        icon: 'key',
        name: 'Firefox on macOS',
        metadata: ['Created 15 Mar 2026', 'Last used 5 days ago'],
        onDelete: noop,
      },
    ],
    addLabel: 'Add passkey',
    onAdd: noop,
  },
  render: (args) => (
    <Box sx={{ maxWidth: 600 }}>
      <ManagedList {...args} />
    </Box>
  ),
};

/** Split footer — shown when a bulk remove action is available alongside the add action. */
export const WithRemoveAll: Story = {
  args: {
    icon: 'key',
    title: 'Passkeys',
    description: 'Manage your passkeys for faster, more secure sign-in',
    href: '/settings/passkeys',
    items: [
      {
        id: '1',
        icon: 'key',
        name: 'Chrome on Windows Desktop',
        badge: 'This device',
        metadata: ['Stored in Windows Hello', 'Created 19 Mar 2026', 'Last used Today'],
        onDelete: noop,
      },
    ],
    addLabel: 'Add passkey',
    onAdd: noop,
    onRemoveAll: noop,
  },
  render: (args) => (
    <Box sx={{ maxWidth: 600 }}>
      <ManagedList {...args} />
    </Box>
  ),
};


/** Beneficiary variant — column metadata, right-aligned allocation, panel-level Update and Delete footer actions. */
export const BeneficiaryVariant: Story = {
  args: {
    icon: 'users',
    title: 'Your binding nominations',
    description: 'Submitted 18 Apr 2026',
    itemVariant: 'list',
    metadataVariant: 'column',
    items: [
      {
        id: '1',
        name: 'Jane Smith',
        metadata: ['Spouse · Age: 42', '0400 000 000 · jane.smith@example.com'],
        allocation: { label: 'Allocation', value: '60%' },
      },
      {
        id: '2',
        name: 'Legal Personal Representative',
        metadata: [],
        allocation: { label: 'Allocation', value: '40%' },
      },
    ],
    addLabel: 'Update',
    addIcon: 'pen',
    onAdd: noop,
    onRemoveAll: noop,
    removeAllLabel: 'Delete',
  },
  render: (args) => (
    <Box sx={{ maxWidth: 600 }}>
      <ManagedList {...args} />
    </Box>
  ),
};

/**
 * Loading state — set `loading` to render a skeleton placeholder that mirrors the panel layout.
 * Uses the base `Skeleton` component. `loadingItemCount` controls the number of placeholder rows.
 * `splitFooter` and the header chevron are inferred from `onRemoveAll` and `href`.
 */
export const Loading: Story = {
  args: {
    icon: 'key',
    title: 'Passkeys',
    description: 'Manage your passkeys for faster, more secure sign-in',
    href: '/settings/passkeys',
    items: [],
    addLabel: 'Add passkey',
    onAdd: noop,
    onRemoveAll: noop,
    loading: true,
    loadingItemCount: 3,
  },
  render: (args) => (
    <Box sx={{ maxWidth: 600 }}>
      <ManagedList {...args} />
    </Box>
  ),
};

/** Loading state for the connected `list` variant — placeholder rows joined with dividers. */
export const LoadingListVariant: Story = {
  args: {
    icon: 'users',
    title: 'Your binding nominations',
    description: 'Loading your nominations…',
    itemVariant: 'list',
    items: [],
    addLabel: 'Update',
    addIcon: 'pen',
    onAdd: noop,
    onRemoveAll: noop,
    loading: true,
    loadingItemCount: 2,
  },
  render: (args) => (
    <Box sx={{ maxWidth: 600 }}>
      <ManagedList {...args} />
    </Box>
  ),
};

/** Connected list variant — items joined with dividers inside a bordered group, no individual card borders. Split footer shows Edit and Remove all actions. */
export const Connected: Story = {
  args: {
    icon: 'gift',
    title: 'Beneficiaries',
    description: 'Nominate who should receive your super if you pass away',
    itemVariant: 'list',
    metadataVariant: 'column',
    items: [
      {
        id: '1',
        name: 'Sarah Nguyen',
        metadata: ['Relationship: Spouse', 'Allocation: 60%'],
        onEdit: noop,
        onDelete: noop,
      },
      {
        id: '2',
        name: 'James Nguyen',
        metadata: ['Relationship: Child', 'Allocation: 40%'],
        onEdit: noop,
        onDelete: noop,
      },
    ],
    addLabel: 'Edit',
    addIcon: 'pen',
    onAdd: noop,
    onRemoveAll: noop,
  },
  render: (args) => (
    <Box sx={{ maxWidth: 600 }}>
      <ManagedList {...args} />
    </Box>
  ),
};
