import { getTranslations } from '@/lib/translations'
import { exhibitions, artworks } from '@/lib/artworks'
import FadeIn from '@/components/ui/FadeIn'
import ExhibitionTimeline from '@/components/about/ExhibitionTimeline'
import ArtworkImage from '@/components/gallery/ArtworkImage'

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = getTranslations(locale, 'about')

  return (
    <div style={{ paddingTop: '7rem', paddingBottom: '6rem' }}>
      <FadeIn>
        <section style={{ padding: '0 3.5rem 4rem', display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 'clamp(3rem,5vw,5rem)', alignItems: 'start' }}>
          <div>
            <div style={{ position: 'relative', width: '100%', aspectRatio: '3/4', overflow: 'hidden' }}>
              <ArtworkImage artwork={artworks[1]} fill priority sizes="38vw" style={{ objectFit: 'cover', filter: 'saturate(0.75) brightness(0.9)' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,22,18,0.45) 0%, transparent 55%)' }} />
            </div>
          </div>
          <div style={{ paddingTop: '0.5rem' }}>
            <p className="eyebrow" style={{ marginBottom: '1.5rem' }}>{t('eyebrow')}</p>
            <h1 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(2.5rem,4vw,3.8rem)', fontWeight: 300, lineHeight: 1.1, color: 'var(--color-sabze-ink)', marginBottom: '0.3rem' }}>Somaye Khani</h1>
            <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.1rem', fontStyle: 'italic', color: 'var(--color-sabze-gold)', marginBottom: '0.3rem' }}>SABZE</p>
            <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.05rem', fontStyle: 'italic', color: 'var(--color-sabze-stone)', marginBottom: '2.5rem' }}>{t('location')}</p>
            <span className="gold-rule" style={{ marginBottom: '2.5rem' }} />
            <p className="ui-label" style={{ marginBottom: '1.25rem' }}>{t('bioTitle')}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.5rem' }}>
              {[t('bio1'), t('bio2'), t('bio3')].map((para, i) => <p key={i} className="body-serif" style={{ fontSize: '1rem', lineHeight: 1.85 }}>{para}</p>)}
            </div>
            <a href="/somaye-khani-cv.pdf" className="btn-primary" style={{ display: 'inline-flex' }} download>{t('downloadCV')} ↓</a>
          </div>
        </section>
      </FadeIn>
      <FadeIn>
        <section style={{ background: 'var(--color-sabze-ink)', padding: 'clamp(4rem,7vw,6rem) 3.5rem', position: 'relative', overflow: 'hidden' }}>
          <div style={{ maxWidth: '52rem' }}>
            <p className="eyebrow" style={{ color: 'var(--color-sabze-sage-light)', marginBottom: '2.5rem' }}>{t('statementTitle')}</p>
            <blockquote style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(1.1rem,2vw,1.4rem)', fontWeight: 300, lineHeight: 1.85, color: 'rgba(250,247,242,0.9)', fontStyle: 'italic', borderLeft: '2px solid var(--color-sabze-gold)', paddingLeft: '1.75rem' }}>
              &ldquo;{t('statement')}&rdquo;
            </blockquote>
          </div>
        </section>
      </FadeIn>
      <FadeIn>
        <section style={{ padding: 'clamp(3rem,6vw,5rem) 3.5rem' }}>
          <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 300, color: 'var(--color-sabze-ink)', marginBottom: '2.5rem', paddingBottom: '1.25rem', borderBottom: '1px solid rgba(201,168,76,0.2)' }}>{t('exhibitionsTitle')}</h2>
          <ExhibitionTimeline exhibitions={exhibitions} soloLabel={t('solo')} groupLabel={t('group')} fairLabel={t('fair')} />
        </section>
      </FadeIn>
    </div>
  )
}
