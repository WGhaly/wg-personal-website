'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'

export default function Ventures() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [videoOpen, setVideoOpen] = useState(false)

  const ventures = [
    {
      name: 'Nin9',
      role: 'Founder',
      since: 'Since 2026',
      url: 'https://nin9.org',
      domain: 'nin9.org',
      description: 'A company that builds software for problems businesses actually have, all on one engine, and then opens that engine to everyone.',
      video: true,
    },
    {
      name: 'Progressio Solutions',
      role: 'Co-Founder & Shareholder',
      since: 'Since 2018',
      url: 'https://progressiosolutions.com',
      domain: 'progressiosolutions.com',
      description: 'An invention lab that helps Egyptian and Arab inventors take their ideas from lab to market.',
    },
    {
      name: 'Byit',
      role: 'Co-Founder',
      since: 'Since 2019',
      url: 'https://www.byitcorp.com',
      domain: 'byitcorp.com',
      description: 'A real-estate app that gives independent brokers and freelancers a fair share of every deal they close.',
    },
  ]

  return (
    <section id="ventures" ref={ref} className="py-24 md:py-32 bg-black">
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-gold text-sm tracking-[0.2em] uppercase font-medium mb-4">
            Ventures
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6">
            Companies I&apos;ve Founded
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
            Each one started from a real problem I saw up close
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {ventures.map((venture, index) => (
            <motion.div
              key={venture.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.15 }}
              className="group relative"
            >
              <div className="relative h-full p-8 md:p-10 bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-gold/40 transition-colors duration-500 backdrop-blur-sm overflow-hidden flex flex-col">
                {/* Shining border effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/20 to-transparent animate-shimmer" />
                </div>

                <div className="relative z-10 flex flex-col flex-1 space-y-6">
                  <span className="self-start px-3 py-1 bg-gold/15 text-gold text-xs font-medium tracking-wider uppercase rounded-full">
                    {venture.since}
                  </span>

                  <div>
                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-2">
                      {venture.name}
                    </h3>
                    <p className="text-gold font-medium">{venture.role}</p>
                  </div>

                  <p className="text-white/70 leading-relaxed flex-1">
                    {venture.description}
                  </p>

                  <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-x-6 gap-y-3">
                    <a
                      href={venture.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-white hover:text-gold transition-colors"
                    >
                      {venture.domain} ↗
                    </a>
                    {venture.video && (
                      <button
                        onClick={() => setVideoOpen(true)}
                        className="inline-flex items-center gap-2 text-sm text-gold hover:text-gold-champagne transition-colors"
                      >
                        <svg className="w-3 h-3" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                          <path d="M3 1.5v13l11-6.5z" />
                        </svg>
                        Watch the story
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Nin9 video */}
      <AnimatePresence>
        {videoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setVideoOpen(false)}
            className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Nin9 in 80 seconds"
          >
            <div className="w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-3">
                <p className="text-white/70 text-sm">Nin9 in 80 seconds</p>
                <button onClick={() => setVideoOpen(false)} className="text-white/70 hover:text-gold text-sm">
                  Close ✕
                </button>
              </div>
              <video controls autoPlay playsInline poster="/media/nin9/poster.jpg" className="w-full aspect-video bg-black border border-gold/30">
                <source src="/media/nin9/nin9-pitch.mp4" type="video/mp4" />
                <track kind="captions" src="/media/nin9/en.vtt" srcLang="en" label="English" />
              </video>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
