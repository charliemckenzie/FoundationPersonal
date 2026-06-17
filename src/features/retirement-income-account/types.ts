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

export type PaymentFrequency = 'fortnightly' | 'monthly' | 'quarterly' | 'yearly';
export type PaymentAmountType = 'minimum' | 'specific';

export interface PaymentSchedule {
  frequency: PaymentFrequency | '';
  firstPaymentMonth: string;
  amountType: PaymentAmountType | '';
  specificAmount: number;
  adjustForCPI: boolean;
}

export interface RetirementIncomeAccountState {
  ageScenario: AgeScenario;
  introDeclarationRead: boolean;
  introDeclarationPermanent: boolean;
  retiredFromWork: EligibilityAnswer;
  leftEmployerAfter60: EligibilityAnswer;
  pensionOption: PensionOption;
  spouseDetails: SpouseDetails;
  purchaseAmount: number;
  accounts: FundingAccount[];
  paymentSchedule: PaymentSchedule;
  bankDetails: BankDetails;
  reviewDeclarationChecked: boolean;
}

export type RetirementIncomeAccountStepId =
  | 'intro'
  | 'eligibility'
  | 'funding'
  | 'allocate'
  | 'payment-schedule'
  | 'payments'
  | 'review';

export interface RetirementIncomeAccountDraft {
  state: RetirementIncomeAccountState;
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

// ---------------------------------------------------------------------------
// ID Verification gate
// ---------------------------------------------------------------------------

export type IDVDocument = 'drivers-licence' | 'medicare' | 'passport' | '';

export interface IDVState {
  selectedDocument: IDVDocument;
  driversLicence: {
    stateOfIssue: string;
    licenceNumber: string;
    cardNumber: string;
    middleName: string;
    noMiddleName: boolean;
  };
  medicare: {
    cardColour: 'green' | 'yellow' | 'blue' | '';
    cardNumber: string;
    referenceNumber: string;
    nameOnCard: string;
    expiryDate: string;
  };
  passport: {
    referenceNumber: string;
    middleName: string;
    noMiddleName: boolean;
  };
}
