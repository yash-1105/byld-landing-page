/**
 * BYLD Space — signup endpoint (Google Apps Script)
 *
 * This runs INSIDE your Google account, so it can write to the Sheet and send email
 * from info@byldspace.com without a service-account key or an app password.
 *
 * HOW TO INSTALL — STANDALONE route (recommended; avoids the "Extensions → Apps Script" error):
 *  1. In an incognito window signed in ONLY as info@byldspace.com, go to script.google.com → New project.
 *  2. Delete any sample code, paste THIS whole file.
 *  3. In CONFIG below: set SECRET to a long random string, and set SHEET_ID to your Google Sheet's ID
 *     (the long part of the sheet URL between /d/ and /edit).
 *  4. Deploy → New deployment → gear icon → "Web app":
 *        Execute as: Me (info@byldspace.com)
 *        Who has access: Anyone
 *     Authorize when prompted (Advanced → Go to project → Allow). Copy the Web app URL (ends with /exec).
 *  5. In Vercel, set env vars:  APPS_SCRIPT_URL = that URL,  APPS_SCRIPT_SECRET = the same SECRET.
 *
 * (Bound route alternative: open the Sheet → Extensions → Apps Script, paste this, and leave SHEET_ID ''.)
 */

const CONFIG = {
  // Must EXACTLY match APPS_SCRIPT_SECRET in Vercel. Make it long & random, e.g. a password manager string.
  SECRET: 'CHANGE-ME-to-a-long-random-string',

  // RECOMMENDED: paste your Google Sheet ID here (the long part of the sheet URL between /d/ and /edit).
  // This lets the script run as a STANDALONE project (created at script.google.com) and avoids the
  // "Extensions → Apps Script" route. Leave '' only if the script is bound inside the sheet.
  SHEET_ID: '',

  // The tab in the spreadsheet that stores signups.
  SHEET_NAME: 'Sheet1',

  SUBJECT: "You're on the list — BYLD Space",
};

/** Browser/proxy POSTs land here. */
function doPost(e) {
  try {
    const body = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    if (body.secret !== CONFIG.SECRET) return json({ ok: false, error: 'unauthorized' });

    const email = String(body.email || '').trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ ok: false, error: 'invalid email' });

    appendRow(email, body.source || 'landing', body.userAgent || '');
    try {
      sendThankYou(email);
    } catch (mailErr) {
      // Signup is already saved; report success but note the email failed (visible in execution logs).
      console.error('email failed: ' + mailErr);
      return json({ ok: true, emailed: false });
    }
    return json({ ok: true, emailed: true });
  } catch (err) {
    console.error(err);
    return json({ ok: false, error: String(err) });
  }
}

/** Visiting the URL in a browser shows a tiny health check. */
function doGet() {
  return json({ ok: true, msg: 'BYLD signup endpoint is live' });
}

function appendRow(email, source, userAgent) {
  const ss = CONFIG.SHEET_ID
    ? SpreadsheetApp.openById(CONFIG.SHEET_ID)   // standalone script
    : SpreadsheetApp.getActiveSpreadsheet();     // bound script (Extensions → Apps Script)
  const sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
  if (!sheet) throw new Error('Sheet tab "' + CONFIG.SHEET_NAME + '" not found');
  sheet.appendRow([new Date(), email, source, userAgent]);
}

function sendThankYou(to) {
  // Embed the logo INLINE so it always shows — no dependency on a hosted URL / live domain.
  const logo = Utilities.newBlob(Utilities.base64Decode(LOGO_B64), 'image/png', 'byld-logo.png');
  GmailApp.sendEmail(to, CONFIG.SUBJECT, emailText(), {
    name: 'BYLD Space',
    htmlBody: emailHtml(),
    inlineImages: { byldlogo: logo },
  });
}

function emailText() {
  return [
    'Thank you for signing up.',
    '',
    "You're on the early-access list. We'll email you the moment BYLD Space opens — " +
      'the workspace built for modern architecture and interior firms.',
    '',
    'Less chaos. More building.',
    '',
    '— The BYLD Space team',
  ].join('\n');
}

function emailHtml() {
  return [
    '<!doctype html><html><body style="margin:0;background:#EFEDE7;padding:0;">',
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#EFEDE7;padding:40px 16px;">',
    '<tr><td align="center">',
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#F7F6F3;border:1px solid #E6E0D4;border-radius:20px;">',
    '<tr><td style="padding:40px 40px 36px;">',
    '<img src="cid:byldlogo" alt="BYLD Space" width="170" style="display:block;height:auto;margin:0 auto 28px;" />',
    '<div style="font:400 11px \'Helvetica Neue\',Arial,sans-serif;letter-spacing:0.18em;text-transform:uppercase;color:#B17A57;text-align:center;margin-bottom:18px;">Early Access · Coming Soon</div>',
    '<h1 style="margin:0 0 18px;font:400 30px/1.15 Georgia,serif;letter-spacing:-0.01em;color:#29261F;text-align:center;">Thank you for signing up.</h1>',
    '<p style="margin:0 0 16px;font:400 16px/1.6 \'Helvetica Neue\',Arial,sans-serif;color:#5C564B;text-align:center;">',
    "You're on the early-access list. We'll email you the moment <strong style=\"color:#29261F;font-weight:600;\">BYLD Space</strong> opens — the workspace built for modern architecture and interior firms.",
    '</p>',
    '<p style="margin:0 0 28px;font:400 16px/1.6 \'Helvetica Neue\',Arial,sans-serif;color:#5C564B;text-align:center;">Less chaos. More building.</p>',
    '<div style="text-align:center;margin-bottom:8px;"><span style="display:inline-block;height:1px;width:48px;background:#E0D7C7;"></span></div>',
    '<p style="margin:18px 0 0;font:500 14px \'Helvetica Neue\',Arial,sans-serif;color:#29261F;text-align:center;">— The BYLD Space team</p>',
    '</td></tr></table>',
    '<p style="max-width:520px;margin:20px auto 0;font:400 12px \'Helvetica Neue\',Arial,sans-serif;color:#A79E90;text-align:center;">You received this because you signed up at byldspace.com. © 2026 BYLD Space.</p>',
    '</td></tr></table></body></html>',
  ].join('');
}

// Inline email logo (BYLD/SPACE wordmark on warm cream), base64 PNG — embedded so the email
// never depends on a hosted URL.
const LOGO_B64 = "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";

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
