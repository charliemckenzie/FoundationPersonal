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

export type CardV2Variant = 'contained' | 'border' | 'open';
export type CardV2CtaKind = 'button' | 'textButton';
export type CardV2HeaderVariant =
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
export type CardV2BodyVariant = 'lead' | 'body' | 'small';

export interface CardV2Cta {
  label: string;
  kind?: CardV2CtaKind;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export interface CardV2Ctas {
  primary?: CardV2Cta;
  secondary?: CardV2Cta;
}

export interface CardV2Props {
  /**
   * contained: bordered + surface background + 32px contained content.
   * border: bordered + transparent background + 32px contained content.
   * open: no border + no contained padding.
   */
  variant?: CardV2Variant;
  /** For contained/border variants, increases contained padding to 56px. Ignored by open. */
  expanded?: boolean;
  /** Optional top section (image, hero icon, or any custom node). */
  topSection?: React.ReactNode;
  /** Optional header content rendered at the start of the content section. */
  header?: React.ReactNode;
  /** Header typography variant when header is a text primitive. Defaults to h5. */
  headerVariant?: CardV2HeaderVariant;
  /** Optional body content rendered below header in the content section. */
  body?: React.ReactNode;
  /** Body typography variant when body is a text primitive. Defaults to body. */
  bodyVariant?: CardV2BodyVariant;
  /** Additional custom content rendered inside the content section. */
  children?: React.ReactNode;
  /** Optional actions row rendered at the very bottom. */
  actions?: React.ReactNode;
  /** Optional structured CTA config for the bottom section. */
  ctas?: CardV2Ctas;
  /** Additional sx overrides forwarded to the root card element. */
  sx?: SxProps<Theme>;
}

export interface CardV2GridProps {
  /** Card nodes rendered in the responsive layout grid. */
  children: React.ReactNode;
  /** Grid gap between cards. Defaults to 2 (theme spacing). */
  gap?: number;
  /** Additional sx overrides forwarded to the grid wrapper. */
  sx?: SxProps<Theme>;
}

const CARD_PADDING = '2rem';
const CARD_PADDING_EXPANDED = '3.5rem';

const variantSx: Record<CardV2Variant, (theme: Theme) => SxProps<Theme>> = {
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

function sectionPadding(variant: CardV2Variant, expanded: boolean) {
  if (variant === 'open') {
    return { px: 0, pb: 0, pt: 0 };
  }

  const padding = expanded ? CARD_PADDING_EXPANDED : CARD_PADDING;

  return { px: padding, pb: padding, pt: 0 };
}

function contentPadding(variant: CardV2Variant, hasTopSection: boolean, expanded: boolean) {
  if (variant === 'open') {
    return {
      px: 0,
      py: '1.5rem',
      '&:last-child': { pb: '1.5rem' },
    };
  }

  if (!hasTopSection) {
    const padding = expanded ? CARD_PADDING_EXPANDED : CARD_PADDING;

    return {
      p: padding,
      '&:last-child': { pb: padding },
    };
  }

  if (expanded) {
    return {
      px: CARD_PADDING_EXPANDED,
      py: '1rem',
      '&:last-child': { pb: '1rem' },
    };
  }

  return {
    px: '2rem',
    py: '1rem',
    '&:last-child': { pb: '1rem' },
  };
}

export function CardV2({
  variant = 'contained',
  expanded = false,
  topSection,
  header,
  headerVariant = 'h5',
  body,
  bodyVariant = 'body',
  children,
  actions,
  ctas,
  sx,
}: CardV2Props) {
  const hasTopSection = Boolean(topSection);
  const hasPrimaryCta = Boolean(ctas?.primary);
  const hasSecondaryCta = Boolean(ctas?.secondary);
  const hasStructuredCtas = hasPrimaryCta || hasSecondaryCta;
  const isDoubleTextButtonCtas =
    hasPrimaryCta
    && hasSecondaryCta
    && (ctas?.primary?.kind ?? 'button') === 'textButton'
    && (ctas?.secondary?.kind ?? 'button') === 'textButton';

  const renderSectionText = (
    value: React.ReactNode,
    variantName: CardV2HeaderVariant | CardV2BodyVariant,
    component: 'h3' | 'p',
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

  const renderCta = (cta: CardV2Cta, role: 'primary' | 'secondary') => {
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

  return (
    <MuiCard
      sx={[
        {
          boxShadow: 'none',
          overflow: 'hidden',
        },
        variantSx[variant],
        ...(Array.isArray(sx) ? sx : [sx ?? false]),
      ]}
    >
      {hasTopSection && (
        <Box
          sx={variant === 'open'
            ? (theme) => ({
                borderRadius: `${theme.shape.xl}px`,
                overflow: 'hidden',
              })
            : undefined}
        >
          {topSection}
        </Box>
      )}

      <CardContent sx={contentPadding(variant, hasTopSection, expanded)}>
        {renderSectionText(header, headerVariant, 'h3', 'text.heading', 2)}
        {renderSectionText(body, bodyVariant, 'p', 'text.primary', 0)}
        {children}
      </CardContent>

      {(actions || hasStructuredCtas) && (
        <CardActions sx={sectionPadding(variant, expanded)}>
          {actions ?? (
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: isDoubleTextButtonCtas ? 'column' : 'row',
                flexWrap: isDoubleTextButtonCtas ? 'nowrap' : 'wrap',
                alignItems: 'flex-start',
                gap: 1,
              }}
            >
              {ctas?.primary && renderCta(ctas.primary, 'primary')}
              {ctas?.secondary && renderCta(ctas.secondary, 'secondary')}
            </Box>
          )}
        </CardActions>
      )}
    </MuiCard>
  );
}

export function CardV2Grid({ children, gap = 2, sx }: CardV2GridProps) {
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
          '& > .card-v2-grid-item': {
            minWidth: 0,
            gridColumn: {
              xs: '1 / -1',
              md: 'span 6',
              lg: `span ${desktopSpan}`,
            },
          },
        },
        ...(Array.isArray(sx) ? sx : [sx ?? false]),
      ]}
    >
      {items.map((item, index) => (
        <Box className="card-v2-grid-item" key={index}>
          {item}
        </Box>
      ))}
    </Box>
  );
}
