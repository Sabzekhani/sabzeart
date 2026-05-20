'use client'

import { useEffect, useCallback } from 'react'
import Image from 'next/image'
import type { Artwork } from '@/types'

interface LightboxProps {
  artworks: Artwork[]
  currentIndex: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export default function Lightbox({
  artworks,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: LightboxProps) {
  const current = artworks[currentIndex]

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft')  onPrev()
      if (e.key === 'ArrowRight') onNext()
    },
    [onClose, onPrev, onNext]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [handleKey])

  if (!current) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Viewing: ${current.title}`}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(26,22,18,0.97)',
        display: 'flex', flexDirection: 'column',
        animation: 'lightboxIn 0.3s ease forwards',
      }}
      onClick={onClose}
    >
      <style>{`@keyframes lightboxIn { from { opacity:0 } to { opacity:1 } }`}</style>

      {/* Top bar */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '1.25rem 2rem',
          borderBottom: '1px solid rgba(201,168,76,0.12)',
          flexShrink: 0,
        }}
      >
        <div>
          <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.25rem', fontWeight: 300, fontStyle: 'italic', color: '#FAF7F2' }}>
            {current.title}
          </p>
          <p style={{ fontFamily: 'var(--font-jost)', fontSize: '0.55rem', fontWeight: 300, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(196,184,173,0.6)', marginTop: '0.2rem' }}>
            {current.medium} · {current.dimensions} · {current.year}
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <span style={{ fontFamily: 'var(--font-jost)', fontSize: '0.55rem', fontWeight: 300, letterSpacing: '0.15em', color: 'rgba(196,184,173,0.4)' }}>
            {currentIndex + 1} / {artworks.length}
          </span>
          <button
            onClick={onClose}
            aria-label="Close lightbox"
            style={{
              background: 'none', border: '1px solid rgba(201,168,76,0.3)',
              color: 'rgba(201,168,76,0.7)', width: '2.25rem', height: '2.25rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', fontSize: '1rem', lineHeight: 1,
              transition: 'all 0.2s',
            }}
          >
            ×
          </button>
        </div>
      </div>

      {/* Main image area */}
      <div
        style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', padding: '2rem' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Prev arrow */}
        <button
          onClick={onPrev}
          aria-label="Previous artwork"
          style={{
            position: 'absolute', left: '1.5rem', top: '50%', transform: 'translateY(-50%)',
            background: 'none', border: '1px solid rgba(201,168,76,0.25)',
            color: 'rgba(201,168,76,0.6)', width: '2.75rem', height: '2.75rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', fontSize: '1.1rem', zIndex: 10,
            transition: 'all 0.2s',
          }}
        >
          ←
        </button>

        {/* Image */}
        <div
          key={current.id}
          style={{
            position: 'relative', maxWidth: '80vw', maxHeight: '75vh',
            width: '100%',
            animation: 'lightboxIn 0.25s ease forwards',
          }}
        >
          <Image
            src={current.imageUrl || '/images/artworks/placeholder.jpg'}
            alt={current.title}
            width={current.width}
            height={current.height}
            sizes="80vw"
            priority
            style={{
              width: '100%', height: 'auto',
              maxHeight: '75vh', objectFit: 'contain',
            }}
            onError={(e) => {
              // Swap to gradient fallback if image fails
              const el = e.currentTarget
              el.style.display = 'none'
              if (el.parentElement) {
                el.parentElement.style.background = 'linear-gradient(135deg,#8C7E72,#C9A84C 50%,#3D3530)'
                el.parentElement.style.aspectRatio = `${current.width}/${current.height}`
              }
            }}
          />
        </div>

        {/* Next arrow */}
        <button
          onClick={onNext}
          aria-label="Next artwork"
          style={{
            position: 'absolute', right: '1.5rem', top: '50%', transform: 'translateY(-50%)',
            background: 'none', border: '1px solid rgba(201,168,76,0.25)',
            color: 'rgba(201,168,76,0.6)', width: '2.75rem', height: '2.75rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', fontSize: '1.1rem', zIndex: 10,
            transition: 'all 0.2s',
          }}
        >
          →
        </button>
      </div>

      {/* Bottom: availability */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          padding: '1rem 2rem',
          borderTop: '1px solid rgba(201,168,76,0.08)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem',
          flexShrink: 0,
        }}
      >
        {current.available
          ? <span className="badge-available">Available for acquisition</span>
          : <span className="badge-sold">Sold — Private Collection</span>
        }
      </div>
    </div>
  )
}
