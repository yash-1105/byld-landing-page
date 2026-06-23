import { useEffect, useRef, useState } from 'react'
import { ACCENT } from '../data'
import { prefersReducedMotion } from '../hooks/useInteractions'

const mono = "'JetBrains Mono',monospace"
const serif = "'Inter',system-ui,sans-serif"

const VIDEO = '/assets/hero-villa-2.mp4'                  // desktop: landscape, all-intra
const POSTER = '/assets/hero-villa-poster.jpg'
const MOBILE_VIDEO = '/assets/hero-villa-mobile-v2.mp4'  // mobile: vertical 9:16, all-intra
const MOBILE_POSTER = '/assets/hero-villa-mobile-poster.jpg'

const clamp = (n: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, n))
const matchMobile = () => typeof window !== 'undefined' && window.matchMedia('(max-width: 820px)').matches

const cover: React.CSSProperties = { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [progress, setProgress] = useState(0)
  const [reduce] = useState(prefersReducedMotion)
  const [mobile, setMobile] = useState(matchMobile)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 820px)')
    const onChange = () => setMobile(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  // Scrub video currentTime to scroll position while the hero is pinned.
  // Mobile: direct seek on scroll (no RAF loop) + prime only on first touch gesture.
  // Desktop: smooth lerp via RAF loop.
  useEffect(() => {
    if (reduce) return
    const section = sectionRef.current
    const video = videoRef.current
    if (!section || !video) return

    let duration = video.duration || 0
    const onMeta = () => { duration = video.duration || 0 }
    video.addEventListener('loadedmetadata', onMeta)

    let target = 0
    let prog = 0
    const compute = () => {
      const rect = section.getBoundingClientRect()
      const span = rect.height - window.innerHeight
      prog = span > 0 ? clamp(-rect.top / span, 0, 1) : 0
      target = prog * (duration || 0)
    }

    if (mobile) {
      // iOS won't decode/paint a *seeked* frame until video playback has been
      // unlocked by a user-gesture-initiated play(). A seek-only prime therefore
      // just drops the poster and paints nothing → a black hero. Unlock with
      // play() + a *synchronous* pause(): the gesture grants decode permission,
      // but pausing in the same tick means the clip never visibly runs forward
      // (the play() promise rejects with AbortError — swallowed). Then seek so the
      // frame at the current scroll position actually paints.
      let primed = false
      const prime = () => {
        if (primed) return
        primed = true
        video.muted = true
        try {
          const p = video.play()
          video.pause()
          if (p && p.catch) p.catch(() => {})
        } catch { /* unlock best-effort */ }
        compute()
        if (duration) video.currentTime = target
      }
      window.addEventListener('touchstart', prime, { passive: true, once: true })

      // Coalesce work to one frame: setting currentTime on every scroll event (and
      // re-rendering via setProgress each event) thrashes the decoder and lags. Recompute
      // + repaint at most once per rAF, and never issue a new seek while one is in flight.
      let dirty = false
      let needSeek = false
      let seeking = false
      const onSeeked = () => { seeking = false }
      video.addEventListener('seeked', onSeeked)

      const onScroll = () => { dirty = true }
      let raf = 0
      const loop = () => {
        if (dirty) {
          dirty = false
          compute()
          setProgress(prog)
          needSeek = true
        }
        if (needSeek && !seeking && duration && Math.abs(target - video.currentTime) > 0.01) {
          needSeek = false
          seeking = true
          video.currentTime = target
        }
        raf = requestAnimationFrame(loop)
      }
      compute()
      setProgress(prog)
      // don't seek before the gesture unlock (prime) — seeking now would drop the
      // poster and paint nothing (black). prime() does the first real seek.
      raf = requestAnimationFrame(loop)
      window.addEventListener('scroll', onScroll, { passive: true })
      window.addEventListener('resize', onScroll)
      return () => {
        cancelAnimationFrame(raf)
        window.removeEventListener('touchstart', prime)
        window.removeEventListener('scroll', onScroll)
        window.removeEventListener('resize', onScroll)
        video.removeEventListener('seeked', onSeeked)
        video.removeEventListener('loadedmetadata', onMeta)
      }
    }

    // Desktop: smooth lerp via RAF
    let raf = 0
    const tick = () => {
      if (duration) {
        const diff = target - video.currentTime
        if (Math.abs(diff) > 0.003) video.currentTime += diff * 0.18
      }
      raf = requestAnimationFrame(tick)
    }
    compute()
    setProgress(prog)
    raf = requestAnimationFrame(tick)
    const onScroll = () => { compute(); setProgress(prog) }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      video.removeEventListener('loadedmetadata', onMeta)
    }
  }, [reduce, mobile])

  // progress-driven overlay transitions
  const contentOpacity = reduce ? 1 : 1 - clamp((progress - 0.5) / 0.28, 0, 1)
  const contentShift = reduce ? 0 : -progress * 46
  const paperFade = reduce ? 0 : clamp((progress - 0.76) / 0.24, 0, 1)
  const hintOpacity = reduce ? 0 : 1 - clamp(progress / 0.12, 0, 1)

  const copy = (
    <div style={{ maxWidth: 760 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 30, flexWrap: 'wrap' }}>
        <span style={{ fontFamily: mono, fontSize: 11, letterSpacing: '.24em', textTransform: 'uppercase', color: 'rgba(246,244,239,.62)' }}>BYLD Space</span>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 7, border: '1px solid rgba(246,244,239,.28)', borderRadius: 999,
          padding: '5px 11px 5px 9px', fontFamily: mono, fontSize: 10.5, letterSpacing: '.16em',
          textTransform: 'uppercase', color: 'rgba(246,244,239,.78)', background: 'rgba(246,244,239,.06)', whiteSpace: 'nowrap',
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: ACCENT, animation: 'pulse 2.6s ease-in-out infinite' }} />Coming Soon
        </span>
      </div>

      <h1 style={{ fontFamily: serif, fontWeight: 600, fontSize: 'clamp(30px,4.1vw,56px)', lineHeight: 1.1, letterSpacing: '-0.03em', color: '#F6F4EF', overflowWrap: 'break-word' }}>
        The workspace built for <span style={{ color: '#E4B488' }}>modern architecture</span> and interior firms.
      </h1>

      <p style={{ margin: '30px 0 0', maxWidth: 500, fontSize: 'clamp(16px,1.5vw,19px)', lineHeight: 1.62, color: 'rgba(246,244,239,.82)' }}>
        Manage projects, collaborate with clients, organize documents, and keep teams aligned, all from one place.
      </p>
      <p style={{ margin: '18px 0 0', fontSize: 15, lineHeight: 1.6, color: 'rgba(246,244,239,.56)' }}>
        Built for architects, interior designers, and design-build teams.
      </p>

      <div style={{ marginTop: 38, display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
        <a href="#access" data-mag="0.45" className="hero-cta" style={{
          display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none', background: '#F6F4EF',
          color: '#29261F', fontSize: 15.5, fontWeight: 600, letterSpacing: '-0.01em', padding: '16px 28px',
          borderRadius: 999, boxShadow: '0 18px 40px -16px rgba(20,15,9,.5)',
          transition: 'transform .4s cubic-bezier(.2,.7,.3,1), box-shadow .4s, background .4s',
        }}>
          Join Early Access
          <span style={{ fontFamily: mono, fontSize: 14 }}>→</span>
        </a>
        <span style={{ fontSize: 14, color: 'rgba(246,244,239,.6)' }}>Be first when we launch.</span>
      </div>
    </div>
  )

  // ── reduced-motion: static poster, normal scroll ──
  if (reduce) {
    return (
      <section id="top" style={{
        position: 'relative', minHeight: '100svh', background: '#14120E',
        display: 'flex', alignItems: 'center', overflow: 'hidden',
      }}>
        <img src={mobile ? MOBILE_POSTER : POSTER} alt="" aria-hidden="true" style={cover} />
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'rgba(18,16,12,.5)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 1240, margin: '0 auto', padding: 'clamp(96px,16vh,140px) clamp(22px,6vw,40px)' }}>
          {copy}
        </div>
      </section>
    )
  }

  // ── pinned, scroll-scrubbed video (landscape on desktop, vertical 9:16 on mobile) ──
  const src = mobile ? MOBILE_VIDEO : VIDEO
  const poster = mobile ? MOBILE_POSTER : POSTER
  const scrim = mobile
    ? 'linear-gradient(180deg, rgba(18,16,12,.64) 0%, rgba(18,16,12,.30) 15%, rgba(18,16,12,.30) 40%, rgba(18,16,12,.44) 66%, rgba(18,16,12,.74) 100%)'
    : 'linear-gradient(90deg, rgba(18,16,12,.78) 0%, rgba(18,16,12,.46) 38%, rgba(18,16,12,.10) 66%, rgba(18,16,12,.30) 100%),' +
      'linear-gradient(180deg, rgba(18,16,12,.34) 0%, rgba(18,16,12,0) 28%, rgba(18,16,12,0) 64%, rgba(18,16,12,.40) 100%)'

  return (
    <section id="top" ref={sectionRef} style={{ position: 'relative', height: '320vh', background: '#14120E' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
        <video
          key={src} ref={videoRef} src={src} poster={poster}
          muted playsInline preload="auto"
          style={cover}
        />

        {/* legibility scrim */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: scrim }} />

        {/* copy */}
        <div style={{
          position: 'relative', zIndex: 2, width: '100%', maxWidth: 1240, margin: '0 auto',
          padding: mobile ? 'clamp(72px,9vw,120px) clamp(22px,6vw,34px)' : 'clamp(72px,9vw,120px) 40px',
          opacity: contentOpacity, transform: `translateY(${contentShift}px)`,
          transition: 'opacity .25s linear', willChange: 'opacity, transform',
        }}>
          {copy}
        </div>

        {/* scroll hint (desktop only — would collide with centered copy on tall phones) */}
        {!mobile && (
          <div aria-hidden="true" style={{
            position: 'absolute', bottom: 30, left: '50%', transform: 'translateX(-50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 9,
            opacity: hintOpacity, transition: 'opacity .25s linear', pointerEvents: 'none', zIndex: 2,
          }}>
            <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: '.22em', textTransform: 'uppercase', color: 'rgba(246,244,239,.6)' }}>Scroll</span>
            <span style={{ width: 1, height: 34, background: 'linear-gradient(rgba(246,244,239,.6), rgba(246,244,239,0))' }} />
          </div>
        )}

        {/* fade to paper as the pin releases, easing into the light sections below */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0, background: '#F6F4EF', opacity: paperFade,
          pointerEvents: 'none', zIndex: 3,
        }} />
      </div>
    </section>
  )
}
