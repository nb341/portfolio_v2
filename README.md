# Narin Balkissoon · Portfolio

Employer-facing portfolio built with Next.js 16, React 19, Tailwind CSS 4, and Three.js. The home page, section pages, and printable résumé are statically rendered. Navigation uses clean Next.js routes: `/about`, `/work`, `/experience`, `/capabilities`, `/approach`, `/contact`, and `/resume`.

The `portfolio/expressive-v2` iteration combines the dark engineering lab with stronger purple/fuchsia styling, personal-interest notes, engineering stories, and dedicated case-study pages at `/work/[project]`. Public pages use Narin Balkissoon; the résumé uses Narindra Balkissoon. The prior local design snapshot is in the ignored `.portfolio-review/expressive-baseline/` directory; private environment files are excluded.

## Development

```sh
npm install
npm run dev
```

Open http://localhost:3000. The printable résumé is at `/resume`; its print button opens the browser’s print dialog, where visitors can save a PDF.

## Content and design

- `app/content.ts` is the shared source for projects, experience, skills, and education. Keep claims consistent with `CLAUDE.md`.
- `app/page.tsx` composes the portfolio; `app/globals.css` contains responsive design and résumé print styles.
- `app/components/system-lab.tsx` asynchronously imports Three.js. It provides native layer controls, pointer rotation, pause/reset, reduced-motion support, visibility-based rendering, and a static fallback when WebGL is unavailable.
- Contact uses a progressively enhanced form and a Next.js Server Action. The recipient address is never part of public page content or browser bundles.

## Contact delivery

The form delivers messages through the [Resend email API](https://resend.com/docs/api-reference/emails/send-email). Configure these server-only variables in `.env.local` and in the hosting environment:

```dotenv
RESEND_API_KEY=your_resend_api_key
CONTACT_FROM_EMAIL=Portfolio <contact@your-verified-domain.com>
CONTACT_TO_EMAIL=your_private_recipient_address
```

The recipient is configured privately in the local environment. Fill in the API key and approved sender, then restart the server. Use a sender on a verified Resend domain. Never prefix these variables with `NEXT_PUBLIC_`, and never commit `.env.local`.

Submissions use plain-text email with the visitor’s address as `reply_to`. The form validates fields, retains inputs on failure, shows success only after the provider confirms acceptance, and supports submission without JavaScript. A honeypot and bounded per-instance rate limiter reduce basic spam; configure host-level rate limits for deployment across multiple instances. No visitor messages are persisted by the application. Hosting must support Next.js Server Actions; a static-only export cannot send mail.

The unfinished Sanity configuration and schemas are preserved but excluded from application TypeScript and lint checks. Integrating the CMS requires installing its dependencies and completing its schemas before restoring those files to the checks.

## Validation

```sh
npm run lint
npx tsc --noEmit --incremental false
npm run build
npm run start
```

The existing `next/font/google` configuration downloads Geist fonts during a fresh build, so that build needs network access. Review the home page at mobile, tablet, and desktop widths; check navigation, case-study disclosures, scene controls, reduced motion, WebGL fallback, and the résumé print preview. Local browser-review artifacts are ignored in `.portfolio-review/`.

## Accessibility review

The implementation targets WCAG 2.2 AA, following the [W3C quick reference](https://www.w3.org/WAI/WCAG22/quickref/). This is a design target, not a certification or a completed conformance audit. Previous WCAG 2.1 professional experience remains described accurately in the portfolio.

Before publishing, check:

- Keyboard-only navigation, skip-to-content, mobile menu Escape/blur behavior, and focus visibility beneath the fixed header (2.1.1, 2.4.7, 2.4.11).
- The 44px control targets, view-adjustment buttons as alternatives to canvas dragging, and pause/reduced-motion behavior (2.5.7, 2.5.8, 2.2.2).
- Text and control contrast, 200% text resizing, reflow at 320 CSS pixels, and custom text spacing (1.4.3, 1.4.4, 1.4.10, 1.4.11, 1.4.12).
- Headings and labels, form autocomplete, retained input after errors, focus on invalid fields, and screen-reader announcements of submission results (1.3.1, 1.3.5, 3.3.1–3.3.3, 3.3.7, 4.1.3).
- Forced-colors mode, screen-reader reading order, native case-study disclosures, and all routes at mobile and desktop widths.

## UX review notes (Oct 2026)

A read-only UX review aimed at senior full-stack recruiters. `npm run lint` and `npm run build` both pass. Open items, by priority:

**P0: positioning and hierarchy**
- Use one title on every page ("Senior Full-Stack Engineer · Cloud, Platform & AI") and one name ("Narindra (Narin) Balkissoon") in the H1, metadata, nav and résumé.
- Replace the hero H1 with a positioning statement. Move the proof metrics above the fold as a 5-item proof bar (97% faster deploys, 34% smaller images, 29 alert rules, 2-layer PHI redaction, 108 ms p95 M3-ID).
- Move `SystemLab` out of the hero. It adds 9 tab stops and loads about 712 KB of Three.js on every visit. Re-skin it as the real TurboVets observability architecture and lazy-mount it.
- Put the observability case study first in `projects` (`app/content.ts`).
- Add an AI-native engineering section and an `/ai` route that show the real workflow (grill-me → plan → PRD → architect/DB/QA/backend/frontend agents → adversarial review → small PRs), Arize Phoenix LLM tracing and M3-ID.
- Start Experience with professional roles. Move volunteering and PC repair to `/about`.

**P1: credibility, contact, accessibility**
- Add verifiable evidence (paper and repo links, recommendations, writing) and before/after outcome metrics.
- Show an email address and ship a static résumé PDF.
- Restructure case studies: role/team/timeframe, problem, constraints, options, decision, architecture, results, next.
- Fix the typo `user?s` → `user's` in `developmentWorkflow` (`app/content.ts:129`).
- Add `aria-hidden` to decorative ↗/↑ arrows, and use ↗ only on external links.
- Add an "opens in new tab" note to `target="_blank"` links.
- Give each "Read the case study" link a unique accessible name.
- Change the metric labels from `<h2>` to a `<dl>`.
- Make the skip link an `<a href="#main-content">`.
- Fix the missing 5th capability icon (`app/components/portfolio-sections.tsx:105`).
- Set `color-scheme: dark`.
- Raise the 11px text minimum.

**P2: SEO, performance, polish**
- Add `metadataBase`, canonical, an OG image, a Twitter card, JSON-LD `Person`, `sitemap.ts` and `robots.ts`.
- Replace the default favicon and remove the starter SVGs in `public/`.
- Merge `globals.css` and `expressive.css` into one set of tokens.
- Add print styles for pages other than the résumé.
- Add axe/Lighthouse CI.
