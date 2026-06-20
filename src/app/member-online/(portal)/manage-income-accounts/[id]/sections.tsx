import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { Theme } from '@mui/material/styles';
import { Icon } from '../../../../../components/Icon';
import { TextButton } from '../../../../../components/TextButton';
import { SectionHeading, DetailRow, InlineCard } from './parts';
import type { AccountDetail } from './types';

export function PaymentsSection({ detail, onEditPayments }: { detail: AccountDetail; onEditPayments: () => void }) {
  return (
    <Stack spacing={2.5}>
      <SectionHeading>Payments</SectionHeading>
      <InlineCard
        title="Payment details"
        action={{ label: 'Edit payments', onClick: onEditPayments }}
      >
        <DetailRow label="Payment amount">{detail.paymentAmount}</DetailRow>
        <DetailRow label="Frequency">{detail.frequency}</DetailRow>
        <DetailRow label="Next payment date">{detail.nextPaymentDate}</DetailRow>
      </InlineCard>
      <InlineCard
        title="Bank account"
        action={{ label: 'Edit', onClick: () => {} }}
      >
        <DetailRow label="Account name">{detail.bankAccountName}</DetailRow>
        <DetailRow label="Bank">{detail.bank}</DetailRow>
        <DetailRow label="BSB">{detail.bsb}</DetailRow>
        <DetailRow label="Account number">{detail.accountNumber}</DetailRow>
      </InlineCard>
      <InlineCard
        title="Payment limits"
        footnote="* Lump sum withdrawals don't count towards your minimum and maximum payment limits."
      >
        <DetailRow label="Minimum payment">{detail.minimumPayment}</DetailRow>
        <DetailRow label="Payments to date">
          <Box
            component="a"
            href="#"
            sx={{ color: 'primary.main', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
          >
            {detail.paymentsToDate}
          </Box>
        </DetailRow>
      </InlineCard>
    </Stack>
  );
}

export function BeneficiariesSection({ beneficiaries, isClosed }: { beneficiaries: AccountDetail['beneficiaries']; isClosed: boolean }) {
  return (
    <Stack spacing={2.5}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <SectionHeading>Beneficiaries</SectionHeading>
        {!isClosed && <TextButton label="Edit beneficiaries" onClick={() => {}} />}
      </Box>
      {beneficiaries.length === 0 ? (
        <Box
          sx={(t: Theme) => ({
            border: '1px solid',
            borderColor: 'border.default',
            borderRadius: `${t.shape.sm}px`,
            p: 3,
            textAlign: 'center',
          })}
        >
          <Typography variant="body" sx={{ color: 'text.muted' }}>
            No beneficiaries have been nominated for this account.
          </Typography>
          {!isClosed && (
            <Box sx={{ mt: 1.5 }}>
              <TextButton label="Add a beneficiary" endIcon="plus" onClick={() => {}} />
            </Box>
          )}
        </Box>
      ) : (
        <Box
          sx={(t: Theme) => ({
            border: '1px solid',
            borderColor: 'border.default',
            borderRadius: `${t.shape.sm}px`,
            overflow: 'hidden',
          })}
        >
          {beneficiaries.map((b, i) => (
            <Box
              key={i}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                px: 3,
                py: 2,
                borderBottom: i < beneficiaries.length - 1 ? '1px solid' : 'none',
                borderBottomColor: 'border.subtle',
                bgcolor: 'background.paper',
              }}
            >
              <Box
                sx={(t: Theme) => ({
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: t.spacing(5),
                  height: t.spacing(5),
                  borderRadius: '50%',
                  bgcolor: 'background.default',
                  flexShrink: 0,
                })}
              >
                <Icon icon="user" style="light" size="md" color="text.muted" />
              </Box>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography variant="body" sx={{ fontWeight: 700, color: 'text.heading', display: 'block' }}>
                  {b.name}
                </Typography>
                <Typography variant="small" sx={{ color: 'text.muted' }}>
                  {b.relationship} · {b.type === 'binding' ? 'Binding nomination' : 'Non-binding nomination'}
                </Typography>
              </Box>
              <Typography variant="body" sx={{ fontWeight: 700, color: 'text.heading', flexShrink: 0 }}>
                {b.share}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Stack>
  );
}

