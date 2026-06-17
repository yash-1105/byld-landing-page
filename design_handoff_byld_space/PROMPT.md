# Claude Code Prompt — BYLD Space landing page

Paste the following into Claude Code (with this folder available in the project). Adjust the
"Target stack" line to match your repo.

---

You are implementing a premium marketing landing page for **BYLD Space** (a workspace product
for architecture & interior firms). A complete design spec is in `design_handoff_byld_space/README.md`
and a working HTML reference is in `design_handoff_byld_space/reference/BYLD Space.dc.html`.

**Read `README.md` fully first, then read the reference HTML** (both its markup and the
`class Component` logic block) to extract exact colors, type, spacing, copy, and interaction code.

**Target stack:** <e.g. React + Vite + TypeScript + Tailwind CSS + Framer Motion>. Use this
repo's existing components, tokens, and conventions where they exist; only add what's missing.
The HTML reference is a **design reference, not code to copy** — rebuild it idiomatically in this
stack. Open the reference via a static server (`npx serve design_handoff_byld_space/reference`)
to see it live.

### Requirements
1. **Pixel-faithful, hifi.** Match the documented colors, typography (Newsreader / Hanken Grotesk
   / JetBrains Mono), spacing, radii, and the soft-shadow style exactly. Light theme only — warm
   whites, sand/stone neutrals, warm-charcoal ink, one clay accent (`#B17A57`).
2. **Use the exact copy** from the spec verbatim — do not rewrite marketing text.
3. **Build all 8 sections + sticky nav + footer:** Hero, Problem, Features, Product Showcase,
   BYLD Flex, Target Audience, Ecosystem, Final CTA. Nav = logo + single "Join Early Access" pill
   only. Footer = logo + description + socials + copyright only.
4. **Recreate every interaction** (see spec): magnetic buttons, 3D pointer-tilt cards, hero
   pointer-parallax + light sheen, ambient float, scroll-reveal (with a force-visible fallback and
   `prefers-reduced-motion` support), feature hover-expand + **click-to-open demo modal**, the
   5-tab animated **Product Showcase**, the **Procurement vendor-compare with animated budget**,
   the **Documents chaos→structure** animation, the **Approvals approve/reject/history** stateful
   list, **BYLD Flex** hover-reveal talent cards, and the **Ecosystem** radial diagram with
   animated dashed lines + hover-to-highlight flows.
5. **Responsive & accessible.** Desktop-first; stack gracefully on mobile (prefer fluid
   `clamp()`/grid over breakpoints, or this repo's responsive system). Keyboard-focusable
   interactive elements, semantic landmarks, alt text, visible focus states, reduced-motion.
6. **Componentize** sensibly (Nav, Hero, FeatureCard, FeatureModal, ProductShowcase + per-module
   panels, TalentCard, EcosystemDiagram, FinalCTA, Footer). Keep state local (showcase tab,
   open feature, selected vendors + animated budget, approvals status, hovered node).
7. Reuse `reference/assets/byld-logo.png`. All photographic areas are tonal gradient
   placeholders — keep them as placeholders unless real assets are provided.

Build it, run the dev server, and verify each section visually and each interaction works.
