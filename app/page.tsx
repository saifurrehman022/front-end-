import type { Metadata } from 'next'
import Hero from '@/components/sections/Hero'
import TechMarquee from '@/components/sections/TechMarquee'
import ServicesGrid from '@/components/sections/ServicesGrid'
import WorkSection from '@/components/sections/WorkSection'
import ProcessSection from '@/components/sections/ProcessSection'
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
      <ServicesGrid />
      <WorkSection />
      <ProcessSection />
      <FaqSection faqs={homeFaqs} />
      <CTASection />
    </>
  )
}
