import { notFound } from 'next/navigation'
import { getTranslations } from '@/lib/translations'
import Link from 'next/link'
import { getArtworkBySlug, getRelatedArtworks, artworks } from '@/lib/artworks'
import FadeIn from '@/components/ui/FadeIn'
import ArtworkImage from '@/components/gallery/ArtworkImage'
import WorkCard from '@/components/gallery/WorkCard'

export async function generateStaticParams() {
  return artworks.map((a) => ({ slug: a.slug }))
}

export default async function WorkDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  const work = getArtworkBySlug(slug)
  if (!work) notFound()
  const t = getTranslations(locale, 'workDetail')
  const related = getRelatedArtworks(work, 3)

  return (
    <div style={{ paddingTop: '5rem' }}>
      <div style={{ padding: '1.5rem 3.5rem 0' }}>
        <Link href={`/${locale}/works`} style={{ fontFamily: 'var(--font-jost)', fontSize: '0.6rem', fontWeight: 300, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-sabze-stone)', textDecoration: 'none' }}>← {t('backToWorks')}</Link>
      </div>
      <div style={{ padding: '2rem 3.5rem 4rem', display: 'grid', gridTemplateColumns: '1fr 360px', gap: '4rem', alignItems: 'start' }}>
        <FadeIn><ArtworkImage artwork={work} priority sizes="60vw" style={{ width: '100%', height: 'auto', display: 'block' }} /></FadeIn>
        <FadeIn delay={150}>
          <div style={{ position: 'sticky', top: '6rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {work.series && <span className="series-tag" style={{ alignSelf: 'flex-start' }}>{work.series}</span>}
            <div>
              <h1 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(2rem,3.5vw,3rem)', fontWeight: 300, color: 'var(--color-sabze-ink)', lineHeight: 1.1, marginBottom: '0.5rem' }}>{work.title}</h1>
              <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.2rem', fontStyle: 'italic', color: 'var(--color-sabze-stone)' }}>{work.year}</p>
            </div>
            <span className="gold-rule" />
            <dl style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem 1rem' }}>
              {[{ label: t('medium'), value: work.medium },{ label: t('dimensions'), value: work.dimensions },{ label: t('series'), value: work.series ?? '—' },{ label: t('year'), value: String(work.year) }].map(({ label, value }) => (
                <div key={label}><dt className="ui-label" style={{ marginBottom: '0.3rem' }}>{label}</dt><dd style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.05rem', fontWeight: 300, color: 'var(--color-sabze-ink)' }}>{value}</dd></div>
              ))}
            </dl>
            <div>{work.available ? <span className="badge-available">{t('available')}</span> : <span className="badge-sold">{t('sold')}</span>}</div>
            <p className="body-serif" style={{ fontSize: '1rem', lineHeight: 1.8 }}>{work.description}</p>
            {work.available && <Link href={`/${locale}/inquire`} className="btn-primary" style={{ marginTop: '0.5rem', alignSelf: 'flex-start' }}>{t('inquireAbout')} →</Link>}
          </div>
        </FadeIn>
      </div>
      {related.length > 0 && (
        <FadeIn>
          <section style={{ borderTop: '1px solid rgba(201,168,76,0.18)', padding: '4rem 3.5rem' }}>
            <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: '2.2rem', fontWeight: 300, color: 'var(--color-sabze-ink)', marginBottom: '2rem' }}>{t('relatedWorks')}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4 }}>
              {related.map((rw) => (
                <div key={rw.id} style={{ position: 'relative', aspectRatio: '1', overflow: 'hidden' }}>
                  <WorkCard artwork={rw} locale={locale} availableLabel="Available" soldLabel="Sold" sizes="33vw" />
                </div>
              ))}
            </div>
          </section>
        </FadeIn>
      )}
    </div>
  )
}
