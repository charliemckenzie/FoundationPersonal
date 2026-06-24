import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Accordion } from '../../components/Accordion';
import { Dialog } from '../../components/Dialog';

export interface IdDocumentsModalProps {
  open: boolean;
  onClose: () => void;
}

function DocList({ items }: { items: string[] }) {
  return (
    <Box component="ul" sx={{ m: 0, pl: 3, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
      {items.map((item) => (
        <Typography key={item} component="li" variant="body" sx={{ color: 'text.primary' }}>
          {item}
        </Typography>
      ))}
    </Box>
  );
}

const accordionItems = [
  {
    id: 'which-documents',
    title: 'Which documents can I use?',
    content: (
      <Stack spacing={2}>
        <div>
          <Typography variant="body" sx={{ fontWeight: 700, color: 'text.primary', display: 'block', mb: 0.5 }}>
            Selfie ID — one of:
          </Typography>
          <DocList items={[
            'Current Australian or foreign driver\'s licence (front and back)',
            'Current Australian state/territory photo ID or Proof of Age card',
            'Passport — signature and details page (Australian passports may be expired up to 2 years)',
          ]} />
        </div>
        <div>
          <Typography variant="body" sx={{ fontWeight: 700, color: 'text.primary', display: 'block', mb: 0.5 }}>
            Certified ID — one of:
          </Typography>
          <DocList items={[
            'One primary photo ID (as listed above), OR',
            'One secondary document (birth or citizenship certificate, Services Australia pension/health-care card) AND two proof-of-address documents dated recently',
          ]} />
          <Typography variant="body" sx={{ color: 'text.secondary', display: 'block', mt: 1 }}>
            Accepted address documents: Services Australia benefit notice or ATO notice (within 12 months); council rates or electricity/gas bill (within 3 months).
          </Typography>
        </div>
      </Stack>
    ),
  },
  {
    id: 'who-can-certify',
    title: 'Who can certify my documents?',
    content: (
      <Stack spacing={1.5}>
        <Typography variant="body" sx={{ color: 'text.primary' }}>
          The following people can certify your documents in Australia:
        </Typography>
        <DocList items={[
          'Justice of the Peace (JP)',
          'Commissioner for Declarations',
          'Legal practitioner (solicitor or barrister)',
          'Police officer',
          'Pharmacist',
          'Medical practitioner (doctor)',
          'Accountant (2+ years continuous service)',
          'Bank or financial institution officer (2+ years continuous service)',
          'Australia Post employee (2+ years continuous service)',
        ]} />
        <Typography variant="body" sx={{ color: 'text.primary' }}>
          If you are overseas, equivalent authorised officials in that country may certify your documents.
        </Typography>
      </Stack>
    ),
  },
  {
    id: 'how-to-certify',
    title: 'How should a certified copy look?',
    content: (
      <Stack spacing={1}>
        <Typography variant="body" sx={{ color: 'text.primary' }}>
          The certifier must:
        </Typography>
        <DocList items={[
          'Write or stamp "certified true copy of the original" on each page',
          'Sign and date the document',
          'Add their full name, title, and contact address',
          'Include evidence of their status — registration number, employer stamp, or professional stamp',
        ]} />
      </Stack>
    ),
  },
  {
    id: 'not-english',
    title: 'Documents not in English?',
    content: (
      <Typography variant="body" sx={{ color: 'text.primary' }}>
        Documents not in English must be translated by a NAATI-accredited translator. Find one at{' '}
        <Box
          component="a"
          href="https://www.naati.com.au"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: 'primary.main', textDecoration: 'underline' }}
        >
          naati.com.au
        </Box>
        .
      </Typography>
    ),
  },
  {
    id: 'not-accepted',
    title: "What's NOT accepted?",
    content: (
      <Stack spacing={1}>
        <DocList items={[
          'Bank, credit, or debit cards',
          'Private health insurance cards',
          'Library cards',
          'Digital driver\'s licences (only accepted in person at a Member Centre)',
        ]} />
      </Stack>
    ),
  },
];

export function IdDocumentsModal({ open, onClose }: IdDocumentsModalProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Proof of identity — acceptable documents"
      size="medium"
      confirmLabel="Close"
      onConfirm={onClose}
      hideCancel
      hideIcon
    >
      <Stack spacing={2}>
        <Typography variant="body" sx={{ color: 'text.primary' }}>
          Use the sections below to find out which documents are accepted and how to get them certified.
        </Typography>
        <Accordion items={accordionItems} />
      </Stack>
    </Dialog>
  );
}
