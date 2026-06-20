'use client';

import MuiCard from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import type { CardProps } from './types';
import {
  CARD_PADDING,
  CARD_PADDING_EXPANDED,
  contentPadding,
  sectionPadding,
  variantSx,
} from './styles';
import { renderCta, renderSectionText } from './helpers';

export { CardGrid } from './CardGrid';

export type {
  CardVariant,
  CardCtaKind,
  CardTopSectionPosition,
  CardTopSectionMobileBehavior,
  CardHeaderLevel,
  CardHeaderVariant,
  CardBodyVariant,
  CardCta,
  CardCtas,
  CardProps,
  CardGridProps,
} from './types';

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
