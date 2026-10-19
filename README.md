# Hycyon Catalogue — catalogue.hycyon.com

The service catalogue of [Hycyon](https://hycyon.com): what we can build, what it might cost, what you receive, what is not included, and how to start. It is the commercial layer of the Hycyon ecosystem.

| Site | Role |
|---|---|
| [hycyon.com](https://hycyon.com/) | Brand · products · engineering |
| **catalogue.hycyon.com** (this repo) | Services · scope · indicative pricing · project requests |
| [portfolio.hycyon.com](https://portfolio.hycyon.com/) | Founder and engineering work |
| [ebookpro.hycyon.com](https://ebookpro.hycyon.com/) · [brainsparkos.web.app](https://brainsparkos.web.app/) | Products |

## What's here

A static site with **zero runtime dependencies**. A small Node (≥ 20) build turns data files and template functions into HTML; vanilla ES modules add the interactions. Everything is progressively enhanced — with JavaScript off, every service, price, comparison row and FAQ is still readable.

**Routes** (all real, shareable, pre-rendered pages):

- `/` — hero, capability strip, Starter Website, project guide, service explorer, packages by budget, compare, add-ons, transparency, projects, Hycyon connection, process, FAQ, quote request
- `/services/` — every service, grouped by category
- `/services/<category>/` — e.g. `/services/websites/`, `/services/ai/`
- `/services/<service>/` — e.g. `/services/starter-website/` (the same content opens in a drawer on the home page)
- `/?cat=…&budget=…&q=…&sort=…` — explorer state lives in the URL; back/forward work
- `/?service=<slug>#quote` — opens the quote form with that service pre-selected

## Architecture

```
build.mjs              src/ → repository root (see "Deployment")
src/
  shared/              isomorphic: imported by the build AND by the browser
    data/              ← edit content here
      services.js        30 services: price range, deliverables, exclusions, delivery, add-ons
      categories.js  goals.js  tiers.js  comparison.js  addons.js
      projects.js  process.js  faq.js  transparency.js  scope-stack.js  site.js
    render/            serviceCard, serviceDetail, goalResult, icons
    html.js  format.js   auto-escaping template tag, INR + range helpers
  site/                build-time only: layout, SEO/JSON-LD, section components, pages
  client/              browser modules: explorer, drawer, goals, tiers, quote form, theme, nav…
  assets/css/          tokens.css (shared Hycyon tokens) · base.css · components.css
  assets/brand/        hycyon-mark.svg — source of every favicon/icon/social image
scripts/
  check.mjs            QA: data integrity, metadata, headings, links/anchors, JSON-LD, sitemap, claims, secrets
  serve.mjs            local static server
  make-assets.mjs      regenerates favicons, icons, og-preview.png (needs Playwright; outputs committed)
```

The service explorer filters the **pre-rendered cards** by toggling `hidden` — there is no client-side re-render of the grid, so filtering is instant and counts are computed from the same data attributes.

### Editing content

| Change | Edit |
|---|---|
| Add / change a service, price, deliverable, exclusion | `src/shared/data/services.js` |
| Budget levels shown in Packages and the explorer's budget filter | `src/shared/data/tiers.js` |
| "What are you trying to build?" recommendations | `src/shared/data/goals.js` (`serviceIds[0]` is the primary match) |
| Website comparison table | `src/shared/data/comparison.js` |
| Add-ons, process, FAQ | `addons.js`, `process.js`, `faq.js` |
| Projects shown as proof | `src/shared/data/projects.js` — real work only; screenshots only if real |
| Contact email, links | `src/shared/data/site.js` |

Run `npm test` after any edit. A service added to `services.js` automatically gets a card, a detail page, a sitemap entry, JSON-LD, search, filtering and a quote-form option.

## Development

```
npm run build   # generate the site
npm run check   # QA — must print "All checks passed"
npm test        # build + check
npm run serve   # http://localhost:4173
npm run assets  # regenerate raster brand assets (needs Playwright)
```

No environment variables or secrets are required, and none may be committed (`check.mjs` scans for common key patterns).

## Quote requests

There is no backend. The guided form validates in the browser, then opens a pre-written email to `hycyon.hq@gmail.com` (`mailto:`) and offers a copy-to-clipboard fallback. Nothing is sent until the visitor presses send in their email app, and no credential exists anywhere in this repo. If a form backend is added later, keep credentials server-side.

## Design system

`src/assets/css/tokens.css` is the Hycyon token set shared with hycyon.com (colour, type, spacing, radius, borders, shadows, motion, breakpoints), plus a few catalogue additions (`--danger`, `--inverse-*`). Light and dark themes are designed separately; the theme follows the system until the visitor toggles it. Motion is limited to reveals, filtering transitions and the hero demo, and is disabled under `prefers-reduced-motion`.

## SEO

Canonical `https://catalogue.hycyon.com/…`, Open Graph/Twitter metadata, `sitemap.xml` (home + every service and category), `robots.txt`, and JSON-LD: `Organization` (Hycyon), `WebSite`, `OfferCatalog` and `FAQPage` on the home page, `Service` (with an indicative `AggregateOffer`) and `BreadcrumbList` on each service page.

## Deployment

GitHub Pages serves the **root of `main`**, so the generated files are committed next to `src/`:
`index.html`, `404.html`, `services/`, `assets/`, `sitemap.xml`, `robots.txt`, `manifest.webmanifest`, `favicon.ico`, `og-preview.png`. **Never edit those by hand — edit `src/` and run `npm run build`.** `CNAME` (`catalogue.hycyon.com`) must stay. CI (`.github/workflows/check.yml`) fails a PR if the committed output is stale.

## Content rules

Prices are indicative INR ranges; final pricing is confirmed after scope review. Only verifiable claims are used — no invented clients, testimonials, statistics or awards (`check.mjs` blocks common phrases).
