import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { Theme } from '@mui/material/styles';
import { formatCurrency } from '../../../../lib/format';
import type { IncomeAccount } from './types';

function parseAmount(str: string): number {
  return parseFloat(str.replace(/[$,]/g, '')) || 0;
}

function parsePaymentDate(dateStr: string): Date {
  // Handles "30 Jun 2026", "1 Aug 2026", etc.
  return new Date(dateStr);
}

function findEarliestPayment(accounts: IncomeAccount[]): { amount: string; date: string } | null {
  const active = accounts.filter((a) => a.status === 'active' && a.nextPaymentDate !== '—');
  if (active.length === 0) return null;
  const earliest = active.reduce((min, a) =>
    parsePaymentDate(a.nextPaymentDate) < parsePaymentDate(min.nextPaymentDate) ? a : min
  );
  return { amount: earliest.nextPaymentAmount, date: earliest.nextPaymentDate };
}

interface StatCardProps {
  label: string;
  value: string;
}

function StatCard({ label, value }: StatCardProps) {
  return (
    <Box
      sx={(t: Theme) => ({
        flex: 1,
        border: '1px solid',
        borderColor: 'border.default',
        borderRadius: `${t.shape.lg}px`,
        bgcolor: 'background.paper',
        px: 3,
        py: 2.5,
        minWidth: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      })}
    >
      <Typography
        variant="h4"
        component="p"
        sx={{ color: 'text.heading', lineHeight: 1.2, mb: 0.75 }}
      >
        {value}
      </Typography>
      <Typography variant="small" sx={{ color: 'text.muted', display: 'block' }}>
        {label}
      </Typography>
    </Box>
  );
}

export function IncomeSummaryStrip({ accounts }: { accounts: IncomeAccount[] }) {
  const active = accounts.filter((a) => a.status === 'active');
  const combinedMonthly = active.reduce((sum, a) => sum + parseAmount(a.nextPaymentAmount), 0);
  const earliest = findEarliestPayment(accounts);
  const activeCount = active.length;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: 2,
        mb: 4,
      }}
    >
      <StatCard
        label="Combined monthly income"
        value={formatCurrency(combinedMonthly)}
      />
      <StatCard
        label="Next payment"
        value={earliest ? earliest.amount : '—'}
      />
      <StatCard
        label="Active accounts"
        value={String(activeCount)}
      />
    </Box>
  );
}
