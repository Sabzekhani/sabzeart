import poemsData from '@/data/poems.json'
import type { Poem } from '@/types'

export const poems: Poem[] = poemsData as Poem[]

export function getPoemBySlug(slug: string): Poem | undefined {
  return poems.find((p) => p.slug === slug)
}

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sabze.nl').replace(/\/$/, '')

/** The URL a QR code points to. Dutch is the default audience. */
export function poemUrl(slug: string, locale = 'nl', base = SITE_URL) {
  return `${base.replace(/\/$/, '')}/${locale}/poem/${slug}`
}
