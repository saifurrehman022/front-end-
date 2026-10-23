import type { Metadata } from 'next'
import { Mail, Clock, Globe2, CalendarCheck } from 'lucide-react'
import Container from '@/components/layout/Container'
import ContactForm from '@/components/sections/ContactForm'
import JsonLd from '@/components/seo/JsonLd'
import { Reveal } from '@/components/motion/Motion'
import { breadcrumbSchema, pageMetadata } from '@/lib/seo'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  title: 'Contact — Get a Free AI Project Quote',
  description:
    'Tell us about your AI project. Book a free discovery call and get a fixed quote for RAG chatbots, AI agents, GPU deployment, ComfyUI pipelines or an AI SaaS MVP.',
  path: '/contact',
})

const info = [
  { icon: Mail, label: 'Email', value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { icon: Clock, label: 'Response time', value: siteConfig.responseTime },
  { icon: Globe2, label: 'Location', value: siteConfig.location },
  { icon: CalendarCheck, label: 'First step', value: 'Free 30-minute discovery call' },
]

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact' }])} />
      <section className="relative overflow-hidden pb-24 pt-40">
        <div aria-hidden className="grid-bg absolute inset-0 -z-10" />
        <div aria-hidden className="absolute right-0 top-40 -z-10 h-[500px] w-[500px] rounded-full bg-gold/10 blur-[140px]" />
        <Container>
          <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-[1fr_1.15fr]">
            <Reveal>
              <p className="eyebrow mb-5">Contact</p>
              <h1 className="h-display text-[clamp(40px,6vw,72px)] leading-[1.0]">
                Let&apos;s build <span className="text-gradient">something remarkable.</span>
              </h1>
              <p className="mt-6 max-w-md font-dm text-lg leading-relaxed text-fg-2">
                Share a few details about your project. We reply within one business day with questions, ideas and next steps.
              </p>
              <ul className="mt-12 flex flex-col gap-5">
                {info.map(i => (
                  <li key={i.label} className="flex items-center gap-4">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl border border-line-2 text-gold">
                      <i.icon size={18} />
                    </span>
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-3">{i.label}</p>
                      {i.href ? (
                        <a href={i.href} className="font-dm text-[15px] font-medium text-fg hover:text-gold">{i.value}</a>
                      ) : (
                        <p className="font-dm text-[15px] font-medium text-fg">{i.value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.1}>
              <ContactForm />
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  )
}
