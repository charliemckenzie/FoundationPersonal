import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { Theme } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import { Icon } from '../../../../components/Icon';
import { TextButton } from '../../../../components/TextButton';
import { Chip } from '../../../../components/Chip';
import { formatCurrency } from '../../../../lib/format';
import { DetailRow, Section } from './detailParts';
import type { IncomeAccount } from './types';

export function AccountDetailView({ account }: { account: IncomeAccount }) {
  const isClosed = account.status === 'closed';
  const [showMoreDetails, setShowMoreDetails] = useState(false);
  const router = useRouter();
  const base = `/member-online/manage-income-accounts/${account.id}`;

  return (
    <Stack spacing={3}>
      {/* Overview section */}
      <Box
        sx={(t: Theme) => ({
          borderRadius: `${t.shape.lg}px`,
          border: '1px solid',
          borderColor: 'border.default',
          bgcolor: 'background.paper',
          overflow: 'hidden',
        })}
      >
        {/* Account summary — grey header */}
        <Box sx={{ px: 4, pt: 4, pb: 3, bgcolor: isClosed ? 'action.hover' : 'background.default' }}>
          {/* Balance + accordion toggle — always visible */}
          {!isClosed && (
            <Box sx={{ mb: 0.5 }}>
              <Typography
                variant="h3"
                component="p"
                sx={{ color: 'text.heading', lineHeight: 1.2, fontFamily: 'var(--font-noto-sans), "Noto Sans", system-ui, sans-serif' }}
              >
                {formatCurrency(account.balance)}
              </Typography>
            </Box>
          )}

          {/* Accordion toggle — sits directly under the balance */}
          <Box
            component="button"
            type="button"
            onClick={() => setShowMoreDetails((v) => !v)}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.5,
              background: 'none',
              border: 'none',
              p: 0,
              cursor: 'pointer',
              '&:focus-visible': { outline: '2px solid', outlineColor: 'border.focus', outlineOffset: 2, borderRadius: '2px' },
            }}
          >
            <Typography variant="small" sx={{ color: isClosed ? 'text.disabled' : 'text.muted' }}>
              {isClosed ? 'Account summary' : 'Account balance as at 17 June 2026'}
            </Typography>
            {isClosed && <Box component="span" sx={{ ml: 0.5 }}><Chip label="Closed" size="x-small" color="default" /></Box>}
            <Icon icon={showMoreDetails ? 'chevron-up' : 'chevron-down'} size="sm" color={isClosed ? 'text.disabled' : 'text.muted'} />
          </Box>

          {/* Expandable details */}
          {showMoreDetails && (
            <Box sx={{ mt: 3, pt: 3, borderTop: '1px solid', borderTopColor: 'border.subtle' }}>
              <DetailRow label="Start date" value="8 Sep 2020" />
              {account.accountType === 'lp' && account.purchasePrice !== undefined && (
                <DetailRow label="Purchase price:" value={formatCurrency(account.purchasePrice)} />
              )}
              <DetailRow
                label="Money Back Protection:"
                value="$682,704.35"
                note="May be subject to legislative maximums and adjusted for negative returns. More information"
              />
              <DetailRow
                label="Cooling-off period:"
                value="Expired"
                note="Your 14 day cooling-off period has expired and is no longer active"
              />
            </Box>
          )}
        </Box>

        {/* Payment details body */}
        <Box sx={{ px: 4, pt: 4, pb: 4, borderTop: '1px solid', borderColor: 'border.subtle' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6" sx={{ color: isClosed ? 'text.secondary' : 'text.heading' }}>Payment details</Typography>
            {!isClosed && <TextButton size="small" hideIcon label="Edit" onClick={() => router.push(`${base}/edit-payment-details`)} />}
          </Box>
          <DetailRow label="Next payment:" value={isClosed ? '—' : account.nextPaymentAmount} note={isClosed ? undefined : `on the ${account.nextPaymentDate}`} />
          <DetailRow label="Payment frequency:" value="Fortnightly" />
          <DetailRow label="Financial year to date:" value="$0.00" />
          <DetailRow
            label="Annual payment amount:"
            value="$55,444.87"
            note="For the complete 2025 to 2026 financial year. Your actual payment will be based on the portion of the year your account is open."
          />
        </Box>

        {/* Restart CTA — closed accounts only */}
        {isClosed && (
          <Box sx={{ px: 4, py: 1.5, borderTop: '1px solid', borderTopColor: 'border.subtle', display: 'flex', justifyContent: 'center' }}>
            <TextButton
              hideIcon
              label="Restart this account"
              onClick={() => {}}
            />
          </Box>
        )}

        {/* Add money / Withdraw — active RIA only */}
        {!isClosed && account.accountType === 'ria' && (
          <Box
            sx={(t: Theme) => ({
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              height: t.spacing(7),
              borderTop: '1px solid',
              borderTopColor: 'border.subtle',
            })}
          >
            {(['Add money', 'Withdraw lump sum'] as const).map((label, i) => (
              <Box
                key={label}
                component="button"
                type="button"
                onClick={() => { if (label === 'Add money') router.push(`${base}/add-money`); }}
                sx={(t: Theme) => ({
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  border: 'none',
                  ...(i === 1 && {
                    borderLeft: '1px solid',
                    borderLeftColor: 'border.subtle',
                  }),
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  color: 'primary.main',
                  outline: 'none',
                  transition: 'background-color 200ms ease',
                  borderRadius: i === 0
                    ? `0 0 0 ${t.shape.lg}px`
                    : `0 0 ${t.shape.lg}px 0`,
                  '&:hover': { backgroundColor: t.palette.action.hover },
                  '&:focus-visible': {
                    outline: '2px solid',
                    outlineColor: 'border.focus',
                    outlineOffset: 2,
                    position: 'relative',
                    zIndex: 1,
                  },
                })}
              >
                <Typography variant="body" sx={{ fontWeight: 700 }}>{label}</Typography>
              </Box>
            ))}
          </Box>
        )}
      </Box>

      {/* Bank details section */}
      <Section title="Bank details" action={{ label: 'Edit', href: '#' }} hideAction={isClosed}>
        <DetailRow label="Bank:" value="Commonwealth Bank of Australia" />
        <DetailRow label="BSB:" value="062-000" />
        <DetailRow label="Account number:" value="1234 5678" />
        <Box sx={{ display: 'flex', py: 1.5 }}>
          <Typography variant="body" sx={{ color: 'text.muted', width: '40%', flexShrink: 0 }}>
            Account name:
          </Typography>
          <Typography variant="body" sx={{ fontWeight: 600, color: 'text.primary' }}>
            H Rialto A Nse
          </Typography>
        </Box>
      </Section>

      {/* Beneficiary section */}
      <Section title="Beneficiaries" action={{ label: 'Edit', href: '/member-online/beneficiaries' }} hideAction={isClosed}>
        <DetailRow label="Option:" value="Spouse Protection" />
        <DetailRow label="Spouse:" value="Jane Rialto" />
        <DetailRow label="Phone:" value="0412 345 678" />
        <Box sx={{ display: 'flex', py: 1.5 }}>
          <Typography variant="body" sx={{ color: 'text.muted', width: '40%', flexShrink: 0 }}>
            Account name:
          </Typography>
          <Typography variant="body" sx={{ fontWeight: 600, color: 'text.primary' }}>
            H Rialto A Nse
          </Typography>
        </Box>
      </Section>

      {/* Centrelink schedule section */}
      <Section title="Centrelink schedule" action={{ label: 'Request', href: '#' }} hideAction={isClosed}>
        <Typography variant="body" sx={{ color: 'text.primary' }}>
          Your Centrelink schedule shows the assessable income figures reported to Services Australia for each financial year. You can request an up-to-date schedule at any time.
        </Typography>
      </Section>
    </Stack>
  );
}
