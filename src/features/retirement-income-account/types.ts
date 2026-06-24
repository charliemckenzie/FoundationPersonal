import type { Answers } from '../eligibility-checker';

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
  /** Short display label for the account type, e.g. "Accumulation" or "Defined Benefit" */
  accountType?: string;
  balance: number;
  selected: boolean;
  transferAmount: number;
}

export interface BankDetails {
  bsb: string;
  accountNumber: string;
  accountName: string;
  /** ID of saved account if selected from list */
  savedAccountId?: string;
  /** Whether account has been verified via lookup */
  verified?: boolean;
  /** Account holder name returned by bank lookup */
  resolvedName?: string;
}

/** A previously-used bank account saved on file. */
export interface SavedBankAccount {
  id: string;
  /** BSB in XXX-XXX format */
  bsb: string;
  /** Masked account number for display, e.g. '••• ••• 4821' */
  maskedAccountNumber: string;
  /** Full account number (for selection) */
  accountNumber: string;
  /** Account holder name */
  accountName: string;
  /** Bank name derived from BSB */
  bankName: string;
  /** ISO timestamp of last use */
  lastUsed: string;
}

export type PaymentFrequency = 'fortnightly' | 'monthly' | 'quarterly' | 'half-yearly' | 'annually';
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
  /** Whether the user has completed (passed) the eligibility questionnaire. */
  eligibilityCompleted: boolean;
  /** Answers given during the eligibility questionnaire — retained for resuming. */
  eligibilityAnswers: Answers | null;
  retiredFromWork: EligibilityAnswer;
  leftEmployerAfter60: EligibilityAnswer;
  pensionOption: PensionOption;
  spouseDetails: SpouseDetails;
  purchaseAmount: number;
  fundingTransferType: 'custom' | 'full' | 'keep';
  accounts: FundingAccount[];
  setupMode: SetupMode;
  investmentStrategy: InvestmentStrategy;
  paymentSchedule: PaymentSchedule;
  bankDetails: BankDetails;
  investmentMix: { mode: string; allocations: Record<string, number> };
  drawdown: DrawdownState;
  beneficiaryState: BeneficiaryState;
  reviewDeclarationChecked: boolean;
}

export type DrawdownMode = 'default' | 'custom';
export type DrawdownCustomMethod = 'order' | 'percentage';

export interface DrawdownState {
  mode: DrawdownMode | '';
  customMethod: DrawdownCustomMethod | '';
  orderAllocations: Record<string, number>;
  percentageAllocations: Record<string, number>;
  autoRebalance: boolean;
}

export interface ReverseionaryBeneficiaryDraft {
  relationship: string;
  firstName: string;
  lastName: string;
  middleName: string;
  dateOfBirth: string;
  phone: string;
  email: string;
}

export interface BeneficiaryState {
  nominate: 'yes' | 'no' | '';
  beneficiary: ReverseionaryBeneficiaryDraft;
}

export type SetupMode = 'simple' | 'custom' | null;
export type InvestmentStrategy = 'default' | 'custom' | null;

export type RetirementIncomeAccountStepId =
  | 'intro'
  | 'funding'
  | 'allocate'
  | 'setup-mode'
  | 'payment-schedule'
  | 'payments'
  | 'investment-strategy'
  | 'investment-mix'
  | 'investment-drawdown'
  | 'beneficiary'
  | 'details'
  | 'idv'
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
