import { Dialog } from '../../components/Dialog';
import { StepIDV, canSubmitIDV } from './StepIDV';
import type { UseIdvGate } from './useIdvGate';

export interface IdvModalProps {
  open: boolean;
  onClose: () => void;
  /** IDV state machine from useIdvGate(). */
  gate: UseIdvGate;
  /** Called after a successful submit (the dialog also closes itself). */
  onVerified: () => void;
  /** Dialog heading. Defaults to "Verify your identity". */
  title?: string;
}

/**
 * Thin Dialog wrapper around StepIDV. The Submit action lives in the Dialog
 * footer (next to Cancel) via onConfirm; StepIDV's internal Submit is hidden
 * with `hideSubmit`. The footer Submit stays disabled until the form is valid.
 * Consumers handle open/close and the post-verification callback.
 */
export function IdvModal({ open, onClose, gate, onVerified, title = 'Verify your identity' }: IdvModalProps) {
  async function handleSubmit() {
    const success = await gate.submit();
    if (success) {
      onVerified();
      onClose();
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={title}
      size="medium"
      cancelLabel="Cancel"
      confirmLabel="Submit"
      onConfirm={handleSubmit}
      confirmDisabled={!canSubmitIDV(gate.idvState)}
      loading={gate.status === 'submitting'}
      mobileDisplay="dialog"
    >
      <StepIDV
        state={gate.idvState}
        onChange={gate.setIdvState}
        loading={gate.status === 'submitting'}
        error={gate.error}
        onSubmit={handleSubmit}
        embedded
        hideSubmit
      />
    </Dialog>
  );
}
