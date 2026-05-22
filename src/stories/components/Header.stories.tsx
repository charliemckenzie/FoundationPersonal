import type { Meta, StoryObj } from '@storybook/react'
import type { ComponentProps } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Header } from '../../components/Header'
import { Button } from '../../components/Button'
import { createBrandTheme } from '../../app/themes/factory'
import { themeB } from '../../app/themes/brands/theme-b'
import type {
  NavItemMegamenu,
  CtaAction,
  UtilityLink,
  AudienceLink,
  ResourceLink,
} from '../../components/Header/types'

const qsuperTheme = createBrandTheme(themeB)

type HeaderStoryArgs = ComponentProps<typeof Header> & { showHero?: boolean }

function HeroPlaceholder() {
  return (
    <Box sx={{ bgcolor: 'primary.main', minHeight: 480, display: 'flex', alignItems: 'center' }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 6, py: 8 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="display-2" sx={{ color: 'white', mb: 2 }}>
              Your super, our priority.
            </Typography>
            <Typography variant="body" sx={{ color: 'rgba(255,255,255,0.85)', mb: 4, maxWidth: 480 }}>
              We&rsquo;ve been looking after Australians&rsquo; super for over 25&nbsp;years.
              Join 2.4&nbsp;million members today.
            </Typography>
          </Box>
          <Box
            sx={{
              width: 460,
              height: 340,
              borderRadius: 3,
              bgcolor: 'rgba(255,255,255,0.12)',
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Typography variant="small" sx={{ color: 'rgba(255,255,255,0.5)' }}>
              Hero image
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

const whyChooseUs: NavItemMegamenu = {
  type: 'megamenu',
  label: 'Why choose us?',
  promoCard: {
    children: (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h5" sx={{ color: 'text.heading', fontWeight: 700 }}>
          Focused on long-term returns
        </Typography>
        <Typography variant="body" sx={{ color: 'text.muted' }}>
          We take care of your super. Join 2.4 million Australians who trust us to take care of theirs.
        </Typography>
        <Box component="a" href="/join" sx={{ color: 'primary.main', textDecoration: 'none', fontWeight: 500, '&:hover': { textDecoration: 'underline' } }}>
          Join us today.
        </Box>
      </Box>
    ),
  },
  columns: [
    {
      heading: 'Why choose us?',
      headingHref: '/why-choose-us',
      links: [
        { label: 'Compare us', href: '/why/compare' },
        { label: 'Award-winning', href: '/why/awards' },
        { label: 'Strong performance', href: '/why/performance' },
        { label: 'Committed to lower fees', href: '/why/fees' },
      ],
    },
    {
      groups: [
        { heading: 'Member online', headingHref: '/member-online', bold: true },
        { heading: 'Mobile app', headingHref: '/mobile-app', bold: true },
      ],
    },
    {
      groups: [
        {
          heading: 'Ready to make the switch?',
          headingHref: '/join',
          links: [{ label: 'Join in 5 minutes', href: '/join/5-minutes' }],
        },
      ],
    },
  ],
}

const superItem: NavItemMegamenu = {
  type: 'megamenu',
  label: 'Super',
  promoCard: {
    children: (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h5" sx={{ color: 'text.heading', fontWeight: 700 }}>
          Be super informed
        </Typography>
        <Typography variant="body" sx={{ color: 'text.muted' }}>
          Stay in the know when it comes to your super with our articles and tools.
        </Typography>
        <Box component="a" href="/learn" sx={{ color: 'primary.main', textDecoration: 'none', fontWeight: 500, '&:hover': { textDecoration: 'underline' } }}>
          Learn more →
        </Box>
      </Box>
    ),
  },
  columns: [
    {
      heading: 'Superannuation',
      headingHref: '/super',
      groups: [
        {
          heading: 'What is superannuation?',
          headingHref: '/super/what-is',
          links: [
            { label: 'How much super should I have?', href: '/super/how-much' },
            { label: 'Best super fund', href: '/super/best-fund' },
          ],
        },
        {
          heading: 'Account types',
          headingHref: '/super/account-types',
          links: [
            { label: 'Investment performance', href: '/super/performance' },
            { label: 'Super fees', href: '/super/fees' },
            { label: 'Open a super account', href: '/super/open' },
          ],
        },
        {
          heading: 'Changing super funds',
          headingHref: '/super/changing-funds',
          links: [
            { label: 'Changing jobs', href: '/super/changing-jobs' },
            { label: 'ABN, USI, SPIN, fund Address', href: '/super/fund-details' },
          ],
        },
      ],
    },
    {
      groups: [
        {
          heading: 'Consolidate super',
          headingHref: '/super/consolidate',
          links: [{ label: 'Find lost super', href: '/super/lost' }],
        },
        {
          heading: 'Contribute to super',
          headingHref: '/super/contribute',
          links: [
            { label: 'BPAY super contributions', href: '/super/bpay' },
            { label: 'Government co-contribution', href: '/super/co-contribution' },
            { label: 'Salary sacrifice', href: '/super/salary-sacrifice' },
            { label: 'Voluntary contributions', href: '/super/voluntary' },
          ],
        },
      ],
    },
    {
      groups: [
        {
          heading: 'How to withdraw super',
          headingHref: '/super/withdraw',
          links: [
            { label: 'Early access to super', href: '/super/early-access' },
            { label: 'Claim a death benefit', href: '/super/death-benefit' },
          ],
        },
        {
          heading: 'Tax and super',
          headingHref: '/super/tax',
          links: [{ label: 'Tax deductions', href: '/super/tax-deductions' }],
        },
        { heading: 'FAQs', headingHref: '/super/faqs', bold: true },
        { heading: 'Forms and documents', headingHref: '/super/forms', bold: true },
      ],
    },
  ],
}

const retirementItem: NavItemMegamenu = {
  type: 'megamenu',
  label: 'Retirement',
  promoCard: {
    children: (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h5" sx={{ color: 'text.heading', fontWeight: 700 }}>
          Award-winning products
        </Typography>
        <Typography variant="body" sx={{ color: 'text.muted' }}>
          Keep your super working for you in retirement with our{' '}
          <Box component="a" href="/retirement/products" sx={{ color: 'primary.main', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>innovative products</Box>.
        </Typography>
      </Box>
    ),
  },
  columns: [
    {
      heading: 'Retirement',
      headingHref: '/retirement',
      groups: [
        {
          heading: 'Planning your retirement',
          headingHref: '/retirement/planning',
          links: [
            { label: 'How much super will I need?', href: '/retirement/how-much' },
            { label: 'When can I retire?', href: '/retirement/when' },
            { label: 'Government Age Pension', href: '/retirement/age-pension' },
          ],
        },
        {
          heading: 'Manage your retirement',
          headingHref: '/retirement/manage',
          links: [
            { label: 'Log in to your account', href: '/login' },
            { label: 'Name a beneficiary', href: '/retirement/beneficiary' },
            { label: 'Converting from TTR to Retirement', href: '/retirement/convert-ttr' },
          ],
        },
      ],
    },
    {
      groups: [
        {
          heading: 'Getting ready to retire',
          headingHref: '/retirement/getting-ready',
          links: [{ label: 'How to withdraw super', href: '/super/withdraw' }],
        },
        {
          heading: 'Our income accounts',
          headingHref: '/retirement/income-accounts',
          links: [
            { label: 'Transition to Retirement Income account', href: '/retirement/ttr' },
            { label: 'Retirement Income account', href: '/retirement/income-account' },
            { label: 'Lifetime Pension', href: '/retirement/lifetime-pension' },
            { label: 'Retirement Bonus', href: '/retirement/bonus' },
          ],
        },
      ],
    },
    {
      groups: [
        {
          heading: 'Advice & planning',
          headingHref: '/retirement/advice',
          links: [{ label: 'Your advice options', href: '/advice/options' }],
        },
        { heading: 'FAQs', headingHref: '/retirement/faqs', bold: true },
        { heading: 'Retirement calculator', headingHref: '/retirement/calculator', bold: true },
        { heading: 'Forms and documents', headingHref: '/forms', bold: true },
        { heading: 'Super Savings PDS & guides', headingHref: '/pds', bold: true },
      ],
    },
  ],
}

const investmentsItem: NavItemMegamenu = {
  type: 'megamenu',
  label: 'Investments',
  promoCard: {
    children: (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h5" sx={{ color: 'text.heading', fontWeight: 700 }}>
          Strong investment performance for your super
        </Typography>
        <Typography variant="body" sx={{ color: 'text.muted' }}>
          {"We've received SuperRatings' platinum performance rating 20 years in a row, and Canstar's 5-star awards for outstanding value retirement products since 2011."}
        </Typography>
      </Box>
    ),
  },
  columns: [
    {
      heading: 'Investments',
      headingHref: '/investments',
      groups: [
        {
          heading: 'Investment options',
          headingHref: '/investments/options',
          links: [
            { label: 'Lifecycle option (default)', href: '/investments/lifecycle' },
            { label: 'Diversified options', href: '/investments/diversified' },
            { label: 'Asset class options', href: '/investments/asset-class' },
          ],
        },
        { heading: 'Fees', headingHref: '/investments/fees', bold: true },
      ],
    },
    {
      heading: 'Performance',
      headingHref: '/investments/performance',
      links: [
        { label: 'Overview', href: '/investments/performance/overview' },
        { label: 'Graphs', href: '/investments/performance/graphs' },
        { label: 'Unit prices', href: '/investments/unit-prices' },
      ],
    },
    {
      groups: [
        {
          heading: 'Market update',
          headingHref: '/investments/market-update',
          links: [{ label: 'Investment reports', href: '/investments/reports' }],
        },
        {
          heading: 'What we invest in',
          headingHref: '/investments/what-we-invest',
          links: [{ label: 'Sustainable investing', href: '/investments/sustainable' }],
        },
        { heading: 'Investment profile quiz', headingHref: '/investments/quiz', bold: true },
      ],
    },
  ],
}

const insuranceItem: NavItemMegamenu = {
  type: 'megamenu',
  label: 'Insurance',
  promoCard: {
    children: (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h5" sx={{ color: 'text.heading', fontWeight: 700 }}>
          Cover for your needs
        </Typography>
        <Typography variant="body" sx={{ color: 'text.muted' }}>
          Your{' '}
          <Box component="a" href="/insurance/cover" sx={{ color: 'primary.main', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>insurance cover</Box>
          {' '}can give you and your family financial protection and security.
        </Typography>
      </Box>
    ),
  },
  columns: [
    {
      heading: 'Insurance',
      headingHref: '/insurance',
      groups: [
        {
          heading: 'Find the right insurance for you',
          headingHref: '/insurance/find',
          links: [
            { label: 'Total & Permanent Disability (TPD) cover', href: '/insurance/tpd' },
            { label: 'Death cover', href: '/insurance/death' },
            { label: 'Income Protection cover', href: '/insurance/income-protection' },
          ],
        },
        { heading: 'Nominate a beneficiary', headingHref: '/insurance/beneficiary', bold: true },
      ],
    },
    {
      heading: 'Manage your insurance',
      headingHref: '/insurance/manage',
      links: [
        { label: 'Log in to your account', href: '/login' },
        { label: 'Keep cover', href: '/insurance/keep-cover' },
        { label: 'Restart cover', href: '/insurance/restart' },
      ],
    },
    {
      groups: [
        {
          heading: 'Make a claim',
          headingHref: '/insurance/claims',
          links: [
            { label: 'Make a death benefit claim', href: '/insurance/death-claim' },
            { label: 'Early Intervention', href: '/insurance/early-intervention' },
          ],
        },
        { heading: 'Insurance quote', headingHref: '/insurance/quote', bold: true },
        { heading: 'Insurance needs calculator', headingHref: '/insurance/calculator', bold: true },
      ],
    },
  ],
}

const toolsItem: NavItemMegamenu = {
  type: 'megamenu',
  label: 'Tools & advice',
  promoCard: {
    children: (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h5" sx={{ color: 'text.heading', fontWeight: 700 }}>
          Get expert advice
        </Typography>
        <Typography variant="body" sx={{ color: 'text.muted' }}>
          Your membership includes{' '}
          <Box component="a" href="/advice/art-account" sx={{ color: 'primary.main', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>advice about your ART account</Box>
          {' '}over the phone.
        </Typography>
      </Box>
    ),
  },
  columns: [
    {
      heading: 'Tools & advice',
      headingHref: '/tools',
      groups: [
        {
          heading: 'Your advice options',
          headingHref: '/advice/options',
          links: [{ label: 'Book a financial adviser appointment', href: '/advice/book' }],
        },
        {
          heading: 'PDS and guides',
          headingHref: '/pds',
          links: [
            { label: 'Super Savings guide [PDF]', href: '/pds/super-savings' },
            { label: 'Super Savings Insurance guide [PDF]', href: '/pds/insurance' },
            { label: 'Super Savings Investment guide [PDF]', href: '/pds/investment' },
          ],
        },
      ],
    },
    {
      groups: [
        { heading: 'Events & seminars', headingHref: '/events', bold: true },
        { heading: 'Forms & documents', headingHref: '/forms', bold: true },
        { heading: 'Learn about super', headingHref: '/learn', bold: true },
      ],
    },
    {
      heading: 'Tools & calculators',
      headingHref: '/tools/calculators',
      links: [
        { label: 'Contributions calculator', href: '/tools/contributions-calc' },
        { label: 'Retirement calculator', href: '/tools/retirement-calc' },
        { label: 'Risk profile quiz', href: '/tools/risk-quiz' },
        { label: 'Compare funds', href: '/tools/compare-funds' },
        { label: 'Get an insurance quote', href: '/tools/insurance-quote' },
        { label: 'Calculate your insurance needs', href: '/tools/insurance-calc' },
      ],
    },
  ],
}

const forEmployers: NavItemMegamenu = {
  type: 'megamenu',
  label: 'For employers',
  promoCard: {
    children: (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h5" sx={{ color: 'text.heading', fontWeight: 700 }}>
          Use our clearing house
        </Typography>
        <Typography variant="body" sx={{ color: 'text.muted' }}>
          {"It's easy to pay multiple super funds for different employees with our clearing house."}
        </Typography>
        <Box component="a" href="/employers/clearing-house" sx={{ color: 'primary.main', textDecoration: 'none', fontWeight: 500, '&:hover': { textDecoration: 'underline' } }}>
          Find out more
        </Box>
      </Box>
    ),
  },
  columns: [
    {
      heading: 'For employers',
      headingHref: '/employers',
      groups: [
        {
          heading: 'Why choose us?',
          headingHref: '/employers/why',
          links: [
            { label: 'Employer brochure [PDF]', href: '/employers/brochure' },
            { label: 'Register as an employer', href: '/employers/register' },
          ],
        },
        { heading: 'Super for small & medium businesses', headingHref: '/employers/smb', bold: true },
      ],
    },
    {
      groups: [
        {
          heading: 'Pay super online',
          headingHref: '/employers/pay-online',
          links: [
            { label: 'Clearing house', href: '/employers/clearing-house' },
            { label: 'Log in to Employer Online', href: '/employers/login' },
            { label: 'Employer Online', href: '/employers/portal' },
          ],
        },
        {
          heading: 'Employer obligations',
          headingHref: '/employers/obligations',
          links: [
            { label: 'Superannuation Guarantee', href: '/employers/sg' },
            { label: 'Important dates and deadlines', href: '/employers/dates' },
          ],
        },
      ],
    },
    {
      groups: [
        { heading: 'Employer hub', headingHref: '/employers/hub', bold: true },
        { heading: 'Small business handbook [PDF]', headingHref: '/employers/small-business-handbook', bold: true },
        { heading: 'Employee handbook [PDF]', headingHref: '/employers/employee-handbook', bold: true },
        { heading: 'Wall planner 2026 [PDF]', headingHref: '/employers/wall-planner', bold: true },
      ],
    },
  ],
}

const forAdvisers: NavItemMegamenu = {
  type: 'megamenu',
  label: 'For advisers',
  promoCard: {
    children: (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h5" sx={{ color: 'text.heading', fontWeight: 700 }}>
          Adviser hub
        </Typography>
        <Typography variant="body" sx={{ color: 'text.muted' }}>
          <Box component="a" href="/advisers/hub" sx={{ color: 'primary.main', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Browse articles</Box>
          {' '}and resources for financial advisers.
        </Typography>
      </Box>
    ),
  },
  columns: [
    {
      heading: 'For advisers',
      headingHref: '/advisers',
      links: [
        { label: 'Why choose us', href: '/advisers/why' },
        { label: 'Meet the team', href: '/advisers/team' },
        { label: 'Login', href: '/advisers/login' },
        { label: 'Register', href: '/advisers/register' },
        { label: 'Contact us', href: '/contact' },
      ],
    },
    {
      heading: 'Products',
      headingHref: '/advisers/products',
      links: [
        { label: 'Account types', href: '/advisers/products/accounts' },
        { label: 'Insurances', href: '/advisers/products/insurance' },
        { label: 'Investments', href: '/advisers/products/investments' },
        { label: 'Advice Fees', href: '/advisers/products/fees' },
      ],
    },
    {
      heading: 'Resources',
      headingHref: '/advisers/resources',
      links: [
        { label: 'Adviser Hub', href: '/advisers/hub' },
        { label: 'AOL guides', href: '/advisers/aol' },
        { label: 'Forms & Docs', href: '/advisers/forms' },
        { label: 'PDS, TMDs & Guides', href: '/advisers/pds' },
        { label: 'Common FAQs', href: '/advisers/faqs' },
      ],
    },
  ],
}

const allNavItems = [whyChooseUs, superItem, retirementItem, investmentsItem, insuranceItem, toolsItem]
const secondaryNavItems = [forEmployers, forAdvisers]


const sampleCtaPrimary: CtaAction = {
  label: 'Join',
  menu: [
    { label: 'Join as a member', href: '/join/member' },
    { label: 'Join to retire', href: '/join/retire' },
    { label: 'Register as an employer', href: '/join/employer' },
    { label: 'Register as an adviser', href: '/join/adviser' },
  ],
}
const sampleCtaSecondary: CtaAction = {
  label: 'Log in',
  menu: [
    { label: 'Member log in', href: '/login/member' },
    { label: 'Employer log in', href: '/login/employer' },
    { label: 'Adviser log in', href: '/login/adviser' },
    { label: 'Trustee log in', href: '/login/trustee' },
    {
      label: 'Setup online access',
      description: "If you have an account with us but don't have online access, it only takes a few minutes to set it up:",
      items: [
        { label: "I'm a member", href: '/setup/member' },
        { label: "I'm an employer", href: '/setup/employer' },
        { label: "I'm an adviser", href: '/setup/adviser' },
      ],
    },
  ],
}

const sampleUtilityLinks: UtilityLink[] = [
  { label: 'Rewards', href: '/rewards', icon: 'gift' },
  { label: 'Learn', href: '/learn', icon: 'book-open' },
  { label: 'Contact', href: '/contact', icon: 'phone-sharp' },
]

const qsuperAudienceLinks: AudienceLink[] = [
  { label: 'Personal', href: '/personal' },
  { label: 'Employers', href: '/employers' },
  { label: 'Advisers', href: '/advisers' },
]

const qsuperResourceLinks: ResourceLink[] = [
  { label: 'Calculators & forms', href: '/calculators' },
  { label: 'News Hub', href: '/news' },
  { label: 'Contact us', href: '/contact' },
]

const qsuperNavItems: NavItemMegamenu[] = [
  {
    type: 'megamenu',
    label: 'Products',
    columns: [
      {
        links: [
          { label: 'Why QSuper', href: '/why-qsuper', description: 'Awaken your super with Australian Retirement Trust' },
          { label: 'Can I join QSuper', href: '/join' },
          { label: 'Investment options', href: '/products/investments' },
          { label: 'Fees', href: '/products/fees' },
          { label: 'Financial advice', href: '/advice' },
          { label: 'Compare us', href: '/compare' },
        ],
      },
      {
        groups: [
          {
            heading: 'Insurance',
            links: [
              { label: 'Income protection', href: '/insurance/income' },
              { label: 'Death cover', href: '/insurance/death' },
              { label: 'TPD cover', href: '/insurance/tpd' },
            ],
          },
          {
            heading: 'Account types',
            links: [
              { label: 'Accumulation account', href: '/products/accumulation' },
              { label: 'Transition to Retirement Income account', href: '/products/ttr' },
              { label: 'Retirement Income account', href: '/products/income' },
              { label: 'Lifetime Pension', href: '/products/lifetime' },
            ],
          },
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
          { label: 'How super works', href: '/super/how' },
          { label: 'Consolidate super', href: '/super/consolidate' },
          { label: 'Super contributions', href: '/super/contributions' },
        ],
      },
      {
        heading: 'Defined Benefit',
        links: [
          { label: 'Defined Benefit account', href: '/super/defined-benefit' },
          { label: 'CSS, PSS & SASS', href: '/super/css-pss' },
        ],
      },
    ],
  },
  {
    type: 'megamenu',
    label: 'Retirement',
    columns: [
      {
        heading: 'Planning',
        links: [
          { label: 'Retirement guide', href: '/retirement/guide' },
          { label: 'When to retire', href: '/retirement/when' },
          { label: 'Age pension', href: '/retirement/pension' },
        ],
      },
    ],
  },
  {
    type: 'megamenu',
    label: 'Investments',
    columns: [
      {
        heading: 'Investment options',
        links: [
          { label: 'Lifetime', href: '/investments/lifetime' },
          { label: 'Diversified options', href: '/investments/diversified' },
          { label: 'Single sector options', href: '/investments/single' },
        ],
      },
      {
        heading: 'Performance',
        links: [
          { label: 'Investment performance', href: '/investments/performance' },
          { label: 'Investment updates', href: '/investments/updates' },
        ],
      },
    ],
  },
  {
    type: 'megamenu',
    label: 'Insurance',
    columns: [
      {
        heading: 'Cover',
        links: [
          { label: 'Income protection', href: '/insurance/income' },
          { label: 'Death cover', href: '/insurance/death' },
          { label: 'TPD cover', href: '/insurance/tpd' },
        ],
      },
    ],
  },
  {
    type: 'megamenu',
    label: 'Advice',
    columns: [
      {
        heading: 'Financial advice',
        links: [
          { label: 'Get advice', href: '/advice' },
          { label: 'Find an adviser', href: '/advice/find' },
          { label: 'Advice fees', href: '/advice/fees' },
        ],
      },
    ],
  },
]

const meta = {
  title: 'Public Web / Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Site header with two-row layout — utility bar (logo, search, utility links, CTAs) and a desktop megamenu nav strip. Collapses to a hamburger + drawer on tablet and mobile. Megamenu panels are full-width with optional promo card. All nav data is passed as props — the header has no internal routing logic.',
      },
    },
  },
  argTypes: {
    // ─── Storybook-only controls ───────────────────────────────────────────
    showHero: {
      name: 'Show hero content',
      description: 'Toggle a placeholder hero section below the header. Storybook demo only — not a component prop.',
      control: 'boolean',
      table: { category: 'Demo', defaultValue: { summary: 'false' } },
    },
    // ─── Navigation ────────────────────────────────────────────────────────
    navItems: {
      description: 'Primary navigation items. Each item is either a `megamenu` (with columns and optional promo card) or a plain `link`.',
      control: false,
      table: { category: 'Navigation', type: { summary: 'NavItem[]' } },
    },
    secondaryNavItems: {
      description: 'Secondary nav items rendered right-aligned in the desktop nav strip (e.g. For employers, For advisers). Collapsible in the drawer.',
      control: false,
      table: { category: 'Navigation', type: { summary: 'NavItem[]' } },
    },
    // ─── Actions ───────────────────────────────────────────────────────────
    primaryCta: {
      description: 'Left CTA button — rendered with `outlined` style. Supports an optional dropdown `menu` array.',
      control: false,
      table: { category: 'Actions', type: { summary: 'CtaAction' } },
    },
    secondaryCta: {
      description: 'Right CTA button — rendered with `contained` style. Supports an optional dropdown `menu` array.',
      control: false,
      table: { category: 'Actions', type: { summary: 'CtaAction' } },
    },
    utilityLinks: {
      description: 'Icon + label utility links shown in the desktop utility bar (e.g. Rewards, Learn, Contact). Hidden on phone.',
      control: false,
      table: { category: 'Actions', type: { summary: 'UtilityLink[]' } },
    },
    // ─── Search ────────────────────────────────────────────────────────────
    onSearch: {
      description: 'Callback fired when the search form is submitted. When provided, the search bar is rendered. Omit to hide search entirely.',
      control: false,
      table: { category: 'Search', type: { summary: '(query: string) => void' } },
    },
  },
} satisfies Meta<HeaderStoryArgs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    navItems: allNavItems,
    secondaryNavItems,
    primaryCta: sampleCtaPrimary,
    secondaryCta: sampleCtaSecondary,
    utilityLinks: sampleUtilityLinks,
    onSearch: (q: string) => console.log('search:', q),
  },
  render: (args) => {
    const { showHero, ...headerArgs } = args as typeof args & { showHero?: boolean }
    return (
      <>
        <Header {...headerArgs} />
        {showHero && <HeroPlaceholder />}
      </>
    )
  },
}

export const MegaMenuVariant: Story = {
  name: 'MegaMenu Variant',
  args: {
    navItems: allNavItems,
    secondaryNavItems,
    primaryCta: sampleCtaPrimary,
    secondaryCta: sampleCtaSecondary,
    utilityLinks: sampleUtilityLinks,
    onSearch: (q: string) => console.log('search:', q),
  },
  render: (args) => {
    const { showHero, ...headerArgs } = args as typeof args & { showHero?: boolean }
    return (
      <>
        <Header {...headerArgs} />
        {showHero && <HeroPlaceholder />}
      </>
    )
  },
}

export const MobileView: Story = {
  name: 'Mobile View',
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
  args: {
    navItems: allNavItems,
    secondaryNavItems,
    primaryCta: sampleCtaPrimary,
    secondaryCta: sampleCtaSecondary,
    utilityLinks: sampleUtilityLinks,
    onSearch: (q: string) => console.log('search:', q),
  },
}

export const QSuperBrand: Story = {
  name: 'QSuper brand',
  globals: { brand: 'theme-b' },
  decorators: [
    (Story) => (
      <ThemeProvider theme={qsuperTheme}>
        <CssBaseline />
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'QSuper brand layout: audience bar (Personal / Employers / Advisers + resource links) above the main bar (full logo + inline megamenu nav + search + CTAs). Brand auto-detected from theme.',
      },
    },
  },
  args: {
    navItems: qsuperNavItems,
    audienceLinks: qsuperAudienceLinks,
    resourceLinks: qsuperResourceLinks,
    activeAudienceHref: '/personal',
    primaryCta: { label: 'Join' },
    secondaryCta: { label: 'Log In' },
    onSearch: (q: string) => console.log('search:', q),
    searchPlaceholder: 'Search QSuper',
  },
  render: (args) => {
    const { showHero, ...headerArgs } = args as typeof args & { showHero?: boolean }
    return (
      <>
        <Header {...headerArgs} />
        {showHero && <HeroPlaceholder />}
      </>
    )
  },
}
