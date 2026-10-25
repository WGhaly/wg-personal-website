'use client'

import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

const ventures = [
  {
    name: 'Nin9',
    role: 'Founder',
    year: '2026',
    line: 'Real problems, real products, one engine.',
    url: 'https://nin9.org',
    domain: 'nin9.org',
    shot: '/media/ventures/nin9.jpg',
    video: '/media/nin9/preview.mp4',
  },
  {
    name: 'Progressio Solutions',
    role: 'Co-founder & shareholder',
    year: '2018',
    line: 'An invention lab taking Arab inventions to market.',
    url: 'https://progressiosolutions.com',
    domain: 'progressiosolutions.com',
    shot: '/media/ventures/progressio.jpg',
  },
  {
    name: 'Byit',
    role: 'Early co-founder · Advisory board',
    year: '2019',
    line: 'Real-estate brokers keep a fair share of every deal.',
    url: 'https://www.byitcorp.com',
    domain: 'byitcorp.com',
    shot: '/media/ventures/byit.jpg',
  },
]

/** A card lit by the cursor: a soft gold glow sits wherever the pointer is. */
function GlowCard({ children, href, label }: { children: React.ReactNode; href: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  return (
    <div
      ref={ref}
      onPointerMove={(e) => {
        const r = ref.current!.getBoundingClientRect()
        ref.current!.style.setProperty('--mx', `${e.clientX - r.left}px`)
        ref.current!.style.setProperty('--my', `${e.clientY - r.top}px`)
      }}
      className="glow-card group relative h-full rounded-xl border border-white/10 bg-white/[0.03] p-3 md:p-4 transition-all duration-500 hover:-translate-y-1 hover:border-gold/40"
    >
      {/* The whole card links to the site; buttons inside sit above this link. */}
      <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="absolute inset-0 z-10 rounded-xl" />
      {children}
    </div>
  )
}

/**
 * Desktop: card i fades and rises in during its own slice of the pinned section's scroll, finishing exactly at its
 * snap stop. Phones: each card fades in as it scrolls into view.
 */
function RevealCard({ index, progress, pinned, children }: { index: number; progress: MotionValue<number>; pinned: boolean; children: React.ReactNode }) {
  // Card i is fully in at its own snap stop (i screens into a 3-screen scroll); the last stop then holds for a screen.
  const end = index / 3
  const start = end - 0.2
  const opacity = useTransform(progress, [start, end], [0, 1])
  const y = useTransform(progress, [start, end], [80, 0])
  if (pinned && index > 0) return <motion.div style={{ opacity, y }}>{children}</motion.div>
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function Ventures() {
  const [videoOpen, setVideoOpen] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const [pinned, setPinned] = useState(false)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px) and (min-height: 640px) and (prefers-reduced-motion: no-preference)')
    const sync = () => setPinned(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  return (
    <section id="ventures" ref={sectionRef} className={`relative bg-black ${pinned ? 'h-[400vh]' : 'snap-section py-24'}`}>
      {/* Snap points: arriving, then one per extra company. */}
      {pinned && [0, 1, 2].map((i) => <div key={i} className="snap-section absolute inset-x-0 h-px" style={{ top: `${i * 100}vh` }} aria-hidden />)}
      <div className={pinned ? 'sticky top-0 h-screen flex items-center pt-16' : ''}>
      <div className="section-container w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 md:mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-4"
        >
          <div>
            <p className="text-gold text-xs tracking-[0.35em] uppercase font-medium mb-4">Founded</p>
            <h2 className="font-serif font-bold text-white text-4xl md:text-6xl leading-[1.05] max-w-[16ch]">
              Three companies, built from real problems.
            </h2>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {ventures.map((v, i) => (
            <RevealCard key={v.name} index={i} progress={scrollYProgress} pinned={pinned}>
              <GlowCard href={v.url} label={`${v.name}, ${v.domain}`}>
                {/* Browser frame */}
                <div className="relative overflow-hidden rounded-lg border border-white/10 bg-charcoal">
                  <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/10">
                    <span className="w-2 h-2 rounded-full bg-white/20" />
                    <span className="w-2 h-2 rounded-full bg-white/20" />
                    <span className="w-2 h-2 rounded-full bg-white/20" />
                    <span className="ml-3 text-[10px] text-white/40 truncate">{v.domain}</span>
                  </div>
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {v.video ? (
                      <video
                        src={v.video}
                        poster="/media/nin9/poster.jpg"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <Image
                        src={v.shot}
                        alt={`${v.name} website`}
                        fill
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />
                    )}
                  </div>
                </div>

                <div className="px-2 pt-6 pb-3">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-serif text-2xl md:text-3xl font-bold text-white group-hover:text-gold transition-colors">{v.name}</h3>
                    <span className="text-xs text-white/40 tabular-nums">{v.year}</span>
                  </div>
                  <p className="mt-1 text-sm text-gold/90">{v.role}</p>
                  <p className="mt-4 text-white/60 leading-relaxed">{v.line}</p>
                  <div className="mt-6 flex items-center justify-between text-sm">
                    <span className="text-white/70 group-hover:text-white transition-colors">{v.domain} ↗</span>
                    {v.video && (
                      <button
                        onClick={() => setVideoOpen(true)}
                        className="relative z-20 text-gold hover:text-gold-champagne"
                      >
                        ▶ Watch with sound
                      </button>
                    )}
                  </div>
                </div>
              </GlowCard>
            </RevealCard>
          ))}
        </div>
      </div>
      </div>

      {videoOpen && (
        <div
          onClick={() => setVideoOpen(false)}
          className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Nin9 in 80 seconds"
        >
          <div className="w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-end mb-3">
              <button onClick={() => setVideoOpen(false)} className="text-white/70 hover:text-gold text-sm">
                Close ✕
              </button>
            </div>
            <video controls autoPlay playsInline poster="/media/nin9/poster.jpg" className="w-full aspect-video bg-black border border-gold/30">
              <source src="/media/nin9/nin9-pitch.mp4" type="video/mp4" />
              <track kind="captions" src="/media/nin9/en.vtt" srcLang="en" label="English" />
            </video>
          </div>
        </div>
      )}
    </section>
  )
}
