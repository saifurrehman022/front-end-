import Link from 'next/link'
import { ArrowUpRight, BadgeCheck, Star } from 'lucide-react'
import Container from '@/components/layout/Container'
import { Reveal, TiltCard } from '@/components/motion/Motion'
import SectionHeading from './SectionHeading'
import { credentials, engagements } from '@/lib/content'
import { siteConfig } from '@/lib/site'

export default function TrackRecord({ limit }: { limit?: number }) {
  const list = limit ? engagements.slice(0, limit) : engagements
  return (
    <section id="track-record" className="section scroll-mt-28 border-t border-line">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Track record"
            title="Real clients."
            accent="Measurable results."
            sub="Selected engagements from the last three years: data pipelines, AI automation and production debugging for companies in Europe, New Zealand and beyond."
          />
          <div className="flex shrink-0 items-center gap-3 rounded-2xl border border-line-2 px-5 py-4">
            <div className="flex gap-0.5 text-gold" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={15} fill="currentColor" />)}
            </div>
            <div>
              <p className="font-syne text-lg font-extrabold leading-none text-fg">5.0 / 5.0</p>
              <p className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.14em] text-fg-3">100% Job Success</p>
            </div>
          </div>
        </div>

        <Reveal className="mt-12">
          <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
            {credentials.map(c => (
              <li key={c.title} className="flex items-start gap-3 bg-ink-2 p-5">
                <BadgeCheck size={18} className="mt-0.5 shrink-0 text-gold" strokeWidth={1.8} />
                <div>
                  <p className="font-dm text-[14px] font-semibold text-fg">{c.title}</p>
                  <p className="mt-0.5 font-dm text-[12.5px] leading-snug text-fg-3">{c.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        <ul className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {list.map((e, i) => (
            <Reveal as="li" key={e.title} delay={(i % 3) * 0.08}>
              <TiltCard className="h-full rounded-3xl" intensity={5}>
                <article className="glass flex h-full flex-col rounded-3xl p-7">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-gold">{e.sector}</p>
                    {e.period && <p className="font-mono text-[11px] text-fg-3">{e.period}</p>}
                  </div>
                  <h3 className="mt-4 font-syne text-[19px] font-bold leading-snug text-fg">{e.title}</h3>
                  <p className="mt-1 font-dm text-[13px] font-medium text-fg-3">{e.client}</p>
                  <p className="mt-4 flex-1 font-dm text-[14.5px] leading-relaxed text-fg-2">{e.outcome}</p>
                  <p className="mt-6 rounded-2xl border border-gold/25 bg-gold/[0.06] px-4 py-3 font-syne text-[15px] font-bold text-gold-2">
                    {e.metric}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {e.stack.map(t => (
                      <span key={t} className="rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-fg-2">{t}</span>
                    ))}
                  </div>
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-10 flex flex-col items-start justify-between gap-4 rounded-3xl border border-line-2 p-6 sm:flex-row sm:items-center">
          <p className="font-dm text-[15px] text-fg-2">
            Want references or a walkthrough of similar work? Email{' '}
            <a href={`mailto:${siteConfig.email}`} className="font-semibold text-fg underline decoration-gold/50 underline-offset-4 hover:text-gold">{siteConfig.email}</a>
          </p>
          {limit ? (
            <Link href="/about#track-record" className="btn-ghost shrink-0">Full track record <ArrowUpRight size={15} /></Link>
          ) : (
            <Link href="/contact" className="btn-primary shrink-0">Start a project <ArrowUpRight size={15} /></Link>
          )}
        </Reveal>
      </Container>
    </section>
  )
}
