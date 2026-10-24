import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, ArrowRight, ArrowUpRight } from 'lucide-react'
import Container from '@/components/layout/Container'
import PageHeader from '@/components/layout/PageHeader'
import SectionHeading from '@/components/sections/SectionHeading'
import ServiceIcon from '@/components/sections/ServiceIcon'
import ProcessSection from '@/components/sections/ProcessSection'
import CTASection from '@/components/sections/CTASection'
import JsonLd from '@/components/seo/JsonLd'
import { Reveal, TiltCard } from '@/components/motion/Motion'
import { LoopVideo } from '@/components/media/Video'
import { videos } from '@/lib/media'
import { pageMetadata, breadcrumbSchema, serviceSchema, itemListSchema } from '@/lib/seo'
import { services, categories, servicesBy, type ServiceCategory } from '@/lib/services'

export const metadata: Metadata = pageMetadata({
  title: 'Services — AI Development, Robotics, Raspberry Pi, Arduino & ESP32 IoT',
  description:
    'AI development and robotics services: RAG chatbots, AI agents, GPU deployment, ComfyUI pipelines, AI SaaS, robotics development, Raspberry Pi, ESP32 IoT and Arduino prototyping.',
  path: '/services',
})

const engagements = [
  { name: 'Discovery Sprint', when: 'Best to start', desc: 'A short, fixed-price sprint to validate the idea on your real data or hardware and plan the build.', points: ['Prototype or proof of concept', 'Architecture, stack and parts list', 'Fixed quote for the full build'] },
  { name: 'Project Build', when: 'Most popular', desc: 'A complete product, robot or system delivered in weekly sprints, priced up front.', points: ['Fixed scope with agreed milestones', 'Weekly demos and test builds', 'Deployment, documentation & handover'], highlight: true },
  { name: 'Ongoing Partner', when: 'After launch', desc: 'A monthly retainer for new features, firmware updates, monitoring and optimisation.', points: ['Reserved monthly engineering time', 'Model, firmware and infra upgrades', 'Priority response'] },
]

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }]),
          itemListSchema('Services', services.map(s => ({ name: s.name, path: `/services/${s.slug}` }))),
          ...services.map(s => serviceSchema({ name: s.name, description: s.metaDescription, path: `/services/${s.slug}`, category: categories[s.category].label })),
        ]}
      />
      <PageHeader
        eyebrow="Services"
        title="AI software and smart hardware,"
        accent="engineered end to end."
        sub="Eleven focused services across two disciplines. Pick one, or combine them: an AI model on a Raspberry Pi robot, ESP32 sensors feeding a dashboard, or a full AI SaaS product."
        crumbs={[{ name: 'Home', href: '/' }, { name: 'Services' }]}
        video="ai"
      />

      {(Object.keys(categories) as ServiceCategory[]).map((c, ci) => (
        <section key={c} id={c} className={`section scroll-mt-28 ${ci ? 'border-t border-line' : ''}`}>
          <Container>
            <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-[1fr_420px]">
              <SectionHeading eyebrow={categories[c].label} title={c === 'ai' ? 'AI & software' : 'Robotics & IoT'} accent={c === 'ai' ? 'services.' : 'services.'} sub={categories[c].desc} />
              <Reveal delay={0.1} className="hidden overflow-hidden rounded-3xl border border-line-2 lg:block">
                <LoopVideo src={videos[c === 'ai' ? 'ai' : 'iot']} className="aspect-video w-full object-cover" />
              </Reveal>
            </div>
            <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {servicesBy(c).map((s, i) => (
                <Reveal as="li" key={s.slug} delay={(i % 3) * 0.06}>
                  <TiltCard className="rounded-3xl">
                    <Link href={`/services/${s.slug}`} className="glass flex h-full flex-col rounded-3xl p-7 transition-colors hover:border-gold/40">
                      <span className="grid h-12 w-12 place-items-center rounded-2xl border border-gold/30 bg-gold/10 text-gold"><ServiceIcon name={s.icon} /></span>
                      <h3 className="mt-7 font-syne text-xl font-bold text-fg">{s.name}</h3>
                      <p className="mt-3 flex-1 font-dm text-[15px] leading-relaxed text-fg-2">{s.summary}</p>
                      <ul className="mt-5 flex flex-col gap-2">
                        {s.outcomes.slice(0, 3).map(o => (
                          <li key={o} className="flex gap-2 font-dm text-[13.5px] text-fg-3"><Check size={15} className="mt-0.5 shrink-0 text-gold" /> {o}</li>
                        ))}
                      </ul>
                      <span className="mt-6 inline-flex items-center gap-1.5 font-dm text-sm font-semibold text-gold">Learn more <ArrowUpRight size={15} /></span>
                    </Link>
                  </TiltCard>
                </Reveal>
              ))}
            </ul>
          </Container>
        </section>
      ))}

      <section className="section border-t border-line">
        <Container>
          <SectionHeading eyebrow="Ways to work together" title="Simple engagement models," accent="priced up front." center />
          <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
            {engagements.map((e, i) => (
              <Reveal key={e.name} delay={i * 0.08}>
                <div className={`relative flex h-full flex-col rounded-3xl p-8 ${e.highlight ? 'border border-gold/50 bg-gradient-to-b from-gold/[0.12] to-transparent' : 'glass'}`}>
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold">{e.when}</p>
                  <h2 className="mt-3 font-syne text-2xl font-bold text-fg">{e.name}</h2>
                  <p className="mt-3 font-dm text-[15px] leading-relaxed text-fg-2">{e.desc}</p>
                  <ul className="mt-6 flex flex-1 flex-col gap-3">
                    {e.points.map(p => (
                      <li key={p} className="flex gap-3 font-dm text-[15px] text-fg-2"><Check size={17} className="mt-0.5 shrink-0 text-gold" /> {p}</li>
                    ))}
                  </ul>
                  <Link href="/contact" className={`mt-8 ${e.highlight ? 'btn-primary' : 'btn-ghost'}`}>Get a quote <ArrowRight size={15} /></Link>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
      <ProcessSection />
      <CTASection />
    </>
  )
}
