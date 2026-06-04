export type EligibilityAnswer = 'yes' | 'no' | '';
export type PensionOption = 'single' | 'spouse' | '';
export type AgeScenario = '60-64' | '65-plus';

export interface SpouseDetails {
  firstName: string;
  lastName: string;
  middleName: string;
  residentialAddress: string;
  emailAddress: string;
  dateOfBirth: string;
  mobilePhone: string;
  homePhone: string;
  consentChecked: boolean;
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
  retiredFromWork: EligibilityAnswer;
  leftEmployerAfter60: EligibilityAnswer;
  pensionOption: PensionOption;
  spouseDetails: SpouseDetails;
  accounts: FundingAccount[];
  bankDetails: BankDetails;
  reviewDeclarationChecked: boolean;
}

export type LifetimePensionStepId =
  | 'intro'
  | 'eligibility'
  | 'option'
  | 'funding'
  | 'payments'
  | 'review';

export interface LifetimePensionDraft {
  state: LifetimePensionState;
  activeStep: number;
  savedAt: string;
  expiresAt: string;
}
