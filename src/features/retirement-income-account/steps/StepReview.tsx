import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import type { Address } from '../../../components/AddressField';
import { AddressCapture } from '../../../components/AddressField/AddressCapture';
import { mockAddressProvider } from '../../../components/AddressField/mockAddressProvider';
import { Alert } from '../../../components/Alert';
import { Button } from '../../../components/Button';
import { Checkbox } from '../../../components/Checkbox';
import { DescriptionList } from '../../../components/DescriptionList';
import { Dialog } from '../../../components/Dialog';
import { Icon } from '../../../components/Icon';
import { TextButton } from '../../../components/TextButton';
import { TextField } from '../../../components/TextField';
import { MOCK_INVESTMENT_OPTIONS } from './StepInvestmentMix';
import type { RetirementIncomeAccountState, RetirementIncomeAccountStepId, UserProfile, VerifyDetailsState } from '../types';
import type { OtherIdMethod } from '../../../features/idv';
import { formatCurrency, totalSelectedAmount, estimatePension, estimateRetirementBonus } from '../utils';
import { PENSION_ESTIMATE_AGE, PAYMENT_FREQUENCY_DIVISORS, PAYMENT_PERIOD_LABEL } from '../constants';

interface OtherIdSummary {
  method: OtherIdMethod;
  fileNames: string[];
}

interface StepReviewProps {
  state: RetirementIncomeAccountState;
  onEditStep: (stepId: RetirementIncomeAccountStepId) => void;
  onDeclarationChange: (checked: boolean) => void;
  showValidation: boolean;
  verifyDetailsState: VerifyDetailsState;
  onVerifyDetailsChange: (next: VerifyDetailsState) => void;
  profile: UserProfile;
  verifyMethod: 'online' | 'other';
  otherIdSummary?: OtherIdSummary;
}

/** Convert ISO date (yyyy-mm-dd) to dd/mm/yyyy for display. Returns the original string if it can't be parsed. */
function formatDob(iso: string): string {
  const [y, m, d] = iso.split('-');
  if (y && m && d) return `${d}/${m}/${y}`;
  return iso;
}

function parseAddressString(raw: string): Address {
  const parts = raw.split(', ').map((s) => s.trim());
  const last = parts[parts.length - 1] ?? '';
  const statePostcodeMatch = last.match(/^([A-Z]{2,3})\s+(\d{4})$/);
  if (statePostcodeMatch && parts.length >= 3) {
    return {
      type: 'australian',
      line1: parts[0] ?? '',
      line2: parts.length === 4 ? (parts[1] ?? '') : '',
      suburb: parts.length === 4 ? (parts[2] ?? '') : (parts[1] ?? ''),
      state: statePostcodeMatch[1] ?? '',
      postcode: statePostcodeMatch[2] ?? '',
    };
  }
  return { type: 'australian', line1: raw, line2: '', suburb: '', state: '', postcode: '' };
}

function addressToString(addr: Address): string {
  if (addr.type === 'australian') {
    return [addr.line1, addr.line2, addr.suburb, addr.state, addr.postcode].filter(Boolean).join(', ');
  }
  return [addr.line1, addr.line2, addr.city, addr.stateProvince, addr.postcode].filter(Boolean).join(', ');
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
    <DescriptionList
      title="Investment strategy"
      titleVariant="h6"
      titleAction={onEdit ? <TextButton label="Edit" hideIcon aria-label="Edit investment strategy" onClick={onEdit} /> : undefined}
    >
      <DescriptionList.Item
        label="Strategy type"
        value={
          <Stack spacing={0} sx={{ alignItems: 'flex-start' }}>
            <Typography variant="body" sx={{ color: 'text.primary', fontWeight: 700 }}>{mixLabel}</Typography>
            {mixMode === 'custom' && (
              <>
                <ExpandToggle
                  expanded={showAllocation}
                  onToggle={() => setShowAllocation((v) => !v)}
                  expandLabel="View allocation"
                  collapseLabel="Hide allocation"
                />
                {showAllocation && <AllocationTable allocations={state.investmentMix.allocations} label="Allocation" />}
              </>
            )}
          </Stack>
        }
      />
      <DescriptionList.Item
        label="Drawdown options"
        value={
          <Stack spacing={0} sx={{ alignItems: 'flex-start' }}>
            <Typography variant="body" sx={{ color: 'text.primary', fontWeight: 700 }}>{drawdownLabel}</Typography>
            {drawdownMode === 'custom' && (
              <>
                <ExpandToggle
                  expanded={showDrawdown}
                  onToggle={() => setShowDrawdown((v) => !v)}
                  expandLabel="View preferences"
                  collapseLabel="Hide preferences"
                />
                {showDrawdown && <DrawdownTable drawdown={state.drawdown} />}
              </>
            )}
          </Stack>
        }
      />
    </DescriptionList>
  );
}

export function StepReview({
  state,
  onEditStep,
  onDeclarationChange,
  showValidation,
  verifyDetailsState,
  onVerifyDetailsChange,
  profile,
  verifyMethod,
  otherIdSummary,
}: StepReviewProps) {
  const [editDetailsOpen, setEditDetailsOpen] = useState(false);
  const [draftDetails, setDraftDetails] = useState<UserProfile>(verifyDetailsState.edited);
  const [draftAddress, setDraftAddress] = useState<Address>({ type: 'australian', line1: '', line2: '', suburb: '', state: '', postcode: '' });

  const displayDetails = verifyDetailsState.edited;

  function handleOpenEdit() {
    setDraftDetails({ ...verifyDetailsState.edited });
    setDraftAddress(parseAddressString(verifyDetailsState.edited.residentialAddress));
    setEditDetailsOpen(true);
  }

  function handleSaveDetails() {
    onVerifyDetailsChange({ confirmed: 'no', edited: { ...draftDetails, residentialAddress: addressToString(draftAddress) } });
    setEditDetailsOpen(false);
  }

  const isSimple = state.setupMode === 'simple';
  const purchasePrice = isSimple
    ? state.accounts.reduce((sum, a) => sum + a.balance, 0)
    : totalSelectedAmount(state);

  const effectiveFrequency = isSimple ? 'fortnightly' : (state.paymentSchedule.frequency ?? 'fortnightly');
  const effectiveAnnual = (() => {
    const minAnnual = purchasePrice * 0.05;
    if (isSimple) return minAnnual;
    if (state.paymentSchedule.amountType === 'specific' && state.paymentSchedule.specificAmount > 0) return state.paymentSchedule.specificAmount;
    return minAnnual;
  })();
  const perFrequencyPayment = effectiveAnnual / (PAYMENT_FREQUENCY_DIVISORS[effectiveFrequency] ?? 26);
  const freqLabel = effectiveFrequency.charAt(0).toUpperCase() + effectiveFrequency.slice(1);
  const periodLabel = PAYMENT_PERIOD_LABEL[effectiveFrequency] ?? effectiveFrequency;

  return (
    <Stack spacing={4}>
      {/* Header */}
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Stack spacing={0.5}>
          <Typography variant="h5" component="h2">
            Review your Retirement Income Account application
          </Typography>

        </Stack>
        <Button
          label="Print"
          variant="outlined"
          size="small"
          startIcon="print"
          onClick={() => window.print()}
        />
      </Stack>

      {/* Product details */}
      <DescriptionList title="Product details" titleVariant="h6">
        <DescriptionList.Item
          label="Setup preference"
          value={state.setupMode === 'simple' ? 'Set it up for me' : "I'll customise it myself"}
          action={<TextButton label="Edit" hideIcon aria-label="Edit account setup" onClick={() => onEditStep('setup-mode')} />}
        />
        <DescriptionList.Item
          label="Opening balance"
          value={
            isSimple
              ? formatCurrency(state.accounts.reduce((sum, a) => sum + a.balance, 0))
              : purchasePrice > 0 ? formatCurrency(purchasePrice) : '—'
          }
          action={!isSimple ? <TextButton label="Edit" hideIcon aria-label="Edit funding" onClick={() => onEditStep('allocate')} /> : undefined}
        />
      </DescriptionList>

      {/* Payment details */}
      <DescriptionList
        title="Payment details"
        titleVariant="h6"
        titleAction={<TextButton label="Edit" hideIcon aria-label="Edit payment details" onClick={() => onEditStep('payments')} />}
      >
        <DescriptionList.Item
          label={`${freqLabel} payments`}
          value={purchasePrice > 0 ? `${formatCurrency(perFrequencyPayment)} / ${periodLabel}` : '—'}
        />
        <DescriptionList.Item
          label="First payment date"
          value={
            isSimple
              ? (() => {
                  const d = new Date();
                  d.setDate(d.getDate() + 14);
                  d.setDate(d.getDate() + ((3 - d.getDay() + 7) % 7));
                  return d.toLocaleDateString('en-AU', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
                })()
              : state.paymentSchedule.firstPaymentMonth
                ? new Date(state.paymentSchedule.firstPaymentMonth + 'T00:00:00').toLocaleDateString('en-AU', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })
                : '—'
          }
        />
        <DescriptionList.Item
          label="First year's income"
          value={purchasePrice > 0 ? formatCurrency(effectiveAnnual) : '—'}
        />
        <DescriptionList.Item
          label="Estimated retirement bonus"
          value={purchasePrice > 0 ? formatCurrency(estimateRetirementBonus(purchasePrice)) : '—'}
        />
        <DescriptionList.Item
          label="Bank details"
          value={
            <Stack spacing={0.5}>
              <Typography variant="body" sx={{ color: 'text.primary', fontWeight: 700 }}>Acc Name: {state.bankDetails.accountName || '—'}</Typography>
              <Typography variant="body" sx={{ color: 'text.primary', fontWeight: 700 }}>BSB: {state.bankDetails.bsb || '—'}</Typography>
              <Typography variant="body" sx={{ color: 'text.primary', fontWeight: 700 }}>Acc No. {state.bankDetails.accountNumber || '—'}</Typography>
            </Stack>
          }
        />
      </DescriptionList>

      {/* Personal details */}
      <DescriptionList
        title="Personal details"
        titleVariant="h6"
        titleAction={<TextButton label="Edit" hideIcon aria-label="Edit personal details" onClick={handleOpenEdit} />}
      >
        <DescriptionList.Item
          label="Full name"
          value={[displayDetails.firstName, displayDetails.middleName, displayDetails.lastName].filter(Boolean).join(' ') || '—'}
        />
        <DescriptionList.Item label="Date of birth" value={displayDetails.dateOfBirth ? formatDob(displayDetails.dateOfBirth) : '—'} />
        <DescriptionList.Item label="Mobile phone" value={displayDetails.mobilePhone || '—'} />
        <DescriptionList.Item label="Email address" value={displayDetails.email || '—'} />
        <DescriptionList.Item
          label="Residential address"
          value={
            (() => {
              const addr = displayDetails.residentialAddress || '—';
              const commaIdx = addr.indexOf(',');
              const line1 = commaIdx > -1 ? addr.slice(0, commaIdx) : addr;
              const line2 = commaIdx > -1 ? addr.slice(commaIdx + 1).trim() : null;
              return (
                <Stack spacing={0}>
                  <Typography variant="body" sx={{ color: 'text.primary', fontWeight: 700 }}>{line1}</Typography>
                  {line2 && <Typography variant="body" sx={{ color: 'text.primary', fontWeight: 700 }}>{line2}</Typography>}
                </Stack>
              );
            })()
          }
        />
      </DescriptionList>

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
          <Typography variant="body" sx={{ color: 'text.primary' }}>
            If there&rsquo;s an error with your name or date of birth please call us.
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
            <TextField label="First name" value={draftDetails.firstName} disabled onChange={() => {}} />
            <TextField label="Last name" value={draftDetails.lastName} disabled onChange={() => {}} />
          </Box>
          <TextField label="Middle name" value={draftDetails.middleName} onChange={(e) => setDraftDetails({ ...draftDetails, middleName: e.target.value })} />
          <Stack spacing={1.5}>
            <Typography variant="body" sx={{ fontWeight: 700, color: 'text.primary' }}>Residential address</Typography>
            <AddressCapture
              value={draftAddress}
              onChange={setDraftAddress}
              section="residential"
              lookup={{ provider: mockAddressProvider }}
            />
          </Stack>
          <TextField label="Email address" type="email" value={draftDetails.email} onChange={(e) => setDraftDetails({ ...draftDetails, email: e.target.value })} />
          <TextField label="Date of birth" value={draftDetails.dateOfBirth} disabled onChange={() => {}} />
          <TextField label="Mobile phone" type="tel" value={draftDetails.mobilePhone} onChange={(e) => setDraftDetails({ ...draftDetails, mobilePhone: e.target.value })} />
        </Stack>
      </Dialog>

      {/* Investment strategy */}
      <InvestmentStrategySection state={state} onEdit={isSimple ? undefined : () => onEditStep('investment-strategy')} />

      {/* Reversionary beneficiary */}
      <DescriptionList
        title="Reversionary beneficiary"
        titleVariant="h6"
        titleAction={<TextButton label="Edit" hideIcon aria-label="Edit reversionary beneficiary" onClick={() => onEditStep('beneficiary')} />}
      >
        {state.beneficiaryState?.nominate === 'yes' && state.beneficiaryState.beneficiary.relationship ? (
          <>
            <DescriptionList.Item
              label="Relationship"
              value={
                state.beneficiaryState.beneficiary.relationship.charAt(0).toUpperCase() +
                state.beneficiaryState.beneficiary.relationship.slice(1)
              }
            />
            <DescriptionList.Item
              label="Name"
              value={
                [
                  state.beneficiaryState.beneficiary.firstName,
                  state.beneficiaryState.beneficiary.middleName,
                  state.beneficiaryState.beneficiary.lastName,
                ]
                  .filter(Boolean)
                  .join(' ') || '—'
              }
            />
            <DescriptionList.Item
              label="Date of birth"
              value={state.beneficiaryState.beneficiary.dateOfBirth || '—'}
            />
            {state.beneficiaryState.beneficiary.phone && (
              <DescriptionList.Item label="Phone number" value={state.beneficiaryState.beneficiary.phone} />
            )}
            {state.beneficiaryState.beneficiary.email && (
              <DescriptionList.Item label="Email address" value={state.beneficiaryState.beneficiary.email} />
            )}
          </>
        ) : (
          <DescriptionList.Item label="Nomination" value="No beneficiary nominated" />
        )}
      </DescriptionList>

      {/* Identity verification */}
      <DescriptionList
        title="Identity verification"
        titleVariant="h6"
        titleAction={<TextButton label="Edit" hideIcon aria-label="Edit identity verification" onClick={() => onEditStep('idv')} />}
      >
        <DescriptionList.Item
          label="Status"
          value={
            <Box sx={{ fontWeight: 700 }}>
              {verifyMethod === 'other' && otherIdSummary
                ? otherIdSummary.method === 'later'
                  ? 'Provide identity later'
                  : [
                      otherIdSummary.method === 'selfie' ? 'Selfie ID' : 'Certified ID',
                      otherIdSummary.fileNames.length > 0 ? otherIdSummary.fileNames.join(', ') : 'No files uploaded',
                    ].join(': ')
                : verifyMethod === 'other'
                ? 'Member will supply documents as per our Identity Factsheet'
                : 'Digital verification complete'}
            </Box>
          }
        />
      </DescriptionList>

      {/* Declaration */}
      <Stack spacing={3}>
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


