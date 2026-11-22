import type { Metadata } from 'next'
import { poems, SITE_URL } from '@/lib/poems'
import PoemStudio from '@/components/PoemStudio'

export const metadata: Metadata = {
  title: 'Studio — QR',
  robots: { index: false, follow: false },
}

export default function StudioPage() {
  return <PoemStudio existing={poems} siteUrl={SITE_URL} />
}
