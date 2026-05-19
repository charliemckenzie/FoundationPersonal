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
        heading: 'Why choose us?',
        links: [
          { label: 'Compare us', href: '#compare' },
          { label: 'Award-winning', href: '#awards' },
          { label: 'Strong performance', href: '#performance' },
          { label: 'Committed to lower fees', href: '#fees' },
        ],
      },
      {
        links: [
          { label: 'Member online', href: '#member-online' },
          { label: 'Mobile app', href: '#mobile-app' },
        ],
      },
      {
        heading: 'Ready to make the switch?',
        links: [
          { label: 'Join in 5 minutes', href: '#join' },
        ],
      },
    ],
    promoCard: {
      children: (
        <Box>
          <Typography variant="body" component="p" sx={{ fontWeight: 700, color: 'text.heading', mb: 1.5 }}>
            Focused on long-term returns
          </Typography>
          <Typography variant="body" component="p" sx={{ color: 'text.secondary', mb: 2 }}>
            We take care of your super. Join 2.4 million Australians who trust us to take care of theirs.
          </Typography>
          <Box
            component="a"
            href="#join"
            sx={{ color: 'primary.main', fontWeight: 500, fontSize: '0.875rem', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
          >
            Join us today.
          </Box>
        </Box>
      ),
    },
  },
  {
    type: 'megamenu',
    label: 'Super',
    columns: [
      {
        heading: 'Superannuation',
        groups: [
          {
            heading: 'What is superannuation?',
            links: [
              { label: 'How much super should I have?', href: '#how-much' },
              { label: 'Best super fund', href: '#best-fund' },
            ],
          },
          {
            heading: 'Account types',
            links: [
              { label: 'Investment performance', href: '#performance' },
              { label: 'Super fees', href: '#fees' },
              { label: 'Open a super account', href: '#open' },
            ],
          },
          {
            heading: 'Changing super funds',
            links: [
              { label: 'Changing jobs', href: '#jobs' },
              { label: 'ABN, USI, SPIN, fund Address', href: '#abn' },
            ],
          },
        ],
      },
      {
        groups: [
          {
            heading: 'Consolidate super',
            links: [
              { label: 'Find lost super', href: '#lost-super' },
            ],
          },
          {
            heading: 'Contribute to super',
            links: [
              { label: 'BPAY super contributions', href: '#bpay' },
              { label: 'Government co-contribution', href: '#co-contribution' },
              { label: 'Salary sacrifice', href: '#salary-sacrifice' },
              { label: 'Voluntary contributions', href: '#voluntary' },
            ],
          },
        ],
      },
      {
        groups: [
          {
            heading: 'How to withdraw super',
            links: [
              { label: 'Early access to super', href: '#early-access' },
              { label: 'Claim a death benefit', href: '#death-benefit' },
            ],
          },
          {
            heading: 'Tax and super',
            links: [
              { label: 'Tax deductions', href: '#tax' },
            ],
          },
          {
            links: [{ label: 'FAQs', href: '#faqs' }],
          },
          {
            links: [{ label: 'Forms and documents', href: '#forms' }],
          },
        ],
      },
    ],
    promoCard: {
      children: (
        <Box>
          <Typography variant="body" component="p" sx={{ fontWeight: 700, color: 'text.heading', mb: 1.5 }}>
            Be super informed
          </Typography>
          <Typography variant="body" component="p" sx={{ color: 'text.secondary', mb: 2 }}>
            Stay in the know when it comes to your super with our articles and tools.
          </Typography>
          <Box
            component="a"
            href="#learn-more"
            sx={{ color: 'primary.main', fontWeight: 500, fontSize: '0.875rem', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
          >
            Learn more →
          </Box>
        </Box>
      ),
    },
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
