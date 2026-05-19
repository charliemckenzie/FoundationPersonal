import type { Meta, StoryObj } from '@storybook/react'
import type { ComponentProps } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { Header } from '../../components/Header'
import { Button } from '../../components/Button'
import type {
  NavItemMegamenu,
  CtaAction,
  UtilityLink,
} from '../../components/Header/types'

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
        <Typography variant="h5" sx={{ color: 'text.heading' }}>
          Focused on long-term returns
        </Typography>
        <Typography variant="body" sx={{ color: 'text.muted' }}>
          We take care of your super. Join 2.4 million Australians who trust us.
        </Typography>
        <Button
          label="Join us today"
          variant="contained"
          size="small"
          onClick={() => { window.location.href = '/join' }}
        />
      </Box>
    ),
  },
  columns: [
    {
      links: [
        { label: 'Compare us', href: '/why/compare' },
        { label: 'Award-winning', href: '/why/awards' },
        { label: 'Strong performance', href: '/why/performance' },
        { label: 'Committed to lower fees', href: '/why/fees' },
      ],
    },
    {
      heading: 'Member online',
      links: [
        { label: 'Mobile app', href: '/why/app' },
      ],
    },
    {
      heading: 'Ready to make the switch?',
      links: [
        { label: 'Join in 5 minutes', href: '/join' },
      ],
    },
  ],
}

const superItem: NavItemMegamenu = {
  type: 'megamenu',
  label: 'Super',
  columns: [
    {
      heading: 'Your super',
      links: [
        { label: 'How super works', href: '/super/how' },
        { label: 'Consolidate super', href: '/super/consolidate' },
        { label: 'Super contributions', href: '/super/contributions' },
        { label: 'Find lost super', href: '/super/lost' },
      ],
    },
    {
      heading: 'Performance & fees',
      links: [
        { label: 'Investment performance', href: '/super/performance' },
        { label: 'Fees & costs', href: '/super/fees' },
      ],
    },
  ],
}

const retirementItem: NavItemMegamenu = {
  type: 'megamenu',
  label: 'Retirement',
  columns: [
    {
      heading: 'Planning',
      links: [
        { label: 'Retirement guide', href: '/retirement/guide' },
        { label: 'Income streams', href: '/retirement/income' },
        { label: 'Age pension', href: '/retirement/pension' },
      ],
    },
    {
      heading: 'Transition',
      links: [
        { label: 'When to retire', href: '/retirement/when' },
        { label: 'Access your super', href: '/retirement/access' },
      ],
    },
  ],
}

const investmentsItem: NavItemMegamenu = {
  type: 'megamenu',
  label: 'Investments',
  columns: [
    {
      heading: 'Investment options',
      links: [
        { label: 'MySuper Lifecycle', href: '/investments/mysuper' },
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
}

const insuranceItem: NavItemMegamenu = {
  type: 'megamenu',
  label: 'Insurance',
  columns: [
    {
      heading: 'Cover',
      links: [
        { label: 'Insurance cover', href: '/insurance/cover' },
        { label: 'Death cover', href: '/insurance/death' },
        { label: 'TPD cover', href: '/insurance/tpd' },
        { label: 'Income protection', href: '/insurance/income' },
      ],
    },
    {
      heading: 'Claims',
      links: [
        { label: 'Make a claim', href: '/insurance/claim' },
        { label: 'Claims support', href: '/insurance/support' },
      ],
    },
  ],
}

const toolsItem: NavItemMegamenu = {
  type: 'megamenu',
  label: 'Tools & advice',
  columns: [
    {
      heading: 'Calculators',
      links: [
        { label: 'Retirement calculator', href: '/tools/retirement' },
        { label: 'Insurance estimator', href: '/tools/insurance' },
        { label: 'Fee comparison', href: '/tools/fees' },
      ],
    },
    {
      heading: 'Advice',
      links: [
        { label: 'Financial advice', href: '/advice' },
        { label: 'Find an adviser', href: '/advice/find' },
      ],
    },
  ],
}

const forEmployers: NavItemMegamenu = {
  type: 'megamenu',
  label: 'For employers',
  columns: [
    {
      heading: 'Getting started',
      links: [
        { label: 'Set up super for employees', href: '/employers/setup' },
        { label: 'Employer obligations', href: '/employers/obligations' },
        { label: 'SuperStream', href: '/employers/superstream' },
      ],
    },
    {
      heading: 'Tools',
      links: [
        { label: 'Employer portal', href: '/employers/portal' },
        { label: 'Clearing house', href: '/employers/clearing-house' },
      ],
    },
  ],
}

const forAdvisers: NavItemMegamenu = {
  type: 'megamenu',
  label: 'For advisers',
  columns: [
    {
      heading: 'Resources',
      links: [
        { label: 'Adviser portal', href: '/advisers/portal' },
        { label: 'Product information', href: '/advisers/products' },
        { label: 'Technical resources', href: '/advisers/technical' },
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
    { label: 'Join as an employer', href: '/join/employer' },
  ],
}
const sampleCtaSecondary: CtaAction = {
  label: 'Log in',
  menu: [
    { label: 'Member login', href: '/login/member' },
    { label: 'Employer login', href: '/login/employer' },
  ],
}

const sampleUtilityLinks: UtilityLink[] = [
  { label: 'Rewards', href: '/rewards', icon: 'gift' },
  { label: 'Learn', href: '/learn', icon: 'book-open' },
  { label: 'Contact', href: '/contact', icon: 'phone-sharp' },
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
    },    searchPlaceholder: {
      description: 'Placeholder text for the search input. Defaults to `“Search”` if omitted.',
      control: 'text',
      table: { category: 'Search', type: { summary: 'string' } },
    },    // ─── State ─────────────────────────────────────────────────────────────
    condensed: {
      description: 'Force the condensed (scrolled) state. Normally driven by scroll position — use this in Storybook or tests to preview the compact header without scrolling.',
      control: 'boolean',
      table: { category: 'State', defaultValue: { summary: 'false' } },
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
    searchPlaceholder: 'Search Australian Retirement Trust',
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
    searchPlaceholder: 'Search Australian Retirement Trust',
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
    searchPlaceholder: 'Search Australian Retirement Trust',
  },
}

export const Condensed: Story = {
  name: 'Condensed (scrolled)',
  parameters: {
    docs: {
      description: {
        story: 'Single-row compact layout shown on desktop after scrolling past 50px. Logo collapses to the brand mark, nav moves inline, search becomes a pill icon, utility link icons are hidden. Pass `condensed={true}` to force this state without scrolling — useful for testing and visual regression.',
      },
    },
  },
  args: {
    navItems: allNavItems,
    primaryCta: sampleCtaPrimary,
    secondaryCta: sampleCtaSecondary,
    utilityLinks: sampleUtilityLinks,
    onSearch: (q: string) => console.log('search:', q),
    searchPlaceholder: 'Search Australian Retirement Trust',
    condensed: true,
  },
  render: (args) => {
    const { showHero, ...headerArgs } = args as typeof args & { showHero?: boolean }
    return <Header {...headerArgs} />
  },
}
