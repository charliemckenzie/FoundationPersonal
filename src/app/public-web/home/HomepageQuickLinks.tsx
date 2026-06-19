'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Icon } from '../../../components/Icon';

export interface QuickLinkItem {
  label: string;
  href: string;
  description: string;
  icon: string;
}

interface HomepageQuickLinksProps {
  items: QuickLinkItem[];
}

export function HomepageQuickLinks({ items }: HomepageQuickLinksProps) {
  const clamped = items.slice(0, 5);

  return (
    <Box
      component="nav"
      aria-label="Quick actions"
      sx={{
        width: '100%',
      }}
    >
      <Box
        component="ul"
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(5, minmax(0, 1fr))' },
          gap: { xs: 1.5, md: 3 },
          m: 0,
          p: 0,
          listStyle: 'none',
        }}
      >
        {clamped.map((item) => (
          <Box
            key={item.href}
            component="li"
            sx={{ minWidth: 0, display: 'flex' }}
          >
            <Box
              component="a"
              href={item.href}
              sx={(t) => ({
                display: 'flex',
                flexDirection: { xs: 'row', md: 'column' },
                alignItems: { xs: 'center', md: 'flex-start' },
                gap: { xs: 1.5, md: 2 },
                p: { xs: 2, md: 3, lg: 4 },
                width: '100%',
                height: '100%',
                borderRadius: { xs: '1rem', md: '2rem' },
                border: '2px solid',
                borderColor: 'primary.main',
                bgcolor: 'grey.50',
                textDecoration: 'none',
                color: 'text.primary',
                position: 'relative',
                '&, & *': {
                  textDecoration: 'none !important',
                  borderBottom: 'none !important',
                  backgroundImage: 'none !important',
                },
                transition: t.transitions.create(['border-color'], {
                  duration: t.transitions.duration.short,
                }),
                '&::before': {
                  content: '""',
                  display: { xs: 'none', md: 'block' },
                  position: 'absolute',
                  inset: '-0.5rem',
                  borderRadius: { xs: '1.75rem', md: '2.25rem' },
                  border: '4px solid',
                  borderColor: 'primary.light',
                  transition: t.transitions.create(['border-color'], {
                    duration: t.transitions.duration.short,
                  }),
                  pointerEvents: 'none',
                },
                '@media (hover: hover) and (pointer: fine)': {
                  '&:hover': {
                    textDecoration: 'none',
                    '&::before': {
                      borderColor: 'common.white',
                    },
                    '& .ql-icon-bg': {
                      bgcolor: 'primary.main',
                      color: 'common.white',
                    },
                  },
                },
                '&:active': {
                  '&::before': {
                    borderColor: 'common.white',
                  },
                  '& .ql-icon-bg': {
                    bgcolor: 'primary.main',
                    color: 'common.white',
                  },
                },
                '&:focus-visible': {
                  outline: `2px solid ${t.palette.border.focus}`,
                  outlineOffset: '3px',
                },
              })}
            >
              {/* Icon background circle */}
              <Box
                className="ql-icon-bg"
                sx={(t) => ({
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: { xs: '3rem', md: '3.5rem' },
                  height: { xs: '3rem', md: '3.5rem' },
                  minWidth: { xs: '3rem', md: '3.5rem' },
                  minHeight: { xs: '3rem', md: '3.5rem' },
                  maxWidth: { xs: '3rem', md: '3.5rem' },
                  maxHeight: { xs: '3rem', md: '3.5rem' },
                  flexShrink: 0,
                  aspectRatio: '1 / 1',
                  fontSize: { xs: '1.5rem', md: '1.625rem' },
                  borderRadius: '50%',
                  bgcolor: 'background.tintCool',
                  color: 'secondary.main',
                  transition: t.transitions.create(['background-color', 'color'], {
                    duration: t.transitions.duration.short,
                  }),
                })}
              >
                <Icon
                  icon={item.icon}
                  style="regular"
                  size="inherit"
                  color="inherit"
                  aria-hidden
                />
              </Box>

              {/* Heading */}
              <Typography
                variant="h6"
                component="h3"
                sx={(t) => ({
                  textAlign: 'left',
                  color: 'text.primary',
                  lineHeight: 1.2,
                  textDecoration: 'none !important',
                  borderBottom: 'none !important',
                  mb: 0,
                  [t.breakpoints.up('md')]: {
                    ...t.typography.h5,
                  },
                })}
              >
                {item.label}
              </Typography>

              {/* Description */}
              <Typography
                variant="small"
                sx={{
                  display: { xs: 'none', md: 'block' },
                  textAlign: 'left',
                  color: 'text.muted',
                  lineHeight: 1.35,
                  textDecoration: 'none !important',
                  borderBottom: 'none !important',
                }}
              >
                {item.description}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
