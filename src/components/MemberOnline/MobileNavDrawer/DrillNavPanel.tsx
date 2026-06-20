import type { RefObject } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { TextButton } from '../../TextButton';
import { NavItem } from '../NavItem';
import type { MemberNavItem, MemberOnlineCopyResolved } from '../types';

interface DrillNavPanelProps {
  inert: boolean;
  labels: MemberOnlineCopyResolved;
  drillItem: MemberNavItem | null;
  drillHeadingId: string;
  drillHeadingRef: RefObject<HTMLHeadingElement | null>;
  activeItemId?: string;
  onBack: () => void;
  onItemClick?: (item: MemberNavItem) => void;
  onClose: () => void;
}

export function DrillNavPanel({
  inert,
  labels,
  drillItem,
  drillHeadingId,
  drillHeadingRef,
  activeItemId,
  onBack,
  onItemClick,
  onClose,
}: DrillNavPanelProps) {
  return (
    <Box
      inert={inert || undefined}
      sx={{
        flex: '0 0 50%',
        minWidth: 0,
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        p: 2,
        gap: 2,
      }}
    >
      <Box sx={{ mx: -2 }}>
        <Box sx={{ px: 2, height: 48, display: 'flex', alignItems: 'center' }}>
          <TextButton
            label={labels.backLabel}
            startIcon="chevron-left"
            iconDirection="left"
            onClick={onBack}
          />
        </Box>
        <Divider sx={{ borderColor: 'border.subtle' }} />
      </Box>
      <Typography
        id={drillHeadingId}
        ref={drillHeadingRef}
        variant="h5"
        component="h2"
        tabIndex={-1}
        sx={(t) => ({ color: 'text.heading', m: 0, mt: 1, fontSize: t.typography.body.fontSize, lineHeight: 1.5, outline: 'none' })}
      >
        {drillItem?.label}
      </Typography>
      <Box component="nav" aria-labelledby={drillHeadingId} sx={{ mx: -0.5 }}>
        <Box
          component="ul"
          role="list"
          sx={{ display: 'flex', flexDirection: 'column', listStyle: 'none', m: 0, p: 0 }}
        >
          {drillItem?.children?.map((child) => (
            <Box component="li" key={child.id}>
              <NavItem
                label={child.label}
                description={child.description}
                icon={child.icon}
                href={child.href}
                active={activeItemId === child.id}
                showAccentBar={false}
                onClick={() => {
                  child.onClick?.();
                  onItemClick?.(child);
                  onClose();
                }}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
