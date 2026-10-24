import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { LoopVideo } from '@/components/media/Video'
import { videos } from '@/lib/media'
import type { Project } from '@/lib/projects'

export default function ProjectCard({ p }: { p: Project }) {
  return (
    <Link href={`/projects/${p.slug}`} className="glass group flex h-full flex-col overflow-hidden rounded-3xl transition-colors duration-300 hover:border-gold/40">
      <div className="relative overflow-hidden">
        <LoopVideo src={videos[p.video]} hoverPlay className="aspect-[16/9] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <span className="absolute left-4 top-4 rounded-full bg-ink/75 px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.14em] text-gold backdrop-blur">{p.tag}</span>
        <span className="absolute bottom-4 right-4 grid h-10 w-10 translate-y-2 place-items-center rounded-full bg-gold text-ink opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight size={18} />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-7">
        <h3 className="font-syne text-xl font-bold leading-snug text-fg">{p.title}</h3>
        <p className="mt-3 flex-1 font-dm text-[15px] leading-relaxed text-fg-2">{p.summary}</p>
        <div className="mt-6 flex flex-wrap gap-1.5">
          {p.stack.slice(0, 4).map(t => (
            <span key={t} className="rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-fg-2">{t}</span>
          ))}
        </div>
      </div>
    </Link>
  )
}
