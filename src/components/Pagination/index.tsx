import MuiPagination from '@mui/material/Pagination';
import type { SxProps, Theme } from '@mui/material/styles';
import type React from 'react';

export type PaginationVariant = 'outlined' | 'text';
export type PaginationColor = 'primary' | 'standard';
export type PaginationSize = 'small' | 'medium' | 'large';

const SIZE_MAP: Record<PaginationSize, { minWidth: string; height: string }> = {
  small:  { minWidth: '2rem',   height: '2rem' },
  medium: { minWidth: '2.75rem', height: '2.75rem' },
  large:  { minWidth: '3rem',   height: '3rem' },
};

export interface PaginationProps {
  count: number;
  page?: number;
  defaultPage?: number;
  onChange?: (event: React.ChangeEvent<unknown>, page: number) => void;
  variant?: PaginationVariant;
  color?: PaginationColor;
  size?: PaginationSize;
  disabled?: boolean;
  siblingCount?: number;
  boundaryCount?: number;
  showFirstButton?: boolean;
  showLastButton?: boolean;
  sx?: SxProps<Theme>;
}

export function Pagination({
  count,
  page,
  defaultPage,
  onChange,
  variant = 'text',
  color = 'primary',
  size = 'medium',
  disabled = false,
  siblingCount = 0,
  boundaryCount = 1,
  showFirstButton = false,
  showLastButton = false,
  sx,
}: PaginationProps) {
  return (
    <MuiPagination
      count={count}
      page={page}
      defaultPage={defaultPage}
      onChange={onChange}
      variant={variant}
      color={color}
      size={size}
      disabled={disabled}
      siblingCount={siblingCount}
      boundaryCount={boundaryCount}
      showFirstButton={showFirstButton}
      showLastButton={showLastButton}
      sx={[
        (theme) => ({
          '& .MuiPaginationItem-root': {
            ...SIZE_MAP[size],
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'text.primary',
            borderRadius: '50%',
            transition: theme.transitions.create(
              ['background-color', 'border-color', 'color'],
              { duration: theme.transitions.duration.shorter },
            ),
            '& .MuiTouchRipple-root': { display: 'none' },
            '&:hover': {
              backgroundColor: 'action.hover',
            },
            '&.MuiPaginationItem-ellipsis': {
              cursor: 'default',
              pointerEvents: 'none',
              '&:hover': { backgroundColor: 'transparent' },
            },
            '&:focus-visible': {
              outline: '2px solid',
              outlineColor: 'border.focus',
              outlineOffset: '2px',
            },
            '&.Mui-selected': {
              cursor: 'default',
              fontWeight: theme.typography.fontWeightBold,
              ...(color === 'primary' && {
                color: 'primary.contrastText',
                '&:hover': { backgroundColor: 'primary.main' },
              }),
            },
            '&.Mui-disabled': {
              color: 'text.disabled',
              opacity: 1,
            },
          },
          '& .MuiPaginationItem-outlined': {
            borderColor: 'border.default',
            '&.Mui-disabled': {
              borderColor: 'border.subtle',
            },
          },
        }),
        ...(Array.isArray(sx) ? sx : sx != null ? [sx] : []),
      ]}
    />
  );
}
