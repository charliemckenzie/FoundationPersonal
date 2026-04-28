'use client';

import React, { useState, useCallback, useId } from 'react';
import { Box, Collapse, Typography } from '@mui/material';
import { faChevronDown } from '@fortawesome/pro-solid-svg-icons';
import { Icon } from '../Icon';

export interface ExpandableItemProps {
  /**
   * The label text displayed next to the chevron
   */
  label: string;
  
  /**
   * The content to show/hide
   */
  children: React.ReactNode;
  
  /**
   * Initial expanded state (uncontrolled mode)
   * @default false
   */
  defaultExpanded?: boolean;
  
  /**
   * Controlled expanded state
   */
  expanded?: boolean;
  
  /**
   * Callback fired when the expanded state changes
   */
  onChange?: (expanded: boolean) => void;
  
  /**
   * If true, the item cannot be expanded/collapsed
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Optional id for ARIA relationships. If not provided, one will be generated.
   */
  id?: string;
}

export const ExpandableItem: React.FC<ExpandableItemProps> = ({
  label,
  children,
  defaultExpanded = false,
  expanded: controlledExpanded,
  onChange,
  disabled = false,
  id: providedId,
}) => {
  const generatedId = useId();
  const id = providedId || generatedId;
  
  // Internal state for uncontrolled mode
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
  
  // Use controlled state if provided, otherwise use internal state
  const isExpanded = controlledExpanded !== undefined ? controlledExpanded : internalExpanded;
  
  const handleToggle = useCallback(() => {
    if (disabled) return;
    
    const newExpanded = !isExpanded;
    
    // Update internal state if uncontrolled
    if (controlledExpanded === undefined) {
      setInternalExpanded(newExpanded);
    }
    
    // Call onChange callback
    onChange?.(newExpanded);
  }, [disabled, isExpanded, controlledExpanded, onChange]);
  
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    // Handle Enter and Space to toggle
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleToggle();
    }
  }, [handleToggle]);
  
  return (
    <Box>
      {/* Trigger button */}
      <Box
        component="button"
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        aria-expanded={isExpanded}
        aria-controls={`${id}-content`}
        id={`${id}-header`}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: disabled ? 'default' : 'pointer',
          opacity: disabled ? (theme) => theme.palette.action.disabledOpacity : 1,
          color: (theme) => disabled ? theme.palette.action.disabled : theme.palette.primary.main,
          transition: (theme) => theme.transitions.create('color', {
            duration: theme.transitions.duration.short,
          }),
          '&:hover:not(:disabled)': {
            color: (theme) => theme.palette.primary.dark,
          },
          '&.Mui-focusVisible': {
            outline: (theme) => `2px solid ${theme.palette.border.focus}`,
            outlineOffset: '2px',
            borderRadius: (theme) => theme.spacing(0.5),
          },
        }}
      >
        {/* Chevron icon */}
        <Box
          sx={{
            display: 'flex',
            transition: (theme) => theme.transitions.create('transform', {
              duration: theme.transitions.duration.short,
              easing: theme.transitions.easing.easeInOut,
            }),
            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        >
          <Icon icon={faChevronDown} size="sm" color="inherit" />
        </Box>
        
        {/* Label */}
        <Typography
          variant="body"
          component="span"
          sx={{
            fontWeight: 700,
          }}
        >
          {label}
        </Typography>
      </Box>
      
      {/* Collapsible content */}
      <Collapse in={isExpanded}>
        <Box
          id={`${id}-content`}
          role="region"
          aria-labelledby={`${id}-header`}
          sx={{
            mt: 1,
          }}
        >
          {children}
        </Box>
      </Collapse>
    </Box>
  );
};
