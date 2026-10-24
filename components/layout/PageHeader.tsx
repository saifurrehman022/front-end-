import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import Container from './Container'
import { Reveal } from '@/components/motion/Motion'
import { LoopVideo } from '@/components/media/Video'
import { videos } from '@/lib/media'

export default function PageHeader({
  eyebrow,
  title,
  accent,
  sub,
  crumbs,
  video,
  children,
}: {
  eyebrow: string
  title: string
  accent?: string
  sub?: string
  crumbs: { name: string; href?: string }[]
  video?: keyof typeof videos
  children?: React.ReactNode
}) {
  return (
    <section className="relative isolate overflow-hidden border-b border-line pb-20 pt-36 lg:pt-48">
      {video && (
        <>
          <LoopVideo src={videos[video]} className="absolute inset-0 -z-20 h-full w-full object-cover opacity-45" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/85 to-ink/30" />
        </>
      )}
      <div aria-hidden className="grid-bg absolute inset-0 -z-10" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-ink to-transparent" />
      <Container>
        <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-1.5 font-dm text-sm text-fg-3">
          {crumbs.map((c, i) => (
            <span key={c.name} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight size={14} />}
              {c.href ? <Link href={c.href} className="hover:text-fg">{c.name}</Link> : <span className="text-fg-2" aria-current="page">{c.name}</span>}
            </span>
          ))}
        </nav>
        <Reveal className="max-w-4xl">
          <p className="eyebrow mb-5">{eyebrow}</p>
          <h1 className="h-display text-[clamp(38px,6vw,76px)] leading-[1.0]">
            {title} {accent && <span className="text-gradient">{accent}</span>}
          </h1>
          {sub && <p className="mt-6 max-w-2xl font-dm text-lg leading-relaxed text-fg-2">{sub}</p>}
          {children}
        </Reveal>
      </Container>
    </section>
  )
}
