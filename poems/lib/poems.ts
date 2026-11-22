import poemsData from '@/data/poems.json'
import type { Poem } from '@/lib/types'

export const poems: Poem[] = poemsData as Poem[]

export function getPoemBySlug(slug: string): Poem | undefined {
  return poems.find((p) => p.slug === slug)
}

/**
 * Public address of this site; QR codes point here. Set NEXT_PUBLIC_SITE_URL in Vercel
 * (e.g. your own domain). When empty, the studio uses the address it is opened on.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? '').replace(/\/$/, '')

export const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME ?? 'Perzische Poëzie'

/** The short URL a QR code points to. */
export function poemUrl(slug: string, base: string) {
  return `${base.replace(/\/$/, '')}/p/${slug}`
}
