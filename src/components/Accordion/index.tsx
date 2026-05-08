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
}

export type AccordionSize = 'small' | 'medium' | 'large';

const SIZE_MAP = {
  small:  { summaryPy: 1,   summaryPx: 2,   detailsPy: 1,   detailsPx: 2,   titleVariant: 'small' as const, iconSize: 'sm' as const },
  medium: { summaryPy: 1.5, summaryPx: 2,   detailsPy: 2,   detailsPx: 2,   titleVariant: 'body'  as const, iconSize: 'sm' as const },
  large:  { summaryPy: 2,   summaryPx: 2.5, detailsPy: 2.5, detailsPx: 2.5, titleVariant: 'body'  as const, iconSize: 'md' as const },
} as const;

export interface AccordionProps {
  items: AccordionItem[];
  defaultExpanded?: string;
  onChange?: (id: string, expanded: boolean) => void;
  variant?: 'default' | 'exclusive';
  showCloseAll?: boolean;
  size?: AccordionSize;
}

interface AccordionPanelProps {
  item: AccordionItem;
  expanded: boolean;
  onChange?: (id: string, expanded: boolean) => void;
  size: AccordionSize;
}

function AccordionPanel({ item, expanded, onChange, size }: AccordionPanelProps) {
  const sz = SIZE_MAP[size];
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
        borderColor: 'border.default',
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
        expandIcon={<Icon icon="chevron_down" size={sz.iconSize} />}
        aria-controls={`${item.id}-content`}
        id={`${item.id}-header`}
        sx={{
          py: sz.summaryPy,
          px: sz.summaryPx,
          '& .MuiAccordionSummary-content': { margin: 0 },
          '&.Mui-expanded': { backgroundColor: 'background.elevated' },
          '&:hover:not(.Mui-disabled)': { backgroundColor: 'background.elevated' },
          '&.Mui-expanded:hover:not(.Mui-disabled)': { backgroundColor: 'background.elevated' },
          '&.Mui-focusVisible': { outline: 'none', boxShadow: 'none', backgroundColor: 'background.elevated' },
        }}
      >
        <Typography variant={sz.titleVariant} sx={{ fontWeight: 700, color: 'inherit' }}>
          {item.title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails id={`${item.id}-content`} sx={{ px: sz.detailsPx, py: sz.detailsPy }}>
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

export function Accordion({ items, defaultExpanded, onChange, variant = 'default', showCloseAll = false, size = 'medium' }: AccordionProps) {
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
            size={size}
          />
        ))}
      </Box>
    </Box>
  );
}
