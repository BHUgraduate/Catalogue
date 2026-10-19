// Regenerates raster brand assets (favicons, app icons, 1200×630 social image) from the Hycyon mark.
// Dev-only; outputs are committed.   npx playwright install chromium && node scripts/make-assets.mjs
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { chromium } from 'playwright';

const out = new URL('../src/assets/img/', import.meta.url);
mkdirSync(out, { recursive: true });
const inner = readFileSync(new URL('../src/assets/brand/hycyon-mark.svg', import.meta.url), 'utf8').replace(/<svg[^>]*>/, '').replace('</svg>', '');
const mark = (color, size) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64" style="color:${color}">${inner}</svg>`;

writeFileSync(new URL('favicon.svg', out), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><style>:root{color:#10141a}@media(prefers-color-scheme:dark){:root{color:#eef1f4}}</style>${inner}</svg>`);

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
const shot = async (markup, w, h, file, transparent = false) => {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  await page.setContent(`<style>html,body{margin:0}</style>${markup}`);
  const buf = await page.screenshot({ omitBackground: transparent });
  await page.close();
  if (file) writeFileSync(new URL(file, out), buf);
  return buf;
};
const tile = (size, pad) => `<div style="width:${size}px;height:${size}px;background:#f5f3ee;display:grid;place-items:center">${mark('#10141a', size - pad * 2)}</div>`;
await shot(tile(180, 30), 180, 180, 'apple-touch-icon.png');
await shot(tile(192, 30), 192, 192, 'icon-192.png');
await shot(tile(512, 80), 512, 512, 'icon-512.png');
const f16 = await shot(`<div style="width:16px;height:16px">${mark('#10141a', 16)}</div>`, 16, 16, null, true);
const f32 = await shot(`<div style="width:32px;height:32px">${mark('#10141a', 32)}</div>`, 32, 32, null, true);
const ico = (pngs) => {
  const head = Buffer.alloc(6); head.writeUInt16LE(1, 2); head.writeUInt16LE(pngs.length, 4);
  let offset = 6 + 16 * pngs.length;
  const dirs = pngs.map(([size, buf]) => { const d = Buffer.alloc(16); d[0] = size; d[1] = size; d.writeUInt16LE(1, 4); d.writeUInt16LE(32, 6); d.writeUInt32LE(buf.length, 8); d.writeUInt32LE(offset, 12); offset += buf.length; return d; });
  return Buffer.concat([head, ...dirs, ...pngs.map(([, b]) => b)]);
};
writeFileSync(new URL('favicon.ico', out), ico([[16, f16], [32, f32]]));

// Social preview: brand + the scope-stack idea, little text so it survives small thumbnails.
const layers = ['Multi-tenant & billing', 'Roles & integrations', 'Accounts & data', 'Forms & SEO', 'Pages & layout'];
const stack = layers.map((l, i) => {
  const built = i >= 2;
  return `<div style="display:flex;align-items:center;gap:18px;padding:18px 26px;border-radius:10px;font:600 26px system-ui,sans-serif;${built ? 'background:#0f2a28;border:2px solid #4fd6c8;color:#eef1f4' : 'border:2px dashed #38424f;color:#8c95a2'}"><span style="font:500 20px ui-monospace,monospace;color:${built ? '#4fd6c8' : 'inherit'}">0${5 - i}</span>${l}</div>`;
}).join('');
await shot(`
<div style="width:1200px;height:630px;background:#0b0e12;color:#eef1f4;font-family:Georgia,serif;position:relative;overflow:hidden">
  <div style="position:absolute;inset:0;background:radial-gradient(700px 420px at 82% 20%,rgba(79,214,200,.14),transparent 65%)"></div>
  <div style="position:absolute;left:84px;top:80px;display:flex;align-items:center;gap:20px">${mark('#eef1f4', 64)}<span style="font-size:44px;letter-spacing:-1px">Hycyon</span><span style="margin-left:6px;padding-left:20px;border-left:2px solid #38424f;font:600 22px system-ui,sans-serif;letter-spacing:.16em;text-transform:uppercase;color:#8c95a2">Catalogue</span></div>
  <div style="position:absolute;left:84px;bottom:92px;width:560px">
    <div style="font-size:78px;line-height:1.02;letter-spacing:-3px">Software built around what you need.</div>
    <div style="margin-top:26px;font:600 22px system-ui,sans-serif;letter-spacing:.18em;text-transform:uppercase;color:#4fd6c8">Scope · Pricing · Delivery</div>
  </div>
  <div style="position:absolute;right:84px;top:120px;width:380px;display:grid;gap:12px">${stack}</div>
</div>`, 1200, 630, 'og-preview.png');
await browser.close();
console.log('Wrote brand assets to src/assets/img/');
