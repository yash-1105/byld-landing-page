import { useEffect, useState } from 'react'

export default function Nav() {
  // 0 = transparent over the hero video, 1 = opaque paper bar.
  // Tied to the hero's scroll progress so the bar fades in exactly as the hero
  // dissolves to paper (same curve as Hero's paperFade), staying clear for the
  // whole video and turning solid only as the next section arrives.
  const [t, setT] = useState(0)
  useEffect(() => {
    const clamp = (n: number) => Math.max(0, Math.min(1, n))
    const onScroll = () => {
      const hero = document.getElementById('top')
      if (!hero) { setT(1); return }
      const rect = hero.getBoundingClientRect()
      const span = rect.height - window.innerHeight
      const progress = span > 0 ? clamp(-rect.top / span) : 1
      setT(clamp((progress - 0.76) / 0.24))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      backdropFilter: t > 0.02 ? 'saturate(140%) blur(14px)' : 'none',
      WebkitBackdropFilter: t > 0.02 ? 'saturate(140%) blur(14px)' : 'none',
      background: `rgba(246,244,239,${(0.72 * t).toFixed(3)})`,
      borderBottom: `1px solid rgba(228,222,210,${(0.7 * t).toFixed(3)})`,
      transition: 'background .25s ease, border-color .25s ease',
    }}>
      <nav style={{ width: '100%', padding: '18px clamp(20px,4vw,56px)', display: 'flex', alignItems: 'center', gap: 32 }}>
        <a href="#top" style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', textDecoration: 'none', marginRight: 'auto' }}>
          {/* dark wordmark (visible once the bar turns to paper) */}
          <img src="/assets/byld-logo.png" alt="BYLD Space" style={{ height: 24, display: 'block' }} />
          {/* white wordmark, fades out as the bar becomes opaque, keeps the logo legible over the dark hero */}
          <img
            src="/assets/byld-logo.png" alt="" aria-hidden="true"
            style={{
              position: 'absolute', left: 0, top: 0, height: 24, display: 'block', pointerEvents: 'none',
              filter: 'brightness(0) invert(1)', opacity: 1 - t, transition: 'opacity .25s ease',
            }}
          />
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
