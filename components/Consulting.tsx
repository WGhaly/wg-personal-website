'use client'

import { motion } from 'framer-motion'

const services = [
  { name: 'Operations & process', icon: 'M4 6h16M4 12h10M4 18h6' },
  { name: 'Process mining', icon: 'M3 17l6-6 4 4 8-8M15 7h6v6' },
  { name: 'SAP & Salesforce', icon: 'M4 7a8 3 0 0016 0 8 3 0 00-16 0zm0 0v10a8 3 0 0016 0V7M4 12a8 3 0 0016 0' },
  { name: 'New ventures', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
]

const experience = [
  { org: 'COBERG', what: 'Celonis & Salesforce partner', role: 'Process mining & Salesforce lead', years: '2021–22' },
  { org: 'SOLEX', what: 'SAP partner', role: 'Business process consultant', years: '2019–21' },
]

export default function Consulting() {
  return (
    <section id="consulting" className="relative py-24 md:py-36 bg-charcoal-dark border-t border-white/5">
      <div className="section-container grid md:grid-cols-2 gap-14 md:gap-20 items-start">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-gold text-xs tracking-[0.35em] uppercase font-medium mb-4">Consulting</p>
          <h2 className="font-serif font-bold text-white text-4xl md:text-6xl leading-[1.05]">
            I help companies run better.
          </h2>
          <div className="mt-10 grid grid-cols-2 gap-3">
            {services.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.08 }}
                className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-4 hover:border-gold/40 transition-colors"
              >
                <svg className="w-5 h-5 flex-none text-gold" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d={s.icon} />
                </svg>
                <span className="text-sm md:text-base text-white/85">{s.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="md:pt-24"
        >
          <p className="text-white/40 text-xs tracking-[0.35em] uppercase font-medium mb-6">Where I learned it</p>
          <ul className="border-t border-white/10">
            {experience.map((e) => (
              <li key={e.org} className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 py-6 border-b border-white/10">
                <span className="font-serif text-2xl md:text-3xl font-bold text-white">{e.org}</span>
                <span className="text-sm text-white/40 tabular-nums self-center">{e.years}</span>
                <span className="col-span-2 text-sm text-white/60">
                  <span className="text-gold/90">{e.what}</span> · {e.role}
                </span>
              </li>
            ))}
            <li className="py-4 text-xs text-white/30">NCTC · Director of Operations, 2025 · initiative since stopped</li>
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
