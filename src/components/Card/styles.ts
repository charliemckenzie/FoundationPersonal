import type { SxProps, Theme } from '@mui/material/styles';
import type { CardVariant } from './types';

export const CARD_PADDING = '2rem';
export const CARD_PADDING_EXPANDED = '3.5rem';

export const variantSx: Record<CardVariant, (theme: Theme) => SxProps<Theme>> = {
  contained: (theme) => ({
    border: '1px solid',
    borderColor: 'border.default',
    borderRadius: `${theme.shape.xl}px`,
    backgroundColor: 'background.paper',
  }),
  border: (theme) => ({
    border: '1px solid',
    borderColor: 'border.default',
    borderRadius: `${theme.shape.xl}px`,
    backgroundColor: 'transparent',
  }),
  open: () => ({
    border: 'none',
    borderRadius: 0,
    backgroundColor: 'transparent',
  }),
};

export function sectionPadding(variant: CardVariant, expanded: boolean) {
  if (variant === 'open') {
    return { px: 0, pb: 0, pt: 0 };
  }

  const padding = expanded ? CARD_PADDING_EXPANDED : CARD_PADDING;

  return { px: padding, pb: padding, pt: 0 };
}

export function contentPadding(
  variant: CardVariant,
  expanded: boolean,
  hasTopSection: boolean,
  hasBottomSection: boolean,
) {
  if (variant === 'open') {
    const openBottomPadding = hasBottomSection ? '1.5rem' : (expanded ? CARD_PADDING_EXPANDED : CARD_PADDING);

    return {
      px: 0,
      py: '1.5rem',
      '&:last-child': { pb: openBottomPadding },
    };
  }

  const basePadding = expanded ? CARD_PADDING_EXPANDED : CARD_PADDING;

  // No top and no bottom sections should use full card padding in all directions.
  if (!hasTopSection && !hasBottomSection) {
    return {
      p: basePadding,
      '&:last-child': { pb: basePadding },
    };
  }

  if (!hasTopSection && hasBottomSection) {
    return {
      px: basePadding,
      pt: basePadding,
      pb: '1rem',
      '&:last-child': { pb: '1rem' },
    };
  }

  if (hasTopSection && !hasBottomSection) {
    return {
      px: basePadding,
      pt: '1rem',
      pb: basePadding,
      '&:last-child': { pb: basePadding },
    };
  }

  const horizontalPadding = expanded ? CARD_PADDING_EXPANDED : CARD_PADDING;

  return {
    px: horizontalPadding,
    pt: '1rem',
    pb: '1rem',
    '&:last-child': { pb: '1rem' },
  };
}
