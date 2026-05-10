import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { Checkbox } from '../Checkbox';
import { AddressCapture } from './AddressCapture';
import type { Address, AddressFieldValue, AddressLookupConfig } from './types';

const DEFAULT_ADDRESS: Address = {
  type: 'australian',
  line1: '', line2: '', suburb: '', state: '', postcode: '',
};

export interface AddressFieldProps {
  onChange?: (value: AddressFieldValue) => void;
  defaultHasPostalAddress?: boolean;
  disabled?: boolean;
  addressLookup?: AddressLookupConfig;
}

export function AddressField({ onChange, defaultHasPostalAddress = false, disabled, addressLookup }: AddressFieldProps) {
  const [address, setAddress] = useState<Address>(DEFAULT_ADDRESS);
  const [hasPostal, setHasPostal] = useState(defaultHasPostalAddress);
  const [postalAddress, setPostalAddress] = useState<Address>({ ...DEFAULT_ADDRESS });

  function handleAddressChange(next: Address) {
    setAddress(next);
    onChange?.({ address: next, ...(hasPostal && { postalAddress }) });
  }

  function handlePostalChange(next: Address) {
    setPostalAddress(next);
    onChange?.({ address, postalAddress: next });
  }

  function handlePostalToggle(checked: boolean) {
    setHasPostal(checked);
    onChange?.({ address, ...(checked && { postalAddress }) });
  }

  return (
    <Stack spacing={3}>
      <Typography
        component="h3"
        sx={{ fontWeight: 700, fontSize: '1rem', color: 'text.primary', lineHeight: 1.5 }}
      >
        Residential address
      </Typography>
      <AddressCapture
        value={address}
        onChange={handleAddressChange}
        section="residential"
        disabled={disabled}
        lookup={addressLookup}
      />
      <Checkbox
        label="I have a different postal address"
        checked={hasPostal}
        onChange={handlePostalToggle}
        disabled={disabled}
      />
      {hasPostal && (
        <Stack spacing={3}>
          <Divider />
          <Typography
            component="h3"
            sx={{ fontWeight: 700, fontSize: '1rem', color: 'text.primary', lineHeight: 1.5 }}
          >
            Postal address
          </Typography>
          <AddressCapture
            value={postalAddress}
            onChange={handlePostalChange}
            section="postal"
            disabled={disabled}
          />
        </Stack>
      )}
    </Stack>
  );
}

export type { AddressFieldValue, Address, AustralianAddress, InternationalAddress, AddressSuggestion, AddressLookupProvider, AddressLookupConfig } from './types';
export { mockAddressProvider } from './mockAddressProvider';
