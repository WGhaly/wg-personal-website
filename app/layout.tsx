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
  title: 'Waseem Ghaly - Founder & Consultant',
  description: 'Entrepreneur and consultant. Founder of Nin9, co-founder of Progressio Solutions and Byit. Operations, enterprise systems and new ventures.',
  keywords: ['Waseem Ghaly', 'Entrepreneur', 'Consultant', 'Operations', 'Nin9', 'Progressio', 'Byit', 'SAP', 'Salesforce', 'Celonis', 'Egypt'],
  authors: [{ name: 'Waseem Ghaly' }],
  openGraph: {
    title: 'Waseem Ghaly - Founder & Consultant',
    description: 'Building companies and helping others run better.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Waseem Ghaly - Founder & Consultant',
    description: 'Building companies and helping others run better.',
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
