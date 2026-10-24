import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Container from '@/components/layout/Container'
import { Reveal } from '@/components/motion/Motion'
import SectionHeading from './SectionHeading'
import PostCard from './PostCard'
import { posts } from '@/lib/blog'

export default function BlogPreview() {
  return (
    <section className="section border-t border-line">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading eyebrow="Insights" title="Guides from" accent="the workbench." sub="Practical articles on AI, robotics and IoT, written by the engineers who build them." />
          <Link href="/blog" className="btn-ghost shrink-0">All articles <ArrowRight size={15} /></Link>
        </div>
        <ul className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {posts.slice(0, 3).map((p, i) => (
            <Reveal as="li" key={p.slug} delay={i * 0.08}>
              <PostCard p={p} />
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  )
}
