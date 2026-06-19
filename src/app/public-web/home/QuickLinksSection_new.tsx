'use client';

import Box from '@mui/material/Box';
import { QuickLinks } from '../../../components/QuickLinks';

const QUICK_LINK_ITEMS = [
  {
    label: 'Join as a member',
    description: 'It takes less than 5 minutes to join.',
    href: '/join',
    icon: 'house',
  },
  {
    label: 'Investment returns',
    description: 'Over 13 options with a mix of diversified and asset classes',
    href: '/investments/returns',
    icon: 'chart-line',
  },
  {
    label: 'Fees',
    description: 'We pride ourselves on lower then average industry fees',
    href: '/fees',
    icon: 'dollar-sign',
  },
  {
    label: 'Insurance',
    description: 'Protect you and your loved ones from the unexpected.',
    href: '/insurance',
    icon: 'shield',
  },
  {
    label: 'Compare us',
    description: 'How do we stack up against other super funds?',
    href: '/why/compare',
    icon: 'scale-balanced',
  },
];

export function QuickLinksSection() {
  return (
    <Box sx={{ py: { xs: 2, md: 3 }, bgcolor: 'background.default' }}>
      <QuickLinks
        items={QUICK_LINK_ITEMS}
        aria-label="Quick actions"
      />
    </Box>
  );
}
