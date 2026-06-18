export default function Nav() {
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 100,
      backdropFilter: 'saturate(140%) blur(14px)', WebkitBackdropFilter: 'saturate(140%) blur(14px)',
      background: 'rgba(246,244,239,.72)', borderBottom: '1px solid rgba(228,222,210,.7)',
    }}>
      <nav style={{ width: '100%', padding: '18px clamp(20px,4vw,56px)', display: 'flex', alignItems: 'center', gap: 32 }}>
        <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginRight: 'auto' }}>
          <img src="/assets/byld-logo.png" alt="BYLD Space" style={{ height: 24, display: 'block' }} />
        </a>
        <a href="#access" data-mag="0.4" className="btn-dark nav-pill" style={{
          textDecoration: 'none', background: '#29261F', color: '#F6F4EF', fontSize: 14, fontWeight: 500,
          letterSpacing: '-0.01em', padding: '11px 20px', borderRadius: 999,
          transition: 'transform .35s cubic-bezier(.2,.7,.3,1), box-shadow .35s, background .35s',
          whiteSpace: 'nowrap', boxShadow: '0 10px 22px -14px rgba(41,38,31,.6)',
        }}>Join Early Access</a>
      </nav>
    </header>
  )
}
