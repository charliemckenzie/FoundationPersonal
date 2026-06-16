import type { FormProgressStep } from '../../components/FormProgress';
import type { FundingAccount, IDVState, LifetimePensionState, SpouseDetails, UserProfile, VerifyDetailsState } from './types';

export const LIFETIME_PENSION_STEPS: FormProgressStep[] = [
  { id: 'eligibility', label: 'Eligibility check' },
  { id: 'option', label: 'Choose option' },
  { id: 'funding', label: 'Purchase and funding' },
  { id: 'payments', label: 'Payments' },
  { id: 'review', label: 'Review' },
];

const BASE_ACCOUNTS: FundingAccount[] = [
  {
    id: 'super-savings',
    label: 'Super Savings - 123456789',
    balance: 295253.82,
    selected: false,
    transferAmount: 0,
  },
  {
    id: 'corporate',
    label: 'Corporate - 123456789',
    balance: 6253.82,
    selected: false,
    transferAmount: 0,
  },
  {
    id: 'defined-benefit',
    label: 'Defined Benefit - 123456789',
    balance: 8593.82,
    selected: false,
    transferAmount: 0,
  },
  {
    id: 'retirement-income',
    label: 'Retirement Income - 123456789',
    balance: 2593.82,
    selected: false,
    transferAmount: 0,
  },
];

const EMPTY_SPOUSE_DETAILS: SpouseDetails = {
  firstName: '',
  lastName: '',
  middleName: '',
  residentialAddress: '',
  emailAddress: '',
  dateOfBirth: '',
  mobilePhone: '',
  homePhone: '',
  consentChecked: false,
};

export const INITIAL_STATE: LifetimePensionState = {
  ageScenario: '60-64',
  introDeclarationRead: false,
  introDeclarationPermanent: false,
  retiredFromWork: '',
  leftEmployerAfter60: '',
  pensionOption: '',
  spouseDetails: EMPTY_SPOUSE_DETAILS,
  purchaseAmount: 0,
  accounts: BASE_ACCOUNTS,
  bankDetails: {
    bsb: '',
    accountNumber: '',
    accountName: '',
  },
  reviewDeclarationChecked: false,
};

export const MIN_PURCHASE_AMOUNT = 10000;
export const TARGET_PERCENT = [20, 30, 60, 80, 100] as const;

export const DRAFT_STORAGE_KEY = 'qsuper_lifetime_pension_draft';
export const DRAFT_EXPIRY_DAYS = 30;

export const STEP_TITLES = [
  'Open a Lifetime Pension',
  'Open a Lifetime Pension',
  'Open a Lifetime Pension',
  'Open a Lifetime Pension',
  'Open a Lifetime Pension',
  'Open a Lifetime Pension',
] as const;

// ---------------------------------------------------------------------------
// Verify Details gate
// ---------------------------------------------------------------------------

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
