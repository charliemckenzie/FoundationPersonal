import type { Address } from '../../components/AddressField';

export type PensionOption = 'single' | 'spouse' | '';
export type AgeScenario = '60-64' | '65-plus';

export interface SpouseDetails {
  firstName: string;
  lastName: string;
  emailAddress: string;
  dateOfBirth: string;
  mobilePhone: string;
  addressOption: 'same' | 'different';
  address: Address | null;
  consentChecked: boolean;
  identityConsentChecked: boolean;
}

export interface FundingAccount {
  id: string;
  label: string;
  balance: number;
  selected: boolean;
  transferAmount: number;
}

export interface BankDetails {
  bsb: string;
  accountNumber: string;
  accountName: string;
}

export interface LifetimePensionState {
  ageScenario: AgeScenario;
  introDeclarationRead: boolean;
  introDeclarationPermanent: boolean;
  pensionOption: PensionOption;
  spouseDetails: SpouseDetails;
  purchaseAmount: number;
  accounts: FundingAccount[];
  bankDetails: BankDetails;
  reviewDeclarationChecked: boolean;
}

export type LifetimePensionStepId =
  | 'intro'
  | 'option'
  | 'funding'
  | 'allocate'
  | 'payments'
  | 'details'
  | 'review'
  | 'idv';

export interface LifetimePensionDraft {
  state: LifetimePensionState;
  activeStep: number;
  savedAt: string;
  expiresAt: string;
}

// ---------------------------------------------------------------------------
// Verify Details gate
// ---------------------------------------------------------------------------

export interface UserProfile {
  firstName: string;
  lastName: string;
  middleName: string;
  residentialAddress: string;
  email: string;
  dateOfBirth: string;
  mobilePhone: string;
}

export interface VerifyDetailsState {
  confirmed: 'yes' | 'no' | '';
  edited: UserProfile;
}
