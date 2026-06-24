import { TALENT } from '../data'
import { Scene, type SceneKind } from './Imagery'
import { RoleIcon, roleKeyFor } from './RoleIcons'

const mono = "'JetBrains Mono',monospace"
const serif = "'Inter',system-ui,sans-serif"

// portfolio-preview thumbnails per talent role (Architect, Interior Designer, Draftsman, BIM, PM)
const WORK_SCENES: SceneKind[][] = [
  ['facade', 'plan', 'build'],
  ['interior', 'kitchen', 'lighting'],
  ['plan', 'facade', 'schedule'],
  ['build', 'plan', 'facade'],
  ['schedule', 'build', 'house'],
]

export default function BYLDFlex() {
  return (
    <section id="flex" style={{ scrollMarginTop: 90, position: 'relative', maxWidth: 1240, margin: '0 auto', padding: 'clamp(80px,10vw,140px) 40px', display: 'flex', flexWrap: 'wrap', gap: 'clamp(40px,6vw,72px)' }}>
      <div data-reveal="1" style={{ flex: '1 1 340px', minWidth: 300 }}>
        <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: '.24em', textTransform: 'uppercase', color: '#9A9D96', marginBottom: 24 }}>03 - BYLD Flex</div>
        <h2 style={{ fontFamily: serif, fontWeight: 600, fontSize: 'clamp(32px,4.4vw,56px)', lineHeight: 1.06, letterSpacing: '-0.025em', color: '#29261F' }}>Flexible talent, <span style={{ color: '#4E5E54' }}>when you need it</span></h2>
        <p style={{ margin: '30px 0 0', maxWidth: 420, fontSize: 18, lineHeight: 1.65, color: '#54584F' }}>Scale your team without the overhead of permanent hiring.</p>
        <p style={{ margin: '20px 0 0', maxWidth: 420, fontSize: 18, lineHeight: 1.65, color: '#54584F' }}>Through BYLD Flex, firms can access trusted architecture and design talent for short-term support, specialized tasks, and project-based requirements.</p>
        <div style={{ marginTop: 30, display: 'flex', alignItems: 'center', gap: 10, fontFamily: mono, fontSize: 11, letterSpacing: '.1em', color: '#9A9D96' }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: '#5E6E62', animation: 'pulse 2.6s ease-in-out infinite' }} />HOVER A CARD TO PREVIEW</div>
      </div>

      <div data-reveal="1" data-reveal-delay="0.1" style={{ flex: '1 1 440px', minWidth: 300, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(190px,1fr))', gap: 12, alignContent: 'start' }}>
        {TALENT.map((t, ti) => (
          <div key={t.role} className="talent" tabIndex={0} style={{ background: '#F8FAF8', border: '1px solid #E1E7E2', borderRadius: 16, padding: 15, cursor: 'default' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, flex: 'none', background: `linear-gradient(135deg, ${t.tone})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><RoleIcon role={roleKeyFor(t.role)} size={22} /></div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#29261F', letterSpacing: '-0.01em' }}>{t.role}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 3 }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: t.dot }} /><span style={{ fontSize: 11, color: '#7C7F77' }}>{t.avail}</span></div>
              </div>
            </div>
            <div className="tdetail">
              <div style={{ marginTop: 13, paddingTop: 13, borderTop: '1px solid #E5EAE5' }}>
                <div style={{ fontSize: 11.5, color: '#54584F', marginBottom: 10 }}>{t.skills}</div>
                <div style={{ display: 'flex', gap: 7 }}>
                  {WORK_SCENES[ti].map((sc, i) => <div key={i} style={{ position: 'relative', flex: 1, height: 40, borderRadius: 7, overflow: 'hidden' }}><Scene kind={sc} /></div>)}
                </div>
              </div>
            </div>
          </div>
        ))}
        <div style={{ background: '#E7ECE8', border: '1px dashed #BFD3C3', borderRadius: 16, padding: 15, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 6 }}>
          <div style={{ fontFamily: serif, fontWeight: 600, fontSize: 30, color: '#29261F', lineHeight: 1 }}>+40</div>
          <div style={{ fontSize: 12, color: '#7C7F77' }}>specialists across disciplines, ready to plug into your projects.</div>
        </div>
      </div>
    </section>
  )
}
