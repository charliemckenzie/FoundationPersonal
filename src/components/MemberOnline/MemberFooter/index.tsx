'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { MemberFooterLink } from '../types';

export interface MemberFooterProps {
  links: MemberFooterLink[];
  /** Disclaimer / legal copy shown beneath the links. */
  disclaimer?: React.ReactNode;
}

export function MemberFooter({ links, disclaimer }: MemberFooterProps) {
  return (
    <Box
      component="footer"
      id="footer"
      tabIndex={-1}
      sx={(t) => ({
        px: { xs: 2, md: 3 },
        py: 3,
        backgroundColor: 'background.paper',
        borderTop: `1px solid ${t.palette.border.subtle}`,
        '&:focus': { outline: 'none' },
      })}
    >
      <Box component="nav" aria-label="Legal">
        <Box
          component="ul"
          role="list"
          className="link-hover-only"
          sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, listStyle: 'none', m: 0, p: 0, mb: disclaimer ? 1 : 0 }}
        >
          {links.map((link) => (
            <Box component="li" key={link.label}>
              <Box
                component="a"
                href={link.href}
                sx={{
                  typography: 'body',
                  fontWeight: 500,
                  color: 'text.primary',
                  borderRadius: '2px',
                  '&:hover': { color: 'primary.main' },
                  '&:focus-visible': {
                    outline: '2px solid',
                    outlineColor: 'border.focus',
                    outlineOffset: '2px',
                  },
                }}
              >
                {link.label}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
      {disclaimer !== undefined && (
        <Typography
          variant="small"
          sx={(t) => ({ '&&': { color: 'text.muted', fontSize: t.typography.small.fontSize, lineHeight: 1.43 }, mt: 1, m: 0 })}
        >
          {disclaimer}
        </Typography>
      )}
    </Box>
  );
}
