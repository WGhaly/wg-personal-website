'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export default function BiggerPicture() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const principles = [
    {
      number: "01",
      title: "Infrastructure First",
      description: "Innovation doesn't happen in a vacuum—it requires physical spaces, funding mechanisms, regulatory frameworks, and talent pipelines."
    },
    {
      number: "02",
      title: "Execution Over Theory",
      description: "Egypt has no shortage of vision documents and strategic plans. What it lacks is people who roll up their sleeves and build."
    },
    {
      number: "03",
      title: "Global Connection",
      description: "Egypt's innovators shouldn't have to leave to succeed. My job is to bring the world's opportunities to them."
    },
    {
      number: "04",
      title: "Sustainable Impact",
      description: "Building an innovation economy is a marathon, not a sprint. Every project must create lasting infrastructure and capability."
    }
  ]

  return (
    <section id="vision" ref={ref} className="py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gold rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold-champagne rounded-full blur-3xl" />
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
            The Bigger Picture
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-black mb-6">
            Why This Work Matters
          </h2>
        </motion.div>

        {/* Main Vision Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-5xl mx-auto mb-20 px-4"
        >
          <div className="bg-black text-white p-8 sm:p-10 md:p-12 lg:p-16 relative">
            {/* Quote mark */}
            <div className="absolute top-4 sm:top-8 left-4 sm:left-8 text-gold opacity-30 text-6xl sm:text-7xl md:text-8xl font-serif leading-none">
              "
            </div>
            
            <div className="relative z-10 space-y-6 text-base sm:text-lg md:text-xl leading-relaxed">
              <p>
                Egypt has 105 million people—one of the youngest, most dynamic populations in the world. 
                But without a thriving innovation economy, that energy has nowhere productive to go.
              </p>
              <p>
                Entrepreneurs need more than motivation—they need operational frameworks, market access, 
                and sustainable business models. Organizations need more than strategy—they need execution discipline, 
                measurable outcomes, and continuous improvement.
              </p>
              <p className="text-gold font-medium text-xl sm:text-2xl">
                My mission: Build bridges between ideas and execution, between vision and impact, 
                between Egypt's talent and global opportunities.
              </p>
            </div>

            {/* Gold accent line */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold via-gold-champagne to-gold" />
          </div>
        </motion.div>

        {/* Core Principles Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h3 className="text-2xl md:text-3xl font-serif font-bold text-center mb-12">
            Core Principles That Guide My Work
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            {principles.map((principle, index) => (
              <motion.div
                key={principle.number}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="group relative"
              >
                <div className="h-full p-8 border-l-4 border-gold bg-black/5 hover:bg-black hover:text-white transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <span className="text-5xl font-serif font-bold text-gold/30 group-hover:text-gold transition-colors">
                      {principle.number}
                    </span>
                    <div className="flex-1 space-y-3">
                      <h4 className="text-xl font-serif font-bold">
                        {principle.title}
                      </h4>
                      <p className="text-sm leading-relaxed opacity-80">
                        {principle.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Closing Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="text-center max-w-3xl mx-auto px-4"
        >
          <div className="inline-block px-6 sm:px-8 py-4 border-t-2 border-b-2 border-gold">
            <p className="text-lg sm:text-xl md:text-2xl font-light italic text-black">
              This work is about leaving Egypt's innovation ecosystem stronger, 
              more connected, and more capable than I found it.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
