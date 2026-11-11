import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Container from '@/components/layout/Container'
import PageHeader from '@/components/layout/PageHeader'
import CTASection from '@/components/sections/CTASection'
import ProjectCover from '@/components/projects/ProjectCover'
import ProjectsExplorer from '@/components/projects/ProjectsExplorer'
import JsonLd from '@/components/seo/JsonLd'
import { Reveal } from '@/components/motion/Motion'
import { projects } from '@/lib/projects'
import { breadcrumbSchema, itemListSchema, pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Projects & Case Studies — AI Automation, Data Pipelines, Robotics and IoT',
  description:
    'Case studies of AI systems, data pipelines, robots and IoT devices we have built: GPU video pipelines, retail data unification, LLM email automation, AI agents, RAG chat, forecasting, ESP32 sensor networks and Raspberry Pi robots.',
  path: '/projects',
})

const FEATURED = 'ai-video-avatar-pipeline'

export default function ProjectsPage() {
  const featured = projects.find(p => p.slug === FEATURED) ?? projects[0]
  const rest = projects.filter(p => p.slug !== featured.slug)

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Projects', path: '/projects' }]),
          itemListSchema('Projects', projects.map(p => ({ name: p.title, path: `/projects/${p.slug}` }))),
        ]}
      />
      <PageHeader
        eyebrow="Case studies"
        title="Work that"
        accent="runs in production."
        sub="AI automation, data pipelines and smart machines we have designed, built and shipped for clients and our own products. Each case study covers the problem, the approach and the result."
        crumbs={[{ name: 'Home', href: '/' }, { name: 'Projects' }]}
        video="robot"
      >
        <dl className="mt-10 grid max-w-xl grid-cols-3 gap-6 border-t border-line pt-8">
          {[
            { v: `${projects.length}`, l: 'Case studies' },
            { v: '30+', l: 'Projects delivered' },
            { v: '5.0', l: 'Client rating' },
          ].map(s => (
            <div key={s.l}>
              <dt className="font-dm text-[12px] text-fg-3">{s.l}</dt>
              <dd className="mt-1 font-syne text-[30px] font-extrabold leading-none text-fg">{s.v}</dd>
            </div>
          ))}
        </dl>
      </PageHeader>

      {/* Featured */}
      <section className="section pb-0">
        <Container>
          <p className="eyebrow mb-6">Featured case study</p>
          <Reveal>
            <Link
              href={`/projects/${featured.slug}`}
              className="glass group grid grid-cols-1 overflow-hidden rounded-[28px] transition-all duration-300 hover:border-gold/40 hover:shadow-[var(--shadow-lg)] lg:grid-cols-[1.15fr_1fr]"
            >
              <ProjectCover p={featured} size="hero" className="min-h-[300px] lg:min-h-[440px]" />
              <div className="flex flex-col p-8 sm:p-12">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-gold">{featured.tag}</p>
                <h2 className="mt-4 font-syne text-[clamp(26px,3vw,36px)] font-extrabold leading-tight text-fg">{featured.title}</h2>
                <p className="mt-4 font-dm text-[16px] leading-relaxed text-fg-2">{featured.summary}</p>
                <ul className="mt-6 flex flex-col gap-2.5">
                  {featured.results.map(r => (
                    <li key={r} className="flex items-start gap-3 font-dm text-[15px] text-fg">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                      {r}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-1.5">
                  {featured.stack.map(t => (
                    <span key={t} className="rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-fg-2">{t}</span>
                  ))}
                </div>
                <div className="mt-auto pt-8">
                  <span className="btn-primary w-fit">
                    Read the case study <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
        </Container>
      </section>

      {/* All projects */}
      <section className="section">
        <Container>
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="eyebrow mb-4">All projects</p>
              <h2 className="h-display text-[clamp(28px,3.6vw,44px)] leading-tight">
                Browse by <span className="text-gradient">discipline.</span>
              </h2>
            </div>
            <p className="max-w-md font-dm text-[15px] leading-relaxed text-fg-2">
              Some client names are withheld under NDA. Ask us for references or a walkthrough of similar work.
            </p>
          </div>
          <ProjectsExplorer projects={rest} />
        </Container>
      </section>

      <CTASection />
    </>
  )
}
