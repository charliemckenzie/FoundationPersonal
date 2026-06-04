import { MIN_PURCHASE_AMOUNT } from './constants';
import type { BankDetails, LifetimePensionState, SpouseDetails } from './types';

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
