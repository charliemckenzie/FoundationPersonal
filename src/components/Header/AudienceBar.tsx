'use client'

import Box from '@mui/material/Box'
import type { AudienceLink, ResourceLink } from './types'

export interface AudienceBarProps {
  audienceLinks?: AudienceLink[]
  resourceLinks?: ResourceLink[]
  activeHref?: string
}

export function AudienceBar({ audienceLinks, resourceLinks, activeHref }: AudienceBarProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'space-between',
      }}
    >
      {/* Audience section links — e.g. Personal / Employers / Advisers */}
      {/* No dividers. Active tab has a top border flush with the browser edge. */}
      <Box component="nav" aria-label="Audience navigation" sx={{ display: 'flex', alignItems: 'stretch', gap: '15px', fontFamily: 'var(--font-open-sans), "Open Sans", system-ui, sans-serif' }}>
        {audienceLinks?.map((link) => (
          <Box
            key={link.href}
            component="a"
            href={link.href}
            aria-current={activeHref === link.href ? 'page' : undefined}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              typography: 'caption',
              fontWeight: 400,
              color: activeHref === link.href ? 'primary.main' : 'text.muted',
              textDecoration: 'none !important',
              px: 0,
              pt: '15px',
              pb: '15px',
              borderTop: '2px solid',
              borderColor: activeHref === link.href ? 'primary.main' : 'transparent',
              '&:hover': { color: 'text.muted', borderColor: 'primary.main' },
              '&:focus-visible': { outline: '2px solid', outlineColor: 'border.focus', outlineOffset: '2px' },
              '&:focus': { outline: 'none' },
            }}
          >
            {link.label}
          </Box>
        ))}
      </Box>

      {/* Resource links — e.g. Calculators & forms / News Hub / Contact us */}
      <Box component="nav" aria-label="Resource links" sx={{ display: 'flex', alignItems: 'center', gap: 2.5, fontFamily: 'var(--font-open-sans), "Open Sans", system-ui, sans-serif' }}>
        {resourceLinks?.map((link) => (
          <Box
            key={link.href}
            component="a"
            href={link.href}
            sx={{
              typography: 'caption',
              color: 'text.secondary',
              textDecoration: 'none !important',
              '&:hover': { color: 'primary.main' },
              '&:focus-visible': { outline: '2px solid', outlineColor: 'border.focus', outlineOffset: '2px' },
              '&:focus': { outline: 'none' },
            }}
          >
            {link.label}
          </Box>
        ))}
      </Box>
    </Box>
  )
}
