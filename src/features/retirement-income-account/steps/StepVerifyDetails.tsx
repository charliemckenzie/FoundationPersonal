import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Alert } from '../../../components/Alert';
import { RadioGroup } from '../../../components/RadioGroup';
import { TextField } from '../../../components/TextField';
import type { UserProfile, VerifyDetailsState } from '../types';

export interface VerifyDetailsContentProps {
  profile: UserProfile;
  state: VerifyDetailsState;
  onChange: (next: VerifyDetailsState) => void;
  showValidation: boolean;
}

const CONFIRMATION_OPTIONS = [
  { value: 'yes', label: 'Yes, these are correct' },
  { value: 'no', label: 'No, update my details' },
];

export function requiredFieldsFilled(edited: UserProfile): boolean {
  return (
    edited.firstName.trim() !== '' &&
    edited.lastName.trim() !== '' &&
    edited.residentialAddress.trim() !== '' &&
    edited.email.trim() !== '' &&
    edited.dateOfBirth.trim() !== '' &&
    edited.mobilePhone.trim() !== ''
  );
}

export function verifyDetailsCanContinue(state: VerifyDetailsState): boolean {
  if (state.confirmed === 'yes') return true;
  if (state.confirmed === 'no') return requiredFieldsFilled(state.edited);
  return false;
}

/**
 * Modal content for the Verify Details gate.
 * Fields are always visible (read-only by default).
 * Selecting "No" makes them editable.
 */
export function VerifyDetailsContent({
  profile,
  state,
  onChange,
  showValidation,
}: VerifyDetailsContentProps) {
  const editable = state.confirmed === 'no';
  const fields = editable ? state.edited : profile;

  function updateField(key: keyof UserProfile, value: string) {
    onChange({ ...state, edited: { ...state.edited, [key]: value } });
  }

  return (
    <Stack spacing={2.5}>
      <Typography variant="body" sx={{ color: 'text.primary' }}>
        Please check that your details below are correct. These are used to verify your
        identity — if your address is wrong, verification may fail.
      </Typography>

      {/* Fields — always visible */}
      <Stack spacing={2}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
            gap: 2,
          }}
        >
          <TextField
            label="First name"
            value={fields.firstName}
            disabled={!editable}
            onChange={(e) => updateField('firstName', e.target.value)}
          />
          <TextField
            label="Last name"
            value={fields.lastName}
            disabled={!editable}
            onChange={(e) => updateField('lastName', e.target.value)}
          />
        </Box>
        <TextField
          label="Middle name"
          value={fields.middleName}
          disabled={!editable}
          onChange={(e) => updateField('middleName', e.target.value)}
        />
        <TextField
          label="Residential Address"
          value={fields.residentialAddress}
          disabled={!editable}
          onChange={(e) => updateField('residentialAddress', e.target.value)}
        />
        <TextField
          label="Email address"
          type="email"
          value={fields.email}
          disabled={!editable}
          onChange={(e) => updateField('email', e.target.value)}
        />
        <TextField
          label="Date of birth"
          value={fields.dateOfBirth}
          disabled={!editable}
          onChange={(e) => updateField('dateOfBirth', e.target.value)}
        />
        <TextField
          label="Mobile phone"
          type="tel"
          value={fields.mobilePhone}
          disabled={!editable}
          onChange={(e) => updateField('mobilePhone', e.target.value)}
        />
      </Stack>

      {/* Confirmation radio — below the fields */}
      <Box
        sx={{
          borderTop: '1px solid',
          borderTopColor: 'border.subtle',
          pt: 2.5,
        }}
      >
        <RadioGroup
          legend="Are these details correct?"
          legendBold
          options={CONFIRMATION_OPTIONS}
          value={state.confirmed}
          direction="row"
          onChange={(value) =>
            onChange({ ...state, confirmed: value as 'yes' | 'no' })
          }
        />
      </Box>

      {showValidation && state.confirmed === '' && (
        <Alert severity="error" message="Please confirm whether your details are correct." />
      )}
    </Stack>
  );
}
