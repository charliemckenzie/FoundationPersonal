import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Alert } from '../../../components/Alert';
import { Button } from '../../../components/Button';
import { Checkbox } from '../../../components/Checkbox';
import { DescriptionList } from '../../../components/DescriptionList';
import { Dialog } from '../../../components/Dialog';
import { TextButton } from '../../../components/TextButton';
import { TextField } from '../../../components/TextField';
import { AddressCapture } from '../../../components/AddressField/AddressCapture';
import { mockAddressProvider } from '../../../components/AddressField/mockAddressProvider';
import type { Address } from '../../../components/AddressField';
import type { LifetimePensionState, LifetimePensionStepId, UserProfile, VerifyDetailsState } from '../types';
import { PENSION_ESTIMATE_AGE } from '../constants';
import { formatCurrency, totalSelectedAmount, estimateRetirementBonus, estimatePension } from '../utils';

interface StepReviewProps {
  state: LifetimePensionState;
  onEditStep: (stepId: LifetimePensionStepId) => void;
  onDeclarationChange: (checked: boolean) => void;
  showValidation: boolean;
  verifyDetailsState: VerifyDetailsState;
  onVerifyDetailsChange: (next: VerifyDetailsState) => void;
  profile: UserProfile;
  verifyMethod: 'online' | 'other';
}

/** Convert ISO date (yyyy-mm-dd) to dd/mm/yyyy for display. Returns the original string if it can't be parsed. */
function formatDob(iso: string): string {
  const [y, m, d] = iso.split('-');
  if (y && m && d) return `${d}/${m}/${y}`;
  return iso;
}

function optionLabel(state: LifetimePensionState): string {
  if (state.pensionOption === 'single') return 'Single option';
  if (state.pensionOption === 'spouse') return 'Spouse protection option';
  return 'Not selected';
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
          <Typography key={i} component="li" variant="small" sx={{ color: 'text.primary' }}>
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
  verifyDetailsState,
  onVerifyDetailsChange,
  verifyMethod,
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

  const selectedAccounts = state.accounts.filter((a) => a.transferAmount > 0);
  const purchasePrice = totalSelectedAmount(state);
  const estimate = estimatePension(purchasePrice, PENSION_ESTIMATE_AGE, state.pensionOption);
  const annualPayment = estimate?.annual ?? 0;
  const fortnightlyPayment = estimate?.fortnightly ?? 0;

  return (
    <Stack spacing={4}>
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Stack spacing={0.5}>
          <Typography variant="h5" component="h2">
            Review your Lifetime Pension application
          </Typography>
          <Typography variant="body" sx={{ color: 'text.primary' }}>
            This is a permanent purchase after the cooling-off period
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
            label="Spouse option"
            value={
              <Box sx={{ fontWeight: 700 }}>{optionLabel(state)}</Box>
            }
            action={<TextButton label="Edit" hideIcon aria-label="Edit option" onClick={() => onEditStep('option')} />}
          />
          {state.pensionOption === 'spouse' && (
            <DescriptionList.Item
              label="Spouse details"
              action={<TextButton label="Edit" hideIcon aria-label="Edit spouse details" onClick={() => onEditStep('option')} />}
              value={
                <Stack spacing={0.5}>
                  <Box>
                    <Box sx={{ fontWeight: 700 }}>{[state.spouseDetails.firstName, state.spouseDetails.lastName].filter(Boolean).join(' ') || '—'}</Box>
                  </Box>
                  {state.spouseDetails.dateOfBirth && (
                    <Typography variant="small" sx={{ color: 'text.muted', display: 'block' }}>Date of birth: {formatDob(state.spouseDetails.dateOfBirth)}</Typography>
                  )}
                  {state.spouseDetails.emailAddress && (
                    <Typography variant="small" sx={{ color: 'text.muted', display: 'block' }}>Email: {state.spouseDetails.emailAddress}</Typography>
                  )}
                  {state.spouseDetails.mobilePhone && (
                    <Typography variant="small" sx={{ color: 'text.muted', display: 'block' }}>Mobile: {state.spouseDetails.mobilePhone}</Typography>
                  )}
                </Stack>
              }
            />
          )}
          <DescriptionList.Item
            label="Purchase price"
            value={
              <Box>
                <Box sx={{ fontWeight: 700 }}>{formatCurrency(purchasePrice)}</Box>
                <Typography variant="small" sx={{ color: 'text.muted', display: 'block', mt: 0.25 }}>
                  Cooling-off period agreed to
                </Typography>
              </Box>
            }
            action={<TextButton label="Edit" hideIcon aria-label="Edit purchase price" onClick={() => onEditStep('funding')} />}
          />
          <DescriptionList.Item
            label="Funding preferences"
            value={
              selectedAccounts.length > 0 ? (
                <Stack spacing={1}>
                  {selectedAccounts.map((account) => {
                    const name = account.label.split(' - ')[0] ?? account.label;
                    return (
                      <Box key={account.id}>
                        <Box sx={{ fontWeight: 700 }}>{formatCurrency(account.transferAmount)}</Box>
                        <Typography variant="small" sx={{ color: 'text.muted', display: 'block', mt: 0.25 }}>
                          From {name}
                        </Typography>
                      </Box>
                    );
                  })}
                </Stack>
              ) : '—'
            }
            action={<TextButton label="Edit" hideIcon aria-label="Edit funding" onClick={() => onEditStep('allocate')} />}
          />
      </DescriptionList>

      {/* Payment details */}
      <DescriptionList
        title="Payment details"
        titleVariant="h6"
        titleAction={<TextButton label="Edit" hideIcon aria-label="Edit payment details" onClick={() => onEditStep('payments')} />}
      >
          <DescriptionList.Item label="Fortnightly payments" value={`${formatCurrency(fortnightlyPayment)} / fortnight`} />
          <DescriptionList.Item label="First payment date" value="Tue, 03 Feb 2026" />
          <DescriptionList.Item label="First year's income" value={formatCurrency(annualPayment)} />
          <DescriptionList.Item label="Estimated retirement bonus" value={formatCurrency(estimateRetirementBonus(purchasePrice))} />
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
              {verifyMethod === 'other'
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
          label="I accept these declarations and understand purchasing a Lifetime Pension account is a permanent purchase after the cooling-off period."
        />
      </Stack>

      {showValidation && !state.reviewDeclarationChecked && (
        <Alert severity="error" message="Accept the declaration before you submit." />
      )}
    </Stack>
  );
}


