import { ImageResponse } from 'next/og'
import { siteConfig } from '@/lib/site'

export const alt = `${siteConfig.name} — AI development agency`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          padding: 72, background: '#07080B', color: '#F3F1EA', fontFamily: 'sans-serif',
          backgroundImage:
            'radial-gradient(circle at 82% 38%, rgba(232,180,74,0.45), transparent 38%), radial-gradient(circle at 90% 70%, rgba(110,231,249,0.25), transparent 35%)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 30, fontWeight: 700 }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, border: '2px solid #E8B44A', color: '#E8B44A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>E</div>
          {siteConfig.name}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.02, letterSpacing: -2, maxWidth: 900 }}>
            Production AI, engineered end to end.
          </div>
          <div style={{ fontSize: 30, color: '#A9ADB6' }}>RAG chatbots · AI agents · GPU deployment · AI SaaS</div>
        </div>
      </div>
    ),
    size,
  )
}
