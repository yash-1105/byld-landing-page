export const ACCENT = '#4E5E54'

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
  { role: 'Architect', skills: 'Concept · Permits · Detailing', avail: 'Available now', tone: '#4E5E54,#3B4A41', dot: '#4E5E54', works: ['#A8C3AA,#749E76', '#A7BBA9,#7E9780', '#6B986D,#496A4B'] },
  { role: 'Interior Designer', skills: 'FF&E · Styling · Sourcing', avail: 'Available now', tone: '#5E6E60,#46544A', dot: '#6E7C72', works: ['#B3C3B4,#7E9780', '#A8C3AA,#749E76', '#799287,#576A63'] },
  { role: 'Draftsman', skills: 'AutoCAD · Working drawings', avail: '2 wks', tone: '#2F352F,#22271F', dot: '#8A9384', works: ['#C9D9CA,#B0C5B2', '#A7BBA9,#7E9780', '#AAC1AC,#8FA491'] },
  { role: 'BIM Specialist', skills: 'Revit · Coordination · Clash', avail: 'Available now', tone: '#5A7560,#42594A', dot: '#4E5E54', works: ['#6B986D,#496A4B', '#7EA57F,#59805B', '#A8C3AA,#749E76'] },
  { role: 'Project Manager', skills: 'Schedules · Procurement · Site', avail: '1 wk', tone: '#6B786A,#535E52', dot: '#8A9384', works: ['#B3C3B4,#7E9780', '#799287,#576A63', '#A7BBA9,#7E9780'] },
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
  { id: 1, title: 'Facade Design, v3', meta: 'Shared with client · 2 revisions', status: 'approved', tone: '#A8C3AA,#759F78', history: ['v1 submitted to client', 'v2, window proportions revised', 'v3, approved by client'] },
  { id: 2, title: 'Lighting Plan, v2', meta: 'Awaiting client feedback', status: 'pending', tone: '#A7BBA9,#7E9780', history: ['v1 submitted', 'v2, added cove lighting'] },
  { id: 3, title: 'Material Schedule, v1', meta: 'Pending internal review', status: 'pending', tone: '#6B986D,#496A4B', history: ['v1 submitted for internal review'] },
  { id: 4, title: 'Kitchen Layout, v4', meta: '3 revisions logged', status: 'pending', tone: '#799287,#576A63', history: ['v1 concept', 'v2, island added', 'v3, plumbing moved', 'v4, final layout'] },
]

export const MODULE_LABELS = ['Project Management', 'Procurement', 'Documents', 'Approvals', 'Site Coordination']
export const MODULE_GLYPHS = ['▦', '▤', '◳', '◇', '◈']

export const fmtL = (v: number) => '₹ ' + (v / 100000).toFixed(1) + 'L'
export const fmtFull = (v: number) => '₹ ' + v.toLocaleString('en-IN')
