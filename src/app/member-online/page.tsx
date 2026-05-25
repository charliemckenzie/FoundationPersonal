'use client';

import { useMemo, useState } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { Icon } from '../../components/Icon';
import { MemberOnlineLayout } from '../../components/MemberOnline';
import type { MemberNavItem } from '../../components/MemberOnline';
import { Logo } from '../../components/Logo';

// — Retirement journey maths —
const JOINED_YEAR = 2007;
const RETIRE_YEAR = 2044;
const CURRENT_YEAR = 2026;
const YEARS_WORKED = CURRENT_YEAR - JOINED_YEAR;            // 19
const YEARS_TOTAL = RETIRE_YEAR - JOINED_YEAR;              // 37
const YEARS_TO_GO = RETIRE_YEAR - CURRENT_YEAR;             // 18
const RETIRE_PROGRESS = Math.round((YEARS_WORKED / YEARS_TOTAL) * 100);

// — Data —
interface QuickAction { id: string; label: string; icon: string; description: string }
const QUICK_ACTIONS: QuickAction[] = [
  { id: 'boost',      label: 'Boost my super',       icon: 'circle-plus',          description: 'Make a voluntary contribution' },
  { id: 'switch',     label: 'Switch investments',   icon: 'chart-line',            description: 'Change your investment mix' },
  { id: 'tax',        label: 'Claim tax deduction',  icon: 'file-invoice-dollar',   description: 'Submit a notice of intent' },
  { id: 'combine',    label: 'Find & combine super', icon: 'magnifying-glass',      description: 'Roll in from other funds' },
  { id: 'insurance',  label: 'Review insurance',     icon: 'umbrella',              description: 'Check your cover levels' },
  { id: 'statement',  label: 'Download statement',   icon: 'file-lines',            description: 'Get your latest document' },
];

interface AllocationItem { name: string; pct: number; bgcolor: string }
const ALLOCATION: AllocationItem[] = [
  { name: 'Lifecycle Investment Strategy', pct: 70, bgcolor: 'primary.main' },
  { name: 'Balanced',                      pct: 20, bgcolor: 'success.main' },
  { name: 'Cash',                          pct: 10, bgcolor: 'info.main' },
];

interface Nudge { id: string; severity: 'info' | 'warning' | 'success'; title: string; body: string }
const NUDGES: Nudge[] = [
  {
    id: 'beneficiaries',
    severity: 'warning',
    title: 'Beneficiaries need review',
    body: 'Your nominated beneficiaries were last updated over 2 years ago. Keep them current to protect your family.',
  },
  {
    id: 'lost-super',
    severity: 'info',
    title: 'Possible lost super found',
    body: 'The ATO has identified a super account that may belong to you. Combine it to grow your balance faster.',
  },
  {
    id: 'tax',
    severity: 'success',
    title: 'Tax deduction opportunity',
    body: 'You could claim up to $1,600 in personal contributions before 30 June. Submit a notice of intent.',
  },
];

const RECENT_ACTIVITY = [
  { date: '22 May 2026', description: 'Employer contribution', amount: '+$842.50',    credit: true },
  { date: '15 May 2026', description: 'Investment earnings',   amount: '+$1,204.18',  credit: true },
  { date: '28 Apr 2026', description: 'Insurance premium',     amount: '−$38.40',     credit: false },
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

          {/* Hero — retirement journey */}
          <Box
            sx={{
              bgcolor: 'primary.background',
              border: '1px solid',
              borderColor: 'primary.border',
              borderRadius: 2,
              p: { xs: 3, md: 4 },
            }}
          >
            <Stack spacing={3}>
              <Stack spacing={0.5}>
                <Typography variant="h1" component="h1" sx={{ color: 'primary.text' }}>
                  Hello, Adam
                </Typography>
                <Typography variant="body" sx={{ color: 'primary.text' }}>
                  You&apos;re {RETIRE_PROGRESS}% of the way through your retirement journey.{' '}
                  {YEARS_TO_GO} years to go.
                </Typography>
              </Stack>
              <Stack spacing={1}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="caption" sx={{ color: 'primary.text', opacity: 0.7 }}>
                    Joined {JOINED_YEAR}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'primary.text', opacity: 0.7 }}>
                    Retire {RETIRE_YEAR}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={RETIRE_PROGRESS}
                  sx={{
                    height: '0.5rem',
                    borderRadius: '0.25rem',
                    bgcolor: 'primary.border',
                    '& .MuiLinearProgress-bar': { bgcolor: 'primary.main' },
                  }}
                />
              </Stack>
            </Stack>
          </Box>

          {/* Key metrics */}
          <Grid container spacing={2}>
            {[
              { label: 'Total balance',           value: '$112,200',    sub: 'As at 24 May 2026' },
              { label: 'Projected balance at 67', value: '$1,020,000',  sub: 'Based on current trajectory' },
              { label: 'Return year to date',     value: '+7.8%',       sub: '+$8,432 this financial year' },
            ].map((stat) => (
              <Grid key={stat.label} size={{ xs: 12, sm: 4 }}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="caption" color="text.muted" display="block" gutterBottom>
                      {stat.label}
                    </Typography>
                    <Typography variant="h1" component="p" sx={{ fontWeight: 700 }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="caption" color="text.muted">{stat.sub}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Quick actions */}
          <Stack spacing={2}>
            <Typography variant="h6" component="h2">Quick actions</Typography>
            <Grid container spacing={2}>
              {QUICK_ACTIONS.map((action) => (
                <Grid key={action.id} size={{ xs: 6, sm: 4 }}>
                  <Card
                    variant="outlined"
                    sx={{ height: '100%', transition: 'border-color 0.15s', '&:hover': { borderColor: 'primary.main' } }}
                  >
                    <CardActionArea sx={{ p: 2, height: '100%', alignItems: 'flex-start', display: 'flex' }}>
                      <Stack spacing={1} sx={{ width: '100%' }}>
                        <Icon icon={action.icon} size="xl" color="primary" />
                        <Typography variant="small" fontWeight={600}>{action.label}</Typography>
                        <Typography variant="caption" color="text.muted">{action.description}</Typography>
                      </Stack>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Stack>

          {/* Investment mix + Smart nudges */}
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Stack spacing={2}>
                <Typography variant="h6" component="h2">Investment mix</Typography>
                <Card variant="outlined">
                  <CardContent>
                    <Stack spacing={2}>
                      <Box sx={{ display: 'flex', borderRadius: '0.25rem', overflow: 'hidden', height: '0.75rem' }}>
                        {ALLOCATION.map((a) => (
                          <Box key={a.name} sx={{ flex: a.pct, bgcolor: a.bgcolor }} />
                        ))}
                      </Box>
                      <Stack divider={<Divider />}>
                        {ALLOCATION.map((a) => (
                          <Box
                            key={a.name}
                            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1 }}
                          >
                            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                              <Box sx={{ width: '0.5rem', height: '0.5rem', borderRadius: '50%', bgcolor: a.bgcolor, flexShrink: 0 }} />
                              <Typography variant="small">{a.name}</Typography>
                            </Stack>
                            <Chip label={`${a.pct}%`} size="small" variant="outlined" />
                          </Box>
                        ))}
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Stack spacing={2}>
                <Typography variant="h6" component="h2">Things to action</Typography>
                <Stack spacing={1.5}>
                  {NUDGES.map((nudge) => (
                    <Alert key={nudge.id} severity={nudge.severity}>
                      <AlertTitle>{nudge.title}</AlertTitle>
                      {nudge.body}
                    </Alert>
                  ))}
                </Stack>
              </Stack>
            </Grid>
          </Grid>

          {/* Recent activity */}
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6" component="h2">Recent activity</Typography>
              <Typography
                component="a"
                href="#"
                variant="small"
                sx={{ color: 'primary.main', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
              >
                View all transactions
              </Typography>
            </Box>
            <Card variant="outlined">
              <Stack divider={<Divider />}>
                {RECENT_ACTIVITY.map((tx) => (
                  <Box
                    key={tx.date + tx.description}
                    sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, py: 1.5 }}
                  >
                    <Stack spacing={0.25}>
                      <Typography variant="small" fontWeight={500}>{tx.description}</Typography>
                      <Typography variant="caption" color="text.muted">{tx.date}</Typography>
                    </Stack>
                    <Typography
                      variant="small"
                      fontWeight={600}
                      sx={{ color: tx.credit ? 'success.main' : 'text.primary' }}
                    >
                      {tx.amount}
                    </Typography>
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
