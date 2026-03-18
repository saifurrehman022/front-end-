import Hero from '@/components/sections/Hero'
import TrustStrip from '@/components/sections/TrustStrip'
import FeaturesGrid from '@/components/sections/FeaturesGrid'
import ServicesTabs from '@/components/sections/ServicesTabs'
import StatsCounter from '@/components/sections/StatsCounter'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import TeamSlider from '@/components/sections/TeamSlider'
import CTASection from '@/components/sections/CTASection'

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <FeaturesGrid />
      <ServicesTabs />
      <StatsCounter />
      <TestimonialsSection />
      <TeamSlider />
      <CTASection />
    </>
  )
}
