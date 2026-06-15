import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Alert } from '../../../components/Alert';
import { Button } from '../../../components/Button';
import { Card } from '../../../components/Card';
import { Checkbox } from '../../../components/Checkbox';
import { Icon } from '../../../components/Icon';
import { RadioGroup } from '../../../components/RadioGroup';
import { Select } from '../../../components/Select';
import { TextField } from '../../../components/TextField';
import { TextButton } from '../../../components/TextButton';
import { AUSTRALIAN_STATES } from '../constants';
import type { IDVDocument, IDVState } from '../types';

// ---------------------------------------------------------------------------
// Document selector tiles
// ---------------------------------------------------------------------------

interface DocumentOption {
  id: IDVDocument;
  label: string;
  icon: string;
}

const DOCUMENT_OPTIONS: DocumentOption[] = [
  { id: 'drivers-licence', label: 'Australian drivers licence', icon: 'car' },
  { id: 'medicare', label: 'Medicare card', icon: 'address-card' },
  { id: 'passport', label: 'Australian passport', icon: 'passport' },
];

interface DocumentTileProps {
  option: DocumentOption;
  selected: boolean;
  onSelect: (id: IDVDocument) => void;
}

function DocumentTile({ option, selected, onSelect }: DocumentTileProps) {
  return (
    <Box
      component="button"
      type="button"
      onClick={() => onSelect(option.id)}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        width: '100%',
        p: 2,
        border: '1px solid',
        borderColor: selected ? 'primary.main' : 'border.default',
        borderRadius: (t) => `${t.shape.md}px`,
        backgroundColor: selected ? 'primary.50' : 'background.paper',
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'border-color 0.15s, background-color 0.15s',
        '&:focus-visible': {
          outline: '2px solid',
          outlineColor: 'primary.main',
          outlineOffset: '2px',
        },
      }}
    >
      <Box
        sx={{
          width: '2.5rem',
          height: '2.5rem',
          borderRadius: '50%',
          backgroundColor: selected ? 'primary.main' : 'action.hover',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Box sx={selected ? { color: 'common.white', display: 'flex' } : { display: 'flex' }}>
          <Icon icon={option.icon} size="md" />
        </Box>
      </Box>
      <Typography variant="body" sx={{ color: 'text.primary' }}>
        {option.label}
      </Typography>
    </Box>
  );
}

// ---------------------------------------------------------------------------
// Per-document sub-forms
// ---------------------------------------------------------------------------

const MEDICARE_COLOUR_OPTIONS = [
  { value: 'green', label: 'Green' },
  { value: 'yellow', label: 'Yellow' },
  { value: 'blue', label: 'Blue' },
];

interface DriversLicenceFormProps {
  fields: IDVState['driversLicence'];
  onChange: (next: IDVState['driversLicence']) => void;
}

function DriversLicenceForm({ fields, onChange }: DriversLicenceFormProps) {
  function set(key: keyof IDVState['driversLicence'], value: string | boolean) {
    onChange({ ...fields, [key]: value });
  }
  return (
    <Stack spacing={2}>
      <Select
        label="State of issue"
        placeholder="Please select"
        fullWidth
        options={AUSTRALIAN_STATES}
        value={fields.stateOfIssue}
        onChange={(v) => set('stateOfIssue', v)}
      />
      <TextField
        label="Licence number"
        value={fields.licenceNumber}
        onChange={(e) => set('licenceNumber', e.target.value)}
      />
      <div>
        <TextField
          label="Card number"
          value={fields.cardNumber}
          onChange={(e) => set('cardNumber', e.target.value)}
        />
        <Typography variant="small" sx={{ color: 'text.secondary', mt: 0.5, display: 'block' }}>
          This is not the same as your license number
        </Typography>
      </div>
      <TextField
        label="Middle name"
        value={fields.middleName}
        disabled={fields.noMiddleName}
        onChange={(e) => set('middleName', e.target.value)}
      />
      <Checkbox
        label="I don't have a middle name"
        checked={fields.noMiddleName}
        onChange={(checked) => set('noMiddleName', checked)}
      />
    </Stack>
  );
}

interface MedicareFormProps {
  fields: IDVState['medicare'];
  onChange: (next: IDVState['medicare']) => void;
}

function MedicareForm({ fields, onChange }: MedicareFormProps) {
  function set(key: keyof IDVState['medicare'], value: string) {
    onChange({ ...fields, [key]: value });
  }
  return (
    <Stack spacing={2}>
      <RadioGroup
        legend="Card colour"
        options={MEDICARE_COLOUR_OPTIONS}
        value={fields.cardColour}
        direction="row"
        onChange={(v) => set('cardColour', v)}
      />
      <TextField
        label="Card number"
        value={fields.cardNumber}
        onChange={(e) => set('cardNumber', e.target.value)}
      />
      <TextField
        label="Reference number"
        value={fields.referenceNumber}
        onChange={(e) => set('referenceNumber', e.target.value)}
      />
      <TextField
        label="Name as per Medicare Card"
        value={fields.nameOnCard}
        onChange={(e) => set('nameOnCard', e.target.value)}
      />
      <TextField
        label="Expiry date"
        placeholder="MM/YYYY"
        value={fields.expiryDate}
        onChange={(e) => set('expiryDate', e.target.value)}
      />
    </Stack>
  );
}

interface PassportFormProps {
  fields: IDVState['passport'];
  onChange: (next: IDVState['passport']) => void;
}

function PassportForm({ fields, onChange }: PassportFormProps) {
  function set(key: keyof IDVState['passport'], value: string | boolean) {
    onChange({ ...fields, [key]: value });
  }
  return (
    <Stack spacing={2}>
      <TextField
        label="Reference number"
        value={fields.referenceNumber}
        onChange={(e) => set('referenceNumber', e.target.value)}
      />
      <TextField
        label="Middle name"
        value={fields.middleName}
        disabled={fields.noMiddleName}
        onChange={(e) => set('middleName', e.target.value)}
      />
      <Checkbox
        label="I don't have a middle name"
        checked={fields.noMiddleName}
        onChange={(checked) => set('noMiddleName', checked)}
      />
    </Stack>
  );
}

// ---------------------------------------------------------------------------
// Validation helpers
// ---------------------------------------------------------------------------

function isDocumentFormValid(state: IDVState): boolean {
  if (state.selectedDocument === 'drivers-licence') {
    const d = state.driversLicence;
    return d.stateOfIssue !== '' && d.licenceNumber !== '' && d.cardNumber !== '';
  }
  if (state.selectedDocument === 'medicare') {
    const m = state.medicare;
    return (
      m.cardColour !== '' &&
      m.cardNumber !== '' &&
      m.referenceNumber !== '' &&
      m.nameOnCard !== '' &&
      m.expiryDate !== ''
    );
  }
  if (state.selectedDocument === 'passport') {
    return state.passport.referenceNumber !== '';
  }
  return false;
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

const DOCUMENT_HEADINGS: Record<string, string> = {
  'drivers-licence': 'Licence details',
  medicare: 'Medicare Card',
  passport: 'Australian Passport',
};

export interface StepIDVProps {
  state: IDVState;
  onChange: (next: IDVState) => void;
  onSubmit: () => void;
  loading: boolean;
  error: string;
  /** When true, suppresses the page-level heading (use when rendered inside a Modal) */
  embedded?: boolean;
}

export function StepIDV({ state, onChange, onSubmit, loading, error, embedded = false }: StepIDVProps) {
  const canSubmit = state.selectedDocument !== '' && isDocumentFormValid(state);

  return (
    <Stack spacing={3}>
      {!embedded && (
        <div>
          <Typography variant="h2" component="h1" sx={{ mb: 1 }}>
            Proof of identity
          </Typography>
          <Typography variant="body" sx={{ color: 'text.primary' }}>
            To make payments to this product we are required to verify your identity.
          </Typography>
        </div>
      )}

      {/* Document selector card */}
      <Card variant={embedded ? 'open' : 'border'}>
        <Stack spacing={3}>
          <div>
            <Typography variant="h5" sx={{ mb: 1.5 }}>
              Select one of these documents to confirm your identity.
            </Typography>
            <Stack spacing={1.5}>
              {DOCUMENT_OPTIONS.map((opt) => (
                <DocumentTile
                  key={opt.id}
                  option={opt}
                  selected={state.selectedDocument === opt.id}
                  onSelect={(id) => onChange({ ...state, selectedDocument: id })}
                />
              ))}
            </Stack>
            <Typography variant="small" sx={{ color: 'text.primary', mt: 2, display: 'block' }}>
              If you don&apos;t have any of the above please{' '}
              <Box component="a" href="#" sx={{ color: 'primary.main' }}>
                contact us
              </Box>{' '}
              so we can help.
            </Typography>

            {/* Document sub-form — grey box, 32px below tiles */}
            {state.selectedDocument !== '' && (
              <Box
                sx={{
                  mt: 4,
                  backgroundColor: 'action.hover',
                  borderRadius: (t) => `${t.shape.md}px`,
                  p: 3,
                }}
              >
                <Stack spacing={3}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h5">
                      {DOCUMENT_HEADINGS[state.selectedDocument]}
                    </Typography>
                    <TextButton label="Need help?" startIcon="circle-info" hideIcon={false} onClick={() => {}} />
                  </Box>

                  {state.selectedDocument === 'drivers-licence' && (
                    <DriversLicenceForm
                      fields={state.driversLicence}
                      onChange={(next) => onChange({ ...state, driversLicence: next })}
                    />
                  )}
                  {state.selectedDocument === 'medicare' && (
                    <MedicareForm
                      fields={state.medicare}
                      onChange={(next) => onChange({ ...state, medicare: next })}
                    />
                  )}
                  {state.selectedDocument === 'passport' && (
                    <PassportForm
                      fields={state.passport}
                      onChange={(next) => onChange({ ...state, passport: next })}
                    />
                  )}
                </Stack>
              </Box>
            )}
          </div>

          {/* Declaration */}
          {state.selectedDocument !== '' && (
            <Stack spacing={2}>
              <Typography variant="h5">Declaration</Typography>
              <Typography variant="body" sx={{ color: 'text.primary' }}>
                With your consent, Australian Retirement Trust can use the Equifax IDMatrix to
                verify your identity electronically. This program uses data held in places such
                as the electoral role, White Pages, The Passport office and Equifax credit
                information files to verify your details.
              </Typography>
              <Typography variant="body" sx={{ color: 'text.primary' }}>
                As part of the electronic verification process, your document details (for
                example your driver&apos;s license number) will be submitted to the Australian
                Government&apos;s Document Verification Service (DVS). The DVS is a national
                online system that allows organisations to verify the authenticity of
                Australian identity documents.
              </Typography>
              <Box
                sx={{
                  backgroundColor: 'action.hover',
                  borderRadius: (t) => `${t.shape.md}px`,
                  p: 2,
                }}
              >
                <Typography variant="small" sx={{ color: 'text.primary' }}>
                  By clicking submit, you consent to the above declaration.
                </Typography>
              </Box>

              {error && <Alert severity="error" message={error} />}

              <Box sx={{ display: 'flex', justifyContent: embedded ? 'flex-end' : 'flex-start' }}>
                <Button
                  label="Submit"
                  disabled={!canSubmit}
                  loading={loading}
                  onClick={onSubmit}
                />
              </Box>
            </Stack>
          )}
        </Stack>
      </Card>
    </Stack>
  );
}
