'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Icon } from '../../Icon';
import { IconButton } from '../../IconButton';

export interface MOBreadcrumbItem {
  label: string;
  href?: string;
}

export interface MOBreadcrumbProps {
  items: MOBreadcrumbItem[];
  onBack?: () => void;
}

export function MOBreadcrumb({ items, onBack }: MOBreadcrumbProps) {
  return (
    <Box
      component="nav"
      aria-label="breadcrumb"
      sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
    >
      {onBack && (
        <>
          <IconButton
            icon="chevron-left"
            label="Go back"
            variant="soft"
            size="small"
            color="primary"
            showTooltip={false}
            onClick={onBack}
          />
          <Box
            aria-hidden="true"
            sx={{
              width: '1px',
              height: '1.25rem',
              bgcolor: 'divider',
              alignSelf: 'center',
              flexShrink: 0,
              mx: 0.5,
            }}
          />
        </>
      )}
      <Box
        component="ol"
        className="link-hover-only"
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 0.75,
          listStyle: 'none',
          m: 0,
          p: 0,
          flexWrap: 'nowrap',
        }}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <Box
              component="li"
              key={item.label}
              sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}
            >
              {index > 0 && (
                <Box aria-hidden="true" sx={{ display: 'inline-flex' }}>
                  <Icon icon="chevron-right" style="solid" size="sm" color="text.muted" />
                </Box>
              )}
              {isLast ? (
                <Typography
                  variant="small"
                  component="span"
                  sx={{ color: 'text.muted' }}
                  aria-current="page"
                >
                  {item.label}
                </Typography>
              ) : (
                <Box
                  component="a"
                  href={item.href ?? '#'}
                  sx={{
                    typography: 'small',
                    fontWeight: 500,
                    color: 'text.primary',
                    textDecoration: 'none',
                    '&:hover': { color: 'primary.main' },
                    '&:focus-visible': {
                      outline: '2px solid',
                      outlineColor: 'border.focus',
                      outlineOffset: '2px',
                      borderRadius: '2px',
                    },
                  }}
                >
                  {item.label}
                </Box>
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
