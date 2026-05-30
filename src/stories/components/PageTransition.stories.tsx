import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { AnimatePresence, motion } from 'framer-motion';
import { PageTransition } from '../../components/PageTransition';
import { pageVariants, pageTransition } from '../../components/PageTransition/variants';
import { Button } from '../../components/Button';

const PAGES = [
  { id: 'home',     title: 'Home',     body: 'Your super balance, recent activity, and quick links live here.' },
  { id: 'invest',   title: 'Investments', body: 'See how your money is invested and switch options at any time.' },
  { id: 'profile',  title: 'Profile',  body: 'Update your contact details, communication preferences, and login.' },
];

/**
 * Mirrors the real component's motion (same `pageVariants` + `pageTransition`)
 * but swaps a local key instead of a route, so the fade is visible in Storybook.
 * In production, `PageTransition` keys off `usePathname()` automatically.
 */
function Demo() {
  const [index, setIndex] = useState(0);
  const page = PAGES[index];

  return (
    <Stack spacing={3} sx={{ width: 560 }}>
      <Box sx={{ display: 'flex', gap: 1 }}>
        {PAGES.map((p, i) => (
          <Button
            key={p.id}
            label={p.title}
            variant={i === index ? 'contained' : 'outlined'}
            onClick={() => setIndex(i)}
          />
        ))}
      </Box>

      <Box sx={{ minHeight: 200, p: 3, borderRadius: 2, border: '1px solid', borderColor: 'border.default', bgcolor: 'background.paper' }}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={page.id}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <Stack spacing={1.5}>
              <Typography variant="h3">{page.title}</Typography>
              <Typography variant="body" color="text.muted" sx={{ lineHeight: 1.75 }}>
                {page.body}
              </Typography>
            </Stack>
          </motion.div>
        </AnimatePresence>
      </Box>
    </Stack>
  );
}

const meta: Meta<typeof PageTransition> = {
  title: 'Components / Page Transition',
  component: PageTransition,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Fades the **content area** in and out as the route changes. Place it inside a persistent layout, wrapping the page content (not the header or footer), so only the content cross-fades while the chrome stays put.

**Driven by the router** — it keys off \`usePathname()\`, so consumers pass nothing but \`children\`. Built on framer-motion (\`AnimatePresence\` + a frozen router segment) hidden entirely behind this component — call sites never import the animation library.

\`\`\`tsx
// inside a section layout.tsx
<Box component="main">
  <PageTransition excludePaths={PAGE_TRANSITION_EXCLUDE}>
    {children}
  </PageTransition>
</Box>
\`\`\`

**Opting out** — two levers:
- \`excludePaths\` — central route-prefix list (e.g. multi-step form flows that run their own \`StepTransition\`). Maintained in \`src/app/pageTransition.config.ts\`.
- \`disabled\` — per-instance escape hatch for one-offs.

**Reduced motion** — respects \`prefers-reduced-motion: reduce\`. When set, content swaps instantly with no fade.

**Tuning** — all motion values live in one place, \`src/components/PageTransition/variants.ts\`. Adjust duration, easing, or add a subtle lift there.

> The interactive demo below toggles a local key to make the fade visible. In the app the transition is wired once per section layout and fires on navigation.
        `.trim(),
      },
    },
  },
  argTypes: {
    children:     { table: { disable: true } },
    disabled:     { control: 'boolean', description: 'Per-instance escape hatch — render content with no transition.' },
    excludePaths: { control: 'object', description: 'Route prefixes that opt out, matched against the pathname.' },
  },
};

export default meta;
type Story = StoryObj<typeof PageTransition>;

/**
 * Click between pages to see the content fade out and the next fade in. The
 * motion matches the real component — it imports the same variants and timing.
 */
export const Default: Story = {
  render: () => <Demo />,
};
