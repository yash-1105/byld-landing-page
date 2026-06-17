export const ACCENT = '#B17A57'

export type Vendor = { n: string; price: number; lead: string; rating: string }
export type ProcItem = { id: ProcId; name: string; sub: string; vendors: Vendor[] }
export type ProcId = 'marble' | 'brass' | 'oak' | 'linen'

export const PROC: ProcItem[] = [
  {
    id: 'marble', name: 'Italian Marble Slab', sub: 'Statuario · 20mm', vendors: [
      { n: 'Stonex Co.', price: 1240000, lead: '6 wks', rating: '4.8' },
      { n: 'Verona Imports', price: 1320000, lead: '5 wks', rating: '4.9' },
      { n: 'Marble Hub', price: 1180000, lead: '8 wks', rating: '4.5' },
    ],
  },
  {
    id: 'brass', name: 'Brass Hardware Set', sub: 'Brushed · 42 pcs', vendors: [
      { n: 'Fenwick', price: 320000, lead: '3 wks', rating: '4.7' },
      { n: 'Lumen Co.', price: 356000, lead: '2 wks', rating: '4.8' },
      { n: 'BrassWorks', price: 298000, lead: '4 wks', rating: '4.4' },
    ],
  },
  {
    id: 'oak', name: 'White Oak Flooring', sub: 'Engineered · 180m²', vendors: [
      { n: 'Timberline', price: 640000, lead: 'In stock', rating: '4.9' },
      { n: 'NordWood', price: 610000, lead: '3 wks', rating: '4.6' },
      { n: 'PlankHouse', price: 688000, lead: '2 wks', rating: '4.7' },
    ],
  },
  {
    id: 'linen', name: 'Belgian Linen', sub: 'Upholstery · 60m', vendors: [
      { n: 'Maison Textile', price: 210000, lead: '5 wks', rating: '4.6' },
      { n: 'Loomry', price: 234000, lead: '4 wks', rating: '4.8' },
      { n: 'Flax & Co.', price: 196000, lead: '6 wks', rating: '4.5' },
    ],
  },
]

export type FeatureKey = 'pm' | 'cc' | 'cd' | 'ar' | 'sc' | 'tc'
export type Feature = { key: FeatureKey; title: string; tag: string; body: string }

export const FEATURES: Feature[] = [
  { key: 'pm', title: 'Project Management', tag: 'TIMELINE', body: 'Keep tasks, milestones, timelines, and responsibilities organized from concept to completion.' },
  { key: 'cc', title: 'Client Collaboration', tag: 'SHARED', body: 'Provide clients with clear updates, shared files, and a more transparent experience throughout the project.' },
  { key: 'cd', title: 'Centralized Documents', tag: 'FILES', body: 'Store drawings, quotations, contracts, and project files in one place so your team always works from the latest information.' },
  { key: 'ar', title: 'Approvals & Reviews', tag: 'REVIEW', body: 'Track decisions, approvals, and revisions without losing context or relying on scattered conversations.' },
  { key: 'sc', title: 'Site Coordination', tag: 'SITE', body: 'Connect office teams and site teams with progress updates, issue tracking, and better visibility.' },
  { key: 'tc', title: 'Team Collaboration', tag: 'TEAM', body: 'Architects, interior designers, consultants, contractors, and clients can stay aligned in a single workspace.' },
]

export type Talent = { role: string; skills: string; avail: string; tone: string; dot: string; works: string[] }

export const TALENT: Talent[] = [
  { role: 'Architect', skills: 'Concept · Permits · Detailing', avail: 'Available now', tone: '#C7A574,#A8854E', dot: '#7E866A', works: ['#D9C6A6,#BF9F6C', '#C9BFAE,#A89C86', '#B79766,#8E7044'] },
  { role: 'Interior Designer', skills: 'FF&E · Styling · Sourcing', avail: 'Available now', tone: '#9CA382,#76805F', dot: '#7E866A', works: ['#CFC7BA,#A89C86', '#D9C6A6,#BF9F6C', '#9CA382,#76805F'] },
  { role: 'Draftsman', skills: 'AutoCAD · Working drawings', avail: '2 wks', tone: '#B0A18C,#928572', dot: '#B17A57', works: ['#E7E0D2,#D3C9B6', '#C9BFAE,#A89C86', '#CFC4B0,#B3A998'] },
  { role: 'BIM Specialist', skills: 'Revit · Coordination · Clash', avail: 'Available now', tone: '#BFA980,#9A7C4E', dot: '#7E866A', works: ['#B79766,#8E7044', '#C7A574,#A8854E', '#D9C6A6,#BF9F6C'] },
  { role: 'Project Manager', skills: 'Schedules · Procurement · Site', avail: '1 wk', tone: '#C9BFAE,#9C907B', dot: '#B17A57', works: ['#CFC7BA,#A89C86', '#9CA382,#76805F', '#C9BFAE,#A89C86'] },
]

export type EcoNode = { label: string; x: number; y: number; links: number[] }

export const ECO: EcoNode[] = [
  { label: 'Projects', x: 50, y: 9, links: [1, 2, 3] },
  { label: 'Documents', x: 81.3, y: 24.6, links: [0, 2] },
  { label: 'Approvals', x: 89.6, y: 59.5, links: [1, 3] },
  { label: 'Procurement', x: 67.4, y: 86, links: [2, 4] },
  { label: 'Talent', x: 32.6, y: 86, links: [3, 5] },
  { label: 'Site Updates', x: 10.4, y: 59.5, links: [4, 6] },
  { label: 'Clients', x: 18.7, y: 24.6, links: [5, 0] },
]

export type ApprovalStatus = 'pending' | 'approved' | 'rejected'
export type Approval = { id: number; title: string; meta: string; status: ApprovalStatus; tone: string; history: string[] }

export const INITIAL_APPROVALS: Approval[] = [
  { id: 1, title: 'Facade Design — v3', meta: 'Shared with client · 2 revisions', status: 'approved', tone: '#D9C6A6,#C0A06E', history: ['v1 submitted to client', 'v2 — window proportions revised', 'v3 — approved by client'] },
  { id: 2, title: 'Lighting Plan — v2', meta: 'Awaiting client feedback', status: 'pending', tone: '#C9BFAE,#A89C86', history: ['v1 submitted', 'v2 — added cove lighting'] },
  { id: 3, title: 'Material Schedule — v1', meta: 'Pending internal review', status: 'pending', tone: '#B79766,#8E7044', history: ['v1 submitted for internal review'] },
  { id: 4, title: 'Kitchen Layout — v4', meta: '3 revisions logged', status: 'pending', tone: '#9CA382,#76805F', history: ['v1 concept', 'v2 — island added', 'v3 — plumbing moved', 'v4 — final layout'] },
]

export const MODULE_LABELS = ['Project Management', 'Procurement', 'Documents', 'Approvals', 'Site Coordination']
export const MODULE_GLYPHS = ['▦', '▤', '◳', '◇', '◈']

export const fmtL = (v: number) => '₹ ' + (v / 100000).toFixed(1) + 'L'
export const fmtFull = (v: number) => '₹ ' + v.toLocaleString('en-IN')
