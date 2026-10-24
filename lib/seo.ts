import type { Metadata } from 'next'
import { siteConfig, absoluteUrl } from './site'
import { services } from './services'

interface PageSeo {
  title: string
  description: string
  path: string
  keywords?: string[]
  noIndex?: boolean
  image?: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
}

/** Per-page metadata with canonical URL, Open Graph and Twitter cards. */
export function pageMetadata({ title, description, path, keywords, noIndex, image, type = 'website', publishedTime, modifiedTime }: PageSeo): Metadata {
  const url = absoluteUrl(path)
  const img = image ?? '/opengraph-image'
  return {
    title,
    description,
    keywords: keywords ? [...keywords, ...siteConfig.keywords.slice(0, 4)] : siteConfig.keywords,
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: siteConfig.name,
      locale: 'en_US',
      images: [{ url: img, width: 1200, height: 630, alt: title }],
      ...(type === 'article' ? { publishedTime, modifiedTime, authors: [siteConfig.name] } : {}),
    },
    twitter: { card: 'summary_large_image', title, description, images: [img] },
    robots: noIndex ? { index: false, follow: false } : undefined,
  }
}

const orgId = () => `${siteConfig.url}/#organization`

export const organizationSchema = () => {
  const a = siteConfig.address
  const hasAddress = a.city || a.country
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': orgId(),
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl('/icon'),
    image: absoluteUrl('/opengraph-image'),
    description: siteConfig.description,
    slogan: siteConfig.tagline,
    email: siteConfig.email,
    ...(siteConfig.phone ? { telephone: siteConfig.phone } : {}),
    ...(hasAddress
      ? { address: { '@type': 'PostalAddress', addressLocality: a.city, addressRegion: a.region, addressCountry: a.country } }
      : {}),
    areaServed: 'Worldwide',
    priceRange: '$$',
    knowsAbout: [
      'Artificial intelligence', 'Retrieval-augmented generation', 'AI agents', 'Large language models', 'GPU inference',
      'Generative video', 'Robotics', 'Internet of Things', 'Embedded systems', 'Raspberry Pi', 'Arduino', 'ESP32',
      'Computer vision', 'MQTT', 'SaaS development',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Services',
      itemListElement: services.map(s => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.name, url: absoluteUrl(`/services/${s.slug}`) },
      })),
    },
    sameAs: Object.values(siteConfig.socials).filter(Boolean),
  }
}

export const websiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteConfig.url}/#website`,
  url: siteConfig.url,
  name: siteConfig.name,
  description: siteConfig.description,
  inLanguage: 'en',
  publisher: { '@id': orgId() },
})

export const faqSchema = (faqs: { q: string; a: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
})

export const breadcrumbSchema = (items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: absoluteUrl(it.path) })),
})

export const serviceSchema = (s: { name: string; description: string; path: string; category?: string }) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: s.name,
  serviceType: s.name,
  category: s.category,
  description: s.description,
  url: absoluteUrl(s.path),
  provider: { '@id': orgId() },
  areaServed: 'Worldwide',
})

export const articleSchema = (a: { title: string; description: string; path: string; date: string; updated?: string; image: string; tags: string[] }) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: a.title,
  description: a.description,
  url: absoluteUrl(a.path),
  mainEntityOfPage: absoluteUrl(a.path),
  datePublished: a.date,
  dateModified: a.updated ?? a.date,
  image: absoluteUrl(a.image),
  keywords: a.tags.join(', '),
  author: { '@type': 'Person', name: 'Saif-Ur-Rehman', url: absoluteUrl('/about') },
  publisher: { '@id': orgId() },
})

export const videoSchema = (v: { name: string; description: string; poster: string; src: string; date: string; duration: string; path: string }) => ({
  '@context': 'https://schema.org',
  '@type': 'VideoObject',
  name: v.name,
  description: v.description,
  thumbnailUrl: [absoluteUrl(v.poster)],
  contentUrl: absoluteUrl(v.src),
  embedUrl: absoluteUrl(v.path),
  uploadDate: v.date,
  duration: v.duration,
  publisher: { '@id': orgId() },
})

export const itemListSchema = (name: string, items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name,
  itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, url: absoluteUrl(it.path) })),
})
