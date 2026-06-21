import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Alert } from '../../../components/Alert';
import { Checkbox } from '../../../components/Checkbox';
import { Dialog } from '../../../components/Dialog';
import { Icon } from '../../../components/Icon';
import { TextButton } from '../../../components/TextButton';
import { TextField } from '../../../components/TextField';
import { MOCK_INVESTMENT_OPTIONS } from './StepInvestmentMix';
import type { RetirementIncomeAccountState, RetirementIncomeAccountStepId, UserProfile, VerifyDetailsState } from '../types';
import { formatCurrency, totalSelectedAmount, estimatePension } from '../utils';
import { PENSION_ESTIMATE_AGE } from '../constants';

interface StepReviewProps {
  state: RetirementIncomeAccountState;
  onEditStep: (stepId: RetirementIncomeAccountStepId) => void;
  onDeclarationChange: (checked: boolean) => void;
  showValidation: boolean;
  verifyDetailsState: VerifyDetailsState;
  onVerifyDetailsChange: (next: VerifyDetailsState) => void;
  profile: UserProfile;
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
  onEdit?: () => void;
  children: React.ReactNode;
  sx?: object;
}

function ReviewSection({ title, onEdit, children, sx }: SectionProps) {
  return (
    <Stack spacing={3} sx={{ mt: 5, ...sx }}>
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5">{title}</Typography>
        {onEdit && <TextButton label="Edit" hideIcon onClick={onEdit} />}
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
      <Typography variant="h6" sx={{ color: 'text.heading' }}>
          Retirement Income Account application
        </Typography>
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
        p: 3,
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>Declaration and authorisation</Typography>
      <Box component="ul" sx={{ m: 0, pl: 3, display: 'flex', flexDirection: 'column', gap: 1 }}>
        {([
          <>I have received, read and understood the accompanying <DeclLink href="#">Product Disclosure Statement for Income Account and Lifetime Pension (PDS)</DeclLink> which summarises the significant information about the Retirement Income account</>,
          <>I have read the Personal Information Collection Statement in the PDS and I understand how Australian Retirement Trust will use my personal information.</>,
          <>I acknowledge that the PDS, this application form, and other documents which form part of the PDS detail the interest I will have in Australian Retirement Trust if my application is accepted, and is not a contract between me and the Trustee.</>,
          <>I understand that for the Accumulation account used to fund this new account any insurance cover I hold will cease if I close it; or will cease if there is not enough money to pay premiums or the account does not receive {'\'eligible contributions\''} for 12 months, unless I have permanently opted in to my cover.</>,
          'I am a citizen or permanent resident of Australia or citizen of New Zealand.',
          'To the best of my knowledge, the information I have provided on this form is true and correct.',
          'I agree to the Trust Deed and governing rules of the Fund, including in relation to the operation of my account.',
        ] as React.ReactNode[]).map((item, i) => (
          <Typography key={i} component="li" variant="small" sx={{ color: 'text.primary' }}>
            {item}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}

function AllocationTable({ allocations, label }: { allocations: Record<string, number>; label: string }) {
  const options = MOCK_INVESTMENT_OPTIONS;
  const grouped = options.reduce<Record<string, typeof options>>((acc, o) => {
    if (!acc[o.category]) acc[o.category] = [];
    acc[o.category].push(o);
    return acc;
  }, {});

  return (
    <Stack spacing={0} component="dl" sx={{ m: 0, '& > div:first-of-type': { borderTop: 'none' } }}>
      {Object.entries(grouped).map(([category, opts]) => {
        const allocated = opts.filter((o) => (allocations[o.id] ?? 0) > 0);
        if (allocated.length === 0) return null;
        return (
          <Box key={category}>
            <Typography variant="body" sx={{ fontWeight: 700, display: 'block', pt: 1.5, pb: 0.75 }}>
              {category}
            </Typography>
            {allocated.map((o) => (
              <Box
                key={o.id}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  py: 0.75,
                  borderTop: '1px solid',
                  borderColor: 'border.subtle',
                }}
              >
                <Typography component="dt" variant="body" sx={{ color: 'text.primary' }}>{o.name}</Typography>
                <Typography component="dd" variant="body" sx={{ m: 0, color: 'text.primary' }}>{allocations[o.id]}%</Typography>
              </Box>
            ))}
          </Box>
        );
      })}
    </Stack>
  );
  void label;
}

function DrawdownTable({ drawdown }: { drawdown: RetirementIncomeAccountState['drawdown'] }) {
  // Derive the options from what the user actually allocated — keyed by id in the drawdown state.
  const allocMap = drawdown.customMethod === 'order' ? drawdown.orderAllocations : drawdown.percentageAllocations;
  const optionIds = Object.keys(allocMap).filter((id) => (allocMap[id] ?? 0) > 0);
  const options = optionIds
    .map((id) => MOCK_INVESTMENT_OPTIONS.find((o) => o.id === id))
    .filter((o): o is NonNullable<typeof o> => o != null);

  if (options.length === 0) return null;

  if (drawdown.customMethod === 'order') {
    const sorted = [...options].sort((a, b) => (drawdown.orderAllocations[a.id] ?? 0) - (drawdown.orderAllocations[b.id] ?? 0));
    return (
      <Stack spacing={0} component="dl" sx={{ m: 0, '& > div:first-of-type': { borderTop: 'none' } }}>
        {sorted.map((o) => {
          const pos = drawdown.orderAllocations[o.id];
          return (
            <Box
              key={o.id}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                py: 0.75,
                borderTop: '1px solid',
                borderColor: 'border.subtle',
              }}
            >
              <Typography component="dt" variant="body" sx={{ color: 'text.primary' }}>{o.name}</Typography>
              <Typography component="dd" variant="body" sx={{ m: 0, color: 'text.primary' }}>Position {pos}</Typography>
            </Box>
          );
        })}
      </Stack>
    );
  }
  return (
    <Stack spacing={0} component="dl" sx={{ m: 0, '& > div:first-of-type': { borderTop: 'none' } }}>
      {options.map((o) => {
        const pct = drawdown.percentageAllocations[o.id];
        return (
          <Box
            key={o.id}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              py: 0.75,
              borderTop: '1px solid',
              borderColor: 'border.subtle',
            }}
          >
            <Typography component="dt" variant="body" sx={{ color: 'text.primary' }}>{o.name}</Typography>
            <Typography component="dd" variant="body" sx={{ m: 0, color: 'text.primary' }}>{pct}%</Typography>
          </Box>
        );
      })}
    </Stack>
  );
}

function ExpandToggle({ expanded, onToggle, expandLabel, collapseLabel }: { expanded: boolean; onToggle: () => void; expandLabel: string; collapseLabel: string }) {
  return (
    <Box
      component="button"
      onClick={onToggle}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.5,
        background: 'none',
        border: 'none',
        p: 0,
        cursor: 'pointer',
        color: 'primary.main',
        mt: 0.5,
      }}
    >
      <Typography variant="body" sx={{ color: 'primary.main', fontWeight: 700 }}>
        {expanded ? collapseLabel : expandLabel}
      </Typography>
      <Icon icon={expanded ? 'chevron-up' : 'chevron-down'} size="sm" color="primary" />
    </Box>
  );
}

function InvestmentStrategySection({ state, onEdit }: { state: RetirementIncomeAccountState; onEdit?: () => void }) {
  const [showAllocation, setShowAllocation] = useState(false);
  const [showDrawdown, setShowDrawdown] = useState(false);

  const mixMode = state.investmentMix.mode;
  const isSimple = state.setupMode === 'simple';
  const mixLabel = isSimple
    ? '100% Balanced Risk-Adjusted'
    : mixMode === 'default' ? 'Default' : mixMode === 'custom' ? 'Choose your own' : '—';

  const drawdownMode = state.drawdown.mode;
  const drawdownMethod = state.drawdown.customMethod;
  const defaultDrawdownDescription = 'Proportional — drawn from each investment based on your current allocation';
  let drawdownLabel = isSimple ? defaultDrawdownDescription : '—';
  if (!isSimple) {
    if (drawdownMode === 'default') drawdownLabel = defaultDrawdownDescription;
    else if (drawdownMode === 'custom' && drawdownMethod === 'order') drawdownLabel = 'Choose your own (order based)';
    else if (drawdownMode === 'custom' && drawdownMethod === 'percentage') drawdownLabel = 'Choose your own (percentage based)';
  }

  return (
    <ReviewSection title="Investment strategy" onEdit={onEdit}>
      <ReviewRow label="Strategy type">
        <Stack spacing={0} sx={{ alignItems: 'flex-start' }}>
          <Typography variant="body" sx={{ color: 'text.primary' }}>{mixLabel}</Typography>
          {mixMode === 'custom' && (
            <ExpandToggle
              expanded={showAllocation}
              onToggle={() => setShowAllocation((v) => !v)}
              expandLabel="View allocation"
              collapseLabel="Hide allocation"
            />
          )}
        </Stack>
      </ReviewRow>
      {mixMode === 'custom' && showAllocation && (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
            columnGap: 2,
            py: 1.5,
            borderTop: '1px solid',
            borderTopColor: 'border.subtle',
            '&:last-child': { borderBottom: '1px solid', borderBottomColor: 'border.subtle' },
          }}
        >
          <Box sx={{ display: { xs: 'none', sm: 'block' } }} />
          <AllocationTable allocations={state.investmentMix.allocations} label="Allocation" />
        </Box>
      )}
      <ReviewRow label="Drawdown options">
        <Stack spacing={0} sx={{ alignItems: 'flex-start' }}>
          <Typography variant="body" sx={{ color: 'text.primary' }}>{drawdownLabel}</Typography>
          {drawdownMode === 'custom' && (
            <ExpandToggle
              expanded={showDrawdown}
              onToggle={() => setShowDrawdown((v) => !v)}
              expandLabel="View preferences"
              collapseLabel="Hide preferences"
            />
          )}
        </Stack>
      </ReviewRow>
      {drawdownMode === 'custom' && showDrawdown && (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
            columnGap: 2,
            py: 1.5,
            borderTop: '1px solid',
            borderTopColor: 'border.subtle',
            '&:last-child': { borderBottom: '1px solid', borderBottomColor: 'border.subtle' },
          }}
        >
          <Box sx={{ display: { xs: 'none', sm: 'block' } }} />
          <DrawdownTable drawdown={state.drawdown} />
        </Box>
      )}
    </ReviewSection>
  );
}

export function StepReview({
  state,
  onEditStep,
  onDeclarationChange,
  showValidation,
  verifyDetailsState,
  onVerifyDetailsChange,
}: StepReviewProps) {
  const [editDetailsOpen, setEditDetailsOpen] = useState(false);
  const [draftDetails, setDraftDetails] = useState<UserProfile>(verifyDetailsState.edited);

  const displayDetails = verifyDetailsState.edited;

  function handleOpenEdit() {
    setDraftDetails({ ...verifyDetailsState.edited });
    setEditDetailsOpen(true);
  }

  function handleSaveDetails() {
    onVerifyDetailsChange({ confirmed: 'no', edited: draftDetails });
    setEditDetailsOpen(false);
  }

  const isSimple = state.setupMode === 'simple';
  // In simple mode the funding step is skipped, so transferAmount is 0 — use full balances instead.
  const purchasePrice = isSimple
    ? state.accounts.reduce((sum, a) => sum + a.balance, 0)
    : totalSelectedAmount(state);

  return (
    <Stack spacing={0}>
      <PrintCard />

      {/* Personal details */}
      <ReviewSection title="Personal details" sx={{ mt: 4 }} onEdit={handleOpenEdit}>
        <ReviewRow label="Full name">
          <ReviewValue>
            {[displayDetails.firstName, displayDetails.middleName, displayDetails.lastName]
              .filter(Boolean)
              .join(' ') || '—'}
          </ReviewValue>
        </ReviewRow>
        <ReviewRow label="Residential address">
          <ReviewValue>{displayDetails.residentialAddress || '—'}</ReviewValue>
        </ReviewRow>
        <ReviewRow label="Email address">
          <ReviewValue>{displayDetails.email || '—'}</ReviewValue>
        </ReviewRow>
        <ReviewRow label="Date of birth">
          <ReviewValue>{displayDetails.dateOfBirth || '—'}</ReviewValue>
        </ReviewRow>
        <ReviewRow label="Mobile phone">
          <ReviewValue>{displayDetails.mobilePhone || '—'}</ReviewValue>
        </ReviewRow>
      </ReviewSection>

      {/* Edit personal details dialog */}
      <Dialog
        open={editDetailsOpen}
        onClose={() => setEditDetailsOpen(false)}
        title="Edit personal details"
        size="medium"
        cancelLabel="Cancel"
        confirmLabel="Save"
        onConfirm={handleSaveDetails}
      >
        <Stack spacing={2}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
            <TextField label="First name" value={draftDetails.firstName} onChange={(e) => setDraftDetails({ ...draftDetails, firstName: e.target.value })} />
            <TextField label="Last name" value={draftDetails.lastName} onChange={(e) => setDraftDetails({ ...draftDetails, lastName: e.target.value })} />
          </Box>
          <TextField label="Middle name" value={draftDetails.middleName} onChange={(e) => setDraftDetails({ ...draftDetails, middleName: e.target.value })} />
          <TextField label="Residential address" value={draftDetails.residentialAddress} onChange={(e) => setDraftDetails({ ...draftDetails, residentialAddress: e.target.value })} />
          <TextField label="Email address" type="email" value={draftDetails.email} onChange={(e) => setDraftDetails({ ...draftDetails, email: e.target.value })} />
          <TextField label="Date of birth" value={draftDetails.dateOfBirth} onChange={(e) => setDraftDetails({ ...draftDetails, dateOfBirth: e.target.value })} />
          <TextField label="Mobile phone" type="tel" value={draftDetails.mobilePhone} onChange={(e) => setDraftDetails({ ...draftDetails, mobilePhone: e.target.value })} />
        </Stack>
      </Dialog>

      {/* Account setup — visible for both modes */}
      <ReviewSection title="Account setup" onEdit={() => onEditStep('setup-mode')}>
        <ReviewRow label="Setup preference">
          <ReviewValue>
            {state.setupMode === 'simple' ? 'Set it up for me' : "I'll customise it myself"}
          </ReviewValue>
        </ReviewRow>
      </ReviewSection>

      {/* Funding */}
      <ReviewSection title="Funding" onEdit={isSimple ? undefined : () => onEditStep('allocate')}>
        <ReviewRow label="Opening balance">
          <ReviewValue>
            {isSimple
              ? formatCurrency(state.accounts.reduce((sum, a) => sum + a.balance, 0))
              : purchasePrice > 0 ? formatCurrency(purchasePrice) : '—'}
          </ReviewValue>
        </ReviewRow>
      </ReviewSection>

      {/* Your payments */}
      <ReviewSection title="Your payments" onEdit={isSimple ? undefined : () => onEditStep('payment-schedule')}>
        <ReviewRow label="Payment frequency">
          <ReviewValue>
            {state.setupMode === 'simple'
              ? 'Fortnightly (Wednesdays)'
              : state.paymentSchedule.frequency
                ? state.paymentSchedule.frequency.charAt(0).toUpperCase() + state.paymentSchedule.frequency.slice(1)
                : '—'}
          </ReviewValue>
        </ReviewRow>
        <ReviewRow label="First payment date">
          <ReviewValue>
            {state.setupMode === 'simple'
              ? (() => {
                  const d = new Date();
                  d.setDate(d.getDate() + 14);
                  // Advance to next Wednesday (day 3)
                  d.setDate(d.getDate() + ((3 - d.getDay() + 7) % 7));
                  return d.toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' });
                })()
              : state.paymentSchedule.firstPaymentMonth
                ? new Date(state.paymentSchedule.firstPaymentMonth + 'T00:00:00').toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })
                : '—'}
          </ReviewValue>
        </ReviewRow>
        <ReviewRow label="Payment amount">
          <ReviewValue>
            {state.setupMode === 'simple'
              ? (() => {
                  const est = estimatePension(purchasePrice, PENSION_ESTIMATE_AGE, 'single');
                  return est ? formatCurrency(est.fortnightly) + ' / fortnight' : '—';
                })()
              : state.paymentSchedule.amountType === 'minimum'
                ? 'Minimum'
                : state.paymentSchedule.amountType === 'specific' && state.paymentSchedule.specificAmount > 0
                  ? `${formatCurrency(state.paymentSchedule.specificAmount)} per year`
                  : '—'}
          </ReviewValue>
        </ReviewRow>
        <ReviewRow label="Adjust for cost of living">
          <ReviewValue>
            {state.setupMode === 'simple' ? 'No' : state.paymentSchedule.adjustForCPI ? 'Yes' : 'No'}
          </ReviewValue>
        </ReviewRow>
      </ReviewSection>

      {/* Bank details */}
      <ReviewSection title="Bank details" onEdit={() => onEditStep('payments')}>
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

      {/* Investment strategy */}
      <InvestmentStrategySection state={state} onEdit={isSimple ? undefined : () => onEditStep('investment-strategy')} />

      {/* Reversionary beneficiary */}
      <ReviewSection title="Reversionary beneficiary" onEdit={() => onEditStep('beneficiary')}>
        {state.beneficiaryState?.nominate === 'yes' && state.beneficiaryState.beneficiary.relationship ? (
          <>
            <ReviewRow label="Relationship">
              <ReviewValue>
                {state.beneficiaryState.beneficiary.relationship.charAt(0).toUpperCase() +
                  state.beneficiaryState.beneficiary.relationship.slice(1)}
              </ReviewValue>
            </ReviewRow>
            <ReviewRow label="Name">
              <ReviewValue>
                {[
                  state.beneficiaryState.beneficiary.firstName,
                  state.beneficiaryState.beneficiary.middleName,
                  state.beneficiaryState.beneficiary.lastName,
                ]
                  .filter(Boolean)
                  .join(' ') || '—'}
              </ReviewValue>
            </ReviewRow>
            <ReviewRow label="Date of birth">
              <ReviewValue>{state.beneficiaryState.beneficiary.dateOfBirth || '—'}</ReviewValue>
            </ReviewRow>
            {state.beneficiaryState.beneficiary.phone && (
              <ReviewRow label="Phone number">
                <ReviewValue>{state.beneficiaryState.beneficiary.phone}</ReviewValue>
              </ReviewRow>
            )}
            {state.beneficiaryState.beneficiary.email && (
              <ReviewRow label="Email address">
                <ReviewValue>{state.beneficiaryState.beneficiary.email}</ReviewValue>
              </ReviewRow>
            )}
          </>
        ) : (
          <ReviewRow label="Nomination">
            <ReviewValue>No beneficiary nominated</ReviewValue>
          </ReviewRow>
        )}
      </ReviewSection>

      {/* Declaration */}
      <Stack spacing={3} sx={{ mt: 5 }}>
        <DeclarationBox />
        <Checkbox
          checked={state.reviewDeclarationChecked}
          onChange={onDeclarationChange}
          label="I accept these declarations and understand I can change my payment preferences anytime in Member Online."
        />
      </Stack>

      {showValidation && !state.reviewDeclarationChecked && (
        <Alert severity="error" message="Accept the declaration before you submit." />
      )}
    </Stack>
  );
}


