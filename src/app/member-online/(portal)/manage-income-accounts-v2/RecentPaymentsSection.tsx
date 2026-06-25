import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { Theme } from '@mui/material/styles';
import { TextButton } from '../../../../components/TextButton';
import { formatCurrency } from '../../../../lib/format';
import type { Payment } from './types';

export function RecentPaymentsSection({ payments }: { payments: Payment[] }) {
  return (
    <Box
      sx={(t: Theme) => ({
        border: '1px solid',
        borderColor: 'border.default',
        borderRadius: `${t.shape.lg}px`,
        overflow: 'hidden',
        bgcolor: 'background.paper',
      })}
    >
      {/* Header */}
      <Box
        sx={{
          px: 2.5,
          py: 2,
          borderBottom: '1px solid',
          borderBottomColor: 'border.subtle',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h6">Recent payments</Typography>
        <TextButton size="small" hideIcon label="View all statements" onClick={() => {}} />
      </Box>

      {/* Payment rows */}
      <Box sx={{ bgcolor: 'background.default', px: 1.5, py: 1.5, display: 'flex', flexDirection: 'column', gap: 1 }}>
        {payments.map((payment) => (
          <Box
            key={payment.id}
            sx={(t: Theme) => ({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 2,
              px: 2,
              py: 1.75,
              bgcolor: 'background.paper',
              borderRadius: `${t.shape.sm}px`,
            })}
          >
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                variant="body"
                sx={{ fontWeight: 600, color: 'text.heading', display: 'block' }}
              >
                {payment.accountName}
              </Typography>
              <Typography variant="small" sx={{ color: 'text.muted', display: 'block' }}>
                Member {payment.memberNumber} · {payment.date}
              </Typography>
            </Box>
            <Typography
              variant="body"
              sx={{ fontWeight: 700, color: 'success.main', flexShrink: 0 }}
            >
              +{formatCurrency(payment.amount)}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
