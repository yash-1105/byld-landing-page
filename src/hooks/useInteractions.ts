import { useEffect } from 'react'

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

type El = HTMLElement & {
  __mag?: boolean
  __tilt?: boolean
  __px?: boolean
  __rv?: boolean
}

/**
 * Global pointer interactions, bound by data-attribute like the reference prototype.
 * Re-runs after every render (guards prevent double-binding) so newly-mounted
 * nodes (e.g. the feature modal) get wired up too.
 */
export function useGlobalInteractions() {
  useEffect(() => {
    const reduce = prefersReducedMotion()
    const root = document.getElementById('byld-root')
    if (!root) return

    // magnetic buttons
    root.querySelectorAll<El>('[data-mag]').forEach((el) => {
      if (el.__mag) return
      el.__mag = true
      if (reduce) return
      const s = parseFloat(el.getAttribute('data-mag') || '') || 0.35
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect()
        el.style.transform =
          'translate(' + (e.clientX - (r.left + r.width / 2)) * s + 'px,' +
          (e.clientY - (r.top + r.height / 2)) * s + 'px)'
      })
      el.addEventListener('pointerleave', () => { el.style.transform = '' })
    })

    // 3D tilt cards
    root.querySelectorAll<El>('[data-tilt]').forEach((el) => {
      if (el.__tilt) return
      el.__tilt = true
      if (reduce) return
      const max = parseFloat(el.getAttribute('data-tilt') || '') || 6
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect()
        const px = (e.clientX - r.left) / r.width - 0.5
        const py = (e.clientY - r.top) / r.height - 0.5
        el.style.transform =
          'perspective(1000px) rotateX(' + -py * max + 'deg) rotateY(' + px * max + 'deg) translateY(-5px)'
      })
      el.addEventListener('pointerleave', () => { el.style.transform = '' })
    })

    // hero pointer parallax + light sheen
    const hero = root.querySelector<El>('[data-parallax]')
    if (hero && !hero.__px && !reduce) {
      hero.__px = true
      hero.addEventListener('pointermove', (e) => {
        const r = hero.getBoundingClientRect()
        const dx = (e.clientX - (r.left + r.width / 2)) / r.width
        const dy = (e.clientY - (r.top + r.height / 2)) / r.height
        hero.querySelectorAll<HTMLElement>('[data-depth]').forEach((el) => {
          const d = parseFloat(el.getAttribute('data-depth') || '') || 10
          el.style.transform = 'translate(' + dx * d + 'px,' + dy * d + 'px)'
        })
        const sheen = hero.querySelector<HTMLElement>('[data-sheen]')
        if (sheen) sheen.style.transform = 'translate(' + dx * 60 + 'px,' + dy * 60 + 'px)'
      })
      hero.addEventListener('pointerleave', () => {
        hero.querySelectorAll<HTMLElement>('[data-depth]').forEach((el) => { el.style.transform = '' })
        const sheen = hero.querySelector<HTMLElement>('[data-sheen]')
        if (sheen) sheen.style.transform = ''
      })
    }
  })
}

/**
 * Scroll reveal. Elements with [data-reveal] start hidden + translated and reveal
 * on entering the viewport. Robust: force-reveals everything after 1.5s and honors
 * reduced motion so content is never stuck hidden.
 */
// module-scoped so the observer survives StrictMode's dev mount/unmount/remount
// cycle, otherwise below-the-fold sections can be stranded hidden.
let sharedIO: IntersectionObserver | undefined

export function useScrollReveal() {
  useEffect(() => {
    const reduce = prefersReducedMotion()
    const reveal = (el: HTMLElement) => { el.style.opacity = '1'; el.style.transform = 'none' }
    const hardReveal = (el: HTMLElement) => { el.style.transition = 'none'; el.style.opacity = '1'; el.style.transform = 'none' }

    if ('IntersectionObserver' in window && !sharedIO && !reduce) {
      sharedIO = new IntersectionObserver((ents) => {
        ents.forEach((e) => {
          if (e.isIntersecting) { reveal(e.target as HTMLElement); sharedIO!.unobserve(e.target) }
        })
      }, { threshold: 0.08, rootMargin: '0px 0px -6% 0px' })
    }

    const setup = () => {
      const root = document.getElementById('byld-root') || document
      const nodes = Array.from(root.querySelectorAll<El>('[data-reveal]')).filter((n) => !n.__rv)
      nodes.forEach((n) => { n.__rv = true })

      if (reduce) { nodes.forEach(reveal); return }

      const vh = window.innerHeight || 800
      nodes.forEach((el) => {
        const d = el.getAttribute('data-reveal-delay') || '0'
        el.style.opacity = '0'
        el.style.transform = 'translateY(28px)'
        el.style.transition =
          'opacity .95s cubic-bezier(.2,.65,.3,1) ' + d + 's, transform .95s cubic-bezier(.2,.65,.3,1) ' + d + 's'
        const top = el.getBoundingClientRect().top
        if (top < vh * 0.9) setTimeout(() => reveal(el), 80)
        else if (sharedIO) sharedIO.observe(el)
        else setTimeout(() => reveal(el), 80)
      })
    }

    setup()
    // second pass after layout settles catches anything mounted just after first paint
    const raf = requestAnimationFrame(setup)
    // force-visible fallback: nothing is ever left hidden, even if the observer is lost
    const fb = setTimeout(() => {
      document.querySelectorAll<HTMLElement>('[data-reveal]').forEach(hardReveal)
    }, 1500)

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(fb)
    }
  }, [])
}
