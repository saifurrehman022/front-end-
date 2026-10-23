import Container from '@/components/layout/Container'
import { Reveal, TiltCard } from '@/components/motion/Motion'
import SectionHeading from './SectionHeading'
import { work } from '@/lib/content'

export default function WorkSection() {
  return (
    <section id="work" className="section scroll-mt-24">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-gold/[0.06] blur-[120px]" />
      <Container>
        <SectionHeading
          eyebrow="Selected work"
          title="Systems we have"
          accent="designed and shipped."
          sub="A sample of the production builds behind our services. Client names are kept private; ask on a call for a live walkthrough."
        />
        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
          {work.map((w, i) => (
            <Reveal key={w.title} delay={(i % 2) * 0.1}>
              <TiltCard className="rounded-3xl" intensity={5}>
                <article className="glass relative flex h-full flex-col overflow-hidden rounded-3xl p-8">
                  <div aria-hidden className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br from-gold/25 to-cyan/10 blur-3xl" />
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold">{w.tag}</p>
                  <h3 className="mt-4 font-syne text-2xl font-bold leading-tight text-fg">{w.title}</h3>
                  <p className="mt-4 flex-1 font-dm text-[15px] leading-relaxed text-fg-2">{w.desc}</p>
                  <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
                    <div className="flex flex-wrap gap-1.5">
                      {w.stack.map(t => (
                        <span key={t} className="rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-fg-2">{t}</span>
                      ))}
                    </div>
                    <span className="font-dm text-sm font-semibold text-fg">{w.metric}</span>
                  </div>
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
