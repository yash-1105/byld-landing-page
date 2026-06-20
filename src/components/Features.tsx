import type { ReactNode } from 'react'
import { ACCENT, FEATURES } from '../data'
import { Scene, type SceneKind } from './Imagery'
import { RoleIcon, roleKeyFor } from './RoleIcons'
import { FileThumb, type FileKind } from './FileThumb'

const mono = "'JetBrains Mono',monospace"
const serif = "'Inter',system-ui,sans-serif"

function Card({ index, visual, onOpen }: { index: number; visual: ReactNode; onOpen: (i: number) => void }) {
  const f = FEATURES[index]
  return (
    <div
      className="fcard"
      data-tilt="4.5"
      role="button"
      tabIndex={0}
      aria-label={`Open ${f.title} demo`}
      onClick={() => onOpen(index)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen(index) } }}
      style={{ background: '#FCFAF6', border: '1px solid #EDE7DB', borderRadius: 20, padding: 24, cursor: 'pointer', transformStyle: 'preserve-3d' }}
    >
      <div className="fimg" style={{ height: 172, borderRadius: 14, background: '#F1ECE2', border: '1px solid #EAE3D5', marginBottom: 22, overflow: 'hidden' }}>
        {visual}
      </div>
      <h3 style={{ margin: '0 0 10px', fontSize: 19, fontWeight: 600, letterSpacing: '-0.015em', color: '#29261F' }}>{f.title}</h3>
      <p style={{ fontSize: 15, lineHeight: 1.6, color: '#5C564B' }}>{f.body}</p>
      <div className="fmore"><div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 16, fontFamily: mono, fontSize: 11, letterSpacing: '.08em', color: ACCENT }}>OPEN DEMO →</div></div>
    </div>
  )
}

const pad = (extra?: React.CSSProperties): React.CSSProperties => ({ height: '100%', padding: 16, display: 'flex', flexDirection: 'column', gap: 9, ...extra })

const bar = (label: string, w: string, color: string) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
    <span style={{ fontSize: 10, color: '#8B8275', width: 54 }}>{label}</span>
    <div style={{ flex: 1, height: 8, borderRadius: 5, background: '#E0D7C7' }}><div style={{ width: w, height: '100%', borderRadius: 5, background: color }} /></div>
  </div>
)

const fileRow = (kind: FileKind, tone: string, name: string, sub: string) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 11, background: '#FCFAF6', borderRadius: 9, padding: '9px 11px' }}>
    <FileThumb kind={kind} tone={tone} />
    <div style={{ flex: 1 }}><div style={{ fontSize: 11, color: '#29261F', fontWeight: 500 }}>{name}</div><div style={{ fontFamily: mono, fontSize: 9, color: '#A79E90', marginTop: 2 }}>{sub}</div></div>
  </div>
)

const approvalRow = (scene: SceneKind, title: string, sub: string, chip: { t: string; bg: string; c: string }) => (
  <div style={{ background: '#FCFAF6', borderRadius: 11, padding: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
    <div style={{ position: 'relative', width: 44, height: 44, borderRadius: 8, overflow: 'hidden', flex: 'none' }}><Scene kind={scene} /></div>
    <div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 600, color: '#29261F' }}>{title}</div><div style={{ fontFamily: mono, fontSize: 9, color: '#A79E90', marginTop: 3 }}>{sub}</div></div>
    <div style={{ background: chip.bg, color: chip.c, fontSize: 10, fontWeight: 600, padding: '5px 10px', borderRadius: 999 }}>{chip.t}</div>
  </div>
)

const member = (color: string, role: string, tag: string) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
    <div style={{ width: 30, height: 30, borderRadius: '50%', background: color, flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><RoleIcon role={roleKeyFor(role)} size={15} /></div>
    <div style={{ flex: 1 }}><div style={{ fontSize: 11.5, color: '#29261F', fontWeight: 500 }}>{role}</div></div>
    <span style={{ fontFamily: mono, fontSize: 9, color: '#A79E90' }}>{tag}</span>
  </div>
)

export default function Features({ onOpen }: { onOpen: (i: number) => void }) {
  const visuals: ReactNode[] = [
    // PM, timeline
    <div style={pad()}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}><span style={{ fontFamily: mono, fontSize: 9, letterSpacing: '.1em', color: '#A79E90' }}>TIMELINE</span><span style={{ fontFamily: mono, fontSize: 9, color: '#A79E90' }}>Q3</span></div>
      {bar('Concept', '100%', '#29261F')}
      {bar('Design', '68%', '#B17A57')}
      {bar('Build', '24%', '#C9BFAE')}
      {bar('Handover', '0%', '#C9BFAE')}
    </div>,
    // CC, chat
    <div style={pad({ gap: 10 })}>
      <div style={{ background: '#FCFAF6', borderRadius: 10, padding: '10px 12px', alignSelf: 'flex-start', maxWidth: '80%', boxShadow: '0 2px 8px -4px rgba(41,38,31,.15)' }}><div style={{ fontSize: 11, color: '#5C564B' }}>Sharing the latest renders for review.</div></div>
      <div style={{ background: '#29261F', borderRadius: 10, padding: '10px 12px', alignSelf: 'flex-end', maxWidth: '78%' }}><div style={{ fontSize: 11, color: '#F6F4EF' }}>Love the living room, approved.</div></div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, alignSelf: 'flex-end' }}><span style={{ width: 5, height: 5, borderRadius: '50%', background: '#7E866A' }} /><span style={{ fontFamily: mono, fontSize: 9, color: '#A79E90' }}>CLIENT · NOW</span></div>
    </div>,
    // CD, files
    <div style={pad({ gap: 8 })}>
      {fileRow('plan', '#E0D7C7', 'Floor Plans, Rev C.pdf', 'UPDATED 2H AGO')}
      {fileRow('sheet', '#D6C9B2', 'Quotation_Marble.xlsx', 'LATEST VERSION')}
      {fileRow('contract', '#C9BFAE', 'Contract_Signed.pdf', 'LOCKED')}
    </div>,
    // AR, approvals
    <div style={pad({ justifyContent: 'center', gap: 11 })}>
      {approvalRow('kitchen', 'Kitchen Layout v4', '2 REVISIONS', { t: 'Approved', bg: '#EBF0E2', c: '#5E6A4D' })}
      {approvalRow('lighting', 'Lighting Plan v2', 'AWAITING CLIENT', { t: 'Pending', bg: '#F3EAD9', c: '#A77B3F' })}
    </div>,
    // SC, site map
    <div style={{ height: '100%', padding: 0, position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(135deg,#EAE3D5 0 11px,#E4DCCB 11px 22px)' }} />
      <div style={{ position: 'absolute', left: 14, top: 14, fontFamily: mono, fontSize: 9, letterSpacing: '.1em', color: '#8B8275' }}>SITE / PHASE 02</div>
      <div style={{ position: 'absolute', left: 24, top: 62, display: 'flex', alignItems: 'center', gap: 8, background: '#FCFAF6', padding: '7px 11px', borderRadius: 999, boxShadow: '0 6px 16px -8px rgba(41,38,31,.3)' }}><span style={{ width: 7, height: 7, borderRadius: '50%', background: '#B17A57' }} /><span style={{ fontSize: 10.5, color: '#29261F', fontWeight: 500 }}>Foundation poured</span></div>
      <div style={{ position: 'absolute', right: 18, bottom: 18, display: 'flex', alignItems: 'center', gap: 8, background: '#29261F', padding: '7px 11px', borderRadius: 999 }}><span style={{ width: 7, height: 7, borderRadius: '50%', background: '#7E866A' }} /><span style={{ fontSize: 10.5, color: '#F6F4EF', fontWeight: 500 }}>3 issues resolved</span></div>
    </div>,
    // TC, roster
    <div style={pad({ justifyContent: 'center', gap: 10 })}>
      {member('#C7A574', 'Architect', 'LEAD')}
      {member('#9CA382', 'Interior Designer', 'DESIGN')}
      {member('#B0A18C', 'Consultant', 'MEP')}
      {member('#8B8275', 'Contractor + Client', '+5')}
    </div>,
  ]

  return (
    <section id="features" style={{ scrollMarginTop: 90, maxWidth: 1240, margin: '0 auto', padding: 'clamp(80px,10vw,140px) 40px' }}>
      <div data-reveal="1" style={{ maxWidth: 720, marginBottom: 'clamp(40px,5vw,64px)' }}>
        <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: '.24em', textTransform: 'uppercase', color: '#A79E90', marginBottom: 24 }}>01 - Features</div>
        <h2 style={{ fontFamily: serif, fontWeight: 600, fontSize: 'clamp(32px,4.4vw,56px)', lineHeight: 1.06, letterSpacing: '-0.025em', color: '#8B8275' }}>Everything your team needs to <span style={{ color: '#B17A57' }}>stay on track</span></h2>
      </div>
      <div data-reveal="1" data-reveal-delay="0.06" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 18 }}>
        {visuals.map((v, i) => <Card key={i} index={i} visual={v} onOpen={onOpen} />)}
      </div>
    </section>
  )
}
