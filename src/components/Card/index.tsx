'use client';

import MuiCard from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import type { SxProps, Theme } from '@mui/material/styles';
import { Children } from 'react';
import type React from 'react';
import { Button } from '../Button';
import { TextButton } from '../TextButton';

export type CardVariant = 'contained' | 'border' | 'open';
export type CardCtaKind = 'button' | 'textButton';
export type CardTopSectionPosition = 'top' | 'left';
export type CardTopSectionMobileBehavior = 'keep-left' | 'stack-top';
export type CardHeaderLevel = 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type CardHeaderVariant =
  | 'display-1'
  | 'display-2'
  | 'display-3'
  | 'display-4'
  | 'display-5'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6';
export type CardBodyVariant = 'lead' | 'body' | 'small';

export interface CardCta {
  label: string;
  kind?: CardCtaKind;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export interface CardCtas {
  primary?: CardCta;
  secondary?: CardCta;
}

export interface CardProps {
  /**
   * contained: bordered + surface background + 32px contained content.
   * border: bordered + transparent background + 32px contained content.
   * open: no border + no contained padding.
   */
  variant?: CardVariant;
  /** For contained/border variants, increases contained padding to 56px. Ignored by open. */
  expanded?: boolean;
  /** Optional top section (image, hero icon, or any custom node). */
  topSection?: React.ReactNode;
  /** Placement of the top section relative to content. Defaults to top. */
  topSectionPosition?: CardTopSectionPosition;
  /**
   * Mobile behavior when topSectionPosition is left.
   * - keep-left: keep row layout at all breakpoints.
   * - stack-top: switch to column on mobile so top section moves above content.
   */
  topSectionMobileBehavior?: CardTopSectionMobileBehavior;
  /** Optional header content rendered at the start of the content section. */
  header?: React.ReactNode;
  /** Semantic heading level when header is a text primitive. Defaults to h3. */
  headerLevel?: CardHeaderLevel;
  /** Header typography variant when header is a text primitive. Defaults to h5. */
  headerVariant?: CardHeaderVariant;
  /** Optional body content rendered below header in the content section. */
  body?: React.ReactNode;
  /** Body typography variant when body is a text primitive. Defaults to body. */
  bodyVariant?: CardBodyVariant;
  /** Additional custom content rendered inside the content section. */
  children?: React.ReactNode;
  /** Optional actions row rendered at the very bottom. */
  actions?: React.ReactNode;
  /** Optional structured CTA config for the bottom section. */
  ctas?: CardCtas;
  /** Additional sx overrides forwarded to the root card element. */
  sx?: SxProps<Theme>;
}

export interface CardGridProps {
  /** Card nodes rendered in the responsive layout grid. */
  children: React.ReactNode;
  /** Grid gap between cards. Defaults to 2 (theme spacing). */
  gap?: number;
  /** When true, cards stretch to equal row height. Content remains top-aligned. */
  equalHeight?: boolean;
  /** Additional sx overrides forwarded to the grid wrapper. */
  sx?: SxProps<Theme>;
}

const CARD_PADDING = '2rem';
const CARD_PADDING_EXPANDED = '3.5rem';

const variantSx: Record<CardVariant, (theme: Theme) => SxProps<Theme>> = {
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

function sectionPadding(variant: CardVariant, expanded: boolean) {
  if (variant === 'open') {
    return { px: 0, pb: 0, pt: 0 };
  }

  const padding = expanded ? CARD_PADDING_EXPANDED : CARD_PADDING;

  return { px: padding, pb: padding, pt: 0 };
}

function contentPadding(
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

export function Card({
  variant = 'contained',
  expanded = false,
  topSection,
  topSectionPosition = 'top',
  topSectionMobileBehavior = 'keep-left',
  header,
  headerLevel = 'h3',
  headerVariant = 'h5',
  body,
  bodyVariant = 'body',
  children,
  actions,
  ctas,
  sx,
}: CardProps) {
  const hasTopSection = Boolean(topSection);
  const hasPrimaryCta = Boolean(ctas?.primary);
  const hasSecondaryCta = Boolean(ctas?.secondary);
  const hasStructuredCtas = hasPrimaryCta || hasSecondaryCta;
  const hasBottomSection = Boolean(actions || hasStructuredCtas);
  const isTopSectionLeft = hasTopSection && topSectionPosition === 'left';
  const shouldStackTopOnMobile = isTopSectionLeft && topSectionMobileBehavior === 'stack-top';
  const sectionPaddingValue = expanded ? CARD_PADDING_EXPANDED : CARD_PADDING;
  const rightColumnContentBottom = hasBottomSection
    ? '1rem'
    : variant === 'open'
      ? '1.5rem'
      : sectionPaddingValue;
  const rightColumnBottom = variant === 'open' ? 0 : sectionPaddingValue;
  const isDoubleTextButtonCtas =
    hasPrimaryCta
    && hasSecondaryCta
    && (ctas?.primary?.kind ?? 'button') === 'textButton'
    && (ctas?.secondary?.kind ?? 'button') === 'textButton';

  const renderSectionText = (
    value: React.ReactNode,
    variantName: CardHeaderVariant | CardBodyVariant,
    component: CardHeaderLevel | 'p',
    color: 'text.heading' | 'text.primary',
    marginBottom: number,
  ) => {
    if (value == null) {
      return null;
    }

    if (typeof value === 'string' || typeof value === 'number') {
      return (
        <Typography variant={variantName} component={component} color={color} sx={{ mb: marginBottom }}>
          {value}
        </Typography>
      );
    }

    return value;
  };

  const renderCta = (cta: CardCta, role: 'primary' | 'secondary') => {
    const kind = cta.kind ?? 'button';

    if (kind === 'textButton') {
      return <TextButton label={cta.label} onClick={cta.onClick} />;
    }

    return (
      <Button
        label={cta.label}
        variant={role === 'primary' ? 'contained' : 'outlined'}
        onClick={cta.onClick}
      />
    );
  };

  const bottomSectionContent = actions ?? (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: isDoubleTextButtonCtas ? 'column' : 'row',
        flexWrap: isDoubleTextButtonCtas ? 'nowrap' : 'wrap',
        alignItems: isDoubleTextButtonCtas ? 'flex-start' : 'center',
        gap: 1,
      }}
    >
      {ctas?.primary && renderCta(ctas.primary, 'primary')}
      {ctas?.secondary && renderCta(ctas.secondary, 'secondary')}
    </Box>
  );

  return (
    <MuiCard
      sx={[
        {
          boxShadow: 'none',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        },
        variantSx[variant],
        ...(Array.isArray(sx) ? sx : [sx ?? false]),
      ]}
    >
      {hasTopSection && !isTopSectionLeft && (
        <Box>
          {topSection}
        </Box>
      )}

      {isTopSectionLeft
        ? (
            <Box
              sx={{
                display: 'flex',
                flexDirection: shouldStackTopOnMobile ? { xs: 'column', sm: 'row' } : 'row',
                alignItems: 'flex-start',
                gap: '1.5rem',
                px: variant === 'open' ? 0 : sectionPaddingValue,
                pt: variant === 'open' ? '1.5rem' : sectionPaddingValue,
              }}
            >
              <Box sx={{ flexShrink: 0 }}>{topSection}</Box>
              <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ pb: rightColumnContentBottom, flexGrow: 1 }}>
                  {renderSectionText(header, headerVariant, headerLevel, 'text.heading', 2)}
                  {renderSectionText(body, bodyVariant, 'p', 'text.primary', 0)}
                  {children}
                </Box>
                {hasBottomSection && (
                  <Box sx={{ pb: rightColumnBottom }}>
                    {bottomSectionContent}
                  </Box>
                )}
              </Box>
            </Box>
          )
        : (
            <>
              <CardContent
                sx={{
                  ...contentPadding(variant, expanded, hasTopSection, hasBottomSection),
                  flexGrow: 1,
                }}
              >
                {renderSectionText(header, headerVariant, headerLevel, 'text.heading', 2)}
                {renderSectionText(body, bodyVariant, 'p', 'text.primary', 0)}
                {children}
              </CardContent>

              {hasBottomSection && (
                <CardActions sx={sectionPadding(variant, expanded)}>
                  {bottomSectionContent}
                </CardActions>
              )}
            </>
          )}
    </MuiCard>
  );
}

export function CardGrid({ children, gap = 2, equalHeight = false, sx }: CardGridProps) {
  const items = Children.toArray(children);
  const desktopSpan =
    items.length <= 2
      ? 6
      : items.length === 3
        ? 4
        : 3;

  return (
    <Box
      sx={[
        {
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: 'repeat(12, minmax(0, 1fr))',
          },
          gap,
          '& > .card-grid-item': {
            minWidth: 0,
            display: equalHeight ? 'flex' : 'block',
            gridColumn: {
              xs: '1 / -1',
              md: 'span 6',
              lg: `span ${desktopSpan}`,
            },
          },
          ...(equalHeight && {
            '& > .card-grid-item > *': {
              width: '100%',
              height: '100%',
            },
          }),
        },
        ...(Array.isArray(sx) ? sx : [sx ?? false]),
      ]}
    >
      {items.map((item, index) => (
        <Box className="card-grid-item" key={index}>
          {item}
        </Box>
      ))}
    </Box>
  );
}
