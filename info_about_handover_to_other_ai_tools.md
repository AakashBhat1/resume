<!--
=========================================================================
 HANDOVER CONTROL BLOCK  —  multi-AI-agent coordination
 This file is the single source of truth for who works on this repo next.
 Claude      = reviewer/architect AND (since pass 2, by user decision) the FRONTEND implementer.
 antigravity = IMAGE / VIDEO / MEDIA GENERATION only (since pass 2, by user decision). No frontend code.
 codex       = MAIN backend implementer (APIs, data layer, logic). Use first for backend.
 cursor      = BACKUP member (on-demand implementer, backup tasks, unblocking).
 grok        = backend overflow.
 Implementers do the work and flip the switch back to claude or antigravity.
=========================================================================
-->
---
current_session_worker: claude        # <-- THE SWITCH. Only this agent acts.
last_updated_by: claude
last_updated_at: 2026-09-26T13:40:00Z
agents:
  - claude        # review, plan, route + FRONTEND implementation (user decision, pass 2).
  - antigravity   # MEDIA generation only: photos, video loops, stills. Does not edit code.
  - codex         # MAIN backend: APIs, business logic, data layer, algorithms. Use first.
  - cursor        # BACKUP member: takes assigned tasks, assists on-demand when prompted.
  - grok          # backend overflow.
protocol: |
  1. Each agent reads `current_session_worker` first.
  2. If it is not your name, STOP — stand down unless the user explicitly prompts you to act as backup.
  3. If it is your name, do ONLY the task-board rows with `assigned_to: <you>` and
     `status: todo` (or `in_progress`), following each finding's acceptance criteria.
  4. Mark completed rows `done`, add a row to the Handoff log, and set `current_session_worker`
     to the next agent per the "Execution chain" below.
  5. Never touch rows assigned to another agent; never change the plan — only claude plans.
routing:
  backend:            codex
  frontend:           claude        # user decision 2026-09-26: antigravity's frontend pass was "bland"
  validation:         claude
  backup_ondemand:    cursor
  video_photo_media:  antigravity   # user decision 2026-09-26
  design_plan_route:  claude
---

# Handover: resume portfolio — "Autumn Festive" redesign + 2026 resume sync

> Maintained by **claude** (senior reviewer). Read the control block above before doing anything.

## Context

- **Repo:** Next.js 16 (App Router) + React 19 + Tailwind 3 + framer-motion. Content is data-driven from `constants/portfolio-content.json` typed by `lib/types.ts`.
- **Live site:** https://resume-beta-coral.vercel.app/ (Vercel).
- **New resume:** `public/Aakash_Bhat_Resume_2026.pdf` (the old PDF was deleted). The site content is **one full resume behind**: it's missing the new title, 2 jobs, 6 projects, the expanded skills and 4 certifications.
- **User's brief (verbatim intent):** "upgrade the site visually and make it smoother. Right now it feels very AI-ish. I want it to look fresh, warm and modern, like an autumn festival."

### Live-site checks (claude, 2026-09-26)
- `GET /Aakash-Bhat-Resume.pdf` → **404**. The "Download Resume" button on production is broken, and has been since before this update (the path never matched the filename).
- `<link rel="canonical">` and `sitemap.xml` both point to `http://localhost:3001`, so `NEXT_PUBLIC_SITE_URL` is not set on Vercel.

### Execution chain
`claude → cursor (CUR-*) → codex (CX-*) → antigravity (FE-*, then VAL-01) → claude`

---

## Findings & task board

| ID | Lens | Title | Severity | Complexity | assigned_to | status | files |
|----|------|-------|----------|------------|-------------|--------|-------|
| CUR-01 | pipeline | Resume download 404 + stale content: sync JSON to 2026 PDF | Critical | Med | cursor | done | constants/portfolio-content.json, lib/types.ts |
| CUR-02 | pipeline | Canonical/sitemap/OG point to localhost | High | Low | cursor | done | constants/site.ts, (Vercel env) |
| CX-01 | security | HTML injection in contact email + raw error leak | Medium | Low | codex | done | lib/mailer.ts, app/actions/contact.ts |
| CX-02 | security | No rate limiting on contact server action | Low | Low | codex | done | app/actions/contact.ts |
| FE-01 | design | New "Autumn Festive" design system (tokens, fonts, light/dark) | High | Med | antigravity | done | tailwind.config.ts, app/globals.css, app/layout.tsx, app/manifest.ts |
| FE-02 | design | Remove the "AI-ish" tells (cursor, orbs, particles, typewriter, skill %) | High | Med | antigravity | done | components/*, sections/*, styles/animations.css |
| FE-03 | design | Rebuild sections for new content + new look | High | High | antigravity | done | sections/*, components/ui/* |
| FE-04 | design | Smoothness/perf pass on motion and scroll | High | Med | antigravity | done | components/navbar.tsx, app/template.tsx, components/ui/animation-wrapper.tsx, sections/* |
| FE-05 | design | OG image + meta colors match the new palette | Low | Low | antigravity | done | app/opengraph-image.tsx, app/layout.tsx |
| VAL-01 | validation | Verify all items + visual QA at 375/768/1280, light & dark | High | Med | antigravity | done | (delivered work) |

`status` values: `todo` → `in_progress` → `done`.

---

## Plan per finding

### CUR-01: Resume 404 + content sync (→ cursor)
**Problem:** `personal.resumePath` is `/Aakash-Bhat-Resume.pdf` but the file is `public/Aakash_Bhat_Resume_2026.pdf`. All the content predates the 2026 resume.
**Do:**
1. Set `resumePath` to `/Aakash_Bhat_Resume_2026.pdf`.
2. Update `lib/types.ts`:
   - Replace `skills: Record<string, SkillItem[]>` with `skills: Record<string, string[]>`. Drop the `level` percentages entirely, because fake precision like "Python 92%" is a strong AI/template tell.
   - Replace the single `certification` object with `certifications: { title; issuer; period; note? }[]`.
   - Add optional `location?: string` to `ExperienceItem`.
   - Make `ProjectItem.image` optional (the new projects have no images, so FE-03 uses typographic cards).
   - Add `tagline?: string` to `ProjectItem` (e.g. "Multi-Camera Intrusion Detection").
3. Rewrite `constants/portfolio-content.json` from the PDF. Use the resume's wording and do not invent anything:
   - **title:** "Software Engineer | DevOps & Automation". Rewrite `heroTagline`, `statement` and `about.summary` to match (defence-tech CV systems, DevOps, automation). Keep it short, first-person and concrete, with no buzzword stacks.
   - **experience (3, newest first):**
     - ETSPL (Earnest Tactical Solution Pvt Ltd): Software Engineer, DevOps Engineer & Technical Consultant, "Jul 2026 – Present", India, 3 bullets.
     - Codec Technologies: Data Science and MERN Stack Developer Trainee, "Dec 2025 – Feb 2026", Remote, 2 bullets. **Merge** the two old Codec entries into this one.
     - Genic Minds: AI/Computer Vision Intern, "Feb 2026 – Jun 2026", Noida, India, 2 bullets.
   - **projects (6, all 2026), with GitHub links taken from the PDF annotations:**
     - Argus: https://github.com/AakashBhat1/argus
     - GeMSentry: https://github.com/AakashBhat1/GeMSentry
     - Panox V2: https://github.com/AakashBhat1/panox-v2-360-video-stitcher
     - PhishGuard 2.0 Model Trainer: https://github.com/AakashBhat1/phishguard-model-trainer
     - Multi-Modal Binary Malware Analysis: https://github.com/AakashBhat1/Multi-Model
     - PDFZen: https://github.com/AakashBhat1/PDFZen

     For each project, condense the two resume bullets into a 1–2 sentence description and copy the stack verbatim. The old projects (Sign Language, Smart Parking, E-Commerce, Akruit, Distance Estimator) are **dropped**, to mirror the resume.
   - **skills (6 groups):** Languages; Backend & Web; AI & ML; Data & Infrastructure; Automation & Testing; Core Concepts. Copy them verbatim from the PDF. Remove `coursework` (it's now covered by Core Concepts).
   - **certifications (5):** 4× Google (Regression Analysis, Mar 2026; The Power of Statistics, Feb 2026; Go Beyond the Numbers, Feb 2026; Foundations of Data Science, Feb 2026) + NPTEL Advanced R (IIT Kanpur | SWAYAM, Jul–Oct 2025).
   - The phone and email are unchanged. Update the LinkedIn URL to the `www.` form used in the resume.
4. Fix the compile errors this causes in `sections/*` **only minimally**, just enough that `npm run build` passes (e.g. render skills as plain chips and map certifications). FE-03 owns the real redesign.
5. Delete `sections/testimonials-section.tsx`. It's unused and contains **fabricated** testimonials ("John Doe", "Jane Smith"). Delete `public/projects/*.svg` if they're no longer referenced. Delete the unused Next boilerplate SVGs in `public/`.

**Done when:** `npm run build` and `npm run lint` pass; `/Aakash_Bhat_Resume_2026.pdf` downloads from both hero and navbar; every fact on the page traces to the PDF.

### CUR-02: Canonical/sitemap point to localhost (→ cursor)
**Problem:** `siteConfig.url` falls back to `http://localhost:3001` because `NEXT_PUBLIC_SITE_URL` isn't set in production.
**Do:** Change the fallback in `constants/site.ts` to `https://resume-beta-coral.vercel.app`. Update the `description` and `keywords` to the new title (DevOps, Computer Vision, FastAPI, Docker, etc.). Leave a note in the Handoff log telling the user to also set `NEXT_PUBLIC_SITE_URL` in the Vercel project env. Do **not** change Vercel settings yourself.
**Done when:** a production build renders the canonical URL and sitemap `<loc>` as the Vercel URL.

### CX-01: HTML injection in contact email (→ codex)
**Problem:** `lib/mailer.ts` interpolates `senderName`, `senderEmail` and `message` raw into the `html` body, so anyone can inject markup or links into the owner's inbox. `app/actions/contact.ts` also returns `error.message` to the client, which leaks "Add SMTP env variables" to visitors.
**Do:** HTML-escape all three fields (`& < > " '`) before building the `html` body, then apply the `\n→<br>` step. Strip CR/LF from `senderName` before it goes into `subject`. In the action, log the real error with `console.error` and return only the generic message.
**Done when:** a message containing `<a href=x>hi</a>` arrives as literal text; the UI never shows internal config errors.

### CX-02: Rate-limit the contact action (→ codex)
**Do:** Add a lightweight in-memory limiter keyed by IP (`headers().get("x-forwarded-for")`), allowing around 3 submissions per 10 minutes. Put it in `lib/rate-limit.ts` and return a friendly error when the limit is hit. Note in a code comment that it's per-instance on serverless and good enough for a portfolio. Also tighten `lib/validations.ts` max lengths if they're missing (name ≤ 80, message ≤ 2000).
**Done when:** the 4th rapid submit returns the rate-limit message; the build passes.

---

### FE-01: "Autumn Festive" design system (→ antigravity)
**Direction:** a warm, editorial, handcrafted feel, like a harvest-festival poster printed on good paper, rather than a neon dev dashboard. The warmth should come from **colour, type and texture**, not from motion. The festive note is a light accent. Avoid pumpkins and clip-art.

**Palette:** define these as CSS variables in `app/globals.css` and map them in `tailwind.config.ts`, replacing the `accent` cyan set, `accent-gradient`, `surface-gradient` and `shadow-glow`.

| token | Light ("paper", **new default**) | Dark ("ember") |
|---|---|---|
| `--background` | `#FBF6EE` warm cream | `#1A1411` espresso |
| `--surface` (cards) | `#FFFDF8` | `#241B16` |
| `--foreground` | `#2B1E16` bark ink | `#F3E8DA` |
| `--muted` | `#6E5A4B` | `#B8A493` |
| `--border` | `#E6D9C6` | `#3A2C23` |
| `--primary` | `#C4541C` burnt pumpkin | `#E07A3F` |
| `--marigold` | `#E3A33A` | `#F0B955` |
| `--cranberry` | `#8E2F36` | `#C4525A` |
| `--moss` | `#5F6B3A` | `#9AA56A` |

- Use `--primary` for CTAs and links, `--marigold` for highlights, underlines and the active nav item, and `--cranberry` and `--moss` sparingly for tag variety. Every text/background pair must meet WCAG AA contrast.
- **Fonts:** load both with `next/font/google` and remove Inter.
  - Display: **Fraunces** (variable, soft optical sizing) for the name and section headings.
  - Body/UI: **Plus Jakarta Sans** (or DM Sans).
  - Use `tabular-nums` for dates.
- **Texture:** add a subtle paper-grain overlay (inline SVG `feTurbulence` noise as a data-URI background, around 4–6% opacity, static) plus one soft warm radial glow at the top of the page. No animated blobs.
- **Shape:** cards use a 14–16px radius, a 1px `--border`, a solid `--surface` background and a soft warm shadow (`0 1px 0 rgb(43 30 22 / .04), 0 8px 24px -12px rgb(120 60 20 / .18)`). **No glassmorphism and no backdrop-blur**, except on the navbar.
- **Theme:** `defaultTheme="light"` and keep `enableSystem`. Fix `:root { color-scheme: dark }` to `light`. Remove the invalid `light:block` variant in `animated-background.tsx`. Replace every hardcoded `slate-*`/`cyan-*` class with token classes (`bg-surface`, `text-foreground`, `text-muted`, `text-primary`…). Right now light mode is broken because most text is hardcoded `text-slate-100`.
- Update `::selection` to a marigold tint, and set `manifest.ts` and viewport `themeColor` to `#FBF6EE` / `#1A1411`.

**Done when:** no `cyan-`, `sky-`, `teal-` or `slate-` classes remain (`grep -rE "cyan-|sky-|teal-|slate-" app components sections` is empty); both themes look intentional.

### FE-02: Remove the AI-ish tells (→ antigravity)
Delete or replace:
- `components/custom-cursor.tsx` and the global `cursor: none !important`. This hurts usability and is a classic template tell.
- The orbs, particles and pulse-glow in `animated-background.tsx`. Replace them with the static grain + glow from FE-01, or delete the component.
- `components/ui/typewriter-effect.tsx`. Render the tagline as static text.
- `components/ui/skill-bar.tsx` (the percentage bars).
- `styles/animations.css` (orbit/pulse).
- The hero "Core Focus" glass box with its floating orbs.
- The gradient-text/glow shadows and the `magnetic-button` translate-on-hover.
- Generic headings like "Modern Stack Across ML and Full-Stack Development" and "Industry Training and Practical Delivery". Rewrite them in a human voice, e.g. "What I work with", "Where I've worked", "Things I've built", "Certificates". Keep the eyebrows short or drop them.

**Done when:** none of the files and patterns above remain; `npm run build` passes.

### FE-03: Rebuild sections (→ antigravity)
Build on the FE-01 tokens and the CUR-01 data:
- **Hero:** left-aligned and editorial.
  - Small marigold eyebrow: "Software Engineer · DevOps & Automation".
  - Name in large Fraunces (clamp around 3–5.5rem).
  - A one-line tagline, then a 2-line statement.
  - A "Currently" line with a small pulsing-free dot: "Currently at ETSPL — defence-tech CV & DevOps".
  - CTAs: primary solid pumpkin "Download résumé" (with the `download` attribute) + a text link "See projects →".
  - Social icons as simple outline circles.
  - On the right (desktop only), a **festive motif**: one hand-drawn-style inline SVG, e.g. a marigold/leaf sprig or a string of small marigold "garland" dots curving across the top of the hero. It should be static or have at most a single 600ms draw-in on load. Keep it tasteful; it's the only decorative flourish on the page.
- **Section divider:** a thin repeating leaf/marigold SVG rule between major sections, low-contrast, used 2–3 times at most.
- **About:** two columns (summary + "What I focus on" list). No glass box.
- **Skills:** six groups rendered as label + wrapped chips. Rotate chip tints across primary, marigold, moss and cranberry at 10–12% background with ink text. No icons or bars. Remove the `react-icons/si` iconMap.
- **Experience:** a vertical timeline on a single left rail (drop the alternating zig-zag). Show the date in a tabular-nums column on desktop, and the company + location on one line.
- **Projects:** 6 typographic cards in a 2-col grid (1-col on mobile). Each card has the year, title, tagline in the muted colour, description, stack chips and a "GitHub ↗" link, with the whole card clickable. There are no images. Hover lifts the card by 2px, warms the border to primary, and shifts the arrow 2px (CSS transition, 200ms). Optionally make Argus a 2-col "featured" card.
- **Education + Certifications:** merge them into one "Education & certificates" section with two compact lists. Certifications are grouped by issuer (Google ×4, NPTEL ×1).
- **Contact:** keep the form, restyled with tokens. Show the email as a large copyable link above the form.
- **Navbar:** reduce to 5 items (About, Experience, Projects, Skills, Contact) plus a "Résumé" button, with a solid `--background` at 85% + blur once scrolled and transparent at the top. The marigold underline animates between items with the existing `layoutId`.
- **Footer:** one quiet line, e.g. "© 2026 Aakash Bhat · Built with Next.js · Faridabad, India".
- Update `constants/site.ts` `navItems` to match (cursor owns the site.ts edits in CUR-02; antigravity only touches `navItems`).

**Done when:** every section renders the CUR-01 data, the page looks right at 375/768/1280 in both themes, and there are no horizontal-scroll or overflow issues.

### FE-04: Smoothness pass (→ antigravity)
Fix these causes of jank:
1. The custom cursor ran `setState` on every `mousemove`, re-rendering React at 60+ Hz. Removing it in FE-02 fixes this.
2. `animated-background` put a **fixed**, full-screen, parallax-transformed layer under several 90–110px blurs, which repaints on every scroll. Remove it (FE-02).
3. `navbar.tsx` read `offsetTop`/`offsetHeight` for 8 sections on every scroll event (layout thrash). Replace this with a single `IntersectionObserver` (`rootMargin: "-40% 0px -55% 0px"`).
4. The hero's `useScroll` parallax: remove it.
5. `app/template.tsx` wraps the whole app in an opacity/translate animation, which delays first paint and causes a flash. Delete the file.
6. For reveal-on-scroll, use one shared `AnimationWrapper`: fade + 12px rise, 450ms, `ease: [0.22,1,0.36,1]`, `once: true`. Stagger only within a list, capped at around 60ms × index with a maximum of 5 items. Remove per-card `whileHover` scale and all x-axis slide-ins.
7. Respect `prefers-reduced-motion`: wrap the app in `<MotionConfig reducedMotion="user">` inside the theme provider.
8. Keep `scroll-behavior: smooth` on `html` only under `@media (prefers-reduced-motion: no-preference)`. Add `scroll-margin-top: 5rem` to sections so anchor jumps clear the navbar.
9. Remove `overflow-x: hidden` from `html`/`body` (it breaks `position: sticky` and masks bugs). Fix any real overflow at its source.
10. Remove the unused `motion` import in the testimonials section (deleted anyway) and any other unused framer imports.

**Done when:** Chrome Performance recording of a full scroll shows no long tasks or layout-thrash warnings; Lighthouse mobile Performance ≥ 90 and CLS < 0.05.

### FE-05: OG + meta colors (→ antigravity)
**Do:** Restyle `app/opengraph-image.tsx` with a cream background, name in bark ink, title in pumpkin, and a thin marigold rule. Match the manifest `background_color`/`theme_color`.
**Done when:** `/opengraph-image` renders in the new palette.

### VAL-01: Validation (→ antigravity)
**Do:**
1. Run `npm run build && npm run lint`.
2. Click "Download résumé" in the hero and navbar and confirm the 2026 PDF downloads.
3. Diff the page text against the PDF and confirm there are no invented facts.
4. Check 375/768/1280 widths in light and dark.
5. Test keyboard nav: visible focus rings in `--primary`, a skip-link to `#main`.
6. Toggle reduced motion and confirm nothing animates.
7. Lighthouse mobile: Perf ≥ 90, A11y ≥ 95, SEO 100 with the canonical URL correct.
8. Submit the contact form with an HTML payload and confirm it's escaped (CX-01).
9. Run the grep checks from FE-01/FE-02.

Log pass/fail per item in the Handoff log. Route failures back to `claude`.
**Done when:** all checks pass or failures are logged.

---

## Pass 2: multi-page remake + media (2026-09-26)

**User decisions (in chat):** claude builds the frontend; antigravity only generates images and video. Split into real pages with transitions between routes.

### What claude shipped (FE2-01, done)
- **Routes:** `/`, `/work`, `/work/[slug]` (6 SSG pages), `/about`, `/contact`, custom 404. Old `sections/*` and `components/ui/*` removed.
- **Transitions:** React `<ViewTransition>` (`experimental.viewTransition` in `next.config.ts`).
  - Pages exit with a lift and blur and enter with a delayed rise (`components/motion/page-transition.tsx`, CSS in `app/globals.css`).
  - Project cover and title morph between card and detail page, and between "Next project" and its page (`lib/transitions.ts` names).
  - The header is pinned during transitions. Theme toggle does a circular reveal from the click point.
- **Motion:**
  - Lenis smooth scroll (off under reduced motion).
  - Masked word-rise headlines. Above-the-fold ones are pure CSS, so they play before hydration.
  - Scroll-linked parallax on media frames, a timeline rail that fills as you scroll, and CSS skill marquees.
  - A spring-follow "View" pill on project cards, a hide-on-scroll header, and a clip-path mobile menu.
- **Media pipeline:** `lib/media.ts` checks `/public/media/...` at build time. If a file exists it is used (video > still); otherwise generated autumn art is used (`components/media/hero-art.tsx`, `art-fallback.tsx`). **No code change is needed when assets land.**
- **Data:** added project `slug` and `featured`, and reordered experience newest-first (ETSPL → Genic Minds → Codec).
- **Verified:** `tsc`, `lint`, `npm run build` (17 static routes), 6/6 contact tests, and production render of `/`, `/work`, `/work/argus` in light and dark. Client navigation `/` → `/work` → `/work/panox-v2` → next → `/about` renders correctly.
- **Not verified:** the automation browser couldn't resize below 1064px or show animation frames (its tab was hidden). **Mobile layout and the live look of the transitions still need a human check** on a real browser.
- **Heads-up:** the dev server already running on :3001 served stale SSR output during this pass. Restart `npm run dev` before reviewing.

| ID | Lens | Title | Severity | Complexity | assigned_to | status | files |
|----|------|-------|----------|------------|-------------|--------|-------|
| FE2-01 | design | Multi-page remake, route transitions, motion system | High | High | claude | done | app/**, components/** |
| MED-01 | media | Hero loop video + poster (festive autumn arch) | High | Med | antigravity | done | public/media/hero/* |
| MED-02 | media | Six project cover stills (+ optional loops) | High | Med | antigravity | done | public/media/work/* |
| VAL2-01 | validation | Review delivered media in context; mobile + transition check | Med | Low | claude | done | (delivered media) |
| MED-03 | media | (Optional) Hero loop: remove blurred background figure + white streak artifact | Low | Low | antigravity | optional | public/media/hero/* |

### Rules for all media (MED-01, MED-02)
- **Palette:** cream `#FBF6EE`, burnt pumpkin `#C4541C`, marigold `#E3A33A`, cranberry `#8E2F36`, moss `#5F6B3A`. Warm golden-hour light, soft film-like grade, slight grain.
- **No people, faces or likeness of the site owner.** No text, logos or watermarks.
- **No fake product UI or dashboards.** These are art-directed editorial still-lifes, not screenshots, because anything that looks like a real screenshot would misrepresent the projects.
- Keep all six covers visibly one series (same grade, same light direction).
- Video: H.264 MP4 (`yuv420p`, `+faststart`, no audio track) **and** VP9 WebM. Loops must be seamless. Slow, gentle motion only, with no cuts or camera shake.
- **Do not edit any code.** Drop files at the exact paths below; the build picks them up.

### MED-01: Hero loop (→ antigravity)
**Where it shows:** the arched frame on the home page (the top is a semicircle and the bottom has rounded corners), 4:5 portrait, with a scroll parallax that scales it 1.14→1.
**Scene:** strings of marigold garlands and small warm lamp or diya lights hanging across the frame, swaying slightly. A few maple leaves drift down through backlit golden-hour haze, with a soft sun glow behind and upper centre, shallow depth of field and a warm cream-to-pumpkin-to-cranberry gradient in the light. Keep the key subject in the central 60% and the upper two-thirds; the top corners are cropped by the arch.
**Deliver:**
- `public/media/hero/hero.mp4`: 1080×1350, 24–30 fps, 8–12 s seamless loop, ≤ 2.5 MB
- `public/media/hero/hero.webm`: same, ≤ 2 MB
- `public/media/hero/hero.webp`: first frame as the poster, ≤ 200 KB

**Done when:** all three files exist, the loop has no visible seam, and the sizes are within budget.

### MED-02: Project covers (→ antigravity)
**Where they show:** cards crop the same file to 4:5, 4:3 and 16:9, and the detail page hero is 16:9 with parallax. Centre the subject so it survives every crop (central 60%).
**Deliver per slug:**
- **Required:** `public/media/work/<slug>.webp`, 1600×1200, ≤ 350 KB
- **Optional:** `<slug>.mp4` + `<slug>.webm`, a 4–6 s seamless loop at 1600×1200, ≤ 1.5 MB each. The still becomes the video's poster automatically.

| slug | project | art direction |
|------|---------|---------------|
| `argus` | Multi-camera intrusion detection | Several small vintage brass CCTV cameras or antique lenses on warm wood at dusk; one lens reflects an autumn garden. Watchful, calm. |
| `gemsentry` | Government tender intelligence | Neat stacks of paper documents with red wax seals, a brass magnifying glass and scattered marigold petals under a warm desk lamp. |
| `panox-v2` | Dual-fisheye 360° video stitcher | A glass sphere resting on leaves, refracting an upside-down autumn park, fisheye-like. |
| `phishguard` | Phishing-URL model trainer | An amber-glass fishing lure/hook suspended above fallen maple leaves, very shallow depth of field. |
| `malware-analysis` | Multi-modal malware analysis | Cranberry, marigold and moss threads woven on a small loom into a node-and-edge network pattern. |
| `pdfzen` | Local PDF processing suite | Cream, pumpkin and marigold paper folded into origami leaves, laid on natural linen. |

**Done when:** all six `.webp` files exist at the exact slug paths within budget, and the set reads as one consistent series.

### VAL2-01: Validation (→ claude, after media)
Rebuild, then check the media in the hero, cards and detail pages, in both themes. Check the view-transition morphs and the mobile layout (375/768) in a real browser. Then run Lighthouse mobile (Perf ≥ 90 even with the hero video).

### VAL2-01 results (claude, 2026-09-26)
- **Code:** antigravity changed no code (no source files newer than its handoff).
- **Hero video:** H.264 `yuv420p` and VP9, 1080×1350 at 30 fps, 8.0 s, no audio track, faststart (`moov` before `mdat`). MP4 1.08 MB, WebM 0.90 MB, poster 167 KB, all within budget.
  - Loop seam: the first→last frame mean difference is about 2.4/255, the same as first→mid, so there's no visible seam.
  - On brief: marigold strands and brass lamps under a timber arch, with maple leaves.
- **Covers:** all 6 are 1600×1200 WebP between 126 and 270 KB, and they read as one consistent, on-brief series. Crops check out: `panox-v2` has an off-centre subject but only renders at 4:3 and 16:9, so it stays in frame.
- **Integration:** a fresh `npm run build` passes. Static HTML confirms the home page has `<video>` + poster, all 6 covers are referenced, and 0 fallback-art SVGs remain. Production render was checked for the hero arch and the Argus card.
- **Minor (MED-03, optional):** the hero has one heavily blurred background figure (brief said no people; it's unidentifiable) and a thin white streak artifact near the stone wall. Regenerate only if the user wants.
- **Still needs a human, in a real visible browser:** mobile 375/768 and the live view-transition morphs. The automation tab is hidden, so it can't paint transitions or resize.

---

## Handoff log

| When | From | To | Note |
|------|------|----|------|
| 2026-09-26T13:40:00Z | claude | claude | VAL2-01 done: media verified (specs, loop seam, crops, build integration). Optional MED-03 logged. Remaining are user actions: real-browser mobile/transition check, Vercel NEXT_PUBLIC_SITE_URL, PDF dates, commit + deploy. |
| 2026-09-26T13:15:00Z | antigravity | claude | MED-01 & MED-02 complete. Generated autumn-festive hero loop MP4 (1.08 MB), WebM (0.90 MB), and WebP poster (167 KB) at 1080x1350 with seamless 8s loop, gentle swaying garlands, flame flicker, sun breathing, and drifting maple leaves. Generated all 6 project covers in `public/media/work/*.webp` at 1600x1200 under 350 KB matching the art-directed autumn editorial still-life series. Production build passed (`npm run build`, 17 static routes). Switch handed back to claude for VAL2-01. |
| 2026-09-26T13:10:00Z | claude | antigravity | Pass 2 (user decision: claude owns frontend, antigravity owns media only). FE2-01 done: multi-page remake with React ViewTransition morphs, Lenis, CSS first-paint reveals, generated fallback art; build/lint/tsc/tests pass. antigravity: do MED-01 and MED-02 only (no code edits), then set the switch back to claude for VAL2-01. |
| 2026-09-26T07:15:00Z | antigravity | claude | FE-01..05 & VAL-01 complete. Designed Autumn Festive system (Fraunces + Plus Jakarta Sans, paper & ember palettes, grain + warm glow). Removed all AI tells (cursor, orbs, typewriter, percentage bars, float animations, template.tsx). Rebuilt sections: editorial left-aligned hero with festive garland motif and currently line; 2-col about; single left-rail experience; 6 typographic project cards (featured Argus); 6 rotating-tint skill categories; merged education & issuer-grouped certificates; copyable email banner + restyled tokenized contact form; quiet footer. Replaced scroll layout thrash with IntersectionObserver, wrapped with MotionConfig reduced-motion. All VAL-01 items passed: npm run build & lint clean, contact escaping verified, 2026 PDF download verified, zero cyan/slate classes remaining, visual QA passed across 375/768/1280 light and dark. Handing back to claude. |
| 2026-09-26T06:39:23Z | codex | antigravity | CX-01 and CX-02 done. Changed `lib/mailer.ts`, `app/actions/contact.ts`; added `lib/rate-limit.ts` and `tests/contact.test.mjs`. Escaped all three HTML fields before message line-break conversion, stripped subject CR/LF, logged delivery errors server-side with generic client responses. Added per-IP limit of 3 delivery attempts per 10 minutes, including failed deliveries; per-instance serverless scope and trusted proxy requirement documented. Existing validation already caps names at 80 and messages at 2000. Passed `node --test tests/contact.test.mjs` (6 tests), `npm run build`, `npm run lint`, and `git diff --check`; backend review found no blockers. SMTP was mocked: actual inbox delivery remains for VAL-01. Next: FE-01 through FE-05, then VAL-01. |
| 2026-09-26 | claude | cursor | Initial review. Live resume link 404 + stale content (CUR-01) and localhost canonical (CUR-02) first; then codex CX-01/02; then antigravity FE-01..05 + VAL-01. |
| 2026-09-26 | cursor | codex | CUR-01 and CUR-02 done. Content matches the 2026 PDF (`resumePath` `/Aakash_Bhat_Resume_2026.pdf`); skills are plain chips; certifications is an array. Production build canonical and sitemap `<loc>` are `https://resume-beta-coral.vercel.app`. `npm run build` and `npm run lint` pass. User: set `NEXT_PUBLIC_SITE_URL` in the Vercel project env (not changed here). Next: CX-01 and CX-02. |
| 2026-09-26 | cursor | codex | User corrected the PDF experience dates. Site now uses ETSPL Jul 2026 – Present (India), Codec Technologies Dec 2025 – Feb 2026 (Remote), Genic Minds Feb 2026 – Jun 2026 (Noida, India). Worker stays codex for CX-01 and CX-02. |

<!--
 IMPLEMENTERS: after finishing your assigned `todo` items, set each to `done`,
 add a row to the Handoff log, and set `current_session_worker` to the next agent
 in the Execution chain (cursor → codex → antigravity → claude).
-->
