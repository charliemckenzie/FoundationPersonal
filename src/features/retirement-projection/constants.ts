import type { RetirementProjectionState } from './types';

export const INITIAL_STATE: RetirementProjectionState = {
  currentAge: '',
  retirementAge: '',
  salary: '',
  salaryFrequency: 'yearly',
  includePartner: 'no',
  partner: {
    age: '',
    retirementAge: '',
    salary: '',
    salaryFrequency: 'yearly',
    superBalance: '',
    employerRate: '',
    employerRateUnit: 'percent',
    salarySacrifice: '',
    salarySacrificeFrequency: 'fortnightly',
    afterTaxContributions: '',
    afterTaxFrequency: 'fortnightly',
  },
  ownHome: 'no',
  homeLoan: {
    mortgageBalance: '',
    mortgageRepayments: '',
    repaymentFrequency: 'monthly',
  },
  ownInvestmentProperty: 'no',
  investmentProperty: {
    marketValue: '',
    rentalIncome: '',
    rentalIncomeUnit: 'percent',
    capitalGrowth: '',
    capitalGrowthUnit: 'percent',
    currentLoans: '',
    monthlyRepayments: '',
  },
  superBalance: '',
  superContributions: {
    employerRate: '',
    employerRateUnit: 'percent',
    extraEmployerContributions: '',
    extraEmployerUnit: 'percent',
    salarySacrifice: '',
    salarySacrificeFrequency: 'weekly',
    afterTaxContributions: '',
    afterTaxFrequency: 'weekly',
    otherTaxableIncome: '',
    otherTaxableIncomeAmount: '',
    otherTaxableIncomeFrequency: 'yearly',
    taxDeductions: '',
    taxDeductionsFrequency: 'yearly',
    contributingToOtherFund: '',
  },
  otherFund: {
    balance: '',
    beforeTaxContributions: '',
    beforeTaxFrequency: 'yearly',
    afterTaxContributions: '',
    afterTaxFrequency: 'yearly',
  },
  hasSavings: 'no',
  savings: {
    totalSavings: '',
    expectedInterest: '',
  },
  hasManagedFunds: 'no',
  managedFunds: {
    marketValue: '',
    netIncome: '',
    netIncomeUnit: 'percent',
    capitalGrowth: '',
    capitalGrowthUnit: 'percent',
    loansAgainst: '',
    monthlyRepayments: '',
  },
  debts: {
    personalLoansBalance: '',
    expectToPayOff: '',
    monthlyRepayments: '',
  },
  lifestyle: null,
  customTarget: '',
  disclaimerAccepted: false,
};

export const FORM_STEPS = [
  { id: 'income', label: 'You & your income' },
  { id: 'lifestyle', label: 'Lifestyle goal' },
  { id: 'super', label: 'Your super' },
  { id: 'partner-super', label: "Partner's super", conditional: true },
  { id: 'assets', label: 'Assets & debts' },
  { id: 'results', label: 'Results' },
];

/** Shared selectAdornment option lists for frequency selectors. */
export const SALARY_FREQUENCY_OPTIONS = [
  { value: 'yearly', label: 'Yearly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'fortnightly', label: 'Fortnightly' },
  { value: 'weekly', label: 'Weekly' },
];

export const CONTRIBUTION_FREQUENCY_OPTIONS = [
  { value: 'weekly', label: 'Weekly' },
  { value: 'fortnightly', label: 'Fortnightly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'yearly', label: 'Yearly' },
];

export const REPAYMENT_FREQUENCY_OPTIONS = [
  { value: 'monthly', label: 'Monthly' },
  { value: 'fortnightly', label: 'Fortnightly' },
  { value: 'weekly', label: 'Weekly' },
];

export const FUND_FREQUENCY_OPTIONS = [
  { value: 'yearly', label: 'Yearly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'weekly', label: 'Weekly' },
];

export const YEARLY_MONTHLY_OPTIONS = [
  { value: 'yearly', label: 'Yearly' },
  { value: 'monthly', label: 'Monthly' },
];

/**
 * Annual target retirement income (today's dollars) for each ASFA lifestyle.
 * Single source of truth — every display of these figures must derive from here
 * (see docs/retirement-projection-calculation.md).
 */
export const LIFESTYLE_TARGETS = {
  modest: { single: 33134, couple: 47731 },
  comfortable: { single: 51630, couple: 72663 },
} as const;

export function formatTargetIncome(amount: number): string {
  return `$${amount.toLocaleString('en-AU')} / year`;
}

export function getLifestyleOptions(couple: boolean) {
  return [
    {
      value: 'modest' as const,
      label: 'ASFA Modest',
      yearlyAmount: formatTargetIncome(couple ? LIFESTYLE_TARGETS.modest.couple : LIFESTYLE_TARGETS.modest.single),
      description: couple
        ? 'Covers essential living costs with basic leisure activities for a couple.'
        : 'Covers essential living costs with basic leisure activities.',
      image: '/images/ASFA-modest.svg',
    },
    {
      value: 'comfortable' as const,
      label: 'ASFA Comfortable',
      yearlyAmount: formatTargetIncome(couple ? LIFESTYLE_TARGETS.comfortable.couple : LIFESTYLE_TARGETS.comfortable.single),
      description: couple
        ? 'Good standard of living including travel, leisure, and healthcare for a couple.'
        : 'Good standard of living including travel, leisure, and healthcare.',
      image: '/images/ASFA-comfortable.svg',
    },
  ];
}

export const LIFESTYLE_OPTIONS = getLifestyleOptions(false);
