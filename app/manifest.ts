import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#07080B',
    theme_color: '#07080B',
    icons: [{ src: '/icon', sizes: '64x64', type: 'image/png' }],
  }
}
