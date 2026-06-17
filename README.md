# BYLD Space — Landing Page

Premium pre-launch landing page for **BYLD Space** (React + Vite + TypeScript). The "Join Early
Access" form captures signups to a **Google Sheet** and sends an automatic, branded thank-you email
from **info@byldspace.com**.

The work is done by a **Google Apps Script** that runs inside your Google account (so it needs no
service-account key and no Gmail app password — nothing for Workspace security policies to block).
A tiny Vercel function (`/api/subscribe`) forwards the form submission to it securely.

```
Form (src/components/FinalCTA.tsx)
  └─ POST /api/subscribe { email, website(honeypot) }     (same origin, no CORS)
       └─ api/subscribe.ts  (Vercel proxy: validates, adds shared secret)
            └─ Google Apps Script web app  (apps-script/Code.gs)
                 ├─ appends the signup to your Google Sheet
                 └─ sends the thank-you email as info@byldspace.com
```

## Local development

```bash
npm install
npm run dev          # UI only, on http://localhost:5180  (the /api function does NOT run here)
npm run build        # typecheck + production build to dist/
```

> Plain `npm run dev` serves the UI but not `/api/subscribe`, so a submit there shows "Try again".
> To test the full flow locally, use `vercel dev` (see the bottom of this file), or just test on the
> deployed Vercel URL.

---

## Setup (one-time)

### Part 1 — Create the Google Sheet
1. At **sheets.google.com** (as info@byldspace.com), create a blank sheet named **BYLD Early Access Signups**.
2. In row 1 add headers: `Timestamp | Email | Source | User Agent` (cells A1–D1).
3. Make sure the tab at the bottom is named exactly **`Sheet1`**.

### Part 2 — Add the Apps Script (does the saving + emailing)
Use the **standalone** route (more reliable; avoids a Drive "unable to open the file" error that can
happen via the Extensions menu, especially with multiple Google accounts signed in):
1. Open an **incognito/private window** and sign in **only** as info@byldspace.com.
2. Go to **script.google.com** → **New project**.
3. Delete the sample code, then paste the entire contents of **`apps-script/Code.gs`** from this repo.
4. In the `CONFIG` block at the top:
   - set **`SECRET`** to a long random string (keep a copy — same value goes into Vercel).
   - set **`SHEET_ID`** to your Sheet's ID (the long part of its URL between `/d/` and `/edit`).
   - (the email logo is embedded in the script, so nothing else to configure.)
5. Click **Deploy → New deployment** → the **gear** ⚙️ → choose **Web app**. Set:
   - **Execute as:** Me (info@byldspace.com)
   - **Who has access:** Anyone
6. Click **Deploy**, then **Authorize access** → pick info@byldspace.com → if warned,
   **Advanced → Go to (project) → Allow**. (Normal for your own script.)
7. Copy the **Web app URL** (ends with `/exec`). This is your **`APPS_SCRIPT_URL`**.
8. Sanity check: open that `/exec` URL in a browser — it should show
   `{"ok":true,"msg":"BYLD signup endpoint is live"}`.

That's it — no service account, no app password, no DNS changes for email.

> If **script.google.com itself** says Apps Script is turned off for your account, your Workspace admin
> has disabled it — tell me and we'll switch email+data to a transactional provider (e.g. Resend),
> which is independent of Google's restrictions.

### Part 3 — Environment variables (in Vercel)
Set these two (Project → Settings → Environment Variables). For local testing, copy `.env.example`
→ `.env.local` and fill the same two.

| Variable | Value |
|---|---|
| `APPS_SCRIPT_URL` | the Web app URL from Part 2 (ends with `/exec`) |
| `APPS_SCRIPT_SECRET` | the exact `SECRET` string you put in `Code.gs` |

---

## Deploy (Vercel)
1. Import the repo into Vercel (it auto-detects Vite; build `npm run build`, output `dist`).
2. Add the two environment variables above.
3. Deploy. Test on the `*.vercel.app` URL, then connect `byldspace.com` (Settings → Domains) and add
   the DNS records Vercel shows you.

## Test the whole flow
1. Open the live site, scroll to "Less chaos. More building.", enter a real email, click **Join Early Access**.
2. Button → **"You're on the list ✓"**.
3. A new row appears in your Google Sheet within seconds.
4. The thank-you email arrives from info@byldspace.com (check spam too, just in case).

If it says "Try again": most often the `APPS_SCRIPT_SECRET` in Vercel doesn't match the `SECRET` in
`Code.gs`, or the web app wasn't deployed with "Who has access: Anyone".

## Test the function locally (optional)
```bash
npx vercel link     # link to your Vercel project (one time)
npx vercel dev      # runs the site AND /api on a local port, using .env.local
```

## Notes
- The thank-you email (subject, HTML, text) lives in `apps-script/Code.gs`. The logo is **embedded
  inline** (base64, sent as a CID attachment), so it always renders without depending on a hosted URL.
- A hidden honeypot field + a shared secret block basic bots/abuse.
- Signups are written to the Sheet *before* the email is sent, so a mail hiccup never loses a lead.
- To change the Apps Script later, edit the code then **Deploy → Manage deployments → Edit → New
  version**, so the live URL serves your update.
