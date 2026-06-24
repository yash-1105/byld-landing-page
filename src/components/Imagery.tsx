import type { CSSProperties } from 'react'

/**
 * Self-contained SVG imagery, material textures + architectural scenes.
 * Each fills its parent (which must be position:relative; overflow:hidden).
 * Tasteful, on-brand tonal illustrations rather than stock photos, so they
 * always load and match the warm editorial palette.
 */

const fill: CSSProperties = { position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }

export type MaterialKind = 'oak' | 'travertine' | 'brass' | 'linen' | 'marble'

let uid = 0
const nid = (p: string) => `${p}${uid++}`

export function Material({ kind }: { kind: MaterialKind }) {
  if (kind === 'oak') {
    const g = nid('oak')
    const dark = ['M-5 20 C 35 14 75 26 125 18', 'M-5 40 C 30 34 80 46 125 38', 'M-5 60 C 40 54 70 66 125 58', 'M-5 80 C 30 74 85 86 125 78', 'M-5 100 C 45 94 75 106 125 98']
    const light = ['M-5 30 C 40 26 70 34 125 29', 'M-5 70 C 35 66 80 74 125 69', 'M-5 92 C 40 88 70 96 125 91']
    return (
      <svg style={fill} viewBox="0 0 120 120" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs><linearGradient id={g} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#88AC8A" /><stop offset="1" stopColor="#567B57" /></linearGradient></defs>
        <rect width="120" height="120" fill={`url(#${g})`} />
        <g fill="none" stroke="#3B543B" strokeWidth="1.1" opacity="0.32">{dark.map((d, i) => <path key={i} d={d} />)}</g>
        <g fill="none" stroke="#ADC6AF" strokeWidth="0.8" opacity="0.5">{light.map((d, i) => <path key={i} d={d} />)}</g>
        <ellipse cx="88" cy="52" rx="6" ry="3" fill="none" stroke="#3B543B" strokeWidth="0.9" opacity="0.3" />
      </svg>
    )
  }
  if (kind === 'travertine' || kind === 'marble') {
    const g = nid('trv')
    const base = kind === 'marble' ? ['#C9D9CA', '#BECEBF'] : ['#C9D9CB', '#B0C8B2']
    const vein = kind === 'marble' ? '#879A88' : '#8BA58E'
    return (
      <svg style={fill} viewBox="0 0 120 120" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs><linearGradient id={g} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={base[0]} /><stop offset="1" stopColor={base[1]} /></linearGradient></defs>
        <rect width="120" height="120" fill={`url(#${g})`} />
        <g fill="none" stroke={vein} strokeWidth="1" opacity="0.4" strokeLinecap="round">
          <path d="M-5 35 C 25 28 40 50 60 42 S 100 30 125 44" />
          <path d="M-5 78 C 30 70 50 88 75 80 S 105 70 125 82" />
          <path d="M20 -5 C 26 30 14 55 30 80 S 24 110 34 125" opacity="0.6" />
        </g>
        <g fill={vein} opacity="0.18">
          <ellipse cx="46" cy="60" rx="2.4" ry="1.4" /><ellipse cx="92" cy="30" rx="1.8" ry="1.1" /><ellipse cx="70" cy="100" rx="2" ry="1.2" /><ellipse cx="24" cy="104" rx="1.6" ry="1" />
        </g>
      </svg>
    )
  }
  if (kind === 'brass') {
    const g = nid('brs'); const s = nid('brsS')
    const lines = Array.from({ length: 40 }, (_, i) => i * 3)
    return (
      <svg style={fill} viewBox="0 0 120 120" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <linearGradient id={g} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#8CAF8F" /><stop offset="0.5" stopColor="#5F8962" /><stop offset="1" stopColor="#466548" /></linearGradient>
          <linearGradient id={s} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#fff" stopOpacity="0" /><stop offset="0.45" stopColor="#fff" stopOpacity="0.45" /><stop offset="0.6" stopColor="#fff" stopOpacity="0" /></linearGradient>
        </defs>
        <rect width="120" height="120" fill={`url(#${g})`} />
        <g stroke="#303A31" strokeWidth="0.5">{lines.map((x, i) => <line key={i} x1={x} y1="0" x2={x} y2="120" opacity={i % 2 ? 0.18 : 0.07} />)}</g>
        <g stroke="#BACFBD" strokeWidth="0.5" opacity="0.4">{lines.map((x, i) => <line key={i} x1={x + 1.4} y1="0" x2={x + 1.4} y2="120" />)}</g>
        <rect width="120" height="120" fill={`url(#${s})`} />
      </svg>
    )
  }
  // linen
  const wv = nid('lin'); const g = nid('linG')
  return (
    <svg style={fill} viewBox="0 0 120 120" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id={g} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#B7C9B9" /><stop offset="1" stopColor="#91A893" /></linearGradient>
        <pattern id={wv} width="8" height="8" patternUnits="userSpaceOnUse">
          <rect width="8" height="8" fill={`url(#${g})`} />
          <rect x="0" y="0" width="3.4" height="3.4" fill="#fff" opacity="0.14" />
          <rect x="4" y="4" width="3.4" height="3.4" fill="#fff" opacity="0.14" />
          <rect x="4" y="0" width="3.4" height="3.4" fill="#49594A" opacity="0.1" />
          <rect x="0" y="4" width="3.4" height="3.4" fill="#49594A" opacity="0.1" />
        </pattern>
      </defs>
      <rect width="120" height="120" fill={`url(#${wv})`} />
    </svg>
  )
}

export type SceneKind = 'facade' | 'interior' | 'plan' | 'build' | 'house' | 'team' | 'lighting' | 'kitchen' | 'schedule'

export function Scene({ kind }: { kind: SceneKind }) {
  const sky = nid('sky')
  const Frame = ({ children, from = '#BCD1BE', to = '#97B69A' }: { children: React.ReactNode; from?: string; to?: string }) => (
    <svg style={fill} viewBox="0 0 120 120" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs><linearGradient id={sky} x1="0" y1="0" x2="0.6" y2="1"><stop offset="0" stopColor={from} /><stop offset="1" stopColor={to} /></linearGradient></defs>
      <rect width="120" height="120" fill={`url(#${sky})`} />
      {children}
    </svg>
  )
  const ink = '#1E241F', soft = 'rgba(59,54,44,0.16)', clay = '#628C61'

  switch (kind) {
    case 'facade': {
      const cols = [0, 1, 2, 3], rows = [0, 1, 2, 3]
      return (
        <Frame from="#BFD2C1" to="#8EB092">
          <rect x="30" y="20" width="60" height="90" fill="rgba(59,54,44,0.10)" />
          {rows.map((r) => cols.map((c) => <rect key={`${r}-${c}`} x={36 + c * 13} y={28 + r * 18} width="9" height="12" fill={soft} />))}
          <rect x="30" y="20" width="60" height="90" fill="none" stroke={ink} strokeWidth="1" opacity="0.4" />
          <rect x="55" y="96" width="10" height="14" fill={clay} opacity="0.55" />
          <line x1="14" y1="110" x2="106" y2="110" stroke={ink} strokeWidth="1.2" opacity="0.4" />
        </Frame>
      )
    }
    case 'interior': {
      // an armchair + floor lamp on a rug — reads clearly as furniture / interiors
      return (
        <Frame from="#C6D7C7" to="#A1BDA3">
          <line x1="10" y1="94" x2="110" y2="94" stroke={ink} strokeWidth="1.1" opacity="0.4" />
          <ellipse cx="54" cy="95" rx="42" ry="4.5" fill="rgba(59,54,44,0.10)" />
          {/* armchair */}
          <rect x="37" y="42" width="40" height="30" rx="10" fill={soft} />
          <rect x="26" y="55" width="12" height="30" rx="6" fill="rgba(59,54,44,0.22)" />
          <rect x="76" y="55" width="12" height="30" rx="6" fill="rgba(59,54,44,0.22)" />
          <rect x="38" y="62" width="38" height="14" rx="5" fill={clay} opacity="0.42" />
          <rect x="37" y="42" width="40" height="30" rx="10" fill="none" stroke={ink} strokeWidth="1" opacity="0.34" />
          <line x1="31" y1="85" x2="29" y2="92" stroke={ink} strokeWidth="1.1" opacity="0.45" />
          <line x1="83" y1="85" x2="85" y2="92" stroke={ink} strokeWidth="1.1" opacity="0.45" />
          {/* floor lamp */}
          <line x1="100" y1="92" x2="100" y2="52" stroke={ink} strokeWidth="1.1" opacity="0.5" />
          <path d="M92 52 L108 52 L104 41 L96 41 Z" fill={soft} stroke={ink} strokeWidth="1" opacity="0.85" />
          <circle cx="100" cy="56" r="3" fill={clay} opacity="0.55" />
        </Frame>
      )
    }
    case 'lighting': {
      return (
        <Frame from="#C6D7C7" to="#A1BDA3">
          <line x1="0" y1="84" x2="120" y2="84" stroke={ink} strokeWidth="1" opacity="0.35" />
          <rect x="14" y="26" width="34" height="40" fill="none" stroke={ink} strokeWidth="1.1" opacity="0.4" />
          <line x1="31" y1="26" x2="31" y2="66" stroke={ink} strokeWidth="0.8" opacity="0.3" />
          <rect x="60" y="62" width="46" height="22" rx="4" fill={soft} />
          <rect x="60" y="56" width="46" height="10" rx="4" fill="rgba(59,54,44,0.22)" />
          <line x1="84" y1="10" x2="84" y2="30" stroke={ink} strokeWidth="0.9" opacity="0.4" />
          <circle cx="84" cy="34" r="6" fill={clay} opacity="0.5" />
        </Frame>
      )
    }
    case 'plan':
    case 'schedule': {
      return (
        <Frame from="#C9D9CA" to="#AFC8B2">
          <rect x="16" y="16" width="88" height="88" fill="none" stroke={ink} strokeWidth="1.2" opacity="0.45" />
          <line x1="58" y1="16" x2="58" y2="104" stroke={ink} strokeWidth="1" opacity="0.35" />
          <line x1="58" y1="58" x2="104" y2="58" stroke={ink} strokeWidth="1" opacity="0.35" />
          <line x1="16" y1="70" x2="58" y2="70" stroke={ink} strokeWidth="1" opacity="0.35" />
          <rect x="16" y="48" width="6" height="2" fill={clay} />
          <rect x="80" y="56" width="2" height="6" fill={clay} />
        </Frame>
      )
    }
    case 'build': {
      // a tower crane lifting a load over a building under construction
      return (
        <Frame from="#BACFBC" to="#91B195">
          <line x1="10" y1="96" x2="110" y2="96" stroke={ink} strokeWidth="1.2" opacity="0.42" />
          {/* built lower floors */}
          <rect x="22" y="56" width="40" height="40" fill="rgba(59,54,44,0.10)" />
          <rect x="22" y="56" width="40" height="40" fill="none" stroke={ink} strokeWidth="1" opacity="0.42" />
          <line x1="22" y1="69" x2="62" y2="69" stroke={ink} strokeWidth="0.8" opacity="0.3" />
          <line x1="22" y1="82" x2="62" y2="82" stroke={ink} strokeWidth="0.8" opacity="0.3" />
          <rect x="28" y="60" width="8" height="6" fill={soft} /><rect x="48" y="60" width="8" height="6" fill={soft} />
          <rect x="28" y="73" width="8" height="6" fill={soft} /><rect x="48" y="73" width="8" height="6" fill={soft} />
          <rect x="28" y="86" width="8" height="6" fill={soft} /><rect x="48" y="86" width="8" height="6" fill={soft} />
          {/* top floor still framing up */}
          <g stroke={ink} strokeWidth="1" opacity="0.4">
            <line x1="22" y1="56" x2="22" y2="47" /><line x1="42" y1="56" x2="42" y2="47" /><line x1="62" y1="56" x2="62" y2="47" />
            <line x1="20" y1="47" x2="64" y2="47" />
          </g>
          {/* tower crane */}
          <line x1="80" y1="96" x2="80" y2="26" stroke={ink} strokeWidth="1.5" opacity="0.5" />
          <line x1="40" y1="30" x2="106" y2="30" stroke={ink} strokeWidth="1.3" opacity="0.5" />
          <line x1="80" y1="22" x2="40" y2="30" stroke={ink} strokeWidth="0.9" opacity="0.42" />
          <line x1="80" y1="22" x2="106" y2="30" stroke={ink} strokeWidth="0.9" opacity="0.42" />
          <rect x="100" y="30" width="6" height="6" fill="rgba(59,54,44,0.3)" />
          <rect x="76" y="30" width="8" height="6" fill="rgba(59,54,44,0.16)" />
          <line x1="50" y1="30" x2="50" y2="48" stroke={ink} strokeWidth="0.8" opacity="0.45" />
          <rect x="45" y="48" width="11" height="7" fill={clay} opacity="0.55" />
        </Frame>
      )
    }
    case 'house': {
      return (
        <Frame from="#C2D5C3" to="#99B89C">
          <path d="M30 60 L60 36 L90 60 Z" fill="rgba(59,54,44,0.16)" stroke={ink} strokeWidth="1" opacity="0.5" />
          <rect x="38" y="60" width="44" height="44" fill="rgba(59,54,44,0.10)" stroke={ink} strokeWidth="1" opacity="0.45" />
          <rect x="54" y="80" width="12" height="24" fill={clay} opacity="0.5" />
          <rect x="44" y="68" width="9" height="9" fill={soft} /><rect x="67" y="68" width="9" height="9" fill={soft} />
          <line x1="14" y1="104" x2="106" y2="104" stroke={ink} strokeWidth="1.2" opacity="0.4" />
        </Frame>
      )
    }
    case 'kitchen': {
      return (
        <Frame from="#C6D7C7" to="#A1BDA3">
          <rect x="16" y="64" width="88" height="40" fill="rgba(59,54,44,0.10)" stroke={ink} strokeWidth="1" opacity="0.4" />
          {[0, 1, 2, 3].map((i) => <line key={i} x1={16 + (i + 1) * 22} y1="64" x2={16 + (i + 1) * 22} y2="104" stroke={ink} strokeWidth="0.8" opacity="0.3" />)}
          <rect x="16" y="58" width="88" height="6" fill="rgba(59,54,44,0.2)" />
          <rect x="40" y="26" width="40" height="20" fill="none" stroke={ink} strokeWidth="1" opacity="0.4" />
          <circle cx="60" cy="54" r="3" fill={clay} opacity="0.6" />
        </Frame>
      )
    }
    // team
    default: {
      const av = ['#7EA57F', '#799287', '#859F85', '#6A7A6B']
      return (
        <Frame from="#C2D5C3" to="#9AB99D">
          {av.map((c, i) => <circle key={i} cx={36 + i * 16} cy="54" r="13" fill={c} stroke="#C9D9CA" strokeWidth="2" />)}
          {av.map((_, i) => <rect key={i} x={26 + i * 16} y="72" width="20" height="22" rx="6" fill="rgba(59,54,44,0.12)" />)}
        </Frame>
      )
    }
  }
}
