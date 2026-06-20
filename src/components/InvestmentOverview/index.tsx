'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { Theme } from '@mui/material/styles';
import { Icon } from '../Icon';
import { formatCurrency, formatDate } from '../../lib/format';
import { DialItem } from './DialItem';
import { InvestmentOverviewSkeleton } from './InvestmentOverviewSkeleton';
import type { InvestmentOverviewProps } from './InvestmentOverview.types';

export type { InvestmentOverviewProps, InvestmentMixDial } from './InvestmentOverview.types';
export { InvestmentOverviewSkeleton } from './InvestmentOverviewSkeleton';

const focusRingSx = {
  outline: '2px solid',
  outlineColor: 'border.focus',
  outlineOffset: 2,
  position: 'relative',
  zIndex: 1,
} as const;

interface FooterActionProps {
  label: string;
  onClick: () => void;
  position: 'left' | 'right';
}

function FooterAction({ label, onClick, position }: FooterActionProps) {
  return (
    <Box
      component="button"
      type="button"
      onClick={onClick}
      sx={(t: Theme) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        border: 'none',
        backgroundColor: 'transparent',
        cursor: 'pointer',
        fontFamily: 'inherit',
        color: 'primary.main',
        outline: 'none',
        transition: 'background-color 200ms ease',
        ...(position === 'right' && {
          borderLeftWidth: '1px',
          borderLeftStyle: 'solid',
          borderLeftColor: 'border.subtle',
        }),
        borderRadius:
          position === 'left'
            ? `0 0 0 ${t.shape.lg}px`
            : `0 0 ${t.shape.lg}px 0`,
        '&:hover': { backgroundColor: t.palette.action.hover },
        '&:focus-visible': focusRingSx,
      })}
    >
      <Typography variant="body" sx={{ fontWeight: 700 }}>
        {label}
      </Typography>
    </Box>
  );
}

export function InvestmentOverview({
  accountName,
  totalBalance,
  balanceDate,
  isIncomeAccount = false,
  loading = false,
  options,
  dials,
  changeAllLabel = 'Change all',
  onChangeAll,
  onViewHistory,
}: InvestmentOverviewProps) {
  if (loading) return <InvestmentOverviewSkeleton />;

  const headerIcon = isIncomeAccount ? 'money-simple-from-bracket' : 'piggy-bank';

  return (
    <Box
      component="section"
      aria-label={`${accountName} investment overview`}
      sx={(t: Theme) => ({
        borderRadius: `${t.shape.lg}px`,
        backgroundColor: 'background.paper',
        border: '1px solid',
        borderColor: 'border.default',
      })}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, px: 3, py: 2.5 }}>
        <Box
          sx={(t: Theme) => ({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: t.spacing(6),
            height: t.spacing(6),
            borderRadius: '50%',
            backgroundColor: 'background.default',
            flexShrink: 0,
          })}
        >
          <Icon icon={headerIcon} style="light" size="xl+" color="text.heading" />
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="h6">{accountName}</Typography>
          <Typography variant="small" sx={{ color: 'text.muted' }}>
            {'Total balance '}
            <Box component="span" sx={{ fontWeight: 700, color: 'text.primary' }}>
              {formatCurrency(totalBalance)}
            </Box>
            {' · as at '}
            {formatDate(balanceDate)}
          </Typography>
        </Box>
      </Box>

      <Box
        component="ul"
        sx={{
          borderTop: '1px solid',
          borderTopColor: 'border.subtle',
          backgroundColor: 'background.default',
          p: 1.5,
          m: 0,
          listStyle: 'none',
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
        }}
      >
        {dials.map((dial) => (
          <DialItem key={dial.id} dial={dial} options={options} />
        ))}
      </Box>

      <Box
        sx={(t: Theme) => ({
          borderTop: '1px solid',
          borderTopColor: 'border.subtle',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          height: t.spacing(7),
        })}
      >
        <FooterAction label={changeAllLabel} onClick={onChangeAll} position="left" />
        <FooterAction label="View history" onClick={onViewHistory} position="right" />
      </Box>
    </Box>
  );
}
