import type { FormProgressStep } from '../../components/FormProgress';
import type { FundingAccount, RetirementIncomeAccountState, SpouseDetails, UserProfile, VerifyDetailsState } from './types';

import { MOCK_INVESTMENT_OPTIONS } from '../investment-mix/mockData';

// Lifecycle Investment Strategy is accumulation-only — not available to income accounts.
export const RIA_INVESTMENT_OPTIONS = MOCK_INVESTMENT_OPTIONS.filter((o) => o.id !== 'opt-lifecycle');

export const RETIREMENT_INCOME_ACCOUNT_STEPS: FormProgressStep[] = [
  { id: 'eligibility', label: 'Eligibility check' },
  { id: 'setup-mode', label: 'Account setup' },
  { id: 'funding', label: 'Funding your income account' },
  { id: 'allocate', label: 'Allocate funds' },
  { id: 'payment-schedule', label: 'Your payments' },
  { id: 'payments', label: 'Bank details' },
  { id: 'investment-strategy', label: 'Investment strategy' },
  { id: 'investment-mix', label: 'Investment mix' },
  { id: 'investment-drawdown', label: 'Drawdown order' },
  { id: 'beneficiary', label: 'Reversionary beneficiary' },
  { id: 'review', label: 'Review' },
];

const BASE_ACCOUNTS: FundingAccount[] = [
  {
    id: 'super-savings',
    label: 'Super Savings - 123456789',
    accountType: 'Accumulation',
    balance: 295253.82,
    selected: false,
    transferAmount: 0,
  },
  {
    id: 'defined-benefit',
    label: 'Defined Benefit - 123456789',
    accountType: 'Defined Benefit',
    balance: 8593.82,
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

export const INITIAL_STATE: RetirementIncomeAccountState = {
  ageScenario: '60-64',
  introDeclarationRead: false,
  introDeclarationPermanent: false,
  retiredFromWork: '',
  leftEmployerAfter60: '',
  pensionOption: '',
  spouseDetails: EMPTY_SPOUSE_DETAILS,
  purchaseAmount: 0,
  accounts: BASE_ACCOUNTS,
  setupMode: null,
  investmentStrategy: null,
  paymentSchedule: {
    frequency: '',
    firstPaymentMonth: '',
    amountType: '',
    specificAmount: 0,
    adjustForCPI: false,
  },
  bankDetails: {
    bsb: '',
    accountNumber: '',
    accountName: '',
  },
  investmentMix: { mode: '', allocations: {} },
  drawdown: {
    mode: '',
    customMethod: '',
    orderAllocations: {},
    percentageAllocations: {},
    autoRebalance: false,
  },
  beneficiaryState: {
    nominate: '',
    beneficiary: {
      relationship: '',
      firstName: '',
      lastName: '',
      middleName: '',
      dateOfBirth: '',
      phone: '',
      email: '',
    },
  },
  reviewDeclarationChecked: false,
};

export const MIN_PURCHASE_AMOUNT = 0;
// Minimum balance a member must leave in their Accumulation account to keep it
// open (and any attached insurance active). Distinct rule from the minimum
// purchase price — they share a value today but are not the same constraint.
export const MIN_REMAINING_BALANCE = 10000;

// ---------------------------------------------------------------------------
// Retirement Income Account payment estimate
// ---------------------------------------------------------------------------

// Starting annual payment per $100,000 of purchase price, by starting age and
// option. Source: QSuper PDS for Income Account and Retirement Income Account (p.38),
// 2025-26 rates. Spouse protection is based on the younger person's age.
export const RETIREMENT_INCOME_ACCOUNT_RATES: Record<number, { single: number; spouse: number }> = {
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

// ATO minimum annual drawdown rates for account-based pensions (effective 2023–24 onwards).
// Source: https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/withdrawing-and-using-your-super/income-from-a-super-fund/minimum-annual-payments-for-super-income-streams
export const MIN_DRAWDOWN_RATES: { minAge: number; maxAge: number; rate: number }[] = [
  { minAge: 0,  maxAge: 64, rate: 4 },
  { minAge: 65, maxAge: 74, rate: 5 },
  { minAge: 75, maxAge: 79, rate: 6 },
  { minAge: 80, maxAge: 84, rate: 7 },
  { minAge: 85, maxAge: 89, rate: 9 },
  { minAge: 90, maxAge: 94, rate: 11 },
  { minAge: 95, maxAge: Infinity, rate: 14 },
];

export const DRAFT_STORAGE_KEY = 'qsuper_retirement_income_account_draft_v2';
export const DRAFT_EXPIRY_DAYS = 30;

// Minimum and maximum drawdown rates used across payment steps.
// The 5% minimum is the ATO rule for the 65–74 age bracket; used as the
// prototype default. The 10% maximum is a common industry convention.
export const DEFAULT_MIN_DRAWDOWN_RATE = 0.05;
export const DEFAULT_MAX_DRAWDOWN_RATE = 0.10;

// How many payments per year for each frequency option.
export const PAYMENT_FREQUENCY_DIVISORS: Record<string, number> = {
  fortnightly: 26,
  monthly: 12,
  quarterly: 4,
  'half-yearly': 2,
  annually: 1,
};

// Short singular period labels used in payment summary displays, e.g. "/ fortnight".
export const PAYMENT_PERIOD_LABEL: Record<string, string> = {
  fortnightly: 'fortnight',
  monthly: 'month',
  quarterly: 'quarter',
  'half-yearly': '6 months',
  annually: 'year',
};
export const TARGET_PERCENT = [9, 18, 27, 36, 45, 55, 64, 73, 82, 91, 100] as const;

export const STEP_TITLES = [
  'Open a Retirement Income Account',
  'Open a Retirement Income Account',
  'Open a Retirement Income Account',
  'Open a Retirement Income Account',
  'Open a Retirement Income Account',
  'Open a Retirement Income Account',
  'Open a Retirement Income Account',
  'Open a Retirement Income Account',
  'Open a Retirement Income Account',
  'Open a Retirement Income Account',
  'Open a Retirement Income Account',
  'Open a Retirement Income Account',
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
  dateOfBirth: '31/03/1959',
  mobilePhone: '0412 345 678',
};

export function initialVerifyDetailsState(): VerifyDetailsState {
  return {
    confirmed: '',
    edited: { ...MOCK_USER_PROFILE },
  };
}
