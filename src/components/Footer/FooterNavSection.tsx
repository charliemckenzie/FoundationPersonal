'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Icon } from '../Icon';
import type { FooterNavSection as FooterNavSectionData } from './footerData';

const linkSx = {
  color: 'text.primary',
  textDecoration: 'none',
  fontSize: '0.875rem',
  lineHeight: 1.5,
  '&:hover': { textDecoration: 'underline' },
} as const;

function LinkList({ links }: { links: FooterNavSectionData['links'] }) {
  return (
    <Box
      component="ul"
      className="link-hover-only"
      sx={{ listStyle: 'none', m: 0, p: 0, display: 'flex', flexDirection: 'column', gap: 1 }}
    >
      {links.map((link) => (
        <Box component="li" key={link.label}>
          <Box component="a" href={link.href} sx={linkSx}>
            {link.label}
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export function FooterNavSection({ title, links }: FooterNavSectionData) {
  const theme = useTheme();
  const isCollapsed = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = useState(false);

  if (!isCollapsed) {
    return (
      <Box component="nav" aria-label={title}>
        <Box
          component="p"
          sx={{
            fontWeight: 700,
            color: 'text.heading',
            fontSize: '1rem',
            lineHeight: 1.5,
            m: 0,
            mb: 1.5,
          }}
        >
          {title}
        </Box>
        <LinkList links={links} />
      </Box>
    );
  }

  // Mobile/tablet: unique footer-only accordion — not the shared Accordion component
  return (
    <Box component="nav" aria-label={title}>
      <Divider />
      <Box
        component="button"
        onClick={() => setOpen((p) => !p)}
        aria-expanded={open}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          py: 2,
          px: 0,
          textAlign: 'left',
        }}
      >
        <Box
          component="span"
          sx={{ fontWeight: 700, color: 'text.heading', fontSize: '1rem', lineHeight: 1.5 }}
        >
          {title}
        </Box>
        <Box component="span" sx={{ flexShrink: 0, ml: 2, display: 'flex', alignItems: 'center' }}>
          <Icon icon={open ? 'chevron-up' : 'chevron-down'} size="sm" color="text.primary" />
        </Box>
      </Box>
      <Collapse in={open}>
        <Box sx={{ pb: 2 }}>
          <LinkList links={links} />
        </Box>
      </Collapse>
    </Box>
  );
}
