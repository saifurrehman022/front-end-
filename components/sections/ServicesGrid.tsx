'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import Container from '@/components/layout/Container'
import { Reveal, TiltCard } from '@/components/motion/Motion'
import SectionHeading from './SectionHeading'
import ServiceIcon from './ServiceIcon'
import { categories, servicesBy, type ServiceCategory } from '@/lib/services'
import { cn } from '@/lib/utils'

export default function ServicesGrid({ heading = true, initial = 'ai' }: { heading?: boolean; initial?: ServiceCategory }) {
  const [tab, setTab] = useState<ServiceCategory>(initial)
  const list = servicesBy(tab)
  return (
    <section id="services" className="section scroll-mt-28">
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          {heading ? (
            <SectionHeading eyebrow="Services" title="Two disciplines." accent="One team." sub="AI software and smart hardware, designed together so everything connects, from the sensor to the model to the dashboard." />
          ) : <div />}
          <div role="tablist" aria-label="Service categories" className="glass flex w-fit shrink-0 gap-1 rounded-full p-1.5">
            {(Object.keys(categories) as ServiceCategory[]).map(c => (
              <button
                key={c}
                role="tab"
                type="button"
                aria-selected={tab === c}
                onClick={() => setTab(c)}
                className={cn('relative rounded-full px-5 py-2.5 font-dm text-sm font-semibold transition-colors', tab === c ? 'text-ink' : 'text-fg-2 hover:text-fg')}
              >
                {tab === c && <motion.span layoutId="svc-tab" className="absolute inset-0 rounded-full bg-gold" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                <span className="relative">{categories[c].label}</span>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.ul
            key={tab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {list.map((s, i) => (
              <li key={s.slug}>
                <TiltCard className="rounded-3xl">
                  <Link href={`/services/${s.slug}`} className="glass relative flex h-full flex-col rounded-3xl p-7 transition-colors duration-300 hover:border-gold/40">
                    <div className="mb-8 flex items-center justify-between">
                      <span className="grid h-12 w-12 place-items-center rounded-2xl border border-gold/30 bg-gold/10 text-gold"><ServiceIcon name={s.icon} /></span>
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
                      Learn more <ArrowUpRight size={15} />
                    </span>
                  </Link>
                </TiltCard>
              </li>
            ))}
            <li className={cn(list.length % 2 === 0 && 'sm:col-span-2', ['lg:col-span-3', 'lg:col-span-2', 'lg:col-span-1'][list.length % 3])}>
              <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-3xl border border-gold/40 bg-gradient-to-br from-gold/[0.14] via-transparent to-cyan/[0.06] p-8">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold">Not sure where to start?</p>
                  <h3 className="mt-4 max-w-md font-syne text-2xl font-bold leading-tight text-fg">Tell us the problem. We&apos;ll recommend the right build, for free.</h3>
                </div>
                <Link href="/contact" className="btn-primary group w-fit">
                  Book a free call <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </li>
          </motion.ul>
        </AnimatePresence>
        {heading && (
          <Reveal className="mt-10 text-center">
            <Link href="/services" className="inline-flex items-center gap-2 font-dm text-sm font-semibold text-fg-2 hover:text-gold">
              View all services <ArrowRight size={15} />
            </Link>
          </Reveal>
        )}
      </Container>
    </section>
  )
}
