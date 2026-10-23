import Link from 'next/link'
import { ArrowRight, Mail } from 'lucide-react'
import Container from '@/components/layout/Container'
import { Reveal } from '@/components/motion/Motion'
import { siteConfig } from '@/lib/site'

export default function CTASection() {
  return (
    <section className="py-24">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] border border-gold/30 px-6 py-16 text-center sm:px-12 sm:py-20">
            <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(80%_120%_at_50%_0%,rgba(232,180,74,0.22),transparent_60%),radial-gradient(60%_80%_at_80%_100%,rgba(110,231,249,0.12),transparent_60%)]" />
            <div aria-hidden className="grid-bg absolute inset-0 -z-10 opacity-60" />
            <p className="eyebrow mb-5 justify-center">Start a project</p>
            <h2 className="h-display mx-auto max-w-3xl text-[clamp(34px,5.5vw,64px)] leading-[1.02]">
              Have an AI idea? <span className="text-gradient">Let&apos;s make it real.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl font-dm text-[17px] leading-relaxed text-fg-2">
              Tell us what you want to build. You get a clear plan and a fixed quote within days, not weeks.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/contact" className="btn-primary group">
                Book a free discovery call <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <a href={`mailto:${siteConfig.email}`} className="btn-ghost">
                <Mail size={16} /> {siteConfig.email}
              </a>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
