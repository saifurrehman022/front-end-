import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Clock3 } from 'lucide-react'
import Container from '@/components/layout/Container'
import PageHeader from '@/components/layout/PageHeader'
import PostCard, { fmtDate } from '@/components/sections/PostCard'
import CTASection from '@/components/sections/CTASection'
import JsonLd from '@/components/seo/JsonLd'
import { Reveal } from '@/components/motion/Motion'
import { videos } from '@/lib/media'
import { posts, readingTime } from '@/lib/blog'
import { breadcrumbSchema, itemListSchema, pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Blog — AI, Robotics, Raspberry Pi, Arduino & ESP32 Guides',
  description:
    'Practical guides on AI development, RAG, GPU deployment, robotics, Raspberry Pi, Arduino and ESP32 IoT, written by engineers who build these systems for clients.',
  path: '/blog',
})

export default function BlogPage() {
  const [first, ...rest] = posts
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog' }]),
          itemListSchema('Articles', posts.map(p => ({ name: p.title, path: `/blog/${p.slug}` }))),
        ]}
      />
      <PageHeader
        eyebrow="Blog"
        title="Guides from"
        accent="the workbench."
        sub="Practical articles on AI, robotics and IoT: architecture, trade-offs and lessons from real builds."
        crumbs={[{ name: 'Home', href: '/' }, { name: 'Blog' }]}
      />
      <section className="section">
        <Container>
          <Reveal>
            <Link href={`/blog/${first.slug}`} className="glass group grid grid-cols-1 overflow-hidden rounded-[28px] transition-colors hover:border-gold/40 lg:grid-cols-2">
              <div className="relative aspect-video overflow-hidden lg:aspect-auto">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={videos[first.cover].poster} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="flex flex-col justify-center p-8 sm:p-12">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold">Latest · {first.category}</p>
                <h2 className="mt-4 font-syne text-[clamp(24px,3vw,36px)] font-bold leading-tight text-fg">{first.title}</h2>
                <p className="mt-4 font-dm text-[16px] leading-relaxed text-fg-2">{first.description}</p>
                <div className="mt-6 flex items-center gap-3 font-dm text-sm text-fg-3">
                  <time dateTime={first.date}>{fmtDate(first.date)}</time>
                  <span className="h-1 w-1 rounded-full bg-fg-3" />
                  <span className="flex items-center gap-1"><Clock3 size={13} /> {readingTime(first)} min read</span>
                </div>
                <span className="mt-8 inline-flex items-center gap-2 font-dm text-sm font-semibold text-gold">Read article <ArrowRight size={15} /></span>
              </div>
            </Link>
          </Reveal>
          <ul className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((p, i) => (
              <Reveal as="li" key={p.slug} delay={(i % 3) * 0.06}>
                <PostCard p={p} />
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>
      <CTASection />
    </>
  )
}
