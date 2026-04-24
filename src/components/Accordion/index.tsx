import MuiAccordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { IconChevronDown } from '@tabler/icons-react';
import { useCallback, useState } from 'react';
import { Icon } from '../Icon';
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
      sx={{
        border: 1,
        borderColor: 'divider',
        '&:not(:last-child)': { borderBottom: 0 },
        '&::before': { display: 'none' },
      }}
    >
      <AccordionSummary
        expandIcon={<Icon icon={IconChevronDown} size="small" />}
        aria-controls={`${item.id}-content`}
        id={`${item.id}-header`}
        sx={(theme) => ({
          '&.Mui-expanded': {
            backgroundColor: theme.palette.action.selected,
          },
          '&:hover:not(.Mui-disabled)': {
            backgroundColor: theme.palette.action.hover,
          },
          '&.Mui-expanded:hover:not(.Mui-disabled)': {
            backgroundColor: theme.palette.action.selected,
          },
          '&.Mui-focusVisible': {
            outline: `2px solid ${theme.palette.border.focus}`,
            outlineOffset: '-2px',
            boxShadow: 'none',
          },
        })}
      >
        <Typography variant="body" sx={{ fontWeight: 500 }}>
          {item.title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails id={`${item.id}-content`}>
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

export function Accordion({ items, defaultExpanded, onChange }: AccordionProps) {
  const [expanded, setExpanded] = useState<Set<string>>(
    () => new Set(defaultExpanded ? [defaultExpanded] : []),
  );

  const handleChange = useCallback(
    (id: string, isExpanded: boolean) => {
      setExpanded((prev) => {
        const next = new Set(prev);
        if (isExpanded) next.add(id);
        else next.delete(id);
        return next;
      });
      onChange?.(id, isExpanded);
    },
    [onChange],
  );

  const handleCloseAll = useCallback(() => {
    const openIds = [...expanded];
    setExpanded(new Set());
    openIds.forEach((id) => onChange?.(id, false));
  }, [expanded, onChange]);

  return (
    <Box>
      {items.length > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
          <Button
            variant="text"
            size="small"
            onClick={handleCloseAll}
            disabled={expanded.size === 0}
            disableRipple
          >
            Close all
          </Button>
        </Box>
      )}
      {items.map((item) => (
        <AccordionPanel
          key={item.id}
          item={item}
          expanded={expanded.has(item.id)}
          onChange={handleChange}
        />
      ))}
    </Box>
  );
}
