import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Alert } from '../../../components/Alert';
import { Checkbox } from '../../../components/Checkbox';
import { DateOfBirthField } from '../../../components/DateOfBirthField';
import { Icon } from '../../../components/Icon';
import { RadioGroup } from '../../../components/RadioGroup';
import { TextField } from '../../../components/TextField';
import { Tooltip } from '../../../components/Tooltip';
import type { PensionOption, SpouseDetails } from '../types';

interface StepOptionProps {
  pensionOption: PensionOption;
  spouseDetails: SpouseDetails;
  onPensionOptionChange: (option: PensionOption) => void;
  onSpouseDetailsChange: (next: SpouseDetails) => void;
  showValidation: boolean;
}

const OPTION_CHOICES = [
  {
    value: 'single',
    label: 'Single option',
    description: 'Payments will end upon your death.',
  },
  {
    value: 'spouse',
    label: 'Spouse protection option',
    description: 'Upon your death, payments continue to your spouse for the rest of their life.',
  },
];

export function StepOption({
  pensionOption,
  spouseDetails,
  onPensionOptionChange,
  onSpouseDetailsChange,
  showValidation,
}: StepOptionProps) {
  const spouseMode = pensionOption === 'spouse';

  function updateField<K extends keyof SpouseDetails>(key: K, value: SpouseDetails[K]) {
    onSpouseDetailsChange({ ...spouseDetails, [key]: value });
  }

  function fieldError(value: string) {
    return showValidation && spouseMode && !value.trim();
  }

  return (
    <Stack spacing={4}>
      <Stack spacing={2}>
        <div>
          <Typography variant="h5" sx={{ mb: 0.5 }}>
            Select a single or spouse option
          </Typography>
          <Typography variant="body" sx={{ color: 'text.primary' }}>
            Your decision affects payment rates and cannot be changed once your Lifetime Pension starts.
          </Typography>
        </div>

      <RadioGroup
        variant="boxed"
        value={pensionOption}
        options={OPTION_CHOICES}
        onChange={(value) => onPensionOptionChange(value as PensionOption)}
      />

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
        <Typography variant="small" sx={{ color: 'text.muted' }}>
          Both options offer money-back protection.
        </Typography>
        <Tooltip title="If you pass away before receiving payments equal to your purchase price, the remaining balance is paid to your beneficiaries or estate." placement="top">
          <Box component="span" sx={{ display: 'inline-flex', color: 'info.main', cursor: 'help' }}>
            <Icon icon="circle-info" size="sm" color="info" />
          </Box>
        </Tooltip>
      </Box>

      {showValidation && !pensionOption && (
        <Alert severity="error" message="Select either Single option or Spouse protection option to continue." />
      )}

      {spouseMode && (
        <Box
          sx={{
            border: '1px solid',
            borderColor: 'border.default',
            borderRadius: (t) => `${t.shape.md}px`,
            backgroundColor: 'background.paper',
            p: 3,
          }}
        >
          <Stack spacing={2.5}>
            <Typography variant="h6">Spouse details</Typography>
            <Alert
              severity="warning"
              message="The spouse you nominate for this option is permanent and cannot be changed once selected."
            />

            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="First name"
                  fullWidth
                  value={spouseDetails.firstName}
                  onChange={(event) => updateField('firstName', event.target.value)}
                  error={fieldError(spouseDetails.firstName)}
                  errorMessage={fieldError(spouseDetails.firstName) ? 'First name is required' : undefined}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Last name"
                  fullWidth
                  value={spouseDetails.lastName}
                  onChange={(event) => updateField('lastName', event.target.value)}
                  error={fieldError(spouseDetails.lastName)}
                  errorMessage={fieldError(spouseDetails.lastName) ? 'Last name is required' : undefined}
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  label="Middle name"
                  fullWidth
                  value={spouseDetails.middleName}
                  onChange={(event) => updateField('middleName', event.target.value)}
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  label="Residential address"
                  fullWidth
                  value={spouseDetails.residentialAddress}
                  onChange={(event) => updateField('residentialAddress', event.target.value)}
                  error={fieldError(spouseDetails.residentialAddress)}
                  errorMessage={fieldError(spouseDetails.residentialAddress) ? 'Residential address is required' : undefined}
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  label="Email address"
                  fullWidth
                  type="email"
                  value={spouseDetails.emailAddress}
                  onChange={(event) => updateField('emailAddress', event.target.value)}
                  error={fieldError(spouseDetails.emailAddress)}
                  errorMessage={fieldError(spouseDetails.emailAddress) ? 'Email address is required' : undefined}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <DateOfBirthField
                  fullWidth
                  value={spouseDetails.dateOfBirth}
                  onChange={(event) => updateField('dateOfBirth', event.target.value)}
                  error={fieldError(spouseDetails.dateOfBirth)}
                  errorMessage={fieldError(spouseDetails.dateOfBirth) ? 'Date of birth is required' : undefined}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Mobile phone"
                  fullWidth
                  value={spouseDetails.mobilePhone}
                  onChange={(event) => {
                    const numeric = event.target.value.replace(/\D/g, '');
                    updateField('mobilePhone', numeric);
                  }}
                  error={fieldError(spouseDetails.mobilePhone)}
                  errorMessage={fieldError(spouseDetails.mobilePhone) ? 'Mobile phone is required' : undefined}
                  htmlInputProps={{ inputMode: 'numeric', pattern: '[0-9]*', maxLength: 10 }}
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  label="Home phone"
                  fullWidth
                  value={spouseDetails.homePhone}
                  onChange={(event) => {
                    const numeric = event.target.value.replace(/\D/g, '');
                    updateField('homePhone', numeric);
                  }}
                  helperText="Optional field"
                  htmlInputProps={{ inputMode: 'numeric', pattern: '[0-9]*', maxLength: 10 }}
                />
              </Grid>
            </Grid>

            <Box sx={{ pt: 1 }}>
              <Checkbox
                checked={spouseDetails.consentChecked}
                onChange={(checked) => updateField('consentChecked', checked)}
                label="I understand this nomination is permanent and give permission for ART to contact my spouse for this application."
              />
              {showValidation && spouseMode && !spouseDetails.consentChecked && (
                <Typography variant="caption" sx={{ color: 'error.main', mt: 0.5, display: 'block' }}>
                  Consent confirmation is required
                </Typography>
              )}
            </Box>
          </Stack>
        </Box>
      )}
      </Stack>
    </Stack>
  );
}
