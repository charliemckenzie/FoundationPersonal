'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import type { NavItemMegamenu, NavItemLink, CtaAction, UtilityLink } from '../../components/Header/types';

const navItems: (NavItemMegamenu | NavItemLink)[] = [
  {
    type: 'megamenu',
    label: 'Why choose us?',
    columns: [
      {
        heading: 'About us',
        links: [
          { label: 'Compare us', href: '#compare' },
          { label: 'Award-winning', href: '#awards' },
          { label: 'Strong performance', href: '#performance' },
          { label: 'Committed to lower fees', href: '#fees' },
        ],
      },
    ],
  },
  {
    type: 'megamenu',
    label: 'Super',
    columns: [
      {
        heading: 'Your super',
        links: [
          { label: 'How super works', href: '#how-super-works' },
          { label: 'Consolidate super', href: '#consolidate' },
          { label: 'Super contributions', href: '#contributions' },
        ],
      },
    ],
  },
  { type: 'link', label: 'Retirement', href: '#retirement' },
  { type: 'link', label: 'Investments', href: '#investments' },
  { type: 'link', label: 'Insurance', href: '#insurance' },
  { type: 'link', label: 'Tools & advice', href: '#tools' },
];

const secondaryNavItems: NavItemLink[] = [
  { type: 'link', label: 'For employers', href: '#employers' },
  { type: 'link', label: 'For advisers', href: '#advisers' },
];

const primaryCta: CtaAction = {
  label: 'Join',
  menu: [
    { label: 'Join as a member', href: '#join-member' },
    { label: 'Join as an employer', href: '#join-employer' },
  ],
};

const secondaryCta: CtaAction = {
  label: 'Log in',
  menu: [
    { label: 'Member login', href: '#login-member' },
    { label: 'Employer login', href: '#login-employer' },
  ],
};

const utilityLinks: UtilityLink[] = [
  { label: 'Rewards', href: '#rewards', icon: 'gift' },
  { label: 'Learn', href: '#learn', icon: 'book-open' },
  { label: 'Contact', href: '#contact', icon: 'phone-sharp' },
];

export function HeaderFooterTestClient() {
  return (
    <>
      <Header
            navItems={navItems}
            secondaryNavItems={secondaryNavItems}
            primaryCta={primaryCta}
            secondaryCta={secondaryCta}
            utilityLinks={utilityLinks}
            searchPlaceholder="Search Australian Retirement Trust"
            onSearch={(q) => console.log('search:', q)}
          />

          {/* Placeholder body */}
          <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 6 }}>
            <Box
              sx={{
                width: '100%',
                maxWidth: 'lg',
                minHeight: 1600,
                bgcolor: 'action.hover',
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="body" sx={{ color: 'text.muted' }}>
                Page content here
              </Typography>
            </Box>
          </Box>

          <Footer />
    </>
  );
}
