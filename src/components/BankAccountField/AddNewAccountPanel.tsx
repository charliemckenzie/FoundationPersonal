import type React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { BankDetailsField } from '../BankDetailsField';
import type { BankDetailsValue } from '../BankDetailsField';
import { formatBsb } from '../BankDetailsField/utils';
import { Button } from '../Button';
import { Alert } from '../Alert';
import { DescriptionList } from '../DescriptionList';
import type { CopResult, VerificationResult } from './types';

interface AddNewAccountPanelProps {
  /** Called to verify the account details. Returns a VerificationResult which may include CoP data. */
  onVerify: (details: BankDetailsValue) => Promise<VerificationResult>;
  /** Called when the user confirms adding the account after seeing the CoP result. */
  onAddConfirmed: (details: BankDetailsValue) => void;
  onCancel?: () => void;
  disabled?: boolean;
  /** Ref forwarded to the first focusable element in the panel (the fieldset). */
  firstFocusRef?: React.RefObject<HTMLElement | null>;
}

type Phase =
  | { kind: 'form' }
  | { kind: 'verifying' }
  | { kind: 'cop'; copResult: CopResult; resolvedName: string; enteredName: string };

function isBankDetailsComplete(value: BankDetailsValue): boolean {
  const digits = value.bsb.replace(/\D/g, '');
  return digits.length === 6 && value.accountNumber.trim() !== '' && value.accountName.trim() !== '';
}

const COP_ALERT_CONFIG = {
  match: {
    severity: 'success' as const,
    message: (resolvedName: string) =>
      `The account is in the name of ${resolvedName}.`,
  },
  'close-match': {
    severity: 'warning' as const,
    message: () =>
      'Please double check the recipient details as an incorrect payment may be difficult to retrieve.',
  },
  'no-match': {
    severity: 'error' as const,
    message: () =>
      'Please double check the recipient details as an incorrect payment may be difficult to retrieve.',
  },
};

function CopResultCard({
  copResult,
  resolvedName,
  enteredName,
  value,
}: {
  copResult: CopResult;
  resolvedName: string;
  enteredName: string;
  value: BankDetailsValue;
}) {
  const { severity, message } = COP_ALERT_CONFIG[copResult];

  const statusTitle = {
    match: `The account is in the name of ${resolvedName}`,
    'close-match': `The account is in the name of ${resolvedName}`,
    'no-match': 'The account name entered does not match the account.',
  }[copResult];

  return (
    <Stack spacing={2}>
      {/* Status alert — the CoP verdict */}
      <Alert severity={severity} title={statusTitle} message={message(resolvedName)} />

      {/* Account details */}
      <DescriptionList
        title="Account details"
        titleVariant="h6"
        density="condensed"
        sx={{
          backgroundColor: 'background.tintNeutral',
          border: 'none',
          borderRadius: '0.75rem',
          px: { xs: 2, sm: 3 },
          py: 2,
          pt: 2,
          pb: 2,
        }}
      >
        <DescriptionList.Item label="Account name you entered" value={enteredName} />
        <DescriptionList.Item label="Account name" value={value.accountName} />
        <DescriptionList.Item label="BSB" value={formatBsb(value.bsb.replace(/\D/g, ''))} />
        <DescriptionList.Item label="Account number" value={value.accountNumber} />
      </DescriptionList>
    </Stack>
  );
}

export function AddNewAccountPanel({
  onVerify,
  onAddConfirmed,
  onCancel,
  disabled = false,
  firstFocusRef,
}: AddNewAccountPanelProps) {
  const [value, setValue] = useState<BankDetailsValue>({ bsb: '', accountNumber: '', accountName: '' });
  const [showValidation, setShowValidation] = useState(false);
  const [verificationError, setVerificationError] = useState<string | undefined>();
  const [phase, setPhase] = useState<Phase>({ kind: 'form' });

  const isVerifying = phase.kind === 'verifying';
  const isCop = phase.kind === 'cop';

  async function handleVerify() {
    setShowValidation(true);
    setVerificationError(undefined);

    if (!isBankDetailsComplete(value)) {
      return;
    }

    setPhase({ kind: 'verifying' });
    try {
      const result = await onVerify(value);
      if (!result.success) {
        setPhase({ kind: 'form' });
        setVerificationError(result.errorMessage ?? 'Verification failed. Please try again.');
        return;
      }

      if (result.copResult) {
        // Part 2 — show CoP result before confirming
        setPhase({
          kind: 'cop',
          copResult: result.copResult,
          resolvedName: result.resolvedName ?? value.accountName,
          enteredName: value.accountName,
        });
      } else {
        // No CoP data — backwards-compatible: add immediately
        onAddConfirmed(value);
      }
    } catch {
      setPhase({ kind: 'form' });
      setVerificationError('Something went wrong. Please try again.');
    }
  }

  function handleConfirmAndAdd() {
    onAddConfirmed(value);
  }

  function handleGoBack() {
    setPhase({ kind: 'form' });
    setVerificationError(undefined);
  }

  return (
    <Box
      sx={{
        border: '1px solid',
        borderColor: 'border.default',
        borderRadius: '1rem',
        backgroundColor: 'background.paper',
        p: { xs: 3, sm: 4 },
      }}
    >
      <Stack spacing={2}>
        <Typography variant="h6">Add new account</Typography>

        {/* Part 1 — form fields (hidden during CoP review, not unmounted so values persist) */}
        {!isCop && (
          <>
            {/* firstFocusRef is attached to a wrapper so the parent can move focus here */}
            <div ref={firstFocusRef as React.RefObject<HTMLDivElement>} style={{ marginTop: 0 }}>
              <BankDetailsField
                onChange={setValue}
                showValidation={showValidation}
                disabled={disabled || isVerifying}
              />
            </div>

            {verificationError && (
              <Alert severity="error" message={verificationError} />
            )}

            <Stack direction="row" spacing={1.5}>
              <Button
                label="Verify"
                size="small"
                variant="outlined"
                disabled={disabled || isVerifying}
                loading={isVerifying}
                hideLoadingText
                aria-busy={isVerifying}
                onClick={handleVerify}
                type="button"
              />
              {onCancel && (
                <Button
                  label="Cancel"
                  size="small"
                  variant="ghost"
                  disabled={disabled || isVerifying}
                  onClick={onCancel}
                  type="button"
                />
              )}
            </Stack>
          </>
        )}

        {/* Part 2 — Confirmation of Payee result */}
        {isCop && (
          <Stack spacing={2}>
            <Box role="status" aria-live="polite" aria-atomic="true">
              <CopResultCard
                copResult={phase.copResult}
                resolvedName={phase.resolvedName}
                enteredName={phase.enteredName}
                value={value}
              />
            </Box>

            <Stack direction="row" spacing={1.5}>
              <Button
                label="Confirm and add"
                size="small"
                variant="outlined"
                disabled={disabled}
                onClick={handleConfirmAndAdd}
                type="button"
              />
              <Button
                label="Go back"
                size="small"
                variant="ghost"
                disabled={disabled}
                onClick={handleGoBack}
                type="button"
              />
            </Stack>
          </Stack>
        )}
      </Stack>
    </Box>
  );
}
