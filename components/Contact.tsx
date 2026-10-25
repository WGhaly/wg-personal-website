'use client'

import { motion } from 'framer-motion'

export default function Contact() {
  return (
    <section id="contact" className="snap-section hero-glow relative min-h-screen flex items-center py-28 bg-black overflow-hidden">
      <div className="section-container w-full relative z-10 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-gold text-xs tracking-[0.35em] uppercase font-medium mb-6"
        >
          Get in touch
        </motion.p>
        <h2 className="font-serif font-bold text-white leading-none text-[clamp(56px,10vw,150px)]">
          {/* The observer watches the clipping wrapper: the word itself starts outside it and would never intersect. */}
          <motion.span initial="hidden" whileInView="shown" viewport={{ once: true }} className="block overflow-hidden">
            <motion.span
              variants={{ hidden: { y: '105%' }, shown: { y: 0 } }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              Let&apos;s talk.
            </motion.span>
          </motion.span>
        </h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-12 flex flex-col items-center gap-6"
        >
          <a href="mailto:waseemghaly@gmail.com" className="gold-underline text-xl sm:text-2xl md:text-4xl font-light text-white hover:text-gold transition-colors break-all">
            waseemghaly@gmail.com
          </a>
          <a
            href="https://www.linkedin.com/in/waseem-ghaly"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-white/60 hover:text-gold transition-colors tracking-wide"
          >
            LinkedIn ↗
          </a>
        </motion.div>
      </div>
    </section>
  )
}
