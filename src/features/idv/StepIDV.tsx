import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Alert } from '../../components/Alert';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Checkbox } from '../../components/Checkbox';
import { RadioGroup, type RadioOption } from '../../components/RadioGroup';
import { Select } from '../../components/Select';
import { TextField } from '../../components/TextField';
import { TextButton } from '../../components/TextButton';
import { AUSTRALIAN_STATES, MEDICARE_COLOUR_OPTIONS } from './constants';
import type { IDVDocument, IDVState } from './types';

// ---------------------------------------------------------------------------
// Document selector
// ---------------------------------------------------------------------------

const DOCUMENT_OPTIONS: RadioOption[] = [
  { value: 'drivers-licence', label: 'Drivers licence', icon: 'car' },
  { value: 'medicare', label: 'Medicare card', icon: 'address-card' },
  { value: 'passport', label: 'Passport', icon: 'passport' },
];

// ---------------------------------------------------------------------------
// Per-document sub-forms
// ---------------------------------------------------------------------------

interface DriversLicenceFormProps {
  fields: IDVState['driversLicence'];
  onChange: (next: IDVState['driversLicence']) => void;
}

interface LicenceStateConfig {
  /** Label for the secondary number — QLD calls it a reference number. */
  secondaryLabel: string;
  /** Where to find that number on the card (prototype approximations). */
  secondaryHelper: string;
}

// Per-state driver licence rules. Most states use a "Card number"; Queensland
// uses a "Reference number". The location guidance differs by state.
const LICENCE_STATE_CONFIG: Record<string, LicenceStateConfig> = {
  ACT: { secondaryLabel: 'Card number', secondaryHelper: 'On the front of your licence, below the licence number.' },
  NSW: { secondaryLabel: 'Card number', secondaryHelper: 'The 10-digit number on the front, lower right.' },
  NT: { secondaryLabel: 'Card number', secondaryHelper: 'On the back of your licence.' },
  QLD: { secondaryLabel: 'Reference number', secondaryHelper: 'The 10-digit reference number on the back of your licence.' },
  SA: { secondaryLabel: 'Card number', secondaryHelper: 'On the back of your licence, near the barcode.' },
  TAS: { secondaryLabel: 'Card number', secondaryHelper: 'On the back of your licence.' },
  VIC: { secondaryLabel: 'Card number', secondaryHelper: 'On the back of your licence, above the barcode.' },
  WA: { secondaryLabel: 'Card number', secondaryHelper: 'On the front of your licence, below the expiry date.' },
};

function DriversLicenceForm({ fields, onChange }: DriversLicenceFormProps) {
  function set(key: keyof IDVState['driversLicence'], value: string | boolean) {
    onChange({ ...fields, [key]: value });
  }
  const stateConfig = LICENCE_STATE_CONFIG[fields.stateOfIssue];
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
      {/* Dependent fields appear once a state is chosen; the secondary number adapts to it. */}
      {stateConfig && (
        <>
          <TextField
            label="Licence number"
            value={fields.licenceNumber}
            onChange={(e) => set('licenceNumber', e.target.value)}
          />
          <TextField
            label={stateConfig.secondaryLabel}
            value={fields.cardNumber}
            helperText={stateConfig.secondaryHelper}
            onChange={(e) => set('cardNumber', e.target.value)}
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
        </>
      )}
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

/** True when a document is selected and its sub-form is complete enough to submit. */
export function canSubmitIDV(state: IDVState): boolean {
  return state.selectedDocument !== '' && isDocumentFormValid(state);
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
  /** When true, the internal Submit button is not rendered — the host chrome
   * (e.g. a Dialog footer) owns the submit action instead. */
  hideSubmit?: boolean;
}

export function StepIDV({ state, onChange, onSubmit, loading, error, embedded = false, hideSubmit = false }: StepIDVProps) {
  const canSubmit = canSubmitIDV(state);

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
              Select a document
            </Typography>
            <Box
              sx={{
                // Stretch the radio group to the full container width, then split it
                // into equal-width document cards (each flexes to a third of the row).
                '& .MuiFormControl-root': { width: '100%' },
                '& .MuiRadioGroup-root': { width: '100%', flexWrap: 'nowrap' },
                '& .MuiFormControlLabel-root': { flex: 1, minWidth: 0 },
              }}
            >
              <RadioGroup
                variant="card"
                direction="row"
                cardDirection="column"
                options={DOCUMENT_OPTIONS}
                value={state.selectedDocument}
                onChange={(value) =>
                  onChange({ ...state, selectedDocument: value as IDVDocument })
                }
              />
            </Box>
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

              {!hideSubmit && (
                <Box sx={{ display: 'flex', justifyContent: embedded ? 'flex-end' : 'flex-start' }}>
                  <Button
                    label="Submit"
                    disabled={!canSubmit}
                    loading={loading}
                    onClick={onSubmit}
                  />
                </Box>
              )}
            </Stack>
          )}
        </Stack>
      </Card>
    </Stack>
  );
}
