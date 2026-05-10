import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { TextField } from '../TextField';
import { Select } from '../Select';
import type { AustralianAddress } from './types';

const POSTCODE_ALLOWED_KEYS = new Set(['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'Home', 'End']);

const AU_STATES = [
  { value: 'ACT', label: 'Australian Capital Territory' },
  { value: 'NSW', label: 'New South Wales' },
  { value: 'NT', label: 'Northern Territory' },
  { value: 'QLD', label: 'Queensland' },
  { value: 'SA', label: 'South Australia' },
  { value: 'TAS', label: 'Tasmania' },
  { value: 'VIC', label: 'Victoria' },
  { value: 'WA', label: 'Western Australia' },
];

interface AustralianFieldsProps {
  value: AustralianAddress;
  onChange: (value: AustralianAddress) => void;
  section?: string;
  disabled?: boolean;
}

function patch(value: AustralianAddress, key: keyof Omit<AustralianAddress, 'type'>, next: string): AustralianAddress {
  return { ...value, [key]: next };
}

export function AustralianFields({ value, onChange, section = 'residential', disabled }: AustralianFieldsProps) {
  const ac = (token: string) => `section-${section} ${token}`;

  return (
    <Stack spacing={2}>
      <TextField
        label="Address line 1"
        value={value.line1}
        onChange={(e) => onChange(patch(value, 'line1', e.target.value))}
        required
        fullWidth
        disabled={disabled}
        name={`${section}-line1`}
        autoComplete={ac('address-line1')}
      />
      <TextField
        label="Address line 2"
        value={value.line2}
        onChange={(e) => onChange(patch(value, 'line2', e.target.value))}
        fullWidth
        disabled={disabled}
        placeholder="Optional"
        name={`${section}-line2`}
        autoComplete={ac('address-line2')}
      />
      <TextField
        label="Suburb"
        value={value.suburb}
        onChange={(e) => onChange(patch(value, 'suburb', e.target.value))}
        required
        fullWidth
        disabled={disabled}
        name={`${section}-suburb`}
        autoComplete={ac('address-level2')}
      />
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, alignItems: { xs: 'stretch', sm: 'flex-start' } }}>
        <Box sx={{ flex: 1 }}>
          <Select
            label="State"
            options={AU_STATES}
            value={value.state}
            onChange={(v) => onChange(patch(value, 'state', v))}
            required
            native
            fullWidth
            disabled={disabled}
            placeholder="Select state"
            name={`${section}-state`}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <TextField
            label="Postcode"
            value={value.postcode}
            onChange={(e) => onChange(patch(value, 'postcode', e.target.value.replace(/\D/g, '').slice(0, 4)))}
            required
            fullWidth
            disabled={disabled}
            name={`${section}-postcode`}
            autoComplete={ac('postal-code')}
            htmlInputProps={{
              inputMode: 'numeric',
              pattern: '[0-9]*',
              maxLength: 4,
              onKeyDown: (e) => {
                if (!/^\d$/.test(e.key) && !POSTCODE_ALLOWED_KEYS.has(e.key) && !e.ctrlKey && !e.metaKey) {
                  e.preventDefault();
                }
              },
            }}
          />
        </Box>
      </Box>
    </Stack>
  );
}
