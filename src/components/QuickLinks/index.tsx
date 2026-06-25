import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Icon } from '../Icon';
import type { IconSize } from '../Icon';

export interface QuickLinkItem {
  label: string;
  href: string;
  description?: string;
  /** Font Awesome icon name (e.g., 'house', 'chart-line'). */
  icon: string;
}

export interface QuickLinksProps {
  /** Between 1 and 5 items. */
  items: QuickLinkItem[];
  iconSize?: IconSize;
  /** Accessible label for the nav landmark. Defaults to 'Quick actions'.
   *  Override when multiple navs appear on the same page. */
  'aria-label'?: string;
}

export function QuickLinks({
  items,
  iconSize = 'lg',
  'aria-label': ariaLabel = 'Quick actions',
}: QuickLinksProps) {
  const clamped = items.slice(0, 5);

  return (
    <Box
      component="nav"
      aria-label={ariaLabel}
      sx={{
        maxWidth: '70rem',
        mx: 'auto',
      }}
    >
      <Box
        component="ul"
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 2,
          m: 0,
          p: 0,
          listStyle: 'none',
        }}
      >
        {clamped.map((item) => (
          <Box
            key={item.href}
            component="li"
            sx={{
              flex: { xs: '1', md: `0 0 calc(20% - 1.6rem)` },
            }}
          >
            <Box
              component="a"
              href={item.href}
              sx={(t) => ({
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                p: { xs: 2, md: 3 },
                borderRadius: { xs: '1rem', md: '1.5rem' },
                border: '2px solid',
                borderColor: 'rgba(255, 255, 255, 0.2)',
                bgcolor: 'common.white',
                textDecoration: 'none',
                color: 'text.primary',
                position: 'relative',
                transition: t.transitions.create(['border-color', 'background-color'], {
                  duration: t.transitions.duration.short,
                }),
                '&:hover': {
                  borderColor: 'rgba(255, 255, 255, 1)',
                  '& .ql-icon-bg': {
                    bgcolor: '#1E5EF5',
                  },
                },
                '&:focus-visible': {
                  outline: `2px solid ${t.palette.border.focus}`,
                  outlineOffset: '2px',
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
                  width: { xs: '3.5rem', md: '4rem' },
                  height: { xs: '3.5rem', md: '4rem' },
                  borderRadius: '50%',
                  bgcolor: '#A7C9E8',
                  transition: t.transitions.create(['background-color'], {
                    duration: t.transitions.duration.short,
                  }),
                })}
              >
                <Icon
                  icon={item.icon}
                  size={iconSize}
                  color="inherit"
                  aria-hidden
                />
              </Box>

              {/* Heading */}
              <Typography
                variant={{ xs: 'h6', md: 'h5' }}
                component="h3"
                sx={{
                  textAlign: 'center',
                  color: 'text.primary',
                }}
              >
                {item.label}
              </Typography>

              {/* Description */}
              {item.description && (
                <Typography
                  variant="small"
                  sx={{
                    textAlign: 'center',
                    color: 'text.muted',
                  }}
                >
                  {item.description}
                </Typography>
              )}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
