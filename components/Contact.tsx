'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="contact" ref={ref} className="py-24 md:py-32 bg-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gold rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gold-champagne rounded-full blur-3xl" />
      </div>

      <div className="section-container relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <p className="text-gold text-sm tracking-[0.2em] uppercase font-medium mb-4 text-center">
                Get In Touch
              </p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 text-center">
                Let's Build Together
              </h2>
              <p className="text-xl text-white/70 leading-relaxed mb-6 text-center max-w-2xl mx-auto">
                Whether you're an entrepreneur building the next transformative startup, 
                a young talent looking for investment and mentorship, or an organization 
                seeking operational excellence—let's connect.
              </p>
              <p className="text-lg text-white/80 leading-relaxed text-center max-w-2xl mx-auto">
                I'm passionate about investing in young talent and supporting entrepreneurs 
                who are building startups that transform the Middle East.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="flex flex-col md:flex-row gap-8 pt-12 pb-8 justify-center max-w-2xl mx-auto">
              <div className="flex flex-col items-center text-center space-y-4 flex-1">
                <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center">
                  <svg className="w-7 h-7 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white/50 text-sm mb-2">Email</p>
                  <a href="mailto:waseemghaly@gmail.com" className="text-white text-lg hover:text-gold transition-colors break-all">
                    waseemghaly@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex flex-col items-center text-center space-y-4 flex-1">
                <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center">
                  <svg className="w-7 h-7 text-gold" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-white/50 text-sm mb-2">LinkedIn</p>
                  <a href="https://www.linkedin.com/in/waseem-ghaly" target="_blank" rel="noopener noreferrer" className="text-white text-lg hover:text-gold transition-colors">
                    waseem-ghaly
                  </a>
                </div>
              </div>
            </div>

            {/* Key Areas */}
            <div className="pt-8 border-t border-white/10 max-w-2xl mx-auto">
              <p className="text-white/50 text-sm mb-4 text-center">Areas of Collaboration:</p>
              <div className="flex flex-wrap gap-3 justify-center">
                {[
                  'Innovation Infrastructure',
                  'R&D Partnerships',
                  'Ecosystem Building',
                  'International Cooperation',
                  'Tech Transfer',
                  'Strategic Advisory'
                ].map((area, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-white/10 border border-white/20 rounded-full text-white/80 text-sm hover:border-gold hover:text-gold transition-all"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

}
