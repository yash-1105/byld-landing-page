import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '../hooks/useInteractions'


const VIDEO = '/assets/the-problem.mp4'              // desktop: 16:9, all-intra so seeks paint instantly
const POSTER = '/assets/the-problem-poster.jpg'
const MOBILE_VIDEO = '/assets/the-problem-phone.mp4' // mobile: vertical 9:16, all-intra
const MOBILE_POSTER = '/assets/the-problem-phone-poster.jpg'

const clamp = (n: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, n))
const matchMobile = () => typeof window !== 'undefined' && window.matchMedia('(max-width: 820px)').matches

// the video animation is the section: warm cloth bg, headline, the five tools, then
// the resolve into the BYLD Space dashboard. all copy is baked into the clip.
const cardStyle = (mobile: boolean): React.CSSProperties => ({
  position: 'relative', width: '100%', maxWidth: mobile ? 440 : 1180, margin: '0 auto',
  aspectRatio: mobile ? '9 / 16' : '16 / 9', borderRadius: 18, overflow: 'hidden',
  background: '#E3D8CA', boxShadow: '0 40px 80px -42px rgba(41,38,31,.42)',
  border: '1px solid #E8E2D6',
})
const fill: React.CSSProperties = { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }

export default function Problem() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [reduce] = useState(prefersReducedMotion)
  const [mobile, setMobile] = useState(matchMobile)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 820px)')
    const onChange = () => setMobile(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  // Scrub the clip's currentTime to scroll position while the card is pinned.
  // Same approach as the hero; the clip is all-intra so seeks paint immediately.
  useEffect(() => {
    if (reduce) return
    const section = sectionRef.current
    const video = videoRef.current
    if (!section || !video) return

    let duration = video.duration || 0
    const onMeta = () => { duration = video.duration || 0 }
    video.addEventListener('loadedmetadata', onMeta)

    // iOS only paints seeked frames after a gesture-initiated play() unlocks the
    // decoder. play() + a *synchronous* pause() grants that permission without the
    // clip visibly running forward (the play() promise rejects — swallowed).
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
    }
    const onFirst = () => prime()
    window.addEventListener('touchstart', onFirst, { passive: true, once: true })

    let target = 0
    const compute = () => {
      const rect = section.getBoundingClientRect()
      const span = rect.height - window.innerHeight
      const p = span > 0 ? clamp(-rect.top / span, 0, 1) : 0
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
      window.removeEventListener('touchstart', onFirst)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      video.removeEventListener('loadedmetadata', onMeta)
    }
  }, [reduce, mobile])

  const shell: React.CSSProperties = {
    background: '#F1ECE2', borderTop: '1px solid #E8E2D6', borderBottom: '1px solid #E8E2D6',
  }

  const src = mobile ? MOBILE_VIDEO : VIDEO
  const poster = mobile ? MOBILE_POSTER : POSTER

  // ── reduced-motion: static representative frame, normal scroll ──
  if (reduce) {
    return (
      <section style={shell}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: 'clamp(72px,9vw,128px) 40px' }} data-reveal="1">
          <div style={cardStyle(mobile)}>
            <img src={poster} alt="BYLD Space brings projects, files, communication, and approvals together in one organized workspace." style={fill} />
          </div>
        </div>
      </section>
    )
  }

  // ── pinned, scroll-scrubbed video card ──
  // tall section gives the scrub distance; the card stays centered while it plays.
  return (
    <section ref={sectionRef} style={{ ...shell, height: mobile ? '260vh' : '320vh' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden' }}>
        <div style={{ width: '100%', maxWidth: 1240, margin: '0 auto', padding: '0 clamp(22px,5vw,40px)' }}>
          <div style={cardStyle(mobile)}>
            <video
              key={src} ref={videoRef} src={src} poster={poster}
              muted playsInline preload="auto"
              style={fill}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
