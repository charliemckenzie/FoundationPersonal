import type { ReactNode } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import type { TypographyProps } from '@mui/material/Typography';
import { ModeToggle } from './ModeToggle';

// ─── Sample copy ──────────────────────────────────────────────────────────────

const SAMPLE_SHORT = 'The quick brown fox';
const SAMPLE_LONG  = 'The quick brown fox jumps over the lazy dog.';
const SAMPLE_BODY  =
  'The quick brown fox jumps over the lazy dog. Body copy exists to be read — legibility at scale determines whether a design system earns trust. Confirm line-height and word spacing at a comfortable reading width.';

// ─── Data ─────────────────────────────────────────────────────────────────────

interface VariantMeta {
  variant:    NonNullable<TypographyProps['variant']>;
  fontFamily: string;
  size:       string;
  weight:     string;
  lineHeight: string;
  storybook:  boolean;
  warning?:   string;
}

const DISPLAY_VARIANTS: VariantMeta[] = [
  { variant: 'display-1', fontFamily: 'Merriweather', size: '2.5→5rem',     weight: '700', lineHeight: '1.2', storybook: true },
  { variant: 'display-2', fontFamily: 'Merriweather', size: '2.25→4.5rem',  weight: '700', lineHeight: '1.2', storybook: true },
  { variant: 'display-3', fontFamily: 'Merriweather', size: '2→4rem',       weight: '700', lineHeight: '1.2', storybook: true },
  { variant: 'display-4', fontFamily: 'Merriweather', size: '1.875→3.5rem', weight: '700', lineHeight: '1.2', storybook: true },
  { variant: 'display-5', fontFamily: 'Merriweather', size: '1.75→3rem',    weight: '700', lineHeight: '1.2', storybook: true },
];

const HEADING_VARIANTS: VariantMeta[] = [
  { variant: 'h1', fontFamily: 'Merriweather', size: '1.75→2.5rem', weight: '700', lineHeight: '1.2', storybook: true },
  { variant: 'h2', fontFamily: 'Merriweather', size: '1.5→2rem',    weight: '700', lineHeight: '1.2', storybook: true },
  { variant: 'h3', fontFamily: 'Merriweather', size: '1.75rem', weight: '700', lineHeight: '1.2', storybook: true },
  { variant: 'h4', fontFamily: 'Noto Sans',    size: '1.5rem',  weight: '700', lineHeight: '1.2', storybook: true, warning: 'Font family switches to Noto Sans here' },
  { variant: 'h5', fontFamily: 'Noto Sans',    size: '1.25rem', weight: '700', lineHeight: '1.2', storybook: true },
  { variant: 'h6', fontFamily: 'Noto Sans',    size: '1rem',    weight: '700', lineHeight: '1.2', storybook: true },
];

const BODY_VARIANTS: VariantMeta[] = [
  { variant: 'lead',    fontFamily: 'Noto Sans', size: '1.25rem',   weight: '300→400', lineHeight: '1.6', storybook: true, warning: 'w300 desktop · w400 mobile (<md)' },
  { variant: 'body',    fontFamily: 'Noto Sans', size: '1rem',      weight: '400', lineHeight: '1.5', storybook: true },
  { variant: 'small',   fontFamily: 'Noto Sans', size: '0.875rem',  weight: '400', lineHeight: '1.5', storybook: true },
  { variant: 'caption', fontFamily: 'Noto Sans', size: '0.75rem',   weight: '400', lineHeight: '1.5', storybook: true },
];

const ALL_VARIANTS = [...DISPLAY_VARIANTS, ...HEADING_VARIANTS, ...BODY_VARIANTS];

interface ColourRow {
  token:       string;
  description: string;
  darkBg?:     boolean;
}

const TEXT_COLOUR_TOKENS: ColourRow[] = [
  { token: 'text.heading',  description: 'display, h1–h6' },
  { token: 'text.primary',  description: 'body copy' },
  { token: 'text.muted',    description: 'secondary / metadata' },
  { token: 'text.disabled', description: 'inactive controls' },
  { token: 'text.link',     description: 'anchor rest state' },
  { token: 'text.inverse',  description: 'on brand surfaces', darkBg: true },
];

const DISABLED_VARIANTS = ['body1', 'body2', 'subtitle1', 'subtitle2', 'button', 'overline'];

const SYSTEM_NOTES = [
  {
    severity: 'info' as const,
    title:    'No letterSpacing defined on any variant',
    detail:   "Not a single variant sets letterSpacing explicitly. MUI's internal defaults (which vary per variant) will apply. For a bespoke type scale, being explicit is recommended.",
  },

  {
    severity: 'info' as const,
    title:    'Font family switches at h3 → h4',
    detail:   'h1–h3 and all display-* use Merriweather (serif). h4–h6 switch to Noto Sans (sans-serif). This is atypical — most systems maintain the serif heading font to at least h4. Confirm the split is intentional.',
  },
];

// ─── Helper components ────────────────────────────────────────────────────────

function SectionLabel({ id, children }: { id: string; children: ReactNode }) {
  return (
    <Box id={id} sx={{ mt: 8, scrollMarginTop: '72px' }}>
      <Typography
        variant="small"
        sx={{ color: 'text.muted', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}
      >
        {children}
      </Typography>
      <Divider sx={{ mt: 1.5, mb: 4 }} />
    </Box>
  );
}

function Tag({ children, warning = false }: { children: ReactNode; warning?: boolean }) {
  return (
    <Box
      component="span"
      sx={{
        display:    'inline-flex',
        alignItems: 'center',
        px:         0.75,
        py:         0.125,
        borderRadius: '3px',
        fontSize:   '0.6875rem',
        fontFamily: '"Noto Sans Mono", monospace',
        fontWeight: 500,
        lineHeight: 1.5,
        bgcolor:    warning ? 'warning.main' : 'action.selected',
        color:      warning ? 'warning.contrastText' : 'text.secondary',
        mr:         0.5,
        mb:         0.5,
        flexShrink: 0,
      }}
    >
      {children}
    </Box>
  );
}

function VariantPreview({ meta, sample }: { meta: VariantMeta; sample: string }) {
  return (
    <Box sx={{ mb: 5, pb: 4, borderBottom: '1px solid', borderColor: 'divider' }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 0.5, mb: 1.5, flexWrap: 'wrap' }}>
        <Tag>{meta.variant}</Tag>
        <Tag>{meta.size}</Tag>
        <Tag>w{meta.weight}</Tag>
        <Tag>lh {meta.lineHeight}</Tag>
        <Tag>{meta.fontFamily}</Tag>
        {!meta.storybook && <Tag warning>⚠ no story</Tag>}
        {meta.warning && <Tag warning>{meta.warning}</Tag>}
      </Box>
      <Typography variant={meta.variant}>{sample}</Typography>
    </Box>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TypographyTestPage() {
  const jumpLinks: [string, string][] = [
    ['#display',  'Display'],
    ['#headings', 'Headings'],
    ['#body',     'Body'],
    ['#colours',  'Colour roles'],
    ['#coverage', 'Coverage'],
    ['#notes',    'Notes'],
    ['#disabled', 'Disabled'],
  ];

  return (
    <Box sx={{ maxWidth: '860px', mx: 'auto', px: { xs: 3, md: 6 }, py: 6 }}>
      <ModeToggle />

      {/* ── Page header ── */}
      <Typography variant="small" sx={{ color: 'text.muted', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>
        dev only · /typography-test
      </Typography>
      <Typography variant="display-4" sx={{ mt: 1, mb: 2 }}>
        Typography Kitchen Sink
      </Typography>
      <Typography variant="lead" color="text.muted">
        Every active variant rendered live from the current theme. Use this page to verify font loading,
        scale, and visual consistency — then cross-reference with Storybook.
      </Typography>

      {/* Jump links */}
      <Box
        sx={{
          display:      'flex',
          gap:          2,
          mt:           3,
          mb:           6,
          pb:           4,
          flexWrap:     'wrap',
          borderBottom: '2px solid',
          borderColor:  'divider',
        }}
      >
        {jumpLinks.map(([href, label]) => (
          <Typography
            key={href}
            component="a"
            href={href}
            variant="small"
            sx={{ color: 'text.link', textDecoration: 'none', fontWeight: 600, '&:hover': { textDecoration: 'underline' } }}
          >
            {label}
          </Typography>
        ))}
      </Box>

      {/* ── Display variants ── */}
      <SectionLabel id="display">Display — Custom (Merriweather 700)</SectionLabel>
      {DISPLAY_VARIANTS.map((meta) => (
        <VariantPreview key={meta.variant} meta={meta} sample={SAMPLE_SHORT} />
      ))}

      {/* ── Heading variants ── */}
      <SectionLabel id="headings">Headings — h1–h6 (mixed font families)</SectionLabel>
      {HEADING_VARIANTS.map((meta) => (
        <VariantPreview key={meta.variant} meta={meta} sample={SAMPLE_LONG} />
      ))}

      {/* ── Body variants ── */}
      <SectionLabel id="body">Body — Custom body variants</SectionLabel>
      {BODY_VARIANTS.map((meta) => (
        <VariantPreview
          key={meta.variant}
          meta={meta}
          sample={meta.variant === 'caption' ? SAMPLE_LONG : SAMPLE_BODY}
        />
      ))}

      {/* ── Colour roles ── */}
      <SectionLabel id="colours">Text colour tokens</SectionLabel>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {TEXT_COLOUR_TOKENS.map(({ token, description, darkBg }) => (
          <Box
            key={token}
            sx={{
              display:      'flex',
              alignItems:   'flex-start',
              gap:          3,
              py:           2.5,
              px:           darkBg ? 2 : 0,
              borderBottom: '1px solid',
              borderColor:  'divider',
              bgcolor:      darkBg ? 'secondary.main' : 'transparent',
              borderRadius: darkBg ? 1 : 0,
            }}
          >
            <Box sx={{ minWidth: '150px', flexShrink: 0 }}>
              <Tag>{token}</Tag>
              <Typography
                variant="caption"
                sx={{ display: 'block', mt: 0.5, color: darkBg ? 'text.inverse' : 'text.muted' }}
              >
                {description}
              </Typography>
            </Box>
            <Typography variant="body" color={token}>
              The quick brown fox jumps over the lazy dog.
            </Typography>
          </Box>
        ))}
      </Box>

      {/* ── Coverage status ── */}
      <SectionLabel id="coverage">Storybook coverage status</SectionLabel>
      <Box>
        <Box
          sx={{
            display:             'grid',
            gridTemplateColumns: '180px 1fr 140px',
            gap:                 2,
            py:                  1,
            borderBottom:        '2px solid',
            borderColor:         'divider',
          }}
        >
          {['Variant', 'Notes', 'Story coverage'].map((h) => (
            <Typography key={h} variant="small" sx={{ fontWeight: 700 }}>
              {h}
            </Typography>
          ))}
        </Box>

        {ALL_VARIANTS.map((meta) => (
          <Box
            key={meta.variant}
            sx={{
              display:             'grid',
              gridTemplateColumns: '180px 1fr 140px',
              gap:                 2,
              py:                  1.5,
              borderBottom:        '1px solid',
              borderColor:         'divider',
              alignItems:          'center',
            }}
          >
            <Typography variant="small" sx={{ fontFamily: '"Noto Sans Mono", monospace', fontWeight: 600 }}>
              {meta.variant}
            </Typography>
            <Typography variant="small" color="text.muted">
              {meta.warning ?? '—'}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  width:       '8px',
                  height:      '8px',
                  borderRadius: '50%',
                  bgcolor:     meta.storybook ? 'success.main' : 'warning.main',
                  flexShrink:  0,
                }}
              />
              <Typography
                variant="small"
                sx={{ color: meta.storybook ? 'success.main' : 'warning.main', fontWeight: 600 }}
              >
                {meta.storybook ? 'Covered' : 'Missing'}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {/* ── System notes ── */}
      <SectionLabel id="notes">System notes &amp; gaps</SectionLabel>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {SYSTEM_NOTES.map(({ severity, title, detail }) => (
          <Alert key={title} severity={severity}>
            <strong>{title}.</strong> {detail}
          </Alert>
        ))}
      </Box>

      {/* ── Disabled variants ── */}
      <SectionLabel id="disabled">Disabled MUI built-in variants</SectionLabel>
      <Typography variant="body" color="text.muted" sx={{ mb: 2 }}>
        These are explicitly disabled in{' '}
        <Box
          component="code"
          sx={{ fontFamily: '"Noto Sans Mono", monospace', fontSize: '0.875em', bgcolor: 'grey.100', px: 0.5, borderRadius: '3px' }}
        >
          src/types/mui.d.ts
        </Box>
        . TypeScript will error if any are used.
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        {DISABLED_VARIANTS.map((v) => (
          <Tag key={v} warning>{v}</Tag>
        ))}
      </Box>
      <Typography variant="caption" color="text.muted" sx={{ display: 'block', mt: 2 }}>
        Replacements: body1 → body · body2 → small · subtitle → lead · button → body · overline → small with custom styles
      </Typography>

    </Box>
  );
}
