import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'SABZE — Fine Art · The Hague',
    template: '%s | SABZE',
  },
  description:
    'Mixed media paintings by SABZE — gold leaf, impasto, mineral pigment. Based in The Hague, Netherlands. Available for acquisition and commission.',
  keywords: ['SABZE', 'fine art', 'mixed media', 'gold leaf', 'impasto', 'The Hague', 'abstract painting'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'SABZE Fine Art',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Jost:wght@200;300;400;500&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/favicon.svg" />
      </head>
      <body>{children}</body>
    </html>
  )
}
