import { site } from '../shared/data/site.js';

/**
 * Sends a form submission to Hycyon's form relay (see hycyon/relay). Never throws.
 * Resolves { ok: true } when it was delivered, otherwise { ok: false, reason } so the caller can fall back to email.
 * `reason` is a short code the relay sent back (forbidden, invalid, rate_limited, delivery_failed, not_configured, ...)
 * or 'network' / 'timeout' / 'http_<status>'. It is shown to the visitor so a failure is diagnosable at a glance.
 */
export async function sendLead(payload, { timeout = 8000 } = {}) {
  if (!site.formsEndpoint) return { ok: false, reason: 'not_configured' };
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), timeout);
  try {
    const res = await fetch(site.formsEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: ctl.signal,
      credentials: 'omit',
    });
    if (res.ok) return { ok: true };
    const body = await res.json().catch(() => null);
    return { ok: false, reason: body?.code || `http_${res.status}` };
  } catch (err) {
    // 'timeout' = no answer in time; 'network' = could not connect, or the browser blocked the request (for example CORS).
    return { ok: false, reason: err && err.name === 'AbortError' ? 'timeout' : 'network' };
  } finally {
    clearTimeout(timer);
  }
}
