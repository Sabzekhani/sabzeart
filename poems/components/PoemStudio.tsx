'use client'

import { useEffect, useState } from 'react'
import type { Poem, PoemKeyTerm } from '@/lib/types'
import { qrDataUrl, qrSvg, downloadBlob, renderCard } from './qr'

interface Props {
  existing: Poem[]
  siteUrl: string
}

interface Draft {
  slug: string
  poet: string
  source: string
  transliteration: string
  translation: string
  explanation: string
  keyTerms: PoemKeyTerm[]
}

const emptyDraft: Draft = { slug: '', poet: '', source: '', transliteration: '', translation: '', explanation: '', keyTerms: [] }

const PW_KEY = 'sabze-studio-pw'

const box: React.CSSProperties = {
  width: '100%',
  background: '#fff',
  border: '1px solid rgba(196,184,173,0.6)',
  padding: '0.75rem',
  fontFamily: 'var(--font-jost)',
  fontSize: '0.95rem',
  fontWeight: 300,
  color: 'var(--c-ink)',
  lineHeight: 1.7,
  outline: 'none',
}

const persianBox: React.CSSProperties = { ...box, fontFamily: 'var(--font-persian)', fontSize: '1.15rem', lineHeight: 2 }

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label style={{ display: 'block', marginBottom: '1.25rem' }}>
      <span style={{ display: 'block', fontFamily: 'var(--font-persian)', fontSize: '0.85rem', color: 'var(--c-ink-soft)', marginBottom: '0.4rem' }}>
        {label}
        {hint && <span style={{ color: 'var(--c-stone)', fontSize: '0.75rem', marginInlineStart: '0.5rem' }}>{hint}</span>}
      </span>
      {children}
    </label>
  )
}

function slugify(s: string) {
  return s.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60)
}

export default function PoemStudio({ existing, siteUrl: configuredUrl }: Props) {
  const siteUrl = configuredUrl || (typeof window !== 'undefined' ? window.location.origin : '')
  const [password, setPassword] = useState(() => {
    if (typeof window === 'undefined') return ''
    try {
      return sessionStorage.getItem(PW_KEY) ?? ''
    } catch {
      return ''
    }
  })
  const [persian, setPersian] = useState('')
  const [poetHint, setPoetHint] = useState('')
  const [notes, setNotes] = useState('')
  const [draft, setDraft] = useState<Draft>(emptyDraft)
  const [busy, setBusy] = useState<'translate' | 'publish' | null>(null)
  const [message, setMessage] = useState<{ kind: 'ok' | 'error'; text: string } | null>(null)
  const [fallbackJson, setFallbackJson] = useState<string | null>(null)
  const [qr, setQr] = useState<{ url: string; dataUrl: string } | null>(null)

  const url = draft.slug ? `${siteUrl}/p/${draft.slug}` : ''

  useEffect(() => {
    if (url) qrDataUrl(url, 360).then((dataUrl) => setQr({ url, dataUrl }))
  }, [url])
  const qrPreview = url && qr?.url === url ? qr.dataUrl : null

  function rememberPassword(pw: string) {
    setPassword(pw)
    try {
      sessionStorage.setItem(PW_KEY, pw)
    } catch {}
  }

  function update<K extends keyof Draft>(key: K, value: Draft[K]) {
    setDraft((d) => ({ ...d, [key]: value }))
  }

  async function translate() {
    setMessage(null)
    setFallbackJson(null)
    setBusy('translate')
    try {
      const res = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, persian, poet: poetHint || undefined, notes: notes || undefined }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Fout')
      let slug: string = data.draft.slug || slugify(data.draft.poet)
      if (existing.some((p) => p.slug === slug)) slug = `${slug}-${Math.random().toString(36).slice(2, 6)}`
      setDraft({ ...data.draft, slug })
      setMessage({ kind: 'ok', text: 'پیش‌نویس آماده شد. لطفاً متن هلندی را بازبینی و در صورت نیاز ویرایش کنید.' })
    } catch (e) {
      setMessage({ kind: 'error', text: (e as Error).message })
    } finally {
      setBusy(null)
    }
  }

  function buildPoem(): Poem {
    return {
      slug: draft.slug,
      persian: persian.trim(),
      poet: draft.poet.trim() || 'Onbekend',
      ...(draft.source.trim() ? { source: draft.source.trim() } : {}),
      createdAt: new Date().toISOString().slice(0, 10),
      nl: {
        transliteration: draft.transliteration.trim(),
        translation: draft.translation.trim(),
        explanation: draft.explanation.trim(),
        keyTerms: draft.keyTerms.filter((k) => k.term.trim() && k.meaning.trim()),
      },
    }
  }

  async function publish() {
    setMessage(null)
    setFallbackJson(null)
    setBusy('publish')
    const poem = buildPoem()
    try {
      const res = await fetch('/api/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, poem }),
      })
      const data = await res.json()
      if (res.status === 501) {
        setFallbackJson(JSON.stringify(poem, null, 2))
        setMessage({ kind: 'error', text: 'انتشار خودکار تنظیم نشده است (GITHUB_TOKEN). متن JSON زیر را به فایل poems/data/poems.json اضافه کنید.' })
        return
      }
      if (!res.ok) throw new Error(data.error ?? 'Fout')
      setMessage({ kind: 'ok', text: 'ذخیره شد. صفحه پس از به‌روزرسانی سایت (حدود یک تا دو دقیقه) در دسترس خواهد بود. QR کد از همین حالا قابل دانلود است.' })
    } catch (e) {
      setMessage({ kind: 'error', text: (e as Error).message })
    } finally {
      setBusy(null)
    }
  }

  async function downloadPng(slug: string) {
    const dataUrl = await qrDataUrl(`${siteUrl}/p/${slug}`, 1200)
    downloadBlob(await (await fetch(dataUrl)).blob(), `qr-${slug}.png`)
  }
  async function downloadSvg(slug: string) {
    const svg = await qrSvg(`${siteUrl}/p/${slug}`)
    downloadBlob(new Blob([svg], { type: 'image/svg+xml' }), `qr-${slug}.svg`)
  }
  async function downloadCard(p: { slug: string; persian: string; poet: string }) {
    const blob = await renderCard({ url: `${siteUrl}/p/${p.slug}`, persian: p.persian, poet: p.poet })
    downloadBlob(blob, `kaart-${p.slug}.png`)
  }

  const canTranslate = !!password && !!persian.trim() && !busy
  const canPublish = !!password && !!persian.trim() && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(draft.slug) && !!draft.translation.trim() && !!draft.explanation.trim() && !busy

  return (
    <div dir="rtl" style={{ paddingTop: '2.5rem', paddingBottom: '5rem' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '0 1.25rem' }}>
        <h1 style={{ fontFamily: 'var(--font-persian)', fontWeight: 300, fontSize: '1.8rem', marginBottom: '0.5rem' }}>استودیوی شعر و QR</h1>
        <p style={{ fontFamily: 'var(--font-persian)', fontSize: '0.9rem', color: 'var(--c-stone)', marginBottom: '2rem' }}>
          شعر یا جملهٔ فارسی را وارد کنید، ترجمه و تفسیر هلندی را بازبینی کنید، سپس QR کد را برای چاپ دانلود کنید.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))', gap: '2.5rem', alignItems: 'start' }}>
          {/* ── Input + editing ── */}
          <section>
            <Field label="رمز عبور استودیو">
              <input type="password" dir="ltr" suppressHydrationWarning value={password} onChange={(e) => rememberPassword(e.target.value)} style={box} />
            </Field>
            <Field label="بیت یا جملهٔ فارسی" hint="هر مصرع در یک خط">
              <textarea dir="rtl" rows={4} value={persian} onChange={(e) => setPersian(e.target.value)} style={persianBox} />
            </Field>
            <Field label="شاعر" hint="اختیاری">
              <input dir="rtl" value={poetHint} onChange={(e) => setPoetHint(e.target.value)} placeholder="مثلاً حافظ" style={persianBox} />
            </Field>
            <Field label="یادداشت برای مترجم" hint="اختیاری — مثلاً ارتباط شعر با اثر هنری">
              <textarea dir="rtl" rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} style={persianBox} />
            </Field>
            <button className="btn-primary" disabled={!canTranslate} onClick={translate} style={{ fontFamily: 'var(--font-persian)', fontSize: '0.85rem', letterSpacing: 0 }}>
              {busy === 'translate' ? 'در حال ترجمه… (تا یک دقیقه)' : 'ساخت پیش‌نویس ترجمهٔ هلندی'}
            </button>

            {message && (
              <p style={{ marginTop: '1.25rem', padding: '0.75rem 1rem', fontFamily: 'var(--font-persian)', fontSize: '0.85rem', lineHeight: 1.8, background: message.kind === 'ok' ? 'var(--c-sage-pale)' : '#F6E3DA', color: message.kind === 'ok' ? 'var(--c-sage)' : 'var(--c-rust)' }}>
                {message.text}
              </p>
            )}
            {fallbackJson && (
              <textarea dir="ltr" readOnly rows={12} value={fallbackJson + ','} style={{ ...box, fontFamily: 'monospace', fontSize: '0.75rem', marginTop: '0.75rem' }} onFocus={(e) => e.target.select()} />
            )}

            <hr style={{ border: 'none', borderTop: '1px solid rgba(201,168,76,0.3)', margin: '2rem 0' }} />

            <div dir="ltr">
              <Field label="Vertaling (NL)">
                <textarea rows={4} value={draft.translation} onChange={(e) => update('translation', e.target.value)} style={box} />
              </Field>
              <Field label="Toelichting (NL)" hint="لایهٔ تفسیر؛ پاراگراف‌ها را با یک خط خالی جدا کنید">
                <textarea rows={10} value={draft.explanation} onChange={(e) => update('explanation', e.target.value)} style={box} />
              </Field>
              <Field label="Uitspraak / transliteratie">
                <textarea rows={3} value={draft.transliteration} onChange={(e) => update('transliteration', e.target.value)} style={box} />
              </Field>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <Field label="Dichter">
                  <input value={draft.poet} onChange={(e) => update('poet', e.target.value)} style={box} />
                </Field>
                <Field label="Bron">
                  <input value={draft.source} onChange={(e) => update('source', e.target.value)} style={box} />
                </Field>
              </div>

              <Field label="Sleutelwoorden">
                <div style={{ display: 'grid', gap: '0.5rem' }}>
                  {draft.keyTerms.map((k, i) => (
                    <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr auto', gap: '0.5rem' }}>
                      <input value={k.term} onChange={(e) => update('keyTerms', draft.keyTerms.map((x, j) => (j === i ? { ...x, term: e.target.value } : x)))} style={box} />
                      <input value={k.meaning} onChange={(e) => update('keyTerms', draft.keyTerms.map((x, j) => (j === i ? { ...x, meaning: e.target.value } : x)))} style={box} />
                      <button type="button" onClick={() => update('keyTerms', draft.keyTerms.filter((_, j) => j !== i))} style={{ ...box, width: 'auto', cursor: 'pointer' }} aria-label="Verwijderen">×</button>
                    </div>
                  ))}
                  <button type="button" className="btn-ghost" style={{ justifySelf: 'start' }} onClick={() => update('keyTerms', [...draft.keyTerms, { term: '', meaning: '' }])}>
                    + Sleutelwoord
                  </button>
                </div>
              </Field>

              <Field label="Slug (adres van de pagina)" hint="a-z, 0-9, -">
                <input value={draft.slug} onChange={(e) => update('slug', slugify(e.target.value))} style={box} />
              </Field>
            </div>

            <button className="btn-primary" disabled={!canPublish} onClick={publish} style={{ fontFamily: 'var(--font-persian)', fontSize: '0.85rem', letterSpacing: 0 }}>
              {busy === 'publish' ? 'در حال ذخیره…' : 'تأیید و انتشار در سایت'}
            </button>
          </section>

          {/* ── QR preview ── */}
          <aside style={{ position: 'sticky', top: '6rem', background: '#fff', border: '1px solid rgba(201,168,76,0.25)', padding: '1.5rem', textAlign: 'center' }}>
            <p style={{ fontFamily: 'var(--font-persian)', fontSize: '0.9rem', marginBottom: '1rem' }}>پیش‌نمایش QR</p>
            {qrPreview ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={qrPreview} alt="QR" width={240} height={240} style={{ margin: '0 auto', display: 'block' }} />
                <p dir="ltr" style={{ fontSize: '0.7rem', color: 'var(--c-stone)', wordBreak: 'break-all', margin: '0.75rem 0 1.25rem' }}>{url}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
                  <button className="btn-outline-gold" onClick={() => downloadPng(draft.slug)}>PNG</button>
                  <button className="btn-outline-gold" onClick={() => downloadSvg(draft.slug)}>SVG</button>
                  <button className="btn-outline-gold" disabled={!persian.trim()} onClick={() => downloadCard({ slug: draft.slug, persian, poet: draft.poet })}>کارت چاپی</button>
                </div>
              </>
            ) : (
              <p style={{ fontFamily: 'var(--font-persian)', fontSize: '0.8rem', color: 'var(--c-stone)', padding: '4rem 0' }}>پس از ساخت پیش‌نویس، QR کد اینجا نمایش داده می‌شود.</p>
            )}
          </aside>
        </div>

        {/* ── Existing poems ── */}
        {existing.length > 0 && (
          <section style={{ marginTop: '4rem' }}>
            <h2 style={{ fontFamily: 'var(--font-persian)', fontWeight: 300, fontSize: '1.3rem', marginBottom: '1rem' }}>اشعار منتشرشده</h2>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {existing.map((p) => (
                <div key={p.slug} style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between', background: '#fff', padding: '1rem', border: '1px solid rgba(196,184,173,0.4)' }}>
                  <div>
                    <p style={{ fontFamily: 'var(--font-persian)', fontSize: '1rem' }}>{p.persian.split('\n')[0]}</p>
                    <a dir="ltr" href={`/p/${p.slug}`} target="_blank" rel="noreferrer" style={{ fontSize: '0.7rem', color: 'var(--c-stone)' }}>/p/{p.slug}</a>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn-outline-gold" onClick={() => downloadPng(p.slug)}>PNG</button>
                    <button className="btn-outline-gold" onClick={() => downloadSvg(p.slug)}>SVG</button>
                    <button className="btn-outline-gold" onClick={() => downloadCard(p)}>کارت</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
