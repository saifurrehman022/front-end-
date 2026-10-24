import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, Check } from 'lucide-react'
import Container from '@/components/layout/Container'
import PageHeader from '@/components/layout/PageHeader'
import CTASection from '@/components/sections/CTASection'
import FaqSection from '@/components/sections/FaqSection'
import ProcessSection from '@/components/sections/ProcessSection'
import ServiceIcon from '@/components/sections/ServiceIcon'
import ProjectCard from '@/components/sections/ProjectCard'
import PostCard from '@/components/sections/PostCard'
import JsonLd from '@/components/seo/JsonLd'
import { Reveal } from '@/components/motion/Motion'
import { LoopVideo } from '@/components/media/Video'
import { videos } from '@/lib/media'
import { categories, getService, services } from '@/lib/services'
import { projects } from '@/lib/projects'
import { posts } from '@/lib/blog'
import { breadcrumbSchema, pageMetadata, serviceSchema } from '@/lib/seo'

export const dynamicParams = false

export function generateStaticParams() {
  return services.map(s => ({ slug: s.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const s = getService(params.slug)
  if (!s) return {}
  return pageMetadata({ title: s.metaTitle, description: s.metaDescription, path: `/services/${s.slug}`, keywords: [s.name, ...s.stack] })
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const s = getService(params.slug)
  if (!s) notFound()
  const path = `/services/${s.slug}`
  const related = services.filter(o => o.slug !== s.slug && o.category === s.category).slice(0, 3)
  const relProjects = projects.filter(p => p.services.includes(s.slug)).slice(0, 2)
  const relPosts = posts.filter(p => p.relatedServices.includes(s.slug)).slice(0, 3)

  return (
    <>
      <JsonLd
        data={[
          serviceSchema({ name: s.name, description: s.metaDescription, path, category: categories[s.category].label }),
          breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }, { name: s.name, path }]),
        ]}
      />

      <PageHeader
        eyebrow={categories[s.category].label}
        title={s.headline}
        sub={s.intro}
        crumbs={[{ name: 'Home', href: '/' }, { name: 'Services', href: '/services' }, { name: s.name }]}
        video={s.video}
      >
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link href="/contact" className="btn-primary group">
            Get a fixed quote <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <Link href="/projects" className="btn-ghost">See related projects</Link>
        </div>
      </PageHeader>

      <section className="section">
        <Container>
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.25fr_1fr]">
            <Reveal>
              <p className="eyebrow mb-5">Overview</p>
              <h2 className="h-display text-[clamp(28px,3.6vw,42px)]">How we approach {s.name}</h2>
              <div className="mt-6 flex flex-col gap-5">
                {s.overview.map(p => <p key={p.slice(0, 20)} className="font-dm text-[17px] leading-relaxed text-fg-2">{p}</p>)}
              </div>
              <h2 className="mt-14 font-syne text-2xl font-bold text-fg">What&apos;s included</h2>
              <ul className="mt-6 flex flex-col gap-4">
                {s.outcomes.map(o => (
                  <li key={o} className="flex gap-4 font-dm text-[16px] leading-relaxed text-fg-2">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold/15 text-gold"><Check size={14} strokeWidth={2.6} /></span>
                    {o}
                  </li>
                ))}
              </ul>
            </Reveal>
            <div className="flex flex-col gap-5 lg:sticky lg:top-36 lg:self-start">
              <Reveal delay={0.05} className="overflow-hidden rounded-3xl border border-line-2">
                <LoopVideo src={videos[s.video]} className="aspect-video w-full object-cover" />
              </Reveal>
              <Reveal delay={0.1} className="glass rounded-3xl p-7">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gold/10 text-gold"><ServiceIcon name={s.icon} /></span>
                  <h2 className="font-syne text-lg font-bold text-fg">{s.name}</h2>
                </div>
                <h3 className="mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-gold">Common use cases</h3>
                <ul className="mt-3 flex flex-col gap-2">
                  {s.useCases.map(u => <li key={u} className="font-dm text-[15px] text-fg">{u}</li>)}
                </ul>
                <h3 className="mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-gold">Deliverables</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {s.deliverables.map(d => <span key={d} className="rounded-full border border-line-2 px-3 py-1.5 font-dm text-sm text-fg">{d}</span>)}
                </div>
                <h3 className="mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-gold">Typical stack</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {s.stack.map(t => <span key={t} className="rounded-full bg-white/[0.05] px-3 py-1.5 font-mono text-xs text-fg-2">{t}</span>)}
                </div>
                <Link href="/contact" className="btn-primary mt-8 w-full">Discuss your project</Link>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {relProjects.length > 0 && (
        <section className="section border-t border-line">
          <Container>
            <p className="eyebrow mb-5">Related projects</p>
            <h2 className="h-display text-[clamp(28px,3.6vw,42px)]">{s.name} in practice</h2>
            <ul className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
              {relProjects.map(p => <li key={p.slug}><ProjectCard p={p} /></li>)}
            </ul>
          </Container>
        </section>
      )}

      <ProcessSection />
      <FaqSection faqs={s.faqs} title={`${s.name}:`} accent="common questions." />

      {relPosts.length > 0 && (
        <section className="section border-t border-line">
          <Container>
            <p className="eyebrow mb-5">Further reading</p>
            <ul className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {relPosts.map(p => <li key={p.slug}><PostCard p={p} /></li>)}
            </ul>
          </Container>
        </section>
      )}

      <section className="section border-t border-line">
        <Container>
          <p className="eyebrow mb-5">Related services</p>
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {related.map(r => (
              <li key={r.slug}>
                <Link href={`/services/${r.slug}`} className="glass group flex h-full flex-col rounded-3xl p-7 transition-colors hover:border-gold/40">
                  <span className="text-gold"><ServiceIcon name={r.icon} /></span>
                  <h3 className="mt-5 font-syne text-lg font-bold text-fg">{r.name}</h3>
                  <p className="mt-2 flex-1 font-dm text-sm leading-relaxed text-fg-2">{r.summary}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 font-dm text-sm font-semibold text-gold">Explore <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" /></span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CTASection />
    </>
  )
}
