'use client';

import { useState, useCallback, useId } from 'react';
import { Box, Collapse, Typography } from '@mui/material';
import { Icon } from '../Icon';

export interface ExpandableItemProps {
  label: string;
  children: React.ReactNode;
  /** @default false */
  defaultExpanded?: boolean;
  expanded?: boolean;
  onChange?: (expanded: boolean) => void;
  /** @default false */
  disabled?: boolean;
  id?: string;
}

export function ExpandableItem({
  label,
  children,
  defaultExpanded = false,
  expanded: controlledExpanded,
  onChange,
  disabled = false,
  id: providedId,
}: ExpandableItemProps) {
  const generatedId = useId();
  const id = providedId || generatedId;

  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
  const isExpanded = controlledExpanded !== undefined ? controlledExpanded : internalExpanded;

  const handleToggle = useCallback(() => {
    if (disabled) return;
    const newExpanded = !isExpanded;
    if (controlledExpanded === undefined) setInternalExpanded(newExpanded);
    onChange?.(newExpanded);
  }, [disabled, isExpanded, controlledExpanded, onChange]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleToggle();
    }
  }, [handleToggle]);

  return (
    <Box>
      <Box
        component="button"
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        aria-expanded={isExpanded}
        aria-controls={`${id}-content`}
        id={`${id}-header`}
        sx={(t) => ({
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: disabled ? 'default' : 'pointer',
          opacity: disabled ? t.palette.action.disabledOpacity : 1,
          color: disabled ? 'action.disabled' : 'primary.main',
          transition: t.transitions.create('color', { duration: t.transitions.duration.short }),
          '&:hover:not(:disabled)': {
            color: 'primary.dark',
          },
          '&.Mui-focusVisible': {
            outline: '2px solid',
            outlineColor: 'border.focus',
            outlineOffset: '2px',
            borderRadius: `${t.shape.xs}px`,
          },
        })}
      >
        <Box
          sx={(t) => ({
            display: 'flex',
            transition: t.transitions.create('transform', {
              duration: t.transitions.duration.short,
              easing: t.transitions.easing.easeInOut,
            }),
            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
          })}
        >
          <Icon icon="chevron_down" size="sm" color="inherit" />
        </Box>
        <Typography variant="body" component="span" sx={{ fontWeight: 700 }}>
          {label}
        </Typography>
      </Box>

      <Collapse in={isExpanded}>
        <Box id={`${id}-content`} role="region" aria-labelledby={`${id}-header`} sx={{ mt: 1 }}>
          {children}
        </Box>
      </Collapse>
    </Box>
  );
}
