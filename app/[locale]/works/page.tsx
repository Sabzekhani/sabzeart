import { artworks } from '@/lib/artworks'
import { getTranslations } from '@/lib/translations'
import FadeIn from '@/components/ui/FadeIn'
import MasonryGallery from '@/components/gallery/MasonryGallery'

export default async function WorksPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = getTranslations(locale, 'works')
  return (
    <div style={{ paddingTop: '7rem', paddingBottom: '6rem', paddingLeft: '3.5rem', paddingRight: '3.5rem' }}>
      <FadeIn>
        <header style={{ marginBottom: '3rem' }}>
          <p className="eyebrow" style={{ marginBottom: '1rem' }}>Portfolio</p>
          <h1 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(3rem,6vw,4.5rem)', fontWeight: 300, color: 'var(--color-sabze-ink)' }}>{t('title')}</h1>
        </header>
      </FadeIn>
      <FadeIn delay={120}>
        <MasonryGallery artworks={artworks} locale={locale} availableLabel={t('availableTag')} soldLabel={t('soldTag')} allLabel={t('all')} filterLabel={t('filterBy')} />
      </FadeIn>
    </div>
  )
}
