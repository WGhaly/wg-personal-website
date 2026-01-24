'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { scrollToSection } from '@/lib/utils'

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)

    // Beam animation
    class Beam {
      x: number
      y: number
      length: number
      speed: number
      angle: number
      opacity: number

      constructor() {
        this.x = Math.random() * (canvas?.width || 1920)
        this.y = -100
        this.length = Math.random() * 200 + 100
        this.speed = Math.random() * 2 + 1
        this.angle = Math.random() * 0.2 - 0.1
        this.opacity = Math.random() * 0.5 + 0.1
      }

      update() {
        this.y += this.speed
        this.x += this.angle
        
        if (this.y > (canvas?.height || 1080) + 100) {
          this.y = -100
          this.x = Math.random() * (canvas?.width || 1920)
        }
      }

      draw() {
        if (!ctx) return
        
        const gradient = ctx.createLinearGradient(this.x, this.y, this.x, this.y + this.length)
        gradient.addColorStop(0, `rgba(212, 175, 55, 0)`)
        gradient.addColorStop(0.5, `rgba(212, 175, 55, ${this.opacity})`)
        gradient.addColorStop(1, `rgba(212, 175, 55, 0)`)
        
        ctx.strokeStyle = gradient
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(this.x, this.y)
        ctx.lineTo(this.x + this.angle * this.length, this.y + this.length)
        ctx.stroke()
      }
    }

    const beams: Beam[] = []
    for (let i = 0; i < 30; i++) {
      beams.push(new Beam())
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      beams.forEach(beam => {
        beam.update()
        beam.draw()
      })
      
      requestAnimationFrame(animate)
    }
    
    animate()

    return () => {
      window.removeEventListener('resize', setCanvasSize)
    }
  }, [])

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Animated Beams Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black z-10" />

      {/* Content */}
      <div className="section-container relative z-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-8"
        >
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gold text-sm md:text-base tracking-[0.3em] uppercase font-medium"
          >
            Nation Builder • Innovation Architect
          </motion.p>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-bold text-white leading-tight px-4"
          >
            Waseem <span className="gradient-text">Ghaly</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 max-w-4xl mx-auto font-light leading-relaxed px-4"
          >
            Building Egypt's Innovation Economy from the Ground Up
          </motion.p>

          {/* Role Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-wrap justify-center gap-4 pt-4"
          >
            <div className="px-6 py-3 bg-gold/20 backdrop-blur-md border border-gold/40 rounded-full">
              <p className="text-white text-sm md:text-base font-semibold">
                Co-Founder @ <span className="text-gold">Progressio Solutions</span>
              </p>
            </div>
            <div className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
              <p className="text-white text-sm md:text-base">
                Co-Founder @ <span className="text-gold font-semibold">Byit</span>
              </p>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('about')}
              className="px-10 py-4 bg-gold text-black font-semibold text-lg rounded-sm hover:bg-gold-champagne transition-all duration-300 shadow-lg hover:shadow-gold/50"
            >
              Discover My Journey
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('contact')}
              className="px-10 py-4 border-2 border-white text-white font-semibold text-lg rounded-sm hover:bg-white hover:text-black transition-all duration-300"
            >
              Let's Connect
            </motion.button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2"
            >
              <motion.div
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-1.5 h-1.5 bg-gold rounded-full"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
