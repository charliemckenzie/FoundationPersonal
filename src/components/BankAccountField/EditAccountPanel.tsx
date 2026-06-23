import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { BankDetailsField } from '../BankDetailsField';
import type { BankDetailsValue } from '../BankDetailsField';
import { Button } from '../Button';
import { Alert } from '../Alert';
import { Icon } from '../Icon';
import type { VerificationResult } from './types';

/** Delay in ms between "verified" message and the account being saved. */
const SAVE_DELAY_MS = 1500;

interface EditAccountPanelProps {
  /** Current account details to pre-populate the form. */
  defaultValue: BankDetailsValue;
  /** Called to verify the updated account details. Returns success/failure. */
  onVerify: (details: BankDetailsValue) => Promise<VerificationResult>;
  /** Called after verification succeeds and the post-verify delay has elapsed. */
  onSaveConfirmed: (details: BankDetailsValue) => void;
  onCancel: () => void;
  disabled?: boolean;
}

function isBankDetailsComplete(value: BankDetailsValue): boolean {
  const digits = value.bsb.replace(/\D/g, '');
  return digits.length === 6 && value.accountNumber.trim() !== '' && value.accountName.trim() !== '';
}

export function EditAccountPanel({
  defaultValue,
  onVerify,
  onSaveConfirmed,
  onCancel,
  disabled = false,
}: EditAccountPanelProps) {
  const [value, setValue] = useState<BankDetailsValue>(defaultValue);
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
      setVerifying(false);
      setVerified(true);
      await new Promise<void>((resolve) => setTimeout(resolve, SAVE_DELAY_MS));
      onSaveConfirmed(value);
    } catch {
      setVerifying(false);
      setVerificationError('Something went wrong. Please try again.');
    }
  }

  return (
    <Stack spacing={2} sx={{ pt: 2 }}>
      <Divider />
      <Typography variant="h6">Update account</Typography>

      <div style={{ marginTop: 0 }}>
        <BankDetailsField
          onChange={setValue}
          defaultValue={defaultValue}
          showValidation={showValidation}
          disabled={disabled || verifying}
        />
      </div>

      {verificationError && (
        <Alert severity="error" message={verificationError} />
      )}

      {verified && (
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <Icon icon="circle-check" style="solid" color="success" size="md" />
          <Typography variant="small" sx={{ color: 'success.main', fontWeight: 'fontWeightMedium' }}>
            Account verified. Saving changes…
          </Typography>
        </Stack>
      )}

      <Stack direction="row" spacing={1.5}>
        <Button
          label="Verify and save"
          size="small"
          variant="outlined"
          disabled={disabled || verifying || verified}
          loading={verifying || verified}
          hideLoadingText
          aria-busy={verifying || verified}
          onClick={handleVerify}
          type="button"
        />
        {!verified && (
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
  );
}
