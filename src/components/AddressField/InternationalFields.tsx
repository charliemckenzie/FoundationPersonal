import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { TextField } from '../TextField';
import { Autocomplete, type AutocompleteOption } from '../Autocomplete';
import { COUNTRY_OPTIONS, FEATURED_CODES } from './countries';
import type { InternationalAddress } from './types';
import type React from 'react';

function renderFlagOption(
  props: React.HTMLAttributes<HTMLLIElement> & { key: React.Key },
  option: AutocompleteOption
): React.ReactNode {
  return (
    <Box component="li" {...props} key={option.value} sx={{ display: 'flex', alignItems: 'center', gap: '0.625rem', fontSize: '1rem' }}>
      <Box
        component="img"
        loading="lazy"
        src={`https://flagcdn.com/w20/${option.value.toLowerCase()}.png`}
        srcSet={`https://flagcdn.com/w40/${option.value.toLowerCase()}.png 2x`}
        alt=""
        sx={{ width: 20, height: 15, display: 'block', objectFit: 'cover', flexShrink: 0 }}
      />
      {option.label}
    </Box>
  );
}

interface InternationalFieldsProps {
  value: InternationalAddress;
  onChange: (value: InternationalAddress) => void;
  section?: string;
  disabled?: boolean;
}

export function InternationalFields({ value, onChange, section = 'residential', disabled }: InternationalFieldsProps) {
  const ac = (token: string) => `section-${section} ${token}`;

  return (
    <Stack spacing={2}>
      <Autocomplete
        label="Country"
        options={COUNTRY_OPTIONS}
        value={value.country}
        onChange={(c) => onChange({ ...value, country: c })}
        groupBy={(o) => (FEATURED_CODES.has(o.value) ? 'Commonly selected' : 'All countries')}
        required
        fullWidth
        disabled={disabled}
        placeholder="Search for a country…"
        name={`${section}-country`}
        renderOption={renderFlagOption}
      />
      <TextField
        label="Address line 1"
        value={value.line1}
        onChange={(e) => onChange({ ...value, line1: e.target.value })}
        required
        fullWidth
        disabled={disabled}
        name={`${section}-line1`}
        autoComplete={ac('address-line1')}
      />
      <TextField
        label="Address line 2"
        value={value.line2}
        onChange={(e) => onChange({ ...value, line2: e.target.value })}
        fullWidth
        disabled={disabled}
        placeholder="Optional"
        name={`${section}-line2`}
        autoComplete={ac('address-line2')}
      />
      <TextField
        label="City"
        value={value.city}
        onChange={(e) => onChange({ ...value, city: e.target.value })}
        required
        fullWidth
        disabled={disabled}
        name={`${section}-city`}
        autoComplete={ac('address-level2')}
      />
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, alignItems: { xs: 'stretch', sm: 'flex-start' } }}>
        <Box sx={{ flex: 1 }}>
          <TextField
            label="State / Province / Region"
            value={value.stateProvince}
            onChange={(e) => onChange({ ...value, stateProvince: e.target.value })}
            fullWidth
            disabled={disabled}
            name={`${section}-state`}
            autoComplete={ac('address-level1')}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <TextField
            label="Postcode / Zipcode"
            value={value.postcode}
            onChange={(e) => onChange({ ...value, postcode: e.target.value })}
            fullWidth
            disabled={disabled}
            name={`${section}-postcode`}
            autoComplete={ac('postal-code')}
          />
        </Box>
      </Box>
    </Stack>
  );
}
