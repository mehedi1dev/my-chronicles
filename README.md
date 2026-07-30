# Mehedi — Premium Developer Portfolio

A modern, animated, multi-page personal portfolio built with React, Vite, Tailwind CSS v4, and Framer Motion.

## Getting started

```bash
npm install
npm run dev       # start dev server
npm run build     # production build
npm run preview   # preview the production build
```

## Editing content

All content lives in plain JS objects under `src/data/` — edit these files to
update text, projects, travels, skills, blog posts, etc. without touching any
component code:

- `src/data/profile.js` — name, bio, stats, tech stack, skills, experience, testimonials, contact details (email, WhatsApp, Facebook, LinkedIn, GitHub, address)
- `src/data/projects.js` — "My Works" project cards
- `src/data/travels.js` — map pins (with category, images, description), and travel stories
- `src/data/photography.js` — photo carousel highlights + Favorites/Nature/Beach galleries
- `src/data/entertainment.js` — games you've played, plus Top Picks (Web Series / Movies / Anime) with IMDb links & ratings
- `src/data/faith.js` — Qur'an verses, Hadith quotes, and fallback prayer times
- `src/data/content.js` — education, certifications, games/photography/reading interests
- `src/data/journey.js` — the "My Journey" timeline

## Structure

- `src/components/ui` — reusable UI primitives (cards, buttons, cursor, nav helpers, doodles, command palette…)
- `src/components/layout` — Navbar, Footer
- `src/components/sections` — Home page sections
- `src/pages` — one file per route (see `src/App.jsx` for the route list)
- `src/hooks` — theme, scroll progress, mouse position, Konami code

## Features implemented

- Animated hero with typewriter role text, floating glass cards
- Dark/light theme toggle with system preference detection
- Command palette (Ctrl/Cmd + K) to jump between sections
- Custom animated cursor, scroll progress bar, back-to-top button
- Glass navbar with dropdown, mobile menu
- Section-themed low-opacity SVG icon doodles with floating motion
- Filterable Works and Blog pages, tabbed FAQ, testimonial slider
- Konami code easter egg
- Fully responsive (mobile / tablet / desktop)

## Notes / next steps

- Replace placeholder resume link (`public/resume.pdf`), social links, WhatsApp number, and email
  in `src/data/profile.js` with your real ones.
- Swap in your real project screenshots, travel photos, and blog content — placeholder images
  currently come from picsum.photos; swap in real URLs (Google Drive direct-view links work too:
  `https://drive.google.com/uc?export=view&id=YOUR_FILE_ID`).
- `src/data/entertainment.js` ratings/links are static — update them by hand, or wire up the OMDb
  API with your own key if you want live IMDb data.
- Prayer times on the Faith page fetch live from the Aladhan API for the selected city (default
  Dhaka), with a "Use my location" geolocation option, and fall back to `src/data/faith.js`
  static times if the request fails.
- The travel map uses `react-leaflet` with free OpenStreetMap tiles — no API key required —
  and defaults to a Bangladesh-wide view.
- The Bengali date on the Faith page uses a real (approximate) Bangla calendar conversion in
  `src/utils/bengaliDate.js` — month names like Boishakh, Joishtho, etc.
- "My Works" and "Skills" are now one page (`src/pages/Works.jsx`) — skills summary first, then
  projects. `src/data/journey.js` now uses `start`/`end` ("YYYY-MM") per entry; overlapping ranges
  (e.g. a Master's alongside a job) are auto-detected and rendered in parallel lanes by
  `src/utils/journeyLayout.js` — no manual lane assignment needed.
- Travel categories on the map are derived dynamically from whatever `category` tag each
  destination has in `src/data/travels.js` — add a new tag and it appears automatically.

## SEO setup

This project ships with the SEO groundwork already in place:

- Full meta tags in `index.html` — title, description, keywords, Open Graph, Twitter Card, and a `Person` JSON-LD structured data block.
- `public/robots.txt` and `public/sitemap.xml`.
- `src/components/ui/SEO.jsx` — sets a unique `<title>` and meta description per page (see it used at the top of each file in `src/pages`).
- Routes are code-split with `React.lazy` so the initial JS payload is much smaller (better Core Web Vitals).

**Before deploying**, replace every `https://your-domain.com` in `index.html`, `public/robots.txt`, and `public/sitemap.xml` with your real domain, and add a real `og-image.png` (1200×630px) to `public/`.

### Getting found on Google — realistic next steps

Good on-page SEO (what's already set up here) makes your site *eligible* to rank well, but it alone won't put you at #1 for competitive terms. What actually moves the needle, roughly in order of impact:

1. **Submit your sitemap** in [Google Search Console](https://search.google.com/search-console) and request indexing for your homepage.
2. **Get backlinks** — link to your site from GitHub, LinkedIn, Twitter/X, dev.to, Hashnode, and anywhere else you're active. Backlinks from other sites are the single biggest ranking factor.
3. **Publish content regularly** — a blog, even a few posts a year, gives Google fresh, indexable content and keywords to rank you for. A static "about me" page alone has a low ceiling.
4. **Target a specific niche keyword** rather than generic terms like "developer" — e.g. "React + AI developer Bangladesh" or your actual name (which you'll rank for almost immediately since there's little competition).
5. **Keep Core Web Vitals fast** — this project's code-splitting and lightweight design already help here; run [PageSpeed Insights](https://pagespeed.web.dev) after deploying to check.
6. **Use a custom domain** (not a subdomain of a free host) — it reads as more credible/permanent to Google and is easier to build backlinks toward.
7. **Be patient** — new sites typically take weeks to months to get properly indexed and start ranking, even with everything done right.
