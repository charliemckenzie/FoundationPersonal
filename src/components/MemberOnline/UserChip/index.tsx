'use client';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import { DEFAULT_MEMBER_ONLINE_COPY, type MemberUser } from '../types';

export interface UserChipProps {
  user: MemberUser;
  /** Override the "Member No." prefix shown beneath the name. */
  memberNumberLabel?: string;
  /** Hides the name + member number text — useful in tight headers. */
  iconOnly?: boolean;
}

function initialsOf(name: string): string {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase() ?? '').join('');
}

export function UserChip({
  user,
  memberNumberLabel = DEFAULT_MEMBER_ONLINE_COPY.memberNumberLabel,
  iconOnly = false,
}: UserChipProps) {
  const initials = initialsOf(user.name);

  return (
    <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.5 }}>
      <Avatar
        src={user.avatarUrl}
        alt={user.name}
        sx={(t) => ({
          width: '2.5rem',
          height: '2.5rem',
          fontSize: '0.875rem',
          fontWeight: 600,
          backgroundColor: t.palette.mode === 'dark'
            ? alpha(t.palette.primary.main, 0.15)
            : alpha(t.palette.primary.main, 0.08),
          color: t.palette.primary.main,
        })}
      >
        {initials}
      </Avatar>
      {!iconOnly && (
        <Box sx={{ lineHeight: 1.2 }}>
          <Typography
            variant="small"
            sx={{ color: 'text.heading', fontWeight: 700, m: 0, fontSize: '0.875rem', lineHeight: 1.43 }}
          >
            {user.name}
          </Typography>
          <Typography
            variant="small"
            sx={{ color: 'text.muted', fontSize: '0.875rem', fontWeight: 500, m: 0, lineHeight: 1.43 }}
          >
            {memberNumberLabel} {user.memberNumber}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
