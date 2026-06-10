import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ResponsiveTable } from '../../../components/Table/ResponsiveTable';
import { Chip } from '../../../components/Chip';
import type { TableColumn } from '../../../components/Table';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
}

const ROWS: User[] = [
  { id: 1, name: 'Homer Simpson',  email: 'homer@springfield.gov', role: 'Safety Inspector', status: 'active' },
  { id: 2, name: 'Marge Simpson',  email: 'marge@simpson.com',     role: 'Designer',         status: 'active' },
  { id: 3, name: 'Bart Simpson',   email: 'bart@springfield.edu',  role: 'Student',          status: 'inactive' },
  { id: 4, name: 'Lisa Simpson',   email: 'lisa@springfield.edu',  role: 'Student',          status: 'active' },
  { id: 5, name: 'Ned Flanders',   email: 'ned@flanders.com',      role: 'Neighbour',        status: 'active' },
  { id: 6, name: 'Mr Burns',       email: 'burns@springfield.gov', role: 'CEO',              status: 'inactive' },
  { id: 7, name: 'Lenny Leonard',  email: 'lenny@springfield.gov', role: 'Safety Inspector', status: 'active' },
  { id: 8, name: 'Carl Carlson',   email: 'carl@springfield.gov',  role: 'Safety Inspector', status: 'active' },
  { id: 9, name: 'Moe Szyslak',    email: 'moe@tavern.com',        role: 'Barkeep',          status: 'active' },
];

const COLUMNS: TableColumn<User>[] = [
  { key: 'name',   label: 'Name'  },
  { key: 'email',  label: 'Email' },
  { key: 'role',   label: 'Role'  },
  {
    key: 'status',
    label: 'Status',
    render: (row) => (
      <Chip
        label={row.status}
        {...(row.status === 'active'
          ? { severity: 'success' as const }
          : { color: 'default' as const })}
        size="small"
      />
    ),
  },
];

const meta: Meta<typeof ResponsiveTable> = {
  title: 'Components / Tables / Responsive Table',
  component: ResponsiveTable,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    headerStyle: {
      control: 'select',
      options: ['primary', 'paper'],
      description: "Header background. `primary` uses the brand colour with contrasting text. `paper` uses the paper surface with bold default text.",
    },
    density: {
      control: 'select',
      options: ['condensed', 'default', 'spaced'],
      description: 'Vertical cell padding size.',
    },
    striped: {
      control: 'boolean',
      description: 'Alternates row background colour.',
      table: { defaultValue: { summary: 'false' } },
    },
    mobileLabel: {
      control: 'select',
      options: ['name', 'email', 'role', 'status'],
      description: 'Column key used as the mobile accordion header.',
    },
    columns:           { table: { disable: true } },
    rows:              { table: { disable: true } },
    loading:           { table: { disable: true } },
    emptyMessage:      { table: { disable: true } },
    horizontalPadding: { table: { disable: true } },
    pagination:        { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof ResponsiveTable<User>>;

/**
 * On desktop this renders as a standard table. Narrow your browser to below
 * 600px (or use browser DevTools to emulate a mobile viewport) to see each
 * row collapse into an expandable card.
 */
export const Default: Story = {
  args: { density: 'default', striped: false, headerStyle: 'primary' },
  render: (args) => (
    <ResponsiveTable {...args} columns={COLUMNS} rows={ROWS.slice(0, 4)} />
  ),
};

export const HeaderStyles: Story = {
  name: 'Header Styles',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>
        <p style={{ marginBottom: 8, fontWeight: 600 }}>Primary (default)</p>
        <ResponsiveTable columns={COLUMNS} rows={ROWS.slice(0, 4)} headerStyle="primary" />
      </div>
      <div>
        <p style={{ marginBottom: 8, fontWeight: 600 }}>Paper</p>
        <ResponsiveTable columns={COLUMNS} rows={ROWS.slice(0, 4)} headerStyle="paper" />
      </div>
    </div>
  ),
};

export const Striped: Story = {
  render: () => (
    <ResponsiveTable columns={COLUMNS} rows={ROWS.slice(0, 4)} striped />
  ),
};

/**
 * Use `mobileLabel` to choose which column is always visible as the card
 * header on mobile. Here "Role" is the summary column.
 */
export const CustomMobileLabel: Story = {
  name: 'Custom Mobile Summary Column',
  render: () => (
    <ResponsiveTable
      columns={COLUMNS}
      rows={ROWS.slice(0, 4)}
      mobileLabel="role"
    />
  ),
};
