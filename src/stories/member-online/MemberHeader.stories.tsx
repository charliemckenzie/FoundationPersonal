import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { MemberHeader } from '../../components/MemberOnline';
import { MOCK_USER } from './mockData';
import type { ThemeMode } from '../../app/themes/ThemeModeContext';

const meta: Meta<typeof MemberHeader> = {
  title: 'Member Online / Target State / MemberHeader',
  component: MemberHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Desktop top bar: search, user chip, theme switcher, log-out. Controlled — host owns `mode` and `searchValue`.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MemberHeader>;

function Demo({ hideSearch = false }) {
  const [mode, setMode] = useState<ThemeMode>('light');
  const [search, setSearch] = useState('');
  return (
    <MemberHeader
      user={MOCK_USER}
      mode={mode}
      onModeChange={setMode}
      searchValue={search}
      onSearchChange={setSearch}
      hideSearch={hideSearch}
    />
  );
}

export const Default: Story = {
  render: () => <Demo />,
};

export const WithoutSearch: Story = {
  render: () => <Demo hideSearch />,
};
