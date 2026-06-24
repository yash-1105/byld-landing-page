import { useEffect, useState } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Problem from './components/Problem'
import Features from './components/Features'
import FeatureModal from './components/FeatureModal'
import ProductShowcase from './components/ProductShowcase'
import BYLDFlex from './components/BYLDFlex'
import TargetAudience from './components/TargetAudience'
import Ecosystem from './components/Ecosystem'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'
import { useGlobalInteractions, useScrollReveal, prefersReducedMotion } from './hooks/useInteractions'

const GRAIN_SVG =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='120' height='120' filter='url(%23n)' opacity='0.4'/></svg>"

export default function App() {
  const [openFeature, setOpenFeature] = useState<number | null>(null)
  const [fade, setFade] = useState(false)
  const [booted, setBooted] = useState(false)

  // intro loader: fade at ~850ms, unmount at ~1300ms (instant under reduced motion)
  useEffect(() => {
    const reduce = prefersReducedMotion()
    const t1 = setTimeout(() => setFade(true), reduce ? 0 : 850)
    const t2 = setTimeout(() => setBooted(true), reduce ? 50 : 1300)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  // lock scroll while a feature modal is open
  useEffect(() => {
    document.body.style.overflow = openFeature != null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [openFeature])

  useScrollReveal()
  useGlobalInteractions()

  return (
    <div id="byld-root" style={{ position: 'relative' }}>
      {!booted && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200, background: '#F1F4F1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: fade ? 0 : 1, transition: 'opacity .45s ease', pointerEvents: 'none' }}>
          <img src="/assets/byld-lockup.png" alt="BYLD Space" style={{ height: 64, display: 'block', marginBottom: 30 }} />
          <div style={{ width: 30, height: 30, borderRadius: '50%', border: '2px solid #D0DFD3', borderTopColor: '#29261F', animation: 'spinSlow .8s linear infinite' }} />
        </div>
      )}

      <div style={{ position: 'fixed', inset: 0, zIndex: 150, pointerEvents: 'none', mixBlendMode: 'multiply', opacity: 0.5, backgroundImage: `url("${GRAIN_SVG}")` }} />

      <Nav />
      <main>
        <Hero />
        <Problem />
        <Features onOpen={setOpenFeature} />
        <ProductShowcase />
        <BYLDFlex />
        <TargetAudience />
        <Ecosystem />
        <FinalCTA />
      </main>
      <Footer />

      <FeatureModal index={openFeature} onClose={() => setOpenFeature(null)} />
    </div>
  )
}
