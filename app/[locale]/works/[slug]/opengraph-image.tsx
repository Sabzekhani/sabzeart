import { ImageResponse } from 'next/og'
import { getArtworkBySlug } from '@/lib/artworks'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OGImage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const work = getArtworkBySlug(slug)

  if (!work) {
    return new ImageResponse(
      <div
        style={{
          width: '100%', height: '100%',
          background: '#1A1612',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <span style={{ color: '#C9A84C', fontSize: 48, fontFamily: 'serif' }}>SABZE</span>
      </div>
    )
  }

  return new ImageResponse(
    <div
      style={{
        width: '100%', height: '100%',
        background: '#1A1612',
        display: 'flex', flexDirection: 'row',
      }}
    >
      {/* Left: artwork image placeholder with gradient */}
      <div
        style={{
          width: '55%', height: '100%',
          background: 'linear-gradient(135deg, #8C7E72 0%, #C9A84C 45%, #3D3530 100%)',
          display: 'flex',
        }}
      />

      {/* Right: metadata panel */}
      <div
        style={{
          width: '45%', height: '100%',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          padding: '48px 44px',
          background: '#1A1612',
          borderLeft: '1px solid rgba(201,168,76,0.2)',
        }}
      >
        {/* Brand */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ fontSize: 28, fontFamily: 'serif', letterSpacing: '0.2em', display: 'flex' }}>
            <span style={{ color: '#5A7A5C' }}>S</span>
            <span style={{ color: '#C9A84C' }}>ABZ</span>
            <span style={{ color: '#FAF7F2' }}>E</span>
          </div>
          <span style={{ fontSize: 10, fontFamily: 'sans-serif', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(196,184,173,0.5)' }}>
            The Hague · Fine Art
          </span>
        </div>

        {/* Work info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ width: 40, height: 1, background: '#C9A84C' }} />
          <div style={{ fontSize: 32, fontFamily: 'serif', fontStyle: 'italic', color: '#FAF7F2', lineHeight: 1.2 }}>
            {work.title}
          </div>
          <div style={{ fontSize: 13, fontFamily: 'sans-serif', letterSpacing: '0.15em', color: 'rgba(196,184,173,0.6)', textTransform: 'uppercase' }}>
            {work.year} · {work.medium}
          </div>
          <div style={{ fontSize: 13, fontFamily: 'sans-serif', letterSpacing: '0.15em', color: 'rgba(196,184,173,0.5)', textTransform: 'uppercase' }}>
            {work.dimensions}
          </div>
          <div style={{ display: 'flex' }}>
            {work.available ? (
              <span style={{ fontSize: 10, fontFamily: 'sans-serif', letterSpacing: '0.15em', textTransform: 'uppercase', background: 'rgba(90,122,92,0.8)', color: '#E8F0E6', padding: '4px 10px' }}>
                Available
              </span>
            ) : (
              <span style={{ fontSize: 10, fontFamily: 'sans-serif', letterSpacing: '0.15em', textTransform: 'uppercase', background: 'rgba(26,22,18,0.7)', color: '#E8D5A0', padding: '4px 10px' }}>
                Sold
              </span>
            )}
          </div>
        </div>

        {/* Footer */}
        <div style={{ fontSize: 11, fontFamily: 'sans-serif', letterSpacing: '0.1em', color: 'rgba(196,184,173,0.3)' }}>
          sabze.nl
        </div>
      </div>
    </div>,
    { ...size }
  )
}
