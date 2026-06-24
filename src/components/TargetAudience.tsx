import { Scene, type SceneKind } from './Imagery'

const mono = "'JetBrains Mono',monospace"
const serif = "'Inter',system-ui,sans-serif"

const CARDS: { n: string; label: string; scene: SceneKind }[] = [
  { n: '01', label: 'Architecture Studios', scene: 'facade' },
  { n: '02', label: 'Interior Design Firms', scene: 'interior' },
  { n: '03', label: 'Design-Build Companies', scene: 'build' },
  { n: '04', label: 'Residential Contractors', scene: 'house' },
  { n: '05', label: 'Growing Teams', scene: 'team' },
]

export default function TargetAudience() {
  return (
    <section style={{ background: '#E7ECE8', borderTop: '1px solid #DBE3DC', borderBottom: '1px solid #DBE3DC' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: 'clamp(80px,10vw,140px) 40px' }}>
        <div data-reveal="1" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 30, marginBottom: 'clamp(40px,5vw,64px)' }}>
          <div style={{ maxWidth: 560 }}>
            <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: '.24em', textTransform: 'uppercase', color: '#9A9D96', marginBottom: 24 }}>04 - Who it's for</div>
            <h2 style={{ fontFamily: serif, fontWeight: 600, fontSize: 'clamp(32px,4.4vw,56px)', lineHeight: 1.06, letterSpacing: '-0.025em', color: '#29261F' }}>Built for <span style={{ color: '#4E5E54' }}>growing firms</span></h2>
          </div>
          <p style={{ maxWidth: 380, fontSize: 17, lineHeight: 1.62, color: '#54584F' }}>Whether you're managing residential projects or coordinating multiple teams, BYLD Space helps simplify the way projects are delivered.</p>
        </div>

        <div data-reveal="1" data-reveal-delay="0.08" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(210px,1fr))', gap: 14 }}>
          {CARDS.map((c) => (
            <div key={c.n} className="zoom aud-card" data-tilt="5" style={{ borderRadius: 18, overflow: 'hidden', background: '#F8FAF8', border: '1px solid #DCE3DD' }}>
              <div style={{ height: 200, position: 'relative', overflow: 'hidden' }}>
                <div className="zimg" style={{ position: 'absolute', inset: 0 }}><Scene kind={c.scene} /></div>
                <span style={{ position: 'absolute', left: 14, top: 13, fontFamily: mono, fontSize: 9, letterSpacing: '.12em', color: 'rgba(41,38,31,.55)', zIndex: 2 }}>{c.n}</span>
              </div>
              <div style={{ padding: '16px 17px' }}><div style={{ fontSize: 15.5, fontWeight: 600, letterSpacing: '-0.01em', color: '#29261F' }}>{c.label}</div></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
