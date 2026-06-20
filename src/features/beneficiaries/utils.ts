import type { BeneficiaryDraft, ExpiryOption, Nomination } from './types';
import { RELATIONSHIP_OPTIONS, EXPIRY_OPTIONS } from './types';
import { validateEmail, validatePhone, validateDateOfBirth } from '../../components/inputs/validation';
import { formatDate } from '@/lib/format';

// Canonical date formatter lives in @/lib/format. formatSubmittedAt is an alias
// kept for existing call sites — the canonical formatDate handles both
// date-only (`2026-06-05`) and full ISO timestamp inputs.
export { formatDate };
export const formatSubmittedAt = formatDate;

export function calcAge(dateStr: string): number {
  const [year, month, day] = dateStr.split('-').map(Number);
  const now = new Date();
  let age = now.getFullYear() - year;
  if (now.getMonth() + 1 < month || (now.getMonth() + 1 === month && now.getDate() < day)) age--;
  return age;
}

export function relationshipLabel(value: string): string {
  return RELATIONSHIP_OPTIONS.find((r) => r.value === value)?.label ?? value;
}

export function expiryLabel(expiry: ExpiryOption): string {
  return EXPIRY_OPTIONS.find((o) => o.value === expiry)?.label ?? expiry;
}

export function totalAllocation(beneficiaries: BeneficiaryDraft[]): number {
  return beneficiaries.reduce((sum, b) => sum + (b.allocation ?? 0), 0);
}

export function validateRequiredFields(b: BeneficiaryDraft): BeneficiaryFieldErrors {
  const errors: BeneficiaryFieldErrors = {};
  if (!b.relationship) errors.relationship = 'This field is required';
  if (b.relationship && b.relationship !== 'lpr') {
    if (!b.firstName.trim()) errors.firstName = 'This field is required';
    if (!b.lastName.trim()) errors.lastName = 'This field is required';
    if (!b.dateOfBirth) errors.dateOfBirth = 'This field is required';
  }
  if (b.allocation === null) errors.allocation = 'This field is required';
  return errors;
}

export function createDraft(): BeneficiaryDraft {
  return {
    id: crypto.randomUUID(),
    relationship: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    phone: '',
    email: '',
    allocation: null,
  };
}

/** Per-field error messages for a single beneficiary, keyed by draft field. */
export type BeneficiaryFieldErrors = Partial<Record<keyof BeneficiaryDraft, string>>;

export interface Step1Validation {
  /** Field-level errors keyed by beneficiary id. Only invalid beneficiaries appear. */
  fieldErrors: Record<string, BeneficiaryFieldErrors>;
  /** True when the allocation total is not exactly 100%. Surfaced by the total banner. */
  totalIncomplete: boolean;
  /** Id of the first beneficiary with a field error — used to expand/scroll to it. */
  firstInvalidId: string | null;
  /** True when anything blocks progressing past the step. */
  hasErrors: boolean;
}

function validateBeneficiary(b: BeneficiaryDraft): BeneficiaryFieldErrors {
  const errors: BeneficiaryFieldErrors = {};

  if (!b.relationship) {
    errors.relationship = 'Select a relationship';
  } else if (b.relationship !== 'lpr') {
    if (!b.firstName.trim()) errors.firstName = 'Enter a first name';
    if (!b.lastName.trim()) errors.lastName = 'Enter a last name';

    if (!b.dateOfBirth) errors.dateOfBirth = 'Enter a date of birth';
    else {
      const dobError = validateDateOfBirth(b.dateOfBirth);
      if (dobError) errors.dateOfBirth = dobError;
    }

    const phoneError = validatePhone(b.phone);
    if (phoneError) errors.phone = phoneError;

    const emailError = validateEmail(b.email);
    if (emailError) errors.email = emailError;
  }

  if (b.allocation === null) errors.allocation = 'Enter an allocation';
  else if (b.allocation <= 0) errors.allocation = 'Allocation must be greater than 0%';

  return errors;
}

export function validateStep1(beneficiaries: BeneficiaryDraft[]): Step1Validation {
  const fieldErrors: Record<string, BeneficiaryFieldErrors> = {};
  let firstInvalidId: string | null = null;

  for (const b of beneficiaries) {
    const errors = validateBeneficiary(b);
    if (Object.keys(errors).length > 0) {
      fieldErrors[b.id] = errors;
      firstInvalidId ??= b.id;
    }
  }

  // Tolerance avoids a float lock-out (e.g. 33.33 + 33.33 + 33.34 not summing to exactly 100).
  const totalIncomplete = Math.abs(totalAllocation(beneficiaries) - 100) > 0.001;
  const hasErrors = firstInvalidId !== null || totalIncomplete;

  return { fieldErrors, totalIncomplete, firstInvalidId, hasErrors };
}

export function buildNomination(
  beneficiaries: BeneficiaryDraft[],
  expiry: ExpiryOption,
): Nomination {
  return { beneficiaries, expiry, submittedAt: new Date().toISOString() };
}
