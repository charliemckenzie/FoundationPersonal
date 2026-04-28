import MuiAccordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { faChevronDown } from '@fortawesome/pro-solid-svg-icons';
import { useCallback, useState } from 'react';
import { Icon } from '../Icon';
import { Button } from '../Button';
import type React from 'react';

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  defaultExpanded?: string;
  onChange?: (id: string, expanded: boolean) => void;
  variant?: 'default' | 'exclusive';
  showCloseAll?: boolean;
}

interface AccordionPanelProps {
  item: AccordionItem;
  expanded: boolean;
  onChange?: (id: string, expanded: boolean) => void;
}

function AccordionPanel({ item, expanded, onChange }: AccordionPanelProps) {
  const handleChange = useCallback(
    (_e: React.SyntheticEvent, isExpanded: boolean) => onChange?.(item.id, isExpanded),
    [item.id, onChange],
  );

  return (
    <MuiAccordion
      expanded={expanded}
      disabled={item.disabled}
      onChange={handleChange}
      disableGutters
      elevation={0}
      sx={(theme) => ({
        border: 1,
        borderColor: theme.palette.border.default,
        borderRadius: `${theme.spacing(1)} !important`,
        backgroundColor: theme.palette.background.paper,
        overflow: 'hidden',
        '&::before': { display: 'none' },
        '&:focus-within': {
          outline: `2px solid ${theme.palette.border.focus}`,
          outlineOffset: '2px',
        },
      })}
    >
      <AccordionSummary
        expandIcon={<Icon icon={faChevronDown} size="sm" />}
        aria-controls={`${item.id}-content`}
        id={`${item.id}-header`}
        sx={(theme) => ({
          py: theme.spacing(2.5),
          px: theme.spacing(3),
          '& .MuiAccordionSummary-content': {
            margin: 0,
          },
          '&.Mui-expanded': {
            backgroundColor: theme.palette.background.elevated,
          },
          '&:hover:not(.Mui-disabled)': {
            backgroundColor: theme.palette.background.elevated,
          },
          '&.Mui-expanded:hover:not(.Mui-disabled)': {
            backgroundColor: theme.palette.background.elevated,
          },
          '&.Mui-focusVisible': {
            outline: 'none',
            boxShadow: 'none',
            backgroundColor: theme.palette.background.elevated,
          },
        })}
      >
        <Typography variant="body" sx={(theme) => ({ fontWeight: 700, color: theme.palette.text.heading })}>
          {item.title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails id={`${item.id}-content`} sx={(theme) => ({ px: theme.spacing(3), py: theme.spacing(4) })}>
        {typeof item.content === 'string' ? (
          <Typography variant="body" color="text.muted">
            {item.content}
          </Typography>
        ) : (
          item.content
        )}
      </AccordionDetails>
    </MuiAccordion>
  );
}

export function Accordion({ items, defaultExpanded, onChange, variant = 'default', showCloseAll = false }: AccordionProps) {
  const [expanded, setExpanded] = useState<Set<string>>(
    () => new Set(defaultExpanded ? [defaultExpanded] : []),
  );

  const handleChange = useCallback(
    (id: string, isExpanded: boolean) => {
      setExpanded((prev) => {
        if (variant === 'exclusive') {
          // Only one panel can be open at a time
          return isExpanded ? new Set([id]) : new Set();
        }
        // Default behavior: multiple panels can be open
        const next = new Set(prev);
        if (isExpanded) next.add(id);
        else next.delete(id);
        return next;
      });
      onChange?.(id, isExpanded);
    },
    [onChange, variant],
  );

  const handleCloseAll = useCallback(() => {
    const openIds = [...expanded];
    setExpanded(new Set());
    openIds.forEach((id) => onChange?.(id, false));
  }, [expanded, onChange]);

  return (
    <Box>
      {items.length > 1 && variant === 'default' && showCloseAll && (
        <Box sx={(theme) => ({ display: 'flex', justifyContent: 'flex-end', mb: theme.spacing(1) })}>
          <Button
            label="Close all"
            variant="ghost"
            size="small"
            onClick={handleCloseAll}
            disabled={expanded.size === 0}
          />
        </Box>
      )}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: (theme) => theme.spacing(1) }}>
        {items.map((item) => (
          <AccordionPanel
            key={item.id}
            item={item}
            expanded={expanded.has(item.id)}
            onChange={handleChange}
          />
        ))}
      </Box>
    </Box>
  );
}
