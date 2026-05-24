'use client'

import Box from '@mui/material/Box'
import { Icon } from '../Icon'

export interface SkipLink {
  label: string
  targetId: string
  icon?: string
}

export interface SkipLinksProps {
  links?: SkipLink[]
}

const DEFAULT_LINKS: SkipLink[] = [
  { label: 'Skip to main content', targetId: 'main-content', icon: 'house' },
  { label: 'Skip to navigation', targetId: 'main-nav', icon: 'bars' },
  { label: 'Skip to footer', targetId: 'footer', icon: 'arrow-down-to-line' },
]

export function SkipLinks({ links = DEFAULT_LINKS }: SkipLinksProps) {
  return (
    <Box
      component="nav"
      aria-label="Skip links"
      sx={{
        position: 'fixed',
        top: '2.5rem',
        left: '2.5rem',
        zIndex: (t) => t.zIndex.skipLink,
        display: 'flex',
        flexDirection: 'column',
        gap: 0.5,
        pointerEvents: 'none',
      }}
    >
      {links.map(({ label, targetId, icon }) => (
        <Box
          key={targetId}
          component="a"
          href={`#${targetId}`}
          sx={{
            display: 'flex',
            alignItems: 'center',
            minWidth: '19.6875rem',
            bgcolor: 'background.paper',
            color: 'primary.main',
            textDecoration: 'none !important',
            border: '2px solid',
            borderColor: 'primary.main',
            borderRadius: '0.5rem',
            fontWeight: 700,
            fontSize: '0.875rem',
            lineHeight: 1.5,
            overflow: 'hidden',
            // Hidden off the left edge of the viewport by default
            pointerEvents: 'none',
            transform: 'translateX(calc(-100% - 3rem))',
            transition: 'transform 0.15s ease',
            '&:focus': {
              pointerEvents: 'auto',
              transform: 'translateX(0)',
              outline: '3px solid',
              outlineColor: 'border.focus',
              outlineOffset: '3px',
            },
          }}
        >
          {icon ? (
            <Box
              aria-hidden="true"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                px: 2,
                py: 2.5,
                borderRight: '1px solid',
                borderColor: 'divider',
                color: 'primary.main',
              }}
            >
              <Icon icon={icon} size="xl" />
            </Box>
          ) : null}

          <Box sx={{ flex: 1, px: 2 }}>
            {label}
          </Box>

          <Box
            aria-hidden="true"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              pr: 1.5,
              fontSize: '0.6875rem',
              color: 'text.muted',
              lineHeight: 1.2,
              userSelect: 'none',
            }}
          >
            <Box component="span" sx={{ fontSize: '1rem', lineHeight: 1 }}>↩</Box>
            <Box component="span">ENTER</Box>
          </Box>
        </Box>
      ))}
    </Box>
  )
}
