'use client'

import { useState, useCallback } from 'react'
import type { Artwork } from '@/types'
import WorkCard from './WorkCard'
import Lightbox from './Lightbox'

interface MasonryGalleryProps {
  artworks: Artwork[]
  locale: string
  availableLabel: string
  soldLabel: string
  allLabel: string
  filterLabel: string
}

export default function MasonryGallery({
  artworks,
  locale,
  availableLabel,
  soldLabel,
  allLabel,
  filterLabel: _filterLabel,
}: MasonryGalleryProps) {
  const [activeFilter, setActiveFilter] = useState<string>('all')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  // Derive series list
  const series = Array.from(new Set(artworks.map((a) => a.series).filter(Boolean))) as string[]

  const filtered = activeFilter === 'all'
    ? artworks
    : artworks.filter((a) => a.series === activeFilter)

  const openLightbox = useCallback((index: number) => setLightboxIndex(index), [])
  const closeLightbox = useCallback(() => setLightboxIndex(null), [])
  const prevImage = useCallback(() =>
    setLightboxIndex((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length)), [filtered.length])
  const nextImage = useCallback(() =>
    setLightboxIndex((i) => (i === null ? null : (i + 1) % filtered.length)), [filtered.length])

  return (
    <>
      {/* Filter bar */}
      <div
        role="toolbar"
        aria-label="Filter artworks by series"
        style={{
          display: 'flex', flexWrap: 'wrap', gap: '0.5rem',
          marginBottom: '2.5rem', paddingBottom: '1.5rem',
          borderBottom: '1px solid rgba(201,168,76,0.2)',
        }}
      >
        <button
          onClick={() => setActiveFilter('all')}
          className="series-tag"
          style={activeFilter === 'all' ? { borderColor: 'var(--color-sabze-gold)', color: 'var(--color-sabze-gold)' } : {}}
          aria-pressed={activeFilter === 'all'}
        >
          {allLabel}
        </button>
        {series.map((s) => (
          <button
            key={s}
            onClick={() => setActiveFilter(s)}
            className="series-tag"
            style={activeFilter === s ? { borderColor: 'var(--color-sabze-gold)', color: 'var(--color-sabze-gold)' } : {}}
            aria-pressed={activeFilter === s}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Masonry grid — CSS columns, SSR-safe */}
      <div
        style={{
          columnCount: 3,
          columnGap: '4px',
        }}
      >
        {filtered.map((artwork, index) => (
          <div
            key={artwork.id}
            style={{
              breakInside: 'avoid',
              marginBottom: '4px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <WorkCard
              artwork={artwork}
              locale={locale}
              availableLabel={availableLabel}
              soldLabel={soldLabel}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={index < 3}
              onClick={() => openLightbox(index)}
            />
          </div>
        ))}
      </div>

      {/* Responsive column count via a small style injection */}
      <style>{`
        @media (max-width: 640px)  { .masonry-cols { column-count: 1 !important; } }
        @media (max-width: 1024px) { .masonry-cols { column-count: 2 !important; } }
      `}</style>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          artworks={filtered}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </>
  )
}
