'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { scrollToSection } from '@/lib/utils'

const ventures = ['Nin9', 'Progressio Solutions', 'Byit']

/** Hero: falling gold beams behind the name, and the portrait in a gold-edged frame. */
export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const setCanvasSize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)

    // Thin gold beams falling down the screen, with a fading trail.
    const beams = Array.from({ length: 30 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      length: Math.random() * 200 + 100,
      speed: Math.random() * 2 + 1,
      angle: Math.random() * 0.2 - 0.1,
      opacity: Math.random() * 0.5 + 0.1,
    }))

    let raf = 0
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      for (const beam of beams) {
        beam.y += beam.speed
        beam.x += beam.angle
        if (beam.y > canvas.height + 100) {
          beam.y = -100
          beam.x = Math.random() * canvas.width
        }
        const gradient = ctx.createLinearGradient(beam.x, beam.y, beam.x, beam.y + beam.length)
        gradient.addColorStop(0, 'rgba(212, 175, 55, 0)')
        gradient.addColorStop(0.5, `rgba(212, 175, 55, ${beam.opacity})`)
        gradient.addColorStop(1, 'rgba(212, 175, 55, 0)')
        ctx.strokeStyle = gradient
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(beam.x, beam.y)
        ctx.lineTo(beam.x + beam.angle * beam.length, beam.y + beam.length)
        ctx.stroke()
      }
      raf = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', setCanvasSize)
    }
  }, [])

  return (
    <section id="hero" className="snap-section relative min-h-[100svh] flex items-center overflow-hidden bg-black pt-24 pb-16">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black z-0" aria-hidden />

      <div className="section-container relative z-10 grid md:grid-cols-12 gap-10 md:gap-8 items-center w-full">
        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-5 md:order-2 flex justify-center md:justify-end"
        >
          <div className="relative w-[min(72vw,400px)]">
            <div className="absolute -inset-3 border border-gold/30 translate-x-4 translate-y-4" aria-hidden />
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm shadow-[0_0_80px_rgba(212,175,55,0.15)]">
              <Image src="/portrait.jpg" alt="Waseem Ghaly" fill priority sizes="(min-width: 768px) 400px, 72vw" className="object-cover" />
            </div>
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
