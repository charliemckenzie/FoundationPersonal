import type { FoundFund, TargetAccount } from './types';

export const MOCK_FOUND_FUNDS: FoundFund[] = [
  {
    id: 'found-1',
    fundName: 'REST Super',
    accountNumber: '••• ••• 4821',
    balance: 18750.45,
    insuranceFlag: true,
    selected: false,
  },
  {
    id: 'found-2',
    fundName: 'Australian Retirement Trust',
    accountNumber: '••• ••• 3392',
    balance: 6420.0,
    isAtoHeld: false,
    selected: false,
  },
  {
    id: 'found-3',
    fundName: 'ATO-held super',
    accountNumber: 'ATO',
    balance: 3215.8,
    isAtoHeld: true,
    insuranceFlag: false,
    selected: false,
  },
];

/** Empty fixture for testing the no-results state. */
export const MOCK_FOUND_FUNDS_EMPTY: FoundFund[] = [];

export const MOCK_TARGET_ACCOUNT: TargetAccount = {
  name: 'Accumulation',
  accountNumber: '1234 5678 9012',
};
