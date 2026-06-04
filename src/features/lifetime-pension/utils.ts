import { MIN_PURCHASE_AMOUNT } from './constants';
import type { BankDetails, LifetimePensionState, SpouseDetails } from './types';

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

export function totalSelectedAmount(state: LifetimePensionState): number {
  return state.accounts.reduce((sum, account) => {
    return account.selected ? sum + account.transferAmount : sum;
  }, 0);
}

export function hasSelectedAccount(state: LifetimePensionState): boolean {
  return state.accounts.some((account) => account.selected);
}

export function isEligible(state: LifetimePensionState): boolean {
  if (state.retiredFromWork === 'yes') return true;
  if (state.retiredFromWork === 'no' && state.leftEmployerAfter60) {
    return state.leftEmployerAfter60 === 'yes';
  }
  return false;
}

export function introStepValid(state: LifetimePensionState): boolean {
  return state.introDeclarationRead && state.introDeclarationPermanent;
}

export function eligibilityStepValid(state: LifetimePensionState): boolean {
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

export function optionStepValid(state: LifetimePensionState): boolean {
  if (!state.pensionOption) {
    return false;
  }
  if (state.pensionOption === 'single') {
    return true;
  }
  return hasRequiredSpouseFields(state.spouseDetails);
}

export function fundingStepValid(state: LifetimePensionState): boolean {
  if (!hasSelectedAccount(state)) {
    return false;
  }

  const selected = state.accounts.filter((account) => account.selected);
  const allSelectedPositive = selected.every((account) => account.transferAmount > 0);

  if (!allSelectedPositive) {
    return false;
  }

  const belowBalance = selected.some((account) => account.transferAmount > account.balance);
  if (belowBalance) {
    return false;
  }

  return totalSelectedAmount(state) >= MIN_PURCHASE_AMOUNT;
}

function bankDetailsValid(details: BankDetails): boolean {
  return Boolean(details.bsb.trim() && details.accountNumber.trim() && details.accountName.trim());
}

export function paymentsStepValid(state: LifetimePensionState): boolean {
  return bankDetailsValid(state.bankDetails);
}

export function reviewStepValid(state: LifetimePensionState): boolean {
  return state.reviewDeclarationChecked;
}
