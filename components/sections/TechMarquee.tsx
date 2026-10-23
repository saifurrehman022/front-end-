import { techStack } from '@/lib/content'

export default function TechMarquee() {
  const items = [...techStack, ...techStack]
  return (
    <section aria-label="Technology we work with" className="relative border-y border-line bg-ink-2/60 py-6">
      <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
        <ul className="animate-marquee flex w-max gap-10 hover:[animation-play-state:paused]">
          {items.map((t, i) => (
            <li key={i} aria-hidden={i >= techStack.length} className="flex items-center gap-10 whitespace-nowrap font-mono text-sm text-fg-3">
              {t}
              <span className="h-1 w-1 rounded-full bg-gold/50" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
