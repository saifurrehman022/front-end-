# EchoLoft AI — AI, Robotics & IoT Company Website

Website for EchoLoft AI: AI software (RAG chatbots, AI agents, GPU deployment, ComfyUI, AI SaaS) and robotics & IoT (Raspberry Pi, Arduino, ESP32).
Dark 3D motion design with videos, mega menu, login/signup, case studies and a blog, built for lead generation and SEO.

## Stack

- **Next.js 14** (App Router, static generation) + TypeScript
- **Tailwind CSS** design tokens (`ink`, `fg`, `gold`, `cyan`)
- **Three.js** — custom-shader 3D hero (lazy-loaded, pauses off-screen, respects reduced motion, CSS fallback without WebGL)
- **Motion** — scroll reveals, 3D tilt cards, split-text headline
- **Lucide** icons, Google Fonts via `next/font` (Syne, DM Sans, JetBrains Mono)

## Setup

```bash
npm install
cp .env.example .env.local   # then edit the values
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
```

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Live domain. Used for canonical URLs, sitemap, Open Graph and JSON-LD. **Set this before deploying.** |
| `NEXT_PUBLIC_API_URL` | FastAPI backend for login / signup |
| `NEXT_PUBLIC_FORM_ENDPOINT` | Contact form endpoint (e.g. Formspree / Web3Forms). Empty = form opens the visitor's email app |
| `NEXT_PUBLIC_GOOGLE_VERIFICATION` | Google Search Console verification token (optional) |

## Edit content

| What | File |
|---|---|
| Brand name, email, phone, address, socials, nav, SEO keywords | `lib/site.ts` |
| Services (11 — each gets its own SEO landing page) | `lib/services.ts` |
| Projects / case studies (add YouTube IDs here) | `lib/projects.ts` |
| Blog articles | `lib/blog.ts` |
| Stats, why-us, process, FAQ, team, tech, hardware | `lib/content.ts` |
| Video file paths | `lib/media.ts` (files in `public/videos/`) |

### Videos
`public/videos/` contains an original 16-second showreel and three looping clips (AI, robotics, IoT) with posters, in MP4 and WebM.
To use your own footage, replace the files with the same names (keep them short and compressed, ideally under 3 MB each),
or add a YouTube video ID to a project in `lib/projects.ts`.

Adding a service to `lib/services.ts` automatically creates `/services/<slug>`, adds it to the sitemap, footer, contact form and structured data.

## Pages

`/` · `/services` · `/services/[slug]` (11) · `/projects` · `/projects/[slug]` (7) · `/blog` · `/blog/[slug]` (6) · `/about` · `/contact` · `/legal/*` · `/auth/login` · `/auth/signup` · `/feed.xml` · custom 404.
`/dashboard` is a separate project and is excluded from search engines and lint.

## SEO built in

- Unique title, meta description and canonical URL per page
- Open Graph + Twitter cards with a generated 1200×630 image (`app/opengraph-image.tsx`)
- JSON-LD: `ProfessionalService` (with offer catalog), `WebSite`, `Service`, `BlogPosting`, `VideoObject`, `ItemList`, `BreadcrumbList`, `FAQPage`
- Blog with table of contents, RSS feed and internal links between services, projects and articles
- `sitemap.xml`, `robots.txt`, web manifest and generated favicon
- Keyword-targeted landing page for each service
- Fully static pages, lazy-loaded WebGL, font `display: swap` for fast Core Web Vitals
- Semantic headings, accessible labels, focus states, reduced-motion support

## After deploying

1. Set `NEXT_PUBLIC_SITE_URL` to the real domain and redeploy.
2. Add the site to Google Search Console and submit `/sitemap.xml`.
3. Set `NEXT_PUBLIC_FORM_ENDPOINT` so enquiries arrive by email.
4. Replace the entries in `lib/content.ts → work` with real client projects and add testimonials when you have permission.
