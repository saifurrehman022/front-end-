import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, Check, ChevronRight } from 'lucide-react'
import Container from '@/components/layout/Container'
import CTASection from '@/components/sections/CTASection'
import FaqSection from '@/components/sections/FaqSection'
import ServiceIcon from '@/components/sections/ServiceIcon'
import JsonLd from '@/components/seo/JsonLd'
import { Reveal } from '@/components/motion/Motion'
import { getService, services } from '@/lib/services'
import { breadcrumbSchema, pageMetadata, serviceSchema } from '@/lib/seo'

export const dynamicParams = false

export function generateStaticParams() {
  return services.map(s => ({ slug: s.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const s = getService(params.slug)
  if (!s) return {}
  return pageMetadata({ title: s.metaTitle, description: s.metaDescription, path: `/services/${s.slug}` })
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const s = getService(params.slug)
  if (!s) notFound()
  const path = `/services/${s.slug}`
  const related = services.filter(o => o.slug !== s.slug).slice(0, 3)

  return (
    <>
      <JsonLd
        data={[
          serviceSchema({ name: s.name, description: s.metaDescription, path }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
            { name: s.name, path },
          ]),
        ]}
      />

      <section className="relative overflow-hidden pb-20 pt-36">
        <div aria-hidden className="grid-bg absolute inset-0 -z-10" />
        <div aria-hidden className="absolute right-[-5%] top-16 -z-10 h-[460px] w-[460px] rounded-full bg-gold/10 blur-[130px]" />
        <Container>
          <nav aria-label="Breadcrumb" className="mb-10 flex items-center gap-1.5 font-dm text-sm text-fg-3">
            <Link href="/" className="hover:text-fg">Home</Link>
            <ChevronRight size={14} />
            <Link href="/services" className="hover:text-fg">Services</Link>
            <ChevronRight size={14} />
            <span className="text-fg-2" aria-current="page">{s.name}</span>
          </nav>
          <Reveal className="max-w-4xl">
            <span className="mb-7 grid h-14 w-14 place-items-center rounded-2xl border border-gold/30 bg-gold/10 text-gold">
              <ServiceIcon name={s.icon} size={24} />
            </span>
            <h1 className="h-display text-[clamp(36px,5.5vw,68px)] leading-[1.02]">{s.headline}</h1>
            <p className="mt-7 max-w-2xl font-dm text-lg leading-relaxed text-fg-2">{s.intro}</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className="btn-primary group">
                Get a fixed quote <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/#work" className="btn-ghost">See related work</Link>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="section border-t border-line">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.3fr_1fr]">
            <Reveal>
              <p className="eyebrow mb-5">What you get</p>
              <h2 className="h-display text-[clamp(28px,3.6vw,42px)]">What&apos;s included in our {s.name.toLowerCase()} service</h2>
              <ul className="mt-8 flex flex-col gap-4">
                {s.outcomes.map(o => (
                  <li key={o} className="flex gap-4 font-dm text-[16px] leading-relaxed text-fg-2">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold/15 text-gold">
                      <Check size={14} strokeWidth={2.6} />
                    </span>
                    {o}
                  </li>
                ))}
              </ul>
            </Reveal>
            <div className="flex flex-col gap-5">
              <Reveal delay={0.1} className="glass rounded-3xl p-7">
                <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold">Common use cases</h2>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {s.useCases.map(u => (
                    <li key={u} className="font-dm text-[15px] text-fg">{u}</li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={0.15} className="glass rounded-3xl p-7">
                <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold">Deliverables</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {s.deliverables.map(d => (
                    <span key={d} className="rounded-full border border-line-2 px-3 py-1.5 font-dm text-sm text-fg">{d}</span>
                  ))}
                </div>
                <h2 className="mt-7 font-mono text-[11px] uppercase tracking-[0.16em] text-gold">Typical stack</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {s.stack.map(t => (
                    <span key={t} className="rounded-full bg-white/[0.05] px-3 py-1.5 font-mono text-xs text-fg-2">{t}</span>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <FaqSection faqs={s.faqs} title={`${s.name}:`} accent="common questions." />

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
                  <span className="mt-5 inline-flex items-center gap-1.5 font-dm text-sm font-semibold text-gold">
                    Explore <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </span>
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
