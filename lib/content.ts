/**
 * Every word on the home page, in one place. Order follows the scroll story (lib/jelly/stations.ts).
 * Honesty rule (same as nin9.org): no invented numbers, clients or claims. Nin9 is in phase 1; nothing is live yet.
 */

export const LINKS = {
  email: 'waseemghaly@gmail.com',
  linkedin: 'https://www.linkedin.com/in/waseem-ghaly',
  nin9: 'https://nin9.org',
}

/** The rail: one entry per chapter, pointing at the first station the liquid forms in it. */
export const CHAPTERS = [
  { key: 'hello', label: 'Hello', station: 'wg-mark', anchor: 'hello' },
  { key: 'nin9', label: 'Building Nin9', station: 'nin9-frame', anchor: 'nin9' },
  { key: 'plan', label: 'The plan', station: 'plan-phases', anchor: 'plan' },
  { key: 'consulting', label: 'Consulting', station: 'consulting-areas', anchor: 'consulting' },
  { key: 'journey', label: 'Journey', station: 'journey-word', anchor: 'journey' },
  { key: 'clients', label: 'Worked with', station: 'clients-word', anchor: 'clients' },
  { key: 'principles', label: 'How I work', station: 'execution', anchor: 'principles' },
  { key: 'contact', label: 'Contact', station: 'contact-email', anchor: 'contact' },
]

export const HERO = {
  eyebrow: 'Founder · Consultant',
  name: 'Waseem Ghaly',
  subA: "I'm building",
  subWord: 'Nin9',
  subB: ', a company that turns real problems into real products on one engine. Alongside it, I help companies run better.',
  watch: 'Watch the Nin9 story',
  contact: 'Work with me',
}

export const NIN9 = {
  label: "What I'm building now",
  title: 'Nin9: real problems, real products, one engine.',
  body: 'Every business idea waits for developers. Nin9 builds software for problems companies actually have, all on one engine, and then hands that engine to everyone.',
  role: 'Founder & CEO',
  visit: 'Visit nin9.org',
  videoNote: '80 seconds · English narration, Arabic subtitles',
}

export const PLAN = {
  label: 'The plan',
  title: 'Three phases, one engine.',
  body: 'Each phase pays for and proves the next.',
  phases: [
    {
      tag: 'Now',
      name: 'Solve',
      body: 'Real tools for problems companies have. Nine Marketing and Nine Recruitment are the first two, being built now.',
    },
    {
      tag: 'Next',
      name: 'nin9 Dev',
      body: 'The engine opens up, so business people build real products without a development or IT team.',
    },
    {
      tag: 'Later',
      name: 'Studio',
      body: 'More companies, run by young entrepreneurs we back, and Cpinoffs: community spinoffs funded by the profits.',
    },
  ],
}

export const CONSULTING = {
  label: 'Consulting',
  title: 'I help companies run better.',
  body: 'Alongside Nin9, I take on a small number of engagements where my experience is a real fit.',
  areas: [
    {
      name: 'Operations & process',
      body: 'Find where work stalls and fix it, with process mining and plain operational discipline.',
    },
    {
      name: 'Enterprise systems',
      body: 'SAP and Salesforce that match how the business actually runs, not the other way round.',
    },
    {
      name: 'AI-first building',
      body: 'Internal tools and products built lean, with AI doing the heavy lifting. It is how I build every day.',
    },
    {
      name: 'Ventures in the region',
      body: 'Setting up, structuring and operating new ventures and market entries in Egypt and the GCC.',
    },
  ],
}

export const JOURNEY = {
  label: 'Journey',
  titleA: 'A decade of',
  titleWord: 'building',
  titleB: '.',
  body: 'Consulting taught me how companies really run. Founding taught me what it takes to start one.',
  roles: [
    { when: 'Now', org: 'Nin9', role: 'Founder & CEO' },
    { when: 'Now', org: 'Independent', role: 'Consultant: operations, systems and ventures' },
    {
      when: 'Since 2018',
      org: 'Progressio Solutions',
      role: 'Co-founder',
      note: 'Founding member and shareholder; no longer in day-to-day management.',
    },
    { when: 'Since 2019', org: 'Byit', role: 'Co-founder' },
    { when: '2021 – 2022', org: 'COBERG', role: 'Celonis process mining & Salesforce consultant (lead)' },
    { when: '2019 – 2021', org: 'SOLEX, SAP partner', role: 'Business process consultant' },
    { when: '2025', org: 'NCTC', role: 'Director of Operations', note: 'The initiative has since stopped.', quiet: true },
  ],
}

export const CLIENTS = {
  label: 'Worked with',
  titleA: 'Organisations I have',
  titleWord: 'worked',
  titleB: 'alongside.',
  logos: [
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
    { name: 'DNA', logo: '/images/image copy 26.png' },
    { name: 'Partner', logo: '/images/image copy 27.png' },
    { name: 'Silicon21', logo: '/images/image copy 28.png' },
  ],
}

export const PRINCIPLES = {
  label: 'How I work',
  titleA: 'I believe in',
  titleWord: 'execution',
  titleB: 'over theory.',
  items: [
    { name: 'Start from a real problem', body: 'Not a guess. Something people already pay for, or lose time to.' },
    { name: 'Back the right people', body: 'A good team with a validated problem beats a great idea alone.' },
    { name: 'Keep going', body: 'Ship, measure, fix, repeat. Most of the work is the part after launch.' },
  ],
}

export const CONTACT = {
  label: 'Contact',
  title: "Let's talk.",
  body: 'About Nin9 (investing, partnering or a problem worth solving) or a consulting engagement. Email is the fastest way to reach me.',
  linkedin: 'LinkedIn',
}
