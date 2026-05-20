import Link from 'next/link'

interface FooterProps { locale: string }

export default function Footer({ locale }: FooterProps) {
  const year = new Date().getFullYear()
  const rights: Record<string, string> = { en: 'All rights reserved', nl: 'Alle rechten voorbehouden', es: 'Todos los derechos reservados' }

  return (
    <footer style={{ background: 'var(--color-sabze-ink)', borderTop: '1px solid rgba(201,168,76,0.1)' }}>
      <div style={{ padding: '3rem 3.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', alignItems: 'center', gap: '2rem' }}>
        <Link href={`/${locale}`} style={{ textDecoration: 'none' }}>
          <span style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.2rem', fontWeight: 600, letterSpacing: '0.2em' }}>
            <span style={{ color: 'rgba(90,122,92,0.6)' }}>S</span>
            <span style={{ color: 'rgba(201,168,76,0.6)' }}>ABZ</span>
            <span style={{ color: 'rgba(250,247,242,0.4)' }}>E</span>
          </span>
        </Link>
        <nav style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
          {[['works', 'Works'], ['about', 'About'], ['inquire', 'Inquire']].map(([slug, label]) => (
            <Link key={slug} href={`/${locale}/${slug}`} style={{ fontFamily: 'var(--font-jost)', fontSize: '0.58rem', fontWeight: 300, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(196,184,173,0.4)', textDecoration: 'none' }}>
              {label}
            </Link>
          ))}
        </nav>
        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'flex-end' }}>
          {[['https://instagram.com', 'Instagram'], ['https://artsy.net', 'Artsy'], ['https://linkedin.com', 'LinkedIn']].map(([href, label]) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-jost)', fontSize: '0.55rem', fontWeight: 300, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(196,184,173,0.35)', textDecoration: 'none' }}>
              {label}
            </a>
          ))}
        </div>
      </div>
      <div style={{ borderTop: '1px solid rgba(201,168,76,0.08)', padding: '1rem 3.5rem', display: 'flex', justifyContent: 'space-between' }}>
        <p style={{ fontFamily: 'var(--font-jost)', fontSize: '0.5rem', fontWeight: 300, letterSpacing: '0.15em', color: 'rgba(196,184,173,0.3)' }}>
          © {year} SABZE · The Hague · {rights[locale] ?? rights.en}
        </p>
        <p style={{ fontFamily: 'var(--font-jost)', fontSize: '0.5rem', fontWeight: 300, letterSpacing: '0.15em', color: 'rgba(196,184,173,0.2)' }}>
          somaye.khani@ymail.com
        </p>
      </div>
    </footer>
  )
}
