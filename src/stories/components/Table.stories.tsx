import type { Meta, StoryObj } from '@storybook/react';
import { Table } from '../../components/Table';
import { Chip } from '../../components/Chip';
import type { TableColumn } from '../../components/Table';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
}

const ROWS: User[] = [
  { id: 1, name: 'Homer Simpson', email: 'homer@springfield.gov', role: 'Safety Inspector', status: 'active' },
  { id: 2, name: 'Marge Simpson', email: 'marge@simpson.com', role: 'Designer', status: 'active' },
  { id: 3, name: 'Bart Simpson', email: 'bart@springfield.edu', role: 'Student', status: 'inactive' },
  { id: 4, name: 'Lisa Simpson', email: 'lisa@springfield.edu', role: 'Student', status: 'active' },
];

const COLUMNS: TableColumn<User>[] = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role' },
  {
    key: 'status',
    label: 'Status',
    render: (row) => (
      <Chip
        label={row.status}
        color={row.status === 'active' ? 'success' : 'default'}
        size="small"
      />
    ),
  },
];

const meta: Meta<typeof Table> = {
  title: 'Components / Table',
  component: Table,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    density: {
      control: 'select',
      options: ['condensed', 'default', 'spaced'],
      description: 'Vertical cell padding size.',
    },
    striped: {
      control: 'boolean',
      description: 'Alternates row background colour.',
    },
    horizontalPadding: {
      control: 'boolean',
      description: 'Include horizontal cell padding.',
    },
    stickyHeader: {
      control: 'boolean',
      description: 'Pins the header row when the table scrolls.',
    },
    loading: {
      control: 'boolean',
      description: 'Shows a loading spinner and marks the table as busy.',
    },
    emptyMessage: {
      control: 'text',
      description: 'Message shown when rows is empty.',
    },
    columns: { table: { disable: true } },
    rows: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof Table<User>>;

export const Default: Story = {
  args: {
    density: 'default',
    striped: false,
    horizontalPadding: true,
    stickyHeader: false,
    loading: false,
    emptyMessage: 'No data to display.',
  },
  render: (args) => <Table {...args} columns={COLUMNS} rows={ROWS} />,
};

export const Striped: Story = {
  render: () => <Table columns={COLUMNS} rows={ROWS} striped />,
};

export const Density: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>
        <p style={{ marginBottom: 8, fontWeight: 600 }}>Condensed</p>
        <Table columns={COLUMNS} rows={ROWS} density="condensed" />
      </div>
      <div>
        <p style={{ marginBottom: 8, fontWeight: 600 }}>Default</p>
        <Table columns={COLUMNS} rows={ROWS} density="default" />
      </div>
      <div>
        <p style={{ marginBottom: 8, fontWeight: 600 }}>Spaced</p>
        <Table columns={COLUMNS} rows={ROWS} density="spaced" />
      </div>
    </div>
  ),
};

export const NoHorizontalPadding: Story = {
  render: () => <Table columns={COLUMNS} rows={ROWS} horizontalPadding={false} />,
};

export const KitchenSink: Story = {
  name: 'Kitchen Sink',
  render: () => <Table columns={COLUMNS} rows={ROWS} striped density="condensed" horizontalPadding={false} />,
};

export const Loading: Story = {
  render: () => <Table columns={COLUMNS} rows={[]} loading />,
};

export const Empty: Story = {
  render: () => <Table columns={COLUMNS} rows={[]} emptyMessage="No users found." />,
};

export const StickyHeader: Story = {
  render: () => (
    <div style={{ maxHeight: 200, overflow: 'auto' }}>
      <Table columns={COLUMNS} rows={[...ROWS, ...ROWS, ...ROWS]} stickyHeader />
    </div>
  ),
};
