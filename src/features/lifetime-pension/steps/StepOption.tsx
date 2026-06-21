import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { Alert } from '../../../components/Alert';
import { AddressCapture } from '../../../components/AddressField/AddressCapture';
import { Checkbox } from '../../../components/Checkbox';
import { DateOfBirthField } from '../../../components/DateOfBirthField';
import { InfoButton } from '../../../components/InfoButton';
import { RadioCardGroup } from '../../../components/RadioGroup/RadioCardGroup';
import { RadioButtonGroup } from '../../../components/RadioGroup/RadioButtonGroup';
import { TextField } from '../../../components/TextField';
import { mockAddressProvider } from '../../../components/AddressField/mockAddressProvider';
import type { Address } from '../../../components/AddressField/types';
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
    icon: 'user',
  },
  {
    value: 'spouse',
    label: 'Spouse protection option',
    description: 'Payments continue to your spouse for life.',
    icon: 'user-group',
  },
];

const ADDRESS_OPTIONS = [
  { value: 'same', label: 'Same as this account' },
  { value: 'different', label: 'Different address' },
];

const MOCK_ACCOUNT_ADDRESS = {
  line1: '88 Pitt Street',
  suburb: 'Sydney',
  state: 'NSW',
  postcode: '2000',
};

const MOCK_AU_ADDRESS: Address = {
  type: 'australian',
  line1: '',
  line2: '',
  suburb: '',
  state: '',
  postcode: '',
};

const ADDRESS_LOOKUP = { provider: mockAddressProvider };

export function StepOption({
  pensionOption,
  spouseDetails,
  onPensionOptionChange,
  onSpouseDetailsChange,
  showValidation,
}: StepOptionProps) {
  const spouseMode = pensionOption === 'spouse';
  const [spouseAddress, setSpouseAddress] = useState<Address>(MOCK_AU_ADDRESS);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mt: 0.5 }}>
            <Typography variant="body" sx={{ color: 'text.primary' }}>
              Both options offer money-back protection.
            </Typography>
            <InfoButton
              size="sm"
              tooltip="If you pass away before receiving payments equal to your purchase price, the remaining balance is paid to your beneficiaries or estate."
            />
          </Box>
        </div>

      <Box
        sx={{
          '& .MuiFormControl-root': { width: '100%' },
          '& .MuiFormGroup-root': { flexWrap: 'nowrap', width: '100%' },
          '& .MuiFormControlLabel-root': { flex: 1, minWidth: 0 },
        }}
      >
        <RadioCardGroup
          options={OPTION_CHOICES}
          value={pensionOption}
          onChange={(value) => onPensionOptionChange(value as PensionOption)}
          direction={isMobile ? 'column' : 'row'}
          cardDirection={isMobile ? 'row' : 'column'}
        />
      </Box>

      {showValidation && !pensionOption && (
        <Alert severity="error" message="Select either Single option or Spouse protection option to continue." />
      )}

      {spouseMode && (
        <>
          <Box
            sx={{
              border: '1px solid',
              borderColor: 'border.default',
              borderRadius: '16px',
              backgroundColor: 'background.paper',
              p: { xs: 3, sm: 4 },
            }}
          >
            <Stack spacing={2.5}>
              <Typography variant="h6">Spouse details</Typography>

              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="First name"
                    fullWidth
                    value={spouseDetails.firstName}
                    onChange={(event) => updateField('firstName', event.target.value)}
                    error={fieldError(spouseDetails.firstName)}
                    errorMessage={fieldError(spouseDetails.firstName) ? 'First name is required' : undefined}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
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
                    label="Email address"
                    fullWidth
                    type="email"
                    value={spouseDetails.emailAddress}
                    onChange={(event) => updateField('emailAddress', event.target.value)}
                    error={fieldError(spouseDetails.emailAddress)}
                    errorMessage={fieldError(spouseDetails.emailAddress) ? 'Email address is required' : undefined}
                  />
                </Grid>
                <Grid size={12}>
                  <DateOfBirthField
                    fullWidth
                    value={spouseDetails.dateOfBirth}
                    onChange={(event) => updateField('dateOfBirth', event.target.value)}
                    error={fieldError(spouseDetails.dateOfBirth)}
                    errorMessage={fieldError(spouseDetails.dateOfBirth) ? 'Date of birth is required' : undefined}
                  />
                </Grid>
              </Grid>

              <Stack spacing={1.5}>
                <Typography variant="body" sx={{ fontWeight: 700, color: 'text.primary' }}>
                  Address
                </Typography>
                <RadioButtonGroup
                  options={ADDRESS_OPTIONS}
                  value={spouseDetails.addressOption}
                  onChange={(value) => updateField('addressOption', value as SpouseDetails['addressOption'])}
                  direction="row"
                />

                {spouseDetails.addressOption === 'same' && (
                  <Box
                    sx={{
                      backgroundColor: 'background.elevated',
                      borderRadius: '8px',
                      px: 2,
                      py: 1.5,
                    }}
                  >
                    <Typography variant="body" sx={{ color: 'text.primary' }}>
                      {MOCK_ACCOUNT_ADDRESS.line1}
                    </Typography>
                    <Typography variant="body" sx={{ color: 'text.primary' }}>
                      {MOCK_ACCOUNT_ADDRESS.suburb} {MOCK_ACCOUNT_ADDRESS.state} {MOCK_ACCOUNT_ADDRESS.postcode}
                    </Typography>
                  </Box>
                )}

                {spouseDetails.addressOption === 'different' && (
                  <Box sx={{ pt: 2 }}>
                    <AddressCapture
                      value={spouseAddress}
                      onChange={setSpouseAddress}
                      section="spouse"
                      lookup={ADDRESS_LOOKUP}
                    />
                  </Box>
                )}
              </Stack>

              <Divider sx={{ borderColor: 'border.subtle', mt: 3, mb: 1 }} />

              <Stack spacing={1.5} sx={{ mt: 3 }}>
                <Typography variant="h6">
                  Verify your spouse&rsquo;s identity
                </Typography>
                <Typography variant="body" sx={{ color: 'text.default' }}>
                  During the application processing we will use the information provided above to contact{' '}
                  {spouseDetails.firstName ? (
                    <Box component="span" sx={{ fontWeight: 700 }}>
                      {[spouseDetails.firstName, spouseDetails.lastName].filter(Boolean).join(' ')}
                    </Box>
                  ) : (
                    'your spouse'
                  )}{' '}
                  {spouseDetails.mobilePhone ? (
                    <>
                      on{' '}
                      <Box component="span" sx={{ fontWeight: 700 }}>
                        {spouseDetails.mobilePhone}
                      </Box>
                    </>
                  ) : null}{' '}
                  to confirm the information provided is true and accurate.
                </Typography>
                <Checkbox
                  checked={spouseDetails.identityConsentChecked}
                  onChange={(checked) => updateField('identityConsentChecked', checked)}
                  label={`I give Australian Retirement Trust permission to contact ${[spouseDetails.firstName, spouseDetails.lastName].filter(Boolean).join(' ') || 'my spouse'} regarding this application.`}
                />
                {showValidation && spouseMode && !spouseDetails.identityConsentChecked && (
                  <Typography variant="caption" sx={{ color: 'error.main', display: 'block' }}>
                    Permission to contact spouse is required
                  </Typography>
                )}
              </Stack>

            </Stack>
          </Box>

        </>
      )}
      </Stack>
    </Stack>
  );
}
