import Link from 'next/link'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import Container from '@/components/layout/Container'
import { Reveal, TiltCard } from '@/components/motion/Motion'
import SectionHeading from './SectionHeading'
import ServiceIcon from './ServiceIcon'
import { services } from '@/lib/services'

export default function ServicesGrid({ heading = true }: { heading?: boolean }) {
  return (
    <section id="services" className="section">
      <Container>
        {heading && (
          <SectionHeading
            eyebrow="Services"
            title="Everything you need to"
            accent="launch AI that works."
            sub="Pick one service or combine them. We take a project from architecture to a deployed, monitored product."
          />
        )}
        <ul className={`grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 ${heading ? 'mt-14' : ''}`}>
          {services.map((s, i) => (
            <Reveal as="li" key={s.slug} delay={(i % 3) * 0.08} className={i === 0 ? 'sm:col-span-2' : undefined}>
              <TiltCard className="rounded-3xl">
                <Link
                  href={`/services/${s.slug}`}
                  className="glass relative flex h-full flex-col rounded-3xl p-7 transition-colors duration-300 hover:border-gold/40"
                >
                  <div className="mb-8 flex items-center justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl border border-gold/30 bg-gold/10 text-gold">
                      <ServiceIcon name={s.icon} />
                    </span>
                    <span className="font-mono text-xs text-fg-3">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="font-syne text-xl font-bold text-fg">{s.name}</h3>
                  <p className="mt-3 flex-1 font-dm text-[15px] leading-relaxed text-fg-2">{s.summary}</p>
                  <div className="mt-6 flex flex-wrap gap-1.5">
                    {s.stack.slice(0, 4).map(t => (
                      <span key={t} className="rounded-full bg-white/[0.05] px-2.5 py-1 font-mono text-[11px] text-fg-3">{t}</span>
                    ))}
                  </div>
                  <span className="mt-6 inline-flex items-center gap-1.5 font-dm text-sm font-semibold text-gold">
                    Learn more <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </TiltCard>
            </Reveal>
          ))}
          <Reveal as="li" delay={0.16} className="sm:col-span-2 lg:col-span-1">
            <div className="relative flex h-full flex-col justify-between gap-8 overflow-hidden rounded-3xl border border-gold/40 bg-gradient-to-br from-gold/[0.14] via-transparent to-cyan/[0.06] p-8 sm:flex-row sm:items-end lg:flex-col lg:items-start">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold">Not sure where to start?</p>
                <h3 className="mt-4 max-w-md font-syne text-2xl font-bold leading-tight text-fg">Tell us the problem. We&apos;ll recommend the right build, for free.</h3>
              </div>
              <Link href="/contact" className="btn-primary group shrink-0">
                Book a free call <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </ul>
      </Container>
    </section>
  )
}
