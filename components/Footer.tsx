'use client'

import { motion } from 'framer-motion'
import { scrollToSection } from '@/lib/utils'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { label: 'About', href: 'about' },
    { label: 'Experience', href: 'leadership' },
    { label: 'Expertise', href: 'expertise' },
    { label: 'Partners', href: 'clients' },
  ]

  const resources = [
    { label: 'Progressio Solutions', href: 'https://progressio.com', external: true },
    { label: 'Byit', href: '#', external: true },
    { label: 'NCTC', href: '#', external: true },
  ]

  return (
    <footer className="bg-black border-t border-white/10">
      <div className="section-container py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <div className="mb-6">
              <h3 className="text-3xl font-serif font-bold text-white mb-2">
                Waseem Ghaly
              </h3>
              <p className="text-gold text-sm tracking-wide">
                Nation Builder • Innovation Architect
              </p>
            </div>
            <p className="text-white/60 leading-relaxed mb-6">
              Co-founder, consultant, and operations leader. Investing in young talent and 
              supporting entrepreneurs building startups that transform the Middle East.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/in/waseem-ghaly"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-gold hover:text-black transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href="mailto:waseemghaly@gmail.com"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-gold hover:text-black transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-white/60 hover:text-gold transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4">Organizations</h4>
            <ul className="space-y-3">
              {resources.map((link) => (
                <li key={link.href}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/60 hover:text-gold transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-white/60 hover:text-gold transition-colors text-sm"
                    >
                      {link.label}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/40 text-sm">
              © {currentYear} Waseem Ghaly. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm text-white/40">
              <button className="hover:text-gold transition-colors">
                Privacy Policy
              </button>
              <button className="hover:text-gold transition-colors">
                Terms of Use
              </button>
            </div>
          </div>
        </div>

        {/* Decorative Tape Effect */}
        <div className="mt-8 relative h-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/20 to-transparent transform -skew-y-2" />
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-gold/40 text-xs tracking-[0.3em] uppercase font-medium">
              Building Egypt's Future
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
