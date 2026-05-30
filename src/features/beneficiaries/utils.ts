import type { BeneficiaryDraft, ExpiryOption, Nomination } from './types';
import { RELATIONSHIP_OPTIONS, EXPIRY_OPTIONS } from './types';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split('-').map(Number);
  if (!year || !month || !day) return dateStr;
  return `${day} ${MONTHS[month - 1]} ${year}`;
}

export function formatSubmittedAt(isoStr: string): string {
  const d = new Date(isoStr);
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

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

export function validateBeneficiaries(beneficiaries: BeneficiaryDraft[]): string | null {
  if (beneficiaries.length === 0) return 'Add at least one beneficiary.';
  for (let i = 0; i < beneficiaries.length; i++) {
    const b = beneficiaries[i];
    const n = i + 1;
    if (!b.relationship) return `Beneficiary ${n}: Relationship is required.`;
    if (b.relationship !== 'lpr') {
      if (!b.firstName.trim()) return `Beneficiary ${n}: First name is required.`;
      if (!b.lastName.trim()) return `Beneficiary ${n}: Last name is required.`;
      if (!b.dateOfBirth) return `Beneficiary ${n}: Date of birth is required.`;
    }
    if (b.allocation === null) return `Beneficiary ${n}: Allocation % is required.`;
  }
  const tot = totalAllocation(beneficiaries);
  if (tot !== 100) return `Total allocation must equal 100%. Currently ${tot}%.`;
  return null;
}

export function buildNomination(
  beneficiaries: BeneficiaryDraft[],
  expiry: ExpiryOption,
): Nomination {
  return { beneficiaries, expiry, submittedAt: new Date().toISOString() };
}
