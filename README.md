<<<<<<< HEAD
# EchoLoft AI — Frontend

A production-grade Next.js 14 frontend for the EchoLoft AI platform. RAG-powered chat, document intelligence, and enterprise auth — all wired to your FastAPI backend.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design tokens
- **Fonts**: Syne (display) + DM Sans (body) via Google Fonts
- **Icons**: Lucide React
- **Auth**: JWT (access + refresh token) via localStorage → FastAPI backend

---

## Project Structure

```
/app
  layout.tsx           ← Root layout with Navbar + Footer
  page.tsx             ← Home page (Hero, TrustStrip, Features, Services, Stats, Testimonials, Team, CTA)
  globals.css          ← Design system: CSS variables, animations, utilities
  /about/page.tsx
  /services/page.tsx   ← Tabbed services + pricing
  /contact/page.tsx
  /auth
    /login/page.tsx    ← JWT login → POST /auth/login
    /signup/page.tsx   ← Registration → POST /auth/register
  /dashboard/page.tsx  ← Full RAG chat UI → /rag/* endpoints

/components
  /layout
    Navbar.tsx         ← Sticky, scroll-aware, auth-aware
    Footer.tsx         ← Mega footer, 4 columns
    Container.tsx      ← Max-width wrapper
  /sections
    Hero.tsx
    TrustStrip.tsx
    FeaturesGrid.tsx
    ServicesTabs.tsx   ← Click tabs to switch service content
    StatsCounter.tsx   ← Animated intersection-observer counters
    TestimonialsSection.tsx
    TeamSlider.tsx     ← Prev/next slider with LinkedIn icons
    CTASection.tsx
  /ui
    Button.tsx
    Input.tsx
    Card.tsx
    Badge.tsx
    Tabs.tsx
    Modal.tsx

/lib
  utils.ts             ← cn(), token helpers, apiFetch
  api.ts               ← Fully typed authApi + ragApi clients
```

---

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.local.example .env.local
# Edit NEXT_PUBLIC_API_URL to point to your FastAPI server

# 3. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Backend API Mapping

| Frontend Action        | Backend Endpoint               |
|------------------------|-------------------------------|
| Register               | POST `/auth/register`         |
| Login                  | POST `/auth/login` (form)     |
| Refresh token          | POST `/auth/refresh`          |
| Logout                 | POST `/auth/logout`           |
| Get profile            | GET `/auth/profile`           |
| Create conversation    | POST `/rag/conversations`     |
| Get conversation       | GET `/rag/conversations/:id`  |
| Send message (stream)  | POST `/rag/conversations/:id/messages` |

---

## Design System

Colors defined in `globals.css` as CSS variables:

| Token           | Value      | Usage              |
|-----------------|------------|--------------------|
| `--bg`          | `#05050a`  | Page background    |
| `--bg-2`        | `#0d0d18`  | Section backgrounds|
| `--surface`     | `#111127`  | Cards, panels      |
| `--accent`      | `#6c6aff`  | Primary brand color|
| `--accent-2`    | `#a78bfa`  | Secondary accent   |
| `--accent-3`    | `#38d9a9`  | Success / green    |

---

## Dashboard Features

- Sidebar with conversation history
- Model selector (16 models from your backend)
- Web search toggle (maps to `enable_web_search`)
- File upload (PDF, DOCX, XLSX, CSV, images)
- Streaming response display
- Keyboard shortcut: Enter to send, Shift+Enter for newline
=======
# front-end-
>>>>>>> 51a32d8be3c115cbb5a1fccd046c8e584929efbe
