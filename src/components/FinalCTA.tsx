import { useState } from 'react'
import { ACCENT } from '../data'

const mono = "'JetBrains Mono',monospace"
const serif = "'Inter',system-ui,sans-serif"

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function FinalCTA() {
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('') // honeypot
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (status === 'loading' || status === 'success') return
    const value = email.trim()
    if (!value) return
    setStatus('loading')
    setError('')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: value, website }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data.ok) throw new Error(data.error || 'Something went wrong. Please try again.')
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  const buttonLabel =
    status === 'loading' ? 'Joining…' : status === 'success' ? 'You’re on the list ✓' : status === 'error' ? 'Try again' : 'Join Early Access'

  return (
    <section id="access" style={{ scrollMarginTop: 90, padding: 'clamp(40px,5vw,72px) 40px clamp(56px,7vw,96px)' }}>
      <div data-reveal="1" style={{ maxWidth: 1080, margin: '0 auto', background: 'linear-gradient(165deg,#DCE3DD,#C8D8CB)', border: '1px solid #CCDBCF', borderRadius: 32, padding: 'clamp(56px,8vw,104px) clamp(32px,6vw,80px)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -120, left: '50%', transform: 'translateX(-50%)', width: 520, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(248,250,248,.7), rgba(248,250,248,0) 70%)' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, width: '40%', height: '100%', background: 'linear-gradient(105deg, rgba(255,255,255,0) 0%, rgba(255,255,255,.45) 50%, rgba(255,255,255,0) 100%)', animation: 'sheenSlide 7s ease-in-out infinite', pointerEvents: 'none' }} />
        <div style={{ position: 'relative' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '1px solid #B8CDBD', borderRadius: 999, padding: '6px 13px', fontFamily: mono, fontSize: 11, letterSpacing: '.16em', textTransform: 'uppercase', color: '#7C7F77', marginBottom: 30 }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: ACCENT, animation: 'pulse 2.6s ease-in-out infinite' }} />Coming Soon</span>
          <h2 style={{ fontFamily: serif, fontWeight: 600, fontSize: 'clamp(40px,6vw,80px)', lineHeight: 1.0, letterSpacing: '-0.03em', color: '#7C7F77' }}>Less chaos. <span style={{ color: '#4E5E54' }}>More building.</span></h2>
          <p style={{ margin: '30px auto 0', maxWidth: 520, fontSize: 18, lineHeight: 1.6, color: '#54584F' }}>Projects, collaboration, and flexible talent, all in one ecosystem.</p>
          <p style={{ margin: '14px auto 0', maxWidth: 520, fontSize: 18, lineHeight: 1.6, color: '#54584F' }}>BYLD Space is reimagining how design and construction teams work together.</p>
          <form onSubmit={submit} style={{ margin: '40px auto 0', maxWidth: 440, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {/* honeypot, hidden from humans, catches bots */}
            <input
              type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true"
              value={website} onChange={(e) => setWebsite(e.target.value)}
              style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
            />
            <input
              type="email" required value={email}
              onChange={(e) => { setEmail(e.target.value); if (status !== 'loading') { setStatus('idle'); setError('') } }}
              placeholder="you@studio.com" aria-label="Email address"
              disabled={status === 'success'}
              className="email-input"
              style={{ flex: 1, minWidth: 200, background: '#F8FAF8', border: '1px solid #BFD3C3', borderRadius: 999, padding: '15px 22px', fontFamily: "'Inter',system-ui,sans-serif", fontSize: 15, color: '#29261F', outline: 'none' }}
            />
            <button data-mag="0.4" className="btn-dark cta-submit" type="submit" disabled={status === 'loading' || status === 'success'}
              style={{ background: '#29261F', color: '#F1F4F1', border: 'none', cursor: status === 'loading' || status === 'success' ? 'default' : 'pointer', fontFamily: "'Inter',system-ui,sans-serif", fontSize: 15, fontWeight: 500, padding: '15px 28px', borderRadius: 999, whiteSpace: 'nowrap', transition: 'transform .35s cubic-bezier(.2,.7,.3,1), background .35s, box-shadow .35s', boxShadow: '0 12px 26px -14px rgba(41,38,31,.6)', opacity: status === 'loading' ? 0.85 : 1 }}>
              {buttonLabel}
            </button>
          </form>
          <div aria-live="polite" style={{ minHeight: 22, marginTop: 14 }}>
            {status === 'error' && <span style={{ fontSize: 14, color: '#4E6B57' }}>{error}</span>}
            {status === 'success' && <span style={{ fontSize: 14, color: '#3E5447' }}>Thanks, check your inbox for a confirmation from info@byldspace.com.</span>}
          </div>
        </div>
      </div>
    </section>
  )
}
