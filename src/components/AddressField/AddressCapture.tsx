import Stack from '@mui/material/Stack';
import type { SxProps, Theme } from '@mui/material/styles';
import { RadioGroup } from '../RadioGroup';
import { AustralianFields } from './AustralianFields';
import { AustralianAutocomplete } from './AustralianAutocomplete';
import { InternationalFields } from './InternationalFields';
import type { Address, AustralianAddress, InternationalAddress, AddressLookupConfig } from './types';

const LOCATION_OPTIONS = [
  { value: 'australian', label: 'Australia' },
  { value: 'international', label: 'Outside Australia' },
];

const AU_RESET: Omit<AustralianAddress, 'type'> = {
  line1: '', line2: '', suburb: '', state: '', postcode: '',
};

const INT_RESET: Omit<InternationalAddress, 'type'> = {
  country: null, line1: '', line2: '', city: '', stateProvince: '', postcode: '',
};

export interface AddressCaptureProps {
  value: Address;
  onChange: (value: Address) => void;
  section?: string;
  disabled?: boolean;
  lookup?: AddressLookupConfig;
  onAutocompleteSearching?: (searching: boolean) => void;
  sx?: SxProps<Theme>;
}

export function AddressCapture({ value, onChange, section, disabled, lookup, onAutocompleteSearching, sx }: AddressCaptureProps) {
  function handleTypeChange(type: string) {
    if (type === 'australian') {
      onChange({ type: 'australian', ...AU_RESET });
    } else {
      onChange({ type: 'international', ...INT_RESET });
    }
  }

  return (
    <Stack spacing={3} sx={sx}>
      <RadioGroup
        options={LOCATION_OPTIONS}
        value={value.type}
        direction="row"
        onChange={handleTypeChange}
        disabled={disabled}
      />
      {value.type === 'australian' ? (
        lookup ? (
          <AustralianAutocomplete
            value={value}
            onChange={onChange}
            lookup={lookup}
            section={section}
            disabled={disabled}
            onModeChange={onAutocompleteSearching}
          />
        ) : (
          <AustralianFields value={value} onChange={onChange} section={section} disabled={disabled} />
        )
      ) : (
        <InternationalFields value={value} onChange={onChange} section={section} disabled={disabled} />
      )}
    </Stack>
  );
}
