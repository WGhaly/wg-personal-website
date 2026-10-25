'use client'

import { useEffect, useState } from 'react'
import { scrollToSection } from '@/lib/utils'

const navItems = [
  { label: 'Ventures', href: 'ventures' },
  { label: 'Consulting', href: 'consulting' },
  { label: 'Clients', href: 'clients' },
]

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-black/80 backdrop-blur-md py-3 border-b border-white/5' : 'bg-transparent py-6'
      }`}
    >
      <div className="section-container flex items-center justify-between">
        <button onClick={() => scrollToSection('hero')} className="font-serif text-2xl font-bold text-white">
          WG
        </button>
        <div className="flex items-center gap-1 md:gap-2">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollToSection(item.href)}
              className="hidden md:block px-4 py-2 text-sm text-white/70 hover:text-gold transition-colors"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => scrollToSection('contact')}
            className="ml-2 px-5 py-2 border border-gold/60 text-gold text-sm font-medium rounded-full hover:bg-gold hover:text-black transition-all duration-300"
          >
            Let&apos;s talk
          </button>
        </div>
      </div>
    </nav>
  )
}
