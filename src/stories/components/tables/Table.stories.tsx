import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Table } from '../../../components/Table';
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
  { id: 1, name: 'Homer Simpson',   email: 'homer@springfield.gov',  role: 'Safety Inspector', status: 'active' },
  { id: 2, name: 'Marge Simpson',   email: 'marge@simpson.com',      role: 'Designer',         status: 'active' },
  { id: 3, name: 'Bart Simpson',    email: 'bart@springfield.edu',   role: 'Student',          status: 'inactive' },
  { id: 4, name: 'Lisa Simpson',    email: 'lisa@springfield.edu',   role: 'Student',          status: 'active' },
  { id: 5, name: 'Ned Flanders',    email: 'ned@flanders.com',       role: 'Neighbour',        status: 'active' },
  { id: 6, name: 'Burns',           email: 'burns@springfield.gov',  role: 'CEO',              status: 'inactive' },
  { id: 7, name: 'Lenny Leonard',   email: 'lenny@springfield.gov',  role: 'Safety Inspector', status: 'active' },
  { id: 8, name: 'Carl Carlson',    email: 'carl@springfield.gov',   role: 'Safety Inspector', status: 'active' },
  { id: 9, name: 'Moe Szyslak',     email: 'moe@tavern.com',         role: 'Barkeep',          status: 'active' },
];

const COLUMNS: TableColumn<User>[] = [
  { key: 'name',   label: 'Name',  sortable: true },
  { key: 'email',  label: 'Email', sortable: true },
  { key: 'role',   label: 'Role',  sortable: true },
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

// ─── Wide data set for overflow / responsive story ───────────────────────────

interface Transaction {
  id: number;
  date: string;
  description: string;
  amount: string;
  category: string;
  account: string;
  reference: string;
  status: string;
}

const TRANSACTION_COLUMNS: TableColumn<Transaction>[] = [
  { key: 'date',        label: 'Date',         width: 120 },
  { key: 'description', label: 'Description',  width: 200 },
  { key: 'amount',      label: 'Amount (AUD)', width: 140, align: 'right' },
  { key: 'category',    label: 'Category',     width: 160 },
  { key: 'account',     label: 'Account',      width: 180 },
  { key: 'reference',   label: 'Reference',    width: 160 },
  { key: 'status',      label: 'Status',       width: 110 },
];

const TRANSACTION_ROWS: Transaction[] = [
  { id: 1, date: '2026-05-01', description: 'Employer contribution',  amount: '$1,200.00', category: 'Contribution', account: 'Super Account',      reference: 'REF-00001', status: 'Completed' },
  { id: 2, date: '2026-05-05', description: 'Investment earnings',    amount: '$348.50',   category: 'Earnings',     account: 'Investment Account', reference: 'REF-00002', status: 'Completed' },
  { id: 3, date: '2026-05-10', description: 'Insurance premium',      amount: '-$45.00',   category: 'Insurance',    account: 'Super Account',      reference: 'REF-00003', status: 'Pending' },
  { id: 4, date: '2026-05-15', description: 'Voluntary contribution', amount: '$500.00',   category: 'Contribution', account: 'Super Account',      reference: 'REF-00004', status: 'Completed' },
];

// ────────────────────────────────────────────────────────────────────────────

const meta: Meta<typeof Table> = {
  title: 'Components / Tables / Table',
  component: Table,
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
    },
    stripeDirection: {
      control: 'select',
      options: ['row', 'column'],
      description: "Direction of striping when striped is true. 'row' alternates rows, 'column' alternates columns.",
    },
    bordered: {
      control: 'boolean',
      description: 'Adds vertical column separators for a full grid appearance.',
      table: { defaultValue: { summary: 'false' } },
    },
    stickyHeader: {
      control: 'boolean',
      description: 'Pins the header row when the table scrolls.',
    },
    containerMaxHeight: {
      control: 'text',
      description: 'Max height of the scroll container. Required for sticky header.',
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
type Story = StoryObj<typeof Table<User>>;

export const Default: Story = {
  args: { density: 'default', striped: false, bordered: false, stickyHeader: false },
  render: (args) => <Table {...args} columns={COLUMNS} rows={ROWS.slice(0, 4)} />,
};

export const HeaderStyles: Story = {
  name: 'Header Styles',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>
        <p style={{ marginBottom: 8, fontWeight: 600 }}>Primary (default)</p>
        <Table columns={COLUMNS} rows={ROWS.slice(0, 4)} headerStyle="primary" />
      </div>
      <div>
        <p style={{ marginBottom: 8, fontWeight: 600 }}>Paper</p>
        <Table columns={COLUMNS} rows={ROWS.slice(0, 4)} headerStyle="paper" />
      </div>
    </div>
  ),
};

export const Striped: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>
        <p style={{ marginBottom: 8, fontWeight: 600 }}>Row striped</p>
        <Table columns={COLUMNS} rows={ROWS.slice(0, 5)} striped />
      </div>
      <div>
        <p style={{ marginBottom: 8, fontWeight: 600 }}>Column striped</p>
        <Table columns={COLUMNS} rows={ROWS.slice(0, 5)} striped stripeDirection="column" />
      </div>
    </div>
  ),
};

export const Bordered: Story = {
  name: 'Bordered',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>
        <p style={{ marginBottom: 8, fontWeight: 600 }}>Bordered</p>
        <Table columns={COLUMNS} rows={ROWS.slice(0, 5)} bordered />
      </div>
      <div>
        <p style={{ marginBottom: 8, fontWeight: 600 }}>Bordered + Row striped</p>
        <Table columns={COLUMNS} rows={ROWS.slice(0, 5)} bordered striped />
      </div>
    </div>
  ),
};

export const Density: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>
        <p style={{ marginBottom: 8, fontWeight: 600 }}>Condensed</p>
        <Table columns={COLUMNS} rows={ROWS.slice(0, 4)} density="condensed" />
      </div>
      <div>
        <p style={{ marginBottom: 8, fontWeight: 600 }}>Default</p>
        <Table columns={COLUMNS} rows={ROWS.slice(0, 4)} density="default" />
      </div>
      <div>
        <p style={{ marginBottom: 8, fontWeight: 600 }}>Spaced</p>
        <Table columns={COLUMNS} rows={ROWS.slice(0, 4)} density="spaced" />
      </div>
    </div>
  ),
};

export const Sortable: Story = {
  name: 'Column Sorting',
  render: () => (
    <Table
      columns={COLUMNS.map((col) => ({ ...col, sortable: col.key !== 'status' }))}
      rows={ROWS.slice(0, 4)}
    />
  ),
};

export const StickyHeader: Story = {
  render: () => (
    <Table
      columns={COLUMNS}
      rows={[...ROWS, ...ROWS, ...ROWS]}
      stickyHeader
      containerMaxHeight={250}
    />
  ),
};

export const OverflowScroll: Story = {
  name: 'Overflow Scroll',
  render: () => (
    <div style={{ maxWidth: 520 }}>
      <p style={{ marginBottom: 12, fontSize: 14, color: '#666' }}>
        Container constrained to 520px — table scrolls horizontally on overflow.
      </p>
      <Table<Transaction> columns={TRANSACTION_COLUMNS} rows={TRANSACTION_ROWS} />
    </div>
  ),
};

// ─── Pagination ──────────────────────────────────────────────────────────────

export const Pagination: Story = {
  name: 'Pagination',
  render: () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const paginated = ROWS.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
      <Table
        columns={COLUMNS}
        rows={paginated}
        pagination={{
          count: ROWS.length,
          page,
          rowsPerPage,
          onPageChange: setPage,
          onRowsPerPageChange: (rpp) => {
            setRowsPerPage(rpp);
            setPage(0);
          },
          rowsPerPageOptions: [5, 10, { value: -1, label: 'All' }],
        }}
      />
    );
  },
};

export const PaginationStickyHeader: Story = {
  name: 'Pagination + Sticky Header',
  render: () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const allRows = [...ROWS, ...ROWS, ...ROWS];
    const paginated = allRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
      <Table
        columns={COLUMNS}
        rows={paginated}
        stickyHeader
        containerMaxHeight={300}
        pagination={{
          count: allRows.length,
          page,
          rowsPerPage,
          onPageChange: setPage,
          onRowsPerPageChange: (rpp) => {
            setRowsPerPage(rpp);
            setPage(0);
          },
        }}
      />
    );
  },
};
