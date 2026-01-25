'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export default function DualLeadership() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="leadership" ref={ref} className="py-24 md:py-32 bg-black">
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-gold text-sm tracking-[0.2em] uppercase font-medium mb-4">
            Current Roles
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6">
            Professional Focus Areas
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
            Contributing to innovation initiatives across public institutions, private ventures, and entrepreneurial programs
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* NCTC Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="group relative"
          >
            <div className="relative h-full p-8 md:p-10 bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-sm overflow-hidden">
              {/* Shining border effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/20 to-transparent animate-shimmer" />
              </div>

              {/* Content */}
              <div className="relative z-10 space-y-6">
                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>

                <div>
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-2">
                    Director of Operations
                  </h3>
                  <p className="text-gold font-medium">National Center of Technology Commercialization (NCTC)</p>
                </div>

                <div className="space-y-4 text-white/70">
                  <p className="leading-relaxed">
                    Managing operational functions at a national technology commercialization center, 
                    supporting initiatives that connect research, innovation, and market opportunities.
                  </p>
                  
                  <div className="space-y-2 pt-4">
                    <p className="text-sm font-medium text-white">Key Responsibilities:</p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="text-gold mr-2">•</span>
                        <span>Strategic operations management and organizational excellence</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-gold mr-2">•</span>
                        <span>Technology commercialization and market readiness programs</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-gold mr-2">•</span>
                        <span>Cross-sector partnerships and stakeholder engagement</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-gold mr-2">•</span>
                        <span>Research-to-market pathways and IP strategy</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <p className="text-sm text-white/50">Public Sector Leadership</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Progressio Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="group relative"
          >
            <div className="relative h-full p-8 md:p-10 bg-gradient-to-br from-gold/10 to-gold/[0.02] border border-gold/20 backdrop-blur-sm overflow-hidden">
              {/* Shining border effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/30 to-transparent animate-shimmer" />
              </div>

              {/* Content */}
              <div className="relative z-10 space-y-6">
                <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>

                <div>
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-2">
                    Co-Founder & Director of Business Operations
                  </h3>
                  <p className="text-gold font-medium">Progressio Solutions</p>
                </div>

                <div className="space-y-4 text-white/70">
                  <p className="leading-relaxed">
                    Co-founded and built Progressio Solutions, creating the infrastructure and platforms 
                    that turn research into commercial success and connect innovators to global markets.
                  </p>
                  
                  <div className="space-y-2 pt-4">
                    <p className="text-sm font-medium text-white">Core Focus Areas:</p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="text-gold mr-2">•</span>
                        <span>Private R&D center operations and commercialization</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-gold mr-2">•</span>
                        <span>Innovation hub development and ecosystem building</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-gold mr-2">•</span>
                        <span>International partnerships and market access</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-gold mr-2">•</span>
                        <span>Startup acceleration and investor relations</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <p className="text-sm text-white/50">Private Sector Innovation</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center px-4"
        >
          <p className="text-lg md:text-xl lg:text-2xl text-white/80 max-w-4xl mx-auto italic font-light">
            "Operating at the intersection of national mission and entrepreneurial execution—
            where sustainable innovation ecosystems are built."
          </p>
        </motion.div>
      </div>
    </section>
  )
}
