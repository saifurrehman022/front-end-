import { Reveal } from '@/components/motion/Motion'

export default function SectionHeading({
  eyebrow,
  title,
  accent,
  sub,
  center = false,
  as = 'h2',
}: {
  eyebrow: string
  title: string
  accent?: string
  sub?: string
  center?: boolean
  as?: 'h1' | 'h2'
}) {
  const H = as
  return (
    <Reveal className={center ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <p className="eyebrow mb-5">{eyebrow}</p>
      <H className="h-display text-[clamp(34px,5vw,60px)] leading-[1.02]">
        {title} {accent && <span className="text-gradient">{accent}</span>}
      </H>
      {sub && <p className={`mt-5 font-dm text-[17px] leading-relaxed text-fg-2 ${center ? 'mx-auto max-w-2xl' : 'max-w-2xl'}`}>{sub}</p>}
    </Reveal>
  )
}
