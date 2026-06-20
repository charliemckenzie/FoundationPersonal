'use client';

import Box from '@mui/material/Box';
import { Children } from 'react';
import type { CardGridProps } from './types';

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
