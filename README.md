# XOVU website (xovu.ai)

Static site, no build step. Deployed by Vercel from `main`.

## Pages
- `index.html` (/): what XO does (Calendar only), how Google data is used, early-access request.
- `privacy.html` (/privacy): privacy policy, including the Google API Limited Use statement that Google's OAuth review checks for.
- `terms.html` (/terms): early-access terms of service.
- `404.html`: not-found page.

Keep XO's core ideas (trust model, guarantee, roadmap) off the public site until the IP is protected.

## Files
- `style.css`, `brand.js`: shared styles, the XO dot mark and the theme toggle.
- `fonts/`: Inter (400, 600) and JetBrains Mono (400), self-hosted, SIL OFL. No third-party requests.
- `brand/`, favicons, `site.webmanifest`, `og-image.png` (1200 x 630 link preview).
- `vercel.json`: clean URLs, www to apex redirect, security headers (CSP allows only same-origin files).
- `robots.txt`, `sitemap.xml`.

## Still to do
- Add the registered company name and address to /privacy and /terms once registration is complete.
- Lawyer review of /privacy and /terms.
- The early-access form opens the visitor's mail app with a request to founder@xovu.ai. No backend.

## Previous version

A single static page. No build step, no dependencies, no tracking, no third-party requests.

### Files
- index.html            The whole site (styles, XO mark, agent states and dot type are inside it)
- 404.html              Not-found page (XO in its Paused state)
- og-image.png          1200 x 630 link-preview image
- fonts/                Inter (400, 600) and JetBrains Mono (400), self-hosted woff2 subsets, SIL OFL
- brand/                Static lockup and symbol SVGs, used when JavaScript is off
- favicon.svg, favicon-32.png, apple-touch-icon.png, icon-192.png, icon-512.png, site.webmanifest
- vercel.json           www → apex redirect, security headers (CSP, HSTS, etc.), font caching
- robots.txt, sitemap.xml

### Live config
- Domain: https://xovu.ai (canonical, og:url, sitemap)
- Contact: founder@xovu.ai (footer link)
- Early-access form opens the visitor's mail app with a pre-filled request to founder@xovu.ai. No backend, no third-party form service. Works without JavaScript too.

### Brand
Follows xovu-brand-kit v1.0 (Direction 08b "Dots") and the XO app theme:
- Ink #0A0A0A / Chalk #F5F5F2, empty cells at 8% / 12%, paused grey #C9C9C4 / #3C3C3A. Voice red is not used (live microphone only).
- Inter for interface text, JetBrains Mono for system labels, XOVU Dot for the wordmark and "IN STEALTH." only.
- The mark uses the agent states with their real meaning and the timings in tokens/motion.json:
  - Showcase loop while nobody is interacting: Speaking → Idle → Thinking → Idle → Done → Idle (label follows).
  - Focusing the email field holds XO still (Idle); the loop resumes after submit or when the field is left empty.
  - Needs you: invalid email.
  - Thinking → Done (plays once) → Idle: early-access request.
  - Paused: tab hidden or device offline.
- A "XO · STATE" mono status line under the mark mirrors the app's status row.
- Reduced-motion users get the still mark.

### Deploy (Vercel)
1. Push this folder to a GitHub repo (index.html at the repo root).
2. Vercel → Add New… → Project → import the repo. Framework preset: Other. Leave build and output settings empty.
3. Domains: add xovu.ai and www.xovu.ai, then set the DNS records Vercel shows.
