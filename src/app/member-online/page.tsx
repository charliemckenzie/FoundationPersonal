'use client';

import { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { MemberOnlineLayout } from '../../components/MemberOnline';
import type { MemberNavItem } from '../../components/MemberOnline';
import { Logo } from '../../components/Logo';

const RECENT_TRANSACTIONS = [
  { date: '22 May 2026', description: 'Employer contribution', amount: '+$842.50', type: 'credit' },
  { date: '15 May 2026', description: 'Investment earnings', amount: '+$1,204.18', type: 'credit' },
  { date: '1 May 2026', description: 'Employer contribution', amount: '+$842.50', type: 'credit' },
  { date: '28 Apr 2026', description: 'Insurance premium', amount: '−$38.40', type: 'debit' },
  { date: '15 Apr 2026', description: 'Investment earnings', amount: '+$987.63', type: 'credit' },
];

const INVESTMENT_OPTIONS = [
  { name: 'Lifecycle Investment Strategy', allocation: '70%', return1yr: '9.2%', return5yr: '8.1%' },
  { name: 'Balanced', allocation: '20%', return1yr: '7.8%', return5yr: '7.4%' },
  { name: 'Cash', allocation: '10%', return1yr: '4.1%', return5yr: '3.2%' },
];

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
      logo={<Logo variant="primary" size="lg" />}
      drawerLogo={<Logo variant="secondary" size="md" />}
      mobileLogo={<Logo variant="mark" size="md" />}
      homeHref="/"
      activeItemId={activeId}
      onItemClick={(item) => setActiveId(item.id)}
      lastLoggedIn="24 May 2026"
      onLogout={() => alert('Logged out')}
    >
      <Box sx={{ p: { xs: 3, md: 4 }, maxWidth: '64rem' }}>
        <Stack spacing={4}>

          {/* Welcome */}
          <Stack spacing={1}>
            <Typography variant="display-6" component="h1">
              Hello, Adam
            </Typography>
            <Typography variant="lead" color="text.muted">
              Welcome back. Here's a summary of your account as at 24 May 2026.
            </Typography>
          </Stack>

          {/* Balance cards */}
          <Grid container spacing={2}>
            {[
              { label: 'Total balance', value: '$112,200.00', sub: 'As at 24 May 2026' },
              { label: 'Employer contributions YTD', value: '$10,110.00', sub: 'Financial year to date' },
              { label: 'Investment return YTD', value: '+$8,432.56', sub: '7.8% return' },
            ].map((card) => (
              <Grid key={card.label} size={{ xs: 12, sm: 4 }}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="caption" color="text.muted" display="block" gutterBottom>
                      {card.label}
                    </Typography>
                    <Typography variant="display-6" component="p" sx={{ fontWeight: 700 }}>
                      {card.value}
                    </Typography>
                    <Typography variant="caption" color="text.muted">
                      {card.sub}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Recent transactions */}
          <Stack spacing={2}>
            <Typography variant="h6" component="h2">
              Recent transactions
            </Typography>
            <Card variant="outlined">
              <Stack divider={<Divider />}>
                {RECENT_TRANSACTIONS.map((tx) => (
                  <Box
                    key={tx.date + tx.description}
                    sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, py: 1.5 }}
                  >
                    <Stack spacing={0.25}>
                      <Typography variant="body2" fontWeight={500}>{tx.description}</Typography>
                      <Typography variant="caption" color="text.muted">{tx.date}</Typography>
                    </Stack>
                    <Typography
                      variant="body2"
                      fontWeight={600}
                      sx={{ color: tx.type === 'credit' ? 'success.main' : 'text.primary' }}
                    >
                      {tx.amount}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Card>
          </Stack>

          {/* Investments */}
          <Stack spacing={2}>
            <Typography variant="h6" component="h2">
              My investment options
            </Typography>
            <Card variant="outlined">
              <Stack divider={<Divider />}>
                {INVESTMENT_OPTIONS.map((opt) => (
                  <Box
                    key={opt.name}
                    sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1, px: 2, py: 1.5 }}
                  >
                    <Stack spacing={0.25}>
                      <Typography variant="body2" fontWeight={500}>{opt.name}</Typography>
                      <Typography variant="caption" color="text.muted">Allocation: {opt.allocation}</Typography>
                    </Stack>
                    <Stack direction="row" spacing={1}>
                      <Chip label={`1yr ${opt.return1yr}`} size="small" color="success" variant="outlined" />
                      <Chip label={`5yr ${opt.return5yr}`} size="small" variant="outlined" />
                    </Stack>
                  </Box>
                ))}
              </Stack>
            </Card>
          </Stack>

          {/* Insurance */}
          <Stack spacing={2}>
            <Typography variant="h6" component="h2">
              Insurance cover
            </Typography>
            <Grid container spacing={2}>
              {[
                { type: 'Death cover', amount: '$250,000', premium: '$14.20 / month', status: 'Active' },
                { type: 'Total & permanent disability', amount: '$250,000', premium: '$18.60 / month', status: 'Active' },
                { type: 'Income protection', amount: '$5,200 / month', premium: '$42.80 / month', status: 'Active' },
              ].map((cover) => (
                <Grid key={cover.type} size={{ xs: 12, sm: 4 }}>
                  <Card variant="outlined" sx={{ height: '100%' }}>
                    <CardContent>
                      <Stack spacing={1}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <Typography variant="body2" fontWeight={600}>{cover.type}</Typography>
                          <Chip label={cover.status} size="small" color="success" />
                        </Box>
                        <Typography variant="display-6" component="p" sx={{ fontWeight: 700, fontSize: '1.25rem' }}>
                          {cover.amount}
                        </Typography>
                        <Typography variant="caption" color="text.muted">{cover.premium}</Typography>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Stack>

          {/* Beneficiaries */}
          <Stack spacing={2}>
            <Typography variant="h6" component="h2">
              Nominated beneficiaries
            </Typography>
            <Card variant="outlined">
              <Stack divider={<Divider />}>
                {[
                  { name: 'Sarah Finden', relationship: 'Spouse', share: '60%', type: 'Binding' },
                  { name: 'James Finden', relationship: 'Child', share: '20%', type: 'Binding' },
                  { name: 'Emily Finden', relationship: 'Child', share: '20%', type: 'Binding' },
                ].map((ben) => (
                  <Box
                    key={ben.name}
                    sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1, px: 2, py: 1.5 }}
                  >
                    <Stack spacing={0.25}>
                      <Typography variant="body2" fontWeight={500}>{ben.name}</Typography>
                      <Typography variant="caption" color="text.muted">{ben.relationship}</Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                      <Chip label={ben.type} size="small" variant="outlined" />
                      <Typography variant="body2" fontWeight={600}>{ben.share}</Typography>
                    </Stack>
                  </Box>
                ))}
              </Stack>
            </Card>
          </Stack>

        </Stack>
      </Box>
    </MemberOnlineLayout>
  );
}
