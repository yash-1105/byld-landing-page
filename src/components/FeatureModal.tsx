import { useEffect } from 'react'
import { ACCENT, FEATURES, type FeatureKey } from '../data'
import { Scene, type SceneKind } from './Imagery'
import { RoleIcon, roleKeyFor } from './RoleIcons'

const mono = "'JetBrains Mono',monospace"
const serif = "'Inter',system-ui,sans-serif"

function Preview({ k }: { k: FeatureKey }) {
  const panelIn = { animation: 'panelIn .5s cubic-bezier(.2,.7,.3,1) both' as const }
  const card: React.CSSProperties = { position: 'relative', width: '100%', background: '#FCFAF6', border: '1px solid #EDE7DB', borderRadius: 16, padding: 18, boxShadow: '0 30px 60px -34px rgba(41,38,31,.3)', ...panelIn }

  if (k === 'pm') {
    const row = (label: string, w: string, color: string, anim?: boolean) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 11, color: '#8B8275', width: 74 }}>{label}</span>
        <div style={{ flex: 1, height: 9, borderRadius: 5, background: '#EAE3D5' }}>{w !== '0%' && <div style={{ width: w, height: '100%', borderRadius: 5, background: color, ...(anim ? { animation: 'panelIn .6s ease both' } : {}) }} />}</div>
      </div>
    )
    return (
      <div style={card}>
        <div style={{ fontFamily: mono, fontSize: 9.5, letterSpacing: '.12em', color: '#A79E90', marginBottom: 14 }}>PROJECT TIMELINE</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
          {row('Concept', '100%', '#29261F', true)}
          {row('Design', '68%', '#B17A57')}
          {row('Build', '28%', '#C9BFAE')}
          {row('Handover', '0%', '#C9BFAE')}
        </div>
        <div style={{ display: 'flex', gap: 7, marginTop: 16 }}>
          <span style={{ background: '#F1ECE2', borderRadius: 8, padding: '7px 11px', fontSize: 11, color: '#5C564B' }}>12 tasks</span>
          <span style={{ background: '#F1ECE2', borderRadius: 8, padding: '7px 11px', fontSize: 11, color: '#5C564B' }}>4 milestones</span>
          <span style={{ background: '#29261F', color: '#F6F4EF', borderRadius: 8, padding: '7px 11px', fontSize: 11 }}>On track</span>
        </div>
      </div>
    )
  }

  if (k === 'cc') {
    return (
      <div style={{ position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', gap: 12, ...panelIn }}>
        <div style={{ background: '#FCFAF6', border: '1px solid #EDE7DB', borderRadius: 13, padding: '13px 15px', alignSelf: 'flex-start', maxWidth: '78%', boxShadow: '0 16px 34px -22px rgba(41,38,31,.3)' }}><div style={{ fontSize: 13, color: '#5C564B' }}>Sharing the latest renders for your review.</div></div>
        <div style={{ background: '#29261F', borderRadius: 13, padding: '13px 15px', alignSelf: 'flex-end', maxWidth: '78%' }}><div style={{ fontSize: 13, color: '#F6F4EF' }}>Love the living room, approved.</div></div>
        <div style={{ background: '#FCFAF6', border: '1px solid #EDE7DB', borderRadius: 13, padding: '11px 14px', alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: 10 }}><div style={{ position: 'relative', width: 30, height: 38, borderRadius: 4, overflow: 'hidden', flex: 'none' }}><Scene kind="interior" /></div><span style={{ fontSize: 12, color: '#5C564B' }}>Render_LivingRoom_v3.jpg</span></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, alignSelf: 'flex-end' }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: '#7E866A' }} /><span style={{ fontFamily: mono, fontSize: 9.5, color: '#A79E90' }}>CLIENT · ONLINE</span></div>
      </div>
    )
  }

  if (k === 'cd') {
    const r = (tone: string, name: string, sub: string, latest?: boolean) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#F4EFE6', borderRadius: 10, padding: '11px 13px' }}>
        <div style={{ width: 26, height: 32, borderRadius: 3, background: tone }} />
        <div style={{ flex: 1 }}><div style={{ fontSize: 12.5, color: '#29261F', fontWeight: 500 }}>{name}</div><div style={{ fontFamily: mono, fontSize: 9, color: '#A79E90', marginTop: 2 }}>{sub}</div></div>
        {latest && <span style={{ fontSize: 10, color: '#7E866A', fontWeight: 600 }}>Latest</span>}
      </div>
    )
    return (
      <div style={{ ...card, display: 'flex', flexDirection: 'column', gap: 9 }}>
        {r('#E0D7C7', 'Floor Plans, Rev C.pdf', 'UPDATED 2H AGO', true)}
        {r('#D6C9B2', 'Quotation_Marble.xlsx', '3 VERSIONS')}
        {r('#C9BFAE', 'Contract_Signed.pdf', 'LOCKED')}
      </div>
    )
  }

  if (k === 'ar') {
    const r = (scene: SceneKind, title: string, sub: string, chip: { t: string; bg: string; c: string }) => (
      <div style={{ background: '#FCFAF6', border: '1px solid #EDE7DB', borderRadius: 13, padding: 13, display: 'flex', alignItems: 'center', gap: 13, boxShadow: '0 16px 34px -22px rgba(41,38,31,.25)' }}>
        <div style={{ position: 'relative', width: 48, height: 48, borderRadius: 9, overflow: 'hidden' }}><Scene kind={scene} /></div>
        <div style={{ flex: 1 }}><div style={{ fontSize: 13, fontWeight: 600, color: '#29261F' }}>{title}</div><div style={{ fontFamily: mono, fontSize: 9, color: '#A79E90', marginTop: 3 }}>{sub}</div></div>
        <span style={{ background: chip.bg, color: chip.c, fontSize: 10.5, fontWeight: 600, padding: '5px 11px', borderRadius: 999 }}>{chip.t}</span>
      </div>
    )
    return (
      <div style={{ position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', gap: 11, ...panelIn }}>
        {r('facade', 'Facade Design v3', '2 REVISIONS', { t: 'Approved', bg: '#EBF0E2', c: '#5E6A4D' })}
        {r('lighting', 'Lighting Plan v2', 'AWAITING CLIENT', { t: 'Pending', bg: '#F3EAD9', c: '#A77B3F' })}
      </div>
    )
  }

  if (k === 'sc') {
    return (
      <div style={{ position: 'relative', width: '100%', height: 240, borderRadius: 16, overflow: 'hidden', border: '1px solid #EDE7DB', ...panelIn }}>
        <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(135deg,#EAE3D5 0 13px,#E4DCCB 13px 26px)' }} />
        <div style={{ position: 'absolute', left: 16, top: 14, fontFamily: mono, fontSize: 9.5, letterSpacing: '.1em', color: '#8B8275' }}>SITE / PHASE 02</div>
        <div style={{ position: 'absolute', left: 30, top: 84, display: 'flex', alignItems: 'center', gap: 8, background: '#FCFAF6', padding: '8px 13px', borderRadius: 999, boxShadow: '0 8px 20px -10px rgba(41,38,31,.35)' }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: '#B17A57' }} /><span style={{ fontSize: 11.5, color: '#29261F', fontWeight: 500 }}>Foundation poured</span></div>
        <div style={{ position: 'absolute', right: 22, bottom: 22, display: 'flex', alignItems: 'center', gap: 8, background: '#29261F', padding: '8px 13px', borderRadius: 999 }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: '#7E866A' }} /><span style={{ fontSize: 11.5, color: '#F6F4EF', fontWeight: 500 }}>3 issues resolved</span></div>
      </div>
    )
  }

  // tc
  const m = (color: string, role: string, tag: string) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
      <div style={{ width: 32, height: 32, borderRadius: '50%', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><RoleIcon role={roleKeyFor(role)} size={16} /></div>
      <div style={{ flex: 1 }}><div style={{ fontSize: 12.5, fontWeight: 600, color: '#29261F' }}>{role}</div></div>
      <span style={{ fontFamily: mono, fontSize: 9, color: '#A79E90' }}>{tag}</span>
    </div>
  )
  return (
    <div style={{ ...card, display: 'flex', flexDirection: 'column', gap: 11 }}>
      {m('#C7A574', 'Architect', 'LEAD')}
      {m('#9CA382', 'Interior Designer', 'DESIGN')}
      {m('#B0A18C', 'Consultant', 'MEP')}
      {m('#8B8275', 'Contractor + Client', '+5')}
    </div>
  )
}

export default function FeatureModal({ index, onClose }: { index: number | null; onClose: () => void }) {
  useEffect(() => {
    if (index == null) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, onClose])

  if (index == null) return null
  const f = FEATURES[index]

  return (
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={f.title}
      style={{ position: 'fixed', inset: 0, zIndex: 180, background: 'rgba(41,38,31,.42)', backdropFilter: 'blur(7px)', WebkitBackdropFilter: 'blur(7px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 28, animation: 'fadeIn .3s ease both' }}
    >
      <div onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: 940, background: '#F6F4EF', border: '1px solid #E6E0D4', borderRadius: 24, overflow: 'hidden', boxShadow: '0 60px 120px -40px rgba(41,38,31,.55)', display: 'flex', flexWrap: 'wrap', animation: 'modalIn .5s cubic-bezier(.2,.7,.3,1) both' }}>
        <div style={{ flex: '1 1 440px', minWidth: 300, background: '#F1ECE2', borderRight: '1px solid #E8E2D6', padding: 30, minHeight: 380, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -60, right: -40, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,253,248,.8),rgba(255,253,248,0) 70%)' }} />
          <Preview k={f.key} />
        </div>
        <div style={{ flex: '1 1 320px', minWidth: 280, padding: 34, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 }}>
            <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', color: ACCENT }}>{f.tag}</span>
            <button className="modal-close" aria-label="Close" onClick={onClose} style={{ width: 34, height: 34, borderRadius: '50%', border: '1px solid #E0D7C7', background: '#FCFAF6', cursor: 'pointer', color: '#8B8275', fontSize: 16, lineHeight: 1 }}>×</button>
          </div>
          <h3 style={{ fontFamily: serif, fontWeight: 600, fontSize: 'clamp(28px,3.6vw,42px)', lineHeight: 1.05, letterSpacing: '-0.025em', color: '#8B8275' }}>{f.title}</h3>
          <p style={{ margin: '22px 0 0', fontSize: 16.5, lineHeight: 1.62, color: '#5C564B' }}>{f.body}</p>
          <div style={{ marginTop: 'auto', paddingTop: 30, display: 'flex', alignItems: 'center', gap: 8, fontFamily: mono, fontSize: 11, letterSpacing: '.06em', color: '#A79E90' }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: ACCENT }} />LIVE PREVIEW · BYLD SPACE</div>
        </div>
      </div>
    </div>
  )
}
