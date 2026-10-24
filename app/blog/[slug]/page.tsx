import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, Clock3, Lightbulb } from 'lucide-react'
import Container from '@/components/layout/Container'
import PageHeader from '@/components/layout/PageHeader'
import PostCard, { fmtDate } from '@/components/sections/PostCard'
import CTASection from '@/components/sections/CTASection'
import JsonLd from '@/components/seo/JsonLd'
import { videos } from '@/lib/media'
import { getPost, posts, readingTime, type Block } from '@/lib/blog'
import { getService } from '@/lib/services'
import { articleSchema, breadcrumbSchema, pageMetadata } from '@/lib/seo'

export const dynamicParams = false
export function generateStaticParams() {
  return posts.map(p => ({ slug: p.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getPost(params.slug)
  if (!p) return {}
  return pageMetadata({
    title: p.title,
    description: p.description,
    path: `/blog/${p.slug}`,
    keywords: p.tags,
    image: videos[p.cover].poster,
    type: 'article',
    publishedTime: p.date,
    modifiedTime: p.updated ?? p.date,
  })
}

const slugify = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

function Render({ b }: { b: Block }) {
  switch (b.type) {
    case 'h2': return <h2 id={slugify(b.text)} className="mt-12 scroll-mt-32 font-syne text-[26px] font-bold leading-tight text-fg">{b.text}</h2>
    case 'h3': return <h3 className="mt-8 font-syne text-xl font-bold text-fg">{b.text}</h3>
    case 'p': return <p className="mt-5 font-dm text-[17px] leading-[1.8] text-fg-2">{b.text}</p>
    case 'ul': return <ul className="mt-5 flex list-disc flex-col gap-2.5 pl-6 font-dm text-[17px] leading-[1.7] text-fg-2 marker:text-gold">{b.items.map(i => <li key={i}>{i}</li>)}</ul>
    case 'ol': return <ol className="mt-5 flex list-decimal flex-col gap-2.5 pl-6 font-dm text-[17px] leading-[1.7] text-fg-2 marker:text-gold">{b.items.map(i => <li key={i}>{i}</li>)}</ol>
    case 'code': return <pre className="mt-6 overflow-x-auto rounded-2xl border border-line bg-ink-3 p-5 font-mono text-[13.5px] leading-relaxed text-fg-2"><code>{b.code}</code></pre>
    case 'callout': return <div className="mt-8 flex gap-4 rounded-2xl border border-gold/30 bg-gold/[0.07] p-6 font-dm text-[16px] leading-relaxed text-fg"><Lightbulb size={20} className="mt-0.5 shrink-0 text-gold" />{b.text}</div>
  }
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const p = getPost(params.slug)
  if (!p) notFound()
  const path = `/blog/${p.slug}`
  const toc = p.body.filter((b): b is Extract<Block, { type: 'h2' }> => b.type === 'h2')
  const more = posts.filter(o => o.slug !== p.slug).sort((a, b) => Number(b.category === p.category) - Number(a.category === p.category)).slice(0, 3)

  return (
    <>
      <JsonLd
        data={[
          articleSchema({ title: p.title, description: p.description, path, date: p.date, updated: p.updated, image: videos[p.cover].poster, tags: p.tags }),
          breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog' }, { name: p.title, path }]),
        ]}
      />
      <PageHeader eyebrow={p.category} title={p.title} sub={p.description} crumbs={[{ name: 'Home', href: '/' }, { name: 'Blog', href: '/blog' }, { name: p.title }]}>
        <div className="mt-8 flex flex-wrap items-center gap-3 font-dm text-sm text-fg-3">
          <span className="font-semibold text-fg">By Saif-Ur-Rehman</span>
          <span className="h-1 w-1 rounded-full bg-fg-3" />
          <time dateTime={p.date}>{fmtDate(p.date)}</time>
          <span className="h-1 w-1 rounded-full bg-fg-3" />
          <span className="flex items-center gap-1"><Clock3 size={13} /> {readingTime(p)} min read</span>
        </div>
      </PageHeader>

      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[240px_1fr_240px]">
            <aside className="hidden lg:block">
              <nav aria-label="On this page" className="sticky top-36">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-3">On this page</p>
                <ul className="mt-4 flex flex-col gap-2.5 border-l border-line pl-4">
                  {toc.map(h => <li key={h.text}><a href={`#${slugify(h.text)}`} className="font-dm text-[13.5px] leading-snug text-fg-2 hover:text-gold">{h.text}</a></li>)}
                </ul>
              </nav>
            </aside>
            <article className="mx-auto w-full max-w-[720px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={videos[p.cover].poster} alt={p.title} className="mb-6 aspect-video w-full rounded-3xl border border-line object-cover" />
              {p.body.map((b, i) => <Render key={i} b={b} />)}
              <div className="mt-12 flex flex-wrap gap-2 border-t border-line pt-8">
                {p.tags.map(t => <span key={t} className="rounded-full border border-line-2 px-3 py-1.5 font-mono text-xs text-fg-2">#{t}</span>)}
              </div>
            </article>
            <aside className="lg:block">
              <div className="glass sticky top-36 rounded-3xl p-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold">Need help with this?</p>
                <ul className="mt-4 flex flex-col gap-2">
                  {p.relatedServices.map(slug => {
                    const s = getService(slug)
                    return s ? <li key={slug}><Link href={`/services/${slug}`} className="font-dm text-[15px] text-fg hover:text-gold">{s.name}</Link></li> : null
                  })}
                </ul>
                <Link href="/contact" className="btn-primary mt-6 w-full text-sm">Talk to an engineer <ArrowRight size={14} /></Link>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <section className="section border-t border-line">
        <Container>
          <p className="eyebrow mb-5">Keep reading</p>
          <ul className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {more.map(m => <li key={m.slug}><PostCard p={m} /></li>)}
          </ul>
        </Container>
      </section>
      <CTASection />
    </>
  )
}
