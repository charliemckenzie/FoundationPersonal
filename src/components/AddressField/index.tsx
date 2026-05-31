import { useState, useCallback } from 'react';
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
  const [isAutocompleteSearching, setIsAutocompleteSearching] = useState(!!addressLookup);

  const handleAutocompleteSearching = useCallback((searching: boolean) => {
    setIsAutocompleteSearching(searching);
  }, []);

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
        variant="body"
        component="h3"
        sx={{ fontWeight: 700, color: 'text.primary' }}
      >
        Residential address
      </Typography>
      <AddressCapture
        value={address}
        onChange={handleAddressChange}
        section="residential"
        disabled={disabled}
        lookup={addressLookup}
        onAutocompleteSearching={handleAutocompleteSearching}
      />
      {!isAutocompleteSearching && (
        <Checkbox
          label="I have a different postal address"
          checked={hasPostal}
          onChange={handlePostalToggle}
          disabled={disabled}
        />
      )}
      {hasPostal && (
        <Stack spacing={3}>
          <Divider />
          <Typography
            variant="body"
            component="h3"
            sx={{ fontWeight: 700, color: 'text.primary' }}
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
