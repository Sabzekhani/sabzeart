import type { MetadataRoute } from 'next'
import { artworks } from '@/lib/artworks'

const BASE_URL = 'https://sabze.nl'
const locales = ['en', 'nl', 'es']

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  // Static pages
  const staticPages = ['', '/works', '/about', '/inquire']

  const staticEntries = locales.flatMap((locale) =>
    staticPages.map((path) => ({
      url: `${BASE_URL}/${locale}${path}`,
      lastModified: now,
      changeFrequency: path === '' ? ('weekly' as const) : ('monthly' as const),
      priority: path === '' ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${BASE_URL}/${l}${path}`])
        ),
      },
    }))
  )

  // Work detail pages
  const workEntries = locales.flatMap((locale) =>
    artworks.map((work) => ({
      url: `${BASE_URL}/${locale}/works/${work.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${BASE_URL}/${l}/works/${work.slug}`])
        ),
      },
    }))
  )

  return [...staticEntries, ...workEntries]
}
