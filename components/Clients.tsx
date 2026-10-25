import Image from 'next/image'

const logos = [
  { name: 'ADD-ME', logo: '/images/image.png' },
  { name: 'Ajeej Capital', logo: '/images/image copy.png' },
  { name: 'Medica', logo: '/images/image copy 2.png' },
  { name: 'National Drilling Company', logo: '/images/image copy 3.png' },
  { name: 'Oman Fasteners', logo: '/images/image copy 4.png' },
  { name: "L'Oréal", logo: '/images/image copy 5.png' },
  { name: 'MB Engineering Group', logo: '/images/image copy 6.png' },
  { name: 'Awad Capital', logo: '/images/image copy 7.png' },
  { name: 'Egypt Foods Group', logo: '/images/image copy 8.png' },
  { name: 'WLP', logo: '/images/image copy 9.png' },
  { name: 'Family Corp', logo: '/images/image copy 10.png' },
  { name: 'FluidTech', logo: '/images/image copy 11.png' },
  { name: 'SAMCO Egypt', logo: '/images/image copy 12.png' },
  { name: 'Dell', logo: '/images/image copy 13.png' },
  { name: 'DAMAC', logo: '/images/image copy 14.png' },
  { name: 'Selah El Telmeez', logo: '/images/image copy 15.png' },
  { name: 'Landkreditt Bank', logo: '/images/image copy 16.png' },
  { name: 'Mondelēz International', logo: '/images/image copy 17.png' },
  { name: 'RSA', logo: '/images/image copy 18.png' },
  { name: 'Cashew', logo: '/images/image copy 19.png' },
  { name: 'P&G', logo: '/images/image copy 20.png' },
  { name: 'World Health Organization', logo: '/images/image copy 21.png' },
  { name: 'Snoonu', logo: '/images/image copy 22.png' },
  { name: 'Aspire', logo: '/images/image copy 23.png' },
  { name: 'Othaim', logo: '/images/image copy 24.png' },
  { name: 'Redrock International', logo: '/images/image copy 25.png' },
  { name: 'Client', logo: '/images/image copy 26.png' },
  { name: 'Client', logo: '/images/image copy 27.png' },
  { name: 'Silicon21', logo: '/images/image copy 28.png' },
]

/** The logo wall: three rows drifting in alternating directions (pure CSS, pauses on hover). */
export default function Clients() {
  const rows = [logos.slice(0, 10), logos.slice(10, 20), logos.slice(20)]
  return (
    <section id="clients" className="snap-section min-h-screen flex flex-col justify-center py-20 md:py-28 bg-off-white overflow-hidden">
      <div className="section-container mb-12 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-3">
        <div>
          <p className="text-gold-bronze text-xs tracking-[0.35em] uppercase font-medium mb-4">Worked with</p>
          <h2 className="font-serif font-bold text-black text-4xl md:text-5xl">Companies I&apos;ve worked with</h2>
        </div>
        <p className="text-black/50 text-sm md:text-base">From global brands to fast-growing regional players.</p>
      </div>

      <div className="space-y-3 md:space-y-4 marquee-mask">
        {rows.map((row, r) => (
          <div key={r} className="marquee">
            <div className={`marquee-track ${r % 2 === 1 ? 'marquee-reverse' : ''}`}>
              {[...row, ...row].map((logo, i) => (
                <div key={`${logo.logo}-${i}`} className="relative flex-none w-[104px] h-14 mx-1.5 md:w-44 md:h-24 md:mx-2.5 rounded-lg bg-white border border-black/5">
                  <Image
                    src={logo.logo}
                    alt={i < row.length ? logo.name : ''}
                    aria-hidden={i >= row.length}
                    fill
                    sizes="(min-width: 768px) 176px, 104px"
                    className="object-contain p-2.5 md:p-4 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
