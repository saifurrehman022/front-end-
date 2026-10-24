import type { MetadataRoute } from 'next'
import { absoluteUrl } from '@/lib/site'
import { services } from '@/lib/services'
import { projects } from '@/lib/projects'
import { posts } from '@/lib/blog'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const pages: { path: string; priority: number; freq: 'weekly' | 'monthly' | 'yearly' }[] = [
    { path: '/', priority: 1, freq: 'weekly' },
    { path: '/services', priority: 0.9, freq: 'monthly' },
    { path: '/projects', priority: 0.8, freq: 'monthly' },
    { path: '/blog', priority: 0.8, freq: 'weekly' },
    { path: '/about', priority: 0.7, freq: 'monthly' },
    { path: '/contact', priority: 0.8, freq: 'yearly' },
    { path: '/legal/privacy', priority: 0.2, freq: 'yearly' },
    { path: '/legal/terms', priority: 0.2, freq: 'yearly' },
  ]
  return [
    ...pages.map(p => ({ url: absoluteUrl(p.path), lastModified: now, changeFrequency: p.freq, priority: p.priority })),
    ...services.map(s => ({ url: absoluteUrl(`/services/${s.slug}`), lastModified: now, changeFrequency: 'monthly' as const, priority: 0.85 })),
    ...projects.map(p => ({ url: absoluteUrl(`/projects/${p.slug}`), lastModified: new Date(p.date), changeFrequency: 'yearly' as const, priority: 0.6 })),
    ...posts.map(p => ({ url: absoluteUrl(`/blog/${p.slug}`), lastModified: new Date(p.updated ?? p.date), changeFrequency: 'monthly' as const, priority: 0.7 })),
  ]
}
