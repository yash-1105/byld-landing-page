# Handoff: BYLD Space — Premium Landing Page

## Overview
A single-page marketing/landing site for **BYLD Space**, a workspace product for modern
architecture and interior firms. The page is a "pre-launch / Coming Soon" experience whose
goal is for visitors to **explore for 2–3 minutes** — every section is interactive and the
product itself is demonstrated through live, operable mini-UIs (not screenshots).

Aesthetic: editorial, architectural, warm-minimal. Light theme only. Warm whites, sand/stone
neutrals, warm-charcoal ink, one restrained clay accent. Large serif headlines, clean
grotesque body, monospaced "spec-sheet" labels.

## About the Design Files
The files in `reference/` are a **design reference built in HTML/CSS/JS** — a working prototype
that shows the intended look, motion, and behavior. They are **not production code to copy
verbatim.** Your task is to **recreate this design in the target codebase's environment**
(React/Next, Vue, Astro, SwiftUI, etc.) using its established component patterns, styling
approach, and libraries. If no codebase exists yet, choose the most appropriate modern stack
(e.g. **React + Vite + Tailwind/CSS Modules + Framer Motion**) and build it there.

> The prototype is authored as a "Design Component" (`.dc.html`) and needs `reference/support.js`
> + a static server to run. You don't need to preserve that runtime — read the markup/logic as a
> spec. Opening `reference/BYLD Space.dc.html` via a local static server (e.g. `npx serve`) will
> render it for visual reference.

## Fidelity
**High-fidelity (hifi).** Final colors, typography, spacing, motion, and interactions are all
specified below and present in the reference file. Recreate the UI pixel-faithfully, then wire
the interactions. The only placeholders are **photographic areas** (renders, material photos,
project thumbnails), which are intentionally rendered as tonal gradient blocks — swap in real
imagery when available.

---

## Design Tokens

### Color
| Token | Hex | Use |
|---|---|---|
| paper | `#F6F4EF` | page background (warm white) |
| sand | `#F1ECE2` | alternating section panels, inner tiles |
| sand-fill | `#F4EFE6` / `#F7F3EB` | nested fills, list rows |
| surface | `#FCFAF6` | cards, app-frame surfaces |
| ink | `#29261F` | primary text, dark buttons, dark panel |
| ink-hover | `#3A362E` | button hover |
| body | `#5C564B` | body copy |
| stone | `#8B8275` | secondary text |
| stone-light | `#A79E90` | tertiary / mono labels |
| accent (clay) | `#B17A57` | accent dots, active links, slash echo (tweakable) |
| accent options | `#7E866A`, `#9A8C7A`, `#29261F` | alt accents |
| success/sage | `#7E866A`; chip `#EBF0E2` / text `#5E6A4D` | approved, available |
| pending | chip `#F3EAD9` / text `#A77B3F` | pending/quoted |
| reject | `#A4593F`; chip `#F3E2DD` | changes requested |
| neutral chip | `#E7E9EC` / text `#5A6470` | delivered |
| hairline | `#EDE7DB` (cards), `#E8E2D6` (section dividers), `#E0D7C7`, `#EAE3D5` | borders |
| dashed | `#D8CDBA` | dashed borders, ecosystem idle lines |

Gradient placeholders for imagery use warm pairs, e.g. `linear-gradient(135deg,#D9C6A6,#C0A06E)`
(oak/clay), `#E7E0D2→#D3C9B6` (travertine), `#9CA382→#76805F` (sage), `#C9BFAE→#A89C86` (stone).

### Typography
- **Display** — `Newsreader` (serif), weight **300**, emphasis words in **italic 400**.
  letter-spacing `-0.02em` to `-0.025em`, line-height `1.0–1.08`.
  - Hero H1: `clamp(42px, 6.4vw, 86px)`
  - Section H2: `clamp(32px, 4.4vw, 56–58px)`
  - Final-CTA H2: `clamp(40px, 6vw, 80px)`
  - Panel H3: `30px`; Modal H3: `clamp(28px, 3.6vw, 42px)`
  - Big numerics (budget, stats): Newsreader 300, 26–38px
- **Body / UI** — `Hanken Grotesk`, weights 300–700.
  - Body paragraphs: `clamp(17px, 1.5vw, 19px)`, line-height `1.6–1.65`, color `body`
  - UI text: 12–15px; buttons 14–15.5px weight 500
- **Mono labels** — `JetBrains Mono`, 9–11px, `text-transform:uppercase`,
  letter-spacing `.1em–.24em`, color stone/stone-light. Used for **section numbers
  (01–08)**, eyebrows, status, captions, the address bar.
- Google Fonts import: `Newsreader` (ital,opsz,wght 200..500), `Hanken Grotesk` (300..700),
  `JetBrains Mono` (400,500).

### Spacing / Layout
- Content max-width **1240px**, horizontal padding **40px**.
- Section vertical padding `clamp(80px, 10vw, 140px)` (problem section a touch larger).
- Layouts are fluid: `flex-wrap` + `clamp()` + `grid auto-fit minmax(...)` — **no media
  queries**; columns stack naturally on narrow screens (desktop-first).

### Radius
Cards 18–22px · inner tiles 9–16px · app frame 22px · final-CTA panel 32px · pills/buttons
`999px` · avatars 50% or 8–12px squares.

### Shadow (soft only — never heavy)
- Resting card: `0 2px 4px rgba(41,38,31,.03), 0 30px 60px -28px rgba(41,38,31,.22)`
- Hover lift: `0 36px 70px -34px rgba(41,38,31,.30)`
- Button: `0 14px 30px -14px rgba(41,38,31,.5)`

### Texture
Optional full-page **grain** overlay: inline SVG `feTurbulence` fractal noise,
`mix-blend-mode:multiply`, `opacity:.5`, `pointer-events:none`, fixed, z-index above content.

---

## Global Interactions (apply across the page)
- **Magnetic buttons** — on `pointermove` translate the button toward the cursor by
  `offsetFromCenter * strength` (strength ≈ 0.35–0.45); reset to 0 on `pointerleave`. Applied to
  all primary CTAs. (Framer Motion: spring on x/y.)
- **3D tilt cards** — on `pointermove` apply `perspective(1000px) rotateX(-py*max)
  rotateY(px*max) translateY(-5px)` where px/py are cursor position within the card normalized to
  −0.5..0.5; max ≈ 4.5–7°. Reset on leave.
- **Pointer parallax (hero)** — children translate by `pointerDelta * depth`; depths range
  roughly −30..+34 px so layers move at different rates. A soft radial "light sheen" follows the
  pointer at higher amplitude.
- **Scroll reveal** — elements start `opacity:0; translateY(28px)` and transition to
  `opacity:1; none` over `.95s cubic-bezier(.2,.65,.3,1)` when they enter the viewport
  (IntersectionObserver, threshold ~0.08). **Important:** include a fallback that force-reveals
  everything after ~1.5s and honor `prefers-reduced-motion` (reveal immediately, skip transforms)
  so content is never stuck hidden.
- **Ambient float** — hero cards loop a gentle ±9–23px vertical `translateY` (CSS keyframes,
  6.5–9s, staggered).
- **Hover micro-interactions** — cards lift + deepen shadow; images scale to ~1.05 inside an
  `overflow:hidden` frame; links shift from `body` → `ink`; transitions 0.25–0.45s
  `cubic-bezier(.2,.7,.3,1)`.
- **Reduced motion** — disable tilt/magnetic/parallax and reveal transforms.

---

## Screens / Sections (top → bottom)

### Nav (sticky)
- Sticky top, `backdrop-filter: blur(14px)`, `background: rgba(246,244,239,.72)`, bottom hairline.
- **Left:** BYLD/SPACE logo (height 24px). **Right:** single dark pill button **"Join Early
  Access"** (magnetic, ink bg, paper text, radius 999, soft shadow). *Nothing else in the header.*

### 1 — Hero (full-width, two columns, `overflow:hidden`)
- **Left:** mono eyebrow `BYLD Space` + a "Coming Soon" pill (hairline border, pulsing clay dot).
  H1 (serif 300): "The workspace built for *modern architecture* and interior firms." ("modern
  architecture" italic). Body paragraph + a smaller stone line "Built for architects, interior
  designers, and design-build teams." Primary magnetic CTA "Join Early Access →" + caption "Be
  first when we launch."
- **Right:** a floating, parallaxing **product cluster** of 6 cards: project board (kanban
  Concept/Design/Review), material selections (2×2 swatches), ground-floor plan (CSS line plan),
  approval chip ("Facade Design — Approved by client"), a dark procurement chip ("Italian Marble
  — ORDERED"), and a budget widget ("₹ 24.1L", 68% bar). Each floats + parallaxes at its own depth.
- Background: warm radial glow (parallax depth −30) + pointer-following light sheen.

### 2 — Problem (sand panel)
- Eyebrow `02 — The Problem`. H2: "Stop managing projects across *five different tools.*" Two body
  paragraphs (exact copy below).
- **Visual:** four dashed "scattered tool" tiles (WhatsApp, Excel, Drive, Email) — each slightly
  rotated, straightening + scaling on hover — an arrow `→`, then one dark **BYLD Space** card
  (3D-tilt) representing the unified workspace.

### 3 — Features (paper)
- Eyebrow `03 — Features`. H2: "Everything your team needs to *stay on track*."
- **6 cards** in `grid auto-fit minmax(320px,1fr)`. Each card: a mini-UI visual on top, title,
  body. On **hover**: card lifts/tilts, mini-UI image scales, and a hidden `OPEN DEMO →` row
  expands (max-height + opacity). On **click**: opens a **feature modal** (see Interactions).
- Cards (title — visual): Project Management (timeline bars) · Client Collaboration (chat bubbles)
  · Centralized Documents (file rows) · Approvals & Reviews (approval rows w/ chips) · Site
  Coordination (striped site map w/ status pills) · Team Collaboration (member roster).

### 4 — Product Showcase (sand panel) — **centerpiece**
- Eyebrow `04 — The Product`. H2: "One workspace, *every angle* of the project." Sub: "Switch
  modules in the sidebar — every workflow is live and interactive."
- A browser/app **frame** (traffic-light dots, center address bar showing
  `byld.space / riverside-residence / <module>`, avatar stack). **Left sidebar** = the module
  switcher (BYLD logo, WORKSPACE label, 5 nav items w/ glyph chips, active item filled; bottom
  "Studio Atelier · 8 projects"). **Right content** swaps with a `translateY(16px)→0` panel-in
  transition. 5 modules:
  1. **Project Management** — "Studio overview": 3 stat cards (Active 8, Pending Approvals 3, On
     Site Today 2; hover-lift), active-projects list with progress bars + hover-highlight rows,
     activity feed.
  2. **Procurement** *(interactive sim)* — header shows **Estimated budget** (big serif number).
     4 item cards (Marble, Brass Hardware, Oak Flooring, Linen), each with **3 selectable vendor
     rows** (radio dot, name, ★rating · lead time, price). Selecting a vendor re-computes the
     budget and **animates the number** (ease-out count-up ~550ms). Selected row gets ink border.
  3. **Documents** *(chaos→structure)* — left: dashed "SCATTERED" box with rotated, jumbled file
     chips; arrow; right: organized list whose 4 file rows **fly in from scattered positions** and
     settle into place (staggered). Re-plays when re-entering the tab.
  4. **Approvals** *(stateful)* — list of 4 approval cards (thumb, title, meta, status chip). Each
     pending card has **Request changes** / **Approve** buttons that update its status + chip
     (approved=sage, rejected=clay). A **VIEW HISTORY** toggle expands a per-item revision list.
  5. **Site Coordination** — striped site map with hover-scaling status pills (Foundation poured,
     Steelwork in progress, 3 issues resolved) + an issue-tracker list with status dots
     (OPEN/REVIEW/CLOSED), rows highlight on hover.

### 5 — BYLD Flex (paper, two columns)
- Eyebrow `05 — BYLD Flex`. H2: "Flexible talent, *when you need it*." Two body paragraphs + mono
  hint "HOVER A CARD TO PREVIEW".
- **Right:** grid of **5 talent cards** (Architect, Interior Designer, Draftsman, BIM Specialist,
  Project Manager). Each shows avatar + role + availability dot; on **hover** a detail panel
  expands revealing skills text + 3 portfolio-preview thumbnails. Plus a dashed "+40 specialists" card.

### 6 — Target Audience (sand panel)
- Eyebrow `06 — Who it's for`. H2: "Built for *growing firms*." + body paragraph.
- 5 cards (`grid auto-fit minmax(210px,1fr)`): Architecture Studios, Interior Design Firms,
  Design-Build Companies, Residential Contractors, Growing Teams. Each = tonal image block (number
  badge) + label; hover = tilt + image zoom + shadow.

### 7 — Ecosystem (paper, centered)
- Eyebrow `07 — The Ecosystem`. H2: "Everything connected, *end to end*."
- **Radial diagram:** center circular hub (BYLD logo + two slowly-rotating ring strokes). **7
  nodes** positioned on a circle — Projects, Documents, Approvals, Procurement, Talent, Site
  Updates, Clients. SVG **dashed connector lines** from hub to each node animate a flowing dash
  (`stroke-dashoffset`). **Hovering a node** highlights it (fills ink, scales up) + its connected
  lines/nodes (accent color, faster flow) and dims the rest; a caption below updates to
  "<Node> connects across BYLD Space."

### 8 — Final CTA (paper)
- Large rounded **warm-gradient panel** (`linear-gradient(165deg,#EBE3D4,#E0D5C0)`, radius 32) with
  a soft top glow + a slow diagonal **sheen sweep** animation. Coming Soon pill, H2: "Less chaos.
  *More building.*", two body paragraphs, and an email capture (rounded input with focus ring +
  magnetic **Join Early Access** button).

### Footer (sand panel)
- Logo + one-line description + 3 round social placeholders (in / ig / x, hover lift). Bottom row:
  `© 2026 BYLD Space. All rights reserved.` and "Coming Soon · Built for architects & designers".
  *(Link columns intentionally removed.)*

---

## Exact Copy (do not change)
Use verbatim. Section numbers/labels (01–08), UI mock data (vendor names, prices, file names,
talent roles, statuses) are illustrative dummy data — keep or adapt as realistic placeholders.

- **Hero H1:** "The workspace built for modern architecture and interior firms."
- **Hero body:** "Manage projects, collaborate with clients, organize documents, and keep teams aligned — all from one place."
- **Hero sub:** "Built for architects, interior designers, and design-build teams." · Pill: "Coming Soon" · CTA: "Join Early Access"
- **Problem H2:** "Stop managing projects across five different tools."
- **Problem body:** "Projects shouldn't live across WhatsApp, Excel, Google Drive, emails, and endless follow-ups." / "BYLD Space brings your projects, files, communication, and approvals together in one organized workspace."
- **Features H2:** "Everything your team needs to stay on track"
  - Project Management — "Keep tasks, milestones, timelines, and responsibilities organized from concept to completion."
  - Client Collaboration — "Provide clients with clear updates, shared files, and a more transparent experience throughout the project."
  - Centralized Documents — "Store drawings, quotations, contracts, and project files in one place so your team always works from the latest information."
  - Approvals & Reviews — "Track decisions, approvals, and revisions without losing context or relying on scattered conversations."
  - Site Coordination — "Connect office teams and site teams with progress updates, issue tracking, and better visibility."
  - Team Collaboration — "Architects, interior designers, consultants, contractors, and clients can stay aligned in a single workspace."
- **BYLD Flex H2:** "Flexible talent, when you need it"
  - "Scale your team without the overhead of permanent hiring." / "Through BYLD Flex, firms can access trusted architecture and design talent for short-term support, specialized tasks, and project-based requirements."
- **Audience H2:** "Built for growing firms" — "Whether you're managing residential projects or coordinating multiple teams, BYLD Space helps simplify the way projects are delivered." — Architecture Studios · Interior Design Firms · Design-Build Companies · Residential Contractors · Growing Teams
- **Final CTA H2:** "Less chaos. More building." — "Projects, collaboration, and flexible talent — all in one ecosystem." / "BYLD Space is reimagining how design and construction teams work together." — "Coming Soon" — CTA "Join Early Access"

---

## State Management
- `tab` (0–4) — active showcase module.
- `openFeature` (0–5 | null) — which feature modal is open.
- `vendors` `{ marble, brass, oak, linen }` — selected vendor index per procurement item.
- `displayBudget` (number) — animated budget value; tween toward `sum(selected vendor prices)`
  with an ease-out over ~550ms.
- `approvals[]` — each `{ id, title, meta, status: pending|approved|rejected, history[] }`.
- `historyOpen` (id | null) — which approval's history is expanded.
- `activeNode` (0–6 | null) — hovered ecosystem node.
- loader: `fade` / `booted` — intro loader fades at ~850ms, unmounts at ~1300ms.

## Animations Reference
- reveal: `opacity/transform .95s cubic-bezier(.2,.65,.3,1)`
- panel transition: `translateY(16px)→0` ~.45s
- budget count-up: ease-out cubic, ~550ms
- document settle: from a per-chip scattered `transform` (`--from`) → none, ~.8s staggered
- dashed line flow: `stroke-dashoffset` loop (idle ~5s, active ~2.2s)
- float: ±9–23px translateY, 6.5–9s loops
- sheen sweep (final CTA): diagonal highlight, ~7s loop
- All easing standard: `cubic-bezier(.2,.7,.3,1)` for UI, `(.2,.65,.3,1)` for reveals.

## Assets
- **Logo:** `reference/assets/byld-logo.png` — "BYLD / SPACE" wordmark, transparent background
  (works on any light surface). Height 17–30px depending on context.
- **Fonts:** Google Fonts (Newsreader, Hanken Grotesk, JetBrains Mono).
- **Imagery:** none real — all photo areas are tonal gradient placeholders. Replace with real
  architectural renders / material textures / project photos when available.

## Files
- `reference/BYLD Space.dc.html` — the full design (markup + interaction logic). Read both the
  template and the `class Component` logic block for exact values and interaction code.
- `reference/support.js` — runtime needed only to *run* the prototype (not for your build).
- `reference/assets/byld-logo.png` — logo asset to reuse.
- `PROMPT.md` — a ready-to-paste prompt for Claude Code.
