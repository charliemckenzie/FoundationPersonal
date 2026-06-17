import { FORTNIGHTS_PER_YEAR, RETIREMENT_INCOME_ACCOUNT_RATES, MIN_PURCHASE_AMOUNT } from './constants';
import type { BankDetails, RetirementIncomeAccountState, PensionOption, SpouseDetails } from './types';

// ─── BSB utilities ───────────────────────────────────────────────────────────

const BSB_BANK_MAP: Record<string, string> = {
  '01': 'ANZ Bank',
  '03': 'Westpac',
  '06': 'Commonwealth Bank of Australia',
  '08': 'National Australia Bank',
  '09': 'National Australia Bank',
  '11': 'St.George Bank',
  '12': 'Bank of Queensland',
  '13': 'Bendigo and Adelaide Bank',
  '14': 'Citibank',
  '17': 'Bank of Melbourne',
  '18': 'Macquarie Bank',
  '21': 'BankSA',
  '22': 'HSBC Australia',
  '23': 'Deutsche Bank',
  '30': 'Bankwest',
  '40': 'Commonwealth Bank of Australia',
  '63': 'Bendigo and Adelaide Bank',
  '73': 'Westpac',
  '76': 'Commonwealth Bank of Australia',
  '80': 'Reserve Bank of Australia',
  '92': 'ING',
  '93': 'ING',
};

/** Strip non-digit characters and return at most 6 digits. */
export function parseBsbDigits(input: string): string {
  return input.replace(/\D/g, '').slice(0, 6);
}

/** Format up to 6 raw digits as XXX-XXX. Fewer than 4 digits are returned as-is. */
export function formatBsb(digits: string): string {
  if (digits.length <= 3) return digits;
  return `${digits.slice(0, 3)}-${digits.slice(3)}`;
}

/** Return the institution name for a complete BSB, or null if not recognised. */
export function lookupBsbBank(bsb: string): string | null {
  const digits = parseBsbDigits(bsb);
  if (digits.length < 6) return null;
  return BSB_BANK_MAP[digits.slice(0, 2)] ?? null;
}

export function formatCurrency(value: number): string {
  return value.toLocaleString('en-AU', {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

// ─── Lifetime Pension payment estimate ────────────────────────────────────────

const RATE_PER = 100000;

export interface PensionEstimate {
  annual: number;
  fortnightly: number;
}

/**
 * Estimate Lifetime Pension payments for a given purchase price. Uses the
 * published starting rate per $100,000 by age and option (QSuper PDS p.38);
 * the spouse protection option pays at the younger person's rate. Returns null
 * when no rate applies (age outside 60–80, or a non-positive purchase price).
 */
export function estimatePension(
  purchasePrice: number,
  age: number,
  option: PensionOption
): PensionEstimate | null {
  const rate = RETIREMENT_INCOME_ACCOUNT_RATES[age];
  if (!rate || purchasePrice <= 0) return null;
  const rateValue = option === 'spouse' ? rate.spouse : rate.single;
  const annual = (purchasePrice / RATE_PER) * rateValue;
  return { annual, fortnightly: annual / FORTNIGHTS_PER_YEAR };
}

// ─── Retirement bonus estimate ────────────────────────────────────────────────

// Australian Retirement Trust Retirement Bonus: 0.5% of the eligible money first
// transferred into the income product, capped at $10,000.
// https://www.australianretirementtrust.com.au/retirement/income-accounts/retirement/bonus
// NOTE: the cap ($10,000) is unrelated to MIN_PURCHASE_AMOUNT, which also happens
// to be $10,000 — keep them as separate constants so they can diverge.
// Simplification: strictly, only money from an accumulation/TTR account is
// "eligible"; this prototype applies the rate to the whole purchase price.
const RETIREMENT_BONUS_RATE = 0.005;
export const RETIREMENT_BONUS_MAX = 10000;

/** Estimate the retirement bonus for a given purchase price: 0.5% of the amount,
 *  capped at $10,000. Returns 0 for a non-positive purchase price. */
export function estimateRetirementBonus(purchasePrice: number): number {
  if (purchasePrice <= 0) return 0;
  return Math.min(purchasePrice * RETIREMENT_BONUS_RATE, RETIREMENT_BONUS_MAX);
}

export function totalSelectedAmount(state: RetirementIncomeAccountState): number {
  return state.accounts.reduce((sum, account) => sum + (account.transferAmount ?? 0), 0);
}

export function hasSelectedAccount(state: RetirementIncomeAccountState): boolean {
  return state.accounts.some((account) => account.selected);
}

export function isEligible(state: RetirementIncomeAccountState): boolean {
  if (state.retiredFromWork === 'yes') return true;
  if (state.retiredFromWork === 'no' && state.leftEmployerAfter60) {
    return state.leftEmployerAfter60 === 'yes';
  }
  return false;
}

export function introStepValid(state: RetirementIncomeAccountState): boolean {
  return state.introDeclarationRead && state.introDeclarationPermanent;
}

export function eligibilityStepValid(state: RetirementIncomeAccountState): boolean {
  if (state.retiredFromWork === 'yes') return true;
  if (state.retiredFromWork === 'no') return state.leftEmployerAfter60 === 'yes';
  return false;
}

function hasRequiredSpouseFields(details: SpouseDetails): boolean {
  return Boolean(
    details.firstName.trim() &&
      details.lastName.trim() &&
      details.residentialAddress.trim() &&
      details.emailAddress.trim() &&
      details.dateOfBirth.trim() &&
      details.mobilePhone.trim() &&
      details.consentChecked
  );
}

export function optionStepValid(state: RetirementIncomeAccountState): boolean {
  if (!state.pensionOption) {
    return false;
  }
  if (state.pensionOption === 'single') {
    return true;
  }
  return hasRequiredSpouseFields(state.spouseDetails);
}

export function fundingStepValid(state: RetirementIncomeAccountState): boolean {
  return state.purchaseAmount >= MIN_PURCHASE_AMOUNT;
}

export function allocateStepValid(state: RetirementIncomeAccountState): boolean {
  const withAmount = state.accounts.filter((a) => a.transferAmount > 0);

  const exceedsBalance = withAmount.some((a) => a.transferAmount > a.balance);
  if (exceedsBalance) {
    return false;
  }

  return totalSelectedAmount(state) === state.purchaseAmount;
}

function bankDetailsValid(details: BankDetails): boolean {
  return Boolean(details.bsb.trim() && details.accountNumber.trim() && details.accountName.trim());
}

export function paymentsStepValid(state: RetirementIncomeAccountState): boolean {
  return bankDetailsValid(state.bankDetails);
}

export function reviewStepValid(state: RetirementIncomeAccountState): boolean {
  return state.reviewDeclarationChecked;
}
