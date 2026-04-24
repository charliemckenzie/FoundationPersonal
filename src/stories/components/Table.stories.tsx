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
};

export default meta;
type Story = StoryObj<typeof Table<User>>;

export const Default: Story = {
  render: () => <Table columns={COLUMNS} rows={ROWS} />,
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
