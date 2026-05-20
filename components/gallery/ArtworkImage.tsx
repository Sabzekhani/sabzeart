'use client'

import Image from 'next/image'
import { useState } from 'react'
import type { Artwork } from '@/types'

interface ArtworkImageProps {
  artwork: Artwork
  fill?: boolean
  priority?: boolean
  className?: string
  sizes?: string
  style?: React.CSSProperties
}

// Shimmer placeholder for blur while loading
function shimmer(w: number, h: number) {
  return `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#F0EAE0" offset="20%" />
      <stop stop-color="#E8D5A0" offset="50%" />
      <stop stop-color="#F0EAE0" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#F0EAE0" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
</svg>`
}

function toBase64(str: string) {
  if (typeof window === 'undefined') {
    return Buffer.from(str).toString('base64')
  }
  return window.btoa(str)
}

// Gradient fallback palette keyed by artwork id
const gradients: Record<string, string> = {
  '1':  'linear-gradient(135deg,#8C7E72 0%,#C9A84C 45%,#3D3530 100%)',
  '2':  'linear-gradient(135deg,#3D3530 0%,#C9A84C 65%,#5A7A5C 100%)',
  '3':  'linear-gradient(150deg,#2A3A2A 0%,#1A5A3A 40%,#5A8A82 100%)',
  '4':  'linear-gradient(135deg,#0A1540 0%,#1A3A8A 45%,#C9A84C 100%)',
  '5':  'linear-gradient(135deg,#C4B8AD 0%,#E8D5A0 50%,#A8C4A2 100%)',
  '6':  'linear-gradient(135deg,#9B5B3A 0%,#4A7A72 55%,#FAF7F2 100%)',
  '7':  'linear-gradient(180deg,#E8E0D0 0%,#D4891A 55%,#7ABAAC 100%)',
  '8':  'linear-gradient(160deg,#7ABAAC 0%,#F5D0C0 55%,#7ABAAC 100%)',
  '9':  'linear-gradient(180deg,#1A1612 0%,#2A6A2A 40%,#7ADAF5 100%)',
  '10': 'linear-gradient(135deg,#E8C490 0%,#2A8A5A 45%,#FAF7F2 100%)',
}

export default function ArtworkImage({
  artwork,
  fill = false,
  priority = false,
  className = '',
  sizes = '(max-width: 768px) 100vw, 50vw',
  style,
}: ArtworkImageProps) {
  const [imgError, setImgError] = useState(false)
  const fallbackGradient = gradients[artwork.id] ?? 'linear-gradient(135deg,#8C7E72,#C9A84C)'

  // If no real image or error, render the gradient placeholder
  if (!artwork.imageUrl || imgError) {
    return (
      <div
        className={className}
        style={{
          background: fallbackGradient,
          width: '100%',
          height: fill ? '100%' : undefined,
          aspectRatio: fill ? undefined : `${artwork.width}/${artwork.height}`,
          ...style,
        }}
        aria-label={artwork.title}
        role="img"
      />
    )
  }

  const blurDataURL = `data:image/svg+xml;base64,${toBase64(shimmer(artwork.width, artwork.height))}`

  if (fill) {
    return (
      <Image
        src={artwork.imageUrl}
        alt={artwork.title}
        fill
        sizes={sizes}
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        className={`object-cover ${className}`}
        placeholder="blur"
        blurDataURL={blurDataURL}
        onError={() => setImgError(true)}
        style={style}
      />
    )
  }

  return (
    <Image
      src={artwork.imageUrl}
      alt={artwork.title}
      width={artwork.width}
      height={artwork.height}
      sizes={sizes}
      priority={priority}
      loading={priority ? 'eager' : 'lazy'}
      className={`w-full h-auto ${className}`}
      placeholder="blur"
      blurDataURL={blurDataURL}
      onError={() => setImgError(true)}
      style={style}
    />
  )
}
