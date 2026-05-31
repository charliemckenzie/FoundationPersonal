import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import { darken } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';
import { useId } from 'react';
import { Icon } from '../Icon';
import { Tooltip } from '../Tooltip';
import type React from 'react';

export interface ExpandableCardAction {
  /** Font Awesome icon name (same convention as the Icon component). */
  icon: string;
  /** Accessible label for the button (also shown as a tooltip). */
  label: string;
  onClick: () => void;
}

export interface ExpandableCardItem {
  id: string;
  /** Left header content (takes the remaining width). Receives expanded state so the summary can differ collapsed vs open. Keep it inline/phrasing content — it renders inside the disclosure button. */
  renderHeader: (expanded: boolean) => React.ReactNode;
  /** Optional right-aligned header content, e.g. a metadata badge. */
  renderAside?: (expanded: boolean) => React.ReactNode;
  /** Optional secondary action rendered as a sibling button (not nested in the disclosure). */
  action?: ExpandableCardAction;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface ExpandableCardListProps {
  items: ExpandableCardItem[];
  /** Controlled id of the single open card. Empty string collapses all. */
  expandedId: string;
  /** Called with the id to open, or '' when the open card is toggled closed. */
  onExpandedChange: (id: string) => void;
  /** Wrap each disclosure button in a heading of this level for the document outline. Omit when the cards are not document sections (e.g. form rows). */
  headingLevel?: 2 | 3 | 4 | 5 | 6;
}

const ICON_SIZE = 'sm' as const;

// How much darker an interactive header zone goes on hover when the card is open.
const ZONE_HOVER_DARKEN = 0.06;

const zoneRestBg = (expanded: boolean, t: Theme) =>
  expanded ? t.palette.background.elevated : 'transparent';
const zoneHoverBg = (expanded: boolean, t: Theme) =>
  expanded ? darken(t.palette.background.elevated, ZONE_HOVER_DARKEN) : t.palette.background.elevated;

interface ExpandableCardProps {
  item: ExpandableCardItem;
  expanded: boolean;
  headingLevel?: ExpandableCardListProps['headingLevel'];
  onToggle: (id: string) => void;
}

function ExpandableCard({ item, expanded, headingLevel, onToggle }: ExpandableCardProps) {
  const uid = useId();
  const headerId = `${uid}-header`;
  const panelId = `${uid}-panel`;

  const disclosure = (
    <Box
      component="button"
      type="button"
      id={headerId}
      aria-expanded={expanded}
      aria-controls={panelId}
      disabled={item.disabled}
      onClick={() => onToggle(item.id)}
      sx={(t) => ({
        flex: 1,
        width: '100%',
        minWidth: 0,
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        pl: 2.5,
        pr: 2,
        py: 2,
        border: 'none',
        background: 'none',
        font: 'inherit',
        textAlign: 'left',
        cursor: item.disabled ? 'default' : 'pointer',
        color: 'text.primary',
        borderRadius: t.spacing(1.5),
        transition: 'background-color 0.15s',
        backgroundColor: zoneRestBg(expanded, t),
        '&:hover:not(:disabled)': { backgroundColor: zoneHoverBg(expanded, t) },
        '&:focus-visible': { outline: `2px solid ${t.palette.border.focus}`, outlineOffset: 2, zIndex: 1, position: 'relative' },
        '&:disabled': { opacity: 0.6 },
      })}
    >
      <Box component="span" sx={{ flex: 1, minWidth: 0 }}>{item.renderHeader(expanded)}</Box>
      {item.renderAside && (
        <Box component="span" sx={{ flexShrink: 0 }}>{item.renderAside(expanded)}</Box>
      )}
      <Box
        component="span"
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          flexShrink: 0,
          transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s',
        }}
      >
        <Icon icon="chevron_down" size={ICON_SIZE} />
      </Box>
    </Box>
  );

  return (
    <Box
      sx={{
        border: 1,
        borderColor: item.disabled ? 'border.subtle' : 'border.default',
        borderRadius: (t) => t.spacing(2),
        backgroundColor: 'background.paper',
        overflow: 'hidden',
      }}
    >
      {/* Header bar: disclosure button + optional sibling action (never nested) */}
      <Box sx={{ display: 'flex', alignItems: 'stretch', gap: item.action ? 0.5 : 0, p: 0.5 }}>
        {headingLevel ? (
          <Box component={`h${headingLevel}` as const} sx={{ flex: 1, minWidth: 0, m: 0, font: 'inherit' }}>
            {disclosure}
          </Box>
        ) : (
          disclosure
        )}

        {item.action && (
          <Tooltip title={item.action.label} placement="top" arrow>
            <Box
              component="button"
              type="button"
              aria-label={item.action.label}
              disabled={item.disabled}
              onClick={item.action.onClick}
              sx={(t) => ({
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                px: 2,
                background: 'none',
                border: 'none',
                borderRadius: t.spacing(1.5),
                cursor: 'pointer',
                color: 'text.secondary',
                transition: 'background-color 0.15s, color 0.15s',
                backgroundColor: zoneRestBg(expanded, t),
                '&:hover': { backgroundColor: zoneHoverBg(expanded, t), color: 'text.primary' },
                '&:focus-visible': {
                  outline: `2px solid ${t.palette.border.focus}`,
                  outlineOffset: 2,
                  zIndex: 1,
                  position: 'relative',
                  backgroundColor: zoneHoverBg(expanded, t),
                },
              })}
            >
              <Icon icon={item.action.icon} size={ICON_SIZE} />
            </Box>
          </Tooltip>
        )}
      </Box>

      {/* Panel — unmounted when collapsed so its fields leave the tab order */}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Box id={panelId} role="region" aria-labelledby={headerId} sx={{ px: 3, pt: 1, pb: 3 }}>
          {item.content}
        </Box>
      </Collapse>
    </Box>
  );
}

export function ExpandableCardList({ items, expandedId, onExpandedChange, headingLevel }: ExpandableCardListProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      {items.map((item) => (
        <ExpandableCard
          key={item.id}
          item={item}
          expanded={item.id === expandedId}
          headingLevel={headingLevel}
          onToggle={(id) => onExpandedChange(id === expandedId ? '' : id)}
        />
      ))}
    </Box>
  );
}
