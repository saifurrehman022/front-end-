import Container from '@/components/layout/Container'
import { Reveal } from '@/components/motion/Motion'
import SectionHeading from './SectionHeading'
import { process } from '@/lib/content'

export default function ProcessSection() {
  return (
    <section id="process" className="section scroll-mt-24 border-t border-line">
      <Container>
        <SectionHeading eyebrow="How we work" title="A clear process," accent="no surprises." sub="From the first call to launch, you always know what is being built, what it costs and when it ships." />
        <div className="relative mt-16">
        <div aria-hidden className="absolute left-0 right-0 top-[27px] hidden h-px bg-gradient-to-r from-gold/0 via-gold/40 to-gold/0 lg:block" />
        <ol className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {process.map((p, i) => (
            <Reveal as="li" key={p.step} delay={i * 0.1} className="relative">
              <span className="relative z-10 grid h-14 w-14 place-items-center rounded-full border border-gold/40 bg-ink font-mono text-sm text-gold shadow-[0_0_30px_-6px_rgba(232,180,74,0.5)]">
                {p.step}
              </span>
              <h3 className="mt-6 font-syne text-xl font-bold text-fg">{p.title}</h3>
              <p className="mt-3 font-dm text-[15px] leading-relaxed text-fg-2">{p.desc}</p>
            </Reveal>
          ))}
        </ol>
        </div>

      </Container>
    </section>
  )
}
