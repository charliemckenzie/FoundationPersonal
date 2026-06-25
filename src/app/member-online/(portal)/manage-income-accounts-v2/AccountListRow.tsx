import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { Theme } from '@mui/material/styles';
import { Icon } from '../../../../components/Icon';
import { Chip } from '../../../../components/Chip';
import type { IncomeAccount } from './types';

function formatBalance(value: number): string {
  return value.toLocaleString('en-AU', { style: 'currency', currency: 'AUD' });
}

export function AccountListRow({ account, onClick }: { account: IncomeAccount; onClick: () => void }) {
  const isClosed = account.status === 'closed';
  const balance = isClosed ? '$0.00' : formatBalance(account.balance);
  const paymentLabel = isClosed ? 'Closed' : 'Next payment';
  const paymentValue = isClosed ? (account.closingDate ?? '—') : account.nextPaymentDate;
  const paymentAmount = isClosed ? '$0.00' : account.nextPaymentAmount;

  return (
    <Box
      component="button"
      type="button"
      onClick={onClick}
      sx={(t: Theme) => ({
        display: 'flex', alignItems: 'center', gap: { xs: 1.5, sm: 2 },
        width: '100%', px: { xs: 2, sm: 2.5 }, py: 2,
        border: 'none',
        borderRadius: `${t.shape.sm}px`,
        bgcolor: 'background.paper', cursor: 'pointer', textAlign: 'left',
        transition: 'background-color 150ms ease',
        '&:hover': { bgcolor: t.palette.action.hover },
        '&:focus-visible': { outline: '2px solid', outlineColor: 'border.focus', outlineOffset: -2, zIndex: 1, position: 'relative' },
      })}
    >
      {/* Icon */}
      <Box sx={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        width: '2.5rem', height: '2.5rem',
        borderRadius: '50%',
        bgcolor: isClosed ? 'action.selected' : 'primary.softMain',
        flexShrink: 0,
        alignSelf: { xs: 'flex-start', sm: 'center' },
      }}>
        <Icon icon={account.icon} style="light" size="lg" color={isClosed ? 'text.disabled' : 'primary'} />
      </Box>

      {/* Content — stacks on mobile, splits left/right on sm+ */}
      <Box sx={{
        flex: 1, minWidth: 0,
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { xs: 'stretch', sm: 'center' },
        gap: { xs: 1, sm: 2 },
      }}>
        {/* Account identity */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            <Typography variant="body" sx={{ fontWeight: 700, color: isClosed ? 'text.secondary' : 'text.heading', display: 'block' }}>
              {account.name}
            </Typography>
            {isClosed && <Chip label="Closed" size="x-small" color="default" />}
          </Box>
          <Typography variant="small" sx={{ color: 'text.muted', display: 'block' }}>
            Member number: {account.memberNumber}
          </Typography>
          <Typography variant="small" sx={{ color: 'text.muted', display: 'block' }}>
            Balance: {balance}
          </Typography>
        </Box>

        {/* Payment / status info */}
        <Box sx={{
          textAlign: { xs: 'left', sm: 'right' }, flexShrink: 0,
          pt: { xs: 1, sm: 0 },
          borderTop: { xs: '1px solid', sm: 'none' }, borderTopColor: 'border.subtle',
        }}>
          <Typography variant="body" sx={{ fontWeight: 700, color: 'text.heading', display: 'block' }}>
            {paymentAmount}
          </Typography>
          <Typography variant="small" sx={{ color: 'text.muted', display: 'block' }}>
            {paymentLabel} {paymentValue}
          </Typography>
        </Box>
      </Box>

      <Icon icon="chevron-right" style="regular" size="sm" color="text.muted" />
    </Box>
  );
}
