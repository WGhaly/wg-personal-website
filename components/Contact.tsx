'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formState)
  }

  return (
    <section id="contact" ref={ref} className="py-24 md:py-32 bg-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gold rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gold-champagne rounded-full blur-3xl" />
      </div>

      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Side - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <p className="text-gold text-sm tracking-[0.2em] uppercase font-medium mb-4">
                Get In Touch
              </p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6">
                Let's Build Together
              </h2>
              <p className="text-xl text-white/70 leading-relaxed mb-6">
                Whether you're an entrepreneur building the next transformative startup, 
                a young talent looking for investment and mentorship, or an organization 
                seeking operational excellence—let's connect.
              </p>
              <p className="text-lg text-white/80 leading-relaxed">
                I'm passionate about investing in young talent and supporting entrepreneurs 
                who are building startups that transform the Middle East.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-6 pt-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white/50 text-sm mb-1">Email</p>
                  <a href="mailto:waseemghaly@gmail.com" className="text-white text-lg hover:text-gold transition-colors">
                    waseemghaly@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-white/50 text-sm mb-1">LinkedIn</p>
                  <a href="https://www.linkedin.com/in/waseem-ghaly" target="_blank" rel="noopener noreferrer" className="text-white text-lg hover:text-gold transition-colors">
                    linkedin.com/in/waseem-ghaly
                  </a>
                </div>
              </div>
            </div>

            {/* Key Areas */}
            <div className="pt-8 border-t border-white/10">
              <p className="text-white/50 text-sm mb-4">Areas of Collaboration:</p>
              <div className="flex flex-wrap gap-3">
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

          {/* Right Side - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="p-8 md:p-10 bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-white/70 text-sm mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-sm text-white placeholder-white/40 focus:outline-none focus:border-gold transition-colors"
                      placeholder="Your name"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-white/70 text-sm mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-sm text-white placeholder-white/40 focus:outline-none focus:border-gold transition-colors"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-white/70 text-sm mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      rows={6}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-sm text-white placeholder-white/40 focus:outline-none focus:border-gold transition-colors resize-none"
                      placeholder="Tell me about your project, partnership opportunity, or how we might collaborate..."
                      required
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-8 py-4 bg-gold text-black font-semibold text-lg rounded-sm hover:bg-gold-champagne transition-all duration-300 relative overflow-hidden group"
                  >
                    <span className="relative z-10">Send Message</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-gold via-gold-champagne to-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.button>
                </div>
              </div>
            </form>

            <p className="text-white/40 text-sm text-center mt-6">
              I typically respond within 24-48 hours
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
