export interface ContributionsState {
  // About You
  currentAge: string;
  retirementAge: string;
  salary: string;
  salaryFrequency: string;
  superBalance: string;

  // Current Contributions
  employerSgRate: string;
  additionalEmployerContributions: string;
  additionalEmployerFrequency: string;
  salarySacrifice: string;
  salarySacrificeFrequency: string;
  personalDeductible: string;
  personalDeductibleFrequency: string;
  afterTaxContributions: string;
  afterTaxFrequency: string;
  contributingToOtherFund: string;
  otherFundBeforeTax: string;
  otherFundBeforeTaxFrequency: string;
  otherFundAfterTax: string;
  otherFundAfterTaxFrequency: string;

  // Eligibility & Caps
  previousYearBalance: string;
  hasUnusedCarryForward: string;
  unusedCarryForwardAmount: string;
  otherIncomeAmount: string;
  otherIncomeFrequency: string;
  taxDeductionsAmount: string;
  taxDeductionsFrequency: string;

  // Affordability
  additionalAmount: string;
  additionalAmountFrequency: string;
  contributionPreference: ContributionPreference;
  optimisationGoal: OptimisationGoal;

  // Disclaimer
  disclaimerAccepted: boolean;
}

export type ContributionPreference = 'before-tax' | 'after-tax' | 'mix' | null;
export type OptimisationGoal = 'tax-efficiency' | 'balance-growth' | 'take-home-stability' | null;

export interface CapAnalysis {
  concessionalCap: number;
  nonConcessionalCap: number;
  currentConcessional: number;
  currentNonConcessional: number;
  concessionalRemaining: number;
  nonConcessionalRemaining: number;
  concessionalExceeded: boolean;
  nonConcessionalExceeded: boolean;
  carryForwardAvailable: number;
  effectiveConcessionalCap: number;
  division293Applies: boolean;
}

export interface TaxComparison {
  currentTaxableIncome: number;
  currentIncomeTax: number;
  currentMedicare: number;
  currentTakeHome: number;
  recommendedSalarySacrifice: number;
  recommendedPersonalDeductible: number;
  recommendedAfterTax: number;
  newTaxableIncome: number;
  newIncomeTax: number;
  newMedicare: number;
  newTakeHome: number;
  taxSavings: number;
  additionalToSuper: number;
  effectiveContributionsTax: number;
}

export interface ProjectionYear {
  age: number;
  year: number;
  currentBalance: number;
  recommendedBalance: number;
}

export interface ContributionsResult {
  capAnalysis: CapAnalysis;
  taxComparison: TaxComparison;
  projection: ProjectionYear[];
  triggers: AdviserTrigger[];
  summary: string;
}

export type AdviserTrigger =
  | 'exceeded-concessional'
  | 'exceeded-non-concessional'
  | 'carry-forward-available'
  | 'bring-forward-eligible'
  | 'division-293'
  | 'high-balance';
