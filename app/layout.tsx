import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { JELLY_BOOT } from '@/components/jelly/motion-gate'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

const title = 'Waseem Ghaly · Founder of Nin9'
const description =
  'Waseem Ghaly is building Nin9, a company that turns real problems into real products on one engine, and consults companies on operations, enterprise systems and ventures.'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.waseemghaly.com'),
  title,
  description,
  keywords: ['Waseem Ghaly', 'Nin9', 'Nine', 'Consulting', 'Operations', 'SAP', 'Salesforce', 'Celonis', 'Egypt', 'GCC'],
  authors: [{ name: 'Waseem Ghaly' }],
  openGraph: { title, description, type: 'website', locale: 'en_US', images: ['/photo.jpeg'] },
  twitter: { card: 'summary_large_image', title, description },
}

export const viewport: Viewport = { themeColor: '#0B0B0C' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        {/* Sets data-jelly-mode before first paint, so stations don't flash gold and then switch off. */}
        <script dangerouslySetInnerHTML={{ __html: JELLY_BOOT }} />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
