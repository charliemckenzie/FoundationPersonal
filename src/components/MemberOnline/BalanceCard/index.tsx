'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DEFAULT_MEMBER_ONLINE_COPY, type MemberBalance } from '../types';

export interface BalanceCardProps {
  balance: MemberBalance;
  /** Override the "Total Balance:" label (e.g. for translations). */
  label?: string;
  /** Compact removes padding and shrinks the type — used inside the desktop SideNav. */
  compact?: boolean;
}

export function BalanceCard({
  balance,
  label = DEFAULT_MEMBER_ONLINE_COPY.totalBalanceLabel,
  compact = false,
}: BalanceCardProps) {
  return (
    <Box
      sx={(t) => ({
        px: compact ? 0 : 2,
        py: compact ? 0 : 1.5,
        borderRadius: `${t.shape.sm}px`,
        backgroundColor: compact ? 'transparent' : 'background.paper',
      })}
    >
      <Typography
        variant="small"
        sx={{ color: 'text.primary', fontWeight: 400, lineHeight: 1.4, m: 0 }}
      >
        {label}{' '}
        <Box component="span" sx={{ fontWeight: 700 }}>
          {balance.amount}
        </Box>
      </Typography>
      <Typography
        variant="small"
        sx={{ color: 'text.muted', fontSize: '0.75rem', mt: 0.25, m: 0 }}
      >
        {balance.asAt}
      </Typography>
    </Box>
  );
}
