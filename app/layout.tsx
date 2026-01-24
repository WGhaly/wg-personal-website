import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Waseem Ghaly - Nation Builder & Innovation Architect',
  description: 'Building Egypt\'s Innovation Economy from the Ground Up. Operations Director at NCTC | Co-Founder at Progressio Solutions',
  keywords: ['Innovation', 'Technology', 'Egypt', 'NCTC', 'Progressio', 'Entrepreneurship', 'R&D'],
  authors: [{ name: 'Waseem Ghaly' }],
  openGraph: {
    title: 'Waseem Ghaly - Nation Builder & Innovation Architect',
    description: 'Building Egypt\'s Innovation Economy from the Ground Up',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Waseem Ghaly - Nation Builder & Innovation Architect',
    description: 'Building Egypt\'s Innovation Economy from the Ground Up',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
