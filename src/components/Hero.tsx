import { ACCENT } from '../data'
import { Material, Scene, type MaterialKind } from './Imagery'

const mono = "'JetBrains Mono',monospace"
const serif = "'Newsreader',serif"

export default function Hero() {
  return (
    <section id="top" data-parallax="1" style={{
      position: 'relative', maxWidth: 1240, margin: '0 auto',
      padding: 'clamp(48px,7vw,104px) 40px clamp(60px,8vw,120px)',
      display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 48, overflow: 'hidden',
    }}>
      <div data-sheen="1" style={{
        position: 'absolute', top: '6%', right: '8%', width: 360, height: 360, borderRadius: '50%',
        background: 'radial-gradient(circle at center, rgba(255,253,248,.85), rgba(255,253,248,0) 70%)',
        zIndex: 1, pointerEvents: 'none', transition: 'transform .8s cubic-bezier(.2,.7,.3,1)', mixBlendMode: 'screen',
      }} />

      {/* LEFT — copy */}
      <div data-reveal="1" style={{ position: 'relative', zIndex: 3, flex: '1 1 560px', minWidth: 320 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 30 }}>
          <span style={{ fontFamily: mono, fontSize: 11, letterSpacing: '.24em', textTransform: 'uppercase', color: '#A79E90' }}>BYLD Space</span>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 7, border: '1px solid #E4DED2', borderRadius: 999,
            padding: '5px 11px 5px 9px', fontFamily: mono, fontSize: 10.5, letterSpacing: '.16em',
            textTransform: 'uppercase', color: '#8B8275', background: 'rgba(252,250,246,.6)', whiteSpace: 'nowrap',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: ACCENT, animation: 'pulse 2.6s ease-in-out infinite' }} />Coming Soon
          </span>
        </div>
        <h1 style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(42px,6vw,80px)', lineHeight: 1.02, letterSpacing: '-0.025em', color: '#29261F', overflowWrap: 'break-word' }}>
          The workspace built for <span style={{ fontStyle: 'italic', fontWeight: 400 }}>modern architecture</span> and interior firms.
        </h1>
        <p style={{ margin: '30px 0 0', maxWidth: 480, fontSize: 'clamp(17px,1.5vw,19px)', lineHeight: 1.62, color: '#5C564B' }}>
          Manage projects, collaborate with clients, organize documents, and keep teams aligned — all from one place.
        </p>
        <p style={{ margin: '18px 0 0', fontSize: 15, lineHeight: 1.6, color: '#8B8275' }}>
          Built for architects, interior designers, and design-build teams.
        </p>
        <div style={{ marginTop: 38, display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
          <a href="#access" data-mag="0.45" className="btn-dark hero-cta" style={{
            display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none', background: '#29261F',
            color: '#F6F4EF', fontSize: 15.5, fontWeight: 500, letterSpacing: '-0.01em', padding: '16px 28px',
            borderRadius: 999, boxShadow: '0 14px 30px -14px rgba(41,38,31,.5)',
            transition: 'transform .4s cubic-bezier(.2,.7,.3,1), box-shadow .4s, background .4s',
          }}>
            Join Early Access
            <span style={{ fontFamily: mono, fontSize: 14 }}>→</span>
          </a>
          <span style={{ fontSize: 14, color: '#A79E90' }}>Be first when we launch.</span>
        </div>
      </div>

      {/* RIGHT — floating product cluster */}
      <div data-reveal="1" data-reveal-delay="0.12" style={{ position: 'relative', zIndex: 2, flex: '1 1 420px', minWidth: 320, height: 560 }}>

        {/* project board */}
        <div data-depth="22" style={{ position: 'absolute', top: 64, right: 0, width: 356, zIndex: 5, transition: 'transform .6s cubic-bezier(.2,.7,.3,1)' }}>
          <div style={{ background: '#FCFAF6', border: '1px solid #EDE7DB', borderRadius: 18, padding: 18, boxShadow: '0 2px 4px rgba(41,38,31,.03), 0 30px 60px -28px rgba(41,38,31,.22)', animation: 'floatA 7s ease-in-out infinite' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 14.5, fontWeight: 600, color: '#29261F', letterSpacing: '-0.01em' }}>Riverside Residence</div>
                <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '.1em', color: '#A79E90', marginTop: 3 }}>PROJECT BOARD · 12 TASKS</div>
              </div>
              <div style={{ display: 'flex' }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#E0D7C7', border: '2px solid #FCFAF6' }} />
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#C9BFAE', border: '2px solid #FCFAF6', marginLeft: -8 }} />
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#29261F', border: '2px solid #FCFAF6', marginLeft: -8, color: '#F6F4EF', fontSize: 9, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+3</div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 9 }}>
              <div>
                <div style={{ fontFamily: mono, fontSize: 9, letterSpacing: '.1em', color: '#8B8275', marginBottom: 7 }}>CONCEPT</div>
                <div style={{ background: '#F4EFE6', borderRadius: 9, padding: 9, marginBottom: 7 }}><div style={{ height: 5, width: '80%', background: '#D8CDBA', borderRadius: 3, marginBottom: 6 }} /><div style={{ height: 5, width: '55%', background: '#E5DCCB', borderRadius: 3 }} /></div>
                <div style={{ background: '#F4EFE6', borderRadius: 9, padding: 9 }}><div style={{ height: 5, width: '70%', background: '#D8CDBA', borderRadius: 3, marginBottom: 6 }} /><div style={{ height: 5, width: '45%', background: '#E5DCCB', borderRadius: 3 }} /></div>
              </div>
              <div>
                <div style={{ fontFamily: mono, fontSize: 9, letterSpacing: '.1em', color: '#8B8275', marginBottom: 7 }}>DESIGN</div>
                <div style={{ background: '#F4EFE6', borderRadius: 9, padding: 9, marginBottom: 7 }}><div style={{ height: 5, width: '85%', background: '#D8CDBA', borderRadius: 3, marginBottom: 6 }} /><div style={{ height: 5, width: '60%', background: '#E5DCCB', borderRadius: 3 }} /></div>
                <div style={{ background: '#FCFAF6', border: '1px solid #B17A57', borderRadius: 9, padding: 9, marginBottom: 7 }}><div style={{ height: 5, width: '75%', background: '#E0CDBC', borderRadius: 3, marginBottom: 6 }} /><div style={{ height: 5, width: '50%', background: '#ECE0D4', borderRadius: 3 }} /></div>
                <div style={{ background: '#F4EFE6', borderRadius: 9, padding: 9 }}><div style={{ height: 5, width: '65%', background: '#D8CDBA', borderRadius: 3 }} /></div>
              </div>
              <div>
                <div style={{ fontFamily: mono, fontSize: 9, letterSpacing: '.1em', color: '#8B8275', marginBottom: 7 }}>REVIEW</div>
                <div style={{ background: '#F4EFE6', borderRadius: 9, padding: 9 }}><div style={{ height: 5, width: '78%', background: '#D8CDBA', borderRadius: 3, marginBottom: 6 }} /><div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 8 }}><span style={{ width: 5, height: 5, borderRadius: '50%', background: '#7E866A' }} /><span style={{ fontSize: 9, color: '#8B8275' }}>Approved</span></div></div>
              </div>
            </div>
          </div>
        </div>

        {/* material selections */}
        <div data-depth="-28" style={{ position: 'absolute', top: 0, left: 0, width: 212, zIndex: 7, transition: 'transform .6s cubic-bezier(.2,.7,.3,1)' }}>
          <div style={{ background: '#FCFAF6', border: '1px solid #EDE7DB', borderRadius: 16, padding: 15, boxShadow: '0 2px 4px rgba(41,38,31,.03), 0 24px 48px -26px rgba(41,38,31,.24)', animation: 'floatB 8.5s ease-in-out infinite' }}>
            <div style={{ fontFamily: mono, fontSize: 9.5, letterSpacing: '.12em', color: '#8B8275', marginBottom: 11 }}>MATERIAL SELECTIONS</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {([['oak', 'White Oak'], ['travertine', 'Travertine'], ['brass', 'Brushed Brass'], ['linen', 'Belgian Linen']] as [MaterialKind, string][]).map(([k, l]) => (
                <div key={l}><div style={{ position: 'relative', height: 54, borderRadius: 9, overflow: 'hidden', marginBottom: 6 }}><Material kind={k} /></div><div style={{ fontSize: 10.5, color: '#5C564B' }}>{l}</div></div>
              ))}
            </div>
          </div>
        </div>

        {/* ground floor plan */}
        <div data-depth="18" style={{ position: 'absolute', bottom: 24, left: 8, width: 236, zIndex: 6, transition: 'transform .6s cubic-bezier(.2,.7,.3,1)' }}>
          <div style={{ background: '#FCFAF6', border: '1px solid #EDE7DB', borderRadius: 16, padding: 15, boxShadow: '0 2px 4px rgba(41,38,31,.03), 0 24px 48px -26px rgba(41,38,31,.22)', animation: 'floatC 9s ease-in-out infinite' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 11 }}>
              <div style={{ fontFamily: mono, fontSize: 9.5, letterSpacing: '.12em', color: '#8B8275' }}>GROUND FLOOR</div>
              <div style={{ fontFamily: mono, fontSize: 9.5, color: '#A79E90' }}>REV C</div>
            </div>
            <div style={{ position: 'relative', height: 108, border: '1.5px solid #D8CDBA', borderRadius: 4, background: 'repeating-linear-gradient(135deg,#F4EFE6 0 9px, #F0EADF 9px 18px)' }}>
              <div style={{ position: 'absolute', top: 0, left: '38%', bottom: 0, width: 1.5, background: '#D8CDBA' }} />
              <div style={{ position: 'absolute', left: '38%', right: 0, top: '46%', height: 1.5, background: '#D8CDBA' }} />
              <div style={{ position: 'absolute', left: 8, bottom: 6, width: 18, height: 1.5, background: '#B17A57' }} />
            </div>
          </div>
        </div>

        {/* approval chip */}
        <div data-depth="-20" style={{ position: 'absolute', bottom: 70, right: 18, width: 216, zIndex: 8, transition: 'transform .6s cubic-bezier(.2,.7,.3,1)' }}>
          <div style={{ background: '#FCFAF6', border: '1px solid #EDE7DB', borderRadius: 14, padding: '13px 15px', boxShadow: '0 2px 4px rgba(41,38,31,.03), 0 22px 44px -24px rgba(41,38,31,.24)', animation: 'floatA 7.5s ease-in-out infinite', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ position: 'relative', width: 40, height: 40, borderRadius: 10, overflow: 'hidden', flex: 'none' }}><Scene kind="facade" /></div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 12.5, fontWeight: 600, color: '#29261F' }}>Facade Design</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 3 }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: '#7E866A' }} /><span style={{ fontSize: 11, color: '#7E866A', fontWeight: 500 }}>Approved by client</span></div>
            </div>
          </div>
        </div>

        {/* procurement chip (dark) */}
        <div data-depth="34" style={{ position: 'absolute', top: 18, right: 34, zIndex: 9, transition: 'transform .6s cubic-bezier(.2,.7,.3,1)' }}>
          <div style={{ background: '#29261F', color: '#F6F4EF', borderRadius: 12, padding: '11px 14px', boxShadow: '0 18px 40px -20px rgba(41,38,31,.6)', animation: 'floatB 8s ease-in-out infinite' }}>
            <div style={{ fontFamily: mono, fontSize: 9, letterSpacing: '.14em', color: '#A79E90', marginBottom: 4 }}>PROCUREMENT</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}>Italian Marble<span style={{ background: 'rgba(126,134,106,.3)', color: '#C3CBB0', fontSize: 9.5, padding: '2px 7px', borderRadius: 999, fontFamily: mono, letterSpacing: '.06em' }}>ORDERED</span></div>
          </div>
        </div>

        {/* budget widget */}
        <div data-depth="-15" style={{ position: 'absolute', top: 250, left: -12, width: 182, zIndex: 7, transition: 'transform .6s cubic-bezier(.2,.7,.3,1)' }}>
          <div style={{ background: '#FCFAF6', border: '1px solid #EDE7DB', borderRadius: 14, padding: 14, boxShadow: '0 2px 4px rgba(41,38,31,.03), 0 22px 44px -24px rgba(41,38,31,.22)', animation: 'floatD 6.5s ease-in-out infinite' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 9 }}><div style={{ fontFamily: mono, fontSize: 9, letterSpacing: '.12em', color: '#8B8275' }}>BUDGET</div><span style={{ width: 6, height: 6, borderRadius: '50%', background: ACCENT }} /></div>
            <div style={{ fontFamily: serif, fontWeight: 300, fontSize: 26, color: '#29261F', lineHeight: 1 }}>₹ 24.1L</div>
            <div style={{ height: 6, background: '#EAE3D5', borderRadius: 4, marginTop: 11, overflow: 'hidden' }}><div style={{ width: '68%', height: '100%', background: '#29261F', borderRadius: 4 }} /></div>
            <div style={{ fontSize: 10.5, color: '#8B8275', marginTop: 7 }}>68% allocated</div>
          </div>
        </div>

      </div>
    </section>
  )
}
