import MuiAccordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useCallback, useState } from 'react';
import { Icon } from '../Icon';
import { Button } from '../Button';
import type React from 'react';

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  disabled?: boolean;
  /** Optional action buttons rendered at the bottom of the expanded panel (e.g. Cancel / Agree). */
  actions?: React.ReactNode;
}

const SIZE = { summaryPy: 2.5, summaryPx: 3, detailsPt: 3, detailsPb: 3, detailsPx: 3, titleVariant: 'body' as const, iconSize: 'sm' as const };

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
      sx={(t) => ({
        border: 1,
        borderColor: item.disabled ? 'border.subtle' : 'border.default',
        borderRadius: `${t.spacing(1)} !important`,
        backgroundColor: 'background.paper',
        overflow: 'hidden',
        '&::before': { display: 'none' },
        '&:focus-within': {
          outline: `2px solid ${t.palette.border.focus}`,
          outlineOffset: '2px',
        },
      })}
    >
      <AccordionSummary
        expandIcon={<Icon icon="chevron_down" size={SIZE.iconSize} />}
        aria-controls={`${item.id}-content`}
        id={`${item.id}-header`}
        sx={{
          py: SIZE.summaryPy,
          px: SIZE.summaryPx,
          '& .MuiAccordionSummary-content': { margin: 0 },
          '&.Mui-expanded': { backgroundColor: 'background.elevated' },
          '&:hover:not(.Mui-disabled)': { backgroundColor: 'background.elevated' },
          '&.Mui-expanded:hover:not(.Mui-disabled)': { backgroundColor: 'background.elevated' },
          '&.Mui-focusVisible': { outline: 'none', boxShadow: 'none', backgroundColor: 'background.elevated' },
        }}
      >
        <Typography variant={SIZE.titleVariant} sx={{ fontWeight: 700, color: 'inherit' }}>
          {item.title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails id={`${item.id}-content`} sx={{ px: SIZE.detailsPx, pt: SIZE.detailsPt, pb: SIZE.detailsPb }}>
        {typeof item.content === 'string' ? (
          <Typography variant="body" color="text.muted">
            {item.content}
          </Typography>
        ) : (
          item.content
        )}
        {item.actions && (
          <Box sx={{ mt: 2, pt: 2, borderTop: 1, borderColor: 'border.subtle', display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            {item.actions}
          </Box>
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
          return isExpanded ? new Set([id]) : new Set();
        }
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
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
          <Button
            label="Close all"
            variant="ghost"
            size="small"
            onClick={handleCloseAll}
            disabled={expanded.size === 0}
          />
        </Box>
      )}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
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
