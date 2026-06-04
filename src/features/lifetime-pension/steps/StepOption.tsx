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
  const spouseFieldsIncomplete = spouseMode &&
    (!spouseDetails.firstName.trim() ||
      !spouseDetails.lastName.trim() ||
      !spouseDetails.residentialAddress.trim() ||
      !spouseDetails.emailAddress.trim() ||
      !spouseDetails.dateOfBirth.trim() ||
      !spouseDetails.mobilePhone.trim() ||
      !spouseDetails.consentChecked);

  function updateField<K extends keyof SpouseDetails>(key: K, value: SpouseDetails[K]) {
    onSpouseDetailsChange({ ...spouseDetails, [key]: value });
  }

  return (
    <Stack spacing={4}>
      <Typography component="h1" variant="h2">
        Choose an option
      </Typography>

      <Stack spacing={2}>
        <div>
          <Typography variant="h4" sx={{ mb: 1 }}>
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
            p: 4,
          }}
        >
          <Stack spacing={2.5}>
            <Typography variant="h5">Spouse details</Typography>
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
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Last name"
                  fullWidth
                  value={spouseDetails.lastName}
                  onChange={(event) => updateField('lastName', event.target.value)}
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
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  label="Email address"
                  fullWidth
                  type="email"
                  value={spouseDetails.emailAddress}
                  onChange={(event) => updateField('emailAddress', event.target.value)}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <DateOfBirthField
                  fullWidth
                  value={spouseDetails.dateOfBirth}
                  onChange={(event) => updateField('dateOfBirth', event.target.value)}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Mobile phone"
                  fullWidth
                  type="tel"
                  value={spouseDetails.mobilePhone}
                  onChange={(event) => updateField('mobilePhone', event.target.value)}
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  label="Home phone"
                  fullWidth
                  type="tel"
                  value={spouseDetails.homePhone}
                  onChange={(event) => updateField('homePhone', event.target.value)}
                  helperText="Optional field"
                />
              </Grid>
            </Grid>

            <Box sx={{ pt: 1 }}>
              <Checkbox
                variant="boxed"
                checked={spouseDetails.consentChecked}
                onChange={(checked) => updateField('consentChecked', checked)}
                label="I understand this nomination is permanent and give permission for ART to contact my spouse for this application."
              />
            </Box>

            {showValidation && spouseFieldsIncomplete && (
              <Alert
                severity="error"
                message="Complete the required spouse details and consent confirmation before continuing."
              />
            )}
          </Stack>
        </Box>
      )}
      </Stack>
    </Stack>
  );
}
