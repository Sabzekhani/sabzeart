import Link from 'next/link'
import { poems } from '@/lib/poems'

export default function HomePage() {
  return (
    <div style={{ maxWidth: 680, margin: '0 auto', padding: '2.5rem 1.25rem 5rem' }}>
      <p className="eyebrow" style={{ marginBottom: '1.5rem' }}>Perzische poëzie</p>
      <h1 style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: 'clamp(2rem, 7vw, 3rem)', lineHeight: 1.15, marginBottom: '1rem' }}>
        Gedichten en woorden uit het Perzisch, vertaald en toegelicht
      </h1>
      <p className="body-serif" style={{ marginBottom: '3rem' }}>
        Bij elk Perzisch citaat hoort een QR-code. Scan hem om de Nederlandse vertaling, de uitspraak en een toelichting op de betekenis te lezen.
      </p>
      <ul style={{ listStyle: 'none', display: 'grid', gap: '1rem' }}>
        {poems.map((p) => (
          <li key={p.slug}>
            <Link href={`/p/${p.slug}`} style={{ display: 'block', textDecoration: 'none', background: '#fff', border: '1px solid rgba(196,184,173,0.4)', padding: '1.25rem' }}>
              <p lang="fa" dir="rtl" style={{ fontFamily: 'var(--font-persian)', fontSize: '1.15rem', lineHeight: 1.9 }}>{p.persian.split('\n')[0]}</p>
              <p style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontSize: '1.1rem', color: 'var(--c-ink-soft)', marginTop: '0.35rem' }}>{p.nl.translation.split('\n')[0]}</p>
              <p className="ui-label" style={{ marginTop: '0.6rem' }}>{p.poet}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
