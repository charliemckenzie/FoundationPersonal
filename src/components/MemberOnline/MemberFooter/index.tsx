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
      sx={(t) => ({
        px: { xs: 2, md: 3 },
        py: 3,
        backgroundColor: t.palette.background.paper,
        borderTop: `1px solid ${t.palette.border.subtle}`,
      })}
    >
      <Box
        component="nav"
        aria-label="Legal"
        className="link-hover-only"
        sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: disclaimer ? 1 : 0 }}
      >
        {links.map((link) => (
          <Box
            key={link.label}
            component="a"
            href={link.href}
            sx={{
              fontSize: '1rem',
              lineHeight: 1.5,
              fontWeight: 500,
              color: 'text.primary',
              '&:hover': { color: 'primary.main' },
            }}
          >
            {link.label}
          </Box>
        ))}
      </Box>
      {disclaimer !== undefined && (
        <Typography
          variant="small"
          sx={{ '&&': { color: 'text.muted', fontSize: '0.875rem', lineHeight: 1.43 }, mt: 1, m: 0 }}
        >
          {disclaimer}
        </Typography>
      )}
    </Box>
  );
}
