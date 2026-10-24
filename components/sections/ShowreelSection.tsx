import Container from '@/components/layout/Container'
import { Reveal } from '@/components/motion/Motion'
import { ShowcasePlayer } from '@/components/media/Video'
import JsonLd from '@/components/seo/JsonLd'
import { videos, SHOWREEL_DATE, SHOWREEL_DURATION } from '@/lib/media'
import { videoSchema } from '@/lib/seo'
import { siteConfig } from '@/lib/site'

export default function ShowreelSection() {
  return (
    <section id="showreel" className="section scroll-mt-28">
      <JsonLd
        data={videoSchema({
          name: `${siteConfig.name} showreel`,
          description: 'What we build: AI systems, robotics and IoT devices, from software that thinks to machines that move and devices that connect.',
          poster: videos.showreel.poster,
          src: videos.showreel.mp4,
          date: SHOWREEL_DATE,
          duration: SHOWREEL_DURATION,
          path: '/#showreel',
        })}
      />
      <Container>
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal className="max-w-2xl">
            <p className="eyebrow mb-5">Showreel</p>
            <h2 className="h-display text-[clamp(34px,5vw,60px)] leading-[1.02]">
              Software that thinks. <span className="text-gradient">Machines that move.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="max-w-sm">
            <p className="font-dm text-[16px] leading-relaxed text-fg-2">
              A 16-second look at the three things we build: AI systems, robots and connected IoT devices.
            </p>
          </Reveal>
        </div>
        <Reveal>
          <div className="relative rounded-[28px] bg-gradient-to-br from-gold/40 via-white/10 to-cyan/30 p-px shadow-[0_40px_120px_-30px_rgba(232,180,74,0.35)]">
            <ShowcasePlayer src={videos.showreel} title={`${siteConfig.name} showreel`} className="aspect-video rounded-[27px] bg-ink-3" />
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
