'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavProps { locale: string }

const localeLabels: Record<string, string> = { en: 'EN', nl: 'NL', es: 'ES' }
const allLocales = ['en', 'nl', 'es']

const navLabels: Record<string, Record<string, string>> = {
  en: { works: 'Works', about: 'About', inquire: 'Inquire' },
  nl: { works: 'Werken', about: 'Over', inquire: 'Contact' },
  es: { works: 'Obras', about: 'Artista', inquire: 'Contacto' },
}

export default function Nav({ locale }: NavProps) {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const labels = navLabels[locale] ?? navLabels.en

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [pathname])

  function localePath(targetLocale: string) {
    const segments = pathname.split('/')
    segments[1] = targetLocale
    return segments.join('/') || `/${targetLocale}`
  }

  const navLinks = [
    { href: `/${locale}/works`, label: labels.works },
    { href: `/${locale}/about`, label: labels.about },
    { href: `/${locale}/inquire`, label: labels.inquire },
  ]

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: scrolled ? '1rem 3.5rem' : '1.5rem 3.5rem',
        background: scrolled ? 'rgba(250,247,242,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(201,168,76,0.2)' : 'none',
        transition: 'all 0.4s ease',
      }}>
        <Link href={`/${locale}`} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.9rem', fontWeight: 600, letterSpacing: '0.2em', lineHeight: 1 }}>
            <span style={{ color: 'var(--color-sabze-sage)' }}>S</span>
            <span style={{ color: 'var(--color-sabze-gold)' }}>ABZ</span>
            <span style={{ color: 'var(--color-sabze-ink)' }}>E</span>
          </span>
          <span style={{ fontFamily: 'var(--font-jost)', fontSize: '0.42rem', fontWeight: 300, letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--color-sabze-stone)', marginTop: 2 }}>
            The Hague · Fine Art
          </span>
        </Link>

        <nav style={{ display: 'flex', gap: '2rem', listStyle: 'none' }}>
          {navLinks.map(({ href, label }) => (
            <Link key={href} href={href} style={{
              fontFamily: 'var(--font-jost)', fontSize: '0.62rem', fontWeight: 300,
              letterSpacing: '0.22em', textTransform: 'uppercase', textDecoration: 'none',
              color: pathname.startsWith(href) ? 'var(--color-sabze-gold)' : 'var(--color-sabze-ink-soft)',
            }}>
              {label}
            </Link>
          ))}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {allLocales.map((l) => (
              <Link key={l} href={localePath(l)} style={{
                fontFamily: 'var(--font-jost)', fontSize: '0.55rem', fontWeight: 300,
                letterSpacing: '0.15em', textDecoration: 'none',
                color: l === locale ? 'var(--color-sabze-gold)' : 'var(--color-sabze-stone)',
              }}>
                {localeLabels[l]}
              </Link>
            ))}
          </div>
          <Link href={`/${locale}/inquire`} className="btn-outline-gold">{labels.inquire}</Link>
        </div>
      </header>
    </>
  )
}
