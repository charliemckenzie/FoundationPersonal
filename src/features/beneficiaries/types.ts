export type ExpiryOption = 'none' | '3years';

export interface BeneficiaryDraft {
  id: string;
  relationship: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phone: string;
  email: string;
  allocation: number | null;
}

export interface Nomination {
  beneficiaries: BeneficiaryDraft[];
  expiry: ExpiryOption;
  submittedAt: string;
}

export const RELATIONSHIP_OPTIONS = [
  { value: 'lpr', label: 'Legal personal representative' },
  { value: 'spouse', label: 'Spouse' },
  { value: 'child', label: 'Child' },
  { value: 'interdependant', label: 'Interdependant' },
  { value: 'financial-dependant', label: 'Financial dependant' },
] as const;

export const EXPIRY_OPTIONS = [
  {
    value: 'none',
    label: 'No expiry',
    description: 'Stays in place until you update or cancel it.',
  },
  {
    value: '3years',
    label: 'Expires after 3 years',
    description: 'Automatically lapses 3 years from submission. We will remind you before it expires.',
  },
] as const;
