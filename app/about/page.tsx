import type { Metadata } from 'next'
import { Target, Eye, Gauge, ShieldCheck } from 'lucide-react'
import Container from '@/components/layout/Container'
import PageHeader from '@/components/layout/PageHeader'
import StatsBar from '@/components/sections/StatsBar'
import RoboticsSection from '@/components/sections/RoboticsSection'
import SectionHeading from '@/components/sections/SectionHeading'
import CTASection from '@/components/sections/CTASection'
import JsonLd from '@/components/seo/JsonLd'
import { Reveal, TiltCard } from '@/components/motion/Motion'
import { breadcrumbSchema, pageMetadata } from '@/lib/seo'
import { team, techStack } from '@/lib/content'

export const metadata: Metadata = pageMetadata({
  title: 'About EchoLoft AI — AI, Robotics & IoT Engineers',
  description:
    'EchoLoft AI is a senior team of AI and embedded engineers. We build RAG systems, AI agents, GPU model APIs and AI SaaS, plus robots and IoT devices with Raspberry Pi, Arduino and ESP32.',
  path: '/about',
})

const values = [
  { icon: Target, title: 'Outcomes over demos', desc: 'We judge success by what runs in production and what it does for your business, not by a slick prototype.' },
  { icon: Eye, title: 'Radical transparency', desc: 'Fixed scopes, weekly demos and honest advice, including when AI is not the right answer.' },
  { icon: Gauge, title: 'Built to be fast & lean', desc: 'Low latency, sensible GPU spend and architectures that scale from zero to real traffic.' },
  { icon: ShieldCheck, title: 'Secure by default', desc: 'Proper auth, least-privilege access and your data kept in your own infrastructure wherever possible.' },
]

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'About', path: '/about' }])} />
      <PageHeader
        eyebrow="About us"
        title="Engineers who build"
        accent="software and machines."
        sub="EchoLoft AI started from a simple frustration: too many projects stall between a promising demo and something people can actually use. We close that gap, from GPU infrastructure and AI models to firmware, robots and the apps your users touch."
        crumbs={[{ name: 'Home', href: '/' }, { name: 'About' }]}
        video="robot"
      />
      <StatsBar />
      <section className="section border-t border-line">
        <Container>
          <SectionHeading eyebrow="What we value" title="Principles behind" accent="every build." />
          <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <TiltCard className="rounded-3xl">
                  <div className="glass h-full rounded-3xl p-7">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gold/10 text-gold">
                      <v.icon size={20} strokeWidth={1.8} />
                    </span>
                    <h3 className="mt-6 font-syne text-lg font-bold text-fg">{v.title}</h3>
                    <p className="mt-3 font-dm text-[15px] leading-relaxed text-fg-2">{v.desc}</p>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="section border-t border-line">
        <Container>
          <SectionHeading eyebrow="The team" title="Senior people," accent="hands on the code." />
          <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
            {team.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.1}>
                <article className="glass flex h-full gap-6 rounded-3xl p-8">
                  <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-gold to-gold-3 font-syne text-xl font-extrabold text-ink">
                    {m.initials}
                  </span>
                  <div>
                    <h3 className="font-syne text-xl font-bold text-fg">{m.name}</h3>
                    <p className="mt-1 font-mono text-xs uppercase tracking-[0.14em] text-gold">{m.role}</p>
                    <p className="mt-4 font-dm text-[15px] leading-relaxed text-fg-2">{m.bio}</p>
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {m.tags.map(t => (
                        <span key={t} className="rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-fg-2">{t}</span>
                      ))}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="section border-t border-line">
        <Container>
          <SectionHeading eyebrow="Our stack" title="Tools we use" accent="every day." center />
          <Reveal className="mx-auto mt-12 flex max-w-4xl flex-wrap justify-center gap-2.5">
            {techStack.map(t => (
              <span key={t} className="glass rounded-full px-4 py-2 font-mono text-sm text-fg-2">{t}</span>
            ))}
          </Reveal>
        </Container>
      </section>

      <RoboticsSection />
      <CTASection />
    </>
  )
}
