import Link from 'next/link'
import { ArrowUpRight, Clock3 } from 'lucide-react'
import { videos } from '@/lib/media'
import { readingTime, type Post } from '@/lib/blog'

export const fmtDate = (d: string) => new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })

export default function PostCard({ p }: { p: Post }) {
  return (
    <Link href={`/blog/${p.slug}`} className="glass group flex h-full flex-col overflow-hidden rounded-3xl transition-colors hover:border-gold/40">
      <div className="relative aspect-[16/9] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={videos[p.cover].poster} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <span className="absolute left-4 top-4 rounded-full bg-ink/75 px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.14em] text-gold backdrop-blur">{p.category}</span>
      </div>
      <div className="flex flex-1 flex-col p-7">
        <div className="flex items-center gap-3 font-dm text-xs text-fg-3">
          <time dateTime={p.date}>{fmtDate(p.date)}</time>
          <span className="h-1 w-1 rounded-full bg-fg-3" />
          <span className="flex items-center gap-1"><Clock3 size={12} /> {readingTime(p)} min read</span>
        </div>
        <h3 className="mt-3 flex-1 font-syne text-lg font-bold leading-snug text-fg">{p.title}</h3>
        <span className="mt-5 inline-flex items-center gap-1.5 font-dm text-sm font-semibold text-gold">
          Read article <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  )
}
