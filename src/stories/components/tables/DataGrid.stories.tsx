import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { DataGrid } from '../../../components/DataGrid';
import type { DataGridColumn } from '../../../components/DataGrid';
import { Chip } from '../../../components/Chip';
import { PercentageField } from '../../../components/PercentageField';

interface Fund {
  id: string;
  name: string;
  risk: string;
  fee: string;
  status: 'open' | 'closed';
}

const FUNDS: Fund[] = [
  { id: 'aus-shares', name: 'Australian Shares', risk: 'High', fee: '0.70%', status: 'open' },
  { id: 'intl-shares', name: 'International Shares', risk: 'High', fee: '0.74%', status: 'open' },
  { id: 'property', name: 'Property', risk: 'Medium to high', fee: '0.62%', status: 'open' },
  { id: 'bonds', name: 'Diversified Bonds', risk: 'Low to medium', fee: '0.45%', status: 'open' },
  { id: 'cash', name: 'Cash', risk: 'Very low', fee: '0.20%', status: 'closed' },
];

const COLUMNS: DataGridColumn<Fund>[] = [
  { key: 'name', label: 'Option', width: '1fr', sortable: true },
  { key: 'risk', label: 'Risk', width: '10rem', sortable: true },
  { key: 'fee', label: 'Fee p.a.', width: '7rem', align: 'right', sortable: true },
  {
    key: 'status',
    label: 'Status',
    width: '7rem',
    renderCell: (row) => (
      <Chip
        label={row.status}
        size="small"
        {...(row.status === 'open' ? { severity: 'success' as const } : { color: 'default' as const })}
      />
    ),
  },
];

const meta: Meta<typeof DataGrid> = {
  title: 'Components / Tables / DataGrid',
  component: DataGrid,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'Interactive grid for when a static `Table` is not enough. Renders `div`s with the',
          'ARIA table roles (`role="table"`/`row`/`columnheader`/`cell`) — **not** a native',
          '`<table>` — so cells can hold interactive controls (inputs, buttons).',
          '',
          '**Use `Table`** for read-only tabular data. **Use `DataGrid`** when cells are editable,',
          'rows reorder, or rows are selectable.',
          '',
          'Config-driven like `Table` (`columns` + `rows`), with `renderCell` for arbitrary or',
          'interactive cell content. Supports client-side sorting, controlled row selection,',
          'drag + keyboard row reordering, a pagination footer, and a full-width `summaryRow`.',
          '',
          'See the **Reorderable**, **InteractiveCells**, and **Paginated** stories — these are',
          'the patterns the investment-mix payment-preference steps are built on.',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    label: { control: 'text', description: 'Accessible name for the grid (maps to `aria-label`).' },
    density: { control: 'select', options: ['condensed', 'default', 'spaced'] },
    sortable: { control: 'boolean', description: 'Master sort toggle; opt columns in with `column.sortable`.' },
    selectable: { control: 'boolean', description: 'Adds a leading selection checkbox column.' },
    reorderable: { control: 'boolean', description: 'Adds a drag handle + arrow controls; rows render in given order.' },
    loading: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<typeof DataGrid<Fund>>;

export const Default: Story = {
  args: { label: 'Investment options', columns: COLUMNS, rows: FUNDS },
};

export const Sortable: Story = {
  args: { label: 'Investment options', columns: COLUMNS, rows: FUNDS, sortable: true },
};

export const Selectable: Story = {
  render: (args) => {
    const [selected, setSelected] = useState<Array<string | number>>(['aus-shares']);
    return <DataGrid {...args} selectable selectedIds={selected} onSelectionChange={setSelected} />;
  },
  args: { label: 'Investment options', columns: COLUMNS, rows: FUNDS },
};

export const Reorderable: Story = {
  render: (args) => {
    const [order, setOrder] = useState(FUNDS.map((f) => f.id));
    const rows = order
      .map((id) => FUNDS.find((f) => f.id === id))
      .filter((f): f is Fund => f !== undefined);
    return (
      <DataGrid
        {...args}
        rows={rows}
        reorderable
        onReorder={(ids) => setOrder(ids.map(String))}
      />
    );
  },
  args: {
    label: 'Drawdown order',
    columns: [
      { key: 'name', label: 'Option', width: '1fr' },
      { key: 'risk', label: 'Risk', width: '12rem', align: 'right' },
    ],
    rows: FUNDS,
  },
};

export const InteractiveCells: Story = {
  render: () => {
    const [pct, setPct] = useState<Record<string, number>>({});
    const total = FUNDS.reduce((s, f) => s + (pct[f.id] ?? 0), 0);
    const columns: DataGridColumn<Fund>[] = [
      { key: 'name', label: 'Option', width: '1fr' },
      {
        key: 'split',
        label: 'Payment %',
        width: '7rem',
        align: 'right',
        renderCell: (row) => (
          <PercentageField
            aria-label={`Percentage for ${row.name}`}
            value={pct[row.id] ?? null}
            size="small"
            condensed
            fullWidth
            onChange={(v) => setPct({ ...pct, [row.id]: v ?? 0 })}
          />
        ),
      },
    ];
    const summary = (
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, px: 2.5, py: 1.5, bgcolor: 'background.default' }}>
        <Typography variant="small" sx={{ color: 'text.muted' }}>Total</Typography>
        <Typography variant="body" sx={{ fontWeight: 700, minWidth: '3rem', textAlign: 'right' }}>{total}%</Typography>
      </Box>
    );
    return <DataGrid label="Set your split" columns={columns} rows={FUNDS} summaryRow={summary} />;
  },
};

export const Paginated: Story = {
  render: (args) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(2);
    const start = page * rowsPerPage;
    const pageRows = FUNDS.slice(start, start + rowsPerPage);
    return (
      <DataGrid
        {...args}
        rows={pageRows}
        pagination={{
          count: FUNDS.length,
          page,
          rowsPerPage,
          rowsPerPageOptions: [2, 3, 5],
          onPageChange: setPage,
          onRowsPerPageChange: (n) => {
            setRowsPerPage(n);
            setPage(0);
          },
        }}
      />
    );
  },
  args: { label: 'Investment options', columns: COLUMNS, rows: FUNDS },
};

export const Density: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>
        <p style={{ marginBottom: 8, fontWeight: 600 }}>Condensed</p>
        <DataGrid label="Investment options" columns={COLUMNS} rows={FUNDS} density="condensed" />
      </div>
      <div>
        <p style={{ marginBottom: 8, fontWeight: 600 }}>Default</p>
        <DataGrid label="Investment options" columns={COLUMNS} rows={FUNDS} density="default" />
      </div>
      <div>
        <p style={{ marginBottom: 8, fontWeight: 600 }}>Spaced</p>
        <DataGrid label="Investment options" columns={COLUMNS} rows={FUNDS} density="spaced" />
      </div>
    </div>
  ),
};

export const Loading: Story = {
  args: { label: 'Investment options', columns: COLUMNS, rows: [], loading: true },
};

export const Empty: Story = {
  args: { label: 'Investment options', columns: COLUMNS, rows: [], emptyMessage: 'No options to display.' },
};
