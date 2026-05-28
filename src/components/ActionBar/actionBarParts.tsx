import Box from '@mui/material/Box';
import type { ReactNode } from 'react';
import { Button } from '../Button';
import type { ActionBarAction } from './index';

export function IconImage({ src, alt, icon }: { src?: string; alt?: string; icon?: ReactNode }) {
  if (icon) {
    return <Box sx={{ flexShrink: 0 }}>{icon}</Box>;
  }
  return (
    <Box
      sx={{
        flexShrink: 0,
        width: '4rem',
        height: '4rem',
        borderRadius: '50%',
        bgcolor: 'background.paper',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <Box
        component="img"
        src={src}
        alt={alt ?? ''}
        sx={{ width: '70%', height: '70%', objectFit: 'contain' }}
      />
    </Box>
  );
}

export function ActionButton({
  action,
  reversed,
}: {
  action: ActionBarAction;
  reversed: boolean;
}) {
  const btn = (
    <Button
      label={action.label}
      variant="contained"
      reversed={reversed}
      onClick={action.href ? undefined : action.onClick}
    />
  );

  if (action.href) {
    return (
      <a href={action.href} style={{ textDecoration: 'none', flexShrink: 0 }}>
        {btn}
      </a>
    );
  }

  return <Box sx={{ flexShrink: 0 }}>{btn}</Box>;
}
