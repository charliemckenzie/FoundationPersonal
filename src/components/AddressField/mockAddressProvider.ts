import type { AddressLookupProvider, AddressSuggestion, AustralianAddress } from './types';

const ADDRESSES: Array<Omit<AddressSuggestion, 'id'>> = [
  { label: '1 Martin Place', description: 'Sydney NSW 2000', value: { type: 'australian', line1: '1 Martin Place', line2: '', suburb: 'Sydney', state: 'NSW', postcode: '2000' } },
  { label: '100 Queen Street', description: 'Melbourne VIC 3000', value: { type: 'australian', line1: '100 Queen Street', line2: '', suburb: 'Melbourne', state: 'VIC', postcode: '3000' } },
  { label: '15 Adelaide Terrace', description: 'East Perth WA 6004', value: { type: 'australian', line1: '15 Adelaide Terrace', line2: '', suburb: 'East Perth', state: 'WA', postcode: '6004' } },
  { label: '25 King William Street', description: 'Adelaide SA 5000', value: { type: 'australian', line1: '25 King William Street', line2: '', suburb: 'Adelaide', state: 'SA', postcode: '5000' } },
  { label: '5 Spring Street', description: 'Melbourne VIC 3000', value: { type: 'australian', line1: '5 Spring Street', line2: '', suburb: 'Melbourne', state: 'VIC', postcode: '3000' } },
  { label: '42 George Street', description: 'Brisbane QLD 4000', value: { type: 'australian', line1: '42 George Street', line2: '', suburb: 'Brisbane', state: 'QLD', postcode: '4000' } },
  { label: '8 Hobart Road', description: 'Launceston TAS 7250', value: { type: 'australian', line1: '8 Hobart Road', line2: '', suburb: 'Launceston', state: 'TAS', postcode: '7250' } },
  { label: '3 Darwin Esplanade', description: 'Darwin NT 0800', value: { type: 'australian', line1: '3 Darwin Esplanade', line2: '', suburb: 'Darwin', state: 'NT', postcode: '0800' } },
  { label: '17 Constitution Avenue', description: 'Canberra ACT 2600', value: { type: 'australian', line1: '17 Constitution Avenue', line2: '', suburb: 'Canberra', state: 'ACT', postcode: '2600' } },
  { label: '250 Pacific Highway', description: 'North Sydney NSW 2060', value: { type: 'australian', line1: '250 Pacific Highway', line2: '', suburb: 'North Sydney', state: 'NSW', postcode: '2060' } },
  { label: '88 Pitt Street', description: 'Sydney NSW 2000', value: { type: 'australian', line1: '88 Pitt Street', line2: '', suburb: 'Sydney', state: 'NSW', postcode: '2000' } },
  { label: '12 Collins Street', description: 'Melbourne VIC 3000', value: { type: 'australian', line1: '12 Collins Street', line2: '', suburb: 'Melbourne', state: 'VIC', postcode: '3000' } },
  { label: '7 Victoria Parade', description: 'Collingwood VIC 3066', value: { type: 'australian', line1: '7 Victoria Parade', line2: '', suburb: 'Collingwood', state: 'VIC', postcode: '3066' } },
  { label: '33 Burke Street', description: 'Perth WA 6000', value: { type: 'australian', line1: '33 Burke Street', line2: '', suburb: 'Perth', state: 'WA', postcode: '6000' } },
  { label: '9 Bay Street', description: 'Port Melbourne VIC 3207', value: { type: 'australian', line1: '9 Bay Street', line2: '', suburb: 'Port Melbourne', state: 'VIC', postcode: '3207' } },
];

function matches(suggestion: Omit<AddressSuggestion, 'id'>, query: string): boolean {
  const q = query.toLowerCase();
  return (
    suggestion.label.toLowerCase().includes(q) ||
    suggestion.description.toLowerCase().includes(q) ||
    (suggestion.value as AustralianAddress).suburb.toLowerCase().includes(q)
  );
}

export const mockAddressProvider: AddressLookupProvider = async (query) => {
  await new Promise((resolve) => setTimeout(resolve, 250));
  return ADDRESSES
    .filter((a) => matches(a, query))
    .map((a, i) => ({ ...a, id: String(i) }));
};
