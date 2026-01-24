'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export default function Expertise() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const expertiseAreas = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
      title: "Business Process Optimization",
      description: "Leveraging process mining and analytics to drive operational improvements and strategic decision-making for enterprise clients.",
      examples: ["SAP implementation consulting", "Process mining leadership", "Data-driven operations"]
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Innovation & Entrepreneurship",
      description: "Building ventures from the ground up and scaling operations—understanding both the startup mindset and the discipline of sustainable growth.",
      examples: ["Co-founded Progressio Solutions", "Founded Byit", "Advisory board leadership"]
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      title: "Strategic Operations Management",
      description: "Ensuring ambitious programs don't just launch—they scale, sustain, and deliver measurable outcomes through disciplined execution.",
      examples: ["Director of Operations at NCTC", "Business operations leadership", "Multi-stakeholder coordination"]
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: "Technology Consulting",
      description: "Bridging business needs with technical solutions, from SAP implementations to process mining platforms and digital transformation initiatives.",
      examples: ["SAP Golden Partner consulting", "Process mining platforms", "Enterprise transformation"]
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Team Leadership & Development",
      description: "Building and leading high-performing teams across consulting, operations, and entrepreneurial ventures.",
      examples: ["Cross-functional team leadership", "Consultant development", "Organizational culture building"]
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "National-Level Initiatives",
      description: "Operating at the intersection of public mission and private sector efficiency to drive technology commercialization initiatives.",
      examples: ["NCTC operations leadership", "Public-private partnerships", "National strategy execution"]
    }
  ]

  return (
    <section id="expertise" ref={ref} className="py-24 md:py-32 bg-white">
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-gold text-sm tracking-[0.2em] uppercase font-medium mb-4">
            What I Bring to the Table
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-black mb-6">
            Core Expertise
          </h2>
          <p className="text-xl text-black/70 max-w-3xl mx-auto">
            A decade of hands-on experience building the systems, structures, and partnerships 
            that make innovation ecosystems work
          </p>
        </motion.div>

        {/* Expertise Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {expertiseAreas.map((area, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="h-full p-8 bg-white border border-black/10 hover:border-gold hover:shadow-xl transition-all duration-300">
                {/* Icon */}
                <div className="w-16 h-16 mb-6 bg-gold/10 rounded-full flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-black transition-all duration-300">
                  {area.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-serif font-bold text-black mb-4 group-hover:text-gold transition-colors">
                  {area.title}
                </h3>

                <p className="text-black/70 leading-relaxed mb-6">
                  {area.description}
                </p>

                {/* Examples */}
                <div className="space-y-2">
                  <p className="text-sm font-medium text-black/50 uppercase tracking-wider">
                    Key Achievements:
                  </p>
                  <ul className="space-y-1">
                    {area.examples.map((example, i) => (
                      <li key={i} className="text-sm text-black/60 flex items-start">
                        <span className="text-gold mr-2">•</span>
                        <span>{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Hover accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="max-w-4xl mx-auto p-8 md:p-12 bg-black text-white">
            <p className="text-lg md:text-xl font-light leading-relaxed">
              I don't just consult or advise—I <span className="text-gold font-semibold">build</span>. 
              Every expertise area above represents years of hands-on execution, not theory. 
              From enterprise consulting to founding ventures to leading national operations—
              it's all been about turning vision into <span className="text-gold font-semibold">reality</span>.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
