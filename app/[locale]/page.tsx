import Link from 'next/link'
import { artworks } from '@/lib/artworks'
import { getTranslations } from '@/lib/translations'
import MarqueeBand from '@/components/ui/MarqueeBand'
import FadeIn from '@/components/ui/FadeIn'
import WorkCard from '@/components/gallery/WorkCard'
import ArtworkImage from '@/components/gallery/ArtworkImage'

const marqueeItems = ['Gold Leaf & Impasto','Mixed Media on Canvas','The Hague · Netherlands','Collector Inquiries Welcome','Exhibition · Gallery · Commission','Silver Leaf & Mineral Pigment','Abstract · Figurative · Landscape']

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = getTranslations(locale, 'home')

  return (
    <>
      <section style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr', paddingTop: '72px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(3rem,6vw,5rem) 3.5rem', position: 'relative', zIndex: 2 }}>
          <p className="eyebrow" style={{ marginBottom: '2rem' }}>{t('eyebrow')}</p>
          <h1 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(4.5rem,7vw,6.5rem)', fontWeight: 600, letterSpacing: '0.18em', lineHeight: 1, marginBottom: '0.4rem' }}>
            <span style={{ color: 'var(--color-sabze-sage)' }}>S</span>
            <span style={{ color: 'var(--color-sabze-gold)' }}>ABZ</span>
            <span style={{ color: 'var(--color-sabze-ink)' }}>E</span>
          </h1>
          <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1rem', fontWeight: 300, fontStyle: 'italic', color: 'var(--color-sabze-stone)', letterSpacing: '0.12em', marginBottom: '1.75rem' }}>{t('heroSubtitle')}</p>
          <span className="gold-rule" style={{ marginBottom: '1.75rem' }} />
          <p className="body-serif" style={{ borderLeft: '2px solid var(--color-sabze-gold-light)', paddingLeft: '1.25rem', maxWidth: '26rem', marginBottom: '2.5rem' }}>{t('heroStatement')}</p>
          <div style={{ display: 'flex', gap: '2.5rem', marginBottom: '2.75rem' }}>
            {[{ num: '20+', label: t('yearsActive') },{ num: '60+', label: t('originalWorks') },{ num: 'NL', label: 'The Hague' }].map(({ num, label }) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                <span style={{ fontFamily: 'var(--font-cormorant)', fontSize: '2.5rem', fontWeight: 300, color: 'var(--color-sabze-ink)', lineHeight: 1 }}>{num}</span>
                <span className="ui-label">{label}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.2rem', alignItems: 'center' }}>
            <Link href={`/${locale}/works`} className="btn-primary">{t('viewPortfolio')}</Link>
            <Link href={`/${locale}/inquire`} className="btn-ghost">{t('collectorInquiries')}</Link>
          </div>
        </div>
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, display: 'grid', gridTemplateRows: '60% 40%', gap: 3, padding: 3 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '55% 45%', gap: 3 }}>
              {artworks.slice(0, 2).map((w, i) => (
                <div key={w.id} style={{ position: 'relative', overflow: 'hidden' }}>
                  <ArtworkImage artwork={w} fill priority={i === 0} sizes="30vw" style={{ objectFit: 'cover' }} />
                </div>
              ))}
            </div>
            <div style={{ position: 'relative', overflow: 'hidden' }}>
              <ArtworkImage artwork={artworks[2]} fill sizes="50vw" style={{ objectFit: 'cover' }} />
            </div>
          </div>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(100deg, var(--color-sabze-cream) 0%, rgba(250,247,242,0.15) 35%, transparent 60%)', pointerEvents: 'none', zIndex: 1 }} />
        </div>
      </section>

      <MarqueeBand items={marqueeItems} />

      <FadeIn>
        <section style={{ background: 'var(--color-sabze-ink)', padding: 'clamp(4rem,7vw,6rem) 3.5rem', display: 'grid', gridTemplateColumns: '200px 1fr', gap: '4rem', position: 'relative', overflow: 'hidden' }}>
          <span aria-hidden style={{ position: 'absolute', right: '-0.5rem', top: '50%', transform: 'translateY(-50%)', fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(6rem,12vw,10rem)', fontWeight: 600, color: 'rgba(201,168,76,0.04)', pointerEvents: 'none', whiteSpace: 'nowrap', userSelect: 'none' }}>SABZE</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <p style={{ fontFamily: 'var(--font-jost)', fontSize: '0.55rem', fontWeight: 300, letterSpacing: '0.38em', textTransform: 'uppercase', color: 'var(--color-sabze-sage-light)' }}>{t('statementLabel')}</p>
            <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1rem', fontWeight: 300, fontStyle: 'italic', color: 'rgba(201,168,76,0.55)', lineHeight: 1.6 }}>The Hague<br />Netherlands<br />2024</p>
          </div>
          <div>
            <blockquote style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(1.3rem,2.2vw,1.8rem)', fontWeight: 300, lineHeight: 1.65, color: 'rgba(250,247,242,0.9)' }}>
              &ldquo;{t('statementQuote')}&rdquo;
            </blockquote>
            <p style={{ marginTop: '1.75rem', fontFamily: 'var(--font-jost)', fontSize: '0.58rem', fontWeight: 300, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--color-sabze-stone)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ width: '1.25rem', height: '1px', background: 'var(--color-sabze-stone)', display: 'inline-block' }} />{t('statementAuthor')}
            </p>
          </div>
        </section>
      </FadeIn>

      <FadeIn>
        <section style={{ padding: 'clamp(4rem,7vw,6rem) 3.5rem' }}>
          <header style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '3rem', borderBottom: '1px solid rgba(201,168,76,0.25)', paddingBottom: '1.25rem' }}>
            <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(2.5rem,4vw,3.5rem)', fontWeight: 300, color: 'var(--color-sabze-ink)' }}>
              {t('selectedWorks')} <em style={{ fontStyle: 'italic', color: 'var(--color-sabze-gold)' }}>{t('worksAccent')}</em>
            </h2>
            <Link href={`/${locale}/works`} style={{ fontFamily: 'var(--font-jost)', fontSize: '0.58rem', fontWeight: 300, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-sabze-stone)', textDecoration: 'none' }}>
              {t('fullPortfolio')} →
            </Link>
          </header>
          <div style={{ display: 'grid', gridTemplateColumns: '2.2fr 1fr 1fr', gridTemplateRows: '300px 300px', gap: 4 }}>
            {artworks.slice(0, 5).map((work, i) => (
              <div key={work.id} style={{ gridRow: i === 0 ? '1/3' : undefined, position: 'relative' }}>
                <WorkCard artwork={work} locale={locale} availableLabel="Available" soldLabel="Sold" sizes={i === 0 ? '40vw' : '20vw'} priority={i === 0} />
              </div>
            ))}
          </div>
        </section>
      </FadeIn>

      <FadeIn>
        <section style={{ background: 'var(--color-sabze-ink)', padding: '4rem 3.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
          <div>
            <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(1.3rem,2.5vw,2rem)', fontWeight: 300, color: 'var(--color-sabze-cream)' }}>Interested in acquiring a work or commissioning a piece?</p>
            <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.05rem', fontWeight: 300, fontStyle: 'italic', color: 'var(--color-sabze-stone)' }}>The studio welcomes serious collector and gallery inquiries.</p>
          </div>
          <Link href={`/${locale}/inquire`} className="btn-primary">Open an Inquiry →</Link>
        </section>
      </FadeIn>
    </>
  )
}
