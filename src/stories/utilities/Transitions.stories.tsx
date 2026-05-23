import { useRef, useCallback } from 'react'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'

// ─── Duration table ────────────────────────────────────────────────────────

const DURATION_ROWS: Array<{ key: string; custom?: boolean; description: string }> = [
  { key: 'shortest',       description: 'Fastest — icon state changes' },
  { key: 'shorter',        description: 'Quick element reveals' },
  { key: 'standard',       description: 'Default — most transitions' },
  { key: 'complex',        description: 'Multi-part animations' },
  { key: 'enteringScreen', description: 'Elements entering the viewport' },
  { key: 'leavingScreen',  description: 'Elements leaving the viewport' },
  { key: 'form',           custom: true, description: 'Form micro-interactions — checkbox, radio, file upload' },
  { key: 'spring',         custom: true, description: 'Spring-like slide — form progress track' },
]

const EASING_ROWS: Array<{ key: string; custom?: boolean; description: string }> = [
  { key: 'easeInOut', description: 'Standard — most UI motion' },
  { key: 'easeOut',   description: 'Elements entering from off-screen' },
  { key: 'easeIn',    description: 'Elements leaving to off-screen' },
  { key: 'sharp',     description: 'Utility motion (drawers, panels)' },
  { key: 'spring',    custom: true, description: 'Overshoot — tabs indicator' },
]

// ─── Race track helpers ────────────────────────────────────────────────────

/**
 * Fire a fresh CSS transition on an element using `left`.
 * `100%` in a `left` value is relative to the containing block width — correct for our tracks.
 * Steps: remove transition → snap to start → force reflow → re-add transition → animate to end.
 * Must use direct DOM manipulation — React batching prevents this working via state.
 */
function animateTrack(el: HTMLElement, duration: number, easing: string, forward: boolean) {
  el.style.transition = 'none'
  el.style.left = forward ? '0px' : 'calc(100% - 2.5rem)'
  // Force reflow so the browser registers the snapped position
  el.getBoundingClientRect()
  el.style.transition = `left ${duration}ms ${easing}`
  el.style.left = forward ? 'calc(100% - 2.5rem)' : '0px'
}

function resetTrack(el: HTMLElement) {
  el.style.transition = 'none'
  el.style.left = '0px'
}

// ─── Duration race demo ────────────────────────────────────────────────────

interface DurationRaceProps {
  durations: Record<string, number>
  easing: string
}

function DurationRace({ durations, easing }: DurationRaceProps) {
  const trackRefs = useRef<Map<string, HTMLDivElement>>(new Map())
  const forward   = useRef(true)

  const setRef = useCallback((key: string) => (el: HTMLDivElement | null) => {
    if (el) trackRefs.current.set(key, el)
    else trackRefs.current.delete(key)
  }, [])

  const play = (key: string) => {
    const el = trackRefs.current.get(key)
    if (!el) return
    animateTrack(el, durations[key] ?? 300, easing, forward.current)
  }

  const playAll = () => {
    const dir = forward.current
    trackRefs.current.forEach((el, key) => {
      animateTrack(el, durations[key] ?? 300, easing, dir)
    })
    forward.current = !dir
  }

  const reset = () => {
    forward.current = true
    trackRefs.current.forEach((el) => resetTrack(el))
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap', alignItems: 'center' }}>
        <Typography variant="small" color="text.muted" sx={{ mr: 1 }}>
          Click a token to run it individually, or:
        </Typography>
        <BtnAction onClick={playAll} label="Race all" primary />
        <BtnAction onClick={reset}   label="Reset" />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {DURATION_ROWS.map(({ key, custom }) => {
          const ms = durations[key]
          return (
            <Box key={key} sx={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 2, alignItems: 'center' }}>
              {/* Label / button */}
              <Box
                component="button"
                onClick={() => play(key)}
                sx={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  px: 1.25, py: 0.5,
                  border: '1px solid', borderColor: custom ? 'primary.main' : 'border.input',
                  borderRadius: '4px',
                  bgcolor: custom ? 'primary.background' : 'background.paper',
                  color: custom ? 'primary.dark' : 'text.primary',
                  fontSize: '0.8125rem', fontFamily: 'monospace',
                  cursor: 'pointer', textAlign: 'left', gap: 1,
                }}
              >
                <span>{key}</span>
                <Typography variant="small" sx={{ fontFamily: 'monospace', color: 'text.muted' }}>
                  {ms}ms
                </Typography>
              </Box>

              {/* Track */}
              <Box
                sx={{
                  position: 'relative', height: '2.5rem',
                  bgcolor: 'background.elevated',
                  border: '1px solid', borderColor: 'divider',
                  borderRadius: 1, overflow: 'hidden',
                }}
              >
                <Box
                  ref={setRef(key)}
                  sx={{
                    position: 'absolute', top: 0, left: 0,
                    width: '2.5rem', height: '100%',
                    bgcolor: custom ? 'primary.main' : 'secondary.main',
                    borderRadius: '4px',
                  }}
                />
              </Box>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

// ─── Easing demo ──────────────────────────────────────────────────────────

interface EasingDemoProps {
  easings: Record<string, string>
  duration: number
}

function EasingDemo({ easings, duration }: EasingDemoProps) {
  const trackRefs = useRef<Map<string, HTMLDivElement>>(new Map())
  const forward   = useRef(true)

  const setRef = useCallback((key: string) => (el: HTMLDivElement | null) => {
    if (el) trackRefs.current.set(key, el)
    else trackRefs.current.delete(key)
  }, [])

  const play = (key: string) => {
    const el = trackRefs.current.get(key)
    if (!el) return
    animateTrack(el, duration, easings[key] ?? easings.easeInOut, forward.current)
  }

  const playAll = () => {
    const dir = forward.current
    trackRefs.current.forEach((el, key) => {
      animateTrack(el, duration, easings[key] ?? easings.easeInOut, dir)
    })
    forward.current = !dir
  }

  const reset = () => {
    forward.current = true
    trackRefs.current.forEach((el) => resetTrack(el))
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap', alignItems: 'center' }}>
        <Typography variant="small" color="text.muted" sx={{ mr: 1 }}>
          All run at {duration}ms — only the curve differs:
        </Typography>
        <BtnAction onClick={playAll} label="Race all" primary />
        <BtnAction onClick={reset}   label="Reset" />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {EASING_ROWS.map(({ key, custom }) => {
          const curve = easings[key]
          return (
            <Box key={key} sx={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 2, alignItems: 'center' }}>
              <Box
                component="button"
                onClick={() => play(key)}
                sx={{
                  display: 'flex', alignItems: 'center',
                  px: 1.25, py: 0.5,
                  border: '1px solid', borderColor: custom ? 'primary.main' : 'border.input',
                  borderRadius: '4px',
                  bgcolor: custom ? 'primary.background' : 'background.paper',
                  color: custom ? 'primary.dark' : 'text.primary',
                  fontSize: '0.8125rem', fontFamily: 'monospace',
                  cursor: 'pointer', textAlign: 'left',
                }}
              >
                {key}
              </Box>

              <Box
                sx={{
                  position: 'relative', height: '2.5rem',
                  bgcolor: 'background.elevated',
                  border: '1px solid', borderColor: 'divider',
                  borderRadius: 1, overflow: 'hidden',
                }}
                title={curve}
              >
                <Box
                  ref={setRef(key)}
                  sx={{
                    position: 'absolute', top: 0, left: 0,
                    width: '2.5rem', height: '100%',
                    bgcolor: custom ? 'primary.main' : 'secondary.main',
                    borderRadius: '4px',
                  }}
                />
              </Box>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

// ─── Reusable action button ────────────────────────────────────────────────

function BtnAction({ onClick, label, primary }: { onClick: () => void; label: string; primary?: boolean }) {
  return (
    <Box
      component="button"
      onClick={onClick}
      sx={{
        px: 1.5, py: 0.5,
        border: '1px solid',
        borderColor: primary ? 'primary.main' : 'border.input',
        borderRadius: '4px',
        bgcolor: primary ? 'primary.main' : 'background.paper',
        color: primary ? 'primary.contrastText' : 'text.primary',
        fontSize: '0.8125rem', fontFamily: 'inherit',
        cursor: 'pointer',
      }}
    >
      {label}
    </Box>
  )
}

// ─── Main doc ─────────────────────────────────────────────────────────────

function TransitionsDoc() {
  const theme     = useTheme()
  const durations = theme.transitions.duration as Record<string, number>
  const easings   = theme.transitions.easing   as Record<string, string>

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 1 }}>Transitions</Typography>
      <Typography variant="body" color="text.muted" sx={{ mb: 0.5 }}>
        Duration and easing tokens for all animated UI changes. Use{' '}
        <code>theme.transitions.create()</code> in <code>sx</code> or{' '}
        <code>styleOverrides</code> — never hardcode values.
      </Typography>
      <Typography variant="small" color="text.muted" component="p" sx={{ mb: 4, fontFamily: 'monospace' }}>
        {"t.transitions.create(['opacity'], { duration: t.transitions.duration.form, easing: t.transitions.easing.easeInOut })"}
      </Typography>

      {/* ── Duration table ────────────────────────────────── */}
      <Typography variant="h6" sx={{ mb: 1.5 }}>Duration tokens</Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '160px 64px 120px 1fr',
          gap: 0,
          mb: 5,
          '& > *': { borderBottom: '1px solid', borderColor: 'divider', py: 1.5 },
        }}
      >
        {['Token', 'ms', 'Bar', 'Usage'].map((h) => (
          <Typography key={h} variant="small" sx={{ fontWeight: 700, color: 'text.muted', py: '0.625rem !important' }}>
            {h}
          </Typography>
        ))}
        {DURATION_ROWS.map(({ key, custom, description }) => {
          const ms   = durations[key] ?? 0
          const maxMs = 400
          return [
            <Typography key={`${key}-k`} variant="small" sx={{ fontFamily: 'monospace', display: 'flex', alignItems: 'center', gap: 0.75 }}>
              {key}
              {custom && (
                <Box component="span" sx={{ px: 0.75, py: 0.25, bgcolor: 'primary.background', color: 'primary.dark', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 700, lineHeight: 1.4 }}>
                  custom
                </Box>
              )}
            </Typography>,
            <Typography key={`${key}-ms`} variant="small" sx={{ fontFamily: 'monospace' }}>{ms}ms</Typography>,
            <Box key={`${key}-bar`} sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ height: 8, width: `${(ms / maxMs) * 100}%`, maxWidth: '100%', bgcolor: custom ? 'primary.main' : 'primary.light', borderRadius: '4px', opacity: 0.7 }} />
            </Box>,
            <Typography key={`${key}-d`} variant="small" color="text.muted">{description}</Typography>,
          ]
        })}
      </Box>

      {/* ── Easing table ──────────────────────────────────── */}
      <Typography variant="h6" sx={{ mb: 1.5 }}>Easing tokens</Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '160px 1fr auto',
          gap: 0,
          mb: 5,
          '& > *': { borderBottom: '1px solid', borderColor: 'divider', py: 1.5 },
        }}
      >
        {['Token', 'Curve', 'Usage'].map((h) => (
          <Typography key={h} variant="small" sx={{ fontWeight: 700, color: 'text.muted', py: '0.625rem !important' }}>
            {h}
          </Typography>
        ))}
        {EASING_ROWS.map(({ key, custom, description }) => (
          [
            <Typography key={`${key}-k`} variant="small" sx={{ fontFamily: 'monospace', display: 'flex', alignItems: 'center', gap: 0.75 }}>
              {key}
              {custom && (
                <Box component="span" sx={{ px: 0.75, py: 0.25, bgcolor: 'primary.background', color: 'primary.dark', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 700, lineHeight: 1.4 }}>
                  custom
                </Box>
              )}
            </Typography>,
            <Typography key={`${key}-c`} variant="small" sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>{easings[key] ?? '—'}</Typography>,
            <Typography key={`${key}-d`} variant="small" color="text.muted">{description}</Typography>,
          ]
        ))}
      </Box>

      {/* ── Duration race ─────────────────────────────────── */}
      <Typography variant="h6" sx={{ mb: 0.5 }}>Duration demo</Typography>
      <Typography variant="small" color="text.muted" component="p" sx={{ mb: 2 }}>
        Click any token to run it individually. "Race all" runs every duration simultaneously
        so you can compare speeds. Each click toggles forward/back; Reset snaps everything home.
      </Typography>
      <Box sx={{ mb: 5 }}>
        <DurationRace durations={durations} easing={easings.easeInOut} />
      </Box>

      {/* ── Easing demo ───────────────────────────────────── */}
      <Typography variant="h6" sx={{ mb: 0.5 }}>Easing demo</Typography>
      <Typography variant="small" color="text.muted" component="p" sx={{ mb: 2 }}>
        All tracks use the same duration (600 ms) — only the easing differs. "spring" will
        overshoot past the end before settling back.
      </Typography>
      <EasingDemo easings={easings} duration={600} />
    </Box>
  )
}

const meta: Meta<typeof TransitionsDoc> = {
  title: 'Utilities/Transitions',
  component: TransitionsDoc,
  parameters: {
    layout: 'fullscreen',
    docs: { canvas: { sourceState: 'hidden' } },
  },
}
export default meta

export const Default: StoryObj<typeof TransitionsDoc> = {
  render: () => <TransitionsDoc />,
}
