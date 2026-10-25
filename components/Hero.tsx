'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { scrollToSection } from '@/lib/utils'

const ventures = ['Nin9', 'Progressio Solutions', 'Byit']

/**
 * The signature: a gold spotlight. The portrait sits in the dark; a warm light follows the cursor and reveals it.
 * Without a fine pointer (phones) or after a moment of stillness, the light drifts on its own.
 */
export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const hero = heroRef.current
    const frame = frameRef.current
    if (!hero || !frame) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let target = { x: 0.5, y: 0.35 }
    const light = { x: 0.5, y: 0.35 }
    let lastMove = 0
    let raf = 0

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      const r = frame.getBoundingClientRect()
      target = { x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height }
      const h = hero.getBoundingClientRect()
      hero.style.setProperty('--hx', `${e.clientX - h.left}px`)
      hero.style.setProperty('--hy', `${e.clientY - h.top}px`)
      lastMove = performance.now()
    }

    const tick = (t: number) => {
      if (t - lastMove > 2500) {
        // Idle drift: a slow figure-eight over the face.
        target = { x: 0.5 + Math.sin(t / 2600) * 0.28, y: 0.38 + Math.sin(t / 1300) * 0.14 }
      }
      light.x += (target.x - light.x) * 0.08
      light.y += (target.y - light.y) * 0.08
      frame.style.setProperty('--x', `${light.x * 100}%`)
      frame.style.setProperty('--y', `${light.y * 100}%`)
      raf = requestAnimationFrame(tick)
    }

    if (reduced) {
      frame.style.setProperty('--x', '50%')
      frame.style.setProperty('--y', '35%')
      frame.style.setProperty('--r', '75%')
    } else {
      hero.addEventListener('pointermove', onMove)
      raf = requestAnimationFrame(tick)
    }
    return () => {
      hero.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section id="hero" ref={heroRef} className="hero-glow relative min-h-[100svh] flex items-center overflow-hidden bg-black pt-24 pb-16">
      <div className="section-container relative z-10 grid md:grid-cols-12 gap-10 md:gap-8 items-center w-full">
        {/* Portrait in the spotlight */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-5 md:order-2 flex justify-center md:justify-end"
        >
          <div ref={frameRef} className="spotlight relative w-[min(78vw,420px)] aspect-[4/5] overflow-hidden rounded-sm border border-white/10">
            <Image src="/photo.jpeg" alt="Waseem Ghaly" fill priority sizes="(min-width: 768px) 420px, 78vw" className="spotlight-base object-cover" />
            <Image src="/photo.jpeg" alt="" aria-hidden fill sizes="(min-width: 768px) 420px, 78vw" className="spotlight-lit object-cover" />
            <div className="spotlight-glow absolute inset-0" aria-hidden />
          </div>
        </motion.div>

        {/* Name and one line */}
        <div className="md:col-span-7 md:order-1 text-center md:text-left">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-gold text-xs md:text-sm tracking-[0.35em] uppercase font-medium mb-6"
          >
            Entrepreneur · Consultant
          </motion.p>
          <h1 className="font-serif font-bold text-white leading-[0.95] tracking-tight text-[clamp(56px,9vw,140px)]">
            {['Waseem', 'Ghaly'].map((word, i) => (
              <span key={word} className="block overflow-hidden">
                <motion.span
                  initial={{ y: '105%' }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.4 + i * 0.12, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className={`block ${i === 1 ? 'gradient-text' : ''}`}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="mt-8 text-xl md:text-2xl text-white/80 font-light"
          >
            I build companies, and help others run better.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-10 flex flex-wrap gap-3 justify-center md:justify-start"
          >
            {ventures.map((name) => (
              <button
                key={name}
                onClick={() => scrollToSection('ventures')}
                className="px-5 py-2.5 rounded-full border border-white/15 bg-white/5 text-sm text-white/80 hover:border-gold/60 hover:text-gold transition-colors"
              >
                {name}
              </button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:block"
        aria-hidden
      >
        <div className="w-px h-14 bg-gradient-to-b from-gold to-transparent animate-pulse" />
      </motion.div>
    </section>
  )
}
