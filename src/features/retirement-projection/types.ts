export interface PartnerDetails {
  age: string;
  retirementAge: string;
  salary: string;
  salaryFrequency: string;
  superBalance: string;
  employerRate: string;
  employerRateUnit: string;
  salarySacrifice: string;
  salarySacrificeFrequency: string;
  afterTaxContributions: string;
  afterTaxFrequency: string;
}

export interface HomeLoanDetails {
  mortgageBalance: string;
  mortgageRepayments: string;
  repaymentFrequency: string;
}

export interface SuperContributions {
  employerRate: string;
  employerRateUnit: string;
  extraEmployerContributions: string;
  extraEmployerUnit: string;
  salarySacrifice: string;
  salarySacrificeFrequency: string;
  afterTaxContributions: string;
  afterTaxFrequency: string;
  otherTaxableIncome: string;
  otherTaxableIncomeAmount: string;
  otherTaxableIncomeFrequency: string;
  taxDeductions: string;
  taxDeductionsFrequency: string;
  contributingToOtherFund: string;
}

export interface OtherFundDetails {
  balance: string;
  beforeTaxContributions: string;
  beforeTaxFrequency: string;
  afterTaxContributions: string;
  afterTaxFrequency: string;
}

export interface InvestmentPropertyDetails {
  marketValue: string;
  rentalIncome: string;
  rentalIncomeUnit: string;
  capitalGrowth: string;
  capitalGrowthUnit: string;
  currentLoans: string;
  monthlyRepayments: string;
}

export interface SavingsDetails {
  totalSavings: string;
  expectedInterest: string;
}

export interface ManagedFundsDetails {
  marketValue: string;
  netIncome: string;
  netIncomeUnit: string;
  capitalGrowth: string;
  capitalGrowthUnit: string;
  loansAgainst: string;
  monthlyRepayments: string;
}

export interface DebtsDetails {
  personalLoansBalance: string;
  expectToPayOff: string;
  monthlyRepayments: string;
}

export type LifestyleOption = 'modest' | 'comfortable' | 'custom' | null;

export interface RetirementProjectionState {
  // Step 1 - Income & retirement plans
  currentAge: string;
  retirementAge: string;
  salary: string;
  salaryFrequency: string;
  includePartner: string;
  partner: PartnerDetails;

  // Step 1 - Home at retirement
  ownHome: string;
  homeLoan: HomeLoanDetails;

  // Step 1 - Investment properties
  ownInvestmentProperty: string;
  investmentProperty: InvestmentPropertyDetails;

  // Step 1 - Super contributions
  superBalance: string;
  superContributions: SuperContributions;
  otherFund: OtherFundDetails;

  // Step 1 - Savings, investments & debts
  hasSavings: string;
  savings: SavingsDetails;
  hasManagedFunds: string;
  managedFunds: ManagedFundsDetails;
  debts: DebtsDetails;

  // Step 2 - Lifestyle
  lifestyle: LifestyleOption;
  customTarget: string;

  // Disclaimer
  disclaimerAccepted: boolean;
}
