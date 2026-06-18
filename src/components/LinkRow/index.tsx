import ButtonBase from '@mui/material/ButtonBase';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Icon } from '../Icon';
import type { IconStyle } from '../Icon';
import type { SxProps, Theme } from '@mui/material/styles';
import type React from 'react';

export interface LinkRowProps {
  /** Primary label — rendered as a styled link. */
  label: string;
  /** Supporting description below the label. */
  description?: React.ReactNode;
  /** FontAwesome icon name (e.g. 'chart-line', 'cursor'). */
  icon: string;
  /** FontAwesome icon style. Defaults to 'regular'. */
  iconStyle?: IconStyle;
  /** When set, the row renders as a native <a> element. */
  href?: string;
  /** Called on click when no href is provided (button mode). */
  onClick?: React.MouseEventHandler<HTMLElement>;
  /** Additional sx overrides for the root element. */
  sx?: SxProps<Theme>;
}

export function LinkRow({
  label,
  description,
  icon,
  iconStyle = 'light',
  href,
  onClick,
  sx: sxProp,
}: LinkRowProps) {
  const linkProps = href
    ? ({ component: 'a' as const, href } as object)
    : ({ component: 'button' as const, onClick } as object);

  return (
    <ButtonBase
      {...linkProps}
      disableRipple
      className="link-no-underline"
      sx={[
        {
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          width: '100%',
          textAlign: 'left',
          textDecoration: 'none',
          px: 3,
          py: 2.5,
          border: '1px solid',
          borderColor: 'border.default',
          borderRadius: (t) => `${(t.shape as { lg: number }).lg}px`,
          bgcolor: 'background.paper',
          transition: (t) =>
            t.transitions.create(['background-color', 'border-color'], {
              duration: t.transitions.duration.short,
            }),
          '&:hover': {
            bgcolor: 'action.hover',
            borderColor: 'border.input',
            '& .link-row-label': {
              color: 'primary.dark',
            },
            '& .link-row-arrow': {
              transform: 'translateX(4px)',
            },
          },
          // WCAG 2.4.11 Focus Appearance — 2px solid ring, ≥2px offset
          '&:focus-visible': {
            outline: '2px solid',
            outlineColor: 'border.focus',
            outlineOffset: '2px',
          },
        },
        ...(Array.isArray(sxProp) ? sxProp : sxProp ? [sxProp] : []),
      ]}
    >
      {/* Decorative icon container — aria-hidden via Icon's default behaviour */}
      <Box
        sx={{
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '3rem',
          height: '3rem',
          borderRadius: '50%',
          bgcolor: 'primary.softMain',
        }}
      >
        <Icon icon={icon} style={iconStyle} size="xl" color="primary" />
      </Box>

      {/* Text content — accessible name is derived from this text */}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          variant="h6"
          component="span"
          className="link-row-label"
          sx={{
            display: 'block',
            color: 'primary.main',
            transition: (t) => t.transitions.create(['color'], { duration: t.transitions.duration.short }),
          }}
        >
          {label}
        </Typography>
        {description && (
          <Typography
            variant="small"
            component="span"
            sx={{ display: 'block', color: 'text.primary' }}
          >
            {description}
          </Typography>
        )}
      </Box>

      {/* Trailing arrow — decorative, animates on hover */}
      <Box
        className="link-row-arrow"
        sx={{
          flexShrink: 0,
          display: 'flex',
          transition: (t) =>
            t.transitions.create(['transform'], {
              duration: t.transitions.duration.short,
            }),
        }}
      >
        <Icon icon="arrow-right" style="regular" size="lg" color="text.primary" />
      </Box>
    </ButtonBase>
  );
}
