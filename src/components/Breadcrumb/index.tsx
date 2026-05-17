import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import MuiLink from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import type React from 'react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  maxItems?: number;
  'aria-label'?: string;
}

export function Breadcrumb({
  items,
  separator = '/',
  maxItems = 8,
  'aria-label': ariaLabel = 'breadcrumb',
}: BreadcrumbProps) {
  return (
    <MuiBreadcrumbs
      separator={separator}
      maxItems={maxItems}
      aria-label={ariaLabel}
      sx={{
        '& .MuiBreadcrumbs-separator': {
          color: 'text.muted',
        },
        '& .MuiBreadcrumbs-ol': {
          flexWrap: 'nowrap',
          alignItems: 'center',
        },
      }}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        if (isLast) {
          return (
            <Typography
              key={item.label}
              variant="small"
              component="span"
              sx={{ color: 'text.primary', fontWeight: 500 }}
              aria-current="page"
            >
              {item.label}
            </Typography>
          );
        }

        return (
          <MuiLink
            key={item.label}
            href={item.href ?? '#'}
            underline="hover"
            variant="small"
            sx={{
              color: 'text.link',
              fontWeight: 400,
              '&:hover': { color: 'text.link' },
              '&.Mui-focusVisible': {
                outline: '2px solid',
                outlineColor: 'border.focus',
                outlineOffset: '2px',
                borderRadius: '2px',
              },
            }}
          >
            {item.label}
          </MuiLink>
        );
      })}
    </MuiBreadcrumbs>
  );
}
