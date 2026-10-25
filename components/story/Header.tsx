'use client'

import { getStoryNav } from '@/lib/jelly/story-nav'
import { LINKS } from '@/lib/content'

/** Fixed header: name, Nin9 link, and a contact jump (the liquid races there when the engine is live). */
export default function Header() {
  const jump = (station: string, anchor: string) => (e: React.MouseEvent) => {
    const nav = getStoryNav()
    if (!nav) return
    e.preventDefault()
    nav.goTo(station)
    history.replaceState(null, '', `#${anchor}`)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-[var(--header-h)] border-b border-line/60 bg-ground/85 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between px-4 md:px-8">
        <a href="#hello" onClick={jump('wg-mark', 'hello')} className="font-serif text-lg font-bold tracking-tight md:text-xl">
          Waseem Ghaly
        </a>
        <nav className="flex items-center gap-1 md:gap-2">
          <a href={LINKS.nin9} target="_blank" rel="noopener noreferrer" className="btn-ghost max-sm:hidden">
            nin9.org ↗
          </a>
          <a href="#contact" onClick={jump('contact-email', 'contact')} className="btn-secondary">
            Get in touch
          </a>
        </nav>
      </div>
    </header>
  )
}
