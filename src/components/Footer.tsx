const mono = "'JetBrains Mono',monospace"

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid #DBE3DC', background: '#E7ECE8' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: 'clamp(56px,7vw,88px) 40px clamp(36px,4vw,48px)', display: 'flex', flexWrap: 'wrap', gap: 48, justifyContent: 'space-between' }}>
        <div style={{ flex: '1 1 320px', minWidth: 280, maxWidth: 380 }}>
          <img src="/assets/byld-lockup.png" alt="BYLD Space" style={{ height: 48, marginBottom: 22 }} />
          <p style={{ fontSize: 14.5, lineHeight: 1.62, color: '#7C7F77' }}>The workspace built for modern architecture and interior firms. Projects, collaboration, documents and talent, together in one place.</p>
          <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
            {[
              { s: 'in', label: 'LinkedIn', href: 'https://www.linkedin.com/company/byld-space/' },
              { s: 'ig', label: 'Instagram', href: 'https://www.instagram.com/byldspace' },
              { s: 'x', label: 'X', href: 'https://x.com/byldspace' },
            ].map(({ s, label, href }) => (
              <a key={s} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="social" style={{ width: 38, height: 38, borderRadius: '50%', border: '1px solid #C9D9CC', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', color: '#7C7F77', fontFamily: mono, fontSize: 11 }}>{s}</a>
            ))}
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 40px 40px', display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: '.06em', color: '#9A9D96' }}>© 2026 BYLD Space. All rights reserved.</div>
        <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: '.06em', color: '#9A9D96' }}>Coming Soon · Built for architects &amp; designers</div>
      </div>
    </footer>
  )
}
