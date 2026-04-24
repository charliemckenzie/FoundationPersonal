import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import Box from '@mui/material/Box'
import MuiTypography from '@mui/material/Typography'

function Section({ label, token, children }: { label: string; token: string; children: React.ReactNode }) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '160px 1fr',
        gap: 4,
        borderBottom: '1px solid',
        borderColor: 'divider',
        py: 3,
      }}
    >
      <Box sx={{ pt: 0.5 }}>
        <Box component="span" sx={{ display: 'block', fontFamily: 'monospace', fontSize: 12, color: 'primary.main' }}>
          {token}
        </Box>
        <Box component="span" sx={{ display: 'block', fontSize: 11, color: 'text.disabled', mt: 0.5 }}>
          {label}
        </Box>
      </Box>
      <Box>{children}</Box>
    </Box>
  )
}

const linkSx = {
  color: 'text.link',
  fontWeight: 500,
  textDecoration: 'underline',
  textUnderlineOffset: '3px',
  textDecorationColor: 'color-mix(in srgb, currentColor 40%, transparent)',
  cursor: 'pointer',
  transition: 'color 0.15s, text-decoration-color 0.15s',
  '&:hover': {
    filter: 'brightness(0.75)',
    textDecorationColor: 'currentColor',
  },
} as const

function TypographyUsageDoc() {
  return (
    <Box sx={{ p: 4, maxWidth: 960 }}>
      <MuiTypography variant="h4" sx={{ mb: 1 }}>Typography Usage</MuiTypography>
      <MuiTypography variant="small" color="text.muted" sx={{ mb: 4, display: 'block' }}>
        Real-world usage patterns for paragraphs, lists, inline links, headers, lead, and small text.
      </MuiTypography>

      {/* Headings */}
      <MuiTypography variant="h6" sx={{ mb: 1, color: 'primary.main' }}>Headings</MuiTypography>
      <MuiTypography variant="small" color="text.muted" sx={{ mb: 2, display: 'block' }}>
        Use semantic heading elements to establish document hierarchy. Render with the matching variant.
      </MuiTypography>

      {(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const).map((v) => (
        <Section key={v} label={`<${v}> element`} token={v}>
          <MuiTypography variant={v} color="text.heading">
            {v === 'h1' && 'The quick brown fox'}
            {v === 'h2' && 'Section title for a content area'}
            {v === 'h3' && 'Subsection within a page'}
            {v === 'h4' && 'Card or panel heading'}
            {v === 'h5' && 'Label-weight heading'}
            {v === 'h6' && 'Smallest structural heading'}
          </MuiTypography>
        </Section>
      ))}

      {/* Body text */}
      <MuiTypography variant="h6" sx={{ mt: 5, mb: 1, color: 'primary.main' }}>Paragraphs</MuiTypography>
      <MuiTypography variant="small" color="text.muted" sx={{ mb: 2, display: 'block' }}>
        Three paragraph roles. Use lead for introductory copy, body for general prose, small for supporting or meta text.
      </MuiTypography>

      <Section label="Introductory paragraph" token="lead">
        <MuiTypography variant="lead">
          Design systems accelerate product development by providing a shared language between design and engineering.
          They reduce decision fatigue and improve consistency across surfaces.
        </MuiTypography>
      </Section>

      <Section label="General prose" token="body">
        <MuiTypography variant="body">
          Use the body variant for the majority of readable content — article text, descriptions, form instructions,
          and interface copy. It is optimised for line length and reading comfort at normal screen distances.
          Aim for lines between 60 and 80 characters where possible.
        </MuiTypography>
      </Section>

      <Section label="Supporting / meta text" token="small">
        <MuiTypography variant="small" color="text.secondary">
          Last updated 12 April 2026 · 4 min read · Tagged under Design Systems, Typography
        </MuiTypography>
      </Section>

      {/* Inline links */}
      <MuiTypography variant="h6" sx={{ mt: 5, mb: 1, color: 'primary.main' }}>Inline Links</MuiTypography>
      <MuiTypography variant="small" color="text.muted" sx={{ mb: 2, display: 'block' }}>
        Links sit inline within body copy. Use color="text.link" with underline decoration on the anchor element.
      </MuiTypography>

      <Section label="Link within prose" token="text.link">
        <MuiTypography variant="body">
          Read the{' '}
          <Box
            component="a"
            href="#"
            sx={linkSx}
          >
            accessibility guidelines
          </Box>
          {' '}before shipping any new component. Links must meet{' '}
          <Box
            component="a"
            href="#"
            sx={linkSx}
          >
            WCAG 2.2 AA contrast requirements
          </Box>
          {' '}against all background tokens.
        </MuiTypography>
      </Section>

      <Section label="Link in small text" token="text.link / small">
        <MuiTypography variant="small" color="text.secondary">
          View the{' '}
          <Box
            component="a"
            href="#"
            sx={{ ...linkSx, fontSize: 'inherit' }}
          >
            changelog
          </Box>
          {' '}for version history.
        </MuiTypography>
      </Section>

      {/* Lists */}
      <MuiTypography variant="h6" sx={{ mt: 5, mb: 1, color: 'primary.main' }}>Lists</MuiTypography>
      <MuiTypography variant="small" color="text.muted" sx={{ mb: 2, display: 'block' }}>
        Use ul for unordered items, ol for sequential steps. List items inherit body typography.
      </MuiTypography>

      <Section label="Unordered list" token="body / ul">
        <Box
          component="ul"
          sx={{ m: 0, pl: 3, display: 'flex', flexDirection: 'column', gap: 0.75 }}
        >
          {[
            'Use theme tokens for all colour and spacing values.',
            'Every component needs a Storybook story before it\'s stable.',
            'Accessibility review is required before merge.',
            'No hardcoded hex values anywhere in the codebase.',
          ].map((item) => (
            <Box component="li" key={item}>
              <MuiTypography variant="body">{item}</MuiTypography>
            </Box>
          ))}
        </Box>
      </Section>

      <Section label="Ordered list" token="body / ol">
        <Box
          component="ol"
          sx={{ m: 0, pl: 3, display: 'flex', flexDirection: 'column', gap: 0.75 }}
        >
          {[
            'Clone the repository and run npm install.',
            'Run npm run check-setup to verify your environment.',
            'Open Storybook with npm run storybook.',
            'Read AGENTS.md and introduce yourself to Smithers.',
          ].map((item) => (
            <Box component="li" key={item}>
              <MuiTypography variant="body">{item}</MuiTypography>
            </Box>
          ))}
        </Box>
      </Section>

      {/* Composition example */}
      <MuiTypography variant="h6" sx={{ mt: 5, mb: 1, color: 'primary.main' }}>Composition</MuiTypography>
      <MuiTypography variant="small" color="text.muted" sx={{ mb: 2, display: 'block' }}>
        How these elements combine in a real document structure.
      </MuiTypography>

      <Box
        sx={{
          borderBottom: '1px solid',
          borderColor: 'divider',
          py: 3,
        }}
      >
        <MuiTypography variant="h2" color="text.heading" sx={{ mb: 2 }}>
          Getting started with the design system
        </MuiTypography>
        <MuiTypography variant="lead" sx={{ mb: 2 }}>
          The foundation design system provides a shared set of components, tokens, and patterns
          for building consistent product interfaces.
        </MuiTypography>
        <MuiTypography variant="body" sx={{ mb: 2 }}>
          Before writing any component code, read the{' '}
          <Box
            component="a"
            href="#"
            sx={linkSx}
          >
            contributing guide
          </Box>
          {' '}and familiarise yourself with the token system. All spacing, colour, and typography values
          come from the theme — never from hardcoded values.
        </MuiTypography>
        <MuiTypography variant="h4" color="text.heading" sx={{ mb: 1.5 }}>
          Prerequisites
        </MuiTypography>
        <Box
          component="ul"
          sx={{ m: 0, pl: 3, mb: 2, display: 'flex', flexDirection: 'column', gap: 0.75 }}
        >
          {[
            'Node 20 or later',
            'npm 10 or later',
            'VS Code with the Claude Code extension',
          ].map((item) => (
            <Box component="li" key={item}>
              <MuiTypography variant="body">{item}</MuiTypography>
            </Box>
          ))}
        </Box>
        <MuiTypography variant="small" color="text.muted">
          Run npm run check-setup to verify your environment before starting.
        </MuiTypography>
      </Box>

      {/* Composition 2 — Release notes / changelog */}
      <Box sx={{ borderBottom: '1px solid', borderColor: 'divider', py: 3 }}>
        <MuiTypography variant="small" color="text.muted" sx={{ display: 'block', mb: 1 }}>
          20 April 2026
        </MuiTypography>
        <MuiTypography variant="h3" color="text.heading" sx={{ mb: 1.5 }}>
          v2.4.0 — Semantic colour tokens
        </MuiTypography>
        <MuiTypography variant="body" sx={{ mb: 2 }}>
          This release replaces all primitive colour references in component code with semantic tokens.
          Hardcoded hex values and direct palette references are no longer permitted — see the{' '}
          <Box component="a" href="#" sx={linkSx}>
            migration guide
          </Box>
          {' '}for a full list of renamed tokens.
        </MuiTypography>
        <MuiTypography variant="h5" color="text.heading" sx={{ mb: 1 }}>
          Breaking changes
        </MuiTypography>
        <Box component="ul" sx={{ m: 0, pl: 3, mb: 2, display: 'flex', flexDirection: 'column', gap: 0.75 }}>
          {[
            'palette.primary.600 → text.link',
            'palette.neutral.100 → surface.subtle',
            'palette.neutral.900 → text.default',
          ].map((item) => (
            <Box component="li" key={item}>
              <MuiTypography variant="body" sx={{ fontFamily: 'monospace' }}>{item}</MuiTypography>
            </Box>
          ))}
        </Box>
        <MuiTypography variant="h5" color="text.heading" sx={{ mb: 1 }}>
          What to do
        </MuiTypography>
        <Box component="ol" sx={{ m: 0, pl: 3, mb: 2, display: 'flex', flexDirection: 'column', gap: 0.75 }}>
          {[
            'Run the codemod: npx @foundation/codemod semantic-tokens',
            'Review any sx props flagged by the ESLint rule.',
            'Re-run Storybook and check visual diffs.',
          ].map((item) => (
            <Box component="li" key={item}>
              <MuiTypography variant="body">{item}</MuiTypography>
            </Box>
          ))}
        </Box>
        <MuiTypography variant="small" color="text.muted">
          Full diff on{' '}
          <Box component="a" href="#" sx={{ ...linkSx, fontSize: 'inherit' }}>
            GitHub
          </Box>
          . Questions? Post in #design-system.
        </MuiTypography>
      </Box>

      {/* Composition 3 — Empty / error state UI copy */}
      <Box sx={{ borderBottom: '1px solid', borderColor: 'divider', py: 3 }}>
        <MuiTypography variant="h4" color="text.heading" sx={{ mb: 1 }}>
          No results found
        </MuiTypography>
        <MuiTypography variant="body" color="text.secondary" sx={{ mb: 2 }}>
          We couldn't find anything matching <Box component="strong" sx={{ color: 'text.default' }}>"semantic button"</Box>.
          Try adjusting your search or browse the full component list.
        </MuiTypography>
        <MuiTypography variant="small" color="text.muted">
          Showing results from{' '}
          <Box component="a" href="#" sx={{ ...linkSx, fontSize: 'inherit' }}>
            all categories
          </Box>
          .
        </MuiTypography>
      </Box>

      {/* Composition 4 — Settings / form description pattern */}
      <Box sx={{ borderBottom: '1px solid', borderColor: 'divider', py: 3 }}>
        <MuiTypography variant="h5" color="text.heading" sx={{ mb: 0.5 }}>
          Email notifications
        </MuiTypography>
        <MuiTypography variant="body" color="text.secondary" sx={{ mb: 2 }}>
          Choose which updates you receive by email. You can change these at any time from your{' '}
          <Box component="a" href="#" sx={linkSx}>
            account settings
          </Box>
          .
        </MuiTypography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {[
            { label: 'Component status changes', desc: 'When a component moves from draft to review or stable.' },
            { label: 'New design token releases', desc: 'When the token set is updated or extended.' },
            { label: 'Breaking changes', desc: 'Always sent — cannot be disabled.' },
          ].map(({ label, desc }) => (
            <Box key={label}>
              <MuiTypography variant="body" sx={{ fontWeight: 500 }}>{label}</MuiTypography>
              <MuiTypography variant="small" color="text.muted">{desc}</MuiTypography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Composition 5 — Long-form article section */}
      <Box sx={{ borderBottom: '1px solid', borderColor: 'divider', py: 3 }}>
        <MuiTypography variant="h2" color="text.heading" sx={{ mb: 2 }}>
          Why design tokens matter
        </MuiTypography>
        <MuiTypography variant="lead" sx={{ mb: 3 }}>
          Tokens are the single source of truth for every visual decision in a product. When a colour
          changes in the theme, every component that uses that token updates automatically.
        </MuiTypography>
        <MuiTypography variant="h4" color="text.heading" sx={{ mb: 1.5 }}>
          The problem without tokens
        </MuiTypography>
        <MuiTypography variant="body" sx={{ mb: 2 }}>
          Without tokens, colours and spacing values are scattered across hundreds of files. A single
          brand refresh means hunting through every component, every stylesheet, and every inline style —
          with no guarantee you found them all.
        </MuiTypography>
        <MuiTypography variant="body" sx={{ mb: 2 }}>
          Tokens solve this by giving every value a name. The name is stable even when the value changes.
          Components reference the name, not the value, so a theme update propagates everywhere at once.
          Read more in the{' '}
          <Box component="a" href="#" sx={linkSx}>
            token architecture guide
          </Box>
          .
        </MuiTypography>
        <MuiTypography variant="h4" color="text.heading" sx={{ mb: 1.5 }}>
          Semantic vs primitive tokens
        </MuiTypography>
        <MuiTypography variant="body" sx={{ mb: 2 }}>
          Primitive tokens name raw values: <Box component="code" sx={{ fontFamily: 'monospace', fontSize: '0.875em' }}>blue-600 = #2563eb</Box>.
          Semantic tokens assign meaning: <Box component="code" sx={{ fontFamily: 'monospace', fontSize: '0.875em' }}>text.link = blue-600</Box>.
          Components should always use semantic tokens — never primitives directly.
        </MuiTypography>
        <Box component="ul" sx={{ m: 0, pl: 3, mb: 2, display: 'flex', flexDirection: 'column', gap: 0.75 }}>
          {[
            'Semantic tokens can be reassigned per theme without touching component code.',
            'Primitive tokens can be updated in one place and all semantic tokens inherit the change.',
            'The two-layer model scales from single-brand to multi-brand with minimal effort.',
          ].map((item) => (
            <Box component="li" key={item}>
              <MuiTypography variant="body">{item}</MuiTypography>
            </Box>
          ))}
        </Box>
        <MuiTypography variant="small" color="text.muted">
          See{' '}
          <Box component="a" href="#" sx={{ ...linkSx, fontSize: 'inherit' }}>
            Colors
          </Box>
          {' '}and{' '}
          <Box component="a" href="#" sx={{ ...linkSx, fontSize: 'inherit' }}>
            Primitives
          </Box>
          {' '}in Design Tokens for the full token reference.
        </MuiTypography>
      </Box>
    </Box>
  )
}

const meta: Meta<typeof TypographyUsageDoc> = {
  title: 'Design Tokens/Typography',
  component: TypographyUsageDoc,
  parameters: {
    layout: 'fullscreen',
    docs: { canvas: { sourceState: 'hidden' } },
  },
}
export default meta

export const Usage: StoryObj<typeof TypographyUsageDoc> = {
  render: () => <TypographyUsageDoc />,
}
