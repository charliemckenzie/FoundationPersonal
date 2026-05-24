import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import { ThemeSwitcher } from '../../components/MemberOnline';
import type { ThemeMode } from '../../app/themes/ThemeModeContext';

type Size = 'small' | 'medium';

const meta: Meta<typeof ThemeSwitcher> = {
  title: 'Member Online / Target State / ThemeSwitcher',
  component: ThemeSwitcher,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Segmented control for switching between light and dark mode. Controlled — the host owns the `mode` value. Used in MemberHeader and MobileNavDrawer.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ThemeSwitcher>;

function Demo({ iconOnly = false, size = 'small' }: { iconOnly?: boolean; size?: Size }) {
  const [mode, setMode] = useState<ThemeMode>('light');
  return <ThemeSwitcher mode={mode} onChange={setMode} iconOnly={iconOnly} size={size} />;
}

export const Default: Story = {
  render: () => <Demo />,
};

export const IconOnly: Story = {
  render: () => <Demo iconOnly />,
};

export const Sizes: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2 }}>
      <Demo size="small" />
      <Demo size="medium" />
    </Box>
  ),
};
