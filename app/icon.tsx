import { ImageResponse } from 'next/og'

export const size = { width: 64, height: 64 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: '#07080B', borderRadius: 16, border: '2px solid #E8B44A',
          color: '#E8B44A', fontSize: 40, fontWeight: 800, fontFamily: 'sans-serif',
        }}
      >
        E
      </div>
    ),
    size,
  )
}
