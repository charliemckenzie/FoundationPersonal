# Foundation Demo Project — Setup Prompt

**Setup:**
1. Create a new empty folder anywhere on your machine.
2. Place this document and the Foundation `.tgz` tarball into that folder.
3. Open the folder in VS Code.
4. Open Copilot Agent and say: *"Run this prompt."*

---

## Context

Foundation is a React component library built on MUI. The tarball is the compiled, installable build.

Package name inside the tarball: `@paolo-meyer_artghec/foundation`  
Tarball location: in the same folder as this document (detect the `.tgz` file present in the workspace root).

---

## Task

Set up a new Next.js app as a subfolder of the current workspace. Install Foundation from the local tarball and render a kitchen-sink demo page in the browser. Follow every step below in order.

---

## Step 1 — Scaffold the app

From the workspace root, scaffold the Next.js app as a subfolder:

```bash
npx create-next-app@latest foundation-demo \
  --typescript \
  --app \
  --no-tailwind \
  --src-dir \
  --import-alias "@/*" \
  --no-eslint
cd foundation-demo
```

---

## Step 2 — Install Foundation and peer dependencies

Detect the tarball in the workspace root (one level up from `foundation-demo/`) and install it:

```bash
TGZ=$(ls ../*.tgz | head -1)
npm install "$TGZ"

npm install \
  @mui/material \
  @mui/icons-material \
  @emotion/react \
  @emotion/styled \
  @tabler/icons-react
```

Then immediately patch the tarball's exports map (it has `import`/`require` swapped, which breaks Turbopack):

```bash
node -e "
const fs = require('fs');
const p = 'node_modules/@paolo-meyer_artghec/foundation/package.json';
const pkg = JSON.parse(fs.readFileSync(p, 'utf8'));
pkg.exports['.'].import = './dist/index.mjs';
pkg.exports['.'].require = './dist/index.js';
pkg.main = './dist/index.js';
pkg.module = './dist/index.mjs';
fs.writeFileSync(p, JSON.stringify(pkg, null, 2));
console.log('exports map patched');
"
```

---

## Step 3 — Create `src/app/providers.tsx`

Foundation's bundle has no `'use client'` directive, so Next.js App Router would evaluate MUI hooks on the server and crash. Create this thin client wrapper first:

```tsx
'use client'

import { ThemeRegistry } from '@paolo-meyer_artghec/foundation'

export default function Providers({ children }: { children: React.ReactNode }) {
  return <ThemeRegistry>{children}</ThemeRegistry>
}
```

---

## Step 4 — Replace `src/app/layout.tsx`

Delete the generated file and create this one. It loads the two fonts Foundation's theme expects via CSS variables, and uses `Providers` (not `ThemeRegistry` directly) so `metadata` stays valid on the server:

```tsx
import type { Metadata } from 'next'
import { Noto_Sans, Merriweather } from 'next/font/google'
import Providers from './providers'

const notoSans = Noto_Sans({
  subsets: ['latin'],
  variable: '--font-noto-sans',
  display: 'swap',
})

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  variable: '--font-merriweather',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Foundation Demo',
  description: 'ART Design System kitchen sink',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${notoSans.variable} ${merriweather.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
```

---

## Step 5 — Replace `src/app/globals.css`

Delete everything in the file and replace with just:

```css
*, *::before, *::after {
  box-sizing: border-box;
}

body {
  margin: 0;
}
```

---

## Step 6 — Replace `src/app/page.tsx`

Delete the generated file and create this kitchen-sink demo page. It uses:
- `Header` — full ART site header matching the Storybook Default story: rich megamenus with promo cards, secondary nav (For employers / For advisers), CTA dropdown menus, correct utility icon names
- `Footer` — ART brand footer
- `Alert` — info banner
- `Card` — three cards in a grid (open variant)
- `Button` — contained, outlined, soft, ghost, loading, disabled variants
- `Tabs` — tab navigation with content panels
- `Accordion` — expandable FAQ items

Key points about the Header props:
- `navItems` — primary nav; each megamenu item should have a `promoCard` (rendered as a side panel in the dropdown)
- `secondaryNavItems` — right-aligned nav items (For employers, For advisers)
- `primaryCta` / `secondaryCta` — use `menu: [...]` for dropdown menus, not plain `href`
- `utilityLinks` — icon names must match Tabler icon slugs (e.g. `'phone-sharp'`, `'gift'`, `'book-open'`)

```tsx
'use client'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import {
  Header,
  Footer,
  Button,
  Card,
  Alert,
  Tabs,
  Accordion,
} from '@paolo-meyer_artghec/foundation'
import type { NavItem, NavItemMegamenu, CtaAction, UtilityLink } from '@paolo-meyer_artghec/foundation'

const whyChooseUs: NavItemMegamenu = {
  type: 'megamenu',
  label: 'Why choose us?',
  promoCard: {
    children: (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h5" sx={{ color: 'text.heading', fontWeight: 700 }}>Focused on long-term returns</Typography>
        <Typography variant="body1" sx={{ color: 'text.muted' }}>We take care of your super. Join 2.4 million Australians who trust us.</Typography>
        <Box component="a" href="/join" sx={{ color: 'primary.main', textDecoration: 'none', fontWeight: 500, '&:hover': { textDecoration: 'underline' } }}>Join us today.</Box>
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
        { heading: 'Member online', headingHref: '/member-online' },
        { heading: 'Mobile app', headingHref: '/mobile-app' },
        { heading: 'Ready to make the switch?', headingHref: '/join', links: [{ label: 'Join in 5 minutes', href: '/join/5-minutes' }] },
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
        <Typography variant="h5" sx={{ color: 'text.heading', fontWeight: 700 }}>Be super informed</Typography>
        <Typography variant="body1" sx={{ color: 'text.muted' }}>Stay in the know with our articles and tools.</Typography>
        <Box component="a" href="/learn" sx={{ color: 'primary.main', textDecoration: 'none', fontWeight: 500, '&:hover': { textDecoration: 'underline' } }}>Learn more →</Box>
      </Box>
    ),
  },
  columns: [
    {
      heading: 'Superannuation',
      headingHref: '/super',
      groups: [
        { heading: 'What is superannuation?', headingHref: '/super/what-is', links: [{ label: 'How much super should I have?', href: '/super/how-much' }, { label: 'Best super fund', href: '/super/best-fund' }] },
        { heading: 'Account types', headingHref: '/super/account-types', links: [{ label: 'Investment performance', href: '/super/performance' }, { label: 'Super fees', href: '/super/fees' }, { label: 'Open a super account', href: '/super/open' }] },
      ],
    },
    { groups: [{ heading: 'Consolidate super', headingHref: '/super/consolidate', links: [{ label: 'Find lost super', href: '/super/lost' }] }, { heading: 'Contribute to super', headingHref: '/super/contribute', links: [{ label: 'Salary sacrifice', href: '/super/salary-sacrifice' }, { label: 'Voluntary contributions', href: '/super/voluntary' }] }] },
    { groups: [{ heading: 'How to withdraw super', headingHref: '/super/withdraw', links: [{ label: 'Early access to super', href: '/super/early-access' }, { label: 'Claim a death benefit', href: '/super/death-benefit' }] }, { heading: 'FAQs', headingHref: '/super/faqs' }, { heading: 'Forms and documents', headingHref: '/super/forms' }] },
  ],
}

const retirementItem: NavItemMegamenu = {
  type: 'megamenu',
  label: 'Retirement',
  promoCard: { children: (<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}><Typography variant="h5" sx={{ color: 'text.heading', fontWeight: 700 }}>Award-winning products</Typography><Typography variant="body1" sx={{ color: 'text.muted' }}>Keep your super working for you in retirement.</Typography></Box>) },
  columns: [
    { heading: 'Retirement', headingHref: '/retirement', groups: [{ heading: 'Planning your retirement', headingHref: '/retirement/planning', links: [{ label: 'How much super will I need?', href: '/retirement/how-much' }, { label: 'When can I retire?', href: '/retirement/when' }, { label: 'Government Age Pension', href: '/retirement/age-pension' }] }] },
    { groups: [{ heading: 'Our income accounts', headingHref: '/retirement/income-accounts', links: [{ label: 'Transition to Retirement Income account', href: '/retirement/ttr' }, { label: 'Retirement Income account', href: '/retirement/income-account' }, { label: 'Lifetime Pension', href: '/retirement/lifetime-pension' }] }] },
    { groups: [{ heading: 'FAQs', headingHref: '/retirement/faqs' }, { heading: 'Retirement calculator', headingHref: '/retirement/calculator' }, { heading: 'Forms and documents', headingHref: '/forms' }] },
  ],
}

const insuranceItem: NavItemMegamenu = {
  type: 'megamenu',
  label: 'Insurance',
  promoCard: { children: (<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}><Typography variant="h5" sx={{ color: 'text.heading', fontWeight: 700 }}>Cover for your needs</Typography><Typography variant="body1" sx={{ color: 'text.muted' }}>Your insurance cover can give you and your family financial protection.</Typography></Box>) },
  columns: [
    { heading: 'Insurance', headingHref: '/insurance', groups: [{ heading: 'Find the right insurance for you', headingHref: '/insurance/find', links: [{ label: 'Total & Permanent Disability (TPD) cover', href: '/insurance/tpd' }, { label: 'Death cover', href: '/insurance/death' }, { label: 'Income Protection cover', href: '/insurance/income-protection' }] }] },
    { heading: 'Manage your insurance', headingHref: '/insurance/manage', links: [{ label: 'Log in to your account', href: '/login' }, { label: 'Keep cover', href: '/insurance/keep-cover' }] },
    { groups: [{ heading: 'Insurance quote', headingHref: '/insurance/quote' }, { heading: 'Insurance needs calculator', headingHref: '/insurance/calculator' }] },
  ],
}

const toolsItem: NavItemMegamenu = {
  type: 'megamenu',
  label: 'Tools & advice',
  promoCard: { children: (<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}><Typography variant="h5" sx={{ color: 'text.heading', fontWeight: 700 }}>Get expert advice</Typography><Typography variant="body1" sx={{ color: 'text.muted' }}>Your membership includes advice about your ART account over the phone.</Typography></Box>) },
  columns: [
    { heading: 'Tools & advice', headingHref: '/tools', groups: [{ heading: 'Your advice options', headingHref: '/advice/options', links: [{ label: 'Book a financial adviser appointment', href: '/advice/book' }] }, { heading: 'PDS and guides', headingHref: '/pds', links: [{ label: 'Super Savings guide [PDF]', href: '/pds/super-savings' }, { label: 'Super Savings Insurance guide [PDF]', href: '/pds/insurance' }] }] },
    { groups: [{ heading: 'Events & seminars', headingHref: '/events' }, { heading: 'Forms & documents', headingHref: '/forms' }, { heading: 'Learn about super', headingHref: '/learn' }] },
    { heading: 'Tools & calculators', headingHref: '/tools/calculators', links: [{ label: 'Contributions calculator', href: '/tools/contributions-calc' }, { label: 'Retirement calculator', href: '/tools/retirement-calc' }, { label: 'Risk profile quiz', href: '/tools/risk-quiz' }, { label: 'Compare funds', href: '/tools/compare-funds' }] },
  ],
}

const navItems: NavItem[] = [whyChooseUs, superItem, retirementItem, insuranceItem, toolsItem]

const secondaryNavItems: NavItem[] = [
  { type: 'megamenu', label: 'For employers', columns: [{ heading: 'For employers', headingHref: '/employers', links: [{ label: 'Register as an employer', href: '/employers/register' }, { label: 'Pay super online', href: '/employers/pay-online' }, { label: 'Employer obligations', href: '/employers/obligations' }] }] },
  { type: 'megamenu', label: 'For advisers', columns: [{ heading: 'For advisers', headingHref: '/advisers', links: [{ label: 'Why choose us', href: '/advisers/why' }, { label: 'Login', href: '/advisers/login' }, { label: 'Register', href: '/advisers/register' }] }] },
]

const primaryCta: CtaAction = {
  label: 'Join',
  menu: [
    { label: 'Join as a member', href: '/join/member' },
    { label: 'Join as an employer', href: '/join/employer' },
  ],
}

const secondaryCta: CtaAction = {
  label: 'Log in',
  menu: [
    { label: 'Member login', href: '/login/member' },
    { label: 'Employer login', href: '/login/employer' },
    { label: 'Setup online access', items: [{ label: "I'm a member", href: '/setup/member' }, { label: "I'm an employer", href: '/setup/employer' }, { label: "I'm an adviser", href: '/setup/adviser' }] },
  ],
}

const utilityLinks: UtilityLink[] = [
  { label: 'Contact us', href: '/contact', icon: 'phone-sharp' },
  { label: 'Rewards', href: '/rewards', icon: 'gift' },
  { label: 'Learn', href: '/learn', icon: 'book-open' },
]

const tabs = [
  {
    label: 'Overview',
    content: (
      <Typography sx={{ pt: 2 }}>
        Foundation is the ART design system. It ships pre-themed MUI components
        so product teams can build consistent, accessible interfaces without
        reinventing common patterns.
      </Typography>
    ),
  },
  {
    label: 'Components',
    content: (
      <Typography sx={{ pt: 2 }}>
        26 components are exported from the package — Button, Card, Header,
        Footer, Alert, Tabs, Accordion, TextField, Select, and more.
      </Typography>
    ),
  },
  {
    label: 'Theming',
    content: (
      <Typography sx={{ pt: 2 }}>
        The theme is brand-aware. Wrap your app in{' '}
        <code>ThemeRegistry</code> (Next.js) or{' '}
        <code>ThemeRegistryBase</code> (Vite/CRA) and all components inherit
        the correct tokens automatically.
      </Typography>
    ),
  },
]

const accordionItems = [
  {
    label: 'What is Foundation?',
    content: (
      <Typography>
        Foundation is ART's shared component library. It provides a consistent
        visual language across all ART digital products.
      </Typography>
    ),
  },
  {
    label: 'How do I install it?',
    content: (
      <Typography>
        Install the tarball or, once published to GitHub Packages, run{' '}
        <code>npm install @art/foundation</code>.
      </Typography>
    ),
  },
  {
    label: 'Can I use a custom brand theme?',
    content: (
      <Typography>
        Yes — use <code>createBrandTheme</code> and pass a{' '}
        <code>BrandConfig</code> object to generate a fully customised MUI
        theme.
      </Typography>
    ),
  },
]

export default function HomePage() {
  return (
    <>
      <Header
        navItems={navItems}
        secondaryNavItems={secondaryNavItems}
        primaryCta={primaryCta}
        secondaryCta={secondaryCta}
        utilityLinks={utilityLinks}
        onSearch={(q) => console.log('Search:', q)}
        searchPlaceholder="Search ART…"
      />

      <Box component="main" id="main-content" sx={{ py: { xs: 4, md: 8 } }}>
        <Container maxWidth="lg">

          {/* Alert banner */}
          <Alert
            severity="info"
            title="Foundation demo"
            message="This page demonstrates the ART design system. All components use the ART brand theme with no hardcoded styles."
          />

          {/* Intro heading */}
          <Box sx={{ mt: 6, mb: 4 }}>
            <Typography variant="h1" gutterBottom>
              Kitchen sink
            </Typography>
            <Typography variant="body1" color="text.secondary">
              A single page showing the Header, Footer, and a cross-section of
              Foundation components in their default ART theme.
            </Typography>
          </Box>

          {/* Tabs */}
          <Box sx={{ mt: 6 }}>
            <Typography variant="h2" gutterBottom>Tabs</Typography>
            <Tabs label="Demo tabs" tabs={tabs} size="medium" />
          </Box>

          {/* Card grid */}
          <Box sx={{ mt: 8 }}>
            <Typography variant="h2" gutterBottom>Cards</Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
                gap: 3,
                mt: 2,
              }}
            >
              <Card
                variant="open"
                title="Superannuation"
                subtitle="Grow your retirement savings with a fund that works as hard as you do."
                primaryAction={{ label: 'Learn more', onClick: () => {} }}
              />
              <Card
                variant="open"
                title="Insurance"
                subtitle="Protect what matters most — income, life, and total permanent disability cover."
                primaryAction={{ label: 'Get covered', onClick: () => {} }}
              />
              <Card
                variant="open"
                title="Retirement planning"
                subtitle="Plan your transition to retirement with tools and advice tailored to you."
                primaryAction={{ label: 'Start planning', onClick: () => {} }}
                secondaryAction={{ label: 'Talk to us', onClick: () => {} }}
              />
            </Box>
          </Box>

          {/* Buttons */}
          <Box sx={{ mt: 8 }}>
            <Typography variant="h2" gutterBottom>Buttons</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
              <Button variant="contained" label="Contained" />
              <Button variant="outlined" label="Outlined" />
              <Button variant="soft" label="Soft" />
              <Button variant="ghost" label="Ghost" />
              <Button variant="contained" label="Loading" loading />
              <Button variant="contained" label="Disabled" disabled />
            </Box>
          </Box>

          {/* Accordion */}
          <Box sx={{ mt: 8, mb: 8 }}>
            <Typography variant="h2" gutterBottom>Accordion</Typography>
            <Box sx={{ mt: 2 }}>
              <Accordion items={accordionItems} />
            </Box>
          </Box>

        </Container>
      </Box>

      <Footer />
    </>
  )
}
```

---

## Step 7 — Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## What you should see

- ART header with logo, megamenu nav, utility links, search, and CTA buttons
- Info alert banner
- Tabs with three content panels
- Three cards in a responsive grid
- Six button variants
- Accordion FAQ
- ART footer with nav sections and branding

---

## Known issues (already handled by these steps)

**Exports map mismatch** — The tarball's `package.json` incorrectly maps `import` to the CJS bundle and `require` to a non-existent file. Step 2 patches this so Turbopack resolves the correct ESM file (`dist/index.mjs`).

**Server/client boundary crash** — Foundation's bundle has no `'use client'` directive. Importing `ThemeRegistry` directly in a server component causes Next.js to evaluate MUI's `useMediaQuery` on the server and throw. Step 3 (`providers.tsx`) solves this with a client wrapper.

**Missing fonts** — Foundation's theme references CSS variables `--font-noto-sans` and `--font-merriweather`. Without loading them via `next/font`, headings fall back to a generic serif. Step 4 handles this.
