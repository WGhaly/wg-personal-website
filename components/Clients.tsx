'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

export default function Clients() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  // Partner logos - using the actual files from the Images folder
  const partners = [
    { name: 'ASRT', logo: '/images/asrt-logo.png' },
    { name: 'Ministry', logo: '/images/ministry-logo.png' },
    { name: 'ISF', logo: '/images/isf-logo.png' },
    { name: 'Partner 1', logo: '/images/image.png' },
    { name: 'Partner 2', logo: '/images/image copy.png' },
    { name: 'Partner 3', logo: '/images/image copy 2.png' },
    { name: 'Partner 4', logo: '/images/image copy 3.png' },
    { name: 'Partner 5', logo: '/images/image copy 4.png' },
    { name: 'Partner 6', logo: '/images/image copy 5.png' },
    { name: 'Partner 7', logo: '/images/image copy 6.png' },
    { name: 'Partner 8', logo: '/images/image copy 7.png' },
    { name: 'Partner 9', logo: '/images/image copy 8.png' },
    { name: 'Partner 10', logo: '/images/image copy 9.png' },
    { name: 'Partner 11', logo: '/images/image copy 10.png' },
    { name: 'Partner 12', logo: '/images/image copy 11.png' },
    { name: 'Partner 13', logo: '/images/image copy 12.png' },
    { name: 'Partner 14', logo: '/images/image copy 13.png' },
    { name: 'Partner 15', logo: '/images/image copy 14.png' },
    { name: 'Partner 16', logo: '/images/image copy 15.png' },
    { name: 'Partner 17', logo: '/images/image copy 16.png' },
    { name: 'Partner 18', logo: '/images/image copy 17.png' },
    { name: 'Partner 19', logo: '/images/image copy 18.png' },
    { name: 'Partner 20', logo: '/images/image copy 19.png' },
    { name: 'Partner 21', logo: '/images/image copy 20.png' },
    { name: 'Partner 22', logo: '/images/image copy 21.png' },
    { name: 'Partner 23', logo: '/images/image copy 22.png' },
    { name: 'Partner 24', logo: '/images/image copy 23.png' },
    { name: 'Partner 25', logo: '/images/image copy 24.png' },
    { name: 'Partner 26', logo: '/images/image copy 25.png' },
    { name: 'Partner 27', logo: '/images/image copy 26.png' },
    { name: 'Partner 28', logo: '/images/image copy 27.png' },
    { name: 'Partner 29', logo: '/images/image copy 28.png' },
  ]

  // Split into rows for the floating animation
  const row1 = partners.slice(0, 10)
  const row2 = partners.slice(10, 20)
  const row3 = partners.slice(20)

  return (
    <section id="clients" ref={ref} className="py-24 md:py-32 bg-white overflow-hidden">
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-gold text-sm tracking-[0.2em] uppercase font-medium mb-4">
            Trusted Partners
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-black mb-6">
            Building Together
          </h2>
          <p className="text-xl text-black/70 max-w-3xl mx-auto">
            Collaborating with leading government institutions, international organizations, 
            and private sector partners to build Egypt's innovation ecosystem
          </p>
        </motion.div>
      </div>

      {/* Floating Logo Rows */}
      <div className="space-y-8">
        {/* Row 1 - Move Left */}
        <motion.div
          animate={{
            x: [0, -1000],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
          className="flex space-x-12"
        >
          {[...row1, ...row1, ...row1].map((partner, index) => (
            <div
              key={`row1-${index}`}
              className="flex-shrink-0 w-40 h-24 bg-white border border-black/10 rounded-lg p-4 flex items-center justify-center hover:border-gold hover:shadow-lg transition-all duration-300"
            >
              <div className="relative w-full h-full">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            </div>
          ))}
        </motion.div>

        {/* Row 2 - Move Right */}
        <motion.div
          animate={{
            x: [-1000, 0],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
          className="flex space-x-12"
        >
          {[...row2, ...row2, ...row2].map((partner, index) => (
            <div
              key={`row2-${index}`}
              className="flex-shrink-0 w-40 h-24 bg-white border border-black/10 rounded-lg p-4 flex items-center justify-center hover:border-gold hover:shadow-lg transition-all duration-300"
            >
              <div className="relative w-full h-full">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            </div>
          ))}
        </motion.div>

        {/* Row 3 - Move Left */}
        <motion.div
          animate={{
            x: [0, -1000],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 25,
              ease: "linear",
            },
          }}
          className="flex space-x-12"
        >
          {[...row3, ...row3, ...row3, ...row3].map((partner, index) => (
            <div
              key={`row3-${index}`}
              className="flex-shrink-0 w-40 h-24 bg-white border border-black/10 rounded-lg p-4 flex items-center justify-center hover:border-gold hover:shadow-lg transition-all duration-300"
            >
              <div className="relative w-full h-full">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Partner Categories */}
      <div className="section-container mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid md:grid-cols-3 gap-8"
        >
          <div className="text-center p-8 bg-black/5 border-t-4 border-gold">
            <h3 className="text-2xl font-serif font-bold text-black mb-3">
              Government & Public Sector
            </h3>
            <p className="text-black/60 text-sm">
              Ministries, research centers, and national innovation agencies
            </p>
          </div>
          <div className="text-center p-8 bg-black/5 border-t-4 border-gold">
            <h3 className="text-2xl font-serif font-bold text-black mb-3">
              International Organizations
            </h3>
            <p className="text-black/60 text-sm">
              EU partnerships, development agencies, and global tech networks
            </p>
          </div>
          <div className="text-center p-8 bg-black/5 border-t-4 border-gold">
            <h3 className="text-2xl font-serif font-bold text-black mb-3">
              Private Sector & Academia
            </h3>
            <p className="text-black/60 text-sm">
              Corporations, universities, and industry associations
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
