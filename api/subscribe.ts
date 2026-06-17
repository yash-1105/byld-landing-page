import type { VercelRequest, VercelResponse } from '@vercel/node'

// This function is a thin, secure server-side proxy. The browser POSTs here (same origin, no CORS),
// we validate, then forward to the Google Apps Script web app which does the real work:
// append the signup to the Google Sheet and send the branded thank-you email from info@byldspace.com.
// The shared secret never reaches the browser, so the Apps Script URL can't be abused by randoms.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const env = (k: string) => {
  const v = process.env[k]
  if (!v) throw new Error(`Missing env var ${k}`)
  return v
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  const body = typeof req.body === 'string' ? safeParse(req.body) : req.body || {}
  const email = String(body.email ?? '').trim().toLowerCase()
  const honeypot = String(body.website ?? '').trim()

  // bot trap: pretend success, do nothing
  if (honeypot) return res.status(200).json({ ok: true })

  if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
    return res.status(400).json({ ok: false, error: 'Please enter a valid email address.' })
  }

  const userAgent = String(req.headers['user-agent'] ?? '').slice(0, 300)

  try {
    const r = await fetch(env('APPS_SCRIPT_URL'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret: env('APPS_SCRIPT_SECRET'),
        email,
        source: 'landing-final-cta',
        userAgent,
      }),
    })
    const data = (await r.json().catch(() => ({}))) as { ok?: boolean; error?: string }
    if (!r.ok || !data.ok) {
      throw new Error(`Apps Script error (${r.status}): ${data.error ?? JSON.stringify(data).slice(0, 200)}`)
    }
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('[subscribe] error:', err)
    return res.status(500).json({ ok: false, error: 'Something went wrong. Please try again.' })
  }
}

function safeParse(s: string): Record<string, unknown> {
  try { return JSON.parse(s) } catch { return {} }
}
