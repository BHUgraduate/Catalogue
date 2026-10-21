import { site } from '../shared/data/site.js';

/**
 * Sends a form submission to Hycyon's form relay (see hycyon/relay). Never throws.
 * Resolves { ok: true } when it was delivered, otherwise { ok: false, reason } so the caller can fall back to email.
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
  } catch {
    return { ok: false, reason: 'network' };
  } finally {
    clearTimeout(timer);
  }
}
