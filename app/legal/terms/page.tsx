import type { Metadata } from 'next'
import LegalPage from '@/components/layout/LegalPage'
import { pageMetadata } from '@/lib/seo'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = pageMetadata({ title: 'Terms of Service', description: `Terms for using the ${siteConfig.name} website and services.`, path: '/legal/terms' })

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      updated="October 2026"
      sections={[
        { h: 'Using this website', p: 'Content on this website is provided for general information about our services. You may not misuse the site or attempt to disrupt it.' },
        { h: 'Project agreements', p: 'Each client project is governed by a written proposal or statement of work that sets out scope, price, timeline and ownership. That agreement takes priority over these terms.' },
        { h: 'Intellectual property', p: 'Unless agreed otherwise in writing, code and deliverables created for a client are transferred to the client on full payment.' },
        { h: 'Accounts', p: 'You are responsible for keeping your login details secure and for activity under your account.' },
        { h: 'Liability', p: 'The website is provided as is. To the extent permitted by law, we are not liable for indirect losses arising from its use.' },
        { h: 'Contact', p: `Questions about these terms can be sent to ${siteConfig.email}.` },
      ]}
    />
  )
}
