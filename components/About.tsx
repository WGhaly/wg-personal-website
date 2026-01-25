'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  return (
    <section id="about" ref={ref} className="py-24 md:py-32 bg-white">
      <div className="section-container">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Photo Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              {/* Gold accent border */}
              <div className="absolute -inset-2 bg-gradient-to-br from-gold via-gold-champagne to-gold-light opacity-20 blur-xl" />
              
              <div className="relative h-full bg-black">
                <Image
                  src="/photo.jpeg"
                  alt="Waseem Ghaly"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  priority
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
            </div>

            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 border-2 border-gold/30 -z-10" />
          </motion.div>

          {/* Content Side */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-8"
          >
            <motion.div variants={itemVariants}>
              <p className="text-gold text-sm tracking-[0.2em] uppercase font-medium mb-4">
                About Me
              </p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-black">
                Background & Approach
              </h2>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6 text-base md:text-lg text-black/80 leading-relaxed">
              <p>
                I'm <span className="font-semibold text-black">Waseem Ghaly</span>, an entrepreneur and operations professional 
                focused on building sustainable businesses and supporting Egypt's innovation ecosystem.
              </p>

              <p>
                Through ventures like Progressio and Byit, alongside operational roles at national institutions, 
                I've worked to develop practical infrastructure and frameworks that help entrepreneurs succeed.
              </p>

              <p>
                My approach emphasizes execution over theory—implementing operational systems, 
                facilitating market access, and providing hands-on support for growing ventures.
              </p>

              <p className="text-lg md:text-xl font-medium text-black pt-4">
                Currently, I focus on advising early-stage startups and contributing to programs 
                that strengthen entrepreneurship in the region.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
