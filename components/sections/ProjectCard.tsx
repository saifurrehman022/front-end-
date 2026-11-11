import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import ProjectCover from '@/components/projects/ProjectCover'
import type { Project } from '@/lib/projects'

export default function ProjectCard({ p }: { p: Project }) {
  return (
    <Link
      href={`/projects/${p.slug}`}
      className="glass group flex h-full flex-col overflow-hidden rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-[var(--shadow-lg)]"
    >
      <ProjectCover p={p} className="aspect-[16/10] w-full" />
      <div className="flex flex-1 flex-col p-7">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-gold">{p.tag}</p>
        <h3 className="mt-3 font-syne text-[19px] font-bold leading-snug text-fg">{p.title}</h3>
        {p.client && <p className="mt-1 font-dm text-[13px] font-medium text-fg-3">{p.client}</p>}
        <p className="mt-3 line-clamp-3 flex-1 font-dm text-[14.5px] leading-relaxed text-fg-2">{p.summary}</p>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {p.stack.slice(0, 4).map(t => (
            <span key={t} className="rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-fg-2">{t}</span>
          ))}
        </div>
        <span className="mt-6 inline-flex items-center gap-1.5 border-t border-line pt-5 font-dm text-sm font-semibold text-fg transition-colors group-hover:text-gold">
          Read case study <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  )
}
