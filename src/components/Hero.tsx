import { useEffect, useRef, useState } from 'react'
import { ACCENT } from '../data'
import { prefersReducedMotion } from '../hooks/useInteractions'

const mono = "'JetBrains Mono',monospace"
const serif = "'Inter',system-ui,sans-serif"

const VIDEO = '/assets/hero-villa-2.mp4'
const POSTER = '/assets/hero-villa-poster.jpg'

const clamp = (n: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, n))

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [progress, setProgress] = useState(0)
  const [reduce] = useState(prefersReducedMotion)

  // Scrub the video's currentTime to scroll position while the hero is pinned.
  useEffect(() => {
    if (reduce) return
    const section = sectionRef.current
    const video = videoRef.current
    if (!section || !video) return

    let duration = video.duration || 0
    const onMeta = () => { duration = video.duration || 0 }
    video.addEventListener('loadedmetadata', onMeta)

    let target = 0 // desired currentTime, lerped toward each frame for buttery scrubbing
    const compute = () => {
      const rect = section.getBoundingClientRect()
      const span = rect.height - window.innerHeight
      const p = span > 0 ? clamp(-rect.top / span, 0, 1) : 0
      setProgress(p)
      target = p * (duration || 0)
    }

    let raf = 0
    const tick = () => {
      if (duration) {
        const diff = target - video.currentTime
        if (Math.abs(diff) > 0.003) video.currentTime += diff * 0.18
      }
      raf = requestAnimationFrame(tick)
    }

    compute()
    raf = requestAnimationFrame(tick)
    const onScroll = () => compute()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      video.removeEventListener('loadedmetadata', onMeta)
    }
  }, [reduce])

  // progress-driven overlay transitions
  const contentOpacity = reduce ? 1 : 1 - clamp((progress - 0.5) / 0.28, 0, 1)
  const contentShift = reduce ? 0 : -progress * 46
  const paperFade = reduce ? 0 : clamp((progress - 0.76) / 0.24, 0, 1)
  const hintOpacity = reduce ? 0 : 1 - clamp(progress / 0.12, 0, 1)

  return (
    <section id="top" ref={sectionRef} style={{
      position: 'relative',
      height: reduce ? 'auto' : '320vh',
      background: '#14120E',
    }}>
      <div style={{
        position: reduce ? 'relative' : 'sticky', top: 0,
        height: reduce ? 'auto' : '100vh', minHeight: reduce ? '88vh' : undefined,
        overflow: 'hidden', display: 'flex', alignItems: 'center',
      }}>
        {/* video / poster layer */}
        {reduce ? (
          <img src={POSTER} alt="" aria-hidden="true" style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
          }} />
        ) : (
          <video
            ref={videoRef} src={VIDEO} poster={POSTER}
            muted playsInline preload="auto"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}

        {/* warm legibility scrim */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background:
            'linear-gradient(90deg, rgba(18,16,12,.78) 0%, rgba(18,16,12,.46) 38%, rgba(18,16,12,.10) 66%, rgba(18,16,12,.30) 100%),' +
            'linear-gradient(180deg, rgba(18,16,12,.34) 0%, rgba(18,16,12,0) 28%, rgba(18,16,12,0) 64%, rgba(18,16,12,.40) 100%)',
        }} />

        {/* copy */}
        <div style={{
          position: 'relative', zIndex: 2, width: '100%', maxWidth: 1240,
          margin: '0 auto', padding: 'clamp(72px,9vw,120px) 40px',
          opacity: contentOpacity, transform: `translateY(${contentShift}px)`,
          transition: reduce ? undefined : 'opacity .25s linear',
          willChange: 'opacity, transform',
        }}>
          <div style={{ maxWidth: 760 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 30 }}>
              <span style={{ fontFamily: mono, fontSize: 11, letterSpacing: '.24em', textTransform: 'uppercase', color: 'rgba(246,244,239,.62)' }}>BYLD Space</span>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 7, border: '1px solid rgba(246,244,239,.28)', borderRadius: 999,
                padding: '5px 11px 5px 9px', fontFamily: mono, fontSize: 10.5, letterSpacing: '.16em',
                textTransform: 'uppercase', color: 'rgba(246,244,239,.78)', background: 'rgba(246,244,239,.06)', whiteSpace: 'nowrap',
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: ACCENT, animation: 'pulse 2.6s ease-in-out infinite' }} />Coming Soon
              </span>
            </div>

            <h1 style={{ fontFamily: serif, fontWeight: 800, fontSize: 'clamp(44px,6.4vw,86px)', lineHeight: 1.02, letterSpacing: '-0.025em', color: '#F6F4EF', overflowWrap: 'break-word' }}>
              The workspace built for <span style={{ color: '#E4B488' }}>modern architecture</span> and interior firms.
            </h1>

            <p style={{ margin: '30px 0 0', maxWidth: 500, fontSize: 'clamp(17px,1.5vw,19px)', lineHeight: 1.62, color: 'rgba(246,244,239,.82)' }}>
              Manage projects, collaborate with clients, organize documents, and keep teams aligned, all from one place.
            </p>
            <p style={{ margin: '18px 0 0', fontSize: 15, lineHeight: 1.6, color: 'rgba(246,244,239,.56)' }}>
              Built for architects, interior designers, and design-build teams.
            </p>

            <div style={{ marginTop: 38, display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
              <a href="#access" data-mag="0.45" className="hero-cta" style={{
                display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none', background: '#F6F4EF',
                color: '#29261F', fontSize: 15.5, fontWeight: 600, letterSpacing: '-0.01em', padding: '16px 28px',
                borderRadius: 999, boxShadow: '0 18px 40px -16px rgba(0,0,0,.6)',
                transition: 'transform .4s cubic-bezier(.2,.7,.3,1), box-shadow .4s, background .4s',
              }}>
                Join Early Access
                <span style={{ fontFamily: mono, fontSize: 14 }}>→</span>
              </a>
              <span style={{ fontSize: 14, color: 'rgba(246,244,239,.6)' }}>Be first when we launch.</span>
            </div>
          </div>
        </div>

        {/* scroll hint */}
        {!reduce && (
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
        {!reduce && (
          <div aria-hidden="true" style={{
            position: 'absolute', inset: 0, background: '#F6F4EF', opacity: paperFade,
            pointerEvents: 'none', zIndex: 3,
          }} />
        )}
      </div>
    </section>
  )
}
