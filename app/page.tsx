import type { Metadata } from 'next'
import Hero from '@/components/sections/Hero'
import TechMarquee from '@/components/sections/TechMarquee'
import StatsBar from '@/components/sections/StatsBar'
import ShowreelSection from '@/components/sections/ShowreelSection'
import ServicesGrid from '@/components/sections/ServicesGrid'
import RoboticsSection from '@/components/sections/RoboticsSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import WhyUsSection from '@/components/sections/WhyUsSection'
import ProcessSection from '@/components/sections/ProcessSection'
import BlogPreview from '@/components/sections/BlogPreview'
import FaqSection from '@/components/sections/FaqSection'
import CTASection from '@/components/sections/CTASection'
import { homeFaqs } from '@/lib/content'
import { pageMetadata } from '@/lib/seo'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = {
  ...pageMetadata({ title: siteConfig.title, description: siteConfig.description, path: '/' }),
  title: { absolute: siteConfig.title },
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <TechMarquee />
      <StatsBar />
      <ShowreelSection />
      <ServicesGrid />
      <RoboticsSection />
      <ProjectsSection />
      <WhyUsSection />
      <ProcessSection />
      <BlogPreview />
      <FaqSection faqs={homeFaqs} />
      <CTASection />
    </>
  )
}
