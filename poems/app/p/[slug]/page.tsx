import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { poems, getPoemBySlug } from '@/lib/poems'

export const dynamicParams = false

const t = {
  eyebrow: 'Perzische poëzie',
  translation: 'Vertaling',
  transliteration: 'Uitspraak',
  explanation: 'Toelichting',
  keyTerms: 'Sleutelwoorden',
  more: 'Alle gedichten',
}

export function generateStaticParams() {
  return poems.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const poem = getPoemBySlug(slug)
  if (!poem) return {}
  const firstLine = poem.nl.translation.split('\n')[0]
  return {
    title: `${poem.poet} — ${firstLine}`,
    description: poem.nl.explanation.slice(0, 160),
  }
}

const sectionLabel: React.CSSProperties = { marginBottom: '0.9rem' }

function Paragraphs({ text, style }: { text: string; style?: React.CSSProperties }) {
  return (
    <>
      {text.split(/\n\s*\n/).map((para, i) => (
        <p key={i} style={{ whiteSpace: 'pre-line', marginBottom: '1rem', ...style }}>{para}</p>
      ))}
    </>
  )
}

export default async function PoemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const poem = getPoemBySlug(slug)
  if (!poem) notFound()
  const { nl } = poem

  return (
    <article lang="nl" style={{ paddingTop: '2.5rem', paddingBottom: '5rem' }}>
      <div style={{ maxWidth: 680, margin: '0 auto', padding: '0 1.25rem' }}>
        <div>
          <p className="eyebrow" style={{ marginBottom: '2.5rem' }}>{t.eyebrow}</p>

          <blockquote
            lang="fa"
            dir="rtl"
            style={{
              fontFamily: 'var(--font-persian)',
              fontSize: 'clamp(1.35rem, 5vw, 1.9rem)',
              fontWeight: 300,
              lineHeight: 2.1,
              color: 'var(--c-ink)',
              textAlign: 'center',
              whiteSpace: 'pre-line',
              margin: 0,
            }}
          >
            {poem.persian}
          </blockquote>

          <p style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <span style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.15rem', fontStyle: 'italic', color: 'var(--c-stone)' }}>
              {poem.poet}{poem.source ? ` · ${poem.source}` : ''}
            </span>
          </p>

          <span className="gold-rule" style={{ margin: '2.5rem auto' }} />
        </div>

        <div>
          <section style={{ marginBottom: '2.75rem' }}>
            <h2 className="ui-label" style={sectionLabel}>{t.translation}</h2>
            <p
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 'clamp(1.35rem, 4.5vw, 1.7rem)',
                fontWeight: 400,
                fontStyle: 'italic',
                lineHeight: 1.55,
                color: 'var(--c-ink)',
                whiteSpace: 'pre-line',
              }}
            >
              {nl.translation}
            </p>
          </section>

          {nl.transliteration && (
            <section style={{ marginBottom: '2.75rem' }}>
              <h2 className="ui-label" style={sectionLabel}>{t.transliteration}</h2>
              <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.15rem', fontWeight: 400, lineHeight: 1.7, color: 'var(--c-ink-soft)', whiteSpace: 'pre-line' }}>
                {nl.transliteration}
              </p>
            </section>
          )}
        </div>

        <div>
          <section style={{ marginBottom: '2.75rem' }}>
            <h2 className="ui-label" style={sectionLabel}>{t.explanation}</h2>
            <div className="body-serif" style={{ fontSize: '1.15rem', color: 'var(--c-ink-soft)' }}>
              <Paragraphs text={nl.explanation} />
            </div>
          </section>

          {nl.keyTerms.length > 0 && (
            <section style={{ marginBottom: '3rem' }}>
              <h2 className="ui-label" style={sectionLabel}>{t.keyTerms}</h2>
              <dl style={{ display: 'grid', gap: '1rem' }}>
                {nl.keyTerms.map(({ term, meaning }) => (
                  <div key={term} style={{ borderLeft: '1px solid var(--c-gold)', paddingLeft: '1rem' }}>
                    <dt style={{ fontFamily: 'var(--font-persian)', fontSize: '1.05rem', color: 'var(--c-ink)', marginBottom: '0.2rem' }}>{term}</dt>
                    <dd style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.08rem', color: 'var(--c-stone)', lineHeight: 1.5 }}>{meaning}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          <footer style={{ borderTop: '1px solid rgba(201,168,76,0.25)', paddingTop: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'flex-start', alignItems: 'center' }}>
            <Link href="/" className="btn-ghost">← {t.more}</Link>
          </footer>
        </div>
      </div>
    </article>
  )
}
