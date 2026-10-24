import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, Check, CheckCircle2 } from 'lucide-react'
import Container from '@/components/layout/Container'
import PageHeader from '@/components/layout/PageHeader'
import ProjectCard from '@/components/sections/ProjectCard'
import CTASection from '@/components/sections/CTASection'
import JsonLd from '@/components/seo/JsonLd'
import { Reveal } from '@/components/motion/Motion'
import { ShowcasePlayer, YouTubeLite } from '@/components/media/Video'
import { videos } from '@/lib/media'
import { getProject, projects } from '@/lib/projects'
import { getService } from '@/lib/services'
import { breadcrumbSchema, pageMetadata, videoSchema } from '@/lib/seo'

export const dynamicParams = false
export function generateStaticParams() {
  return projects.map(p => ({ slug: p.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getProject(params.slug)
  if (!p) return {}
  return pageMetadata({ title: `${p.title} — Case Study`, description: p.summary, path: `/projects/${p.slug}`, keywords: p.stack, image: videos[p.video].poster })
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const p = getProject(params.slug)
  if (!p) notFound()
  const path = `/projects/${p.slug}`
  const v = videos[p.video]
  const more = projects.filter(o => o.slug !== p.slug && o.category === p.category).slice(0, 3)

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Projects', path: '/projects' }, { name: p.title, path }]),
          videoSchema({ name: p.title, description: p.summary, poster: v.poster, src: v.mp4, date: p.date, duration: 'PT8S', path }),
        ]}
      />
      <PageHeader eyebrow={p.tag} title={p.title} sub={p.summary} crumbs={[{ name: 'Home', href: '/' }, { name: 'Projects', href: '/projects' }, { name: p.title }]}>
        <div className="mt-8 flex flex-wrap gap-2">
          {p.stack.map(t => <span key={t} className="rounded-full border border-line-2 px-3 py-1.5 font-mono text-xs text-fg-2">{t}</span>)}
        </div>
      </PageHeader>

      <section className="pt-16">
        <Container>
          <Reveal>
            {p.youtubeId ? (
              <YouTubeLite id={p.youtubeId} title={p.title} />
            ) : (
              <div className="rounded-[28px] bg-gradient-to-br from-gold/40 via-white/10 to-cyan/30 p-px">
                <ShowcasePlayer src={v} title={p.title} className="aspect-video rounded-[27px] bg-ink-3" />
              </div>
            )}
          </Reveal>
        </Container>
      </section>

      <section className="section">
        <Container size="md">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_260px]">
            <article>
              <h2 className="font-syne text-2xl font-bold text-fg">The challenge</h2>
              <p className="mt-4 font-dm text-[17px] leading-relaxed text-fg-2">{p.challenge}</p>
              <h2 className="mt-12 font-syne text-2xl font-bold text-fg">What we built</h2>
              <ul className="mt-5 flex flex-col gap-4">
                {p.solution.map(s => (
                  <li key={s} className="flex gap-4 font-dm text-[16px] leading-relaxed text-fg-2">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold/15 text-gold"><Check size={14} strokeWidth={2.6} /></span>
                    {s}
                  </li>
                ))}
              </ul>
              <h2 className="mt-12 font-syne text-2xl font-bold text-fg">The result</h2>
              <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {p.results.map(r => (
                  <li key={r} className="glass rounded-2xl p-5 font-dm text-[15px] text-fg">
                    <CheckCircle2 size={18} className="mb-3 text-gold" />
                    {r}
                  </li>
                ))}
              </ul>
            </article>
            <aside className="flex flex-col gap-5 md:sticky md:top-36 md:self-start">
              <div className="glass rounded-3xl p-6">
                <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold">Services used</h2>
                <ul className="mt-3 flex flex-col gap-2">
                  {p.services.map(slug => {
                    const s = getService(slug)
                    return s ? <li key={slug}><Link href={`/services/${slug}`} className="font-dm text-[15px] text-fg hover:text-gold">{s.name}</Link></li> : null
                  })}
                </ul>
                <Link href="/contact" className="btn-primary mt-6 w-full text-sm">Build something similar <ArrowRight size={14} /></Link>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {more.length > 0 && (
        <section className="section border-t border-line">
          <Container>
            <p className="eyebrow mb-5">More projects</p>
            <ul className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {more.map(m => <li key={m.slug}><ProjectCard p={m} /></li>)}
            </ul>
          </Container>
        </section>
      )}
      <CTASection />
    </>
  )
}
