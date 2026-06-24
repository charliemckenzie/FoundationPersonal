import type { FormProgressStep } from '../../components/FormProgress';
import type { FundingAccount, LifetimePensionState, SpouseDetails, UserProfile, VerifyDetailsState } from './types';

export const LIFETIME_PENSION_STEPS: FormProgressStep[] = [
  { id: 'option', label: 'Spouse protection' },
  { id: 'funding', label: 'Purchase price' },
  { id: 'allocate', label: 'Allocate funds' },
  { id: 'payments', label: 'Payments' },
  { id: 'details', label: 'Details' },
  { id: 'idv', label: 'Verify identity' },
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
  emailAddress: '',
  dateOfBirth: '',
  mobilePhone: '',
  addressOption: 'same',
  address: null,
  consentChecked: false,
  identityConsentChecked: false,
};

export const INITIAL_STATE: LifetimePensionState = {
  ageScenario: '60-64',
  introDeclarationRead: false,
  introDeclarationPermanent: false,
  introDeclarationTaxDeduction: false,
  eligibilityCompleted: false,
  eligibilityAnswers: null,
  pensionOption: '',
  spouseDetails: EMPTY_SPOUSE_DETAILS,
  purchaseAmount: 0,
  fundingTransferType: 'custom',
  accounts: BASE_ACCOUNTS,
  bankDetails: {
    bsb: '',
    accountNumber: '',
    accountName: '',
  },
  reviewDeclarationChecked: false,
};

export const MIN_PURCHASE_AMOUNT = 10000;
// Minimum balance a member must leave in their Accumulation account to keep it
// open (and any attached insurance active). Distinct rule from the minimum
// purchase price — they share a value today but are not the same constraint.
export const MIN_REMAINING_BALANCE = 10000;
export const TARGET_PERCENT = [14, 29, 43, 57, 71, 86, 100] as const;

// ---------------------------------------------------------------------------
// Lifetime Pension payment estimate
// ---------------------------------------------------------------------------

// Starting annual payment per $100,000 of purchase price, by starting age and
// option. Source: QSuper PDS for Income Account and Lifetime Pension (p.38),
// 2025-26 rates. Spouse protection is based on the younger person's age.
export const LIFETIME_PENSION_RATES: Record<number, { single: number; spouse: number }> = {
  60: { single: 6485, spouse: 6075 },
  61: { single: 6582, spouse: 6151 },
  62: { single: 6686, spouse: 6233 },
  63: { single: 6797, spouse: 6321 },
  64: { single: 6914, spouse: 6416 },
  65: { single: 7041, spouse: 6518 },
  66: { single: 7176, spouse: 6627 },
  67: { single: 7320, spouse: 6745 },
  68: { single: 7474, spouse: 6872 },
  69: { single: 7640, spouse: 7009 },
  70: { single: 7817, spouse: 7156 },
  71: { single: 8006, spouse: 7315 },
  72: { single: 8211, spouse: 7486 },
  73: { single: 8430, spouse: 7673 },
  74: { single: 8664, spouse: 7872 },
  75: { single: 8917, spouse: 8088 },
  76: { single: 9189, spouse: 8323 },
  77: { single: 9479, spouse: 8574 },
  78: { single: 9793, spouse: 8846 },
  79: { single: 10131, spouse: 9142 },
  80: { single: 10489, spouse: 9456 },
};

// Fixed starting age used for the prototype estimate (matches the PDS example).
export const PENSION_ESTIMATE_AGE = 67;
export const FORTNIGHTS_PER_YEAR = 26;

export const DRAFT_STORAGE_KEY = 'qsuper_lifetime_pension_draft_v2';
export const DRAFT_EXPIRY_DAYS = 30;

export const STEP_TITLES = [
  'Open a Lifetime Pension',
  'Open a Lifetime Pension',
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
