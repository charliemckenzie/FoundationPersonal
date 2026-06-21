'use client';

import Box from '@mui/material/Box';
import { Button } from '../../Button';
import { ArtieAIButton } from '../../ArtieAIButton';
import { UserChip } from '../UserChip';
import { ThemeSwitcher } from '../ThemeSwitcher';
import { DEFAULT_MEMBER_ONLINE_COPY, type MemberUser } from '../types';
import type { ThemeMode } from '../../../app/themes/ThemeModeContext';

export interface MemberHeaderProps {
  user: MemberUser;
  mode: ThemeMode;
  onModeChange: (mode: ThemeMode) => void;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  onSearchSubmit?: (value: string) => void;
  onLogout?: () => void;
  /** Hide the search field (e.g. screens where search is irrelevant). */
  hideSearch?: boolean;
  /** ⌘K hint string. Pass `null` to hide. Defaults to `'⌘ K'`. */
  searchShortcut?: string | null;
  logoutLabel?: string;
  searchPlaceholder?: string;
}

export function MemberHeader({
  user,
  mode,
  onModeChange,
  onSearchSubmit,
  onLogout,
  hideSearch = false,
  logoutLabel = DEFAULT_MEMBER_ONLINE_COPY.logoutLabel,
}: MemberHeaderProps) {
  return (
    <Box
      component="header"
      sx={(t) => ({
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        px: 3,
        height: '4.5rem',
        backgroundColor: 'background.paper',
        borderBottom: `1px solid ${t.palette.border.subtle}`,
      })}
    >
      {!hideSearch && (
        <ArtieAIButton
          size="small"
          onClick={() => onSearchSubmit?.('')}
        />
      )}
      <UserChip user={user} />
      <Box sx={{ flex: 1 }} />
      <ThemeSwitcher mode={mode} onChange={onModeChange} />
      <Button label={logoutLabel} variant="outlined" size="small" onClick={onLogout} />
    </Box>
  );
}
