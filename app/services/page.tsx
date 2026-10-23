import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, ArrowRight } from 'lucide-react'
import Container from '@/components/layout/Container'
import ServicesGrid from '@/components/sections/ServicesGrid'
import SectionHeading from '@/components/sections/SectionHeading'
import CTASection from '@/components/sections/CTASection'
import JsonLd from '@/components/seo/JsonLd'
import { Reveal } from '@/components/motion/Motion'
import { pageMetadata, breadcrumbSchema, serviceSchema } from '@/lib/seo'
import { services } from '@/lib/services'

export const metadata: Metadata = pageMetadata({
  title: 'AI Development Services — RAG, AI Agents, GPU Deployment & SaaS',
  description:
    'AI development services from strategy to production: RAG chatbots, AI agent development, RunPod serverless GPU deployment, ComfyUI image & video APIs, AI integrations and SaaS MVPs.',
  path: '/services',
})

const engagements = [
  {
    name: 'Discovery Sprint',
    when: 'Best to start',
    desc: 'A short, fixed-price sprint to validate the idea on your real data and plan the build.',
    points: ['Working prototype or proof of concept', 'Architecture & stack recommendation', 'Fixed quote for the full build'],
  },
  {
    name: 'Project Build',
    when: 'Most popular',
    desc: 'A complete product or feature delivered in weekly sprints, priced up front.',
    points: ['Fixed scope with agreed milestones', 'Weekly demos on a staging link', 'Production deployment & handover'],
    highlight: true,
  },
  {
    name: 'Ongoing Partner',
    when: 'After launch',
    desc: 'A monthly retainer for new features, model upgrades, monitoring and cost tuning.',
    points: ['Reserved monthly engineering time', 'Model and infrastructure upgrades', 'Priority response'],
  },
]

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }]),
          ...services.map(s => serviceSchema({ name: s.name, description: s.metaDescription, path: `/services/${s.slug}` })),
        ]}
      />
      <section className="relative overflow-hidden pb-4 pt-40">
        <div aria-hidden className="grid-bg absolute inset-0 -z-10" />
        <div aria-hidden className="absolute right-[-10%] top-10 -z-10 h-[420px] w-[420px] rounded-full bg-gold/10 blur-[120px]" />
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="Services"
            title="AI development services,"
            accent="from idea to production."
            sub="Seven focused services that cover the full AI product lifecycle. Each one is delivered by engineers who build and run this stack every day."
          />
        </Container>
      </section>

      <ServicesGrid heading={false} />

      <section className="section border-t border-line">
        <Container>
          <SectionHeading eyebrow="Ways to work together" title="Simple engagement models," accent="priced up front." center />
          <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
            {engagements.map((e, i) => (
              <Reveal key={e.name} delay={i * 0.08}>
                <div
                  className={`relative flex h-full flex-col rounded-3xl p-8 ${
                    e.highlight ? 'border border-gold/50 bg-gradient-to-b from-gold/[0.12] to-transparent' : 'glass'
                  }`}
                >
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold">{e.when}</p>
                  <h2 className="mt-3 font-syne text-2xl font-bold text-fg">{e.name}</h2>
                  <p className="mt-3 font-dm text-[15px] leading-relaxed text-fg-2">{e.desc}</p>
                  <ul className="mt-6 flex flex-1 flex-col gap-3">
                    {e.points.map(p => (
                      <li key={p} className="flex gap-3 font-dm text-[15px] text-fg-2">
                        <Check size={17} className="mt-0.5 shrink-0 text-gold" /> {p}
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact" className={`mt-8 ${e.highlight ? 'btn-primary' : 'btn-ghost'}`}>
                    Get a quote <ArrowRight size={15} />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
      <CTASection />
    </>
  )
}
