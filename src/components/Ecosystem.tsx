import { useState } from 'react'
import { ACCENT, ECO } from '../data'

const mono = "'JetBrains Mono',monospace"
const serif = "'Inter',system-ui,sans-serif"

export default function Ecosystem() {
  const [activeNode, setActiveNode] = useState<number | null>(null)
  const an = activeNode
  const flowText = an == null ? 'Hover a node to trace the flow' : ECO[an].label + ' connects across BYLD Space'

  return (
    <section id="ecosystem" style={{ scrollMarginTop: 90, maxWidth: 1240, margin: '0 auto', padding: 'clamp(80px,10vw,140px) 40px', textAlign: 'center' }}>
      <div data-reveal="1" style={{ maxWidth: 680, margin: '0 auto clamp(30px,4vw,48px)' }}>
        <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: '.24em', textTransform: 'uppercase', color: '#A79E90', marginBottom: 24 }}>05 - The Ecosystem</div>
        <h2 style={{ fontFamily: serif, fontWeight: 600, fontSize: 'clamp(32px,4.4vw,56px)', lineHeight: 1.08, letterSpacing: '-0.025em', color: '#8B8275' }}>Everything connected, <span style={{ color: '#B17A57' }}>end to end</span></h2>
      </div>

      <div data-reveal="1" data-reveal-delay="0.1" style={{ position: 'relative', width: '100%', maxWidth: 680, height: 580, margin: '0 auto' }}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
          {ECO.map((n, i) => {
            const activeLine = an === i || (an != null && ECO[an].links.includes(i))
            return (
              <line key={i} x1={50} y1={50} x2={n.x} y2={n.y} vectorEffect="non-scaling-stroke" style={{
                stroke: activeLine ? ACCENT : '#D8CDBA',
                strokeWidth: activeLine ? 2 : 1,
                opacity: an != null && !activeLine ? 0.3 : 1,
                strokeDasharray: '4 5',
                animation: `dashFlow ${activeLine ? 2.2 : 5}s linear infinite`,
                transition: 'stroke .35s, opacity .35s',
              }} />
            )
          })}
        </svg>

        {/* hub */}
        <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 152, height: 152, borderRadius: '50%', background: '#FCFAF6', border: '1px solid #E6E0D4', boxShadow: '0 2px 6px rgba(41,38,31,.04), 0 30px 60px -30px rgba(41,38,31,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 4 }}>
          <div style={{ position: 'absolute', inset: -9, borderRadius: '50%', border: '1px solid #E8E2D6', animation: 'spinSlow 38s linear infinite' }} />
          <div style={{ position: 'absolute', inset: -9, borderRadius: '50%', borderTop: '1px solid #B17A57', animation: 'spinSlow 9s linear infinite' }} />
          <img src="/assets/byld-logo.png" alt="BYLD Space" style={{ width: 90 }} />
        </div>

        {/* nodes */}
        {ECO.map((n, i) => {
          const active = an === i
          const dimmed = an != null && an !== i && !ECO[an].links.includes(i)
          return (
            <div key={i}
              onMouseEnter={() => setActiveNode(i)}
              onMouseLeave={() => setActiveNode(null)}
              onFocus={() => setActiveNode(i)}
              onBlur={() => setActiveNode(null)}
              tabIndex={0}
              style={{
                position: 'absolute', left: n.x + '%', top: n.y + '%',
                transform: `translate(-50%,-50%) scale(${active ? 1.07 : an != null ? 0.97 : 1})`,
                background: active ? '#29261F' : '#FCFAF6', border: '1px solid ' + (active ? '#29261F' : '#EDE7DB'),
                borderRadius: 13, padding: '12px 17px', minWidth: 128, cursor: 'default',
                zIndex: active ? 6 : 2,
                boxShadow: active ? '0 24px 50px -20px rgba(41,38,31,.5)' : '0 14px 34px -18px rgba(41,38,31,.2)',
                opacity: dimmed ? 0.45 : 1, transition: 'all .4s cubic-bezier(.2,.7,.3,1)',
              }}>
              <div style={{ fontFamily: mono, fontSize: 9, letterSpacing: '.12em', color: '#A79E90', marginBottom: 3 }}>{('0' + (i + 1)).slice(-2)}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: active ? '#F6F4EF' : '#29261F', transition: 'color .3s' }}>{n.label}</div>
            </div>
          )
        })}
      </div>

      <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: '.06em', color: '#8B8275', marginTop: 8, transition: 'color .3s' }}>{flowText}</div>
    </section>
  )
}
