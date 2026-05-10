import type { AutocompleteOption } from '../Autocomplete';

export interface AustralianAddress {
  type: 'australian';
  line1: string;
  line2: string;
  suburb: string;
  state: string;
  postcode: string;
}

export interface InternationalAddress {
  type: 'international';
  country: AutocompleteOption | null;
  line1: string;
  line2: string;
  city: string;
  stateProvince: string;
  postcode: string;
}

export type Address = AustralianAddress | InternationalAddress;

export interface AddressFieldValue {
  address: Address;
  postalAddress?: Address;
}

export interface AddressSuggestion {
  id: string;
  label: string;
  description: string;
  value: AustralianAddress;
}

export type AddressLookupProvider = (query: string) => Promise<AddressSuggestion[]>;

export interface AddressLookupConfig {
  provider: AddressLookupProvider;
  minChars?: number;
  debounceMs?: number;
}
