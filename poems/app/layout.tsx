import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_NAME, SITE_URL } from '@/lib/poems'
import './globals.css'

export const metadata: Metadata = {
  ...(SITE_URL ? { metadataBase: new URL(SITE_URL) } : {}),
  title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
  description: 'Perzische gedichten en uitspraken met Nederlandse vertaling en toelichting.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400&family=Vazirmatn:wght@200;300;400&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body>
        <header className="site-header">
          <Link href="/">{SITE_NAME}</Link>
        </header>
        <main>{children}</main>
        <footer className="site-footer">
          <span>Perzische poëzie · Nederlandse vertaling en toelichting</span>
        </footer>
      </body>
    </html>
  )
}
