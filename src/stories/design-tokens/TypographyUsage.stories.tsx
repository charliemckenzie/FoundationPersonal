import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import Box from '@mui/material/Box'
import MuiTypography from '@mui/material/Typography'

// Recommended margin-bottom values per variant.
// These are not enforced by the theme — they are the documented convention.
// Apply via sx={{ mb: X }} at the call site.
const SPACING_SCALE = [
  { variant: 'display-1', mb: 2,   mbPx: '16px' },
  { variant: 'display-2', mb: 2,   mbPx: '16px' },
  { variant: 'display-3', mb: 2,   mbPx: '16px' },
  { variant: 'display-4', mb: 2,   mbPx: '16px' },
  { variant: 'display-5', mb: 2,   mbPx: '16px' },
  { variant: 'display-6', mb: 2,   mbPx: '16px' },
  { variant: 'h1',        mb: 1.5, mbPx: '12px' },
  { variant: 'h2',        mb: 1.5, mbPx: '12px' },
  { variant: 'h3',        mb: 1,   mbPx: '8px'  },
  { variant: 'h4',        mb: 1,   mbPx: '8px'  },
  { variant: 'h5',        mb: 1,   mbPx: '8px'  },
  { variant: 'h6',        mb: 0.5, mbPx: '4px'  },
  { variant: 'lead',      mb: 2.5, mbPx: '20px' },
  { variant: 'body',      mb: 2,   mbPx: '16px' },
  { variant: 'small',     mb: 1.5, mbPx: '12px' },
  { variant: 'caption',   mb: 1,   mbPx: '8px'  },
] as const

function SpacingTable() {
  return (
    <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, overflow: 'hidden', mb: 4 }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '120px 140px',
          gap: 2,
          px: 2,
          py: 1.5,
          backgroundColor: 'action.hover',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <MuiTypography variant="small" sx={{ fontWeight: 600, mb: 0 }}>Variant</MuiTypography>
        <MuiTypography variant="small" sx={{ fontWeight: 600, mb: 0 }}>Recommended mb</MuiTypography>
      </Box>
      {SPACING_SCALE.map(({ variant, mb, mbPx }, i) => (
        <Box
          key={variant}
          sx={{
            display: 'grid',
            gridTemplateColumns: '120px 140px',
            gap: 2,
            px: 2,
            py: 1.5,
            borderBottom: i < SPACING_SCALE.length - 1 ? '1px solid' : 'none',
            borderColor: 'divider',
          }}
        >
          <Box component="span" sx={{ fontFamily: 'monospace', fontSize: '0.8rem', color: 'primary.main', lineHeight: 1.5 }}>
            {variant}
          </Box>
          <MuiTypography variant="small" sx={{ mb: 0 }}>
            <Box component="span" sx={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>mb={mb}</Box>
            {' '}
            <Box component="span" sx={{ color: 'text.muted' }}>({mbPx})</Box>
          </MuiTypography>
        </Box>
      ))}
    </Box>
  )
}

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
      <MuiTypography variant="h6" color="text.heading" sx={{ mb: 1 }}>Headings</MuiTypography>
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
      <MuiTypography variant="h6" color="text.heading" sx={{ mt: 5, mb: 1 }}>Paragraphs</MuiTypography>
      <MuiTypography variant="small" color="text.muted" sx={{ mb: 2, display: 'block' }}>
        Three paragraph roles. Use lead for introductory copy, body for general prose, small for supporting or meta text.
        Body defaults to a 24px (1.5) line height — compact and suitable for UI copy. For longer reading passages, apply{' '}
        <Box component="code" sx={{ fontFamily: 'monospace', fontSize: '0.8em' }}>{'sx={{ lineHeight: 1.75 }}'}</Box>{' '}
        to increase line height to 28px.
      </MuiTypography>

      <Section label="Introductory paragraph" token="lead">
        <MuiTypography variant="lead">
          Design systems accelerate product development by providing a shared language between design and engineering.
          They reduce decision fatigue and improve consistency across surfaces.
        </MuiTypography>
      </Section>

      <Section label="General prose" token="body · lineHeight 1.5 (default)">
        <MuiTypography variant="body">
          Use the body variant for the majority of readable content — article text, descriptions, form instructions,
          and interface copy. It is optimised for line length and reading comfort at normal screen distances.
          Aim for lines between 60 and 80 characters where possible.
        </MuiTypography>
      </Section>

      <Section label="Long-form / content blocks" token="body · lineHeight 1.75">
        <MuiTypography variant="body" sx={{ lineHeight: 1.75 }}>
          For longer reading passages — editorial articles, help content, onboarding explanations — increase line height
          to 1.75 (28px). This improves readability for multi-paragraph text by giving each line more breathing room.
          Apply it with <Box component="code" sx={{ fontFamily: 'monospace', fontSize: '0.8em' }}>{'sx={{ lineHeight: 1.75 }}'}</Box>{' '}
          directly on the Typography component. The base font size remains 16px; only the line height changes.
        </MuiTypography>
      </Section>

      <Section label="Supporting / meta text" token="small · text.secondary">
        <MuiTypography variant="small" color="text.secondary">
          Last updated 12 April 2026 · 4 min read · Tagged under Design Systems, Typography
        </MuiTypography>
      </Section>

      <Section label="Footnote" token="small · text.muted">
        <MuiTypography variant="small" color="text.muted">
          Past performance is not a reliable indicator of future performance. This information is general in nature
          and does not take into account your personal financial situation or needs.
        </MuiTypography>
      </Section>

      <Section label="Helper / metadata text" token="caption · text.muted">
        <MuiTypography variant="caption" color="text.muted">
          Last updated 14 May 2026 · File size 2.4 MB · PDF format
        </MuiTypography>
      </Section>

      <Section label="Form field helper text" token="caption · text.secondary">
        <MuiTypography variant="caption" color="text.secondary">
          Must be at least 8 characters and include one number.
        </MuiTypography>
      </Section>

      {/* Inline links */}
      <MuiTypography variant="h6" color="text.heading" sx={{ mt: 5, mb: 1 }}>Inline Links</MuiTypography>
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
      <MuiTypography variant="h6" color="text.heading" sx={{ mt: 5, mb: 1 }}>Lists</MuiTypography>
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

      {/* Spacing */}
      <MuiTypography variant="h6" color="text.heading" sx={{ mt: 5, mb: 1 }}>Spacing</MuiTypography>
      <MuiTypography variant="small" color="text.muted" sx={{ mb: 2, display: 'block' }}>
        Recommended <Box component="code" sx={{ fontFamily: 'monospace', fontSize: '0.8em' }}>mb</Box> values
        per variant. Override with <Box component="code" sx={{ fontFamily: 'monospace', fontSize: '0.8em' }}>{'sx={{ mb: 0 }}'}</Box> inside
        components that manage their own spacing — cards, list items, form labels, table cells.
      </MuiTypography>
      <SpacingTable />
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
