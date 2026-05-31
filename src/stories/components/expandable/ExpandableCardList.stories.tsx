import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ExpandableCardList } from '../../../components/ExpandableCardList';
import type { ExpandableCardItem } from '../../../components/ExpandableCardList';

const meta: Meta<typeof ExpandableCardList> = {
  title: 'Components / Expandable / ExpandableCardList',
  component: ExpandableCardList,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A list of expandable cards, one open at a time, each with a custom header summary and an optional sibling action (e.g. Remove). The disclosure and the action are separate, sibling buttons — never nested — so the header is fully keyboard and screen-reader accessible. Controlled via `expandedId` / `onExpandedChange`.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ExpandableCardList>;

const PEOPLE = [
  { id: 'p-1', name: 'Sarah Chen', relationship: 'Spouse', dob: '12 Mar 1985', allocation: 60 },
  { id: 'p-2', name: 'James Okafor', relationship: 'Child', dob: '4 Aug 2010', allocation: 40 },
  { id: 'p-3', name: 'Morgan Lee', relationship: 'Financial dependant', dob: '9 Jan 1992', allocation: 0 },
];

function PersonHeader({ name, relationship, dob }: { name: string; relationship: string; dob: string }) {
  return (
    <Box component="span" sx={{ display: 'block', minWidth: 0 }}>
      <Typography component="span" variant="body" sx={{ fontWeight: 700, display: 'block' }}>{name}</Typography>
      <Typography component="span" variant="small" sx={{ color: 'text.muted', display: 'block' }}>{relationship} · {dob}</Typography>
    </Box>
  );
}

export const Default: Story = {
  render: () => {
    function Demo() {
      const [people, setPeople] = useState(PEOPLE.slice(0, 2));
      const [expandedId, setExpandedId] = useState('p-1');

      const items: ExpandableCardItem[] = people.map((p) => ({
        id: p.id,
        renderHeader: (expanded) =>
          expanded ? (
            <Typography component="span" variant="body" sx={{ fontWeight: 700, display: 'block' }}>{p.name}</Typography>
          ) : (
            <PersonHeader name={p.name} relationship={p.relationship} dob={p.dob} />
          ),
        renderAside: (expanded) =>
          !expanded ? (
            <Typography component="span" variant="small" sx={{ color: 'text.muted', whiteSpace: 'nowrap' }}>
              Allocation{' '}
              <Typography component="span" variant="small" sx={{ fontWeight: 700, color: 'text.primary' }}>{p.allocation}%</Typography>
            </Typography>
          ) : null,
        content: (
          <Typography variant="body" color="text.muted">
            Form fields for {p.name} would go here. Collapsing this card removes its fields from the tab order.
          </Typography>
        ),
        action: {
          icon: 'trash',
          label: `Remove ${p.name}`,
          onClick: () => {
            const next = people.filter((x) => x.id !== p.id);
            setPeople(next);
            if (expandedId === p.id) setExpandedId(next[0]?.id ?? '');
          },
        },
      }));

      return <ExpandableCardList items={items} expandedId={expandedId} onExpandedChange={setExpandedId} />;
    }
    return <Demo />;
  },
};

export const NoAction: Story = {
  name: 'Without action',
  render: () => {
    function Demo() {
      const [expandedId, setExpandedId] = useState('p-1');
      const items: ExpandableCardItem[] = PEOPLE.slice(0, 2).map((p) => ({
        id: p.id,
        renderHeader: () => (
          <Typography component="span" variant="body" sx={{ fontWeight: 700, display: 'block' }}>{p.name}</Typography>
        ),
        content: (
          <Typography variant="body" color="text.muted">Details for {p.name}.</Typography>
        ),
      }));
      return <ExpandableCardList items={items} expandedId={expandedId} onExpandedChange={setExpandedId} />;
    }
    return <Demo />;
  },
};

export const AsHeadings: Story = {
  name: 'With heading semantics',
  parameters: {
    docs: {
      description: {
        story: 'Pass `headingLevel` to wrap each disclosure button in a heading so the cards appear in the document outline. Use only when the cards genuinely represent document sections.',
      },
    },
  },
  render: () => {
    function Demo() {
      const [expandedId, setExpandedId] = useState('p-1');
      const items: ExpandableCardItem[] = PEOPLE.slice(0, 2).map((p) => ({
        id: p.id,
        renderHeader: () => (
          <Typography component="span" variant="body" sx={{ fontWeight: 700, display: 'block' }}>{p.name}</Typography>
        ),
        content: (
          <Typography variant="body" color="text.muted">Details for {p.name}.</Typography>
        ),
      }));
      return <ExpandableCardList items={items} expandedId={expandedId} onExpandedChange={setExpandedId} headingLevel={3} />;
    }
    return <Demo />;
  },
};
