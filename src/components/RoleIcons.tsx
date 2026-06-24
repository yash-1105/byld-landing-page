import type { ReactElement } from 'react'

export type RoleKey = 'architect' | 'interior' | 'draftsman' | 'bim' | 'pm' | 'consultant' | 'contractor'

/** Map a role label (e.g. "Interior Designer", "Contractor + Client") to an icon key. */
export function roleKeyFor(label: string): RoleKey {
  const l = label.toLowerCase()
  if (l.includes('interior')) return 'interior'
  if (l.includes('draft')) return 'draftsman'
  if (l.includes('bim')) return 'bim'
  if (l.includes('manager')) return 'pm'
  if (l.includes('consultant')) return 'consultant'
  if (l.includes('contractor') || l.includes('client')) return 'contractor'
  return 'architect'
}

export function RoleIcon({ role, size = 20, color = '#F5F8F6' }: { role: RoleKey; size?: number; color?: string }) {
  const c = { fill: 'none', stroke: color, strokeWidth: 1.7, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }

  let body: ReactElement
  switch (role) {
    case 'architect': // drafting compass
      body = (
        <g {...c}>
          <circle cx="12" cy="5.2" r="1.5" />
          <path d="M11.3 6.5 L6.4 18.6" />
          <path d="M12.7 6.5 L17.6 18.6" />
          <path d="M9 13 L15 13" />
        </g>
      )
      break
    case 'interior': // armchair / sofa
      body = (
        <g {...c}>
          <path d="M5 13 v-1.4 A2 2 0 0 1 7 9.6 h10 a2 2 0 0 1 2 2 V13" />
          <rect x="4" y="13" width="16" height="4.6" rx="1.6" />
          <path d="M6.2 17.6 V19.2" />
          <path d="M17.8 17.6 V19.2" />
        </g>
      )
      break
    case 'draftsman': // pencil
      body = (
        <g {...c}>
          <path d="M15.8 5.4 L18.6 8.2" />
          <path d="M14.7 6.5 L17.5 9.3 L8 18.8 L4.6 19.7 L5.5 16.3 Z" />
        </g>
      )
      break
    case 'bim': // 3D cube
      body = (
        <g {...c}>
          <path d="M12 3.2 L19.8 7.3 V15.7 L12 19.8 L4.2 15.7 V7.3 Z" />
          <path d="M4.2 7.3 L12 11.5 L19.8 7.3" />
          <path d="M12 11.5 V19.8" />
        </g>
      )
      break
    case 'pm': // clipboard with check
      body = (
        <g {...c}>
          <rect x="6" y="5" width="12" height="15" rx="2" />
          <rect x="9.2" y="3.6" width="5.6" height="3" rx="1" />
          <path d="M9.2 12 l1.6 1.6 L13.9 10.7" />
          <path d="M9.2 16.3 h5.6" />
        </g>
      )
      break
    case 'consultant': { // gear (MEP / engineering)
      const teeth = Array.from({ length: 8 }, (_, i) => {
        const a = (i * Math.PI) / 4
        return (
          <line key={i}
            x1={12 + Math.cos(a) * 3.9} y1={12 + Math.sin(a) * 3.9}
            x2={12 + Math.cos(a) * 5.7} y2={12 + Math.sin(a) * 5.7} />
        )
      })
      body = (
        <g {...c}>
          <circle cx="12" cy="12" r="3.3" />
          {teeth}
        </g>
      )
      break
    }
    default: // contractor, hard hat
      body = (
        <g {...c}>
          <path d="M5 15 a7 7 0 0 1 14 0" />
          <rect x="3.4" y="15" width="17.2" height="2.4" rx="1.2" />
          <path d="M12 8.2 V15" />
          <path d="M9 9.2 V15" />
          <path d="M15 9.2 V15" />
        </g>
      )
  }

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" role="img" aria-label={role} style={{ display: 'block' }}>
      {body}
    </svg>
  )
}
