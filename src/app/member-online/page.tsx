'use client';

import { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { MemberOnlineLayout } from '../../components/MemberOnline';
import type { MemberNavItem } from '../../components/MemberOnline';
import { Logo } from '../../components/Logo';

const FOOTER_LINKS = [
  { label: 'Terms and conditions', href: '#' },
  { label: 'Privacy policy', href: '#' },
  { label: 'Disclaimer', href: '#' },
  { label: 'MySuper product dashboard', href: '#' },
  { label: 'Contact us', href: '#' },
];

const FOOTER_DISCLAIMER =
  'Australian Retirement Trust Pty Ltd ABN 88 010 720 840 AFSL No. 228975. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sit amet lorem leo.';

export default function MemberOnlinePage() {
  const [activeId, setActiveId] = useState('home');

  const primaryItems = useMemo<MemberNavItem[]>(() => [
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
        {
          id: 'spouse',
          label: 'Make a spouse contribution',
          icon: 'gift',
          description: "After-tax contribution to your partner's super",
        },
      ],
    },
    { id: 'take-money-out', label: 'Take money out', icon: 'arrow-up-from-line', href: '#' },
    { id: 'future-planning', label: 'Future planning', icon: 'circle-question', href: '#' },
    { id: 'insurance', label: 'Insurance', icon: 'umbrella', href: '#' },
  ], []);

  const secondaryItems = useMemo<MemberNavItem[]>(() => [
    { id: 'rewards', label: 'Rewards', href: '#' },
    { id: 'beneficiaries', label: 'Beneficiaries', href: '#' },
    { id: 'profile', label: 'Profile', href: '#' },
    { id: 'security', label: 'Security and login', href: '#' },
    { id: 'messages', label: 'Messages', href: '#' },
    { id: 'help', label: 'Help & contact', href: '#' },
  ], []);

  return (
    <MemberOnlineLayout
      user={{ name: 'Adam Finden', memberNumber: '900000031' }}
      balance={{ amount: '$112,200.00', asAt: 'As at 24 May 2026' }}
      primaryItems={primaryItems}
      secondaryItems={secondaryItems}
      footerLinks={FOOTER_LINKS}
      footerDisclaimer={FOOTER_DISCLAIMER}
      logo={<Logo variant="primary" size="md" />}
      mobileLogo={<Logo variant="mark" size="md" />}
      homeHref="/"
      activeItemId={activeId}
      onItemClick={(item) => setActiveId(item.id)}
      lastLoggedIn="24 May 2026"
      onLogout={() => alert('Logged out')}
    >
      <Box sx={{ p: { xs: 3, md: 4 }, maxWidth: '64rem' }}>
        <Stack spacing={2}>
          <Typography variant="display-6" component="h1">
            Hello, Adam
          </Typography>
          <Typography variant="lead" color="text.muted">
            This is the Member Online test page. Use the navigation on the left (or the
            hamburger menu on mobile) to explore.
          </Typography>
          <Typography variant="body" color="text.primary">
            Active item:{' '}
            <Box component="strong" sx={{ color: 'text.heading' }}>
              {activeId}
            </Box>
          </Typography>
        </Stack>
      </Box>
    </MemberOnlineLayout>
  );
}
