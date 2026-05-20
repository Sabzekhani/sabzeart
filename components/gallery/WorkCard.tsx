'use client'

import Link from 'next/link'
import { useState } from 'react'
import type { Artwork } from '@/types'
import ArtworkImage from './ArtworkImage'

interface WorkCardProps {
  artwork: Artwork
  locale: string
  availableLabel: string
  soldLabel: string
  sizes?: string
  priority?: boolean
  onClick?: () => void
  className?: string
}

export default function WorkCard({
  artwork,
  locale,
  availableLabel,
  soldLabel,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  priority = false,
  onClick,
  className = '',
}: WorkCardProps) {
  const [hovered, setHovered] = useState(false)

  const inner = (
    <div
      className={`group relative overflow-hidden cursor-pointer ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ display: 'block' }}
    >
      {/* Image */}
      <div
        style={{
          transform: hovered ? 'scale(1.04)' : 'scale(1)',
          transition: 'transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)',
          width: '100%',
          height: '100%',
        }}
      >
        <ArtworkImage
          artwork={artwork}
          fill
          priority={priority}
          sizes={sizes}
          style={{ filter: hovered ? 'saturate(1.05) brightness(1.02)' : 'saturate(0.92) brightness(0.98)', transition: 'filter 0.4s ease' }}
        />
      </div>

      {/* Availability badge */}
      <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', zIndex: 10 }}>
        {artwork.available
          ? <span className="badge-available">{availableLabel}</span>
          : <span className="badge-sold">{soldLabel}</span>
        }
      </div>

      {/* Hover overlay */}
      <div
        style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(26,22,18,0.88) 0%, rgba(26,22,18,0) 55%)',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}
      />

      {/* Work info — slides up on hover */}
      <div
        style={{
          position: 'absolute', inset: '0 0 0 0', bottom: 0, left: 0, right: 0,
          padding: '1.25rem',
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translateY(0)' : 'translateY(6px)',
          transition: 'opacity 0.35s ease, transform 0.35s ease',
          zIndex: 5,
        }}
      >
        <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.15rem', fontWeight: 300, fontStyle: 'italic', color: '#FAF7F2', lineHeight: 1.2 }}>
          {artwork.title}
        </p>
        <p style={{ fontFamily: 'var(--font-jost)', fontSize: '0.52rem', fontWeight: 300, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#E8D5A0', marginTop: '0.3rem' }}>
          {artwork.medium} · {artwork.dimensions} · {artwork.year}
        </p>
      </div>
    </div>
  )

  if (onClick) {
    return (
      <button onClick={onClick} style={{ all: 'unset', display: 'block', width: '100%' }}>
        {inner}
      </button>
    )
  }

  return (
    <Link href={`/${locale}/works/${artwork.slug}`} style={{ display: 'block', textDecoration: 'none' }}>
      {inner}
    </Link>
  )
}
