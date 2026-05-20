import { getTranslations } from '@/lib/translations'
import FadeIn from '@/components/ui/FadeIn'
import ContactForm from '@/components/inquire/ContactForm'

export default async function InquirePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = getTranslations(locale, 'inquire')
  const te = getTranslations(locale, 'inquire')

  const labels = {
    name: t('name'), email: t('email'), institution: t('institution'),
    workInterest: t('workInterest'), message: t('message'),
    send: t('send'), sending: t('sending'),
    successTitle: t('successTitle'), successBody: t('successBody'),
    errors: { nameRequired: te('errors.nameRequired'), emailInvalid: te('errors.emailInvalid'), messageRequired: te('errors.messageRequired') },
  }

  return (
    <div style={{ paddingTop: '7rem', paddingBottom: '6rem', paddingLeft: '3.5rem', paddingRight: '3.5rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 'clamp(3rem,6vw,6rem)', alignItems: 'start' }}>
        <FadeIn>
          <div>
            <p className="eyebrow" style={{ marginBottom: '1.5rem' }}>{t('eyebrow')}</p>
            <h1 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(2.5rem,4.5vw,4rem)', fontWeight: 300, color: 'var(--color-sabze-ink)', lineHeight: 1.05, marginBottom: '0.3rem' }}>{t('title')}</h1>
            <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(2.5rem,4.5vw,4rem)', fontWeight: 300, fontStyle: 'italic', color: 'var(--color-sabze-gold)', lineHeight: 1.05, marginBottom: '2.5rem' }}>{t('titleAccent')}</h2>
            <p className="body-serif" style={{ fontSize: '1rem', maxWidth: '30rem', marginBottom: '3rem' }}>{t('body')}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {[{ icon: '✉', label: t('emailLabel'), value: 'somaye.khani@ymail.com' },{ icon: '◎', label: t('studioLabel'), value: t('studioLocation') },{ icon: '↗', label: t('openFor'), value: t('openForItems') }].map(({ icon, label, value }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ width: 36, height: 36, flexShrink: 0, border: '1px solid rgba(201,168,76,0.28)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-sabze-gold)', fontSize: '0.9rem' }}>{icon}</div>
                  <div>
                    <p className="ui-label" style={{ marginBottom: '0.2rem' }}>{label}</p>
                    <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.05rem', fontWeight: 300, color: 'var(--color-sabze-ink)', lineHeight: 1.4 }}>{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
        <FadeIn delay={150}>
          <ContactForm labels={labels} locale={locale} />
        </FadeIn>
      </div>
    </div>
  )
}
