'use client';

import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { keyframes } from '@mui/system';

const toLeft = keyframes`
  from { opacity: 1; transform: translateX(0); }
  to   { opacity: 0; transform: translateX(-24px); }
`;
const fromRight = keyframes`
  from { opacity: 0; transform: translateX(24px); }
  to   { opacity: 1; transform: translateX(0); }
`;
const toRight = keyframes`
  from { opacity: 1; transform: translateX(0); }
  to   { opacity: 0; transform: translateX(24px); }
`;
const fromLeft = keyframes`
  from { opacity: 0; transform: translateX(-24px); }
  to   { opacity: 1; transform: translateX(0); }
`;

export type StepDirection = 'forward' | 'backward';

export interface StepTransitionProps {
  /** Current step index. Changing this value triggers the transition. */
  step: number;
  /**
   * Direction of travel. Optional — by default the component infers it by
   * comparing the new step to the previous one (a higher index slides forward).
   * Pass this only to override the inferred direction for non-linear navigation.
   */
  direction?: StepDirection;
  /** Called once the enter animation has finished and the new step is fully visible. */
  onEntered?: () => void;
  children: ReactNode;
}

interface Slot {
  step: number;
  el: ReactNode;
}

export function StepTransition({ step, direction, onEntered, children }: StepTransitionProps) {
  const theme = useTheme();
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const exitMs = theme.transitions.duration.leavingScreen;
  const enterMs = theme.transitions.duration.enteringScreen;
  const exitEase = theme.transitions.easing.easeIn;
  const enterEase = theme.transitions.easing.easeOut;

  const [slot, setSlot] = useState<Slot>({ step, el: children });
  const [phase, setPhase] = useState<'idle' | 'exit' | 'enter'>('idle');
  // Captured when a transition starts so it stays stable across the exit → enter
  // phases — it can't be derived live because slot.step changes mid-transition.
  const [activeDir, setActiveDir] = useState<StepDirection>('forward');

  // Always holds the latest incoming content so the deferred swap (which fires up to
  // one exit-duration later) lands on the newest children rather than a stale closure.
  const incomingRef = useRef<Slot>({ step, el: children });
  useEffect(() => {
    incomingRef.current = { step, el: children };
  });

  const genRef = useRef(0);
  const enterTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const onEnteredRef = useRef(onEntered);
  useEffect(() => { onEnteredRef.current = onEntered; });

  // Tracks the children last seen while idle and step-matched — i.e. the live content
  // for the step currently on screen. Used during exit so the sliding-out content always
  // reflects current props rather than the stale snapshot captured in slot.el.
  const prevChildrenRef = useRef<ReactNode>(children);
  if (phase === 'idle' && step === slot.step) {
    prevChildrenRef.current = children;
  }

  // Height animation: outer shell holds an explicit pixel height that ResizeObserver
  // keeps in sync with the inner content. CSS transition on the shell means any height
  // change (triggered by a content swap) animates instead of jumping.
  const shellRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const shell = shellRef.current;
    const content = contentRef.current;
    if (!shell || !content) return;

    // Prime the explicit height synchronously so the first ResizeObserver callback
    // doesn't animate from 0.
    shell.style.height = `${content.offsetHeight}px`;

    const ro = new ResizeObserver(([entry]) => {
      shell.style.height = `${Math.round(entry.contentRect.height)}px`;
    });
    ro.observe(content);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (step === slot.step) return;

    window.scrollTo({ top: 0, behavior: 'instant' });

    // Infer direction unless the caller overrides it. slot.step is the step
    // currently on screen, so this stale read is intentional and correct. The
    // setState here orchestrates the animation in response to a prop change —
    // the same reason setPhase/setSlot below also run inside this effect.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActiveDir(direction ?? (step > slot.step ? 'forward' : 'backward'));

    // Respect reduced-motion: swap content instantly, no slide/fade/height tween.
    if (reduceMotion) {
      setSlot({ ...incomingRef.current });
      setPhase('idle');
      onEnteredRef.current?.();
      return;
    }

    const gen = ++genRef.current;
    setPhase('exit');

    const exitTimer = setTimeout(() => {
      if (gen !== genRef.current) return;
      setSlot({ ...incomingRef.current });
      setPhase('enter');
      enterTimerRef.current = setTimeout(() => {
        if (gen !== genRef.current) return;
        setPhase('idle');
        onEnteredRef.current?.();
      }, enterMs);
    }, exitMs);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(enterTimerRef.current);
    };
    // slot.step intentionally omitted — including it would re-run the cleanup
    // mid-transition and clear the enter timer before it fires.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, direction, reduceMotion, exitMs, enterMs]);

  const exitAnim  = activeDir === 'forward' ? toLeft    : toRight;
  const enterAnim = activeDir === 'forward' ? fromRight : fromLeft;

  const animStr =
    phase === 'exit'  ? `${exitAnim}  ${exitMs}ms  ${exitEase}  forwards` :
    phase === 'enter' ? `${enterAnim} ${enterMs}ms ${enterEase} forwards` :
    undefined;

  return (
    <Box
      ref={shellRef}
      sx={{ overflow: phase === 'idle' ? 'visible' : 'hidden', transition: reduceMotion ? 'none' : `height ${enterMs}ms ${enterEase}` }}
    >
      <Box
        ref={contentRef}
        sx={{
          ...(animStr && { animation: animStr }),
          ...(phase !== 'idle' && { willChange: 'transform, opacity' }),
        }}
      >
        {(phase === 'exit' || (phase === 'idle' && step !== slot.step)) ? prevChildrenRef.current : children}
      </Box>
    </Box>
  );
}
