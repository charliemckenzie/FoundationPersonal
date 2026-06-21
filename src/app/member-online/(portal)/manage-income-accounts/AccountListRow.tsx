import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { Theme } from '@mui/material/styles';
import { Icon } from '../../../../components/Icon';
import type { IncomeAccount } from './types';

export function AccountListRow({ account, onClick }: { account: IncomeAccount; onClick: () => void }) {
  return (
    <Box
      component="button"
      type="button"
      onClick={onClick}
      sx={(t: Theme) => ({
        display: 'flex', alignItems: 'center', gap: 2,
        width: '100%', px: 2.5, py: 2,
        border: 'none',
        borderRadius: `${t.shape.sm}px`,
        bgcolor: 'background.paper', cursor: 'pointer', textAlign: 'left',
        transition: 'background-color 150ms ease',
        '&:hover': { bgcolor: t.palette.action.hover },
        '&:focus-visible': { outline: '2px solid', outlineColor: 'border.focus', outlineOffset: -2, zIndex: 1, position: 'relative' },
      })}
    >
      <Box sx={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        width: '2.5rem', height: '2.5rem',
        borderRadius: '50%', bgcolor: 'primary.softMain', flexShrink: 0,
      }}>
        <Icon icon={account.icon} style="light" size="lg" color="primary" />
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography variant="body" sx={{ fontWeight: 700, color: 'text.heading', display: 'block' }}>
          {account.name}
        </Typography>
        <Typography variant="small" sx={{ color: 'text.muted', display: 'block' }}>
          Member number: {account.memberNumber}
        </Typography>
      </Box>
      <Box sx={{ textAlign: 'right', flexShrink: 0 }}>
        <Typography variant="body" sx={{ fontWeight: 700, color: 'text.heading', display: 'block' }}>
          {account.nextPaymentAmount}
        </Typography>
        <Typography variant="small" sx={{ color: 'text.muted', display: 'block' }}>
          {account.nextPaymentDate}
        </Typography>
      </Box>
      <Icon icon="chevron-right" style="regular" size="sm" color="text.muted" />
    </Box>
  );
}
