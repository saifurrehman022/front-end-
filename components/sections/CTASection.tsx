import Link from 'next/link'
import { ArrowRight, Mail } from 'lucide-react'
import Container from '@/components/layout/Container'
import { Reveal } from '@/components/motion/Motion'
import { LoopVideo } from '@/components/media/Video'
import { videos } from '@/lib/media'
import { siteConfig } from '@/lib/site'

export default function CTASection() {
  return (
    <section className="py-24">
      <Container>
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-[32px] border border-gold/30 px-6 py-16 text-center sm:px-12 sm:py-24">
            <LoopVideo src={videos.ai} className="absolute inset-0 -z-20 h-full w-full object-cover opacity-50" />
            <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(80%_120%_at_50%_0%,rgba(232,180,74,0.22),transparent_60%),linear-gradient(to_bottom,rgba(7,8,11,0.55),rgba(7,8,11,0.85))]" />
            <p className="eyebrow mb-5 justify-center">Start a project</p>
            <h2 className="h-display mx-auto max-w-3xl text-[clamp(34px,5.5vw,64px)] leading-[1.02]">
              Have an idea? <span className="text-gradient">Let&apos;s build it together.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl font-dm text-[17px] leading-relaxed text-fg-2">
              AI software, a robot or a fleet of IoT devices: tell us what you want to build and get a clear plan and fixed quote within days.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/contact" className="btn-primary group">
                Get a free quote <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
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
