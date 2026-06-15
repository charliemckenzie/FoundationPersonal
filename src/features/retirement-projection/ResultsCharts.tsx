'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import {
  ComposedChart,
  AreaChart,
  Bar,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { Table } from '../../components/Table';
import type { TableColumn } from '../../components/Table';
import { ExpandableItem } from '../../components/ExpandableItem';
import type { ProjectionYear } from './projection';
import { formatCurrency } from './format';

interface ResultsChartsProps {
  years: ProjectionYear[];
  targetIncome: number;
}

function formatAxisDollars(v: number): string {
  return v >= 1000000 ? `$${(v / 1000000).toFixed(1)}M` : `$${(v / 1000).toFixed(0)}k`;
}

function ChartTab({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) {
  return (
    <Box
      component="button"
      type="button"
      onClick={onClick}
      sx={{
        px: 2.5,
        py: 1,
        borderRadius: '2rem',
        cursor: 'pointer',
        backgroundColor: active ? 'primary.main' : 'transparent',
        color: active ? 'primary.contrastText' : 'text.primary',
        border: '1px solid',
        borderColor: active ? 'primary.main' : 'border.default',
        transition: 'all 150ms ease',
        font: 'inherit',
      }}
      aria-pressed={active}
    >
      <Typography variant="small" component="span" sx={{ color: 'inherit', fontWeight: 500 }}>
        {label}
      </Typography>
    </Box>
  );
}

function Legend({ entries }: { entries: { label: string; color: string; line?: boolean }[] }) {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 1 }}>
      {entries.map((entry) => (
        <Box key={entry.label} sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
          <Box
            sx={{
              width: '0.75rem',
              height: entry.line ? '3px' : '0.75rem',
              borderRadius: entry.line ? '1px' : '2px',
              backgroundColor: entry.color,
            }}
          />
          <Typography variant="small" color="text.muted">{entry.label}</Typography>
        </Box>
      ))}
    </Box>
  );
}

type YearRow = ProjectionYear & { id: number };

const INCOME_COLUMNS: TableColumn<YearRow>[] = [
  { key: 'age', label: 'Age' },
  { key: 'salary', label: 'Salary', align: 'right', render: (row) => formatCurrency(row.salary) },
  { key: 'investment', label: 'Investment & savings', align: 'right', render: (row) => formatCurrency(row.investment) },
  { key: 'superIncome', label: 'Income from super', align: 'right', render: (row) => formatCurrency(row.superIncome) },
  { key: 'agePension', label: 'Age pension', align: 'right', render: (row) => formatCurrency(row.agePension) },
];

const CAPITAL_COLUMNS: TableColumn<YearRow>[] = [
  { key: 'age', label: 'Age' },
  { key: 'superBalance', label: 'Super balance', align: 'right', render: (row) => formatCurrency(row.superBalance) },
  { key: 'savings', label: 'Savings & investments', align: 'right', render: (row) => formatCurrency(row.savings) },
];

export function ResultsCharts({ years, targetIncome }: ResultsChartsProps) {
  const theme = useTheme();
  const [chartTab, setChartTab] = useState<'income' | 'capital'>('income');
  // Rem-based so chart text scales with browser zoom and font preferences.
  const chartFontSize = theme.typography.caption.fontSize;
  const axisTick = { fontSize: chartFontSize, fill: theme.palette.text.muted };
  const tooltipProps = {
    formatter: (value: unknown, name: unknown) =>
      [`$${Number(value ?? 0).toLocaleString()}`, String(name ?? '')] as [string, string],
    labelFormatter: (label: unknown) => `Age ${String(label)}`,
    contentStyle: {
      borderRadius: '0.5rem',
      border: `1px solid ${theme.palette.divider}`,
      fontSize: chartFontSize,
    },
  };
  const tableRows: YearRow[] = years.map((year) => ({ id: year.age, ...year }));

  return (
    <Box
      sx={{
        border: '1px solid',
        borderColor: 'border.default',
        borderRadius: '0.75rem',
        p: 2.5,
        mb: 3,
      }}
    >
      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <ChartTab active={chartTab === 'income'} label="Income in your retirement" onClick={() => setChartTab('income')} />
        <ChartTab active={chartTab === 'capital'} label="Capital in your retirement" onClick={() => setChartTab('capital')} />
      </Box>

      <Box sx={{ height: 400, mb: 2 }}>
        {chartTab === 'income' ? (
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={years} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} vertical={false} />
              <XAxis dataKey="age" tickLine={false} axisLine={false} tick={axisTick} tickFormatter={(v) => `Age ${v}`} minTickGap={32} />
              <YAxis tickLine={false} axisLine={false} tick={axisTick} tickFormatter={formatAxisDollars} width={52} />
              <Tooltip {...tooltipProps} />
              <Bar dataKey="salary" name="Salary income" stackId="income" fill={theme.palette.primary.main} />
              <Bar dataKey="investment" name="Investment & savings" stackId="income" fill={theme.palette.secondary.main} />
              <Bar dataKey="superIncome" name="Income from super" stackId="income" fill={theme.palette.info.light} />
              <Bar dataKey="agePension" name="Age pension" stackId="income" fill={theme.palette.success.main} radius={[2, 2, 0, 0]} />
              <ReferenceLine
                y={targetIncome}
                stroke={theme.palette.text.primary}
                strokeDasharray="5 3"
                label={{ value: 'Target', position: 'insideTopRight', fontSize: chartFontSize, fill: theme.palette.text.primary }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={years} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="superGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={theme.palette.primary.main} stopOpacity={0.25} />
                  <stop offset="95%" stopColor={theme.palette.primary.main} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="savingsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={theme.palette.primary.light} stopOpacity={0.35} />
                  <stop offset="95%" stopColor={theme.palette.primary.light} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} vertical={false} />
              <XAxis dataKey="age" tickLine={false} axisLine={false} tick={axisTick} tickFormatter={(v) => `Age ${v}`} minTickGap={32} />
              <YAxis tickLine={false} axisLine={false} tick={axisTick} tickFormatter={formatAxisDollars} width={56} />
              <Tooltip {...tooltipProps} />
              <Area type="monotone" dataKey="superBalance" name="Super balance" stackId="cap" stroke={theme.palette.primary.main} strokeWidth={2} fill="url(#superGrad)" />
              <Area type="monotone" dataKey="savings" name="Savings & investments" stackId="cap" stroke={theme.palette.primary.light} strokeWidth={2} fill="url(#savingsGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </Box>

      {chartTab === 'income' ? (
        <Legend
          entries={[
            { label: 'Salary income', color: theme.palette.primary.main },
            { label: 'Investment & savings', color: theme.palette.secondary.main },
            { label: 'Income from super', color: theme.palette.info.light },
            { label: 'Age pension', color: theme.palette.success.main },
            { label: 'Target income', color: theme.palette.text.primary, line: true },
          ]}
        />
      ) : (
        <Legend
          entries={[
            { label: 'Super balance', color: theme.palette.primary.main },
            { label: 'Savings & investments', color: theme.palette.primary.light },
          ]}
        />
      )}

      {/* Non-visual access to the chart data — keyboard and screen-reader friendly. */}
      <Box sx={{ mt: 2 }}>
        <ExpandableItem label="View chart data as a table">
          <Table
            columns={chartTab === 'income' ? INCOME_COLUMNS : CAPITAL_COLUMNS}
            rows={tableRows}
            density="condensed"
            headerStyle="paper"
            stickyHeader
            containerMaxHeight={320}
          />
        </ExpandableItem>
      </Box>
    </Box>
  );
}
