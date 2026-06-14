import React, { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import type { SxProps, Theme } from '@mui/material/styles';
import { Button } from '../Button';
import { TextButton } from '../TextButton';
import { Dialog } from '../Dialog';
import { Alert } from '../Alert';
import { Icon } from '../Icon';

type SaveState = 'idle' | 'saving' | 'saved';

export interface StepperActionsProps {
  /** 1-based current step. Step 1 hides the back button. */
  step: number;
  /** When true, the next button renders without the trailing arrow icon. */
  isSubmitStep?: boolean;
  backLabel?: string;
  nextLabel?: string;
  cancelLabel?: string;
  exitDialogTitle?: string;
  exitDialogDescription?: string;
  exitDialogConfirmLabel?: string;
  exitDialogCancelLabel?: string;
  onBack?: () => void;
  onNext?: () => void;
  /** Called when the user confirms exit in the dialog. */
  onExit?: () => void;
  /** When true, shows a Save and exit button instead of Cancel and exit. */
  supportsSave?: boolean;
  saveLabel?: string;
  savingLabel?: string;
  savedLabel?: string;
  /** Async save handler. Component transitions idle → saving → saved automatically. */
  onSave?: () => Promise<void>;
  /** When true, the cancel/exit button calls onExit directly without showing the confirmation dialog. */
  skipExitDialog?: boolean;
  sx?: SxProps<Theme>;
}

export function StepperActions({
  step,
  isSubmitStep = false,
  backLabel = 'Back',
  nextLabel = 'Next',
  cancelLabel = 'Cancel and exit',
  exitDialogTitle = 'Are you sure?',
  exitDialogDescription = "You will lose any progress you've made, are you sure you want to exit",
  exitDialogConfirmLabel = 'Confirm',
  exitDialogCancelLabel = 'Cancel',
  onBack,
  onNext,
  onExit,
  supportsSave = false,
  saveLabel = 'Save and exit',
  savingLabel = 'Saving...',
  savedLabel = 'Progress saved',
  onSave,
  skipExitDialog = false,
  sx,
}: StepperActionsProps) {
  const [exitDialogOpen, setExitDialogOpen] = useState(false);
  const [saveState, setSaveState] = useState<SaveState>('idle');
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleExitClick() {
    if (skipExitDialog) {
      onExit?.();
      return;
    }
    setExitDialogOpen(true);
  }

  function handleExitConfirm() {
    setExitDialogOpen(false);
    onExit?.();
  }

  function handleExitClose() {
    setExitDialogOpen(false);
  }

  async function handleSaveClick() {
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    setSaveState('saving');
    try {
      await onSave?.();
    } finally {
      setSaveState('saved');
      saveTimerRef.current = setTimeout(() => setSaveState('idle'), 2000);
    }
  }

  return (
    <Box sx={sx}>
      <Divider />
      <Box
        sx={{
          mt: 4,
          pb: 4,
          display: 'flex',
          flexWrap: { xs: 'wrap', sm: 'nowrap' },
          alignItems: 'center',
          gap: 2,
        }}
      >
        {/* DOM-first so Back → Next → Cancel/Save is the keyboard tab order */}
        <Box
          sx={{
            order: { xs: 1, sm: 3 },
            display: 'flex',
            gap: 1.5,
            width: { xs: '100%', sm: 'auto' },
          }}
        >
          {step > 1 && (
            <Button
              label={backLabel}
              variant="outlined"
              color="primary"
              size="medium"
              onClick={onBack}
            />
          )}
          <Box sx={{ flexGrow: { xs: 1, sm: 0 } }}>
            <Button
              label={nextLabel}
              variant="contained"
              color="primary"
              size="medium"
              endIcon={isSubmitStep ? undefined : 'arrow-right'}
              onClick={onNext}
              sx={{ width: { xs: '100%', sm: 'auto' }, minWidth: { sm: '13rem' } }}
            />
          </Box>
        </Box>

        <Box sx={{ order: 2, flex: 1, display: { xs: 'none', sm: 'block' } }} />

        <Box
          sx={{
            order: { xs: 2, sm: 1 },
            width: { xs: '100%', sm: 'auto' },
            display: 'flex',
            justifyContent: { xs: 'center', sm: 'flex-start' },
          }}
        >
          {supportsSave ? (
            saveState === 'saved' ? (
              <Alert severity="success" message={savedLabel} icon={<Icon icon="circle-check" color="inherit" size="lg" />} />
            ) : (
              <TextButton
                label={saveState === 'saving' ? savingLabel : saveLabel}
                color="primary"
                size="medium"
                hideIcon
                loading={saveState === 'saving'}
                onClick={handleSaveClick}
              />
            )
          ) : (
            <TextButton
              label={cancelLabel}
              color="primary"
              size="medium"
              hideIcon
              onClick={handleExitClick}
            />
          )}
        </Box>
      </Box>

      {!supportsSave && (
        <Dialog
          open={exitDialogOpen}
          onClose={handleExitClose}
          title={exitDialogTitle}
          description={exitDialogDescription}
          variant="neutral"
          confirmLabel={exitDialogConfirmLabel}
          cancelLabel={exitDialogCancelLabel}
          onConfirm={handleExitConfirm}
        />
      )}
    </Box>
  );
}
