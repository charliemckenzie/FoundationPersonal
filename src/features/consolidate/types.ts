import type { RadioOption } from '@/components/RadioGroup';

export type ConsolidateMethod = 'ato' | 'manual' | 'smsf';

export type TransferAmountType = 'full' | 'partial';

export interface TransferAmount {
  type: TransferAmountType;
  /** Amount in dollars; only present when type === 'partial'. */
  amount?: number;
}

export interface ExternalFund {
  id: string;
  fundName: string;
  abn: string;
  /** Unique Superannuation Identifier — N/A for SMSF. */
  usi: string;
  /** Electronic Service Address — mandatory for SMSF, usually empty for APRA funds. */
  esa: string;
  fundPhone: string;
  memberNumber: string;
  amount: TransferAmount;
}

export interface FoundFund {
  id: string;
  fundName: string;
  /** Masked account number, e.g. '••• ••• 4821'. */
  accountNumber: string;
  balance: number;
  /** True when the money is held by the ATO (lost/unclaimed). */
  isAtoHeld?: boolean;
  /** True when the account may include insurance. */
  insuranceFlag?: boolean;
  selected: boolean;
}

export interface SmsfReadiness {
  assetsLiquidated: boolean;
  esaConfirmed: boolean;
  detailsVerifiable: boolean;
  windUpUnderstood: boolean;
}

export interface SmsfDetails {
  smsfName: string;
  abn: string;
  /** Electronic Service Address — mandatory for SMSF rollovers. */
  esa: string;
  bankVerified: boolean;
  amount: TransferAmount;
}

export interface ConsolidateSubmission {
  method: ConsolidateMethod;
  /** Manual flow: array of manually entered funds. */
  funds?: ExternalFund[];
  /** ATO flow: array of selected ATO-found funds. */
  selectedFunds?: FoundFund[];
  /** SMSF flow: SMSF rollover details. */
  smsf?: SmsfDetails;
  referenceNumber: string;
  submittedAt: string;
}

/** Target account where the member is rolling funds into. */
export interface TargetAccount {
  name: string;
  accountNumber: string;
}

/** Option constants — value/label/description pattern for RadioGroup/Select. */

export const AMOUNT_OPTIONS: RadioOption[] = [
  {
    value: 'full' satisfies TransferAmountType,
    label: 'Full balance',
    description: 'Transfer the entire amount from this fund.',
  },
  {
    value: 'partial' satisfies TransferAmountType,
    label: 'Partial amount',
    description: 'Transfer only part of the balance.',
  },
];

export const SMSF_READINESS_ITEMS = [
  {
    field: 'assetsLiquidated' as keyof SmsfReadiness,
    label: "I've sold my SMSF's assets to cash (or will roll cash only)",
  },
  {
    field: 'esaConfirmed' as keyof SmsfReadiness,
    label: 'My SMSF has an ESA that supports rollovers',
  },
  {
    field: 'detailsVerifiable' as keyof SmsfReadiness,
    label: "My SMSF's ABN and bank details are current with the ATO",
  },
  {
    field: 'windUpUnderstood' as keyof SmsfReadiness,
    label: 'If rolling my full balance, I understand this may mean winding up my SMSF',
  },
] as const;
