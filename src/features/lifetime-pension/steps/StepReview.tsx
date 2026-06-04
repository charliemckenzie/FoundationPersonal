import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Alert } from '../../../components/Alert';
import { Checkbox } from '../../../components/Checkbox';
import { TextButton } from '../../../components/TextButton';
import type { LifetimePensionState, LifetimePensionStepId } from '../types';
import { formatCurrency, totalSelectedAmount } from '../utils';

interface StepReviewProps {
  state: LifetimePensionState;
  onEditStep: (stepId: LifetimePensionStepId) => void;
  onDeclarationChange: (checked: boolean) => void;
  showValidation: boolean;
}

function optionLabel(state: LifetimePensionState): string {
  if (state.pensionOption === 'single') return 'Single option';
  if (state.pensionOption === 'spouse') return 'Spouse protection option';
  return 'Not selected';
}

function ReviewRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
        alignItems: 'flex-start',
        columnGap: 2,
        rowGap: { xs: 0.5, sm: 0 },
        py: 1.5,
        borderTop: '1px solid',
        borderTopColor: 'border.subtle',
        '&:last-child': {
          borderBottom: '1px solid',
          borderBottomColor: 'border.subtle',
        },
      }}
    >
      <Typography component="dt" variant="body" sx={{ fontWeight: 700, color: 'text.primary' }}>
        {label}
      </Typography>
      <Box component="dd" sx={{ m: 0 }}>{children}</Box>
    </Box>
  );
}

function ReviewValue({ children }: { children: React.ReactNode }) {
  if (typeof children === 'string' || typeof children === 'number') {
    return (
      <Typography variant="body" sx={{ color: 'text.primary' }}>
        {children}
      </Typography>
    );
  }
  return <>{children}</>;
}

interface SectionProps {
  title: string;
  onEdit: () => void;
  children: React.ReactNode;
  sx?: object;
}

function ReviewSection({ title, onEdit, children, sx }: SectionProps) {
  return (
    <Stack spacing={3} sx={{ mt: 5, ...sx }}>
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5">{title}</Typography>
        <TextButton label="Edit" hideIcon onClick={onEdit} />
      </Stack>
      <Box component="dl" sx={{ m: 0 }}>
        {children}
      </Box>
    </Stack>
  );
}

function PrintCard() {
  return (
    <Box
      sx={{
        backgroundColor: 'action.hover',
        borderRadius: (t) => `${t.shape.lg}px`,
        p: 3,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 2,
      }}
    >
      <Stack spacing={0.5}>
        <Typography variant="h6" sx={{ color: 'text.heading' }}>
          Lifetime Pension application
        </Typography>
        <Typography variant="body" sx={{ color: 'text.primary' }}>
          This is a permanent purchase after the cooling-off period
        </Typography>
      </Stack>
      <TextButton
        label="Print"
        startIcon="print"
        onClick={() => window.print()}
      />
    </Box>
  );
}

function DeclLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Box component="a" href={href} sx={{ color: 'primary.main', textDecoration: 'underline' }}>
      {children}
    </Box>
  );
}

function DeclarationBox() {
  return (
    <Box
      sx={{
        backgroundColor: 'action.hover',
        borderRadius: (t) => `${t.shape.lg}px`,
        p: 4,
      }}
    >
      <Typography variant="h5" sx={{ mb: 2 }}>Declaration and authorisation</Typography>
      <Box component="ul" sx={{ m: 0, pl: 3, display: 'flex', flexDirection: 'column', gap: 1 }}>
        {([
          <>I have received, read and understood the accompanying <DeclLink href="#">Product Disclosure Statement for Income Account and Lifetime Pension (PDS)</DeclLink> which summarises the significant information about the Lifetime Pension.</>,
          <>I acknowledge that the <DeclLink href="#">PDS</DeclLink>, this application form, and other documents which form part of the <DeclLink href="#">PDS</DeclLink> detail the interest I will have in Australian Retirement Trust if my application is accepted, and is not a contract between me and the Trustee.</>,
          'I agree to the Trust Deed and governing rules of the Fund, including in relation to the operation of my account.',
          'I have read the Personal Information Collection Statement in the PDS and I understand how Australian Retirement Trust will use my personal information.',
          'I understand and have considered the implications of my transfer balance cap. I have made reasonable enquiries to ensure I will not exceed my transfer balance cap.',
          'I understand that if I have a surcharge debt or other tax liability, it will be deducted before my Lifetime Pension commences.',
          'I understand that for the Accumulation account used to fund this new account any insurance cover I hold will cease if I close it; or will cease if there is not enough money to pay premiums or the account does not receive eligible contribution for 13 months, unless I have permanently opted in to my cover.',
          'I agree to make the Privacy Policy available to my spouse if spouse protection option is selected.',
          'I understand that I have 6-month cooling off period from when my Lifetime Pension starts to decide if the product is right for me. After this period, my purchase is permanent and I do not have access to these funds, except in certain circumstances.',
          'I understand that if I have chosen the spouse protection option, I am aware that my nominated spouse becomes ineligible to receive Lifetime Pension payments in the event of divorce, separation or their death.',
          'I understand that my Lifetime Pension payment amounts will not change in the event of divorce, separation or the death of my nominated spouse.',
          'I acknowledge that if I exceed my transfer balance cap and the ATO provides the Trustee a commutation authority in respect of my Lifetime Pension in the first 6 months, the Trustee will commute my Lifetime Pension in full. The proceeds returned to me will be subject to a legislative maximum as set by the capital access schedule.',
          'I am a citizen or permanent resident of Australia or citizen of New Zealand.',
          'To the best of my knowledge, the information I have provided on this form is correct.',
        ] as React.ReactNode[]).map((item, i) => (
          <Typography key={i} component="li" variant="body" sx={{ color: 'text.primary' }}>
            {item}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}

export function StepReview({
  state,
  onEditStep,
  onDeclarationChange,
  showValidation,
}: StepReviewProps) {
  const selectedAccounts = state.accounts.filter((a) => a.selected);
  const purchasePrice = totalSelectedAmount(state);
  const annualPayment = purchasePrice > 0 ? purchasePrice * 1.015 : 0;
  const fortnightlyPayment = annualPayment > 0 ? annualPayment / 26 : 0;

  return (
    <Stack spacing={0}>
      <Stack spacing={0.5} sx={{ mb: 2 }}>
        <Typography component="h1" variant="h2">Review</Typography>
        <Typography variant="body" sx={{ color: 'text.primary' }}>
          Take a moment to confirm your details before submitting.
        </Typography>
      </Stack>

      <PrintCard />

      {/* Option */}
      <ReviewSection title="Option" sx={{ mt: 4 }} onEdit={() => onEditStep('option')}>
        <ReviewRow label="Pension option">
          <ReviewValue>{optionLabel(state)}</ReviewValue>
        </ReviewRow>
      </ReviewSection>

      {/* Purchase price and funding */}
      <ReviewSection title="Purchase price and funding" onEdit={() => onEditStep('funding')}>
        <ReviewRow label="Purchase price">
          <ReviewValue>{formatCurrency(purchasePrice)}</ReviewValue>
        </ReviewRow>
        <ReviewRow label="Funding preferences">
          <Stack spacing={1.5}>
            {selectedAccounts.length > 0 ? selectedAccounts.map((account) => (
              <Box key={account.id}>
                <Typography variant="body" sx={{ color: 'text.primary' }}>
                  Transferring {formatCurrency(account.transferAmount)} from
                </Typography>
                <Typography variant="small" sx={{ color: 'text.muted' }}>
                  {account.label}
                </Typography>
              </Box>
            )) : (
              <Typography variant="body" sx={{ color: 'text.muted' }}>—</Typography>
            )}
          </Stack>
        </ReviewRow>
      </ReviewSection>

      {/* Payment details */}
      <ReviewSection title="Payment details" onEdit={() => onEditStep('payments')}>
        <ReviewRow label="Annual payment amount">
          <ReviewValue>{formatCurrency(annualPayment)}</ReviewValue>
        </ReviewRow>
        <ReviewRow label="Estimated payment">
          <ReviewValue>{formatCurrency(fortnightlyPayment)} / fortnight</ReviewValue>
        </ReviewRow>
        <ReviewRow label="First payment date">
          <ReviewValue>Tue, 03 Feb 2026</ReviewValue>
        </ReviewRow>
        <ReviewRow label="Bank account">
          <Stack spacing={1.5}>
            <Box>
              <Typography variant="small" sx={{ color: 'text.muted' }}>BSB</Typography>
              <Typography variant="body" sx={{ color: 'text.primary' }}>{state.bankDetails.bsb || '—'}</Typography>
            </Box>
            <Box>
              <Typography variant="small" sx={{ color: 'text.muted' }}>Account number</Typography>
              <Typography variant="body" sx={{ color: 'text.primary' }}>{state.bankDetails.accountNumber || '—'}</Typography>
            </Box>
            <Box>
              <Typography variant="small" sx={{ color: 'text.muted' }}>Account name</Typography>
              <Typography variant="body" sx={{ color: 'text.primary' }}>{state.bankDetails.accountName || '—'}</Typography>
            </Box>
          </Stack>
        </ReviewRow>
      </ReviewSection>

      {/* Declaration */}
      <Stack spacing={3} sx={{ mt: 5 }}>
        <DeclarationBox />
        <Checkbox
          checked={state.reviewDeclarationChecked}
          onChange={onDeclarationChange}
          label="I accept these declarations and understand purchasing a Lifetime Pension account is a permanent purchase after the cooling-off period."
        />
      </Stack>

      {showValidation && !state.reviewDeclarationChecked && (
        <Alert severity="error" message="Accept the declaration before you submit." />
      )}
    </Stack>
  );
}


