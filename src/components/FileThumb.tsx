/** Tiny document thumbnails with a file-type motif (plan / spreadsheet / signed contract). */

export type FileKind = 'plan' | 'sheet' | 'contract'

const INK = '#3D4C42'   // warm motif color, reads on the beige thumbnails
const CLAY = '#4E5E54'  // accent, used for the signature

function Glyph({ kind }: { kind: FileKind }) {
  if (kind === 'plan') {
    return (
      <g fill="none" stroke={INK} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5.5" y="9" width="13" height="12" rx="0.5" />
        <line x1="11.5" y1="9" x2="11.5" y2="21" />
        <line x1="11.5" y1="15.2" x2="18.5" y2="15.2" />
        <circle cx="8.4" cy="18" r="0.9" fill={INK} stroke="none" />
      </g>
    )
  }
  if (kind === 'sheet') {
    return (
      <g stroke={INK} strokeWidth="0.9">
        <rect x="5.5" y="8.5" width="13" height="13" rx="0.5" fill="none" />
        <rect x="5.5" y="8.5" width="13" height="3.4" fill={INK} opacity="0.16" stroke="none" />
        <line x1="5.5" y1="11.9" x2="18.5" y2="11.9" />
        <line x1="5.5" y1="15.3" x2="18.5" y2="15.3" />
        <line x1="5.5" y1="18.6" x2="18.5" y2="18.6" />
        <line x1="9.9" y1="8.5" x2="9.9" y2="21.5" />
        <line x1="14.3" y1="8.5" x2="14.3" y2="21.5" />
      </g>
    )
  }
  // contract: text lines + a signature squiggle
  return (
    <g>
      <rect x="6" y="9.5" width="12" height="1.5" rx="0.75" fill={INK} opacity="0.7" />
      <rect x="6" y="12.6" width="12" height="1.5" rx="0.75" fill={INK} opacity="0.5" />
      <rect x="6" y="15.7" width="8.5" height="1.5" rx="0.75" fill={INK} opacity="0.5" />
      <path d="M6 23.4 q1.7 -3.2 3.3 -0.6 t3.4 -1.1 q1.4 -0.6 2.6 1" fill="none" stroke={CLAY} strokeWidth="1.2" strokeLinecap="round" />
    </g>
  )
}

export function FileThumb({ kind, tone, w = 24, h = 30 }: { kind: FileKind; tone: string; w?: number; h?: number }) {
  return (
    <div style={{ width: w, height: h, borderRadius: 3, background: tone, flex: 'none', overflow: 'hidden' }}>
      <svg viewBox="0 0 24 30" width={w} height={h} style={{ display: 'block' }} aria-hidden="true">
        <Glyph kind={kind} />
      </svg>
    </div>
  )
}
