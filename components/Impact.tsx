'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useEffect } from 'react'
import React from 'react'

function Counter({ value, suffix = '', duration = 2 }: { value: number; suffix?: string; duration?: number }) {
  const [displayValue, setDisplayValue] = React.useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      let startTime: number | null = null
      const startValue = 0
      
      const animateCount = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
        
        setDisplayValue(Math.round(progress * value))
        
        if (progress < 1) {
          requestAnimationFrame(animateCount)
        }
      }
      
      requestAnimationFrame(animateCount)
    }
  }, [isInView, value, duration])

  return (
    <span ref={ref}>
      {displayValue}
      {suffix}
    </span>
  )
}

export default function Impact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const stats = [
    {
      value: 50,
      suffix: "M+",
      label: "In R&D Investments Facilitated",
      description: "Connecting innovators to capital across public and private sources"
    },
    {
      value: 16,
      suffix: "+",
      label: "Innovation Hubs Deployed",
      description: "Physical infrastructure across Egyptian universities"
    },
    {
      value: 500,
      suffix: "+",
      label: "Startups & Projects Supported",
      description: "From ideation to market entry and growth"
    },
    {
      value: 37,
      suffix: "+",
      label: "Partner Organizations",
      description: "Government, private sector, and international collaborations"
    },
    {
      value: 30,
      suffix: "M+",
      label: "In Innovation Infrastructure",
      description: "Labs, equipment, and facilities deployed nationwide"
    },
    {
      value: 10,
      suffix: "+",
      label: "Years of Experience",
      description: "Building Egypt's innovation ecosystem from the ground up"
    }
  ]

  return (
    <section id="impact" ref={ref} className="py-24 md:py-32 bg-black relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-gold-champagne/5" />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold-champagne/10 rounded-full blur-3xl"
        />
      </div>

      <div className="section-container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-gold text-sm tracking-[0.2em] uppercase font-medium mb-4">
            By The Numbers
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6">
            Measurable Impact
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            A decade of work quantified—because in innovation ecosystems, what gets measured gets built
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="h-full p-8 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-gold transition-all duration-300">
                {/* Number */}
                <div className="mb-4">
                  <div className="text-5xl md:text-6xl font-serif font-bold text-gold">
                    €<Counter value={stat.value} suffix={stat.suffix} />
                  </div>
                </div>

                {/* Label */}
                <h3 className="text-xl font-serif font-bold text-white mb-3">
                  {stat.label}
                </h3>

                {/* Description */}
                <p className="text-white/60 text-sm leading-relaxed">
                  {stat.description}
                </p>

                {/* Accent bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold to-gold-champagne transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Key Achievements Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <h3 className="text-3xl font-serif font-bold text-white text-center mb-12">
            Flagship Achievements
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 bg-gradient-to-br from-white/10 to-white/5 border border-white/10">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-serif font-bold text-white mb-2">
                    Egypt's First Private R&D Center
                  </h4>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Co-founded and operationalized the country's first private sector research and development facility—
                    proving that private innovation infrastructure could thrive in Egypt.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8 bg-gradient-to-br from-white/10 to-white/5 border border-white/10">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-serif font-bold text-white mb-2">
                    National Innovation Hub Network
                  </h4>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Led deployment of 16 university-based innovation hubs—creating distributed infrastructure 
                    that brought entrepreneurship support directly to students and researchers.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8 bg-gradient-to-br from-white/10 to-white/5 border border-white/10">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-serif font-bold text-white mb-2">
                    International Investment Facilitation
                  </h4>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Orchestrated partnerships that channeled €50M+ in R&D investments into Egyptian ventures—
                    connecting local innovation to European and international capital.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8 bg-gradient-to-br from-white/10 to-white/5 border border-white/10">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-serif font-bold text-white mb-2">
                    Tech Mission Orchestration
                  </h4>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Organized and led multiple international technology delegations—opening doors for Egyptian 
                    startups and researchers to access global markets, partners, and expertise.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-20 text-center"
        >
          <div className="inline-block px-8 py-4 border-t-2 border-b-2 border-gold">
            <p className="text-xl md:text-2xl font-light italic text-white">
              Numbers matter—but only if they represent real infrastructure, real opportunities, 
              and real capability built into Egypt's innovation ecosystem.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
