import type { ReactNode } from 'react'
import { WhatsAppLogo, ExcelLogo, DriveLogo, GmailLogo } from './BrandLogos'

const mono = "'JetBrains Mono',monospace"
const serif = "'Newsreader',serif"

const tileBase = (rot: number): React.CSSProperties => ({
  aspectRatio: '1', borderRadius: 14, background: '#FCFAF6', border: '1px dashed #D8CDBA',
  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10,
  transform: `rotate(${rot}deg)`,
})

function ToolTile({ rot, logo, label }: { rot: number; logo: ReactNode; label: string }) {
  return (
    <div className="tool-tile" style={tileBase(rot)}>
      {logo}
      <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: '.08em', color: '#8B8275' }}>{label}</span>
    </div>
  )
}

export default function Problem() {
  return (
    <section style={{ background: '#F1ECE2', borderTop: '1px solid #E8E2D6', borderBottom: '1px solid #E8E2D6' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: 'clamp(72px,9vw,128px) 40px', display: 'flex', flexWrap: 'wrap', gap: 'clamp(40px,6vw,88px)' }}>
        <div data-reveal="1" style={{ flex: '1 1 420px', minWidth: 300 }}>
          <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: '.24em', textTransform: 'uppercase', color: '#A79E90', marginBottom: 24 }}>02 — The Problem</div>
          <h2 style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(32px,4.4vw,58px)', lineHeight: 1.06, letterSpacing: '-0.02em', color: '#29261F' }}>
            Stop managing projects across <span style={{ fontStyle: 'italic' }}>five different tools.</span>
          </h2>
          <p style={{ margin: '32px 0 0', maxWidth: 430, fontSize: 18, lineHeight: 1.65, color: '#5C564B' }}>
            Projects shouldn't live across WhatsApp, Excel, Google Drive, emails, and endless follow-ups.
          </p>
          <p style={{ margin: '20px 0 0', maxWidth: 430, fontSize: 18, lineHeight: 1.65, color: '#5C564B' }}>
            BYLD Space brings your projects, files, communication, and approvals together in one organized workspace.
          </p>
        </div>

        <div data-reveal="1" data-reveal-delay="0.1" style={{ flex: '1 1 420px', minWidth: 300, display: 'flex', alignItems: 'center', gap: 'clamp(12px,2.4vw,30px)' }}>
          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <ToolTile rot={-4} logo={<WhatsAppLogo />} label="WhatsApp" />
            <ToolTile rot={3} logo={<ExcelLogo />} label="Excel" />
            <ToolTile rot={2} logo={<DriveLogo />} label="Drive" />
            <ToolTile rot={-3} logo={<GmailLogo />} label="Gmail" />
          </div>
          <div style={{ flex: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, color: '#B17A57' }}>
            <span style={{ fontFamily: mono, fontSize: 20 }}>→</span>
          </div>
          <div data-tilt="7" style={{ flex: '1.05', aspectRatio: '.92', borderRadius: 18, background: '#29261F', boxShadow: '0 30px 60px -28px rgba(41,38,31,.5)', padding: 18, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transition: 'transform .3s ease' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}><span style={{ width: 7, height: 7, borderRadius: '50%', background: '#7E866A' }} /><span style={{ fontFamily: mono, fontSize: 9.5, letterSpacing: '.14em', color: '#A79E90' }}>BYLD SPACE</span></div>
              <div style={{ height: 7, width: '85%', background: 'rgba(246,244,239,.22)', borderRadius: 4, marginBottom: 9 }} />
              <div style={{ height: 7, width: '62%', background: 'rgba(246,244,239,.14)', borderRadius: 4, marginBottom: 9 }} />
              <div style={{ height: 7, width: '74%', background: 'rgba(246,244,239,.14)', borderRadius: 4 }} />
            </div>
            <div style={{ display: 'flex', gap: 7 }}>
              <div style={{ flex: 1, height: 30, borderRadius: 8, background: 'rgba(246,244,239,.08)' }} />
              <div style={{ flex: 1, height: 30, borderRadius: 8, background: 'rgba(246,244,239,.08)' }} />
              <div style={{ flex: 1, height: 30, borderRadius: 8, background: 'rgba(177,122,87,.45)' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
