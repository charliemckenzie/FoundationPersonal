import type { ContributionsState } from './types';

// ─── 2025-26 Financial Year Constants ───────────────────────────────────────

export const SG_RATE = 0.12; // 12% from 1 July 2025

export const CONCESSIONAL_CAP = 30_000; // $30,000 (indexed to $32,500 from 1 July 2026)
export const NON_CONCESSIONAL_CAP = 120_000; // $120,000
export const BRING_FORWARD_TOTAL = 360_000; // 3 × $120,000

export const CARRY_FORWARD_BALANCE_THRESHOLD = 500_000;
export const CARRY_FORWARD_MAX_YEARS = 5;

export const DIVISION_293_THRESHOLD = 250_000;
export const DIVISION_293_RATE = 0.15;

export const CONTRIBUTIONS_TAX_RATE = 0.15;
export const EARNINGS_TAX_RATE = 0.15;

export const TOTAL_SUPER_BALANCE_CAP = 1_900_000; // Transfer balance cap (affects non-concessional eligibility)

// ─── 2024-25 Income Tax Rates (Stage 3 tax cuts) ───────────────────────────

export const TAX_BRACKETS = [
  { min: 0, max: 18_200, rate: 0 },
  { min: 18_201, max: 45_000, rate: 0.16 },
  { min: 45_001, max: 135_000, rate: 0.30 },
  { min: 135_001, max: 190_000, rate: 0.37 },
  { min: 190_001, max: Infinity, rate: 0.45 },
] as const;

export const MEDICARE_LEVY_RATE = 0.02;

// ─── Projection Assumptions ─────────────────────────────────────────────────

export const DEFAULT_INVESTMENT_RETURN = 0.075; // 7.5% p.a. (balanced option)
export const DEFAULT_INFLATION = 0.025; // 2.5% p.a.
export const DEFAULT_SALARY_GROWTH = 0.03; // 3% p.a.

// ─── Form Steps ─────────────────────────────────────────────────────────────

export const FORM_STEPS = [
  { id: 'about-you', label: 'About you' },
  { id: 'current-contributions', label: 'Current contributions' },
  { id: 'eligibility', label: 'Eligibility & caps' },
  { id: 'affordability', label: 'Affordability' },
  { id: 'results', label: 'Results' },
];

// ─── Frequency Helpers ──────────────────────────────────────────────────────

export const CONTRIBUTION_FREQUENCY_OPTIONS = [
  { value: 'yearly', label: 'Yearly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'fortnightly', label: 'Fortnightly' },
  { value: 'weekly', label: 'Weekly' },
];

export const SALARY_FREQUENCY_OPTIONS = [
  { value: 'yearly', label: 'Yearly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'fortnightly', label: 'Fortnightly' },
  { value: 'weekly', label: 'Weekly' },
];

export function annualise(amount: number, frequency: string): number {
  switch (frequency) {
    case 'weekly': return amount * 52;
    case 'fortnightly': return amount * 26;
    case 'monthly': return amount * 12;
    case 'quarterly': return amount * 4;
    case 'yearly':
    default:
      return amount;
  }
}

// ─── Initial State ──────────────────────────────────────────────────────────

export const INITIAL_STATE: ContributionsState = {
  currentAge: '',
  retirementAge: '67',
  salary: '',
  salaryFrequency: 'yearly',
  superBalance: '',

  employerSgRate: '12',
  additionalEmployerContributions: '',
  additionalEmployerFrequency: 'fortnightly',
  salarySacrifice: '',
  salarySacrificeFrequency: 'fortnightly',
  personalDeductible: '',
  personalDeductibleFrequency: 'yearly',
  afterTaxContributions: '',
  afterTaxFrequency: 'fortnightly',
  contributingToOtherFund: 'no',
  otherFundBeforeTax: '',
  otherFundBeforeTaxFrequency: 'yearly',
  otherFundAfterTax: '',
  otherFundAfterTaxFrequency: 'yearly',

  previousYearBalance: '',
  hasUnusedCarryForward: 'unsure',
  unusedCarryForwardAmount: '',
  otherIncomeAmount: '',
  otherIncomeFrequency: 'yearly',
  taxDeductionsAmount: '',
  taxDeductionsFrequency: 'yearly',

  additionalAmount: '',
  additionalAmountFrequency: 'fortnightly',
  contributionPreference: null,
  optimisationGoal: null,

  disclaimerAccepted: false,
};
