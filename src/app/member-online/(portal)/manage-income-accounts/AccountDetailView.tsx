import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { Theme } from '@mui/material/styles';
import { Icon } from '../../../../components/Icon';
import { formatCurrency } from '../../../../lib/format';
import { DetailRow, Section } from './detailParts';
import type { IncomeAccount } from './types';

export function AccountDetailView({ account }: { account: IncomeAccount }) {
  return (
    <Stack spacing={3}>
      {/* Overview section - styled like purchase price card */}
      <Box
        sx={(t: Theme) => ({
          borderRadius: `${t.shape.lg}px`,
          border: '1px solid',
          borderColor: 'border.default',
          bgcolor: 'background.paper',
          overflow: 'hidden',
        })}
      >
        {/* Grey header — balance */}
        <Box sx={{ p: 4, bgcolor: 'background.default' }}>
          <Typography variant="small" sx={{ color: 'text.primary', display: 'block', mb: 0.5 }}>
            Account balance as at 17 June 2026
          </Typography>
          <Typography variant="h4" sx={{ color: 'text.heading', fontFamily: '"Noto Sans", sans-serif' }}>
            {formatCurrency(account.balance)}
          </Typography>
        </Box>

        {/* White body — details, with the arrow straddling the seam */}
        <Box sx={{ position: 'relative', px: 4, pt: 5, pb: 4, borderTop: '1px solid', borderColor: 'border.subtle' }}>
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: (t: Theme) => t.spacing(4),
              transform: 'translateY(-50%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '2.5rem',
              height: '2.5rem',
              borderRadius: '50%',
              border: '1px solid',
              borderColor: 'border.subtle',
              bgcolor: 'background.paper',
            }}
          >
            <Icon icon="arrow-down" size="lg" color="primary" />
          </Box>

          <Typography variant="h6" sx={{ mb: 2 }}>Overview</Typography>
          <DetailRow label="Next payment:" value={`${account.nextPaymentAmount}, ${account.nextPaymentDate}`} />
          <DetailRow label="Payment frequency:" value="Fortnightly" />
          <DetailRow label="Financial year to date:" value="$0.00" />
          <DetailRow
            label="Annual payment amount:"
            value="$55,444.87"
            note="For the complete 2025 to 2026 financial year. Your actual payment will be based on the portion of the year your account is open."
          />
          <DetailRow label="Start date" value="8 Sep 2020" />
          <DetailRow label="Original purchase price:" value="$682,704.35" />
          <DetailRow label="Total to date:" value="$0.00" />
          <DetailRow
            label="Money Back Protection:"
            value="$682,704.35"
            note="May be subject to legislative maximums and adjusted for negative returns. More information"
          />
          <DetailRow
            label="Cooling-off period:"
            value="Expired"
            note="Your 14 day and 6 month cooling-off periods have expired and are no longer active"
          />
          <DetailRow label="Product holder" value="H Rialto A Nse" />
        </Box>
      </Box>

      {/* Bank details section */}
      <Section title="Bank details" action={{ label: 'Edit bank details', href: '#' }}>
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

      {/* Centrelink schedule section */}
      <Section title="Centrelink schedule" action={{ label: 'Download Centrelink schedule', href: '#', icon: 'arrow-down-to-line' }}>
        <Typography variant="body" sx={{ color: 'text.primary', mb: 2 }}>
          Your eligibility for income support or an Age Pension from the government may be affected if you are receiving payments from a QSuper income account.
        </Typography>
        <Typography variant="body" sx={{ color: 'text.primary' }}>
          For a Lifetime Pension, Centrelink will send you a letter at the beginning of each financial year requesting you to provide details of your new annual adjusted pension payment. You can get this information either from the Lifetime Pension Member Benefit Statement that we will send you in July, or you can download a current version below.
        </Typography>
      </Section>

      {/* Beneficiary section */}
      <Section title="Beneficiaries" action={{ label: 'Manage beneficiaries', href: '/member-online/beneficiaries' }}>
        <DetailRow label="Option:" value="Spouse Protection" />
        <DetailRow label="Spouse:" value="Jane Rialto" />
        <DetailRow label="Phone:" value="0412 345 678" />
        <Box sx={{ display: 'flex', py: 1.5 }}>
          <Typography variant="body" sx={{ color: 'text.muted', width: '40%', flexShrink: 0 }}>
            Email:
          </Typography>
          <Typography variant="body" sx={{ fontWeight: 600, color: 'text.primary' }}>
            jane.rialto@email.com.au
          </Typography>
        </Box>
      </Section>
    </Stack>
  );
}
