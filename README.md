# EchoLoft AI — Agency Website

Marketing site for EchoLoft AI, an AI development agency (RAG chatbots, AI agents, RunPod GPU deployment, ComfyUI pipelines, AI SaaS MVPs).
Dark, 3D motion design built for lead generation, with full technical SEO.

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
| Brand name, email, socials, nav, SEO keywords | `lib/site.ts` |
| Services (cards + one SEO landing page each) | `lib/services.ts` |
| Work, process, promises, FAQ, team, tech list | `lib/content.ts` |

Adding a service to `lib/services.ts` automatically creates `/services/<slug>`, adds it to the sitemap, footer, contact form and structured data.

## Pages

`/` · `/services` · `/services/[slug]` (7 landing pages) · `/about` · `/contact` · `/legal/privacy` · `/legal/terms` · `/auth/login` · `/auth/signup` · custom 404.
`/dashboard` is a separate project and is excluded from search engines and lint.

## SEO built in

- Unique title, meta description and canonical URL per page
- Open Graph + Twitter cards with a generated 1200×630 image (`app/opengraph-image.tsx`)
- JSON-LD: `ProfessionalService`, `WebSite`, `Service`, `BreadcrumbList`, `FAQPage`
- `sitemap.xml`, `robots.txt`, web manifest and generated favicon
- Keyword-targeted landing page for each service
- Fully static pages, lazy-loaded WebGL, font `display: swap` for fast Core Web Vitals
- Semantic headings, accessible labels, focus states, reduced-motion support

## After deploying

1. Set `NEXT_PUBLIC_SITE_URL` to the real domain and redeploy.
2. Add the site to Google Search Console and submit `/sitemap.xml`.
3. Set `NEXT_PUBLIC_FORM_ENDPOINT` so enquiries arrive by email.
4. Replace the entries in `lib/content.ts → work` with real client projects and add testimonials when you have permission.
