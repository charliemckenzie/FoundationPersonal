import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';
import { DescriptionListContext, densityPy } from './context';
import type { DescriptionListItemProps } from './types';

export function DescriptionListItem({ label, description, value, valueDescription, action, valueAlign }: DescriptionListItemProps) {
  const { valueAlign: contextAlign, density, labelWidth, valueWidth, labelFontWeight = 400, valueFontWeight = 700, responsive = true } = React.useContext(DescriptionListContext);
  const align = valueAlign ?? contextAlign;
  const isText = typeof value === 'string' || typeof value === 'number';
  const toCol = (w: number | string) => (typeof w === 'number' ? `${w}px` : w);
  const desktopColumns =
    labelWidth && valueWidth ? `${toCol(labelWidth)} ${toCol(valueWidth)}`
    : labelWidth             ? `${toCol(labelWidth)} 1fr`
    : valueWidth             ? `1fr ${toCol(valueWidth)}`
    : '1fr 1fr';

  return (
    <Box
      component="div"
      sx={{
        display: 'grid',
        gridTemplateColumns: responsive ? { xs: '1fr', sm: desktopColumns } : desktopColumns,
        alignItems: responsive
          ? { sm: (description || valueDescription) ? 'flex-start' : 'center' }
          : (description || valueDescription) ? 'flex-start' : 'center',
        columnGap: 2,
        rowGap: responsive ? { xs: 0.5, sm: 0 } : 0,
        py: densityPy[density],
      }}
    >
      <Box component="dt" sx={{ minWidth: 0 }}>
        <Typography component="span" variant="body" sx={{ color: 'text.primary', display: 'block', fontWeight: labelFontWeight }}>
          {label}
        </Typography>
        {description && (
          <Typography component="span" variant="small" sx={{ color: 'text.muted', display: 'block', mb: responsive ? { xs: 0.5, sm: 0 } : 0 }}>
            {description}
          </Typography>
        )}
      </Box>
      <Box
        component="dd"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 0,
          m: 0,
          minWidth: 0,
          alignItems: responsive && align === 'right'
            ? { xs: 'flex-start', sm: 'flex-end' }
            : align === 'right' ? 'flex-end' : 'flex-start',
        }}
      >
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          width: '100%',
          justifyContent: action
            ? 'space-between'
            : responsive && align === 'right'
              ? { xs: 'flex-start', sm: 'flex-end' }
              : align === 'right' ? 'flex-end' : 'flex-start',
        }}>
          {isText ? (
            <Typography
              component="span"
              variant="body"
              sx={{ fontWeight: valueFontWeight, color: 'text.primary' }}
            >
              {value}
            </Typography>
          ) : (
            value
          )}
          {action}
        </Box>
        {valueDescription && (
          <Typography component="span" variant="small" sx={{ color: 'text.muted', display: 'block' }}>
            {valueDescription}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

DescriptionListItem.displayName = 'DescriptionListItem';
