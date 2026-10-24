import type { Metadata } from 'next'
import Container from '@/components/layout/Container'
import PageHeader from '@/components/layout/PageHeader'
import ProjectCard from '@/components/sections/ProjectCard'
import CTASection from '@/components/sections/CTASection'
import JsonLd from '@/components/seo/JsonLd'
import { Reveal } from '@/components/motion/Motion'
import { projects } from '@/lib/projects'
import { categories, type ServiceCategory } from '@/lib/services'
import { breadcrumbSchema, itemListSchema, pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Projects & Case Studies — AI, Robotics and IoT',
  description:
    'Case studies of AI systems, robots and IoT devices we have built: GPU video pipelines, face swap APIs, RAG chat, ESP32 sensor networks, Raspberry Pi vision robots and Arduino automation.',
  path: '/projects',
})

export default function ProjectsPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Projects', path: '/projects' }]),
          itemListSchema('Projects', projects.map(p => ({ name: p.title, path: `/projects/${p.slug}` }))),
        ]}
      />
      <PageHeader
        eyebrow="Projects"
        title="Work that"
        accent="runs in the real world."
        sub="AI pipelines, products and smart machines we have designed, built and shipped. Each case study covers the problem, the approach and the result."
        crumbs={[{ name: 'Home', href: '/' }, { name: 'Projects' }]}
        video="robot"
      />
      {(Object.keys(categories) as ServiceCategory[]).map((c, ci) => (
        <section key={c} id={c} className={`section ${ci ? 'border-t border-line' : ''}`}>
          <Container>
            <p className="eyebrow mb-5">{categories[c].label}</p>
            <h2 className="h-display text-[clamp(28px,3.6vw,44px)]">{c === 'ai' ? 'AI & software projects' : 'Robotics & IoT projects'}</h2>
            <ul className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {projects.filter(p => p.category === c).map((p, i) => (
                <Reveal as="li" key={p.slug} delay={(i % 3) * 0.06}>
                  <ProjectCard p={p} />
                </Reveal>
              ))}
            </ul>
          </Container>
        </section>
      ))}
      <CTASection />
    </>
  )
}
