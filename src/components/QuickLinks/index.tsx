import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { HeroIcon } from '../HeroIcon';
import type { HeroIconBrand, HeroIconSize } from '../HeroIcon';

export interface QuickLinkItem {
  label: string;
  href: string;
  /** Icon name matching the brand's hero icon set. */
  icon: string;
}

export interface QuickLinksProps {
  /** Between 3 and 6 items. */
  items: QuickLinkItem[];
  brand?: HeroIconBrand;
  iconSize?: HeroIconSize;
  /** href of the currently active item — renders the underline indicator and aria-current. */
  activeHref?: string;
  /** Accessible label for the nav landmark. Defaults to 'Section navigation'.
   *  Override when multiple navs appear on the same page. */
  'aria-label'?: string;
}

export function QuickLinks({
  items,
  brand = 'art',
  iconSize = 'md',
  activeHref,
  'aria-label': ariaLabel = 'Section navigation',
}: QuickLinksProps) {
  const clamped = items.slice(0, 6);

  return (
    <Box
      component="nav"
      aria-label={ariaLabel}
      sx={{
        borderBottom: '2px solid',
        borderColor: 'border.default',
        // Fade-out gradient on the right edge — scroll affordance on mobile
        position: 'relative',
        '&::after': {
          content: '""',
          display: { xs: 'block', sm: 'none' },
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          width: 48,
          background: (t) => `linear-gradient(to right, transparent, var(--QuickLinks-fadeBg, ${t.palette.background.paper}))`,
          pointerEvents: 'none',
        },
      }}
    >
      <Box
        component="ul"
        sx={{
          display: 'flex',
          // Mobile: scroll horizontally; desktop: center
          justifyContent: { xs: 'flex-start', sm: 'center' },
          overflowX: { xs: 'auto', sm: 'visible' },
          scrollSnapType: { xs: 'x mandatory', sm: 'none' },
          // Hide scrollbar visually but keep it functional
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
          // Cap item growth at the container width on wide viewports
          maxWidth: '1248px',
          width: '100%',
          mx: 'auto',
          my: 0,
          p: 0,
          listStyle: 'none',
        }}
      >
        {clamped.map((item) => {
          const isActive = item.href === activeHref;
          return (
            <Box
              key={item.href}
              component="li"
              sx={{
                display: 'flex',
                flex: { xs: '0 0 clamp(120px, 30vw, calc(100% / 6))', sm: '0 0 calc(100% / 6)' },
                scrollSnapAlign: { xs: 'start', sm: 'none' },
              }}
            >
              <Box
                component="a"
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                sx={(t) => ({
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  gap: 1.5,
                  px: 2,
                  pt: 2.5,
                  pb: 2,
                  width: '100%',
                  textDecoration: 'none',
                  textDecorationLine: 'none !important',
                  color: isActive ? 'primary.main' : 'text.muted',
                  position: 'relative',
                  transition: t.transitions.create(['color'], {
                    duration: t.transitions.duration.shortest,
                  }),
                  '& .ql-icon': {
                    filter: isActive ? 'none' : 'grayscale(1) opacity(0.5)',
                    transition: 'filter 150ms ease',
                  },
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: '-2px',
                    left: 0,
                    right: 0,
                    height: '3px',
                    bgcolor: 'primary.main',
                    borderRadius: '2px 2px 0 0',
                    opacity: isActive ? 1 : 0,
                    transition: 'opacity 150ms ease',
                  },
                  '&:hover': {
                    color: 'primary.main',
                    textDecoration: 'none',
                    '& .ql-icon': { filter: 'none' },
                    '&::after': { opacity: 1 },
                  },
                  '&:focus-visible': {
                    outline: `2px solid ${t.palette.border.focus}`,
                    outlineOffset: '2px',
                    borderRadius: 1,
                  },
                })}
              >
                <Box className="ql-icon">
                  <HeroIcon
                    name={item.icon}
                    brand={brand}
                    size={iconSize}
                    background="none"
                    aria-hidden
                  />
                </Box>
                <Typography
                  variant="small"
                  component="span"
                  sx={{
                    fontWeight: isActive ? 700 : 400,
                    color: 'inherit',
                    textAlign: 'center',
                  }}
                >
                  {item.label}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
