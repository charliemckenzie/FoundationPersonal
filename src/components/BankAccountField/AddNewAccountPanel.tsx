import type React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { BankDetailsField } from '../BankDetailsField';
import type { BankDetailsValue } from '../BankDetailsField';
import { Button } from '../Button';
import { Alert } from '../Alert';
import { Icon } from '../Icon';
import type { VerificationResult } from './types';

/** Delay in ms between "verified" message and the account being added. */
const ADD_DELAY_MS = 1500;

interface AddNewAccountPanelProps {
  /** Called to verify the account details. Returns success/failure. */
  onVerify: (details: BankDetailsValue) => Promise<VerificationResult>;
  /** Called after verification succeeds and the post-verify delay has elapsed. */
  onAddConfirmed: (details: BankDetailsValue) => void;
  onCancel?: () => void;
  disabled?: boolean;
  /** Ref forwarded to the first focusable element in the panel (the fieldset). */
  firstFocusRef?: React.RefObject<HTMLElement | null>;
}

function isBankDetailsComplete(value: BankDetailsValue): boolean {
  const digits = value.bsb.replace(/\D/g, '');
  return digits.length === 6 && value.accountNumber.trim() !== '' && value.accountName.trim() !== '';
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
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const [verificationError, setVerificationError] = useState<string | undefined>();

  async function handleVerify() {
    setShowValidation(true);
    setVerificationError(undefined);

    if (!isBankDetailsComplete(value)) {
      return;
    }

    setVerifying(true);
    try {
      const result = await onVerify(value);
      if (!result.success) {
        setVerifying(false);
        setVerificationError(result.errorMessage ?? 'Verification failed. Please try again.');
        return;
      }
      // Step 1 complete — show the verified success message
      setVerifying(false);
      setVerified(true);
      // Step 2 — brief delay then hand off to the parent to add the account
      await new Promise<void>((resolve) => setTimeout(resolve, ADD_DELAY_MS));
      onAddConfirmed(value);
    } catch {
      setVerifying(false);
      setVerificationError('Something went wrong. Please try again.');
    }
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

        {/* firstFocusRef is attached to a wrapper so the parent can move focus here */}
        <div ref={firstFocusRef as React.RefObject<HTMLDivElement>}>
          <BankDetailsField
            onChange={setValue}
            showValidation={showValidation}
            disabled={disabled || verifying}
          />
        </div>

        {verificationError && (
          <Alert
            severity="error"
            message={verificationError}
          />
        )}

        {verified && (
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Icon icon="circle-check" style="solid" color="success" size="md" />
            <Typography variant="small" sx={{ color: 'success.main', fontWeight: 'fontWeightMedium' }}>
              Account verified. Now adding account…
            </Typography>
          </Stack>
        )}

        <Stack direction="row" spacing={1.5}>
          <Button
            label="Verify and add"
            size="small"
            variant="outlined"
            disabled={disabled || verifying || verified}
            loading={verifying || verified}
            hideLoadingText
            aria-busy={verifying || verified}
            onClick={handleVerify}
            type="button"
          />
          {onCancel && !verified && (
            <Button
              label="Cancel"
              size="small"
              variant="ghost"
              disabled={disabled || verifying}
              onClick={onCancel}
              type="button"
            />
          )}
        </Stack>
      </Stack>
    </Box>
  );
}
