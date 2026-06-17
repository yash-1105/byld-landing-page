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

  // Public URL of the logo for the email. Use your live site once deployed.
  // Before your domain is connected, you can use the Vercel URL, e.g.
  // 'https://byld-landing-page.vercel.app/assets/byld-logo.png'
  LOGO_URL: 'https://byldspace.com/assets/byld-logo.png',

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
  GmailApp.sendEmail(to, CONFIG.SUBJECT, emailText(), {
    name: 'BYLD Space',
    htmlBody: emailHtml(),
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
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#F6F4EF;border:1px solid #E6E0D4;border-radius:20px;">',
    '<tr><td style="padding:40px 40px 36px;">',
    '<img src="' + CONFIG.LOGO_URL + '" alt="BYLD Space" width="120" style="display:block;height:auto;margin:0 auto 28px;" />',
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

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
