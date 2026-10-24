import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Container from '@/components/layout/Container'
import { Reveal } from '@/components/motion/Motion'
import SectionHeading from './SectionHeading'
import ProjectCard from './ProjectCard'
import { projects } from '@/lib/projects'

export default function ProjectsSection() {
  const featured = [projects[0], projects[5], projects[4]]
  return (
    <section id="work" className="section scroll-mt-28">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-gold/[0.06] blur-[120px]" />
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading eyebrow="Selected projects" title="Built, shipped" accent="and running." sub="A sample of AI systems, robots and IoT devices we have designed and delivered. Hover a card to play its preview." />
          <Link href="/projects" className="btn-ghost shrink-0">All projects <ArrowRight size={15} /></Link>
        </div>
        <ul className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={i * 0.08}>
              <ProjectCard p={p} />
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  )
}
