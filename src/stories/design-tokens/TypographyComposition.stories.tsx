import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import Box from '@mui/material/Box'
import MuiTypography from '@mui/material/Typography'

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

function TypographyCompositionDoc() {
  return (
    <Box sx={{ p: 4, maxWidth: 960 }}>
      <MuiTypography variant="h4" sx={{ mb: 1 }}>Typography Composition</MuiTypography>
      <MuiTypography variant="small" color="text.muted" sx={{ mb: 4, display: 'block' }}>
        How typography variants combine in real document structures.
      </MuiTypography>

      <Box sx={{ borderBottom: '1px solid', borderColor: 'divider', py: 3, display: 'flex', flexDirection: 'column' }}>
        <MuiTypography variant="h2" sx={{ mb: 1.5 }}>
          Getting started with the design system
        </MuiTypography>
        <MuiTypography variant="lead" sx={{ mb: 2.5 }}>
          The foundation design system provides a shared set of components, tokens, and patterns
          for building consistent product interfaces.
        </MuiTypography>
        <MuiTypography variant="body" sx={{ mb: 2, lineHeight: 1.75 }}>
          Before writing any component code, read the{' '}
          <Box component="a" href="#" sx={linkSx}>contributing guide</Box>
          {' '}and familiarise yourself with the token system. All spacing, colour, and typography values
          come from the theme — never from hardcoded values.
        </MuiTypography>
        <MuiTypography variant="h4" sx={{ mt: 3, mb: 1 }}>
          Prerequisites
        </MuiTypography>
        <Box component="ul" sx={{ m: 0, pl: 3, mb: 2, '& > li + li': { mt: 0.75 } }}>
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

      <Box sx={{ borderBottom: '1px solid', borderColor: 'divider', py: 3, display: 'flex', flexDirection: 'column' }}>
        <MuiTypography variant="small" color="text.muted" sx={{ display: 'block', mb: 1 }}>
          20 April 2026
        </MuiTypography>
        <MuiTypography variant="h3" sx={{ mb: 1 }}>
          v2.4.0 — Semantic colour tokens
        </MuiTypography>
        <MuiTypography variant="body" sx={{ mb: 2, lineHeight: 1.75 }}>
          This release replaces all primitive colour references in component code with semantic tokens.
          Hardcoded hex values and direct palette references are no longer permitted — see the{' '}
          <Box component="a" href="#" sx={linkSx}>migration guide</Box>
          {' '}for a full list of renamed tokens.
        </MuiTypography>
        <MuiTypography variant="h5" sx={{ mt: 2, mb: 1 }}>
          Breaking changes
        </MuiTypography>
        <Box component="ul" sx={{ m: 0, pl: 3, mb: 2, '& > li + li': { mt: 0.75 } }}>
          {[
            'palette.primary.600 → text.link',
            'palette.neutral.100 → surface.subtle',
            'palette.neutral.900 → text.default',
          ].map((item) => (
            <Box component="li" key={item}>
              <MuiTypography variant="body">{item}</MuiTypography>
            </Box>
          ))}
        </Box>
        <MuiTypography variant="h5" sx={{ mt: 2, mb: 1 }}>
          What to do
        </MuiTypography>
        <Box component="ol" sx={{ m: 0, pl: 3, mb: 2, '& > li + li': { mt: 0.75 } }}>
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
          <Box component="a" href="#" sx={{ ...linkSx, fontSize: 'inherit' }}>GitHub</Box>
          . Questions? Post in #design-system.
        </MuiTypography>
      </Box>

      <Box sx={{ borderBottom: '1px solid', borderColor: 'divider', py: 3, display: 'flex', flexDirection: 'column' }}>
        <MuiTypography variant="h4" sx={{ mb: 1 }}>
          No results found
        </MuiTypography>
        <MuiTypography variant="body" color="text.secondary" sx={{ mb: 2 }}>
          We couldn't find anything matching{' '}
          <Box component="strong" sx={{ color: 'text.default' }}>"semantic button"</Box>.
          Try adjusting your search or browse the full component list.
        </MuiTypography>
        <MuiTypography variant="small" color="text.muted">
          Showing results from{' '}
          <Box component="a" href="#" sx={{ ...linkSx, fontSize: 'inherit' }}>all categories</Box>
          .
        </MuiTypography>
      </Box>

      <Box sx={{ borderBottom: '1px solid', borderColor: 'divider', py: 3, display: 'flex', flexDirection: 'column' }}>
        <MuiTypography variant="h5" sx={{ mb: 1 }}>
          Email notifications
        </MuiTypography>
        <MuiTypography variant="body" color="text.secondary" sx={{ mb: 2 }}>
          Choose which updates you receive by email. You can change these at any time from your{' '}
          <Box component="a" href="#" sx={linkSx}>account settings</Box>
          .
        </MuiTypography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {[
            { label: 'Component status changes', desc: 'When a component moves from draft to review or stable.' },
            { label: 'New design token releases', desc: 'When the token set is updated or extended.' },
            { label: 'Breaking changes', desc: 'Always sent — cannot be disabled.' },
          ].map(({ label, desc }) => (
            <Box key={label}>
              <MuiTypography variant="body" sx={{ fontWeight: 500, mb: 0 }}>{label}</MuiTypography>
              <MuiTypography variant="small" color="text.muted">{desc}</MuiTypography>
            </Box>
          ))}
        </Box>
        <MuiTypography variant="small" color="text.muted" sx={{ display: 'block', mt: 2 }}>
          Preferences are saved automatically. Changes take effect on your next login.
        </MuiTypography>
      </Box>

      <Box sx={{ borderBottom: '1px solid', borderColor: 'divider', py: 3, display: 'flex', flexDirection: 'column' }}>
        <MuiTypography variant="h2" sx={{ mb: 1.5 }}>
          Why design tokens matter
        </MuiTypography>
        <MuiTypography variant="lead" sx={{ mb: 2.5 }}>
          Tokens are the single source of truth for every visual decision in a product. When a colour
          changes in the theme, every component that uses that token updates automatically.
        </MuiTypography>
        <MuiTypography variant="h4" sx={{ mb: 1 }}>
          The problem without tokens
        </MuiTypography>
        <MuiTypography variant="body" sx={{ mb: 2, lineHeight: 1.75 }}>
          Without tokens, colours and spacing values are scattered across hundreds of files. A single
          brand refresh means hunting through every component, every stylesheet, and every inline style —
          with no guarantee you found them all.
        </MuiTypography>
        <MuiTypography variant="body" sx={{ mb: 2, lineHeight: 1.75 }}>
          Tokens solve this by giving every value a name. The name is stable even when the value changes.
          Components reference the name, not the value, so a theme update propagates everywhere at once.
          Read more in the{' '}
          <Box component="a" href="#" sx={linkSx}>token architecture guide</Box>
          .
        </MuiTypography>
        <MuiTypography variant="h4" sx={{ mt: 3, mb: 1 }}>
          Semantic vs primitive tokens
        </MuiTypography>
        <MuiTypography variant="body" sx={{ mb: 2, lineHeight: 1.75 }}>
          Primitive tokens name raw values directly. Semantic tokens layer meaning on top — a colour
          named "text.link" describes its purpose rather than its hex value. Components should always
          reference semantic tokens, not primitives, so they remain stable when the underlying palette changes.
        </MuiTypography>
        <Box component="ul" sx={{ m: 0, pl: 3, mb: 2, '& > li + li': { mt: 0.75 } }}>
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
          <Box component="a" href="#" sx={{ ...linkSx, fontSize: 'inherit' }}>Colors</Box>
          {' '}and{' '}
          <Box component="a" href="#" sx={{ ...linkSx, fontSize: 'inherit' }}>Primitives</Box>
          {' '}in Design Tokens for the full token reference.
        </MuiTypography>
      </Box>

      <Box sx={{ py: 3, display: 'flex', flexDirection: 'column' }}>
        <MuiTypography variant="small" sx={{ color: 'text.muted' }}>
          * Past performance is not a reliable indicator of future performance. This information has been prepared
          without taking into account your objectives, financial situation or needs. Before acting on this information,
          consider whether it is appropriate for your circumstances and read the relevant Product Disclosure Statement.
        </MuiTypography>
      </Box>
    </Box>
  )
}

const meta: Meta<typeof TypographyCompositionDoc> = {
  title: 'Design Tokens/Typography',
  component: TypographyCompositionDoc,
  parameters: {
    layout: 'fullscreen',
    docs: { canvas: { sourceState: 'hidden' } },
  },
}
export default meta

export const Composition: StoryObj<typeof TypographyCompositionDoc> = {
  render: () => <TypographyCompositionDoc />,
}
