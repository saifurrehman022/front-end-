import type { Metadata } from 'next'
import LegalPage from '@/components/layout/LegalPage'
import { pageMetadata } from '@/lib/seo'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = pageMetadata({ title: 'Privacy Policy', description: `How ${siteConfig.name} collects and uses personal data.`, path: '/legal/privacy' })

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="October 2026"
      sections={[
        { h: 'What we collect', p: 'When you contact us we collect the details you provide, such as your name, email address, company and project description. If you create an account we store your username, email and company.' },
        { h: 'How we use it', p: 'We use your information only to reply to enquiries, provide our services and manage your account. We do not sell your personal data.' },
        { h: 'Project data', p: 'Data you share for a project is used only for that project, kept confidential and returned or deleted at the end of the engagement on request.' },
        { h: 'Service providers', p: 'We use trusted providers for hosting, email and form handling. They process data on our behalf and only as needed to provide their service.' },
        { h: 'Your rights', p: `You can ask to access, correct or delete your personal data at any time by emailing ${siteConfig.email}.` },
        { h: 'Contact', p: `Questions about this policy can be sent to ${siteConfig.email}.` },
      ]}
    />
  )
}
