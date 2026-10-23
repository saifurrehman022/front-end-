import type { Metadata } from 'next'
import { siteConfig, absoluteUrl } from './site'

interface PageSeo {
  title: string
  description: string
  path: string
  keywords?: string[]
  noIndex?: boolean
}

/** Per-page metadata with canonical URL, Open Graph and Twitter cards. */
export function pageMetadata({ title, description, path, keywords, noIndex }: PageSeo): Metadata {
  const url = absoluteUrl(path)
  return {
    title,
    description,
    keywords: keywords ?? siteConfig.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      title,
      description,
      siteName: siteConfig.name,
      locale: 'en_US',
      images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: { card: 'summary_large_image', title, description, images: ['/twitter-image'] },
    robots: noIndex ? { index: false, follow: false } : undefined,
  }
}

export const organizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${siteConfig.url}/#organization`,
  name: siteConfig.name,
  url: siteConfig.url,
  logo: absoluteUrl('/icon'),
  image: absoluteUrl('/opengraph-image'),
  description: siteConfig.description,
  email: siteConfig.email,
  areaServed: 'Worldwide',
  knowsAbout: [
    'Retrieval-augmented generation',
    'AI agents',
    'Large language models',
    'GPU inference',
    'RunPod serverless',
    'ComfyUI',
    'Generative video',
    'SaaS development',
  ],
  sameAs: Object.values(siteConfig.socials).filter(Boolean),
})

export const websiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteConfig.url}/#website`,
  url: siteConfig.url,
  name: siteConfig.name,
  publisher: { '@id': `${siteConfig.url}/#organization` },
})

export const faqSchema = (faqs: { q: string; a: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
})

export const breadcrumbSchema = (items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: it.name,
    item: absoluteUrl(it.path),
  })),
})

export const serviceSchema = (s: { name: string; description: string; path: string }) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: s.name,
  description: s.description,
  url: absoluteUrl(s.path),
  provider: { '@id': `${siteConfig.url}/#organization` },
  areaServed: 'Worldwide',
})
