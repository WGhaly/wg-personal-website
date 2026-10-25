'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export default function Journey() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const milestones = [
    {
      year: "Oct 2018 - Present",
      title: "Turning Inventions Into Products",
      company: "Progressio Solutions",
      role: "Co-Founder · now a founding member & shareholder",
      description: "Co-founded an invention lab that helps Egyptian and Arab inventors take their ideas from lab to market. I built its operations from the ground up and remain a founding shareholder.",
      highlight: "Founded"
    },
    {
      year: "Jan 2019 - May 2021",
      title: "Business Process Excellence",
      company: "SOLEX (SAP Partner)",
      role: "Business Process Consultant",
      description: "Delivering business process optimization and SAP implementation expertise for enterprise clients across Egypt.",
      highlight: "Enterprise transformation consulting"
    },
    {
      year: "2019 - Present",
      title: "Fair Deals in Real Estate",
      company: "Byit",
      role: "Co-Founder",
      description: "Co-founded a real-estate app that gives independent brokers and freelancers a fair share of every deal they close.",
      highlight: "Founded"
    },
    {
      year: "May 2021 - Oct 2022",
      title: "Dual Consulting Leadership",
      company: "COBERG (Celonis & Salesforce Partner)",
      role: "Celonis Process Mining Consultant & Salesforce Sr. Success and Analysis Consultant (Lead)",
      description: "Led dual consulting roles in process mining and Salesforce analytics, driving data-driven operational improvements and CRM success strategies for enterprise clients.",
      highlight: "Dual-track consulting leadership"
    },
    {
      year: "2026 - Present",
      title: "Real Problems, Real Products",
      company: "Nin9",
      role: "Founder",
      description: "Founded Nin9 to build software for problems companies actually have, all on one engine, and to open that engine to everyone.",
      highlight: "Founded"
    }
  ]

  return (
    <section id="journey" ref={ref} className="py-24 md:py-32 bg-black relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gold via-transparent to-gold-champagne" />
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
            The Journey
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6">
            A Decade of Building
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
            From consultant to founder: the path that shaped my understanding of what it takes 
            to build companies that last
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gold via-gold-champagne to-gold transform md:-translate-x-1/2" />

            {/* Milestones */}
            <div className="space-y-16">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className={`relative flex flex-col md:flex-row items-start md:items-center ${
                    index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Content Card */}
                  <div className={`w-full md:w-[calc(50%-2rem)] ${
                    index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:pl-8'
                  } mb-4 md:mb-0`}>
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 md:p-8 hover:border-gold/30 transition-all duration-300 group">
                      <div className={`flex items-center space-x-3 mb-4 ${
                        index % 2 === 0 ? 'md:justify-end' : ''
                      }`}>
                        <span className="px-4 py-1 bg-gold/20 text-gold text-sm font-medium rounded-full">
                          {milestone.year}
                        </span>
                      </div>

                      <h3 className="text-2xl font-serif font-bold text-white mb-2">
                        {milestone.title}
                      </h3>
                      
                      <p className="text-gold font-medium mb-2">
                        {milestone.company}
                      </p>
                      
                      <p className="text-white/60 text-sm mb-4">
                        {milestone.role}
                      </p>
                      
                      <p className="text-white/80 leading-relaxed mb-4">
                        {milestone.description}
                      </p>

                      <div className={`flex items-center space-x-2 text-sm ${
                        index % 2 === 0 ? 'md:justify-end' : ''
                      }`}>
                        <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span className="text-gold">{milestone.highlight}</span>
                      </div>
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 flex items-center justify-center">
                    <div className="w-4 h-4 bg-gold rounded-full ring-8 ring-black" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center mt-20"
        >
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-8 italic font-light">
            Every role taught me something essential. Every challenge built the skills needed for the next leap. 
            And every success reinforced one truth: execution wins.
          </p>
          <p className="text-sm text-white/40 max-w-3xl mx-auto">
            Also served as Director of Operations at NCTC in 2025; the initiative has since stopped.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
