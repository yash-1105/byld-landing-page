import { useEffect, useRef, useState } from 'react'
import {
  PROC, INITIAL_APPROVALS, MODULE_LABELS, MODULE_GLYPHS,
  fmtL, fmtFull, type ProcId, type Approval, type ApprovalStatus,
} from '../data'
import { Scene, type SceneKind } from './Imagery'

const mono = "'JetBrains Mono',monospace"
const serif = "'Inter',system-ui,sans-serif"

type VendorSel = Record<ProcId, number>

const budgetFor = (v: VendorSel) => PROC.reduce((s, it) => s + it.vendors[v[it.id]].price, 0)

export default function ProductShowcase() {
  const [tab, setTab] = useState(0)
  const [vendors, setVendors] = useState<VendorSel>({ marble: 0, brass: 0, oak: 0, linen: 0 })
  const [displayBudget, setDisplayBudget] = useState(2410000)
  const [approvals, setApprovals] = useState<Approval[]>(INITIAL_APPROVALS)
  const [historyOpen, setHistoryOpen] = useState<number | null>(null)
  const tweenRef = useRef<number | null>(null)

  const tweenBudget = (target: number) => {
    if (tweenRef.current) cancelAnimationFrame(tweenRef.current)
    const start = displayBudget
    const t0 = performance.now()
    const dur = 550
    const step = (now: number) => {
      const k = Math.min(1, (now - t0) / dur)
      const e = 1 - Math.pow(1 - k, 3)
      setDisplayBudget(Math.round(start + (target - start) * e))
      if (k < 1) tweenRef.current = requestAnimationFrame(step)
    }
    tweenRef.current = requestAnimationFrame(step)
  }
  useEffect(() => () => { if (tweenRef.current) cancelAnimationFrame(tweenRef.current) }, [])

  const setVendor = (id: ProcId, idx: number) => {
    const next = { ...vendors, [id]: idx }
    setVendors(next)
    tweenBudget(budgetFor(next))
  }
  const setStatus = (id: number, status: ApprovalStatus) =>
    setApprovals((arr) => arr.map((a) => (a.id === id ? { ...a, status } : a)))
  const toggleHistory = (id: number) => setHistoryOpen((h) => (h === id ? null : id))

  const viewTitle = 'byld.space / riverside-residence / ' + MODULE_LABELS[tab].toLowerCase().replace(/ /g, '-')

  return (
    <section id="product" style={{ scrollMarginTop: 90, background: '#E7ECE8', borderTop: '1px solid #DBE3DC', borderBottom: '1px solid #DBE3DC' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: 'clamp(80px,10vw,140px) 40px' }}>
        <div data-reveal="1" style={{ maxWidth: 720, marginBottom: 'clamp(40px,5vw,64px)' }}>
          <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: '.24em', textTransform: 'uppercase', color: '#9A9D96', marginBottom: 24 }}>02 - The Product</div>
          <h2 style={{ fontFamily: serif, fontWeight: 600, fontSize: 'clamp(32px,4.4vw,56px)', lineHeight: 1.06, letterSpacing: '-0.025em', color: '#29261F' }}>One workspace, <span style={{ color: '#4E5E54' }}>every angle</span> of the project.</h2>
          <p style={{ margin: '22px 0 0', fontSize: 16, color: '#7C7F77' }}>Switch modules in the sidebar, every workflow is live and interactive.</p>
        </div>

        <div data-reveal="1" data-reveal-delay="0.08" style={{ background: '#F8FAF8', border: '1px solid #D9E1DA', borderRadius: 22, overflow: 'hidden', boxShadow: '0 2px 6px rgba(41,38,31,.03), 0 50px 90px -50px rgba(41,38,31,.35)' }}>
          {/* app chrome */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 18px', borderBottom: '1px solid #E1E7E2', background: '#F4F7F5' }}>
            <div style={{ display: 'flex', gap: 7 }}>
              {[0, 1, 2].map((i) => <span key={i} style={{ width: 11, height: 11, borderRadius: '50%', background: '#CCDBCF' }} />)}
            </div>
            <div style={{ flex: 1, maxWidth: 460, margin: '0 auto', background: '#E7ECE8', border: '1px solid #D9E1DA', borderRadius: 8, padding: '6px 14px', fontFamily: mono, fontSize: 11, color: '#7C7F77', textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{viewTitle}</div>
            <div style={{ display: 'flex' }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#4E5E54', border: '2px solid #F4F7F5' }} />
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#5E6E60', border: '2px solid #F4F7F5', marginLeft: -7 }} />
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#647A68', border: '2px solid #F4F7F5', marginLeft: -7 }} />
            </div>
          </div>

          <div style={{ display: 'flex', minHeight: 486, flexWrap: 'wrap' }}>
            {/* sidebar */}
            <div style={{ flex: 'none', width: 214, borderRight: '1px solid #E1E7E2', padding: '18px 14px', background: '#F4F7F5', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '0 8px 18px' }}><img src="/assets/byld-mark.png" alt="BYLD" style={{ height: 26, display: 'block' }} /></div>
              <div style={{ fontFamily: mono, fontSize: 9, letterSpacing: '.14em', color: '#9A9D96', padding: '0 11px 9px' }}>WORKSPACE</div>
              {MODULE_LABELS.map((label, i) => {
                const active = i === tab
                return (
                  <button key={label} onClick={() => setTab(i)} style={{
                    display: 'flex', alignItems: 'center', gap: 11, width: '100%', background: active ? '#E7ECE8' : 'transparent',
                    border: 'none', cursor: 'pointer', textAlign: 'left', padding: '9px 11px', borderRadius: 9, margin: '0 0 2px',
                    fontFamily: "'Inter',system-ui,sans-serif", fontSize: 13.5, fontWeight: active ? 600 : 500,
                    color: active ? '#29261F' : '#7C7F77', transition: 'background .25s, color .25s',
                  }}>
                    <span style={{ width: 22, height: 22, borderRadius: 6, flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, lineHeight: 1, background: active ? '#29261F' : '#DFE7E0', color: active ? '#F1F4F1' : '#9A9D96', transition: 'background .25s, color .25s' }}>{MODULE_GLYPHS[i]}</span>
                    <span>{label}</span>
                  </button>
                )
              })}
              <div style={{ marginTop: 'auto', padding: '14px 11px 0', borderTop: '1px solid #E1E7E2' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg,#88B396,#6F9D7E)' }} />
                  <div><div style={{ fontSize: 12, fontWeight: 600, color: '#29261F' }}>Studio Atelier</div><div style={{ fontFamily: mono, fontSize: 9, color: '#9A9D96' }}>8 PROJECTS</div></div>
                </div>
              </div>
            </div>

            {/* content, only the active module is mounted (so Documents replays its settle animation) */}
            <div style={{ flex: 1, minWidth: 280, padding: '24px 26px', position: 'relative' }}>
              {tab === 0 && <PMPanel />}
              {tab === 1 && <ProcPanel vendors={vendors} displayBudget={displayBudget} setVendor={setVendor} />}
              {tab === 2 && <DocsPanel />}
              {tab === 3 && <ApprovalsPanel approvals={approvals} historyOpen={historyOpen} setStatus={setStatus} toggleHistory={toggleHistory} />}
              {tab === 4 && <SitePanel />}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const panelIn: React.CSSProperties = { animation: 'panelIn .45s cubic-bezier(.2,.65,.3,1) both' }
// approval thumbnails by id: Facade, Lighting, Material schedule, Kitchen
const APPROVAL_SCENES: Record<number, SceneKind> = { 1: 'facade', 2: 'lighting', 3: 'schedule', 4: 'kitchen' }
const headTag = (s: string) => <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '.14em', color: '#9A9D96', marginBottom: 6 }}>{s}</div>
const h3 = (s: string) => <h3 style={{ fontFamily: serif, fontWeight: 600, fontSize: 30, letterSpacing: '-0.025em', color: '#7C7F77' }}>{s}</h3>

/* ── Module 1: Project Management ── */
function PMPanel() {
  const stat = (label: string, value: string, color: string) => (
    <div className="stat-card" style={{ background: '#E7ECE8', border: '1px solid #DCE3DD', borderRadius: 13, padding: 15, cursor: 'default' }}>
      <div style={{ fontFamily: mono, fontSize: 9.5, letterSpacing: '.1em', color: '#7C7F77' }}>{label}</div>
      <div style={{ fontFamily: serif, fontWeight: 600, fontSize: 38, color, marginTop: 4 }}>{value}</div>
    </div>
  )
  const proj = (scene: SceneKind, name: string, w: string, color: string, pct: string) => (
    <div className="hover-row" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 8px', borderRadius: 9 }}>
      <div style={{ position: 'relative', width: 34, height: 34, borderRadius: 8, overflow: 'hidden', flex: 'none' }}><Scene kind={scene} /></div>
      <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontSize: 13, fontWeight: 600, color: '#29261F' }}>{name}</div><div style={{ height: 5, width: '100%', background: '#DCE3DD', borderRadius: 3, marginTop: 7 }}><div style={{ width: w, height: '100%', background: color, borderRadius: 3 }} /></div></div>
      <span style={{ fontSize: 10.5, color: '#7C7F77', fontFamily: mono }}>{pct}</span>
    </div>
  )
  const act = (dot: string, text: string, time: string) => (
    <div style={{ display: 'flex', gap: 10, marginBottom: 13 }}><span style={{ width: 7, height: 7, borderRadius: '50%', background: dot, marginTop: 4, flex: 'none' }} /><div><div style={{ fontSize: 12, color: '#29261F' }}>{text}</div><div style={{ fontFamily: mono, fontSize: 9, color: '#9A9D96', marginTop: 2 }}>{time}</div></div></div>
  )
  return (
    <div style={panelIn}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>{headTag('MONDAY · 17 JUN')}{h3('Studio overview')}</div>
        <div className="newproj btn-dark" data-mag="0.3" style={{ background: '#29261F', color: '#F1F4F1', fontSize: 12.5, fontWeight: 500, padding: '9px 16px', borderRadius: 9, cursor: 'pointer' }}>+ New project</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 18 }}>
        {stat('ACTIVE PROJECTS', '8', '#29261F')}
        {stat('PENDING APPROVALS', '3', '#4E5E54')}
        {stat('ON SITE TODAY', '2', '#29261F')}
      </div>
      <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
        <div style={{ flex: '1.6', minWidth: 280, background: '#F8FAF8', border: '1px solid #E1E7E2', borderRadius: 13, overflow: 'hidden' }}>
          <div style={{ padding: '12px 15px', borderBottom: '1px solid #E5EAE5', fontSize: 12.5, fontWeight: 600, color: '#29261F' }}>Active projects</div>
          <div style={{ padding: '6px 8px' }}>
            {proj('facade', 'Riverside Residence', '72%', '#29261F', '72%')}
            {proj('interior', 'Marigold Café Interior', '40%', '#4E5E54', '40%')}
            {proj('house', 'Hillcrest Villa', '18%', '#B2C5B6', '18%')}
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 220, background: '#F8FAF8', border: '1px solid #E1E7E2', borderRadius: 13, padding: 14 }}>
          <div style={{ fontSize: 12.5, fontWeight: 600, color: '#29261F', marginBottom: 13 }}>Activity</div>
          {act('#5E6E62', 'Client approved facade design', '12 MIN AGO')}
          {act('#4E5E54', 'New quotation uploaded', '1 HR AGO')}
          {act('#B2C5B6', 'Site update, foundation poured', '3 HR AGO')}
        </div>
      </div>
    </div>
  )
}

/* ── Module 2: Procurement (interactive vendor compare) ── */
function ProcPanel({ vendors, displayBudget, setVendor }: { vendors: VendorSel; displayBudget: number; setVendor: (id: ProcId, idx: number) => void }) {
  return (
    <div style={panelIn}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, marginBottom: 18, flexWrap: 'wrap' }}>
        <div>{headTag('SELECT VENDORS · LIVE BUDGET')}{h3('Procurement')}</div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: mono, fontSize: 9.5, letterSpacing: '.1em', color: '#7C7F77' }}>ESTIMATED BUDGET</div>
          <div style={{ fontFamily: serif, fontWeight: 600, fontSize: 34, color: '#29261F', lineHeight: 1 }}>{fmtL(displayBudget)}</div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(252px,1fr))', gap: 12 }}>
        {PROC.map((it) => (
          <div key={it.id} style={{ background: '#F8FAF8', border: '1px solid #E1E7E2', borderRadius: 14, padding: 14 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 11 }}>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: '#29261F' }}>{it.name}</div>
              <div style={{ fontFamily: mono, fontSize: 9, color: '#9A9D96' }}>{it.sub}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              {it.vendors.map((v, vi) => {
                const sel = vi === vendors[it.id]
                return (
                  <div key={v.n} role="button" tabIndex={0}
                    onClick={() => setVendor(it.id, vi)}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setVendor(it.id, vi) } }}
                    aria-pressed={sel}
                    style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', gap: 10, padding: '11px 13px', borderRadius: 11, cursor: 'pointer', border: '1px solid ' + (sel ? '#29261F' : '#E1E7E2'), background: sel ? '#F8FAF8' : '#EFF3F0', transition: 'border-color .25s, background .25s, transform .25s' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 9, minWidth: 0 }}>
                      <span style={{ width: 16, height: 16, borderRadius: '50%', flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, lineHeight: 1, background: sel ? '#29261F' : 'transparent', color: '#F1F4F1', border: sel ? 'none' : '1px solid #B5CAB9' }}>{sel ? '✓' : ''}</span>
                      <div style={{ minWidth: 0 }}><div style={{ fontSize: 12.5, fontWeight: 500, color: '#29261F', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{v.n}</div><div style={{ fontFamily: mono, fontSize: 9, color: '#9A9D96', marginTop: 2 }}>★ {v.rating} · {v.lead}</div></div>
                    </div>
                    <div style={{ fontSize: 12.5, fontWeight: 600, color: '#29261F', whiteSpace: 'nowrap' }}>{fmtFull(v.price)}</div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Module 3: Documents (chaos → structure) ── */
function DocsPanel() {
  const scatter = (style: React.CSSProperties, name: string) => (
    <div style={{ position: 'absolute', background: '#F8FAF8', border: '1px solid #E1E7E2', borderRadius: 8, padding: '8px 11px', fontSize: 10.5, color: '#7C7F77', boxShadow: '0 8px 18px -10px rgba(41,38,31,.25)', ...style }}>{name}</div>
  )
  const settle = (from: string, delay: string, tone: string, name: string, tag: string, tagColor: string) => (
    <div style={{ '--from': from, animation: `settle .8s cubic-bezier(.2,.7,.3,1) both`, animationDelay: delay, display: 'flex', alignItems: 'center', gap: 11, background: '#EBEFEB', borderRadius: 9, padding: '9px 11px' } as React.CSSProperties}>
      <div style={{ width: 22, height: 28, borderRadius: 3, background: tone }} />
      <div style={{ flex: 1 }}><div style={{ fontSize: 11.5, color: '#29261F', fontWeight: 500 }}>{name}</div></div>
      <span style={{ fontSize: 9.5, color: tagColor, fontFamily: mono }}>{tag}</span>
    </div>
  )
  return (
    <div style={panelIn}>
      <div style={{ marginBottom: 18 }}>{headTag('FROM CHAOS TO STRUCTURE')}{h3('Documents')}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 200, position: 'relative', height: 232, border: '1px dashed #BFD3C3', borderRadius: 14, background: '#EFF3F0' }}>
          <div style={{ position: 'absolute', left: 14, top: 12, fontFamily: mono, fontSize: 9, letterSpacing: '.1em', color: '#9A9D96' }}>SCATTERED</div>
          {scatter({ left: 24, top: 48, transform: 'rotate(-9deg)' }, 'drawing_final_FINAL.pdf')}
          {scatter({ right: 20, top: 84, transform: 'rotate(7deg)' }, 'quote_v2.xlsx')}
          {scatter({ left: 40, bottom: 30, transform: 'rotate(4deg)' }, 'whatsapp_img.jpg')}
          {scatter({ right: 34, bottom: 60, transform: 'rotate(-5deg)' }, 'contract.pdf')}
        </div>
        <div style={{ flex: 'none', color: '#4E5E54', fontFamily: mono, fontSize: 20 }}>→</div>
        <div style={{ flex: 1, minWidth: 220, background: '#F8FAF8', border: '1px solid #E1E7E2', borderRadius: 14, padding: 14, height: 232 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}><span style={{ fontFamily: mono, fontSize: 9, letterSpacing: '.1em', color: '#5E6E62' }}>ORGANIZED · RIVERSIDE</span></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {settle('translate(-90px,-40px) rotate(-12deg)', '.05s', '#CCDBCF', 'Floor Plans, Rev C.pdf', 'DRAWINGS', '#5E6E62')}
            {settle('translate(110px,-20px) rotate(10deg)', '.16s', '#B9CFBE', 'Quotation_Marble.xlsx', 'QUOTES', '#7C7F77')}
            {settle('translate(-70px,40px) rotate(8deg)', '.27s', '#B2C5B6', 'Contract_Signed.pdf', 'LEGAL', '#7C7F77')}
            {settle('translate(90px,40px) rotate(-9deg)', '.38s', '#B4CBB9', 'Render_Living_v3.jpg', 'RENDERS', '#7C7F77')}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Module 4: Approvals (approve / reject / history) ── */
function ApprovalsPanel({ approvals, historyOpen, setStatus, toggleHistory }: {
  approvals: Approval[]; historyOpen: number | null;
  setStatus: (id: number, s: ApprovalStatus) => void; toggleHistory: (id: number) => void
}) {
  const chipFor = (s: ApprovalStatus) =>
    s === 'approved' ? { t: 'Approved', bg: '#E6ECE7', c: '#3E5447' }
      : s === 'rejected' ? { t: 'Changes requested', bg: '#E5EBE6', c: '#4E6B57' }
        : { t: 'Pending', bg: '#E3E9E4', c: '#4E6B57' }
  return (
    <div style={panelIn}>
      <div style={{ marginBottom: 18 }}>{headTag('REVIEW & DECIDE')}{h3('Approvals')}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
        {approvals.map((a) => {
          const chip = chipFor(a.status)
          const pending = a.status === 'pending'
          const border = a.status === 'approved' ? '#CBDBCE' : a.status === 'rejected' ? '#D4DED5' : '#E1E7E2'
          return (
            <div key={a.id} style={{ background: '#F8FAF8', border: '1px solid ' + border, borderRadius: 14, padding: 15, transition: 'border-color .35s, opacity .35s, transform .35s' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ position: 'relative', width: 54, height: 54, borderRadius: 10, overflow: 'hidden', flex: 'none' }}><Scene kind={APPROVAL_SCENES[a.id] || 'facade'} /></div>
                <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontSize: 14, fontWeight: 600, color: '#29261F' }}>{a.title}</div><div style={{ fontFamily: mono, fontSize: 9.5, color: '#9A9D96', marginTop: 4 }}>{a.meta}</div></div>
                {pending && (
                  <div style={{ display: 'flex', gap: 8, flex: 'none' }}>
                    <button className="btn-reject" onClick={() => setStatus(a.id, 'rejected')} style={{ border: '1px solid #CCDBCF', background: '#F8FAF8', color: '#7C7F77', fontFamily: "'Inter',system-ui,sans-serif", fontSize: 11.5, fontWeight: 600, padding: '7px 13px', borderRadius: 999, cursor: 'pointer' }}>Request changes</button>
                    <button className="btn-approve" onClick={() => setStatus(a.id, 'approved')} style={{ border: 'none', background: '#29261F', color: '#F1F4F1', fontFamily: "'Inter',system-ui,sans-serif", fontSize: 11.5, fontWeight: 600, padding: '7px 15px', borderRadius: 999, cursor: 'pointer' }}>Approve</button>
                  </div>
                )}
                <span style={{ background: chip.bg, color: chip.c, fontSize: 11, fontWeight: 600, padding: '6px 13px', borderRadius: 999, flex: 'none', whiteSpace: 'nowrap' }}>{chip.t}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 11, paddingTop: 11, borderTop: '1px solid #E5EAE5' }}>
                <button className="btn-history" onClick={() => toggleHistory(a.id)} aria-expanded={historyOpen === a.id} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: mono, fontSize: 10, letterSpacing: '.08em', color: '#7C7F77', padding: 0 }}>{historyOpen === a.id ? '▴' : '▾'} VIEW HISTORY</button>
              </div>
              {historyOpen === a.id && (
                <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 8, animation: 'panelIn .35s ease both' }}>
                  {a.history.map((h, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 9 }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: '#B2C5B6', flex: 'none' }} /><span style={{ fontSize: 11.5, color: '#54584F' }}>{h}</span></div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ── Module 5: Site Coordination ── */
function SitePanel() {
  const issue = (dot: string, text: string, status: string) => (
    <div className="hover-row" style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '9px 10px', borderRadius: 9, cursor: 'default' }}>
      <span style={{ width: 8, height: 8, borderRadius: '50%', background: dot, flex: 'none' }} />
      <div style={{ flex: 1 }}><div style={{ fontSize: 12, color: '#29261F', fontWeight: 500 }}>{text}</div></div>
      <span style={{ fontSize: 9.5, color: dot, fontFamily: mono }}>{status}</span>
    </div>
  )
  return (
    <div style={panelIn}>
      <div style={{ marginBottom: 18 }}>{headTag('OFFICE ↔ SITE')}{h3('Site coordination')}</div>
      <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
        <div style={{ flex: '1.3', minWidth: 260, position: 'relative', height: 262, borderRadius: 14, overflow: 'hidden', border: '1px solid #E1E7E2' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(135deg,#DCE3DD 0 13px,#D0DFD3 13px 26px)' }} />
          <div style={{ position: 'absolute', left: 16, top: 14, fontFamily: mono, fontSize: 9.5, letterSpacing: '.1em', color: '#7C7F77' }}>RIVERSIDE · PHASE 02</div>
          <div className="site-pill" style={{ position: 'absolute', left: 32, top: 80, display: 'flex', alignItems: 'center', gap: 8, background: '#F8FAF8', padding: '8px 13px', borderRadius: 999, boxShadow: '0 8px 20px -10px rgba(41,38,31,.35)', cursor: 'default' }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: '#5E6E62' }} /><span style={{ fontSize: 11.5, color: '#29261F', fontWeight: 500 }}>Foundation poured</span></div>
          <div className="site-pill" style={{ position: 'absolute', right: 28, top: 130, display: 'flex', alignItems: 'center', gap: 8, background: '#F8FAF8', padding: '8px 13px', borderRadius: 999, boxShadow: '0 8px 20px -10px rgba(41,38,31,.35)', cursor: 'default' }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: '#4E5E54' }} /><span style={{ fontSize: 11.5, color: '#29261F', fontWeight: 500 }}>Steelwork in progress</span></div>
          <div style={{ position: 'absolute', left: 40, bottom: 24, display: 'flex', alignItems: 'center', gap: 8, background: '#29261F', padding: '8px 13px', borderRadius: 999 }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: '#5E6E62' }} /><span style={{ fontSize: 11.5, color: '#F1F4F1', fontWeight: 500 }}>3 issues resolved</span></div>
        </div>
        <div style={{ flex: 1, minWidth: 220, background: '#F8FAF8', border: '1px solid #E1E7E2', borderRadius: 14, padding: 14 }}>
          <div style={{ fontSize: 12.5, fontWeight: 600, color: '#29261F', marginBottom: 12 }}>Issue tracker</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
            {issue('#4E6B57', 'Plumbing clash, Level 1', 'OPEN')}
            {issue('#4E5E54', 'Tile sample mismatch', 'REVIEW')}
            {issue('#5E6E62', 'Site measurements verified', 'CLOSED')}
            {issue('#5E6E62', 'Electrical rough-in approved', 'CLOSED')}
          </div>
        </div>
      </div>
    </div>
  )
}
