import type {
  MemberBalance,
  MemberFooterLink,
  MemberNavItem,
  MemberUser,
} from '../../components/MemberOnline';

export const MOCK_USER: MemberUser = {
  name: 'Adam Finden',
  memberNumber: '900000031',
};

export const MOCK_BALANCE: MemberBalance = {
  amount: '$112,200.00',
  asAt: 'As at 24 May 2026',
};

export const MOCK_PRIMARY_ITEMS: MemberNavItem[] = [
  { id: 'home', label: 'Home', icon: 'house', href: '#' },
  {
    id: 'transactions',
    label: 'Transactions',
    icon: 'arrow-left-arrow-right',
    children: [
      { id: 'tx-history', label: 'Transaction history', icon: 'arrow-left-arrow-right', href: '#' },
      { id: 'tx-summary', label: 'Transaction summary', icon: 'chart-line', href: '#' },
      { id: 'tx-concessional', label: 'Concessional contributions', icon: 'piggy-bank', href: '#' },
      { id: 'tx-statements', label: 'Statements and letters', icon: 'copy', href: '#' },
    ],
  },
  { id: 'investments', label: 'Investments', icon: 'chart-line', href: '#' },
  {
    id: 'put-money-in',
    label: 'Put money in',
    icon: 'piggy-bank',
    children: [
      {
        id: 'voluntary',
        label: 'Make a voluntary contribution',
        icon: 'circle-dollar',
        description: 'BPAY or Direct Debit',
      },
      {
        id: 'tax-deduction',
        label: 'Claim a tax deduction',
        icon: 'copy',
        description: 'Submit a Notice of Intent to your fund',
      },
      {
        id: 'find-combine',
        label: 'Find or combine super',
        icon: 'magnifying-glass',
        description: 'Roll-in money from another fund',
      },
      {
        id: 'fund-details',
        label: 'Fund and account details',
        icon: 'circle-info',
        description: 'ABN, USI, Letter of compliance',
      },
    ],
  },
  { id: 'take-money-out', label: 'Take money out', icon: 'arrow-up-from-line', href: '#' },
  { id: 'future-planning', label: 'Future planning', icon: 'circle-question', href: '#' },
  { id: 'insurance', label: 'Insurance', icon: 'umbrella', href: '#' },
];

export const MOCK_SECONDARY_ITEMS: MemberNavItem[] = [
  { id: 'rewards', label: 'Rewards', href: '#' },
  { id: 'beneficiaries', label: 'Beneficiaries', href: '#' },
  { id: 'profile', label: 'Profile', href: '#' },
  { id: 'security', label: 'Security and login', href: '#' },
  { id: 'messages', label: 'Messages', href: '#' },
  { id: 'help', label: 'Help & contact', href: '#' },
];

export const MOCK_FOOTER_LINKS: MemberFooterLink[] = [
  { label: 'Terms and conditions', href: '#' },
  { label: 'Privacy policy', href: '#' },
  { label: 'Disclaimer', href: '#' },
  { label: 'MySuper product dashboard', href: '#' },
  { label: 'Contact us', href: '#' },
];

export const MOCK_FOOTER_DISCLAIMER =
  'Australian Retirement Trust Pty Ltd ABN 88 010 720 840 AFSL No. 228975. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sit amet lorem leo.';
