import type { InvestmentAccount } from '../../../../../features/investment-mix/types';

export interface Beneficiary {
  name: string;
  relationship: string;
  share: string;
  type: 'binding' | 'non-binding';
}

export interface CentrelinkScheduleRow {
  date: string;
  grossAmount: string;
  taxFreeComponent: string;
  taxableComponent: string;
}

export interface AccountDetail {
  id: string;
  name: string;
  memberNumber: string;
  balance: number;
  status: 'active' | 'closed';
  openedAt: string;
  paymentAmount: string;
  frequency: string;
  nextPaymentDate: string;
  bankAccountName: string;
  bank: string;
  bsb: string;
  accountNumber: string;
  minimumPayment: string;
  paymentsToDate: string;
  beneficiaries: Beneficiary[];
  centrelinkSchedule: CentrelinkScheduleRow[];
  investmentAccount: InvestmentAccount;
}
