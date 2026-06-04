import type { FormProgressStep } from '../../components/FormProgress';
import type { FundingAccount, LifetimePensionState, SpouseDetails } from './types';

export const LIFETIME_PENSION_STEPS: FormProgressStep[] = [
  { id: 'intro', label: 'Open account' },
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
  accounts: BASE_ACCOUNTS,
  bankDetails: {
    bsb: '',
    accountNumber: '',
    accountName: '',
  },
  reviewDeclarationChecked: false,
};

export const MIN_PURCHASE_AMOUNT = 10000;
export const TARGET_PERCENT = [10, 20, 30, 60, 80, 100] as const;

export const DRAFT_STORAGE_KEY = 'qsuper_lifetime_pension_draft';
export const DRAFT_EXPIRY_DAYS = 30;
