import { CheckCircle2 } from 'lucide-react'
import Container from '@/components/layout/Container'
import { Reveal } from '@/components/motion/Motion'
import SectionHeading from './SectionHeading'
import { whyUs, industries } from '@/lib/content'

export default function WhyUsSection() {
  return (
    <section className="section border-t border-line">
      <Container>
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="lg:sticky lg:top-36 lg:self-start">
            <SectionHeading eyebrow="Why EchoLoft" title="Why clients" accent="choose us." sub="Most teams can build either the software or the hardware. We build both, and we stay until it works in production." />
            <Reveal delay={0.1} className="mt-10">
              <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.16em] text-fg-3">Industries we work with</p>
              <div className="flex flex-wrap gap-2">
                {industries.map(i => (
                  <span key={i} className="rounded-full border border-line-2 px-3.5 py-1.5 font-dm text-sm text-fg-2">{i}</span>
                ))}
              </div>
            </Reveal>
          </div>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {whyUs.map((w, i) => (
              <Reveal as="li" key={w.title} delay={(i % 2) * 0.08}>
                <div className="glass h-full rounded-3xl p-7">
                  <CheckCircle2 size={22} className="text-gold" />
                  <h3 className="mt-5 font-syne text-lg font-bold text-fg">{w.title}</h3>
                  <p className="mt-2 font-dm text-[15px] leading-relaxed text-fg-2">{w.desc}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}
