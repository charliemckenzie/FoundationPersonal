'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
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
        py: 2,
        backgroundColor: t.palette.background.paper,
        borderTop: `1px solid ${t.palette.border.subtle}`,
      })}
    >
      <Box
        component="nav"
        aria-label="Legal"
        sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: 1.5, md: 3 }, mb: disclaimer ? 1 : 0 }}
      >
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            underline="none"
            sx={{
              fontSize: '0.9375rem',
              color: 'text.primary',
              fontWeight: 500,
              '&:hover': { color: 'primary.main', textDecoration: 'underline' },
            }}
          >
            {link.label}
          </Link>
        ))}
      </Box>
      {disclaimer !== undefined && (
        <Typography
          variant="small"
          sx={{ color: 'text.muted', fontSize: '0.8125rem', mt: 1, m: 0 }}
        >
          {disclaimer}
        </Typography>
      )}
    </Box>
  );
}
