import type { IDVState, UserProfile, VerifyDetailsState } from './types';

// ---------------------------------------------------------------------------
// Verify Details gate
// ---------------------------------------------------------------------------

/**
 * Demo profile. The consuming flow always passes a profile into
 * VerifyDetailsContent via its `profile` prop, so production wiring later
 * just swaps the data source.
 */
export const MOCK_USER_PROFILE: UserProfile = {
  firstName: 'Jane',
  lastName: 'Smith',
  middleName: '',
  residentialAddress: '52 Mountain View Rd, Montmorency, VIC 3094',
  email: 'jane.smith@gmail.com',
  dateOfBirth: '31/03/1969',
  mobilePhone: '0412 345 678',
};

export function initialVerifyDetailsState(): VerifyDetailsState {
  return {
    confirmed: '',
    edited: { ...MOCK_USER_PROFILE },
  };
}

// ---------------------------------------------------------------------------
// ID Verification gate
// ---------------------------------------------------------------------------

/**
 * Single shared cache key so a successful verification carries across every
 * flow that consumes this module (the whole point of reuse).
 */
export const IDV_STORAGE_KEY = 'qsuper_idv_verified';
export const IDV_CACHE_YEARS = 3;

export const AUSTRALIAN_STATES = [
  { value: 'ACT', label: 'Australian Capital Territory' },
  { value: 'NSW', label: 'New South Wales' },
  { value: 'NT', label: 'Northern Territory' },
  { value: 'QLD', label: 'Queensland' },
  { value: 'SA', label: 'South Australia' },
  { value: 'TAS', label: 'Tasmania' },
  { value: 'VIC', label: 'Victoria' },
  { value: 'WA', label: 'Western Australia' },
];

export const MEDICARE_COLOUR_OPTIONS = [
  { value: 'green', label: 'Green' },
  { value: 'yellow', label: 'Yellow' },
  { value: 'blue', label: 'Blue' },
];

export function initialIDVState(): IDVState {
  return {
    selectedDocument: '',
    driversLicence: {
      stateOfIssue: '',
      licenceNumber: '',
      cardNumber: '',
      middleName: '',
      noMiddleName: false,
    },
    medicare: {
      cardColour: '',
      cardNumber: '',
      referenceNumber: '',
      nameOnCard: '',
      expiryDate: '',
    },
    passport: {
      referenceNumber: '',
      middleName: '',
      noMiddleName: false,
    },
  };
}
